$(function () {
    
});
/*----------------------------------AMS_ROLES-----------------------------------------------------------------------------------------------*/
var AMS_ROLES_BIND_DATA = {    
    "txtROLE_NAME": { "Type": "Textbox", "Mapping": "name" },
    "txtDESCRIPTION": { "Type": "Textbox", "Mapping": "description" },
    "dropContainerId": { "Type": "Select", "Mapping": "containerId" },
    "ckComposite": { "Type": "Checkbox", "Mapping": "composite" },
    "ckClientRole": { "Type": "Checkbox", "Mapping": "clientRole" }    
};
var AMS_ROLES_VALIDATE = {};
var TEMPLATE_AMS_ROLES = '';
var TEMPLATE_AMS_ROLES_NAME = '';
var TEMPLATE_AMS_ROLES_ROLE_MAPPING_USER = '';
var TEMPLATE_AMS_ROLES_ROLE_MAPPING_FUNCTIONS = '';
var TEMPLATE_AMS_ROLES_ROLE_MAPPING_ACTIONS = '';
var AMS_ROLES = {
    LOAD_DATA: function () {
        TEMPLATE_AMS_ROLES = TEMPLATE_AMS_ROLES.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_AMS_ROLES;
        var DATA_AMS_ROLES = [{
            "TEMPLATE": TEMPLATE_AMS_ROLES,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "Role/auth/GetListRoles",
            "SERVICE_NAME": "Identity",
            "ARRAY_KEY": ['id', 'name', 'description', 'composite', 'clientRole', 'containerId'],
            "LIST_PARAM": $.parseJSON('{"realms":"-1","keyword":"-1","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_AMS_ROLES);
    },
    SEARCH: function () {        
        var keyword = $("#txtKeyword").val();
        if (keyword == null || keyword.length == 0) {
            keyword = -1
        }
        var realms = $("#dropContainerId").val();
        if (realms == null) {
            realms = -1
        }
        TEMPLATE_AMS_ROLES = TEMPLATE_AMS_ROLES.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_AMS_ROLES;
        var DATA_AMS_ROLES = [{
            "TEMPLATE": TEMPLATE_AMS_ROLES,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "Role/auth/GetListRoles",
            "SERVICE_NAME": "Identity",
            "ARRAY_KEY": ['id', 'name', 'description', 'composite', 'clientRole', 'containerId'],
            "LIST_PARAM": $.parseJSON('{"realms":"' + realms + '","keyword":"' + keyword + '","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_AMS_ROLES);
    },
    DELETE: function (value, containerId) {
        if (containerId == null || containerId.length == 0)
            containerId = COMMON.GetUrlParam('containerId');
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
                            var DATA_AMS_USERS = [{
                                "ID": $(this).val(),
                                "DATA_SOURCES": "Role/auth/Delete/" + containerId,
                                "SERVICE_NAME": "Identity"
                            }];
                            PROVIDER.DELETE(DATA_AMS_USERS);
                        }
                    });
                }
            }
        } else {
            if (confirm("Confirm Delete data!") == true) {
                var DATA_AMS_USERS = [{
                    "ID": value,
                    "DATA_SOURCES": "Role/auth/Delete/" + containerId,
                    "SERVICE_NAME": "Identity"
                }];
                PROVIDER.DELETE(DATA_AMS_USERS);
            }

        }
    },
    LOAD_INFO: function (id, containerId,thisIsCallBack) {
        if (id != '' && id.length > 0) {            
            var DATA_AMS_ROLES = [{
                "ID": id,
                "LIST_CONTROLS_BIND_DATA": AMS_ROLES_BIND_DATA,
                "DATA_SOURCES": "Role/auth/GetById/" + containerId,
                "SERVICE_NAME": "Identity",
                "THIS_IS_CALL_BACK": thisIsCallBack
            }];
            PROVIDER.GET_INFO_BY_EDIT(DATA_AMS_ROLES);
        }

    },
    INSERT_UPDATE: function () {
        var id = COMMON.GetUrlParam('id');
        var postData = '{';
        postData += (id != '' && id.length > 0) ? '"realms": "' + COMMON.GetUrlParam('containerId') + '",' : '"realms": "' + $("#dropContainerId").val() + '",';        
        postData += '     "dataPost": {';
        postData += (id != '' && id.length > 0) ? '"id": "' + id + '",' : "";
        postData += '     "name": "' + $('#txtROLE_NAME').val() + '",';
        postData += '     "description": "' + $('#txtDESCRIPTION').val() + '",';
        postData += '     "composite": ' + $("#ckComposite").is(':checked') + ',';
        postData += '     "clientRole": ' + $("#ckClientRole").is(':checked') + ',';
        postData += '     "containerId": "' + $("#dropContainerId").val() + '"';
        postData += '     }';
        postData += '}';        
        $.ajax({
            type: (id != '' && id.length > 0) ? "PUT" : "POST",
            url: (id != '' && id.length > 0) ? COMMON.GetServiceUrl("Role/auth/Update", "Identity") : COMMON.GetServiceUrl("Role/auth/Create", "Identity"),
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

    },
    LOAD_SELECT: function (selectValue,thisCallBack) {
        TEMPLATE_AMS_ROLES_NAME = TEMPLATE_AMS_ROLES_NAME.length == 0 ? $("#dropContainerId")[0].innerHTML : TEMPLATE_AMS_ROLES_NAME;
        var DATA_PARENT_CODE = [{
            "TEMPLATE": TEMPLATE_AMS_ROLES_NAME,
            "CONTAINER": "dropContainerId",
            "DATA_SOURCES": "GetListRealms",
            "SERVICE_NAME": "Identity",
            "ARRAY_KEY": ['Name', 'Description'],
            "LIST_PARAM": $.parseJSON('{}'),
            "APPEND_DATA": '<option value="-1">-- Select --</option> ',
            "SELECT_VALUE": ((selectValue != null && selectValue.length > 0) ? selectValue : "-1"),
            "DISLAY": "table-row-group",
            "THIS_IS_CALL_BACK": thisCallBack
        }];
        PROVIDER.LOAD_SELECT(DATA_PARENT_CODE);
    },
    LOAD_ROLE_MAPPING_USER: function (thisCallBack) {
        TEMPLATE_AMS_ROLES_ROLE_MAPPING_USER = TEMPLATE_AMS_ROLES_ROLE_MAPPING_USER.length == 0 ? $("#template-RoleMapping")[0].innerHTML : TEMPLATE_AMS_ROLES_ROLE_MAPPING_USER;
        var DATA_ROLE_MAPPING = [{
            "TEMPLATE": TEMPLATE_AMS_ROLES_ROLE_MAPPING_USER,
            "CONTAINER": "template-RoleMapping",
            "DATA_SOURCES": "Role/auth/GetListRoles",
            "SERVICE_NAME": "Identity",
            "ARRAY_KEY": ['id', 'name', 'description', 'composite', 'clientRole', 'containerId'],
            "LIST_PARAM": $.parseJSON('{"realms":"' + COMMON.GetUrlParam('realms') + '","keyword":"-1","PageIndex":' + PAGE_INDEX + ',"PageSize":' + DEFAULT_MAX_ITEM + '}'),
            "DISLAY": "table-header-group",
            "THIS_IS_CALL_BACK": thisCallBack
        }];
        PROVIDER.PROCESSING(DATA_ROLE_MAPPING);
    },
    ROLE_MAPPING_USER_SAVE: function () {
        var jsonDataMapping = [];
        var jsonDataRemove = [];
        $(".checkbox-role-mapping-user").each(function () {
            if (this.checked) {                
                var jsonItem = {};
                jsonItem['id'] = $(this).val();
                jsonItem['name'] = $(this).attr("name");
                jsonItem['description'] = $(this).attr("title");                
                jsonItem['composite'] = false;
                jsonItem['clientRole'] = false;
                jsonItem['containerId'] = COMMON.GetUrlParam('realms');
                jsonDataMapping.push(jsonItem);
            } else {
                var jsonItem = {};
                jsonItem['id'] = $(this).val();
                jsonItem['name'] = $(this).attr("name");
                jsonItem['description'] = $(this).attr("title");
                jsonItem['composite'] = false;
                jsonItem['clientRole'] = false;
                jsonItem['containerId'] = COMMON.GetUrlParam('realms');
                jsonDataRemove.push(jsonItem);
            }
        });        
        if (jsonDataRemove.length > 0) {
            var jsonItem = {};
            jsonItem['realms'] = COMMON.GetUrlParam('realms');
            jsonItem['id'] = COMMON.GetUrlParam('ID');
            jsonItem['dataPost'] = jsonDataRemove;
            $.ajax({
                type: "POST",
                url: COMMON.GetServiceUrl("Role/auth/UserMappings/Remove", "Identity"),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                async: false,
                data: JSON.stringify(jsonItem),
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
        if (jsonDataMapping.length > 0) {
            var jsonItem = {};
            jsonItem['realms'] = COMMON.GetUrlParam('realms');
            jsonItem['id'] = COMMON.GetUrlParam('ID');
            jsonItem['dataPost'] = jsonDataMapping;
            $.ajax({
                type: "POST",
                url: COMMON.GetServiceUrl("Role/auth/UserMappings", "Identity"),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                async: false,
                data: JSON.stringify(jsonItem),
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
    },
    ROLE_MAPPING_USER_CALL_BACK: function () {        
        var realms = COMMON.GetUrlParam('realms');
        var userId = COMMON.GetUrlParam('ID');    
        $.ajax({
            type: "GET",
            url: COMMON.GetServiceUrl("Role/auth/RealmAccessRoles", "Identity") + "/" + realms + "/" + userId,
            dataType: "json",
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
            },           
            success: function (result) {                
                if (result.ResultCode == '200') {
                    $.each(result.Data, function (i, item) {
                        if ($("#" + item["name"])[0])
                            $("#" + item["name"]).attr('checked', true);
                    });
                }
            }
        });
    },
    LOAD_ROLE_MAPPING_FUNCTIONS: function (thisCallBack) {
        TEMPLATE_AMS_ROLES_ROLE_MAPPING_FUNCTIONS = TEMPLATE_AMS_ROLES_ROLE_MAPPING_FUNCTIONS.length == 0 ? $("#template-FunctionsMappings")[0].innerHTML : TEMPLATE_AMS_ROLES_ROLE_MAPPING_FUNCTIONS;
        var DATA_ROLE_MAPPING = [{
            "TEMPLATE": TEMPLATE_AMS_ROLES_ROLE_MAPPING_FUNCTIONS,
            "CONTAINER": "template-FunctionsMappings",
            "DATA_SOURCES": "Category/auth/AMS_FUNCTIONS/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'FUNCTION_NAME', 'FUNCTION_ICON', 'FUNCTION_URL', 'PARENT_CODE', 'DESCRIPTION', 'INCLUDE_MENU', 'STATUS', 'IS_DELETE', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"CODE":"-1","FUNCTION_NAME":"-1","PARENT_CODE":"-1","STATUS":"-1","IS_DELETE":"-1","PageIndex":' + PAGE_INDEX + ',"PageSize":' + DEFAULT_MAX_ITEM + '}'),            
            "DISLAY": "table-header-group",
            "THIS_IS_CALL_BACK": thisCallBack
        }];
        PROVIDER.PROCESSING(DATA_ROLE_MAPPING);
    },
    ROLE_MAPPING_FUNCTIONS_SAVE: function () {
        var jsonDataMapping = [];
        var jsonDataRemove = [];
        $(".checkbox-role-mapping-function").each(function () {
            if (this.checked) {
                var jsonItem = {};
                jsonItem['id'] = $(this).val();
                jsonItem['name'] = $(this).attr("name");
                jsonItem['description'] = $(this).attr("title");
                jsonItem['composite'] = false;
                jsonItem['clientRole'] = false;
                jsonItem['containerId'] = COMMON.GetUrlParam('containerId');
                jsonDataMapping.push(jsonItem);
            } else {
                var jsonItem = {};
                jsonItem['id'] = $(this).val();
                jsonItem['name'] = $(this).attr("name");
                jsonItem['description'] = $(this).attr("title");
                jsonItem['composite'] = false;
                jsonItem['clientRole'] = false;
                jsonItem['containerId'] = COMMON.GetUrlParam('containerId');
                jsonDataRemove.push(jsonItem);
            }
        });
        if (jsonDataRemove.length > 0) {
            var jsonItem = {};
            jsonItem['realms'] = COMMON.GetUrlParam('realms');
            jsonItem['id'] = COMMON.GetUrlParam('id');
            jsonItem['dataPost'] = jsonDataRemove;
            $.ajax({
                type: "POST",
                url: COMMON.GetServiceUrl("Role/auth/UserMappings/Remove", "Identity"),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                async: false,
                data: JSON.stringify(jsonItem),
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
        if (jsonDataMapping.length > 0) {
            var jsonItem = {};
            jsonItem['realms'] = COMMON.GetUrlParam('realms');
            jsonItem['id'] = COMMON.GetUrlParam('ID');
            jsonItem['dataPost'] = jsonDataMapping;
            $.ajax({
                type: "POST",
                url: COMMON.GetServiceUrl("Role/auth/UserMappings", "Identity"),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                async: false,
                data: JSON.stringify(jsonItem),
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
    },
    ROLE_MAPPING_FUNCTIONS_CALL_BACK: function () {
        var realms = COMMON.GetUrlParam('containerId');
        var userId = JSON.parse(window.localStorage.getItem("auth_api_gateway")).UserId;
        $.ajax({
            type: "GET",
            url: COMMON.GetServiceUrl("Role/auth/RealmAccessRoles", "Identity") + "/" + realms + "/" + userId,
            dataType: "json",
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
            },
            success: function (result) {
                if (result.ResultCode == '200') {
                    $.each(result.Data, function (i, item) {
                        if ($("#" + item["name"])[0])
                            $("#" + item["name"]).attr('checked', true);
                    });
                }
            }
        });
    },
    LOAD_ROLE_MAPPING_ACTIONS: function (thisCallBack) {
        TEMPLATE_AMS_ROLES_ROLE_MAPPING_ACTIONS = TEMPLATE_AMS_ROLES_ROLE_MAPPING_ACTIONS.length == 0 ? $("#template-ActionsMappings")[0].innerHTML : TEMPLATE_AMS_ROLES_ROLE_MAPPING_ACTIONS;
        var DATA_ROLE_MAPPING = [{
            "TEMPLATE": TEMPLATE_AMS_ROLES_ROLE_MAPPING_ACTIONS,
            "CONTAINER": "template-ActionsMappings",
            "DATA_SOURCES": "Category/auth/AMS_ACTIONS/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'ACTION_NAME', 'DESCRIPTION', 'STATUS', 'IS_DELETE', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"CODE":"-1","ACTION_NAME":"-1","IS_DELETE":"-1","STATUS":"-1","PageIndex":' + PAGE_INDEX + ',"PageSize":' + DEFAULT_MAX_ITEM + '}'),            
            "DISLAY": "table-header-group",
            "THIS_IS_CALL_BACK": thisCallBack
        }];
        PROVIDER.PROCESSING(DATA_ROLE_MAPPING);
    },
    ROLE_MAPPING_ACTIONS_SAVE: function () {
        var jsonDataMapping = [];
        var jsonDataRemove = [];
        $(".checkbox-role-mapping-action").each(function () {
            if (this.checked) {                
                jsonDataMapping.push($(this).val());
            } else {                
                jsonDataRemove.push($(this).val());
            }
        });
        if (jsonDataRemove.length > 0) {
            var jsonItem = {};
            jsonItem['realms'] = COMMON.GetUrlParam('containerId');
            jsonItem['id'] = COMMON.GetUrlParam('id');
            jsonItem['dataPost'] = jsonDataRemove;
            $.ajax({
                type: "POST",
                url: COMMON.GetServiceUrl("Role/auth/ActionMappings/Remove", "Identity"),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                async: false,
                data: JSON.stringify(jsonItem),
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
        if (jsonDataMapping.length > 0) {
            var jsonItem = {};
            jsonItem['realms'] = COMMON.GetUrlParam('containerId');
            jsonItem['id'] = COMMON.GetUrlParam('id');
            jsonItem['dataPost'] = jsonDataMapping;
            $.ajax({
                type: "POST",
                url: COMMON.GetServiceUrl("Role/auth/ActionMappings", "Identity"),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                async: false,
                data: JSON.stringify(jsonItem),
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
    },
    ROLE_MAPPING_ACTIONS_CALL_BACK: function () {
        var realms = COMMON.GetUrlParam('containerId');
        var userId = JSON.parse(window.localStorage.getItem("auth_api_gateway")).UserId;
        $.ajax({
            type: "GET",
            url: COMMON.GetServiceUrl("Role/auth/RealmAccessRoles", "Identity") + "/" + realms + "/" + userId,
            dataType: "json",
            beforeSend: function (req) {
                req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
            },
            success: function (result) {
                if (result.ResultCode == '200') {    
                    var dataPost = [];
                    $.each(result.Data, function (i, item) {
                        dataPost.push(item["name"]);                        
                    });
                    var jsonItem = {};
                    jsonItem['realms'] = COMMON.GetUrlParam('containerId');                    
                    jsonItem['dataPost'] = dataPost;
                    $.ajax({
                        type: "POST",
                        url: COMMON.GetServiceUrl("Role/auth/RolesAccessAction", "Identity"),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        crossDomain: true,                        
                        data: JSON.stringify(jsonItem),
                        beforeSend: function (req) {
                            req.setRequestHeader("Authorization", JSON.parse(window.localStorage.getItem("auth_api_gateway")).IdentityToken);
                        },
                        success: function (resultData) {
                            console.log(resultData.Data);
                        }
                    });
                }
            }
        });
    }
}
/*----------------------------------AMS_ACTIONS-----------------------------------------------------------------------------------------------*/
var AMS_ACTIONS_BIND_DATA = {
    "txtCODE": { "Type": "Textbox", "Mapping": "CODE" },
    "txtACTION_NAME": { "Type": "Textbox", "Mapping": "ACTION_NAME" },
    "txtDESCRIPTION": { "Type": "Textbox", "Mapping": "DESCRIPTION" },
    "ckSTATUS": { "Type": "Checkbox", "Mapping": "STATUS" },
    "ckIS_DELETE": { "Type": "Checkbox", "Mapping": "IS_DELETE" }
};
var AMS_ACTIONS_VALIDATE = {};
var TEMPLATE_AMS_ACTIONS = '';
var AMS_ACTIONS = {
    LOAD_DATA: function () {
        TEMPLATE_AMS_ACTIONS = TEMPLATE_AMS_ACTIONS.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_AMS_ACTIONS;
        var DATA_AMS_ACTIONS = [{
            "TEMPLATE": TEMPLATE_AMS_ACTIONS,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "Category/auth/AMS_ACTIONS/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'ACTION_NAME', 'DESCRIPTION', 'STATUS','IS_DELETE', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"CODE":"-1","ACTION_NAME":"-1","IS_DELETE":"-1","STATUS":"-1","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_AMS_ACTIONS);
    },
    SEARCH: function () {
        var CODE = $("#txtCODE").val();
        if (CODE == null || CODE.length == 0) {
            CODE = -1
        }
        var ACTION_NAME = $("#txtACTION_NAME").val();
        if (ACTION_NAME == null || ACTION_NAME.length == 0) {
            ACTION_NAME = -1
        }
        var STATUS = $("#dropSTATUS").val();
        if (STATUS == null) {
            STATUS = -1
        }
        var IS_DELETE = $("#dropIS_DELETE").val();
        if (IS_DELETE == null) {
            IS_DELETE = -1
        }
        TEMPLATE_AMS_ACTIONS = TEMPLATE_AMS_ACTIONS.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_AMS_ACTIONS;
        var DATA_AMS_ACTIONS = [{
            "TEMPLATE": TEMPLATE_AMS_ACTIONS,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "Category/auth/AMS_ACTIONS/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'ACTION_NAME', 'DESCRIPTION', 'STATUS','IS_DELETE', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"CODE":"' + CODE + '","ACTION_NAME":"' + ACTION_NAME + '","IS_DELETE":"' + IS_DELETE + '","STATUS":"' + STATUS + '","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_AMS_ACTIONS);
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
                            var DATA_AMS_USERS = [{
                                "ID": $(this).val(),
                                "DATA_SOURCES": "Category/auth/AMS_ACTIONS",
                                "SERVICE_NAME": "SyncProfile",
                            }];
                            PROVIDER.DELETE(DATA_AMS_USERS);
                        }
                    });
                }
            }
        } else {
            if (confirm("Confirm Delete data!") == true) {
                var DATA_AMS_USERS = [{
                    "ID": value,
                    "DATA_SOURCES": "Category/auth/AMS_ACTIONS",
                    "SERVICE_NAME": "SyncProfile",
                }];
                PROVIDER.DELETE(DATA_AMS_USERS);
            }

        }
    },
    LOAD_INFO: function (code) {        
        if (code != '' && code.length > 0) {
            console.log(12);
            var DATA_AMS_ACTIONS = [{
                "ID": code,
                "LIST_CONTROLS_BIND_DATA": AMS_ACTIONS_BIND_DATA,
                "DATA_SOURCES": "Category/auth/AMS_ACTIONS/GetInfo",
                "SERVICE_NAME": "SyncProfile"
            }];
            PROVIDER.GET_INFO_BY_EDIT(DATA_AMS_ACTIONS);
        }

    },
    INSERT_UPDATE: function () {  
        var code = COMMON.GetUrlParam('code');                     
        if (code == '' || code.length == 0) {
            var DATA_AMS_ACTIONS = [{                
                "LIST_VALIDATE": AMS_ACTIONS_VALIDATE,
                "LIST_CONTROLS_BIND_DATA": AMS_ACTIONS_BIND_DATA,
                "DATA_SOURCES": "Category/auth/AMS_ACTIONS",
                "SERVICE_NAME": "SyncProfile",
                "URL_RECDIRECT": "/Administrators/AMS_ACTIONS/List"
            }];   
            PROVIDER.ADD(DATA_AMS_ACTIONS);
        } else {
            var DATA_AMS_ACTIONS = [{
                "ID": code,
                "LIST_VALIDATE": AMS_ACTIONS_VALIDATE,
                "LIST_CONTROLS_BIND_DATA": AMS_ACTIONS_BIND_DATA,
                "DATA_SOURCES": "Category/auth/AMS_ACTIONS",
                "SERVICE_NAME": "SyncProfile",
                "URL_RECDIRECT": "/Administrators/AMS_ACTIONS/List"
            }];   
            PROVIDER.UPDATE(DATA_AMS_ACTIONS);
        }

    }
}
/*----------------------------------AMS_FUNCTIONS-----------------------------------------------------------------------------------------------*/
var AMS_FUNCTIONS_BIND_DATA = {
    "txtCODE": { "Type": "Textbox", "Mapping": "CODE" },
    "txtFUNCTION_NAME": { "Type": "Textbox", "Mapping": "FUNCTION_NAME" },
    "txtFUNCTION_ICON": { "Type": "Textbox", "Mapping": "FUNCTION_ICON" },
    "txtFUNCTION_URL": { "Type": "Textbox", "Mapping": "FUNCTION_URL" },
    "dropPARENT_CODE": { "Type": "Select", "Mapping": "PARENT_CODE" },
    "txtDESCRIPTION": { "Type": "Textbox", "Mapping": "DESCRIPTION" },
    "ckINCLUDE_MENU": { "Type": "Checkbox", "Mapping": "INCLUDE_MENU" },
    "ckSTATUS": { "Type": "Checkbox", "Mapping": "STATUS" },
    "ckIS_DELETE": { "Type": "Checkbox", "Mapping": "IS_DELETE" }
};
var AMS_FUNCTIONS_VALIDATE = {};
var TEMPLATE_AMS_FUNCTIONS = '';
var TEMPLATE_AMS_FUNCTIONS_PARENT_CODE = '';
var AMS_FUNCTIONS = {
    LOAD_DATA: function () {
        TEMPLATE_AMS_FUNCTIONS = TEMPLATE_AMS_FUNCTIONS.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_AMS_FUNCTIONS;
        var DATA_AMS_FUNCTIONS = [{
            "TEMPLATE": TEMPLATE_AMS_FUNCTIONS,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "Category/auth/AMS_FUNCTIONS/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'FUNCTION_NAME', 'FUNCTION_ICON', 'FUNCTION_URL', 'PARENT_CODE', 'DESCRIPTION','INCLUDE_MENU', 'STATUS', 'IS_DELETE', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"CODE":"-1","FUNCTION_NAME":"-1","PARENT_CODE":"-1","STATUS":"-1","IS_DELETE":"-1","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_AMS_FUNCTIONS);
    },
    SEARCH: function () {
        var CODE = $("#txtCODE").val();
        if (CODE == null || CODE.length == 0) {
            CODE = -1
        }
        var FUNCTION_NAME = $("#txtFUNCTION_NAME").val();
        if (FUNCTION_NAME == null || FUNCTION_NAME.length == 0) {
            FUNCTION_NAME = -1
        }        
        var PARENT_CODE = $("#dropPARENT_CODE").val();
        if (PARENT_CODE == null) {
            PARENT_CODE = -1
        }
        var STATUS = $("#dropSTATUS").val();
        if (STATUS == null) {
            STATUS = -1
        }
        var IS_DELETE = $("#dropIS_DELETE").val();
        if (IS_DELETE == null) {
            IS_DELETE = -1
        }
        TEMPLATE_AMS_FUNCTIONS = TEMPLATE_AMS_FUNCTIONS.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_AMS_FUNCTIONS;
        var DATA_AMS_FUNCTIONS = [{
            "TEMPLATE": TEMPLATE_AMS_FUNCTIONS,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "Category/auth/AMS_FUNCTIONS/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'FUNCTION_NAME', 'FUNCTION_ICON', 'FUNCTION_URL', 'PARENT_CODE', 'DESCRIPTION', 'INCLUDE_MENU', 'STATUS', 'IS_DELETE', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"CODE":"' + CODE + '","FUNCTION_NAME":"' + FUNCTION_NAME + '","PARENT_CODE":"' + PARENT_CODE + '","STATUS":"' + STATUS + '","IS_DELETE":"' + IS_DELETE + '","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_AMS_FUNCTIONS);
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
                            var DATA_AMS_USERS = [{
                                "ID": $(this).val(),
                                "DATA_SOURCES": "Category/auth/AMS_FUNCTIONS",
                                "SERVICE_NAME": "SyncProfile"
                            }];
                            PROVIDER.DELETE(DATA_AMS_USERS);
                        }
                    });
                }
            }
        } else {
            if (confirm("Confirm Delete data!") == true) {
                var DATA_AMS_USERS = [{
                    "ID": value,
                    "DATA_SOURCES": "Category/auth/AMS_FUNCTIONS",
                    "SERVICE_NAME": "SyncProfile"
                }];
                PROVIDER.DELETE(DATA_AMS_USERS);
            }

        }
    },
    LOAD_INFO: function (code, thisCallBack) {
        if (code != '' && code.length > 0) {
            console.log(12);
            var DATA_AMS_FUNCTIONS = [{
                "ID": code,
                "LIST_CONTROLS_BIND_DATA": AMS_FUNCTIONS_BIND_DATA,
                "DATA_SOURCES": "Category/auth/AMS_FUNCTIONS/GetInfo",
                "SERVICE_NAME": "SyncProfile",
                "THIS_IS_CALL_BACK": thisCallBack
            }];
            PROVIDER.GET_INFO_BY_EDIT(DATA_AMS_FUNCTIONS);
        }

    },
    INSERT_UPDATE: function () {
        var code = COMMON.GetUrlParam('code');
        if (code == '' || code.length == 0) {
            var DATA_AMS_FUNCTIONS = [{
                "LIST_VALIDATE": AMS_FUNCTIONS_VALIDATE,
                "LIST_CONTROLS_BIND_DATA": AMS_FUNCTIONS_BIND_DATA,
                "DATA_SOURCES": "Category/auth/AMS_FUNCTIONS",
                "SERVICE_NAME": "SyncProfile",
                "URL_RECDIRECT": "/Administrators/AMS_FUNCTIONS/List"
            }];
            PROVIDER.ADD(DATA_AMS_FUNCTIONS);
        } else {
            var DATA_AMS_FUNCTIONS = [{
                "ID": code,
                "LIST_VALIDATE": AMS_FUNCTIONS_VALIDATE,
                "LIST_CONTROLS_BIND_DATA": AMS_FUNCTIONS_BIND_DATA,
                "DATA_SOURCES": "Category/auth/AMS_FUNCTIONS",
                "SERVICE_NAME": "SyncProfile",
                "URL_RECDIRECT": "/Administrators/AMS_FUNCTIONS/List"
            }];
            PROVIDER.UPDATE(DATA_AMS_FUNCTIONS);
        }

    },
    LOAD_SELECT: function (selectValue) {
        TEMPLATE_AMS_FUNCTIONS_PARENT_CODE = TEMPLATE_AMS_FUNCTIONS_PARENT_CODE.length == 0 ? $("#dropPARENT_CODE")[0].innerHTML : TEMPLATE_AMS_FUNCTIONS_PARENT_CODE;
        var DATA_PARENT_CODE = [{
            "TEMPLATE": TEMPLATE_AMS_FUNCTIONS_PARENT_CODE,
            "CONTAINER": "dropPARENT_CODE",
            "DATA_SOURCES": "Category/auth/AMS_FUNCTIONS/GetByParentCode",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['CODE', 'FUNCTION_NAME'],
            "LIST_PARAM": $.parseJSON('{"PARENT_CODE":"0"}'),
            "APPEND_DATA": '<option value="-1">-- Select --</option> ',
            "SELECT_VALUE": ((selectValue != null && selectValue.length > 0) ? selectValue : "-1"),
            "DISLAY": "table-row-group"
        }];
        PROVIDER.LOAD_SELECT(DATA_PARENT_CODE);
    }
}
/*----------------------------------GOOGLE_DRIVE-----------------------------------------------------------------------------------------------*/
var GOOGLE_DRIVE_BIND_DATA = {
    "txtCODE": { "Type": "Textbox", "Mapping": "CODE" },
    "txtDRIVE_NAME": { "Type": "Textbox", "Mapping": "DRIVE_NAME" },
    "txtGOOGLE_EMAIL": { "Type": "Textbox", "Mapping": "GOOGLE_EMAIL" },
    "txtDIRECTORY_CODE": { "Type": "Textbox", "Mapping": "DIRECTORY_CODE" },
    "txtDIRECTORY_NAME": { "Type": "Textbox", "Mapping": "DIRECTORY_NAME" },
    "txtDESCRIPTION": { "Type": "Textbox", "Mapping": "DESCRIPTION" },    
    "dropPARENT_CODE": { "Type": "Select", "Mapping": "DRIVE_TYPE" },
    "ckSTATUS": { "Type": "Checkbox", "Mapping": "STATUS" },
    "ckIS_DELETE": { "Type": "Checkbox", "Mapping": "IS_DELETE" }
};
var GOOGLE_DRIVE_VALIDATE = {};
var TEMPLATE_GOOGLE_DRIVE = '';
var TEMPLATE_GOOGLE_DRIVE_SELECT = '';
var GOOGLE_DRIVE = {
    LOAD_DATA: function () {        
        TEMPLATE_GOOGLE_DRIVE = TEMPLATE_GOOGLE_DRIVE.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_GOOGLE_DRIVE;
        var DATA_GOOGLE_DRIVE = [{
            "TEMPLATE": TEMPLATE_GOOGLE_DRIVE,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "Category/auth/GOOGLE_DRIVE/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'DRIVE_NAME', 'GOOGLE_EMAIL', 'DIRECTORY_CODE', 'DIRECTORY_NAME','DRIVE_TYPE','DESCRIPTION', 'STATUS', 'IS_DELETE', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"CODE":"-1","DRIVE_NAME":"-1","DIRECTORY_NAME":"-1","IS_DELETE":"-1","STATUS":"-1","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_GOOGLE_DRIVE);
    },
    SEARCH: function () {
        var CODE = $("#txtCODE").val();
        if (CODE == null || CODE.length == 0) {
            CODE = -1
        }
        var DRIVE_NAME = $("#txtDRIVE_NAME").val();
        if (DRIVE_NAME == null || DRIVE_NAME.length == 0) {
            DRIVE_NAME = -1
        }
        var STATUS = $("#dropSTATUS").val();
        if (STATUS == null) {
            STATUS = -1
        }
        var IS_DELETE = $("#dropIS_DELETE").val();
        if (IS_DELETE == null) {
            IS_DELETE = -1
        }
        TEMPLATE_GOOGLE_DRIVE = TEMPLATE_GOOGLE_DRIVE.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_GOOGLE_DRIVE;
        var DATA_GOOGLE_DRIVE = [{
            "TEMPLATE": TEMPLATE_GOOGLE_DRIVE,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "Category/auth/GOOGLE_DRIVE/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'DRIVE_NAME', 'GOOGLE_EMAIL', 'DIRECTORY_CODE', 'DIRECTORY_NAME','DRIVE_TYPE','DESCRIPTION', 'STATUS', 'IS_DELETE', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"CODE":"' + CODE + '","DRIVE_NAME":"' + DRIVE_NAME + '","DIRECTORY_NAME":"-1","IS_DELETE":"' + IS_DELETE + '","STATUS":"' + STATUS + '","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_GOOGLE_DRIVE);
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
                            var DATA_AMS_USERS = [{
                                "ID": $(this).val(),
                                "DATA_SOURCES": "Category/auth/GOOGLE_DRIVE",
                                "SERVICE_NAME": "SyncProfile",
                            }];
                            PROVIDER.DELETE(DATA_AMS_USERS);
                        }
                    });
                }
            }
        } else {
            if (confirm("Confirm Delete data!") == true) {
                var DATA_AMS_USERS = [{
                    "ID": value,
                    "DATA_SOURCES": "Category/auth/GOOGLE_DRIVE",
                    "SERVICE_NAME": "SyncProfile",
                }];
                PROVIDER.DELETE(DATA_AMS_USERS);
            }

        }
    },
    LOAD_INFO: function (code, thisCallBack) {
        if (code != '' && code.length > 0) {
            console.log(12);
            var DATA_GOOGLE_DRIVE = [{
                "ID": code,
                "LIST_CONTROLS_BIND_DATA": GOOGLE_DRIVE_BIND_DATA,
                "DATA_SOURCES": "Category/auth/GOOGLE_DRIVE/GetInfo",
                "SERVICE_NAME": "SyncProfile",
                "THIS_IS_CALL_BACK": thisCallBack
            }];
            PROVIDER.GET_INFO_BY_EDIT(DATA_GOOGLE_DRIVE);
        }

    },    
    INSERT_UPDATE: function () {
        var code = COMMON.GetUrlParam('code');
        if (code == '' || code.length == 0) {
            var DATA_GOOGLE_DRIVE = [{
                "LIST_VALIDATE": GOOGLE_DRIVE_VALIDATE,
                "LIST_CONTROLS_BIND_DATA": GOOGLE_DRIVE_BIND_DATA,
                "DATA_SOURCES": "Category/auth/GOOGLE_DRIVE",
                "SERVICE_NAME": "SyncProfile",
                "URL_RECDIRECT": "/Administrators/GOOGLE_DRIVE/List"
            }];
            PROVIDER.ADD(DATA_GOOGLE_DRIVE);
        } else {
            var DATA_GOOGLE_DRIVE = [{
                "ID": code,
                "LIST_VALIDATE": GOOGLE_DRIVE_VALIDATE,
                "LIST_CONTROLS_BIND_DATA": GOOGLE_DRIVE_BIND_DATA,
                "DATA_SOURCES": "Category/auth/GOOGLE_DRIVE",
                "SERVICE_NAME": "SyncProfile",
                "URL_RECDIRECT": "/Administrators/GOOGLE_DRIVE/List"
            }];
            PROVIDER.UPDATE(DATA_GOOGLE_DRIVE);
        }

    },
    LOAD_SELECT: function (selectValue,directoryName, thisCallBack) {
        TEMPLATE_GOOGLE_DRIVE_SELECT = TEMPLATE_GOOGLE_DRIVE_SELECT.length == 0 ? $("#dropDRIVE_NAME")[0].innerHTML : TEMPLATE_GOOGLE_DRIVE_SELECT;
        var DATA_SELECT_CODE = [{
            "TEMPLATE": TEMPLATE_GOOGLE_DRIVE_SELECT,
            "CONTAINER": "dropDRIVE_NAME",
            "DATA_SOURCES": "Category/auth/GOOGLE_DRIVE/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['GOOGLE_EMAIL', 'DRIVE_NAME'],
            "LIST_PARAM": $.parseJSON('{"CODE":"-1","DRIVE_NAME":"-1","DIRECTORY_NAME":"' + directoryName + '","IS_DELETE":"-1","STATUS":"-1","PageIndex":1,"PageSize":1000}'),
            "APPEND_DATA": '<option value="-1">-- Select --</option> ',
            "SELECT_VALUE": ((selectValue != null && selectValue.length > 0) ? selectValue : "-1"),
            "DISLAY": "table-row-group",
            "THIS_IS_CALL_BACK": thisCallBack
        }];
        PROVIDER.LOAD_SELECT(DATA_SELECT_CODE);
    },
    LOAD_SELECT: function (selectValue,driveType) {
        TEMPLATE_GOOGLE_DRIVE_SELECT = TEMPLATE_GOOGLE_DRIVE_SELECT.length == 0 ? $("#dropDRIVE_NAME")[0].innerHTML : TEMPLATE_GOOGLE_DRIVE_SELECT;
        var DATA_SELECT_CODE = [{
            "TEMPLATE": TEMPLATE_GOOGLE_DRIVE_SELECT,
            "CONTAINER": "dropDRIVE_NAME",
            "DATA_SOURCES": "Category/auth/GOOGLE_DRIVE/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['GOOGLE_EMAIL', 'DRIVE_NAME'],            
            "LIST_PARAM": $.parseJSON('{"DRIVE_TYPE":"' + driveType + '"}'),
            "APPEND_DATA": '<option value="-1">-- Select --</option> ',
            "SELECT_VALUE": ((selectValue != null && selectValue.length > 0) ? selectValue : "-1"),
            "DISLAY": "table-row-group"
        }];
        PROVIDER.LOAD_SELECT(DATA_SELECT_CODE);
    }
}
/*----------------------------------DATA_CLIENT-----------------------------------------------------------------------------------------------*/
var DATA_CLIENT_BIND_DATA = {
    "txtCLIENT_ID": { "Type": "Textbox", "Mapping": "CLIENT_ID" },
    "txtCLIENT_NAME": { "Type": "Textbox", "Mapping": "CLIENT_NAME" },
    "txtCLIENT_IP": { "Type": "Textbox", "Mapping": "CLIENT_IP" },
    "txtFULL_NAME": { "Type": "Textbox", "Mapping": "FULL_NAME" },
    "txtEMAIL": { "Type": "Textbox", "Mapping": "EMAIL" },
    "txtDESCRIPTION": { "Type": "Textbox", "Mapping": "DESCRIPTION" },
    "ckSTATUS": { "Type": "Checkbox", "Mapping": "STATUS" },
    "ckIS_DELETE": { "Type": "Checkbox", "Mapping": "IS_DELETE" }
};
var DATA_CLIENT_VALIDATE = {};
var TEMPLATE_DATA_CLIENT = '';
var DATA_CLIENT = {
    LOAD_DATA: function () {
        TEMPLATE_DATA_CLIENT = TEMPLATE_DATA_CLIENT.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_DATA_CLIENT;
        var DATA_DATA_CLIENT = [{
            "TEMPLATE": TEMPLATE_DATA_CLIENT,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "Category/auth/DATA_CLIENT/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'CLIENT_ID', 'CLIENT_NAME', 'CLIENT_IP', 'FULL_NAME', 'EMAIL', 'DESCRIPTION', 'STATUS', 'IS_DELETE', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"CLIENT_ID":"-1","CLIENT_NAME":"-1","IS_DELETE":"-1","STATUS":"-1","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_DATA_CLIENT);
    },
    SEARCH: function () {
        var CLIENT_ID = $("#txtCLIENT_ID").val();
        if (CLIENT_ID == null || CLIENT_ID.length == 0) {
            CLIENT_ID = -1
        }
        var CLIENT_NAME = $("#txtCLIENT_NAME").val();
        if (CLIENT_NAME == null || CLIENT_NAME.length == 0) {
            CLIENT_NAME = -1
        }
        var STATUS = $("#dropSTATUS").val();
        if (STATUS == null) {
            STATUS = -1
        }
        var IS_DELETE = $("#dropIS_DELETE").val();
        if (IS_DELETE == null) {
            IS_DELETE = -1
        }
        TEMPLATE_DATA_CLIENT = TEMPLATE_DATA_CLIENT.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_DATA_CLIENT;
        var DATA_DATA_CLIENT = [{
            "TEMPLATE": TEMPLATE_DATA_CLIENT,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "Category/auth/DATA_CLIENT/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'CLIENT_ID', 'CLIENT_NAME', 'CLIENT_IP', 'FULL_NAME', 'EMAIL', 'DESCRIPTION', 'STATUS', 'IS_DELETE', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"CLIENT_ID":"' + CLIENT_ID + '","CLIENT_NAME":"' + CLIENT_NAME + '","IS_DELETE":"' + IS_DELETE + '","STATUS":"' + STATUS + '","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_DATA_CLIENT);
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
                            var DATA_AMS_USERS = [{
                                "ID": $(this).val(),
                                "DATA_SOURCES": "Category/auth/DATA_CLIENT",
                                "SERVICE_NAME": "SyncProfile",
                            }];
                            PROVIDER.DELETE(DATA_AMS_USERS);
                        }
                    });
                }
            }
        } else {
            if (confirm("Confirm Delete data!") == true) {
                var DATA_AMS_USERS = [{
                    "ID": value,
                    "DATA_SOURCES": "Category/auth/DATA_CLIENT",
                    "SERVICE_NAME": "SyncProfile",
                }];
                PROVIDER.DELETE(DATA_AMS_USERS);
            }

        }
    },
    LOAD_INFO: function (code) {
        if (code != '' && code.length > 0) {            
            var DATA_DATA_CLIENT = [{
                "ID": code,
                "LIST_CONTROLS_BIND_DATA": DATA_CLIENT_BIND_DATA,
                "DATA_SOURCES": "Category/auth/DATA_CLIENT/GetInfo",
                "SERVICE_NAME": "SyncProfile"
            }];
            PROVIDER.GET_INFO_BY_EDIT(DATA_DATA_CLIENT);
        }

    },
    INSERT_UPDATE: function () {
        var code = COMMON.GetUrlParam('code');
        if (code == '' || code.length == 0) {
            var DATA_DATA_CLIENT = [{
                "LIST_VALIDATE": DATA_CLIENT_VALIDATE,
                "LIST_CONTROLS_BIND_DATA": DATA_CLIENT_BIND_DATA,
                "DATA_SOURCES": "Category/auth/DATA_CLIENT",
                "SERVICE_NAME": "SyncProfile",
                "URL_RECDIRECT": "/Administrators/DATA_CLIENT/List"
            }];
            PROVIDER.ADD(DATA_DATA_CLIENT);
        } else {
            var DATA_DATA_CLIENT = [{
                "ID": code,
                "LIST_VALIDATE": DATA_CLIENT_VALIDATE,
                "LIST_CONTROLS_BIND_DATA": DATA_CLIENT_BIND_DATA,
                "DATA_SOURCES": "Category/auth/DATA_CLIENT",
                "SERVICE_NAME": "SyncProfile",
                "URL_RECDIRECT": "/Administrators/DATA_CLIENT/List"
            }];
            PROVIDER.UPDATE(DATA_DATA_CLIENT);
        }

    }
}

/*----------------------------------CATEGORY-----------------------------------------------------------------------------------------------*/
var CATEGORY_BIND_DATA = {
    "txtCODE": { "Type": "Textbox", "Mapping": "CODE" },
    "txtNAME": { "Type": "Textbox", "Mapping": "NAME" },
    "dropPARENT_CODE": { "Type": "Select", "Mapping": "PARENT_CODE" },
    "txtDESCRIPTION": { "Type": "Textbox", "Mapping": "DESCRIPTION" },
    "ckSTATUS": { "Type": "Checkbox", "Mapping": "STATUS" },
    "ckISDELETE": { "Type": "Checkbox", "Mapping": "ISDELETE" }
};
var CATEGORY_VALIDATE = {};
var TEMPLATE_CATEGORY = '';
var TEMPLATE_CATEGORY_PARENT_CODE = '';
var CATEGORY = {
    LOAD_DATA: function () {
        TEMPLATE_CATEGORY = TEMPLATE_CATEGORY.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_CATEGORY;
        var DATA_CATEGORY = [{
            "TEMPLATE": TEMPLATE_CATEGORY,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "Category/auth/Information/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'NAME', 'FUNCTION_ICON', 'FUNCTION_URL', 'PARENT_CODE', 'DESCRIPTION', 'INCLUDE_MENU', 'STATUS', 'ISDELETE', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"CODE":"-1","NAME":"-1","PARENT_CODE":"-1","STATUS":"-1","ISDELETE":"-1","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_CATEGORY);
    },
    SEARCH: function () {
        var CODE = $("#txtCODE").val();
        if (CODE == null || CODE.length == 0) {
            CODE = -1
        }
        var NAME = $("#txtNAME").val();
        if (NAME == null || NAME.length == 0) {
            NAME = -1
        }
        var PARENT_CODE = $("#dropPARENT_CODE").val();
        if (PARENT_CODE == null) {
            PARENT_CODE = -1
        }
        var STATUS = $("#dropSTATUS").val();
        if (STATUS == null) {
            STATUS = -1
        }
        var ISDELETE = $("#dropISDELETE").val();
        if (ISDELETE == null) {
            ISDELETE = -1
        }
        TEMPLATE_CATEGORY = TEMPLATE_CATEGORY.length == 0 ? $("#gridDataList")[0].innerHTML : TEMPLATE_CATEGORY;
        var DATA_CATEGORY = [{
            "TEMPLATE": TEMPLATE_CATEGORY,
            "CONTAINER_PAGINATION": "paginationData",
            "CONTAINER": "gridDataList",
            "CONTAINER_TOTAL_RECORD": "totalRecords",
            "DATA_SOURCES": "Category/auth/Information/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['NO', 'CODE', 'NAME', 'PARENT_CODE', 'DESCRIPTION', 'STATUS', 'ISDELETE', 'CUSER', 'CDATE_Timestamp', 'LUSER', 'LDATE_Timestamp'],
            "LIST_PARAM": $.parseJSON('{"CODE":"' + CODE + '","NAME":"' + NAME + '","PARENT_CODE":"' + PARENT_CODE + '","STATUS":"' + STATUS + '","ISDELETE":"' + ISDELETE + '","PageIndex":' + PAGE_INDEX + ',"PageSize":' + PAGE_SIZE + '}'),
            "DISLAY": "table-header-group"
        }];
        PROVIDER.PROCESSING_PAGINATION(DATA_CATEGORY);
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
                            var DATA_AMS_USERS = [{
                                "ID": $(this).val(),
                                "DATA_SOURCES": "Category/auth/Information",
                                "SERVICE_NAME": "SyncProfile"
                            }];
                            PROVIDER.DELETE(DATA_AMS_USERS);
                        }
                    });
                }
            }
        } else {
            if (confirm("Confirm Delete data!") == true) {
                var DATA_AMS_USERS = [{
                    "ID": value,
                    "DATA_SOURCES": "Category/auth/Information",
                    "SERVICE_NAME": "SyncProfile"
                }];
                PROVIDER.DELETE(DATA_AMS_USERS);
            }

        }
    },
    LOAD_INFO: function (code, thisCallBack) {
        if (code != '' && code.length > 0) {
            console.log(12);
            var DATA_CATEGORY = [{
                "ID": code,
                "LIST_CONTROLS_BIND_DATA": CATEGORY_BIND_DATA,
                "DATA_SOURCES": "Category/auth/Information/GetInfo",
                "SERVICE_NAME": "SyncProfile",
                "THIS_IS_CALL_BACK": thisCallBack
            }];
            PROVIDER.GET_INFO_BY_EDIT(DATA_CATEGORY);
        }

    },
    INSERT_UPDATE: function () {
        var code = COMMON.GetUrlParam('code');
        if (code == '' || code.length == 0) {
            var DATA_CATEGORY = [{
                "LIST_VALIDATE": CATEGORY_VALIDATE,
                "LIST_CONTROLS_BIND_DATA": CATEGORY_BIND_DATA,
                "DATA_SOURCES": "Category/auth/Information",
                "SERVICE_NAME": "SyncProfile",
                "URL_RECDIRECT": "/Administrators/CATEGORY/List"
            }];
            PROVIDER.ADD(DATA_CATEGORY);
        } else {
            var DATA_CATEGORY = [{
                "ID": code,
                "LIST_VALIDATE": CATEGORY_VALIDATE,
                "LIST_CONTROLS_BIND_DATA": CATEGORY_BIND_DATA,
                "DATA_SOURCES": "Category/auth/Information",
                "SERVICE_NAME": "SyncProfile",
                "URL_RECDIRECT": "/Administrators/CATEGORY/List"
            }];
            PROVIDER.UPDATE(DATA_CATEGORY);
        }

    },
    LOAD_SELECT: function (selectValue) {
        TEMPLATE_CATEGORY_PARENT_CODE = TEMPLATE_CATEGORY_PARENT_CODE.length == 0 ? $("#dropPARENT_CODE")[0].innerHTML : TEMPLATE_CATEGORY_PARENT_CODE;
        var DATA_PARENT_CODE = [{
            "TEMPLATE": TEMPLATE_CATEGORY_PARENT_CODE,
            "CONTAINER": "dropPARENT_CODE",
            "DATA_SOURCES": "Category/auth/Information/GetList",
            "SERVICE_NAME": "SyncProfile",
            "ARRAY_KEY": ['CODE', 'NAME'],
            "LIST_PARAM": $.parseJSON('{"PARENT_CODE":"DRIVE_TYPE"}'),
            "APPEND_DATA": '<option value="-1">-- Select --</option> ',
            "SELECT_VALUE": ((selectValue != null && selectValue.length > 0) ? selectValue : "-1"),
            "DISLAY": "table-row-group"
        }];
        PROVIDER.LOAD_SELECT(DATA_PARENT_CODE);
    }
}