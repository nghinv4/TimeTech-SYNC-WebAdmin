//-------------------------------------------------------------------------------------------------------------------------------------
//-- Created By:Ngô Văn Nghị                                                                                                       -
//-- Date: 20/06/2016                                                                                                                 -
//-- Todo:                                                                                                                            -
//-------------------------------------------------------------------------------------------------------------------------------------
//Constan-----------------------------------------------------------------------------------------------------------------------------

//var SERVICE_NAME = 'EHR_CORE';
var SERVICE_URL = 'https://localhost:6001';
//var KEY_AUTHORIZATION = COMMON.Encode(SERVICE_NAME, SERVICE_NAME);
var PAGE_INDEX = 1;
var PAGE_SIZE = 20;
var DEFAULT_MAX_ITEM = 1000;
var SESSION_INFO = null;
var CONSTAN_STATUS = {
    "AMS_ACTIONS": {
        "IS_DELETE": {
            "true": "Active",
            "false": "Inactive"
        },
        "STATUS": {
            "true": "Active",
            "false": "Inactive"
        },
    },
    "AMS_FUNCTIONS": {
        "IS_DELETE": {
            "true": "Active",
            "false": "Inactive"
        },
        "STATUS": {
            "true": "Active",
            "false": "Inactive"
        },
    },
    "DATA_LOG": {
        "STATUS": {
            "0": "Loading",
            "1": "Updating",
            "2": "Success",
            "3": "Error"
        },
    },
    "DATA_SYNC": {
        "STATUS": {
            "0": "Pending",
            "1": "Approval"
        },
    },
    "DATA_SHARE_PROFILE": {
        "STATUS": {
            "0": "Pending",
            "1": "Approval"
        },
    },
    "DATA_PROFILE": {
        "STATUS": {
            "0": "Pending",
            "1": "Approval",
            "2": "Assign"
        },
    }

};

