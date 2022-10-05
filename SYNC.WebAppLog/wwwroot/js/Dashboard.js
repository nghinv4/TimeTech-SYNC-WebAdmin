$(function () {
    //GLOBALL.CheckSession();
    //GLOBALL.GetSessionInfo();
    //var url = encodeURI(window.location.pathname + window.location.search);
    //console.log(url);
    //var queryString = window.location.search;
    //console.log(queryString);
    //GLOBALL.MainSidebar();
    //const auth = JSON.parse(window.localStorage.getItem("auth_api_gateway")); 
    //IDENTITY.GetListRealms(auth);
});
var DASHBOARD = {
    
}
var GLOBALL = {    
    CheckPermission: function (AMS_ROLE_FUNCTIONS) {
        var fn = COMMON.GetUrlParam('fn');
        var pageName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);        
        if (fn != null && fn.length > 0) {
            if (AMS_ROLE_FUNCTIONS.indexOf(fn) == -1)
                window.location.href = "/Privacy";
        } else {
            if (pageName.toLowerCase() != "dashboard")
                window.location.href = "/Privacy";
        }

    },
    CheckSession: function () {
        $.ajax({
            type: "GET",
            url: "/api/values",
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                if (response.ResultCode == "403") {
                    window.location.href = "/Index?session=timeout&url=" + encodeURIComponent(window.location.pathname + window.location.search);
                }
                //console.log(response);
            },
            failure: function (response) {
                alert(response);
            }
        });
    },
    GetSessionInfo: function () {
        $.ajax({
            type: "GET",
            url: "/api/values",
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                if (response.ResultCode == "200") {
                    SESSION_INFO = response;
                    $("#divFULL_NAME").html(response.Data.USER_NAME);
                    $("#divProfileLabel").attr("href", "/Administrators/AMS_USER_PROFILE/List?fn=20200617135225&name=" + response.Data.AMS_USER_INFO.USER_NAME + "&code=" + response.Data.AMS_USER_INFO.ID);
                    GLOBALL.CheckPermission(response.Data.AMS_ROLE_FUNCTIONS);
                    GLOBALL.MainSidebar(response.Data.AMS_ROLE_FUNCTIONS);
                    AUTHORIZATION.Action(response.Data.AMS_ROLE_ACTION);                    
                    //AUTHORIZATION.Function(response.Data.AMS_ROLE_FUNCTIONS);                   
                    
                }
            },
            failure: function (response) {
                alert(response);
            }
        });
    },
    Logoff: function () {
        $.ajax({
            type: "GET",
            url: "/api/Logoff",
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                if (response.ResultCode == "200") {
                    window.location.href = "/Index?session=logout&url=" + encodeURIComponent(window.location.pathname + window.location.search);
                }
                console.log(response);
            },
            failure: function (response) {
                alert(response);
            }
        });
    },
    MainSidebar: function (AMS_ROLE_FUNCTIONS) {
        //console.log(COMMON.GetCookie("API_KEY"));
        $.ajax({
            type: "GET",
            url: COMMON.GetServiceUrl("AMS_FUNCTIONS", "API_AMS") + "/-1/-1/-1/1/0/1/1000",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (req) {
                req.setRequestHeader("API_KEY", COMMON.GetCookie("API_KEY"));
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            },
            success: function (result) {
                html = '<li class="header">MAIN NAVIGATION</li>';
                if (result.ResultCode == '200') {
                    var rootData = COMMON.GetObjectsJson(result.Data, 'PARENT_CODE', '0');
                    var rootDataSort = COMMON.SortByKeyAsc(rootData, "FUNCTION_SORT");
                    //console.log(rootDataSort);
                    $.each(rootDataSort, function (i, item) {
                        //console.log(item["INCLUDE_MENU"]);
                        if (AMS_ROLE_FUNCTIONS.indexOf(item["FUNCTION_CODE"]) != -1 && item["INCLUDE_MENU"] == true) {
                            html += '<li id ="' + item["FUNCTION_CODE"] + '" class="treeview">';
                            html += '    <a href = "' + item["FUNCTION_URL"] + '">';
                            html += '            <i class="' + item["FUNCTION_ICON"] + '"></i><span>' + item["FUNCTION_NAME"] + '</span><i class="fa fa-angle-left pull-right"></i>';
                            html += '    </a >';
                            var rootDataChild_0 = COMMON.GetObjectsJson(result.Data, 'PARENT_CODE', item["FUNCTION_CODE"]);
                            if (rootDataChild_0.length > 0) {
                                html += '<ul class="treeview-menu">';
                                $.each(rootDataChild_0, function (j, itemChild_0) {
                                    //console.log(itemChild_0["INCLUDE_MENU"]);
                                    if (AMS_ROLE_FUNCTIONS.indexOf(itemChild_0["FUNCTION_CODE"]) != -1 && itemChild_0["INCLUDE_MENU"] == true) {
                                        html += '<li id ="' + itemChild_0["FUNCTION_CODE"] + '"><a href="' + itemChild_0["FUNCTION_URL"] + '"><i class="' + itemChild_0["FUNCTION_ICON"] + '"></i> ' + itemChild_0["FUNCTION_NAME"] + '</a></li>';
                                    }
                                });
                                html += '</ul>';
                            }
                            html += '</li >';
                        }

                    });
                }
                $("#sidebar-menu").html(html);
                //AUTHORIZATION.Sidebar(roles);
                //AUTHORIZATION.Action(roles);
            }
        });
    },
    ChangePassWord: function (userName, email) {
        if ($("#divPoupChangePassWord")[0]) {
            $('.divOpacity').css('display', 'block');
            $('#divPoupChangePassWord').show();
            $("#txtChange_UserName").val(userName);
            $("#txtChange_Email").val(email);
        }
    },
    ChangePassWordSumit: function () {
        var PASSWORD = $("#txtChange_Password_New").val();
        var PASSWORD_OLD = $("#txtChange_Password_Old").val();
        var PASSWORD_RE = $("#txtChange_Password_Re").val();
        if (PASSWORD_OLD == null || PASSWORD_OLD.length == 0) {
            FORM.ShowMessage('Enter the old password', 'Warning');
            return;
        }
        if (PASSWORD != PASSWORD_RE) {
            FORM.ShowMessage('The password is not the same', 'Warning');
            return;
        } else {
            var postData = {};
            postData["USER_NAME"] = $("#txtChange_UserName").val();
            postData["PASSWORD_OLD"] = $("#txtChange_Password_Old").val();
            postData["PASSWORD_NEW"] = $("#txtChange_Password_New").val();
            $.ajax({
                type: "POST",
                url: COMMON.GetServiceUrl("AMS_USERS", 'API_AMS') + "/AMS_USERS_CHANGE_PASSWORD",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                data: JSON.stringify(postData),
                beforeSend: function (req) {
                    req.setRequestHeader("API_KEY", COMMON.GetCookie("API_KEY"));
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest.status + '-' + errorThrown);
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
}
