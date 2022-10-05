const keycloak = Keycloak({
    "realm": Setting.OAuth2.Realms,
    "clientId": Setting.OAuth2.ClientId,
    "url": Setting.OAuth2.Url
});
var auth_time = null;
var OAuth2 = {
    InitOAuth2: function () {
        //window.localStorage.removeItem("auth_api_gateway");
        keycloak.init({ onLoad: 'login-required' }).success(function (auth) {
            if (!auth) {
                window.location.reload();
            }
            else {
                var tokenInfo = keycloak.idTokenParsed;
                console.log(tokenInfo);
                var userId = tokenInfo.sub;
                var username = tokenInfo.preferred_username;
                var clientId = keycloak.clientId;
                var realm = keycloak.realm;
                var accessToken = keycloak.token;
                var refreshToken = keycloak.refreshToken;
                var sessionState = keycloak.tokenParsed.session_state;
                var appCode = Setting.OAuth2.AppCode;
                auth_time = tokenInfo.auth_time;
                var expTime = tokenInfo.exp;

                console.log("UserId : " + userId);
                console.log("UserName : " + username);
                console.log("AccessToken : " + accessToken);
                console.log("RefreshToken : " + refreshToken);
                console.log("SessionState : " + sessionState);
                console.log("auth_time : " + auth_time);
                console.log("expTime : " + expTime);
                console.log(keycloak);

                $.get(Setting.GatewayUrl + "/Identity/TokenAPI/pub/GetToken/" + realm + "/" + appCode + "/" + userId + "/" + auth_time + "/" + expTime + "/" + sessionState, function (result) {
                    console.log("Token API : " + result.ReturnValue);
                    var identityToken = result.ReturnValue;
                    if ($("#divFullNameLabel")[0])
                        $("#divFullNameLabel").html("Welcome : " + username);
                    if ($("#divLogoutLabel")[0]) {
                        $("#divLogoutLabel").attr("href", "javascript:keycloak.logout();");
                    }
                    var autInfo = JSON.stringify({
                        "Realms": realm,
                        "ClientId": clientId,
                        "AccessToken": accessToken,
                        "RefreshToken": refreshToken,
                        "SessionState": sessionState,
                        "UserId": userId,
                        "IdentityToken": identityToken,// token api
                        "UserName": username,
                        "AuthTime": auth_time,
                        "ExpTime": expTime
                    });
                    console.log(autInfo);
                    window.localStorage.setItem("auth_api_gateway", autInfo);
                    /*OAuth2.GetListRealms();*/
                    //OAuth2.GetListStorage();
                });

                //$.get(Setting.GatewayUrl + "/syncProfile/TokenAPI/pub/GetToken/" + realm + "/" + userId + "/" + sessionState, function (result) {
                //    console.log("Token API : " + result.ReturnValue);
                //    var identityToken = result.ReturnValue;
                //    if ($("#divFullNameLabel")[0])
                //        $("#divFullNameLabel").html("Welcome : " + username);
                //    if ($("#divLogoutLabel")[0]) {
                //        $("#divLogoutLabel").attr("href", "javascript:keycloak.logout();");
                //    }
                //    var autInfo = JSON.stringify({
                //        "Realms": realm,
                //        "ClientId": clientId,
                //        "AccessToken": accessToken,
                //        "RefreshToken": refreshToken,
                //        "SessionState": sessionState,
                //        "UserId": userId,
                //        "IdentityToken": identityToken,// token api
                //        "UserName": username
                //    });
                //    window.localStorage.setItem("auth_api_gateway", autInfo);
                  
                //});
            }
            setTimeout(() => {
                keycloak.updateToken(70).success((refreshed) => {
                    if (refreshed) {
                        console.debug('Token refreshed' + refreshed);
                    } else {
                        console.warn('at index Token not refreshed, valid for ' + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
                    }
                }).error(() => {
                    console.error('Failed to refresh token');
                });
            }, 60000)
        }).error((err) => {
            console.log(err);
            console.error("Authenticated Failed");
        });
        console.log(keycloak);
    },
    GetListRealms: function () {
        $.ajax({
            type: "GET",
            url: Setting.GatewayUrl + "/Identity/GetListRealms",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (req) {
                //req.setRequestHeader("Authorization", JSON.parse(auth).IdentityToken);
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
            },
            success: function (result) {
                if (result.ResultCode == '203')
                    MEDIA_COMMON.ShowMessage(result.Message, 'Error');
                if (result.ResultCode == '403')
                    MEDIA_COMMON.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '404')
                    MEDIA_COMMON.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '200') {
                    var html = '';
                    $.each(result.Data, function (i, item) {
                        html += '<li><a href="/Administrators/AMS_USERS/List?realms=' + item.Name + '" title="' + item.Description + '"><i class="fa fa-circle-o"></i> ' + item.Name + '</a></li>';
                    });
                    if ($("#ListRealms")[0]) {
                        $("#ListRealms").html(html);
                    }
                }
            }
        });
    },
    GetListStorage: function () {
        $.ajax({
            type: "GET",
            url: Setting.GatewayUrl + "/Internal/GetListStorage",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
            },
            success: function (result) {
                if (result.ResultCode == '203')
                    MEDIA_COMMON.ShowMessage(result.Message, 'Error');
                if (result.ResultCode == '403')
                    MEDIA_COMMON.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '404')
                    MEDIA_COMMON.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '200') {
                    var htmlDataStorage = '';
                    //var htmlMetaData = '';
                    //var htmlTransaction = '';
                    for (var key in result.Data) {
                        if (result.Data[key].TypeName == "DATA_LAKE")
                            htmlDataStorage += '<li><a href="/Management/STORAGE/Collection?storage=' + key + '" title="' + key + '"><i class="fa fa-circle-o"></i> ' + key + '</a></li>';
                        if (result.Data[key].TypeName == "META")
                            htmlDataStorage += '<li><a href="/Management/STORAGE/Collection?storage=' + key + '" title="' + key + '"><i class="fa fa-circle-o"></i> ' + key + '</a></li>';
                        if (result.Data[key].TypeName == "MINING")
                            htmlDataStorage += '<li><a href="/Management/STORAGE/Collection?storage=' + key + '" title="' + key + '"><i class="fa fa-circle-o"></i> ' + key + '</a></li>';

                    }
                    if ($("#ListStorage-Data-Storage")[0]) {
                        $("#ListStorage-Data-Storage").html(htmlDataStorage);
                    }

                }
            }
        });
        $.ajax({
            type: "GET",
            url: Setting.GatewayUrl + "/Search/GetListStorage",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
            },
            success: function (result) {
                if (result.ResultCode == '203')
                    MEDIA_COMMON.ShowMessage(result.Message, 'Error');
                if (result.ResultCode == '403')
                    MEDIA_COMMON.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '404')
                    MEDIA_COMMON.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '200') {
                    var htmlDataStorage = '';
                    for (var key in result.Data) {
                        htmlDataStorage += '<li><a href="/Management/STORAGE/SearchStorage?storage=' + key + '"><i class="fa fa-circle-o"></i> ' + result.Data[key] + '</a></li>';
                    }
                    if ($("#ListStorage-Search-Storage")[0]) {
                        $("#ListStorage-Search-Storage").html(htmlDataStorage);
                    }
                }
            }
        });
    },
    ResetPassWordSumit: function () {
        if ($('#txtChange_Password_New').val().length == 0 || $('#txtChange_Password_Re').val().length == 0) {
            FORM.ShowMessage('Re-enter your password', 'Warning');
            return;
        } else {
            if ($('#txtChange_Password_New').val() != $('#txtChange_Password_Re').val()) {
                FORM.ShowMessage('The two passwords are not the same', 'Warning');
                return;
            }
        }
        var postData = '{';
        postData += '"realms": "' + COMMON.GetUrlParam('realms') + '",';
        postData += '"id": "' + $("#txtUserID").val() + '",';
        postData += '"dataPost": {';
        postData += '     "type": "password",';
        postData += '     "value": "' + $('#txtChange_Password_New').val() + '",';
        postData += '     "temporary": false,';
        postData += '     }';
        postData += '}';
        $.ajax({
            type: "PUT",
            url: COMMON.GetServiceUrl("ResetPassword", "Identity"),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            data: postData,
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
            },
            success: function (result) {
                if (result.ResultCode == '203')
                    FORM.ShowMessage(result.Message, 'Error');
                if (result.ResultCode == '403')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '404')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '200') {
                    FORM.ShowMessage(result.Message, 'Success');
                }
            }
        });
    }
}