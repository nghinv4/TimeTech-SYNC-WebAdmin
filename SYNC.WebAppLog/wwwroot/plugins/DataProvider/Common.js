$(document).ready(function () {

    $(".typeNumber").keydown(function (event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey == true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        }
        else if (event.keyCode == 109) {
            return true;
        }
        else {
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });

    $(".typeFloat").keydown(function (event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey == true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        }
        else if (event.keyCode == 190) {
            return true;
        }
        else {
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });

    $(".typeHour").keydown(function (event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey == true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        }
        else if (event.keyCode == 109) {
            return true;
        }
        else {
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
    $(".typeDay").keydown(function (event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey == true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        }
        else if (event.keyCode == 109) {
            return true;
        }
        else {
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
    $(".typeMonth").keydown(function (event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey == true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        }
        else if (event.keyCode == 109) {
            return true;
        }
        else {
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
    $(".typeYear").keydown(function (event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey == true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        }
        else if (event.keyCode == 109) {
            return true;
        }
        else {
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
    $(".typePhone").keydown(function (event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey == true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        }
        else if (event.keyCode == 109) {
            return true;
        }
        else {
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
    $('.isCheckEmty').blur(function () {
        if (this.value == "") {
            $(this).addClass('error-input');
        }

        else {
            $(this).removeClass('error-input');            
        }
    });
    $('.typeEmail').blur(function () {
        if (this.value != "") {
            var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (filter.test(this.value)) {
                $(this).removeClass('error-input');                
            }
            else {
                $(this).addClass('error-input');
            }
        } else {
            $(this).removeClass('error-input');            
        }
    });
    $('.typeHour').blur(function () {
        if (this.value != "") {
            if ($(this).val() < 0 || $(this).val() > 23) {
                $(this).addClass('error-input');
            }
            else {
                $(this).removeClass('error-input');
                $(this).removeClass('error-validate');
            }
        }

        else {
            $(this).removeClass('error-input');
        }
    });
    $('.typeDay').blur(function () {
        if (this.value != "") {
            if ($(this).val() < 0 || $(this).val() > 31) {
                $(this).addClass('error-input');
            }
            else {
                $(this).removeClass('error-input');
                $(this).removeClass('error-validate');
            }
        }

        else {
            $(this).removeClass('error-input');
        }
    });
    $('.typeMonth').blur(function () {
        if (this.value != "") {
            if ($(this).val() < 0 || $(this).val() > 12) {
                $(this).addClass('error-input');
            }
            else {
                $(this).removeClass('error-input');
                $(this).removeClass('error-validate');
            }
        }

        else {
            $(this).removeClass('error-input');
            $(this).removeClass('error-validate');
        }
    });
    $('.typeYear').blur(function () {
        var now = new Date();
        var year = now.getFullYear();
        if (this.value != "") {
            if ($(this).val() < 1900 || $(this).val() > year) {
                $(this).addClass('error-input');
            }
            else {
                $(this).removeClass('error-input');
                $(this).removeClass('error-validate');
            }
        }

        else {
            $(this).removeClass('error-input');
            $(this).removeClass('error-validate');
        }
    });
    $('.typeDate').blur(function () {
        if (this.value.length != 0) {
            if ($(this).val() != "") {
                var re = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{2,4})$/;
                if (!re.test($(this).val())) {
                    $(this).addClass('error-input');
                } else {
                    var ngay, thang, nam;
                    ngay = $(this).val().split("/")[0];
                    thang = $(this).val().split("/")[1];
                    nam = $(this).val().split("/")[2];
                    if (ngay < 1 || ngay > 31 || thang < 1 || thang > 12 || nam.length != 4 || isNaN(nam) == true) {

                        $(this).addClass('error-input');
                    } else {
                        $(this).removeClass('error-input');
                        $(this).removeClass('error-validate');
                    }
                }
            } else {
                $(this).removeClass('error-input');
                $(this).removeClass('error-validate');
            }
        } else {
            $(this).removeClass('error-input');
            $(this).removeClass('error-validate');
        }

    });
});
