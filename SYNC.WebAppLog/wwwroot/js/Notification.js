"use strict";

//var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:57282/signalr").build();
//var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:8500/signalr").build();
var connection = new signalR.HubConnectionBuilder().withUrl(Setting.Notification.UrlConnect).build();
connection.start().then(function () {
    console.log("start oke");
}).catch(function (err) {
    return console.error(err.toString());
});
connection.on(Setting.Notification.Channel.NOTIFICATION_INTERNAL, function (user, resultMessage) {
    //console.log(resultMessage);
    //console.log(resultMessage.code);
    //console.log(resultMessage.from);
    //console.log(resultMessage.message);
    //console.log(resultMessage.toChannel);
    //console.log(resultMessage.warningType);    
    if (resultMessage.warningType == '203') {
        FORM.ShowMessage("<b>" + user + "</b>: " + resultMessage.message, 'Error');
        var html = '<li class="items-notification">';
        html += '   <a href="#" title="' + resultMessage.message + '">';
        html += '      <p style="margin:0px;">';
        html += '         <i class="fa fa-circle-o text-red"></i><b>&nbsp;&nbsp;' + user + '</b>';
        html += '      </p >';
        html += '      <span style="margin:0px;">' + resultMessage.message + '</span>';
        html += '      <p style="margin:0px;">';
        html += '         <small style="float: right;margin-top: 2px;"><i class="fa fa-clock-o"></i> ' + resultMessage.timestamp + '</small>';
        html += '      </p >';
        html += '   </a >';
        html += '</li >';
        $("#items-notifications").prepend(html);
        $("#total-notifications").html($('.items-notification').length);
        $("#total-notifications-detail").html($('.items-notification').length);
    }
    if (resultMessage.warningType == '403') {
        FORM.ShowMessage(user + ": " + resultMessage.message, 'Warning');
        var html = '<li class="items-notification">';
        html += '   <a href="#" title="' + resultMessage.message + '">';
        html += '      <p style="margin:0px;">';
        html += '         <i class="fa fa-circle-o text-yellow"></i><b>&nbsp;&nbsp;' + user + '</b>';
        html += '      </p >';
        html += '      <span style="margin:0px;">' + resultMessage.message + '</span>';
        html += '      <p style="margin:0px;">';
        html += '         <small style="float: right;margin-top: 2px;"><i class="fa fa-clock-o"></i> ' + resultMessage.timestamp + '</small>';
        html += '      </p >';
        html += '   </a >';
        html += '</li >';
        $("#items-notifications").prepend(html);
        $("#total-notifications").html($('.items-notification').length);
        $("#total-notifications-detail").html($('.items-notification').length);
    }
    if (resultMessage.warningType == '404') {
        FORM.ShowMessage(user + ": " + resultMessage.message, 'Warning');
        var html = '<li class="items-notification">';
        html += '   <a href="#" title="' + resultMessage.message + '">';
        html += '      <p style="margin:0px;">';
        html += '         <i class="fa fa-circle-o text-yellow"></i><b>&nbsp;&nbsp;' + user + '</b>';
        html += '      </p >';
        html += '      <span style="margin:0px;">' + resultMessage.message + '</span>';
        html += '      <p style="margin:0px;">';
        html += '         <small style="float: right;margin-top: 2px;"><i class="fa fa-clock-o"></i> ' + resultMessage.timestamp + '</small>';
        html += '      </p >';
        html += '   </a >';
        html += '</li >';
        $("#items-notifications").prepend(html);
        $("#total-notifications").html($('.items-notification').length);
        $("#total-notifications-detail").html($('.items-notification').length);
    }
    if (resultMessage.warningType == '200') {
        FORM.ShowMessage(user + ": " + resultMessage.message, 'Success');
        var html = '<li class="items-notification">';
        html += '   <a href="#" title="' + resultMessage.message + '">';
        html += '      <p style="margin:0px;">';
        html += '         <i class="fa fa-circle-o text-aqua"></i><b>&nbsp;&nbsp;' + user + '</b>';
        html += '      </p >';
        html += '      <span style="margin:0px;">' + resultMessage.message + '</span>';
        html += '      <p style="margin:0px;">';
        html += '         <small style="float: right;margin-top: 2px;"><i class="fa fa-clock-o"></i> ' + resultMessage.timestamp + '</small>';
        html += '      </p >';
        html += '   </a >';
        html += '</li >';
        $("#items-notifications").prepend(html);
        $("#total-notifications").html($('.items-notification').length);
        $("#total-notifications-detail").html($('.items-notification').length);
    }
});
connection.on(Setting.Notification.Channel.GoogleDrive, function (user, resultMessage) {    
    var arrString = resultMessage.message.split(':');  
    console.log(arrString);
    if ($('#gridDataListViewTransaction').hasClass(arrString[0])) {
        var html = '<tr>';
        html += '     <td class="class-nowrap class-center" >' + arrString[2] + '</td >';
        html += '     <td>' + arrString[4] + '</td>';
        html += '     <td class="class-nowrap class-center">' + resultMessage.warningType + '</td>';
        html += '     <td class="class-nowrap class-center">' + resultMessage.timestamp + '</td>';
        html += '</tr >';        
        $("." + arrString[0]).append(html);
    }    

});