String.prototype.replaceAll = function (search, replace) {
    if (replace == null || replace == "") {
        replace = "";
    }
    return this.replace(new RegExp(search, 'g'), replace);
};
Number.prototype.padLeft = function (n, str) {
    return Array(n - String(this).length + 1).join(str || '0') + this;
};
String.prototype.toDate = function (format) {
    var normalized = this.replace(/[^a-zA-Z0-9]/g, '-');
    var normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    var formatItems = normalizedFormat.split('-');
    var dateItems = normalized.split('-');

    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var hourIndex = formatItems.indexOf("hh");
    var minutesIndex = formatItems.indexOf("ii");
    var secondsIndex = formatItems.indexOf("ss");

    var today = new Date();

    var year = yearIndex > -1 ? dateItems[yearIndex] : today.getFullYear();
    var month = monthIndex > -1 ? dateItems[monthIndex] - 1 : today.getMonth() - 1;
    var day = dayIndex > -1 ? dateItems[dayIndex] : today.getDate();

    var hour = hourIndex > -1 ? dateItems[hourIndex] : today.getHours();
    var minute = minutesIndex > -1 ? dateItems[minutesIndex] : today.getMinutes();
    var second = secondsIndex > -1 ? dateItems[secondsIndex] : today.getSeconds();

    return new Date(year, month, day, hour, minute, second);
};
Object.defineProperty(Date.prototype, 'YYYYMMDDHHMMSS', {
    value: function () {
        function pad2(n) {  // always returns a string
            return (n < 10 ? '0' : '') + n;
        }
        return this.getFullYear() +
            pad2(this.getMonth() + 1) +
            pad2(this.getDate()) +
            pad2(this.getHours()) +
            pad2(this.getMinutes()) +
            pad2(this.getSeconds());
    }
});
var VALUE_SENDING = '';
var FORM = {
    ClosePoup: function (poupName) {
        $('.divOpacity').css('display', 'none');
        if ($('#' + poupName)[0])
            $('#' + poupName).hide();
    },
    ClosePoup1: function (poupName) {
        //alert(1);
        $('.divOpacity').css('display', 'none');
        if ($('#' + poupName)[0])
            $('#' + poupName).hide();
        VALUE_SENDING = '';

    },
    ClosePoup2: function (poupName, refUrl) {
        //alert(refUrl);
        $('.divOpacity').css('display', 'none');
        if ($("#" + poupName)[0])
            $('#' + poupName).hide();
        VALUE_SENDING = '';
        if (refUrl.length > 0)
            window.location.href = refUrl;
    },
    ClosePoupWindow: function () {
        if (window.focus) {
            window.close();
        }
    },
    ShowPoup: function (poupName) {
        if ($("#" + poupName)[0]) {
            $('.divOpacity').css('display', 'block');
            $('#' + poupName).show();
        }

    },
    ShowPoup3: function (poupName, caption, tagMessage, linkCallBack) {
        if ($("#" + poupName)[0]) {
            if ($('#' + poupName).css('display') == 'none') {
                if ($("#" + tagMessage)[0])
                    $("#" + tagMessage).html(caption);
                $('#' + poupName).show();
                $('.divOpacity').css('display', 'block');
            }
            $("#btnMessageOK").click(function () {
                if (linkCallBack)
                    window.location.href = linkCallBack;
                else
                    FORM.ClosePoup1('divPoupMessageBox-Success');
            });
        }

    },
    ShowPoupIframe: function (poupName, caption, titlePoupName, divIframe, url) {
        if ($("#" + poupName)[0]) {
            if ($('#' + poupName).css('display') == 'none') {
                if ($("#" + titlePoupName)[0])
                    $("#" + titlePoupName).html(caption);
                $('#' + poupName).show();
                if ($("#" + divIframe)[0])
                    $("#" + divIframe).html('');
                var ifrm = document.createElement("iframe");
                ifrm.setAttribute("id", "iframeContent");
                ifrm.setAttribute("src", url);
                ifrm.style.width = "100%";
                var myDiv = document.getElementById(poupName); //get #myDiv
                //alert(myDiv.clientHeight);
                ifrm.style.height = myDiv.clientHeight - 100;
                if ($("#" + divIframe)[0])
                    $('#' + divIframe).append($(ifrm));
                $('.divOpacity').css('display', 'block');
            }
        }
    },
    ShowPoupWindow: function (width, height, url) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

        var innerWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var innerHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((innerWidth / 2) - (width / 2)) + dualScreenLeft;
        var top = ((innerHeight / 2) - (height / 2)) + dualScreenTop;
        var newWindow = window.open(url, "Hoa don dieu chinh", ',scrollbars=yes,status=yes,toolbar=no,menubar=no,location=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);

        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }

    },
    ShowMessage: function (message, type, isClose) {
        if (type == "Warning") {
            $.toast({
                heading: 'Warning',
                hideAfter: isClose,
                text: message,
                position: 'top-right',
                icon: 'warning'
            });
        } else if (type == "Success") {
            $.toast({
                heading: 'Success',
                hideAfter: isClose,
                text: message,
                position: 'top-right',
                icon: 'success'
            });

        } else if (type == "Error") {
            $.toast({
                heading: 'Error',
                hideAfter: isClose,
                text: message,
                position: 'top-right',
                icon: 'error'
            });
        } else if (type == "Information") {
            $.toast({
                heading: 'Information',
                hideAfter: isClose,
                text: message,
                position: 'top-right',
                icon: 'info'
            })
        }
    },
}
//End Load base-----------------------------------------------------------------------------------------------------------------------
var BASE64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    Encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = BASE64.UTF8_Encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },
    Decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = BASE64.UTF8_Decode(output);

        return output;

    },
    UTF8_Encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },
    UTF8_Decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }
}
//COMMON base-------------------------------------------------------------------------------------------------------------------------
var COMMON = {
    GetServiceUrl: function (dataSources, SERVICE_NAME) {
        //var value = SERVICE_URL + '?dataSources=' + dataSources;
        //console.log(SERVICE_URL);
        var value = Setting.GatewayUrl + "/" + SERVICE_NAME + "/" + dataSources;
        console.log("value : " + value);
        console.log("GatewayUrl : " + Setting.GatewayUrl);
        console.log("SERVICE_NAME : " + SERVICE_NAME);
        console.log("dataSources : " + dataSources);
        return value;
    },
    Encode: function (ckey, value) {
        var encrypted = CryptoJS.AES.encrypt(value, ckey);
        return encrypted;
    },
    Decode: function (ckey, value) {
        var decrypted = CryptoJS.AES.decrypt(value, ckey);
        decrypted = decrypted.toString(CryptoJS.enc.Utf8);
        return decrypted;
    },
    GetUrlParam: function (sParam) {
        var values = '';
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                values = sParameterName[1];
            }
        }
        return values;
    },
    RandomString: function (len) {
        charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            if (i > 0 && i % 4 == 0) {
                randomString += charSet.substring(randomPoz, randomPoz + 1) + "-";
            } else {
                randomString += charSet.substring(randomPoz, randomPoz + 1);
            }

        }
        return randomString;
    },
    CheckAllCheckbox: function (checkBoxName, tag, classCheck) {
        var oItem = checkBoxName.children;
        var theBox = (checkBoxName.type == "checkbox") ?
            checkBoxName : checkBoxName.children.item[0];
        xState = theBox.checked;
        elm = $("#" + tag + " ." + classCheck);
        //console.log(elm);
        for (i = 0; i < elm.length; i++) {
            if (elm[i].type == "checkbox" &&
                elm[i].id != theBox.id) {
                if (elm[i].checked != xState) {

                    elm[i].click();

                }

            }
        }
        //console.log(JSON.stringify(CHECKBOX_DATA));
    },
    CheckboxPutValue: function (checkBoxName) {
        var theBox = (checkBoxName.type == "checkbox") ?
            checkBoxName : checkBoxName.children.item[0];
        var strDataPush = '{"Key": "' + theBox.id + '", "Checked": ' + theBox.checked + ', "Value": ' + theBox.value + '}';
        var objDataPush = JSON.parse(strDataPush);
        CHECKBOX_DATA[theBox.id] = objDataPush;
        //console.log(JSON.stringify(CHECKBOX_DATA));
    },
    SetValueCheckbox: function () {
        if ($("#ckCheckbox")[0])
            $("#ckCheckbox").attr('checked', false);
        $('input[type=checkbox]').each(function () {
            //if (this.checked) {
            //    console.log($(this).val());
            //}
            var dataJson = CHECKBOX_DATA[$(this).attr("id")];
            //console.log(dataJson);
            if (jQuery.type(dataJson) === "undefined") {
            } else {
                if (dataJson["Checked"] === true) {
                    $(this).click();
                }

            }

        });
    },
    ConvertJSONDateToDate: function (jsonDate, strFomat) {
        if (jsonDate == null) {
            return "";
        } else {
            if (jsonDate.length > 0) {
                var date = new Date(parseInt(jsonDate.substr(6)));
                var getDate = date.format(strFomat);
                return getDate;

            } else {
                return "";
            }
        }

    },
    ConvertToJSONDate: function (strDate) {
        if (strDate.length > 0) {
            var dt = new Date(strDate);
            var newDate = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()));
            return '/Date(' + newDate.getTime() + ')/';
        } else {
            return "";
        }
    },
    ConvertTDateToDate: function (dateT, strFomat) {
        if (dateT == null) {
            return "";
        } else {
            if (dateT.length > 0) {
                var date = new Date(dateT);
                var getDate = date.format(strFomat);
                return getDate;

            } else {
                return "";
            }
        }

    },
    ConvertTimestampToDate: function (timestamp) {
        if (timestamp == null)
            return "";
        else
            return new Date(timestamp * 1000).toISOString().slice(0, 19).replace('T', ' ');
    },
    AddCommas: function (str) {
        if (str == null)
            return '';
        var amount = new String(str);
        amount = amount.replaceAll("\\,", "").replaceAll(" ", "");
        var phannguyen = amount.split(".")[0];
        var phanthapphan = amount.indexOf(".") > 0 ? amount.split(".")[1] : "";
        amount = phannguyen.split("").reverse();
        var output = "";
        for (var i = 0; i <= amount.length - 1; i++) {
            output = amount[i] + output;
            if ((i + 1) % 3 == 0 && (amount.length - 1) !== i) {
                output = ',' + output;
            }
        }
        output = output.replaceAll("-,", "-");
        return phanthapphan ? (output + "." + phanthapphan) : output;
    },
    ConvertToTitleCase: function (textInput) {
        var strchuyendoi = "";
        var laytu = textInput.Split(' ');
        var kytudau = "";
        for (var i = 0; i < laytu.Length; i++) {
            kytudau = laytu[i].Substring(0, 1);
            strchuyendoi += kytudau.ToUpper() + laytu[i].Remove(0, 1) + " ";
        }
        return strchuyendoi;
    },
    ConfirmMessage: function (mesage, refUrl) {
        var r = confirm(mesage);
        if (r == true) {
            window.location.href = refUrl;
        }
        //var html = '<div class="alert alert-success" style ="margin:0px;">';
        //    html += '   <button type="button" onclick ="javascript:FORM.ClosePoup2(\'divPoupMessageBox-Success-RefUrl\',\'' + refUrl + '\');" class="close">×</button>';
        //    html += '   <i class="icon-exclamation-sign"></i><strong>Thông báo</strong>';
        //    html += '   <br /> ';
        //    html += '   <div id ="tagMessageBox-Success-RefUrl" style ="text-align:center"></div>';
        //    html += '</div>';
        //    $("#divPoupMessageBox-Success-RefUrl").html(html);
        //    FORM.ShowPoup3("divPoupMessageBox-Success-RefUrl", mesage, "tagMessageBox-Success-RefUrl");
    },
    FormatDate: function (date, format) {
        var valueFormat = '';
        switch (format) {
            case "dd-MM-yyyy":
                valueFormat = [date.getDate().padLeft(2), (date.getMonth() + 1).padLeft(2), date.getFullYear()].join('-');
                break;
            case "MM-dd-yyyy":
                valueFormat = [(date.getMonth() + 1).padLeft(2), date.getDate().padLeft(2), date.getFullYear()].join('-');
                break;
            case "yyyy-MM-dd":
                valueFormat = [date.getFullYear(), (date.getMonth() + 1).padLeft(2), date.getDate().padLeft()].join('-');
                break;
            case "dd/mm/yyyy":
                valueFormat = [date.getDate().padLeft(2), (date.getMonth() + 1).padLeft(2), date.getFullYear()].join('/');
            case "MM/dd/yyyy":
                valueFormat = [(date.getMonth() + 1).padLeft(2), date.getDate().padLeft(2), date.getFullYear()].join('/');
                break;
            case "yyyy/MM/dd":
                valueFormat = [date.getFullYear(), (date.getMonth() + 1).padLeft(2), date.getDate().padLeft()].join('/');
                break;
            case "dd-MM-yyyy HH:mm:ss":
                valueFormat = [date.getDate().padLeft(2), (date.getMonth() + 1).padLeft(2), date.getFullYear()].join('-') + ' '
                    + [date.getHours().padLeft(2), date.getMinutes().padLeft(2), date.getSeconds().padLeft()].join(':');
                break;
            case "MM-dd-yyyy HH:mm:ss":
                valueFormat = [(date.getMonth() + 1).padLeft(2), date.getDate().padLeft(2), date.getFullYear()].join('-') + ' '
                    + [date.getHours().padLeft(2), date.getMinutes().padLeft(2), date.getSeconds().padLeft()].join(':');
                break;
            case "yyyy-MM-dd HH:mm:ss":
                valueFormat = [date.getFullYear(), (date.getMonth() + 1).padLeft(2), date.getDate().padLeft()].join('-') + ' '
                    + [date.getHours().padLeft(2), date.getMinutes().padLeft(2), date.getSeconds().padLeft()].join(':');
                break;
            case "dd/mm/yyyy HH:mm:ss":
                valueFormat = [date.getDate().padLeft(2), (date.getMonth() + 1).padLeft(2), date.getFullYear()].join('/') + ' '
                    + [date.getHours().padLeft(2), date.getMinutes().padLeft(2), date.getSeconds().padLeft()].join(':');
            case "MM/dd/yyyy HH:mm:ss":
                valueFormat = [(date.getMonth() + 1).padLeft(2), date.getDate().padLeft(2), date.getFullYear()].join('/') + ' '
                    + [date.getHours().padLeft(2), date.getMinutes().padLeft(2), date.getSeconds().padLeft()].join(':');
                break;
            case "yyyy/MM/dd HH:mm:ss":
                valueFormat = [date.getFullYear(), (date.getMonth() + 1).padLeft(2), date.getDate().padLeft()].join('/') + ' '
                    + [date.getHours().padLeft(2), date.getMinutes().padLeft(2), date.getSeconds().padLeft()].join(':');
                break;
            default: valueFormat = "format-error";
                break;
        }
        return valueFormat;
    },
    NewGuid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    SetCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    GetCookie: function (cname) {
        var cookieValue = "";
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                cookieValue = c.substring(name.length, c.length);
            }
        }
        return cookieValue;
    },
    RemoveCookie: function (cname) {
        COMMON.SetCookie(cname, "", 0);
    },
    GetTitleStatus: function (DATA_SOURCES, KEY_NAME, VALUE) {        
        if (VALUE == null || VALUE == 'null')
            return "";
        if ((DATA_SOURCES in CONSTAN_STATUS) == false) {
            var checkValue = false;            
            var arrItem = DATA_SOURCES.split("/");
            for (i = 0; i < arrItem.length - 1; i++) {                 
                if ((arrItem[i] in CONSTAN_STATUS) == true) {
                    DATA_SOURCES = arrItem[i];
                    checkValue = true;
                    break;
                }
            }           
            if (!checkValue)
                return VALUE;
        }
        if ((KEY_NAME in CONSTAN_STATUS[DATA_SOURCES]) == false) {
            return VALUE;
        }
        if ((VALUE in CONSTAN_STATUS[DATA_SOURCES][KEY_NAME]) == false) {
            return VALUE;
        }
        var result = CONSTAN_STATUS[DATA_SOURCES][KEY_NAME][VALUE];
        if (result == '' || result.length == 0) {
            result = VALUE;
        }

        return result;
    },
    DownloadFile: function (dataurl, filename) {
        var a = document.createElement("a");
        a.href = dataurl;
        a.setAttribute("download", filename);
        var b = document.createEvent("MouseEvents");
        b.initEvent("click", false, true);
        a.dispatchEvent(b);
        return false;
    },
    GetObjectsJson: function (obj, key, val) {
        try {
            var objects = [];
            for (var i in obj) {
                if (!obj.hasOwnProperty(i)) continue;
                if (typeof obj[i] == 'object') {
                    objects = objects.concat(COMMON.GetObjectsJson(obj[i], key, val));
                } else if (i == key && obj[key] == val) {
                    objects.push(obj);
                }
            }
            return objects;
        }
        catch (err) {
            console.log(err.message);
            return null;
        }

    },
    GetGuiId: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    GetDataTree: function (objData, PARENT_CODE, CODE) {
        var rootData_Child_0 = COMMON.GetObjectsJson(objData, PARENT_CODE, item[CODE]);
        if (rootData_Child_0.length > 0) {
            var arr_1 = [];
            $.each(rootData_Child_0, function (i_0, item_0) {
                //var postData_1 = { id: item_0[CODE], title: item_0[DISLAY_NAME], subs: [] };
                arr_1.push(GetDataTree(objData, PARENT_CODE, item_0[CODE]));
                GetDataTree(objData, PARENT_CODE, item_0[CODE]);
            });
            var postData_0 = { id: item[CODE], title: item[DISLAY_NAME], subs: [] };
            postData_0["subs"] = arr_1;
            return postData_0;
        }
        return null;
    },
    SortByKeyDesc: function (array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    },
    SortByKeyAsc: function (array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

}
//End COMMON base---------------------------------------------------------------------------------------------------------------------
//VALIDATE value input----------------------------------------------------------------------------------------------------------------
var VALIDATE = {
    IsPassWord: function (textInput) {
        var strValidChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_!@#$%^&*()";
        var strChar;
        if (textInput.length == 0)
            return false;
        for (i = 0; i < pass.length && blnResult == true; i++) {
            strChar = textInput.charAt(i);
            if (strValidChars.indexOf(strChar) == -1) {
                return false;
            }
        }
        return true;
    },
    IsEmail: function (textInput) {
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (filter.test(this.value)) {
            return true;
        }
        return false;
    },
    IsPhone: function (textInput) {
        var filter = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        if (filter.test(textInput.value)) {
            return true;
        }
        return false;
    },
    IsDate: function (textInput) {
        var currVal = textInput;
        if (currVal == '')
            return false;

        var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; //Declare Regex
        var dtArray = currVal.match(rxDatePattern); // is format OK?

        if (dtArray == null)
            return false;

        //Checks for dd/mm/yyyy format.
        var dtMonth = dtArray[3];
        var dtDay = dtArray[1];
        var dtYear = dtArray[5];

        if (dtMonth < 1 || dtMonth > 12)
            return false;
        else if (dtDay < 1 || dtDay > 31)
            return false;
        else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
            return false;
        else if (dtMonth == 2) {
            var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
            if (dtDay > 29 || (dtDay == 29 && !isleap))
                return false;
        }
        return true;
    },
    IsNumber: function (textInput) {
        var pattern = /^\d+$/;
        return pattern.test(textInput);  // returns a boolean
    },
    ValidateInput: function (objectControls) {
        var check = true;
        $.each(objectControls, function (key, value) {
            if (value == 'Textbox' || value == 'DatePicker') {
                if ($("#" + key).val() == '') {
                    $("#" + key).addClass('error-input');
                } else {
                    $("#" + key).removeClass('error-input');
                }
            } else if (value = 'Select') {
                //if ($("#" + key).val() == '' || $("#" + key).val() == '-1' || $("#" + key).val() == '0') {
                if ($("#" + key).val() == '' || $("#" + key).val() == '-1') {
                    $("#" + key).addClass('error-input');
                } else {
                    $("#" + key).removeClass('error-input');
                }
            }
        });
        if ($(".error-input")[0]) {
            check = false;
        }
        return check;
    },
};
//End VALIDATE value input-------------------------------------------------------------------------------------------------------------
//PROVIDER-----------------------------------------------------------------------------------------------------------------------------
var PROVIDER = {
    ADD: function (object) {
        if (VALIDATE.ValidateInput(object[0].LIST_VALIDATE)) {
            var postData = {};
            $.each(object[0].LIST_CONTROLS_BIND_DATA, function (key, value) {
                switch (value.Type) {
                    case 'Textbox':
                        if ($("#" + key)[0])
                            postData[value.Mapping] = $("#" + key).val();
                        break;
                    case 'DatePicker':
                        if ($("#" + key)[0]) {
                            if ($("#" + key).val().trim().length > 0) {
                                var date = $("#" + key).val().toDate("dd-MM-yyyy");
                                //"22/03/2016 14:03:01".toDate("dd/mm/yyyy hh:ii:ss");
                                //"2016-03-29 18:30:00".toDate("yyyy-mm-dd hh:ii:ss");
                                postData[value.Mapping] = COMMON.ConvertToJSONDate(COMMON.FormatDate(date, "MM/dd/yyyy"));
                            }
                        }
                        //postData[value.Mapping] = $("#" + key).val();
                        break;
                    case 'SelectTree':
                        if ($("#" + key)[0]) {
                            //console.log(value.ComboTreeData._selectedItem.id);
                            //console.log(value.ComboTreeData._selectedItem.title);
                            postData[value.Mapping] = value.ComboTreeData._selectedItem.id;
                        }
                        break;
                    case 'SelectTreeName':
                        postData[value.Mapping] = value.ComboTreeData._selectedItem.title;
                        break;
                    case 'Select':
                        if ($("#" + key)[0])
                            postData[value.Mapping] = $("#" + key).val();
                        break;
                    case 'SelectName':
                        var controlName = '';
                        var arrItem = key.split("_");
                        for (i = 0; i < arrItem.length - 1; i++) {
                            controlName += arrItem[i] + "_";
                        }
                        controlName = controlName.substring(0, controlName.length - 1);
                        postData[value.Mapping] = $("#" + controlName + " :selected").text();
                        break;
                    case 'Checkbox':
                        if ($("#" + key)[0])
                            postData[value.Mapping] = $("#" + key).is(':checked');
                        break;
                    case 'Radio':
                        postData[value.Mapping] = $("input[name='" + key + "']:checked").val();
                        break;
                    case 'Image':
                        if ($("#" + key)[0])
                            postData[value.Mapping] = $("#" + key).attr('src');
                        break;
                    case 'CkEditor':
                        var getData = CKEDITOR.instances[key].getData();
                        postData[value.Mapping] = getData;
                        break;
                    case 'EditorTextArea':
                        var getData = $("textarea[name='" + key + "']").val();
                        postData[value.Mapping] = getData;
                        break;
                    default:

                }

            });
            //console.log(postData);
            $.ajax({
                type: "POST",
                url: COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                data: JSON.stringify(postData),
                beforeSend: function (req) {
                    req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
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
                        if (object[0].URL_RECDIRECT.length > 0) {
                            FORM.ShowMessage(result.Message + '<br/><a href="' + object[0].URL_RECDIRECT + '">Back to list</a>', 'Success');
                        }
                        else {
                            FORM.ShowMessage(result.Message, 'Success');
                        }
                        if (object[0].THIS_IS_CALL_BACK) {
                            object[0].THIS_IS_CALL_BACK(result)
                        }
                    }
                }
            });

        }
    },
    UPDATE: function (object) {
        if (VALIDATE.ValidateInput(object[0].LIST_VALIDATE)) {
            var postData = {};
            /*postData["ID"] = object[0].ID;*/
            $.each(object[0].LIST_CONTROLS_BIND_DATA, function (key, value) {
                switch (value.Type) {
                    case 'Textbox':
                        if ($("#" + key)[0])
                            postData[value.Mapping] = $("#" + key).val();
                        break;
                    case 'DatePicker':
                        if ($("#" + key)[0]) {
                            if ($("#" + key).val().trim().length > 0) {
                                var date = $("#" + key).val().toDate("dd-MM-yyyy");
                                //"22/03/2016 14:03:01".toDate("dd/mm/yyyy hh:ii:ss");
                                //"2016-03-29 18:30:00".toDate("yyyy-mm-dd hh:ii:ss");
                                postData[value.Mapping] = COMMON.ConvertToJSONDate(COMMON.FormatDate(date, "MM/dd/yyyy"));
                                //postData[value.Mapping] = $("#" + key).val();            
                            }
                        }
                        break;
                    case 'SelectTree':
                        if ($("#" + key)[0]) {
                            postData[value.Mapping] = value.ComboTreeData._selectedItem.id;
                        }
                        break;
                    case 'SelectTreeName':
                        postData[value.Mapping] = value.ComboTreeData._selectedItem.title;
                    case 'Select':
                        if ($("#" + key)[0])
                            postData[value.Mapping] = $("#" + key).val();
                        break;
                    case 'SelectName':
                        var controlName = '';
                        var arrItem = key.split("_");
                        for (i = 0; i < arrItem.length - 1; i++) {
                            controlName += arrItem[i] + "_";
                        }
                        controlName = controlName.substring(0, controlName.length - 1);
                        postData[value.Mapping] = $("#" + controlName + " :selected").text();
                        break;
                    case 'Checkbox':
                        if ($("#" + key)[0])
                            postData[value.Mapping] = $("#" + key).is(':checked');
                        break;
                    case 'Radio':
                        postData[value.Mapping] = $("input[name='" + key + "']:checked").val();
                        break;
                    case 'Image':
                        if ($("#" + key)[0])
                            postData[value.Mapping] = $("#" + key).attr('src');
                        break;
                    case 'CkEditor':
                        var getData = CKEDITOR.instances[key].getData();
                        postData[value.Mapping] = getData;
                        break;
                    case 'EditorTextArea':
                        var getData = $("textarea[name='" + key + "']").val();
                        postData[value.Mapping] = getData;
                        break;
                    default:

                }
            });
            $.ajax({
                type: "PUT",
                url: COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                data: JSON.stringify(postData),
                beforeSend: function (req) {
                    req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
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
                        if (object[0].URL_RECDIRECT.length > 0) {
                            FORM.ShowMessage(result.Message + '<br/><a href="' + object[0].URL_RECDIRECT + '">Back to list</a>', 'Success');
                        }
                        else {
                            FORM.ShowMessage(result.Message, 'Success');
                        }
                        if (object[0].THIS_IS_CALL_BACK) {
                            object[0].THIS_IS_CALL_BACK(result)
                        }
                    }
                }
            });

        }
    },
    DELETE: function (object) {
        $.ajax({
            type: "DELETE",
            url: COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME) + "/" + object[0].ID,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            },
            success: function (result) {
                if (result.ResultCode == '203')
                    FORM.ShowMessage(result.Message, 'Error');
                if (result.ResultCode == '403')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '404')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '200') {
                    if (object[0].THIS_IS_CALL_BACK) {
                        object[0].THIS_IS_CALL_BACK(result);
                    }
                    $("#row_" + object[0].ID).remove();
                }
            }
        });

    },
    GET_INFO_BY_EDIT: function (object) {
        $.ajax({
            type: "GET",
            url: COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME) + "/" + object[0].ID,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            },
            success: function (result) {
                if (result.ResultCode == '203')
                    FORM.ShowMessage(result.Message, 'Error');
                if (result.ResultCode == '403')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '404')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '200') {
                    $.each(object[0].LIST_CONTROLS_BIND_DATA, function (key, value) {
                        switch (value.Type) {
                            case 'Textbox':
                                if ($("#" + key)[0])
                                    $("#" + key).val(result.Data[value.Mapping]);
                                //dataSendCallback["#" + key] = result.Data[value.Mapping];
                                break;
                            case 'DatePicker':
                                var valueDate = result.Data[value.Mapping];
                                if ($("#" + key)[0])
                                    $("#" + key).val(COMMON.ConvertTDateToDate(valueDate, 'yyy-MM-dd'));
                                //dataSendCallback["#" + key] = COMMON.ConvertJSONDateToDate(valueDate, 'dd-MM-yyyy');
                                break;
                            case 'Select':
                                if (result.Data[value.Mapping] != null && result.Data[value.Mapping].toString() == 'true') {
                                    if ($("#" + key)[0])
                                        $("#" + key).val('true');
                                    //dataSendCallback["#" + key] = 'true';
                                } else if (result.Data[value.Mapping] != null &&result.Data[value.Mapping].toString() == 'false') {
                                    if ($("#" + key)[0])
                                        $("#" + key).val('false');
                                    //dataSendCallback["#" + key] = 'false';
                                } else {
                                    //dataSendCallback["#" + key] = result.Data[value.Mapping].toString();
                                    if (result.Data[value.Mapping] != null && $("#" + key)[0])
                                        $("#" + key).val(result.Data[value.Mapping].toString());
                                }
                                break;
                            case 'Checkbox':
                                if ($("#" + key)[0])
                                    $("#" + key).attr('checked', result.Data[value.Mapping]);
                                //dataSendCallback["#" + key] = result.Data[value.Mapping];
                                break;
                            case 'Radio':
                                $("input[name='" + key + "']:checked").val(result.Data[value.Mapping]);
                                //dataSendCallback["#" + key] = result.Data[value.Mapping];
                                break;
                            case 'Image':
                                if ($("#" + key)[0])
                                    $("#" + key).attr('src', result.Data[value.Mapping]);
                                //dataSendCallback["#" + key] = result.Data[value.Mapping];
                                break;
                            case 'CkEditor':
                                CKEDITOR.instances[key].setData(result.Data[value.Mapping]);
                                //dataSendCallback["#" + key] = result.Data[value.Mapping];
                                break;
                            case 'EditorTextArea':
                                $("textarea[name='" + key + "']").val(result.Data[value.Mapping]);
                                break;

                        }

                    });
                    if (object[0].THIS_IS_CALL_BACK) {
                        //console.log('calling the callback')
                        object[0].THIS_IS_CALL_BACK(result.Data);
                    }
                    //AUTHORIZATION.Action(SESSION_INFO.Data.AMS_ROLE_ACTION);
                }
            }
        });

    },
    LOAD_SELECT: function (object) {
        var CONTAINER = object[0].CONTAINER;
        var TEMPLATE = object[0].TEMPLATE;
        var URL_BASE = COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME) + "/";
        var ARRAY_KEY = object[0].ARRAY_KEY;
        var LIST_PARAM = object[0].LIST_PARAM;
        var APPEND_DATA = object[0].APPEND_DATA;
        var SELECT_VALUE = object[0].SELECT_VALUE;
        var DISLAY = object[0].DISLAY;
        $.each(LIST_PARAM, function (key, value) {
            URL_BASE += value + "/";
        });
        URL_BASE = URL_BASE.substring(0, URL_BASE.length - 1);
        var html = '';
        return $.ajax({
            type: "GET",
            url: URL_BASE,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            },
            success: function (result) {
                if (result.ResultCode == '203')
                    FORM.ShowMessage(result.Message, 'Error');
                if (result.ResultCode == '403')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '404')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '200') {
                    $.each(result.Data, function (i, item) {
                        var htmlApend = TEMPLATE;
                        $.each(item, function (keyName, valueItem) {

                            if (ARRAY_KEY.indexOf(keyName) != -1) {
                                while (htmlApend.indexOf('{' + keyName + '}') > -1) {
                                    htmlApend = htmlApend.replace('{' + keyName + '}', valueItem);
                                }
                            }

                        });
                        html += htmlApend;

                    });
                    if ($("#" + CONTAINER)[0]) {
                        $("#" + CONTAINER).html(APPEND_DATA + html);
                        $("#" + CONTAINER).val(SELECT_VALUE);
                        $("#" + CONTAINER).css('display', DISLAY);
                    }
                    if (object[0].THIS_IS_CALL_BACK) {
                        object[0].THIS_IS_CALL_BACK(result);
                    }

                }
            }
        });
    },
    LOAD_SELECT_GROUP: function (object) {
        var CONTAINER = object[0].CONTAINER;
        var TEMPLATE = object[0].TEMPLATE;
        var URL_BASE = COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME) + "/";
        var LIST_PARAM = object[0].LIST_PARAM;
        var APPEND_DATA = object[0].APPEND_DATA;
        var SELECT_VALUE = object[0].SELECT_VALUE;
        var DISLAY = object[0].DISLAY;
        var ROOT_VALUE = object[0].ROOT_VALUE;
        var DISLAY_NAME = object[0].DISLAY_NAME;
        var DISLAY_VALUE = object[0].DISLAY_VALUE;
        var PARENT_DATA = object[0].PARENT_DATA;
        $.each(LIST_PARAM, function (key, value) {
            URL_BASE += value + "/";
        });
        URL_BASE = URL_BASE.substring(0, URL_BASE.length - 1);
        var html = '';
        return $.ajax({
            type: "GET",
            url: URL_BASE,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            },
            success: function (result) {
                if (result.ResultCode == '203')
                    FORM.ShowMessage(result.Message, 'Error');
                if (result.ResultCode == '403')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '404')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '200') {
                    if (result.ResultCode == '200') {
                        var rootData = COMMON.GetObjectsJson(result.Data, PARENT_DATA, ROOT_VALUE);
                        $.each(rootData, function (i, item) {
                            html += '<optgroup label="' + item[DISLAY_NAME] + '">';
                            var rootDataChild_0 = COMMON.GetObjectsJson(result.Data, PARENT_DATA, item[DISLAY_VALUE]);
                            $.each(rootDataChild_0, function (j, itemChild_0) {
                                html += '<option value="' + itemChild_0[DISLAY_VALUE] + '">' + itemChild_0[DISLAY_NAME] + '</option>';
                            });
                            html += '</optgroup>';

                        });
                    }
                    if ($("#" + CONTAINER)[0]) {
                        $("#" + CONTAINER).html(APPEND_DATA + html);
                        $("#" + CONTAINER).val(SELECT_VALUE);
                        if (object[0].THIS_IS_CALL_BACK) {
                            object[0].THIS_IS_CALL_BACK(result)
                        }
                    }

                }
            }
        });
    },
    LOAD_SELECT_TREE: function (object) {
        var CONTAINER = object[0].CONTAINER;
        var URL_BASE = COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME) + "/";
        var LIST_PARAM = object[0].LIST_PARAM;
        var SELECT_VALUE = object[0].SELECT_VALUE;
        var ROOT_VALUE = object[0].ROOT_VALUE;
        var CODE = object[0].CODE;
        var DISLAY_NAME = object[0].DISLAY_NAME;
        var PARENT_CODE = object[0].PARENT_CODE;
        $.each(LIST_PARAM, function (key, value) {
            URL_BASE += value + "/";
        });
        URL_BASE = URL_BASE.substring(0, URL_BASE.length - 1);
        var html = '';
        return $.ajax({
            type: "GET",
            url: URL_BASE,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            },
            success: function (result) {
                if (result.ResultCode == '203')
                    FORM.ShowMessage(result.Message, 'Error');
                if (result.ResultCode == '403')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '404')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '200') {
                    //var result = { "Data": [{ "CDATE": "\/Date(1578023646000+0700)\/", "CODE": "DK_QLDD_01", "CUSER": "host", "DESCRIPTION": "Tờ khai Tài Nguyên Môi trường", "ID": 741, "ITEMS": null, "LDATE": "\/Date(1578294990000+0700)\/", "LUSER": "host", DISLAY_NAME: "GÓI TIN XỬ LÝ ĐẤT ĐAI 02", "PARENT_CODE": "TNMT", "PARENT_NAME": "Tờ khai Tài Nguyên Môi trường", "STATUS": true, "STT": 1 }, { "CDATE": "\/Date(1578294391000+0700)\/", "CODE": "TK_THUE", "CUSER": "host", "DESCRIPTION": "Nhóm tờ khai Thuế", "ID": 761, "ITEMS": null, "LDATE": null, "LUSER": null, DISLAY_NAME: "Tờ khai Thuế", "PARENT_CODE": "-1", "PARENT_NAME": null, "STATUS": true, "STT": 2 }, { "CDATE": "\/Date(1578294461000+0700)\/", "CODE": "TNMT", "CUSER": "host", "DESCRIPTION": "Nhóm tờ khai Tài Nguyên Môi trường", "ID": 762, "ITEMS": null, "LDATE": null, "LUSER": null, DISLAY_NAME: "Tờ khai Tài Nguyên Môi trường", "PARENT_CODE": "-1", "PARENT_NAME": null, "STATUS": true, "STT": 3 }, { "CDATE": "\/Date(1578294505000+0700)\/", "CODE": "01_DK_TVAN", "CUSER": "host", "DESCRIPTION": null, "ID": 763, "ITEMS": null, "LDATE": "\/Date(1578294632000+0700)\/", "LUSER": "host", DISLAY_NAME: "Đăng ký khai thuế qua dịch vụ TVAN (01-DK-TVAN)", "PARENT_CODE": "TK_THUE", "PARENT_NAME": "Tờ khai Thuế", "STATUS": true, "STT": 4 }, { "CDATE": "\/Date(1578294527000+0700)\/", "CODE": "BCTCTT200-BTC", "CUSER": "host", "DESCRIPTION": null, "ID": 764, "ITEMS": null, "LDATE": "\/Date(1578294644000+0700)\/", "LUSER": "host", DISLAY_NAME: "Báo cáo tài chính (TT200\/2014\/TT-BTC)", "PARENT_CODE": "TK_THUE", "PARENT_NAME": "Tờ khai Thuế", "STATUS": true, "STT": 5 }], "Message": "Thực hiện thành công ! ", "PageIndex": 1, "PageSize": 20, "ResultCode": "200", "TotalRecords": 5 };
                    var rootData = COMMON.GetObjectsJson(result.Data, PARENT_CODE, ROOT_VALUE);
                    if (rootData.length > 0) {
                        var arr_0 = [];
                        $.each(rootData, function (i, item) {
                            var rootData_Child_0 = COMMON.GetObjectsJson(result.Data, PARENT_CODE, item[CODE]);
                            if (rootData_Child_0.length > 0) {
                                var arr_1 = [];
                                $.each(rootData_Child_0, function (i_0, item_0) {
                                    var rootData_Child_1 = COMMON.GetObjectsJson(result.Data, PARENT_CODE, item_0[CODE]);
                                    if (rootData_Child_1.length > 0) {
                                        var arr_2 = [];
                                        $.each(rootData_Child_1, function (i_1, item_1) {
                                            arr_2.push({ id: item_1[CODE], title: item_1[DISLAY_NAME], subs: [] });
                                        });
                                        arr_1.push({ id: item_0[CODE], title: item_0[DISLAY_NAME], subs: arr_2 });
                                    } else {
                                        arr_1.push({ id: item_0[CODE], title: item_0[DISLAY_NAME], subs: [] });
                                    }
                                });
                                arr_0.push({ id: item[CODE], title: item[DISLAY_NAME], subs: arr_1 });
                            } else {
                                arr_0.push({ id: item[CODE], title: item[DISLAY_NAME], subs: [] });
                            }
                        });
                    }
                    if ($("#" + CONTAINER)[0]) {
                        var comboTree = $("#" + CONTAINER).comboTree({
                            source: arr_0,
                            isMultiple: false,
                            selected: [SELECT_VALUE]
                        });
                        if (object[0].THIS_IS_CALL_BACK) {
                            object[0].THIS_IS_CALL_BACK(comboTree)
                        }
                        //console.log(comboTreeData._selectedItem.id);
                        //console.log(comboTreeData._selectedItem.title);
                    }
                }
            }
        });
    },
    PROCESSING: function (object) {
        FORM.ShowPoup('divProgressWaiting');
        var CONTAINER = object[0].CONTAINER;
        var TEMPLATE = object[0].TEMPLATE;
        var URL_BASE = COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME) + "/";
        var ARRAY_KEY = object[0].ARRAY_KEY;
        var LIST_PARAM = object[0].LIST_PARAM;
        var DISLAY = object[0].DISLAY;
        $.each(LIST_PARAM, function (key, value) {
            URL_BASE += value + "/";
        });
        URL_BASE = URL_BASE.substring(0, URL_BASE.length - 1);
        var html = '';
        $.ajax({
            type: "GET",
            url: URL_BASE,
            dataType: "json",
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            },
            success: function (result) {
                if (result.ResultCode == '203')
                    FORM.ShowMessage(result.Message, 'Error');
                if (result.ResultCode == '403')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '404')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '200') {
                    $.each(result.Data, function (i, item) {
                        var htmlApend = TEMPLATE;
                        $.each(item, function (keyName, valueItem) {
                            if (ARRAY_KEY.indexOf(keyName) != -1) {
                                while (htmlApend.indexOf('{' + keyName + '}') != -1) {
                                    //htmlApend = htmlApend.replace('{' + keyName + '}', valueItem);
                                    htmlApend = htmlApend.replace('{' + keyName + '}', COMMON.GetTitleStatus(object[0].DATA_SOURCES, keyName, (typeof valueItem != 'object' ? valueItem : JSON.stringify(valueItem))));
                                }
                            } else {
                                if (ARRAY_KEY.indexOf(keyName + "_FormatNumber") != -1) {
                                    while (htmlApend.indexOf('{' + keyName + "_FormatNumber" + '}') != -1) {
                                        htmlApend = htmlApend.replace('{' + keyName + "_FormatNumber" + '}', COMMON.AddCommas(valueItem));
                                    }
                                } else if (ARRAY_KEY.indexOf(keyName + "_Timestamp") != -1) {
                                    while (htmlApend.indexOf('{' + keyName + "_Timestamp" + '}') != -1) {
                                        htmlApend = htmlApend.replace('{' + keyName + "_Timestamp" + '}', COMMON.ConvertTimestampToDate(valueItem));
                                    }
                                }
                                else if (ARRAY_KEY.indexOf(keyName + "_ChangeDate") != -1) {
                                    while (htmlApend.indexOf('{' + keyName + "_ChangeDate" + '}') != -1) {
                                        htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                    }
                                } else {
                                    while (htmlApend.indexOf('{' + keyName + "_ChangeFullDate" + '}') != -1) {
                                        htmlApend = htmlApend.replace('{' + keyName + "_ChangeFullDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd HH:MM:ss'));
                                    }
                                }
                            }

                        });
                        html += htmlApend;

                    });
                    if ($("#" + CONTAINER)[0]) {
                        $("#" + CONTAINER).html(html);
                        $("#" + CONTAINER).css('display', DISLAY);
                        //AUTHORIZATION.Action(SESSION_INFO.Data.AMS_ROLE_ACTION);
                        if (object[0].THIS_IS_CALL_BACK) {
                            object[0].THIS_IS_CALL_BACK(result)
                        }
                    }
                    if ($("#totalRecords")[0]) {
                        $("#totalRecords").html(COMMON.AddCommas(result.Data.length) + " record");
                    }
                    FORM.ClosePoup('divProgressWaiting');
                }
            }
        });

    },
    PROCESSING_INFO: function (object) {
        var CONTAINER = object[0].CONTAINER;
        var TEMPLATE = object[0].TEMPLATE;
        var URL_BASE = COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME) + "/";
        var ARRAY_KEY = object[0].ARRAY_KEY;
        var LIST_PARAM = object[0].LIST_PARAM;
        var DISLAY = object[0].DISLAY;
        $.each(LIST_PARAM, function (key, value) {
            URL_BASE += value + "/";
        });
        URL_BASE = URL_BASE.substring(0, URL_BASE.length - 1);
        var html = '';
        $.ajax({
            type: "GET",
            url: URL_BASE,
            dataType: "json",
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            },
            success: function (result) {
                if (result.ResultCode == '203')
                    FORM.ShowMessage(result.Message, 'Error');
                if (result.ResultCode == '403')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '404')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '200') {
                    var htmlApend = TEMPLATE;
                    $.each(result.Data, function (keyName, valueItem) {
                        if (ARRAY_KEY.indexOf(keyName) != -1) {
                            while (htmlApend.indexOf('{' + keyName + '}') != -1) {
                                //htmlApend = htmlApend.replace('{' + keyName + '}', valueItem);
                                htmlApend = htmlApend.replace('{' + keyName + '}', COMMON.GetTitleStatus(object[0].DATA_SOURCES, keyName, valueItem));
                            }
                        } else {
                            if (ARRAY_KEY.indexOf(keyName + "_FormatNumber") != -1) {
                                while (htmlApend.indexOf('{' + keyName + "_FormatNumber" + '}') != -1) {
                                    htmlApend = htmlApend.replace('{' + keyName + "_FormatNumber" + '}', COMMON.AddCommas(valueItem));
                                }
                            } else if (ARRAY_KEY.indexOf(keyName + "_Timestamp") != -1) {
                                while (htmlApend.indexOf('{' + keyName + "_Timestamp" + '}') != -1) {
                                    htmlApend = htmlApend.replace('{' + keyName + "_Timestamp" + '}', COMMON.ConvertTimestampToDate(valueItem));
                                }
                            } else if (ARRAY_KEY.indexOf(keyName + "_ChangeDate") != -1) {
                                while (htmlApend.indexOf('{' + keyName + "_ChangeDate" + '}') != -1) {
                                    htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                }
                            } else {
                                while (htmlApend.indexOf('{' + keyName + "_ChangeFullDate" + '}') != -1) {
                                    htmlApend = htmlApend.replace('{' + keyName + "_ChangeFullDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd HH:MM:ss'));
                                }
                            }
                        }

                    });
                    html += htmlApend;
                    if ($("#" + CONTAINER)[0]) {
                        $("#" + CONTAINER).html(html);
                        $("#" + CONTAINER).css('display', DISLAY);
                        //AUTHORIZATION.Action(SESSION_INFO.Data.AMS_ROLE_ACTION);
                        if (object[0].THIS_IS_CALL_BACK) {
                            object[0].THIS_IS_CALL_BACK(result)
                        }
                    }
                }
            }
        });

    },
    PROCESSING_MEMBER: function (object) {
        var CONTAINER = object[0].CONTAINER;
        var TEMPLATE = object[0].TEMPLATE;
        var URL_BASE = COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME) + "/";
        var URL_BASE_GET_IMAGE = object[0].URL_BASE_GET_IMAGE;
        var ARRAY_KEY = object[0].ARRAY_KEY;
        var LIST_PARAM = object[0].LIST_PARAM;
        var LIST_PARAM_GET_IMGAE = object[0].LIST_PARAM_GET_IMGAE;
        var DISLAY = object[0].DISLAY;
        $("#" + CONTAINER).html('');
        $.each(LIST_PARAM, function (key, value) {
            URL_BASE += value + "/";
        });
        URL_BASE = URL_BASE.substring(0, URL_BASE.length - 1);

        $.each(LIST_PARAM_GET_IMGAE, function (key, value) {
            URL_BASE_GET_IMAGE += key + "=" + value + "&"
        });
        URL_BASE_GET_IMAGE = URL_BASE_GET_IMAGE.substring(0, URL_BASE_GET_IMAGE.length - 1);

        var html = '';
        var jqxhr = $.getJSON(URL_BASE, function (result) {
            if (result.ResultCode == '203')
                FORM.ShowMessage(result.Message, 'Error');
            if (result.ResultCode == '403')
                FORM.ShowMessage(result.Message, 'Warning');
            if (result.ResultCode == '404')
                FORM.ShowMessage(result.Message, 'Warning');
            if (result.ResultCode == '200') {
                $.each(result.Data, function (i, item) {
                    var htmlApend = TEMPLATE;
                    $.each(item, function (keyName, valueItem) {
                        if (ARRAY_KEY.indexOf(keyName) != -1) {
                            while (htmlApend.indexOf('{' + keyName + '}') > -1) {
                                htmlApend = htmlApend.replace('{' + keyName + '}', valueItem);
                            }
                        }
                    });
                    var value_image = '';
                    var strUserName = item.Username;
                    var jqxhr_Image = $.getJSON(URL_BASE_GET_IMAGE + '&UserName=' + strUserName, '', function (resultData) {

                        if (resultData != "-1") {
                            value_image = resultData;
                        }
                    });
                    jqxhr_Image.complete(function () {
                        while (htmlApend.indexOf('Image_' + strUserName) > -1) {
                            htmlApend = htmlApend.replace('Image_' + strUserName, value_image);
                        }
                        //html += htmlApend;
                        $("#" + CONTAINER).append(htmlApend);

                    });

                });
            }
        });
        jqxhr.complete(function () {
            if ($("#" + CONTAINER)[0]) {
                $("#" + CONTAINER).css('display', DISLAY);
                if (object[0].THIS_IS_CALL_BACK) {
                    object[0].THIS_IS_CALL_BACK(result)
                }
            }
        });

    },
    PROCESSING_DETAIL: function (object) {
        var CONTAINER = object[0].CONTAINER;
        var TEMPLATE = object[0].TEMPLATE;
        var URL_BASE = COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME) + "/";
        var URL_BASE_GET_IMAGE = object[0].URL_BASE_GET_IMAGE;
        var ARRAY_KEY = object[0].ARRAY_KEY;
        var LIST_PARAM = object[0].LIST_PARAM;
        var LIST_PARAM_GET_IMGAE = object[0].LIST_PARAM_GET_IMGAE;
        var DISLAY = object[0].DISLAY;
        $("#" + CONTAINER).html('');
        $.each(LIST_PARAM, function (key, value) {
            URL_BASE += value + "/";
        });
        URL_BASE = URL_BASE.substring(0, URL_BASE.length - 1);

        $.each(LIST_PARAM_GET_IMGAE, function (key, value) {
            URL_BASE_GET_IMAGE += key + "=" + value + "&"
        });
        URL_BASE_GET_IMAGE = URL_BASE_GET_IMAGE.substring(0, URL_BASE_GET_IMAGE.length - 1);

        var html = '';
        var jqxhr = $.getJSON(URL_BASE, function (result) {
            if (result.ResultCode == '203')
                FORM.ShowMessage(result.Message, 'Error');
            if (result.ResultCode == '403')
                FORM.ShowMessage(result.Message, 'Warning');
            if (result.ResultCode == '404')
                FORM.ShowMessage(result.Message, 'Warning');
            if (result.ResultCode == '200') {
                $.each(result.Data, function (i, item) {
                    var htmlApend = TEMPLATE;
                    $.each(item, function (keyName, valueItem) {
                        if (ARRAY_KEY.indexOf(keyName) != -1) {
                            while (htmlApend.indexOf('{' + keyName + '}') > -1) {
                                htmlApend = htmlApend.replace('{' + keyName + '}', valueItem);
                            }
                        }
                    });
                    var value_image = '';
                    var strValue = item.Id;
                    var jqxhr_Image = $.getJSON(URL_BASE_GET_IMAGE + '&Id=' + strValue, '', function (resultData) {

                        if (resultData != "-1") {
                            value_image = resultData;
                        }
                    });
                    jqxhr_Image.complete(function () {
                        while (htmlApend.indexOf('Image_' + strUserName) > -1) {
                            htmlApend = htmlApend.replace('Image_' + strValue, value_image);
                        }
                        //html += htmlApend;
                        if ($("#" + CONTAINER)[0]) {
                            $("#" + CONTAINER).append(htmlApend);
                        }

                    });

                });
            }
        });
        jqxhr.complete(function () {
            $("#" + CONTAINER).css('display', DISLAY);
            //AUTHORIZATION.Action(SESSION_INFO.Data.AMS_ROLE_ACTION);
            if (object[0].THIS_IS_CALL_BACK) {
                object[0].THIS_IS_CALL_BACK(result)
            }
        });

    },
    PROCESSING_PAGINATION: function (object) {
        FORM.ShowPoup('divProgressWaiting');
        var CONTAINER_PAGINATION = object[0].CONTAINER_PAGINATION;
        var CONTAINER = object[0].CONTAINER;
        var TEMPLATE = object[0].TEMPLATE;
        var URL_BASE = COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME) + "/";
        var ARRAY_KEY = object[0].ARRAY_KEY;
        var LIST_PARAM = object[0].LIST_PARAM;
        var DISLAY = object[0].DISLAY;
        var CONTAINER_TOTAL_RECORD = object[0].CONTAINER_TOTAL_RECORD;
        $("#" + CONTAINER_PAGINATION).html('');
        $("#" + CONTAINER_TOTAL_RECORD).html('');
        $("#" + CONTAINER).html('');
        $.each(LIST_PARAM, function (key, value) {
            URL_BASE += value + "/";
        });
        URL_BASE = URL_BASE.substring(0, URL_BASE.length - 1);
        var html = '';
        $.ajax({
            type: "GET",
            url: URL_BASE,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
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
                    if (CONTAINER_TOTAL_RECORD != null && CONTAINER_TOTAL_RECORD != 'undefined') {
                        $("#" + CONTAINER_TOTAL_RECORD).html(COMMON.AddCommas(result.TotalRecords));
                    }
                    if (result.TotalRecords > 0) {
                        var totalPage = 0;
                        var totalRemainder = result.TotalRecords % PAGE_SIZE;
                        totalPage = (result.TotalRecords - totalRemainder) / PAGE_SIZE;
                        if (totalRemainder > 0) {
                            totalPage = totalPage + 1;
                        }
                        //console.log(totalPage);
                        if ($('#' + CONTAINER_PAGINATION).data("twbs-pagination")) {
                            $('#' + CONTAINER_PAGINATION).twbsPagination('destroy');
                        }
                        $('#' + CONTAINER_PAGINATION).twbsPagination({
                            totalPages: totalPage,
                            visiblePages: 5,
                            onPageClick: function (event, page) {
                                var strJson = '';
                                //console.log(object);
                                $.each(LIST_PARAM, function (key, value) {
                                    if (key == 'PageIndex') {
                                        strJson += '"' + key + '":"' + page + '",';
                                    } else {
                                        strJson += '"' + key + '":"' + value + '",';
                                    }
                                });

                                var DATA_LOADING = [{
                                    "TEMPLATE": TEMPLATE,
                                    "CONTAINER": CONTAINER,
                                    "DATA_SOURCES": object[0].DATA_SOURCES,
                                    "SERVICE_NAME": object[0].SERVICE_NAME,
                                    "ARRAY_KEY": ARRAY_KEY,
                                    "LIST_PARAM": $.parseJSON('{' + strJson.substring(0, strJson.length - 1) + '}'),
                                    "DISLAY": DISLAY
                                }];

                                PROVIDER.PROCESSING(DATA_LOADING);
                            }
                        });
                        $.each(result.Data, function (i, item) {
                            var htmlApend = TEMPLATE;
                            $.each(item, function (keyName, valueItem) {
                                if (ARRAY_KEY.indexOf(keyName) != -1) {
                                    while (htmlApend.indexOf('{' + keyName + '}') != -1) {
                                        //htmlApend = htmlApend.replace('{' + keyName + '}', valueItem);                                        
                                        htmlApend = htmlApend.replace('{' + keyName + '}', COMMON.GetTitleStatus(object[0].DATA_SOURCES, keyName, (typeof valueItem != 'object' ? valueItem : JSON.stringify(valueItem))));
                                    }
                                } else {
                                    if (ARRAY_KEY.indexOf(keyName + "_FormatNumber") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_FormatNumber" + '}') != -1) {
                                            htmlApend = htmlApend.replace('{' + keyName + "_FormatNumber" + '}', COMMON.AddCommas(valueItem));
                                        }
                                    } else if (ARRAY_KEY.indexOf(keyName + "_Timestamp") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_Timestamp" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_Timestamp" + '}', COMMON.ConvertTimestampToDate(valueItem));
                                        }
                                    } else if (ARRAY_KEY.indexOf(keyName + "_ChangeDate") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_ChangeDate" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                        }
                                    } else {
                                        while (htmlApend.indexOf('{' + keyName + "_ChangeFullDate" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeFullDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd HH:MM:ss'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_ChangeFullDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd HH:MM:ss'));
                                        }
                                    }
                                }

                            });
                            html += htmlApend;
                        });

                    } else {
                        if ($("#" + CONTAINER_PAGINATION)[0]) {
                            $("#" + CONTAINER_PAGINATION).html('');
                        }
                    }
                    if ($("#" + CONTAINER)[0]) {
                        $("#" + CONTAINER).html(html);
                        $("#" + CONTAINER).css('display', DISLAY);
                        ////AUTHORIZATION.Action(SESSION_INFO.Data.AMS_ROLE_ACTION);
                        if (object[0].THIS_IS_CALL_BACK) {
                            object[0].THIS_IS_CALL_BACK(result);

                        }
                    }
                    FORM.ClosePoup('divProgressWaiting');
                }
            }
        });


    },
    PROCESSING_PAGINATION_POST: function (object) {
        FORM.ShowPoup('divProgressWaiting');
        var CONTAINER_PAGINATION = object[0].CONTAINER_PAGINATION;
        var CONTAINER = object[0].CONTAINER;
        var TEMPLATE = object[0].TEMPLATE;
        var URL_BASE = COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME) + "/";
        var ARRAY_KEY = object[0].ARRAY_KEY;
        var LIST_PARAM = object[0].LIST_PARAM;
        var DISLAY = object[0].DISLAY;
        var CONTAINER_TOTAL_RECORD = object[0].CONTAINER_TOTAL_RECORD;
        $("#" + CONTAINER_PAGINATION).html('');
        $("#" + CONTAINER_TOTAL_RECORD).html('');
        $("#" + CONTAINER).html('');
        $.each(LIST_PARAM, function (key, value) {
            URL_BASE += value + "/";
        });
        URL_BASE = URL_BASE.substring(0, URL_BASE.length - 1);
        var html = '';
        $.ajax({
            type: "POST",
            url: COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            data: JSON.stringify(LIST_PARAM),
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
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
                    if (CONTAINER_TOTAL_RECORD != null && CONTAINER_TOTAL_RECORD != 'undefined') {
                        $("#" + CONTAINER_TOTAL_RECORD).html(COMMON.AddCommas(result.TotalRecords));
                    }
                    if (result.TotalRecords > 0) {
                        var totalPage = 0;
                        var totalRemainder = result.TotalRecords % PAGE_SIZE;
                        totalPage = (result.TotalRecords - totalRemainder) / PAGE_SIZE;
                        if (totalRemainder > 0) {
                            totalPage = totalPage + 1;
                        }
                        //console.log(totalPage);
                        if ($('#' + CONTAINER_PAGINATION).data("twbs-pagination")) {
                            $('#' + CONTAINER_PAGINATION).twbsPagination('destroy');
                        }
                        $('#' + CONTAINER_PAGINATION).twbsPagination({
                            totalPages: totalPage,
                            visiblePages: 5,
                            onPageClick: function (event, page) {
                                var strJson = '';
                                //console.log(object);
                                $.each(LIST_PARAM, function (key, value) {
                                    if (key == 'PageIndex') {
                                        strJson += '"' + key + '":"' + page + '",';
                                    } else {
                                        strJson += '"' + key + '":"' + value + '",';
                                    }
                                });

                                var DATA_LOADING = [{
                                    "TEMPLATE": TEMPLATE,
                                    "CONTAINER": CONTAINER,
                                    "DATA_SOURCES": object[0].DATA_SOURCES,
                                    "SERVICE_NAME": object[0].SERVICE_NAME,
                                    "ARRAY_KEY": ARRAY_KEY,
                                    "LIST_PARAM": $.parseJSON('{' + strJson.substring(0, strJson.length - 1) + '}'),
                                    "DISLAY": DISLAY
                                }];

                                PROVIDER.PROCESSING(DATA_LOADING);
                            }
                        });
                        $.each(result.Data, function (i, item) {
                            var htmlApend = TEMPLATE;
                            $.each(item, function (keyName, valueItem) {
                                if (ARRAY_KEY.indexOf(keyName) != -1) {
                                    while (htmlApend.indexOf('{' + keyName + '}') != -1) {
                                        //htmlApend = htmlApend.replace('{' + keyName + '}', valueItem);                                        
                                        htmlApend = htmlApend.replace('{' + keyName + '}', COMMON.GetTitleStatus(object[0].DATA_SOURCES, keyName, (typeof valueItem != 'object' ? valueItem : JSON.stringify(valueItem))));
                                    }
                                } else {
                                    if (ARRAY_KEY.indexOf(keyName + "_FormatNumber") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_FormatNumber" + '}') != -1) {
                                            htmlApend = htmlApend.replace('{' + keyName + "_FormatNumber" + '}', COMMON.AddCommas(valueItem));
                                        }
                                    } else if (ARRAY_KEY.indexOf(keyName + "_Timestamp") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_Timestamp" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_Timestamp" + '}', COMMON.ConvertTimestampToDate(valueItem));
                                        }
                                    } else if (ARRAY_KEY.indexOf(keyName + "_ChangeDate") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_ChangeDate" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                        }
                                    } else {
                                        while (htmlApend.indexOf('{' + keyName + "_ChangeFullDate" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeFullDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd HH:MM:ss'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_ChangeFullDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd HH:MM:ss'));
                                        }
                                    }
                                }

                            });
                            html += htmlApend;
                        });

                    } else {
                        if ($("#" + CONTAINER_PAGINATION)[0]) {
                            $("#" + CONTAINER_PAGINATION).html('');
                        }
                    }
                    if ($("#" + CONTAINER)[0]) {
                        $("#" + CONTAINER).html(html);
                        $("#" + CONTAINER).css('display', DISLAY);
                        ////AUTHORIZATION.Action(SESSION_INFO.Data.AMS_ROLE_ACTION);
                        if (object[0].THIS_IS_CALL_BACK) {
                            object[0].THIS_IS_CALL_BACK(result);

                        }
                    }
                    FORM.ClosePoup('divProgressWaiting');
                }
            }
        });


    },
    PROCESSING_EXPORT: function (object) {
        FORM.ShowPoup3("divPoupProgress");
        var URL_BASE = COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME) + "/";
        var LIST_PARAM = object[0].LIST_PARAM;
        $.each(LIST_PARAM, function (key, value) {
            URL_BASE += value + "/";
        });
        URL_BASE = URL_BASE.substring(0, URL_BASE.length - 1);
        var html = '';
        $.ajax({
            type: "GET",
            url: URL_BASE,
            dataType: "json",
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            },
            success: function (result) {
                if (result.ResultCode == '203')
                    FORM.ShowMessage(result.Message, 'Error');
                if (result.ResultCode == '403')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '404')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '200') {
                    if (object[0].THIS_IS_CALL_BACK) {
                        object[0].THIS_IS_CALL_BACK(result)
                    }
                    window.location.href = result.ReturnValue;
                    FORM.ClosePoup1("divPoupProgress");
                }
            }
        });

    },
    BIND_DATA: function (object) {
        var CONTAINER = object[0].CONTAINER;
        var TEMPLATE = object[0].TEMPLATE;
        var ARRAY_KEY = object[0].ARRAY_KEY;
        var DATA = object[0].DATA;
        var DISLAY = object[0].DISLAY;
        var html = '';
        $.each(DATA, function (i, item) {
            var htmlApend = TEMPLATE;
            $.each(item, function (keyName, valueItem) {

                if (ARRAY_KEY.indexOf(keyName) != -1) {
                    while (htmlApend.indexOf('{' + keyName + '}') != -1) {
                        htmlApend = htmlApend.replace('{' + keyName + '}', valueItem);
                        //htmlApend = htmlApend.replace('{' + keyName + '}', COMMON.GetTitleStatus(object[0].DATA_SOURCES, keyName, valueItem));
                    }
                } else {
                    if (ARRAY_KEY.indexOf(keyName + "_FormatNumber") != -1) {
                        while (htmlApend.indexOf('{' + keyName + "_FormatNumber" + '}') != -1) {
                            htmlApend = htmlApend.replace('{' + keyName + "_FormatNumber" + '}', COMMON.AddCommas(valueItem));
                        }
                    }
                    else if (ARRAY_KEY.indexOf(keyName + "_ChangeDate") != -1) {
                        while (htmlApend.indexOf('{' + keyName + "_ChangeDate" + '}') != -1) {
                            htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                        }
                    } else {
                        while (htmlApend.indexOf('{' + keyName + "_ChangeFullDate" + '}') != -1) {
                            htmlApend = htmlApend.replace('{' + keyName + "_ChangeFullDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd HH:MM:ss'));
                        }
                    }
                }

            });
            html += htmlApend;

        });
        if ($("#" + CONTAINER)[0]) {
            $("#" + CONTAINER).html(html);
            $("#" + CONTAINER).css('display', DISLAY);
            //AUTHORIZATION.Action(SESSION_INFO.Data.AMS_ROLE_ACTION);
            if (object[0].THIS_IS_CALL_BACK) {
                object[0].THIS_IS_CALL_BACK(result)
            }
        }

    },

}
var PROVIDER_DYNAMIC = {
    ADD: function (object) {
        if (VALIDATE.ValidateInput(object[0].LIST_VALIDATE)) {
            var JSON_DATA_POST = $.parseJSON('{"PRIMARY_KEY": {"Key": "' + object[0].PRIMARY_KEY + '","Value": "' + object[0].PRIMARY_VALUE + '"},"SettingCode": "' + object[0].CONTAINER + '","ObjectName": "' + object[0].OBJECT_NAME + '","DATA_POST":[]}');
            $.each(object[0].LIST_CONTROLS_BIND_DATA, function (key, value) {
                switch (value.Type) {
                    case 'Textbox':
                        if ($("#" + key)[0]) {
                            var data = $("#" + key).val();
                            if (value.DataType.toLowerCase() == 'number')
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "number" });
                            else
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        }
                        break;
                    case 'DatePicker':
                        if ($("#" + key)[0]) {
                            if ($("#" + key).val().trim().length > 0) {
                                var date = $("#" + key).val().toDate("dd-MM-yyyy");
                                //"22/03/2016 14:03:01".toDate("dd/mm/yyyy hh:ii:ss");
                                //"2016-03-29 18:30:00".toDate("yyyy-mm-dd hh:ii:ss");
                                var data = COMMON.ConvertToJSONDate(COMMON.FormatDate(date, "MM/dd/yyyy"));
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                            }
                        }
                        break;
                    case 'SelectTree':
                        if ($("#" + key)[0]) {
                            //DATA_POST.Dict_Data[value.Mapping] = value.ComboTreeData._selectedItem.id;
                            var data = value.ComboTreeData._selectedItem.id;
                            //JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                            if (value.DataType.toLowerCase() == 'number')
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "number" });
                            else
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        }
                        break;
                    case 'SelectTreeName':
                        //DATA_POST.Dict_Data[value.Mapping] = value.ComboTreeData._selectedItem.title;
                        var data = value.ComboTreeData._selectedItem.title;
                        //JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        if (value.DataType.toLowerCase() == 'number')
                            JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "number" });
                        else
                            JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        break;
                    case 'Select':
                        if ($("#" + key)[0]) {
                            //DATA_POST.Dict_Data[value.Mapping] = $("#" + key).val();
                            var data = $("#" + key).val();
                            //JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                            if (value.DataType.toLowerCase() == 'number')
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "number" });
                            else
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        }
                        break;
                    case 'SelectName':
                        var controlName = '';
                        var arrItem = key.split("_");
                        for (i = 0; i < arrItem.length - 1; i++) {
                            controlName += arrItem[i] + "_";
                        }
                        controlName = controlName.substring(0, controlName.length - 1);
                        //DATA_POST.Dict_Data[value.Mapping] = $("#" + controlName + " :selected").text();
                        var data = $("#" + controlName + " :selected").text();
                        //JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        if (value.DataType.toLowerCase() == 'number')
                            JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "number" });
                        else
                            JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        break;
                    case 'Checkbox':
                        if ($("#" + key)[0]) {
                            //DATA_POST.Dict_Data[value.Mapping] = $("#" + key).is(':checked').toString();
                            var data = $("#" + key).is(':checked').toString();
                            //JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "bool" });
                            if (value.DataType.toLowerCase() == 'bool')
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "bool" });
                            if (value.DataType.toLowerCase() == 'bool01')
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "bool01" });
                        }
                        break;
                    case 'Radio':
                        //DATA_POST.Dict_Data[value.Mapping] = $("input[name='" + key + "']:checked").val();
                        var data = $("input[name='" + key + "']:checked").val();
                        //JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        if (value.DataType.toLowerCase() == 'number')
                            JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "number" });
                        else
                            JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        break;
                    case 'Image':
                        if ($("#" + key)[0]) {
                            //DATA_POST.Dict_Data[value.Mapping] = $("#" + key).attr('src');
                            var data = $("#" + key).attr('src');
                            JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        }
                        break;
                    case 'CkEditor':
                        var data = CKEDITOR.instances[key].getData();
                        //DATA_POST.Dict_Data[value.Mapping] = getData;                        
                        JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        break;
                    case 'EditorTextArea':
                        var data = $("textarea[name='" + key + "']").val();
                        JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        break;
                    default:

                }
            });
            //console.log(JSON_DATA_POST);
            $.ajax({
                type: "POST",
                url: COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                data: JSON.stringify(JSON_DATA_POST),
                beforeSend: function (req) {
                    req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
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
                        if (object[0].URL_RECDIRECT.length > 0) {
                            FORM.ShowMessage(result.Message + '<br/><a href="' + object[0].URL_RECDIRECT + '">Back to list</a>', 'Success');
                        }
                        else {
                            FORM.ShowMessage(result.Message, 'Success');
                        }
                        if (object[0].THIS_IS_CALL_BACK) {
                            object[0].THIS_IS_CALL_BACK(result)
                        }
                    }
                }
            });

        }
    },
    UPDATE: function (object) {
        if (VALIDATE.ValidateInput(object[0].LIST_VALIDATE)) {
            var JSON_DATA_POST = $.parseJSON('{"PRIMARY_KEY": {"Key": "' + object[0].PRIMARY_KEY + '","Value": "' + object[0].PRIMARY_VALUE + '"},"SettingCode": "' + object[0].CONTAINER + '","ObjectName": "' + object[0].OBJECT_NAME + '","DATA_POST":[]}');
            $.each(object[0].LIST_CONTROLS_BIND_DATA, function (key, value) {
                switch (value.Type) {
                    case 'Textbox':
                        if ($("#" + key)[0]) {
                            var data = $("#" + key).val();
                            if (value.DataType.toLowerCase() == 'number')
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "number" });
                            else
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        }
                        break;
                    case 'DatePicker':
                        if ($("#" + key)[0]) {
                            if ($("#" + key).val().trim().length > 0) {
                                var date = $("#" + key).val().toDate("dd-MM-yyyy");
                                //"22/03/2016 14:03:01".toDate("dd/mm/yyyy hh:ii:ss");
                                //"2016-03-29 18:30:00".toDate("yyyy-mm-dd hh:ii:ss");
                                var data = COMMON.ConvertToJSONDate(COMMON.FormatDate(date, "MM/dd/yyyy"));
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                            }
                        }
                        break;
                    case 'SelectTree':
                        if ($("#" + key)[0]) {
                            //DATA_POST.Dict_Data[value.Mapping] = value.ComboTreeData._selectedItem.id;
                            var data = value.ComboTreeData._selectedItem.id;
                            //JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                            if (value.DataType.toLowerCase() == 'number')
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "number" });
                            else
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        }
                        break;
                    case 'SelectTreeName':
                        //DATA_POST.Dict_Data[value.Mapping] = value.ComboTreeData._selectedItem.title;
                        var data = value.ComboTreeData._selectedItem.title;
                        //JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        if (value.DataType.toLowerCase() == 'number')
                            JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "number" });
                        else
                            JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        break;
                    case 'Select':
                        if ($("#" + key)[0]) {
                            //DATA_POST.Dict_Data[value.Mapping] = $("#" + key).val();
                            var data = $("#" + key).val();
                            //JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                            if (value.DataType.toLowerCase() == 'number')
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "number" });
                            else
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        }
                        break;
                    case 'SelectName':
                        var controlName = '';
                        var arrItem = key.split("_");
                        for (i = 0; i < arrItem.length - 1; i++) {
                            controlName += arrItem[i] + "_";
                        }
                        controlName = controlName.substring(0, controlName.length - 1);
                        //DATA_POST.Dict_Data[value.Mapping] = $("#" + controlName + " :selected").text();
                        var data = $("#" + controlName + " :selected").text();
                        //JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        if (value.DataType.toLowerCase() == 'number')
                            JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "number" });
                        else
                            JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        break;
                    case 'Checkbox':
                        if ($("#" + key)[0]) {
                            //DATA_POST.Dict_Data[value.Mapping] = $("#" + key).is(':checked').toString();
                            var data = $("#" + key).is(':checked').toString();
                            //JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "bool" });
                            if (value.DataType.toLowerCase() == 'bool')
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "bool" });
                            if (value.DataType.toLowerCase() == 'bool01')
                                JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "bool01" });
                        }
                        break;
                    case 'Radio':
                        //DATA_POST.Dict_Data[value.Mapping] = $("input[name='" + key + "']:checked").val();
                        var data = $("input[name='" + key + "']:checked").val();
                        //JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        if (value.DataType.toLowerCase() == 'number')
                            JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "number" });
                        else
                            JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        break;
                    case 'Image':
                        if ($("#" + key)[0]) {
                            //DATA_POST.Dict_Data[value.Mapping] = $("#" + key).attr('src');
                            var data = $("#" + key).attr('src');
                            JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        }
                        break;
                    case 'CkEditor':
                        var data = CKEDITOR.instances[key].getData();
                        //DATA_POST.Dict_Data[value.Mapping] = getData;                        
                        JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        break;
                    case 'EditorTextArea':
                        var data = $("textarea[name='" + key + "']").val();
                        JSON_DATA_POST.DATA_POST.push({ fieldName: value.Mapping, fieldValue: data, dataType: "string" });
                        break;
                    default:

                }
            });
            //console.log(JSON_DATA_POST);
            $.ajax({
                type: "PUT",
                url: COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                data: JSON.stringify(JSON_DATA_POST),
                beforeSend: function (req) {
                    req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
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
                        if (object[0].URL_RECDIRECT.length > 0) {
                            FORM.ShowMessage(result.Message + '<br/><a href="' + object[0].URL_RECDIRECT + '">Trở lại danh sách</a>', 'Success');
                        }
                        else {
                            FORM.ShowMessage(result.Message, 'Success');
                        }
                        if (object[0].THIS_IS_CALL_BACK) {
                            object[0].THIS_IS_CALL_BACK(result)
                        }
                    } else {
                        FORM.ShowMessage(result.Message, 'Error');

                    }
                }
            });

        }
    },
    DELETE: function (object) {
        $.ajax({
            type: "DELETE",
            url: COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME) + "/" + object[0].ID + "/" + object[0].CONTAINER + "/" + object[0].OBJECT_NAME,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            },
            success: function (result) {
                if (result.ResultCode == '203')
                    FORM.ShowMessage(result.Message, 'Error');
                if (result.ResultCode == '403')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '404')
                    FORM.ShowMessage(result.Message, 'Warning');
                if (result.ResultCode == '200') {
                    if (object[0].THIS_IS_CALL_BACK) {
                        object[0].THIS_IS_CALL_BACK(result);
                    }
                    //$("#row_" + object[0].ID).remove();
                }
            }
        });

    },
    GET_INFO_BY_EDIT: function (object) {
        var DATA_POST = object[0].DATA_POST;
        var strParam = '';
        //console.log(DATA_POST.LIST_PARAM_SEARCH);
        $.each(DATA_POST.LIST_PARAM_SEARCH, function (i, item) {
            if (item["dataType"] == "string") {
                strParam += '"' + item["fieldName"] + '": "\'' + item["fieldValue"] + '\'",';
            }
            else {
                strParam += '"' + item["fieldName"] + '": "' + item["fieldValue"] + '",';

            }
        });
        strParam = '{' + strParam.substring(0, strParam.length - 1) + '}';
        LIST_PARAM = $.parseJSON(strParam);
        $.ajax({
            type: "POST",
            url: COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME) + "/GET_INFO",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            data: JSON.stringify(DATA_POST),
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
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
                    $.each(object[0].LIST_CONTROLS_BIND_DATA, function (key, value) {
                        switch (value.Type) {
                            case 'Textbox':
                                if ($("#" + key)[0])
                                    $("#" + key).val(result.Data[value.Mapping]);
                                //dataSendCallback["#" + key] = result.Data[value.Mapping];
                                break;
                            case 'DatePicker':
                                var valueDate = result.Data[value.Mapping];
                                if ($("#" + key)[0])
                                    $("#" + key).val(COMMON.ConvertTDateToDate(valueDate, 'yyy-MM-dd'));
                                //dataSendCallback["#" + key] = COMMON.ConvertJSONDateToDate(valueDate, 'dd-MM-yyyy');
                                break;
                            case 'Select':
                                if (result.Data[value.Mapping].toLowerCase() == 'true') {
                                    if ($("#" + key)[0])
                                        $("#" + key).val('true');
                                    //dataSendCallback["#" + key] = 'true';
                                } else if (result.Data[value.Mapping].toLowerCase() == 'false') {
                                    if ($("#" + key)[0])
                                        $("#" + key).val('false');
                                    //dataSendCallback["#" + key] = 'false';
                                } else {
                                    //dataSendCallback["#" + key] = result.Data[value.Mapping].toString();
                                    if ($("#" + key)[0])
                                        $("#" + key).val(result.Data[value.Mapping].toString());
                                }
                                break;
                            case 'Checkbox':
                                if ($("#" + key)[0]) {
                                    if (result.Data[value.Mapping].toLowerCase() == 'true') {
                                        $("#" + key).attr('checked', true);
                                    } else if (result.Data[value.Mapping].toLowerCase() == 'false') {
                                        $("#" + key).attr('checked', false);
                                    } else if (result.Data[value.Mapping].toString() == '1') {
                                        $("#" + key).attr('checked', true);
                                    } else if (result.Data[value.Mapping].toString() == '0') {
                                        $("#" + key).attr('checked', false);
                                    }
                                    //dataSendCallback["#" + key] = result.Data[value.Mapping];

                                }
                                break;
                            case 'Radio':
                                $("input[name='" + key + "']:checked").val(result.Data[value.Mapping]);
                                //dataSendCallback["#" + key] = result.Data[value.Mapping];
                                break;
                            case 'Image':
                                if ($("#" + key)[0])
                                    $("#" + key).attr('src', result.Data[value.Mapping]);
                                //dataSendCallback["#" + key] = result.Data[value.Mapping];
                                break;
                            case 'CkEditor':
                                CKEDITOR.replace(key);
                                CKEDITOR.instances[key].setData(result.Data[value.Mapping]);
                                //dataSendCallback["#" + key] = result.Data[value.Mapping];
                                break;
                            case 'EditorTextArea':
                                $("textarea[name='" + key + "']").data('wysihtml5').editor.setValue(result.Data[value.Mapping]);

                                break;

                        }

                    });
                    if (object[0].THIS_IS_CALL_BACK) {
                        //console.log('calling the callback')
                        object[0].THIS_IS_CALL_BACK(result.Data);
                    }
                }
            }
        });

    },
    PROCESSING: function (object) {
        FORM.ShowPoup('divProgressWaiting');
        var CONTAINER = object[0].CONTAINER;
        var TEMPLATE = object[0].TEMPLATE;
        var ARRAY_KEY = object[0].ARRAY_KEY;
        var DATA_POST = object[0].DATA_POST;
        var DISLAY = object[0].DISLAY;
        $("#" + CONTAINER).html('');
        var html = '';
        $.ajax({
            type: "POST",
            url: COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            data: JSON.stringify(DATA_POST),
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
                    if (result.TotalRecords > 0) {
                        $.each(result.Data, function (i, item) {
                            var htmlApend = TEMPLATE;
                            $.each(item, function (keyName, valueItem) {
                                if (ARRAY_KEY.indexOf(keyName) != -1) {
                                    while (htmlApend.indexOf('{' + keyName + '}') != -1) {
                                        //htmlApend = htmlApend.replace('{' + keyName + '}', valueItem);
                                        htmlApend = htmlApend.replace('{' + keyName + '}', COMMON.GetTitleStatus(object[0].DATA_SOURCES, keyName, (typeof valueItem != 'object' ? valueItem : JSON.stringify(valueItem))));
                                    }
                                } else {
                                    if (ARRAY_KEY.indexOf(keyName + "_FormatNumber") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_FormatNumber" + '}') != -1) {
                                            htmlApend = htmlApend.replace('{' + keyName + "_FormatNumber" + '}', COMMON.AddCommas(valueItem));
                                        }
                                    } else if (ARRAY_KEY.indexOf(keyName + "_Timestamp") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_Timestamp" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_Timestamp" + '}', COMMON.ConvertTimestampToDate(valueItem));
                                        }
                                    }
                                    else if (ARRAY_KEY.indexOf(keyName + "_ChangeDate") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_ChangeDate" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                        }
                                    } else {
                                        while (htmlApend.indexOf('{' + keyName + "_ChangeFullDate" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeFullDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd HH:MM:ss'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_ChangeFullDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd HH:MM:ss'));
                                        }
                                    }
                                }

                            });
                            html += htmlApend;
                        });

                    }
                    if ($("#" + CONTAINER)[0]) {
                        $("#" + CONTAINER).html(html);
                        $("#" + CONTAINER).css('display', DISLAY);
                        //AUTHORIZATION.Action(SESSION_INFO.Data.AMS_ROLE_ACTION);
                        if (object[0].THIS_IS_CALL_BACK) {
                            object[0].THIS_IS_CALL_BACK(result)

                        }
                    }
                    FORM.ClosePoup('divProgressWaiting');
                }
            }
        });
    },
    PROCESSING_PAGINATION: function (object) {
        FORM.ShowPoup('divProgressWaiting');
        var CONTAINER_PAGINATION = object[0].CONTAINER_PAGINATION;
        var CONTAINER = object[0].CONTAINER;
        var TEMPLATE = object[0].TEMPLATE;
        var ARRAY_KEY = object[0].ARRAY_KEY;
        var DATA_POST = object[0].DATA_POST;
        var strParam = '{';
        //console.log(DATA_POST.LIST_PARAM_SEARCH);
        $.each(DATA_POST.LIST_FILLTER, function (i, item) {
            if (item["DATA_TYPE"] == "string") {
                strParam += '"' + item["FIELD_NAME"] + '": "\'' + item["FIELD_VALUE"] + '\'",';
            }
            else {
                strParam += '"' + item["FIELD_NAME"] + '": "' + item["FIELD_VALUE"] + '",';
            }
        });
        strParam += '"PAGE_INDEX":"' + DATA_POST.PAGE_INDEX + '","PAGE_SIZE":"' + DATA_POST.PAGE_SIZE + '"}';
        LIST_PARAM = $.parseJSON(strParam);
        var DISLAY = object[0].DISLAY;
        var CONTAINER_TOTAL_RECORD = object[0].CONTAINER_TOTAL_RECORD;
        $("#" + CONTAINER_PAGINATION).html('');
        $("#" + CONTAINER_TOTAL_RECORD).html('');
        $("#" + CONTAINER).html('');
        var html = '';
        $.ajax({
            type: "POST",
            url: COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            data: JSON.stringify(DATA_POST),
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
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
                    //console.log(result);
                    //console.log(LIST_PARAM);
                    if (CONTAINER_TOTAL_RECORD != null && CONTAINER_TOTAL_RECORD != 'undefined') {
                        $("#" + CONTAINER_TOTAL_RECORD).html(COMMON.AddCommas(result.TotalRecords));
                    }
                    if (result.TotalRecords > 0) {
                        var totalPage = 0;
                        var totalRemainder = result.TotalRecords % PAGE_SIZE;
                        totalPage = (result.TotalRecords - totalRemainder) / PAGE_SIZE;
                        if (totalRemainder > 0) {
                            totalPage = totalPage + 1;
                        }
                        if ($('#' + CONTAINER_PAGINATION).data("twbs-pagination")) {
                            $('#' + CONTAINER_PAGINATION).twbsPagination('destroy');
                        }
                        $('#' + CONTAINER_PAGINATION).twbsPagination({
                            totalPages: totalPage,
                            visiblePages: 5,
                            onPageClick: function (event, page) {
                                DATA_POST.PAGE_INDEX = page;
                                console.log(DATA_POST);
                                var DATA_DYNAMIC = [{
                                    "TEMPLATE": TEMPLATE,
                                    "CONTAINER": object[0].CONTAINER,
                                    "DATA_SOURCES": object[0].DATA_SOURCES,
                                    "SERVICE_NAME": object[0].SERVICE_NAME,
                                    "ARRAY_KEY": ARRAY_KEY,
                                    "DATA_POST": DATA_POST,
                                    "DISLAY": object[0].DISLAY
                                }];
                                PROVIDER_DYNAMIC.PROCESSING(DATA_DYNAMIC);
                            }
                        });
                        $.each(result.Data, function (i, item) {
                            var htmlApend = TEMPLATE;
                            $.each(item, function (keyName, valueItem) {
                                if (ARRAY_KEY.indexOf(keyName) != -1) {
                                    while (htmlApend.indexOf('{' + keyName + '}') != -1) {
                                        //htmlApend = htmlApend.replace('{' + keyName + '}', valueItem);
                                        htmlApend = htmlApend.replace('{' + keyName + '}', COMMON.GetTitleStatus(object[0].DATA_SOURCES, keyName, (typeof valueItem != 'object' ? valueItem : JSON.stringify(valueItem))));
                                    }
                                } else {
                                    if (ARRAY_KEY.indexOf(keyName + "_FormatNumber") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_FormatNumber" + '}') != -1) {
                                            htmlApend = htmlApend.replace('{' + keyName + "_FormatNumber" + '}', COMMON.AddCommas(valueItem));
                                        }
                                    } else if (ARRAY_KEY.indexOf(keyName + "_Timestamp") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_Timestamp" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_Timestamp" + '}', COMMON.ConvertTimestampToDate(valueItem));
                                        }
                                    }
                                    else if (ARRAY_KEY.indexOf(keyName + "_ChangeDate") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_ChangeDate" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                        }
                                    } else {
                                        while (htmlApend.indexOf('{' + keyName + "_ChangeFullDate" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeFullDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd HH:MM:ss'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_ChangeFullDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd HH:MM:ss'));
                                        }
                                    }
                                }

                            });
                            html += htmlApend;
                        });

                    } else {
                        if ($("#" + CONTAINER_PAGINATION)[0]) {
                            $("#" + CONTAINER_PAGINATION).html('');
                        }
                    }
                    if ($("#" + CONTAINER)[0]) {
                        $("#" + CONTAINER).html(html);
                        $("#" + CONTAINER).css('display', DISLAY);
                        //AUTHORIZATION.Action(SESSION_INFO.Data.AMS_ROLE_ACTION);
                        if (object[0].THIS_IS_CALL_BACK) {
                            object[0].THIS_IS_CALL_BACK(result)

                        }
                    }
                    FORM.ClosePoup('divProgressWaiting');
                }
            }
        });


    },
}
var PROVIDER_SEARCH = {
    PROCESSING: function (object) {
        FORM.ShowPoup('divProgressWaiting');
        var CONTAINER = object[0].CONTAINER;
        var TEMPLATE = object[0].TEMPLATE;
        var ARRAY_KEY = object[0].ARRAY_KEY;
        var DATA_POST = object[0].DATA_POST;
        var DISLAY = object[0].DISLAY;
        $("#" + CONTAINER).html('');
        var html = '';
        $.ajax({
            type: "POST",
            url: COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            data: JSON.stringify(DATA_POST),
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
                    if (result.TotalRecords > 0) {
                        $.each(result.Data, function (i, item) {
                            var htmlApend = TEMPLATE;
                            $.each(item, function (keyName, valueItem) {
                                if (ARRAY_KEY.indexOf(keyName) != -1) {
                                    while (htmlApend.indexOf('{' + keyName + '}') != -1) {
                                        //htmlApend = htmlApend.replace('{' + keyName + '}', valueItem);
                                        htmlApend = htmlApend.replace('{' + keyName + '}', COMMON.GetTitleStatus(object[0].DATA_SOURCES, keyName, (typeof valueItem != 'object' ? valueItem : JSON.stringify(valueItem))));
                                    }
                                } else {
                                    if (ARRAY_KEY.indexOf(keyName + "_FormatNumber") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_FormatNumber" + '}') != -1) {
                                            htmlApend = htmlApend.replace('{' + keyName + "_FormatNumber" + '}', COMMON.AddCommas(valueItem));
                                        }
                                    } else if (ARRAY_KEY.indexOf(keyName + "_Timestamp") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_Timestamp" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_Timestamp" + '}', COMMON.ConvertTimestampToDate(valueItem));
                                        }
                                    }
                                    else if (ARRAY_KEY.indexOf(keyName + "_ChangeDate") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_ChangeDate" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                        }
                                    } else {
                                        while (htmlApend.indexOf('{' + keyName + "_ChangeFullDate" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeFullDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd HH:MM:ss'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_ChangeFullDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd HH:MM:ss'));
                                        }
                                    }
                                }

                            });
                            html += htmlApend;
                        });

                    }
                    if ($("#" + CONTAINER)[0]) {
                        $("#" + CONTAINER).html(html);
                        $("#" + CONTAINER).css('display', DISLAY);
                        //AUTHORIZATION.Action(SESSION_INFO.Data.AMS_ROLE_ACTION);
                        if (object[0].THIS_IS_CALL_BACK) {
                            object[0].THIS_IS_CALL_BACK(result)

                        }
                    }
                    FORM.ClosePoup('divProgressWaiting');
                }
            }
        });
    },
    PROCESSING_PAGINATION: function (object) {
        FORM.ShowPoup('divProgressWaiting');
        var CONTAINER_PAGINATION = object[0].CONTAINER_PAGINATION;
        var CONTAINER = object[0].CONTAINER;
        var TEMPLATE = object[0].TEMPLATE;
        var ARRAY_KEY = object[0].ARRAY_KEY;
        var DATA_POST = object[0].DATA_POST;
        var DISLAY = object[0].DISLAY;
        var CONTAINER_TOTAL_RECORD = object[0].CONTAINER_TOTAL_RECORD;
        $("#" + CONTAINER_PAGINATION).html('');
        $("#" + CONTAINER_TOTAL_RECORD).html('');
        $("#" + CONTAINER).html('');
        var html = '';
        $.ajax({
            type: "POST",
            url: COMMON.GetServiceUrl(object[0].DATA_SOURCES, object[0].SERVICE_NAME),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            data: JSON.stringify(DATA_POST),
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
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
                    if (CONTAINER_TOTAL_RECORD != null && CONTAINER_TOTAL_RECORD != 'undefined') {
                        $("#" + CONTAINER_TOTAL_RECORD).html(COMMON.AddCommas(result.TotalRecords));
                    }
                    if (result.TotalRecords > 0) {
                        var totalPage = 0;
                        var totalRemainder = result.TotalRecords % PAGE_SIZE;
                        totalPage = (result.TotalRecords - totalRemainder) / PAGE_SIZE;
                        if (totalRemainder > 0) {
                            totalPage = totalPage + 1;
                        }
                        if ($('#' + CONTAINER_PAGINATION).data("twbs-pagination")) {
                            $('#' + CONTAINER_PAGINATION).twbsPagination('destroy');
                        }
                        $('#' + CONTAINER_PAGINATION).twbsPagination({
                            totalPages: totalPage,
                            visiblePages: 5,
                            onPageClick: function (event, page) {
                                DATA_POST.pageIndex = page;
                                var DATA_DYNAMIC = [{
                                    "TEMPLATE": TEMPLATE,
                                    "CONTAINER": object[0].CONTAINER,
                                    "DATA_SOURCES": object[0].DATA_SOURCES,
                                    "SERVICE_NAME": object[0].SERVICE_NAME,
                                    "ARRAY_KEY": ARRAY_KEY,
                                    "DATA_POST": DATA_POST,
                                    "DISLAY": object[0].DISLAY
                                }];
                                PROVIDER_DYNAMIC.PROCESSING(DATA_DYNAMIC);
                            }
                        });
                        $.each(result.Data, function (i, item) {
                            var htmlApend = TEMPLATE;
                            $.each(item, function (keyName, valueItem) {
                                if (ARRAY_KEY.indexOf(keyName) != -1) {
                                    while (htmlApend.indexOf('{' + keyName + '}') != -1) {
                                        //htmlApend = htmlApend.replace('{' + keyName + '}', valueItem);
                                        htmlApend = htmlApend.replace('{' + keyName + '}', COMMON.GetTitleStatus(object[0].DATA_SOURCES, keyName, (typeof valueItem != 'object' ? valueItem : JSON.stringify(valueItem))));
                                    }
                                } else {
                                    if (ARRAY_KEY.indexOf(keyName + "_FormatNumber") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_FormatNumber" + '}') != -1) {
                                            htmlApend = htmlApend.replace('{' + keyName + "_FormatNumber" + '}', COMMON.AddCommas(valueItem));
                                        }
                                    } else if (ARRAY_KEY.indexOf(keyName + "_Timestamp") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_Timestamp" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_Timestamp" + '}', COMMON.ConvertTimestampToDate(valueItem));
                                        }
                                    }
                                    else if (ARRAY_KEY.indexOf(keyName + "_ChangeDate") != -1) {
                                        while (htmlApend.indexOf('{' + keyName + "_ChangeDate" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_ChangeDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd'));
                                        }
                                    } else {
                                        while (htmlApend.indexOf('{' + keyName + "_ChangeFullDate" + '}') != -1) {
                                            //htmlApend = htmlApend.replace('{' + keyName + "_ChangeFullDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd HH:MM:ss'));
                                            htmlApend = htmlApend.replace('{' + keyName + "_ChangeFullDate" + '}', COMMON.ConvertTDateToDate(valueItem, 'yyyy-MM-dd HH:MM:ss'));
                                        }
                                    }
                                }

                            });
                            html += htmlApend;
                        });

                    } else {
                        if ($("#" + CONTAINER_PAGINATION)[0]) {
                            $("#" + CONTAINER_PAGINATION).html('');
                        }
                    }
                    if ($("#" + CONTAINER)[0]) {
                        $("#" + CONTAINER).html(html);
                        $("#" + CONTAINER).css('display', DISLAY);
                        //AUTHORIZATION.Action(SESSION_INFO.Data.AMS_ROLE_ACTION);
                        if (object[0].THIS_IS_CALL_BACK) {
                            object[0].THIS_IS_CALL_BACK(result);

                        }
                    }
                    FORM.ClosePoup('divProgressWaiting');
                }
            }
        });


    },
}
//End PROVIDER-------------------------------------------------------------------------------------------------------------------------
var AUTHORIZATION = {
    GetListFunctionCode: function (arrTag) {
        var LIST_CLASS_DATA_PERMISSION = { items: [] };
        for (var tag = 0; tag < arrTag.length; tag++) {
            var allListElements = $(arrTag[tag]);
            for (var j = 0; j < allListElements.length; j++) {
                var className = allListElements[j].className.split(/\s+/);
                if (className[0].indexOf("AMS-") != -1) {
                    var item = { Name: className[0] };
                    LIST_CLASS_DATA_PERMISSION.items.push(item);
                }
            }
        }
        return LIST_CLASS_DATA_PERMISSION;
    },
    Action: function (AMS_ROLE_ACTION) {
        var arrTag = ["li", "p", "a", "div", "span", "table", "tr", "td"];
        var LIST_CLASS_DATA_PERMISSION = AUTHORIZATION.GetListFunctionCode(arrTag);
        $.each(LIST_CLASS_DATA_PERMISSION.items, function (i, item) {
            //console.log(PERMISSION_DATA.length);
            //console.log(PERMISSION_DATA);
            if (AMS_ROLE_ACTION.length > 0) {
                if (AMS_ROLE_ACTION.indexOf(item.Name) === -1) {
                    $("." + item.Name).remove();
                } else {
                    $("." + item.Name).show();
                }
            } else {
                $("." + item.Name).remove();
            }
        });
    },
    Function: function (AMS_ROLE_FUNCTIONS) {
        var pageName = window.location.pathname;
        //if (pageName != "/Dashboard") {          
        //    console.log(pageName);
        //    var FUNCTION_CODE = COMMON.GetUrlParam('fn');
        //    if (FUNCTION_CODE == null || FUNCTION_CODE.Length == 0) {
        //        window.location.href = "/Error";
        //    } else {
        //        if (AMS_ROLE_FUNCTIONS.indexOf(FUNCTION_CODE) === -1) {
        //            window.location.href = "/Error";
        //        }
        //    }
        //}

    }
}

//End Permission