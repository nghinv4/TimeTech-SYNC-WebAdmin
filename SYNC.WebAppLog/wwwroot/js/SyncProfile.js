var TEMPLATE_CHECK_VERSION = '';
var TEMPLATE_DOWNLOAD_VERSION = '';
var TEMPLATE_GOOGLE_DRIVE_STORAGE = '';
var TEMPLATE_SYNC_CLIENT_SERVER = '';
var TEMPLATE_DATA_PROFILE = '';
var TEMPLATE_POUP_DATA_PROFILE = '';
var TEMPLATE_DATA_SHARE_PROFILE = '';
var CHECK_VERSION = {
    LOAD_DATA: function () {
        TEMPLATE_CHECK_VERSION = TEMPLATE_CHECK_VERSION.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_CHECK_VERSION;
        var DATA_CHECK_VERSION = [{
            "TEMPLATE": TEMPLATE_CHECK_VERSION,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "SyncProfile/auth/DATA_CHECK_VERSION/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'IP', 'ACCOUNT', 'VERSION', 'DATE_TIME_Timestamp', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"IP":"-1","ACCOUNT":"-1","VERSION":"-1","CDATE_START_DATE":"-1","CDATE_END_DATE":"-1","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_CHECK_VERSION);
    },
    SEARCH: function () {
        var IP = $("#txtIP").val();
        if (IP == null || IP.length == 0) {
            IP = -1
        }
        var ACCOUNT = $("#txtACCOUNT").val();
        if (ACCOUNT == null || ACCOUNT.length == 0) {
            ACCOUNT = -1
        }
        var VERSION = $("#txtVERSION").val();
        if (VERSION == null || VERSION.length == 0) {
            VERSION = -1
        }
        var CDATE_START_DATE = $("#txtCDATE_START_DATE").val();
        if (CDATE_START_DATE == null || CDATE_START_DATE.length == 0) {
            CDATE_START_DATE = -1
        }
        var CDATE_END_DATE = $("#txtCDATE_END_DATE").val();
        if (CDATE_END_DATE == null || CDATE_END_DATE.length == 0) {
            CDATE_END_DATE = -1
        }
        TEMPLATE_CHECK_VERSION = TEMPLATE_CHECK_VERSION.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_CHECK_VERSION;
        var DATA_CHECK_VERSION = [{
            "TEMPLATE": TEMPLATE_CHECK_VERSION,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "SyncProfile/auth/DATA_CHECK_VERSION/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'IP', 'ACCOUNT', 'VERSION', 'DATE_TIME_Timestamp', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"IP":"' + IP + '","ACCOUNT":"' + ACCOUNT + '","VERSION":"' + VERSION + '","CDATE_START_DATE":"' + CDATE_START_DATE + '","CDATE_END_DATE":"' + CDATE_END_DATE + '","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_CHECK_VERSION);
    },
    DELETE: function (value) {
        if (value.length == 0) {
            var checked = 0;
            $(".checkbox-item").each(function () {
                if (this.checked) {
                    checked++;
                }
            });
            if (checked == 0) {
                FORM.ShowMessage("Select information to be deleted!", 'Error');
                return;
            }
            else {
                if (confirm("Confirm Delete data!") == true) {
                    $(".checkbox-item").each(function () {
                        if (this.checked) {
                            var DATA_CHECK_VERSION = [{
                                "ID": $(this).val(),
                                "DATA_SOURCES": "SyncProfile/auth/DATA_CHECK_VERSION",
                                "SERVICE_NAME": "SyncProfile",
                            }];
                            PROVIDER.DELETE(DATA_CHECK_VERSION);
                        }
                    });
                }
            }
        } else {
            if (confirm("Confirm Delete data!") == true) {
                var DATA_CHECK_VERSION = [{
                    "ID": value,
                    "DATA_SOURCES": "SyncProfile/auth/DATA_CHECK_VERSION",
                    "SERVICE_NAME": "SyncProfile",
                }];
                PROVIDER.DELETE(DATA_CHECK_VERSION);
            }

        }
    }
}
var DOWNLOAD_VERSION = {
    LOAD_DATA: function () {
        TEMPLATE_DOWNLOAD_VERSION = TEMPLATE_DOWNLOAD_VERSION.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_DOWNLOAD_VERSION;
        var DATA_DOWNLOAD_VERSION = [{
            "TEMPLATE": TEMPLATE_DOWNLOAD_VERSION,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "SyncProfile/auth/DATA_LOG/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'IP', 'ACCOUNT', 'VERSION', 'SERVER_NAME', 'PROFILE_NAME', 'START_DATE_Timestamp', 'END_DATE_Timestamp', 'SIZE_FormatNumber', 'STATUS', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"IP":"-1","ACCOUNT":"-1","VERSION":"-1","SERVER_NAME":"-1","CDATE_START_DATE":"-1","CDATE_END_DATE":"-1","STATUS":"-1","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_DOWNLOAD_VERSION);
    },
    SEARCH: function () {
        var IP = $("#txtIP").val();
        if (IP == null || IP.length == 0) {
            IP = -1
        }
        var ACCOUNT = $("#txtACCOUNT").val();
        if (ACCOUNT == null || ACCOUNT.length == 0) {
            ACCOUNT = -1
        }
        var VERSION = $("#txtVERSION").val();
        if (VERSION == null || VERSION.length == 0) {
            VERSION = -1
        }
        var SERVER_NAME = $("#txtSERVER_NAME").val();
        if (SERVER_NAME == null || SERVER_NAME.length == 0) {
            SERVER_NAME = -1
        }
        var CDATE_START_DATE = $("#txtCDATE_START_DATE").val();
        if (CDATE_START_DATE == null || CDATE_START_DATE.length == 0) {
            CDATE_START_DATE = -1
        }
        var CDATE_END_DATE = $("#txtCDATE_END_DATE").val();
        if (CDATE_END_DATE == null || CDATE_END_DATE.length == 0) {
            CDATE_END_DATE = -1
        }
        var STATUS = $("#dropSTATUS").val();
        if (STATUS == null) {
            STATUS = -1
        }
        TEMPLATE_DOWNLOAD_VERSION = TEMPLATE_DOWNLOAD_VERSION.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_DOWNLOAD_VERSION;
        var DATA_DOWNLOAD_VERSION = [{
            "TEMPLATE": TEMPLATE_DOWNLOAD_VERSION,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "SyncProfile/auth/DATA_LOG/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'IP', 'ACCOUNT', 'VERSION', 'SERVER_NAME', 'PROFILE_NAME', 'START_DATE_Timestamp', 'END_DATE_Timestamp', 'SIZE', 'STATUS', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"IP":"' + IP + '","ACCOUNT":"' + ACCOUNT + '","VERSION":"' + VERSION + '","SERVER_NAME":"' + SERVER_NAME + '","CDATE_START_DATE":"' + CDATE_START_DATE + '","CDATE_END_DATE":"' + CDATE_END_DATE + '","STATUS":"' + STATUS + '","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_DOWNLOAD_VERSION);
    },
    DELETE: function (value) {
        if (value.length == 0) {
            var checked = 0;
            $(".checkbox-item").each(function () {
                if (this.checked) {
                    checked++;
                }
            });
            if (checked == 0) {
                FORM.ShowMessage("Select information to be deleted!", 'Error');
                return;
            }
            else {
                if (confirm("Confirm Delete data!") == true) {
                    $(".checkbox-item").each(function () {
                        if (this.checked) {
                            var DATA_DOWNLOAD_VERSION = [{
                                "ID": $(this).val(),
                                "DATA_SOURCES": "SyncProfile/auth/DATA_LOG",
                                "SERVICE_NAME": "SyncProfile",
                            }];
                            PROVIDER.DELETE(DATA_DOWNLOAD_VERSION);
                        }
                    });
                }
            }
        } else {
            if (confirm("Confirm Delete data!") == true) {
                var DATA_DOWNLOAD_VERSION = [{
                    "ID": value,
                    "DATA_SOURCES": "SyncProfile/auth/DATA_LOG",
                    "SERVICE_NAME": "SyncProfile",
                }];
                PROVIDER.DELETE(DATA_DOWNLOAD_VERSION);
            }

        }
    }
}
var SYNC_CLIENT_SERVER = {
    LOAD_DATA: function () {
        TEMPLATE_SYNC_CLIENT_SERVER = TEMPLATE_SYNC_CLIENT_SERVER.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_SYNC_CLIENT_SERVER;
        var DATA_SYNC_CLIENT_SERVER = [{
            "TEMPLATE": TEMPLATE_SYNC_CLIENT_SERVER,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "SyncProfile/auth/DATA_SYNC/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'IP', 'ACCOUNT', 'VERSION', 'PROFILE_NAME', 'START_DATE_Timestamp', 'SIZE_FormatNumber', 'STATUS', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"IP":"-1","ACCOUNT":"-1","VERSION":"-1","PROFILE_NAME":"-1","CDATE_START_DATE":"-1","CDATE_END_DATE":"-1","STATUS":"-1","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_SYNC_CLIENT_SERVER);
    },
    SEARCH: function () {
        var IP = $("#txtIP").val();
        if (IP == null || IP.length == 0) {
            IP = -1
        }
        var ACCOUNT = $("#txtACCOUNT").val();
        if (ACCOUNT == null || ACCOUNT.length == 0) {
            ACCOUNT = -1
        }
        var VERSION = $("#txtVERSION").val();
        if (VERSION == null || VERSION.length == 0) {
            VERSION = -1
        }
        var PROFILE_NAME = $("#txtPROFILE_NAME").val();
        if (PROFILE_NAME == null || PROFILE_NAME.length == 0) {
            PROFILE_NAME = -1
        }
        var CDATE_START_DATE = $("#txtCDATE_START_DATE").val();
        if (CDATE_START_DATE == null || CDATE_START_DATE.length == 0) {
            CDATE_START_DATE = -1
        }
        var CDATE_END_DATE = $("#txtCDATE_END_DATE").val();
        if (CDATE_END_DATE == null || CDATE_END_DATE.length == 0) {
            CDATE_END_DATE = -1
        }
        var STATUS = $("#dropSTATUS").val();
        if (STATUS == null) {
            STATUS = -1
        }
        TEMPLATE_SYNC_CLIENT_SERVER = TEMPLATE_SYNC_CLIENT_SERVER.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_SYNC_CLIENT_SERVER;
        var DATA_SYNC_CLIENT_SERVER = [{
            "TEMPLATE": TEMPLATE_SYNC_CLIENT_SERVER,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "SyncProfile/auth/DATA_SYNC/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'IP', 'ACCOUNT', 'VERSION', 'PROFILE_NAME', 'START_DATE_Timestamp', 'END_DATE_Timestamp', 'SIZE_FormatNumber', 'STATUS', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"IP":"' + IP + '","ACCOUNT":"' + ACCOUNT + '","VERSION":"' + VERSION + '","PROFILE_NAME":"' + PROFILE_NAME + '","CDATE_START_DATE":"' + CDATE_START_DATE + '","CDATE_END_DATE":"' + CDATE_END_DATE + '","STATUS":"' + STATUS + '","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_SYNC_CLIENT_SERVER);
    },
    DELETE: function (value) {
        if (value.length == 0) {
            var checked = 0;
            $(".checkbox-item").each(function () {
                if (this.checked) {
                    checked++;
                }
            });
            if (checked == 0) {
                FORM.ShowMessage("Select information to be deleted!", 'Error');
                return;
            }
            else {
                if (confirm("Confirm Delete data!") == true) {
                    $(".checkbox-item").each(function () {
                        if (this.checked) {
                            var DATA_SYNC_CLIENT_SERVER = [{
                                "ID": $(this).val(),
                                "DATA_SOURCES": "SyncProfile/auth/DATA_SYNC",
                                "SERVICE_NAME": "SyncProfile",
                            }];
                            PROVIDER.DELETE(DATA_SYNC_CLIENT_SERVER);
                        }
                    });
                }
            }
        } else {
            if (confirm("Confirm Delete data!") == true) {
                var DATA_SYNC_CLIENT_SERVER = [{
                    "ID": value,
                    "DATA_SOURCES": "SyncProfile/auth/DATA_SYNC",
                    "SERVICE_NAME": "SyncProfile",
                }];
                PROVIDER.DELETE(DATA_SYNC_CLIENT_SERVER);
            }

        }
    },
    APPROVAL: function (value) {    
        const postData = [];
        if (value.length == 0) {            
            $(".checkbox-item").each(function () {
                if (this.checked) {
                    postData.push($(this).val());
                }
            });
            if (postData.length == 0) {
                FORM.ShowMessage("Select information to be Approval!", 'Error');
                return;
            }            
        } else {
            postData.push(value);
        }
        if (confirm("Confirm Approval data!") == true) {
            $.ajax({
                type: "PUT",
                url: COMMON.GetServiceUrl("SyncProfile/auth/DATA_SYNC/Approval", "SyncProfile"),
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
                        FORM.ShowMessage(result.Message, 'Success');
                        if (object[0].THIS_IS_CALL_BACK) {
                            object[0].THIS_IS_CALL_BACK(result)
                        }
                    } else {
                        FORM.ShowMessage(result.Message, 'Error');

                    }
                }
            });
        }
    }
}
var GOOGLE_DRIVE_STORAGE = {
    UPLOAD: function (typeUpload) {
        if (window.FormData !== undefined) {
            var formData = new FormData();
            formData.append('file', $('#transactionInputFile')[0].files[0]);
            $.ajax({
                url: COMMON.GetServiceUrl("GoogleDrive/auth/" + typeUpload, "SyncProfile"),
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function (req) {
                    req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
                },
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            percentComplete = parseInt(percentComplete * 100);
                            console.log(percentComplete);
                            $("#div-progress-bar").attr("aria-valuenow", percentComplete);
                            $("#div-progress-bar").css("width", percentComplete + "%");
                            $("#div-progress-bar-span").html(percentComplete + "% Complete");
                            if (percentComplete == 100) {
                                $("#help-transaction").html("Please wait: Processing in progress");
                            }
                        }
                    }, false);
                    return xhr;
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
                        $("#help-transaction").html("Please wait: Completed progress");
                    }
                }
            });
        } else {
            FORM.ShowMessage("FormData is not supported.", 'Error');
        }
    },
    LOAD_DATA: function (driverName) {
        TEMPLATE_GOOGLE_DRIVE_STORAGE = TEMPLATE_GOOGLE_DRIVE_STORAGE.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_GOOGLE_DRIVE_STORAGE;
        var DATA_GOOGLE_DRIVE_STORAGE = [{
            "TEMPLATE": TEMPLATE_GOOGLE_DRIVE_STORAGE,
            "CONTAINER": "gridDataList",
            "DATA_SOURCES": "GoogleDrive/auth/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['Id', 'Name', 'Size_FormatNumber', 'Version', 'CreatedTime', 'Parents', 'MimeType'],
            "LIST_PARAM": $.parseJSON('{"driverName":"' + driverName + '","keyword":"-1"}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING(DATA_GOOGLE_DRIVE_STORAGE);
    },
    SEARCH: function () {
        var Keyword = $("#txtKeyword").val();
        if (Keyword == null || Keyword.length == 0) {
            Keyword = -1
        }
        var DRIVE_NAME = $("#dropDRIVE_NAME").val();
        if (DRIVE_NAME == null) {
            DRIVE_NAME = -1
        }
        console.log("Keyword : "  + Keyword);
        console.log("DRIVE_NAME : " + DRIVE_NAME);
        TEMPLATE_GOOGLE_DRIVE_STORAGE = TEMPLATE_GOOGLE_DRIVE_STORAGE.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_GOOGLE_DRIVE_STORAGE;
        var DATA_GOOGLE_DRIVE_STORAGE = [{
            "TEMPLATE": TEMPLATE_GOOGLE_DRIVE_STORAGE,
            "CONTAINER": "gridDataList",
            "DATA_SOURCES": "GoogleDrive/auth/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['Id', 'Name', 'Size_FormatNumber', 'Version', 'CreatedTime', 'Parents', 'MimeType'],
            "LIST_PARAM": $.parseJSON('{"driverName":"' + DRIVE_NAME + '","keyword":"' + Keyword + '"}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING(DATA_GOOGLE_DRIVE_STORAGE);
    },
    DELETE: function (value) {
        var driverName = $("#dropDRIVE_NAME").val();
        if (driverName == null || driverName.length == 0) {
            FORM.ShowMessage("Select information drive name", 'Warning');
            return;
        }
        if (value.length == 0) {
            var checked = 0;
            $(".checkbox-item").each(function () {
                if (this.checked) {
                    checked++;
                }
            });
            if (checked == 0) {
                FORM.ShowMessage("Select information to be deleted!", 'Error');
                return;
            }
            else {
                if (confirm("Confirm Delete data!") == true) {
                    $(".checkbox-item").each(function () {
                        if (this.checked) {
                            var DATA_GOOGLE_DRIVE_STORAGE = [{
                                "ID": $(this).val(),
                                "DATA_SOURCES": "GoogleDrive/auth" + "/" + driverName,
                                "SERVICE_NAME": "SyncProfile"
                            }];
                            PROVIDER.DELETE(DATA_GOOGLE_DRIVE_STORAGE);
                        }
                    });
                }
            }
        } else {
            if (confirm("Confirm Delete data!") == true) {
                var DATA_GOOGLE_DRIVE_STORAGE = [{
                    "ID": value,
                    "DATA_SOURCES": "GoogleDrive/auth" + "/" + driverName,
                    "SERVICE_NAME": "SyncProfile"
                }];
                PROVIDER.DELETE(DATA_GOOGLE_DRIVE_STORAGE);
            }

        }
    },
    IMPORT: function (value,code) {
        const postData = [];
        const postDataCode = [];
        if (code.length > 0)
            postDataCode.push(code);
        if (value.length > 0)
            postData.push(value);
        if (value.length == 0) {
            $(".checkbox-itemPoup").each(function () {
                if (this.checked) {                    
                    postData.push($(this).val());
                    var name = $(this).attr("name");
                    postDataCode.push(name);
                }
            });            
        } 
        if (postData.length == 0) {
            FORM.ShowMessage("Select information to be import!", 'Error');
            return;
        }
        if (confirm("Confirm import data!") == true) {
            $.ajax({
                type: "PUT",
                url: COMMON.GetServiceUrl("SyncProfile/auth/DATA_PROFILE/Import", "SyncProfile"),
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
                        $.each(postDataCode, function (index, val) {
                            $("#row_" + val).remove();
                        });
                        DATA_PROFILE.LOAD_DATA();
                        FORM.ShowMessage(result.Message, 'Success');
                    } 
                }
            });
        }
    }
}
var DATA_PROFILE = {
    LOAD_DATA: function () {
        TEMPLATE_DATA_PROFILE = TEMPLATE_DATA_PROFILE.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_DATA_PROFILE;
        var DATA_PROFILE_CLIENT_SERVER = [{
            "TEMPLATE": TEMPLATE_DATA_PROFILE,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "SyncProfile/auth/DATA_PROFILE/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'STORAGE', 'FILE_NAME', 'VERSION', 'PROFILE_NAME', 'START_DATE_Timestamp', 'SIZE_FormatNumber', 'STATUS', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"PROFILE_NAME":"-1","STORAGE":"-1","CDATE_START_DATE":"-1","CDATE_END_DATE":"-1","STATUS":"-1","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_PROFILE_CLIENT_SERVER);
    },
    SEARCH: function () {        
        var STORAGE = $("#dropDRIVE_NAME").val();;
        if (STORAGE == null || STORAGE.length == 0) {
            STORAGE = -1
        }
        var PROFILE_NAME = $("#txtPROFILE_NAME").val();
        if (PROFILE_NAME == null || PROFILE_NAME.length == 0) {
            PROFILE_NAME = -1
        }
        var CDATE_START_DATE = $("#txtCDATE_START_DATE").val();
        if (CDATE_START_DATE == null || CDATE_START_DATE.length == 0) {
            CDATE_START_DATE = -1
        }
        var CDATE_END_DATE = $("#txtCDATE_END_DATE").val();
        if (CDATE_END_DATE == null || CDATE_END_DATE.length == 0) {
            CDATE_END_DATE = -1
        }
        var STATUS = $("#dropSTATUS").val();
        if (STATUS == null) {
            STATUS = -1
        }
        TEMPLATE_DATA_PROFILE = TEMPLATE_DATA_PROFILE.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_DATA_PROFILE;
        var DATA_PROFILE_CLIENT_SERVER = [{
            "TEMPLATE": TEMPLATE_DATA_PROFILE,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "SyncProfile/auth/DATA_PROFILE/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'STORAGE', 'FILE_NAME', 'VERSION', 'PROFILE_NAME', 'START_DATE_Timestamp', 'SIZE_FormatNumber', 'STATUS', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"PROFILE_NAME":"' + PROFILE_NAME + '","STORAGE":"' + STORAGE + '","CDATE_START_DATE":"' + CDATE_START_DATE + '","CDATE_END_DATE":"' + CDATE_END_DATE + '","STATUS":"' + STATUS + '","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_PROFILE_CLIENT_SERVER);
    },
    DELETE: function (value) {
        if (value.length == 0) {
            var checked = 0;
            $(".checkbox-item").each(function () {
                if (this.checked) {
                    checked++;
                }
            });
            if (checked == 0) {
                FORM.ShowMessage("Select information to be deleted!", 'Error');
                return;
            }
            else {
                if (confirm("Confirm Delete data!") == true) {
                    $(".checkbox-item").each(function () {
                        if (this.checked) {
                            var DATA_PROFILE_CLIENT_SERVER = [{
                                "ID": $(this).val(),
                                "DATA_SOURCES": "SyncProfile/auth/DATA_PROFILE",
                                "SERVICE_NAME": "SyncProfile",
                            }];
                            PROVIDER.DELETE(DATA_PROFILE_CLIENT_SERVER);
                        }
                    });
                }
            }
        } else {
            if (confirm("Confirm Delete data!") == true) {
                var DATA_PROFILE_CLIENT_SERVER = [{
                    "ID": value,
                    "DATA_SOURCES": "SyncProfile/auth/DATA_PROFILE",
                    "SERVICE_NAME": "SyncProfile",
                }];
                PROVIDER.DELETE(DATA_PROFILE_CLIENT_SERVER);
            }

        }
    },
    APPROVAL: function (value) {
        const postData = [];
        if (value.length == 0) {
            $(".checkbox-item").each(function () {
                if (this.checked) {
                    postData.push($(this).val());
                }
            });
            if (postData.length == 0) {
                FORM.ShowMessage("Select information to be Approval!", 'Error');
                return;
            }
        } else {
            postData.push(value);
        }
        if (confirm("Confirm Approval data!") == true) {
            $.ajax({
                type: "PUT",
                url: COMMON.GetServiceUrl("SyncProfile/auth/DATA_PROFILE/Approval", "SyncProfile"),
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
                        FORM.ShowMessage(result.Message, 'Success');
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
    POUP_LOAD_DATA: function () {
        TEMPLATE_POUP_DATA_PROFILE = TEMPLATE_POUP_DATA_PROFILE.length == 0 ? $("#gridDataListPoup")[0].innerHTML : TEMPLATE_POUP_DATA_PROFILE;
        var DATA_PROFILE = [{
            "TEMPLATE": TEMPLATE_POUP_DATA_PROFILE,            
            "CONTAINER": "gridDataListPoup",            
            "DATA_SOURCES": "SyncProfile/auth/Ftp/GetList",
            "SERVICE_NAME": "FtpServer",
            "ARRAY_KEY": ['KEY', 'VALUE'],
            "LIST_PARAM": $.parseJSON('{}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING(DATA_PROFILE);
    },
}
var DATA_SHARE_PROFILE = {
    LOAD_DATA: function (client_id) {
        TEMPLATE_DATA_SHARE_PROFILE = TEMPLATE_DATA_SHARE_PROFILE.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_DATA_SHARE_PROFILE;
        var DATA_SHARE_PROFILE_CLIENT_SERVER = [{
            "TEMPLATE": TEMPLATE_DATA_SHARE_PROFILE,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "SyncProfile/auth/DATA_SHARE_PROFILE/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'PROFILE_NAME', 'STORAGE', 'CLIENT_ID', 'START_DATE_Timestamp', 'SIZE_FormatNumber', 'STATUS', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"PROFILE_NAME":"-1","CLIENT_ID":"' + client_id + '","STATUS":"-1","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_SHARE_PROFILE_CLIENT_SERVER);
    },
    DELETE: function (value) {
        if (value.length == 0) {
            var checked = 0;
            $(".checkbox-item").each(function () {
                if (this.checked) {
                    checked++;
                }
            });
            if (checked == 0) {
                FORM.ShowMessage("Select information to be deleted!", 'Error');
                return;
            }
            else {
                if (confirm("Confirm Delete data!") == true) {
                    $(".checkbox-item").each(function () {
                        if (this.checked) {
                            var DATA_SHARE_PROFILE_CLIENT_SERVER = [{
                                "ID": $(this).val(),
                                "DATA_SOURCES": "SyncProfile/auth/DATA_SHARE_PROFILE",
                                "SERVICE_NAME": "SyncProfile",
                            }];
                            PROVIDER.DELETE(DATA_SHARE_PROFILE_CLIENT_SERVER);
                        }
                    });
                }
            }
        } else {
            if (confirm("Confirm Delete data!") == true) {
                var DATA_SHARE_PROFILE_CLIENT_SERVER = [{
                    "ID": value,
                    "DATA_SOURCES": "SyncProfile/auth/DATA_SHARE_PROFILE",
                    "SERVICE_NAME": "SyncProfile",
                }];
                PROVIDER.DELETE(DATA_SHARE_PROFILE_CLIENT_SERVER);
            }

        }
    },
    APPROVAL: function (value) {
        const postData = [];
        if (value.length == 0) {
            $(".checkbox-item").each(function () {
                if (this.checked) {
                    postData.push($(this).val());
                }
            });
            if (postData.length == 0) {
                FORM.ShowMessage("Select information to be Approval!", 'Error');
                return;
            }
        } else {
            postData.push(value);
        }
        if (confirm("Confirm Approval data!") == true) {
            $.ajax({
                type: "PUT",
                url: COMMON.GetServiceUrl("SyncProfile/auth/DATA_SHARE_PROFILE/Approval", "SyncProfile"),
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
                        FORM.ShowMessage(result.Message, 'Success');
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
    POUP_LOAD_DATA: function () {
        TEMPLATE_POUP_DATA_PROFILE = TEMPLATE_POUP_DATA_PROFILE.length == 0 ? $("#gridDataListPoup")[0].innerHTML : TEMPLATE_POUP_DATA_PROFILE;
        var DATA_PROFILE_CLIENT_SERVER = [{
            "TEMPLATE": TEMPLATE_POUP_DATA_PROFILE,
            "CONTAINER_PAGINATION": "paginationDataPoup",
            "CONTAINER": "gridDataListPoup",
            "CONTAINER_TOTAL_RECORD": "totalRecordsPoup",
            "DATA_SOURCES": "SyncProfile/auth/DATA_PROFILE/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'STORAGE', 'FILE_NAME', 'VERSION', 'PROFILE_NAME', 'START_DATE_Timestamp', 'SIZE_FormatNumber', 'STATUS', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"PROFILE_NAME":"-1","STORAGE":"-1","CDATE_START_DATE":"-1","CDATE_END_DATE":"-1","STATUS":"1","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "block"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_PROFILE_CLIENT_SERVER);
    },
    POUP_SEARCH: function () {
        var STORAGE = $("#dropDRIVE_NAME").val();;
        if (STORAGE == null || STORAGE.length == 0) {
            STORAGE = -1
        }
        var PROFILE_NAME = $("#txtPROFILE_NAME").val();
        if (PROFILE_NAME == null || PROFILE_NAME.length == 0) {
            PROFILE_NAME = -1
        }
        var CDATE_START_DATE = $("#txtCDATE_START_DATE").val();
        if (CDATE_START_DATE == null || CDATE_START_DATE.length == 0) {
            CDATE_START_DATE = -1
        }
        var CDATE_END_DATE = $("#txtCDATE_END_DATE").val();
        if (CDATE_END_DATE == null || CDATE_END_DATE.length == 0) {
            CDATE_END_DATE = -1
        }
        TEMPLATE_DATA_PROFILE = TEMPLATE_DATA_PROFILE.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_DATA_PROFILE;
        var DATA_PROFILE_CLIENT_SERVER = [{
            "TEMPLATE": TEMPLATE_POUP_DATA_PROFILE,
            "CONTAINER_PAGINATION": "paginationDataPoup",
            "CONTAINER": "gridDataListPoup",
            "CONTAINER_TOTAL_RECORD": "totalRecordsPoup",
            "DATA_SOURCES": "SyncProfile/auth/DATA_PROFILE/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'STORAGE', 'FILE_NAME', 'VERSION', 'PROFILE_NAME', 'START_DATE_Timestamp', 'SIZE_FormatNumber', 'STATUS', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"PROFILE_NAME":"' + PROFILE_NAME + '","STORAGE":"' + STORAGE + '","CDATE_START_DATE":"' + CDATE_START_DATE + '","CDATE_END_DATE":"' + CDATE_END_DATE + '","STATUS":"1","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_PROFILE_CLIENT_SERVER);
    }
}