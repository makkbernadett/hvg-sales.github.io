$(function() {

    var maxLenght = 400;

    var JsonRequest =
    {
        ShoutValues: null
    };

    $("textarea[name=shoutText]").keyup(function(event) {
        if ($(this).val().length > maxLenght)
            $(this).val($(this).val().substring(0, maxLenght));
        if ($(".keyCounter"))
            $(".keyCounter").html("beírható karakterszám: " + (maxLenght - $(this).val().length));
    });

    $(".shoutForm label").inFieldLabels();

    $('img#shoutTextLink').click(function(e) {
        commentLogin = false;
        //$.fn.colorbox({ width: "430", height: "320", opacity: 0.7, inline: true, scrolling: false, href: "#shoutTextDialog", open: true });
        $.fn.colorbox({ width: "430", height: "360", opacity: 0.7, inline: true, scrolling: false, href: "#shoutTextDialog", open: true });
        $("#lo_message").html("");
    });

    $('img#shoutPhotoLink').click(function(e) {
        commentLogin = false;
        $.fn.colorbox({ width: "430", height: "360", opacity: 0.7, inline: true, scrolling: false, href: "#shoutPictureDialog", open: true });
        $("#lo_message").html("");
    });

    $('img#shoutVideoLink').click(function(e) {
        commentLogin = false;
        $.fn.colorbox({ width: "430", height: "350", opacity: 0.7, inline: true, scrolling: false, href: "#shoutVideoDialog", open: true });
        $("#lo_message").html("");
    });

    var validateURL = function(textval) {
        //alert("textval in validateURL: " + textval);
        var urlregex = new RegExp("^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.|http:\/\/.){1}([0-9A-Za-z]+\.)");
        //alert("urlregex.test(" + textval + "): " + urlregex.test(textval));
        return urlregex.test(textval);
    }

    var validateShout = function(formName) {
        /*var emailFilter = /^[a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;

        if (!(emailFilter.test($("#l_email").val()))) {
        alert("Az e-mail cím nem megfelelő formátumú!");
        $("#l_email").focus();
        return false;
        }*/

        if (formName == "shoutTextForm") {
            if ($("#l_shoutTextNickName") && $("#l_shoutTextNickName").val().length == 0) {
                alert("Kérjük adjon meg egy nincknevet!");
                $("#l_shoutTextNickName").focus();
                return false;
            }

            if ($("#l_shoutTextText") && $("#l_shoutTextText").val().length == 0) {
                alert("Kérjük adjon meg szöveget!");
                $("#l_shoutTextText").focus();
                return false;
            }
            else if ($("#l_shoutPageURL") && $("#l_shoutPageURL").val && validateURL($("#l_shoutPageURL").val())) {
                //alert("$(\"#l_shoutTextText\").val(): " + $("#l_shoutTextText").val());
                //$("#l_shoutTextText").val("54654684654654");
                $("#l_shoutTextText").val($("#l_shoutTextText").val()
                + " #<a href=\"" + $("#l_shoutPageURL").val()
                + "\" target=\"blank\" title=\"" + $("#l_shoutPageURL").val() + "\">"
                + $("#l_shoutPageURL").val() + "</a>");
                //alert("új l_shoutTextText: " + $("#l_shoutTextText").val());
            }
        }

        if (formName == "shoutPictureForm") {
            if ($("#l_shoutPictureNickName") && $("#l_shoutPictureNickName").val().length == 0) {
                alert("Kérjük adjon meg egy nincknevet!");
                $("#l_shoutPictureNickName").focus();
                return false;
            }

            if ($("#l_shoutPictureText") && $("#l_shoutPictureText").val().length == 0) {
                alert("Kérjük adjon meg szöveget!");
                $("#l_shoutPictureText").focus();
                return false;
            }

            if ($("#l_shoutPictureURL") && $("#l_shoutPictureURL").val().length == 0) {
                alert("Kérjük adjon meg egy kép url-t!");
                $("#l_shoutPictureURL").focus();
                return false;
            }
        }

        if (formName == "shoutVideoForm") {
            if ($("#l_shoutVideoNickName") && $("#l_shoutVideoNickName").val().length == 0) {
                alert("Kérjük adjon meg egy nincknevet!");
                $("#l_shoutVideoNickName").focus();
                return false;
            }

            if ($("#l_shoutVideoText") && $("#l_shoutVideoText").val().length == 0) {
                alert("Kérjük adjon meg szöveget!");
                $("#l_shoutVideoText").focus();
                return false;
            }

            if ($("#l_shoutVideoURL") && $("#l_shoutVideoURL").val().length == 0) {
                alert("Kérjük adjon meg egy video url-t!");
                $("#l_shoutVideoURL").focus();
                return false;
            }
        }
        return true;
    }

    var eraseShoutForm = function(formName) {
        $(':input', '#' + formName)
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .removeAttr('checked')
            .removeAttr('selected');
    }

    $('input#shoutTextImage').click(function(e) {
        if (!validateShout("shoutTextForm"))
            return false;
        e.stopPropagation();
        e.preventDefault();

        JsonRequest.ShoutValues = $('#shoutTextForm').serialize();
        $("#shoutTextImage").attr("disabled", "disabled");
        $("#lo_shoutTextMessage").html("<img src='/skins/default/img/loadingAnimation.gif' border='0' />");

        $.fn.colorbox.resize();

        $.ajax({
            type: "POST",
            url: "/ajax/shout.ashx",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: $.toJSON(JsonRequest),
            error: function(msg) {
                $("#shoutTextImage").attr("disabled", "");
                $("#lo_shoutTextMessage").html("Hiba történt a kommunikáció folyamán.").fadeOut(500).fadeIn(500);
                $.fn.colorbox.resize();
                setTimeout(function() { $.fn.colorbox.close(); }, 1100);
            },
            success: function(msg) {
                $("#shoutTextImage").attr("disabled", "");
                $.fn.colorbox.resize();
                if (msg.Status == 0) {
                    $("#lo_shoutTextMessage").html("A hozzászólás sikeresen elküldve!").fadeOut().fadeIn(300).fadeOut().fadeIn(300);
                    $.fn.colorbox.resize();
                    //window.location = window.location.href.split("#")[0];
                    setTimeout(function() { $.fn.colorbox.close(); eraseShoutForm("shoutTextForm"); }, 700);
                    //$.fn.colorbox.close();
                } else {
                    $("#lo_shoutTextMessage").html(msg.Message).fadeOut(500).fadeIn(500);
                    $.fn.colorbox.resize();
                    setTimeout(function() { $.fn.colorbox.close(); }, 1100);
                }
            }
        });

        return false;
    });

    $('input#shoutPictureImage').click(function(e) {
        if (!validateShout("shoutPictureForm"))
            return false;
        e.stopPropagation();
        e.preventDefault();

        JsonRequest.ShoutValues = $('#shoutPictureForm').serialize();
        $("#shoutPictureImage").attr("disabled", "disabled");
        $("#lo_shoutPictureMessage").html("<img src='/skins/default/img/loadingAnimation.gif' border='0' />");

        $.fn.colorbox.resize();

        $.ajax({
            type: "POST",
            url: "/ajax/shout.ashx",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: $.toJSON(JsonRequest),
            error: function(msg) {
                $("#shoutPictureImage").attr("disabled", "");
                $("#lo_shoutPictureMessage").html("Hiba történt a kommunikáció folyamán.").fadeOut(500).fadeIn(500);
                $.fn.colorbox.resize();
            },
            success: function(msg) {
                $("#shoutPictureImage").attr("disabled", "");
                $.fn.colorbox.resize();
                if (msg.Status == 0) {
                    $("#lo_shoutPictureMessage").html("A kép sikeresen elküldve!").fadeOut().fadeIn(300).fadeOut().fadeIn(300);
                    $.fn.colorbox.resize();
                    //window.location = window.location.href.split("#")[0];
                    setTimeout(function() { $.fn.colorbox.close(); eraseShoutForm("shoutTextForm"); }, 700);
                    //$.fn.colorbox.close();
                } else {
                    $("#lo_shoutPictureMessage").html(msg.Message).fadeOut(500).fadeIn(500);
                    $.fn.colorbox.resize();
                }
            }
        });

        return false;
    });

    $('input#shoutVideoImage').click(function(e) {
        if (!validateShout("shoutVideoForm"))
            return false;
        e.stopPropagation();
        e.preventDefault();

        JsonRequest.ShoutValues = $('#shoutVideoForm').serialize();
        $("#shoutVideoImage").attr("disabled", "disabled");
        $("#lo_shoutVideoMessage").html("<img src='/skins/default/img/loadingAnimation.gif' border='0' />");

        $.fn.colorbox.resize();

        $.ajax({
            type: "POST",
            url: "/ajax/shout.ashx",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: $.toJSON(JsonRequest),
            error: function(msg) {
                $("#shoutVideoImage").attr("disabled", "");
                $("#lo_shoutVideoMessage").html("Hiba történt a kommunikáció folyamán.").fadeOut(500).fadeIn(500);
                $.fn.colorbox.resize();
            },
            success: function(msg) {
                $("#shoutVideoImage").attr("disabled", "");
                $.fn.colorbox.resize();
                if (msg.Status == 0) {
                    $("#lo_shoutVideoMessage").html("A videó sikeresen elküldve!").fadeOut().fadeIn(300).fadeOut().fadeIn(300);
                    $.fn.colorbox.resize();
                    //window.location = window.location.href.split("#")[0];
                    setTimeout(function() { $.fn.colorbox.close(); eraseShoutForm("shoutTextForm"); }, 700);
                    //$.fn.colorbox.close();
                } else {
                    $("#lo_shoutVideoMessage").html(msg.Message).fadeOut(500).fadeIn(500);
                    $.fn.colorbox.resize();
                }
            }
        });

        return false;
    });
});