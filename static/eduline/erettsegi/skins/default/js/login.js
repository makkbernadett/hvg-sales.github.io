function LoginDesigne(loginName, SID) {
    /*if (loginName.length > 0)
        $("#change_succes_login_mod_member_data").text(loginName);
    else
        $("#change_succes_login_mod_member_data").text("Adatmódosítás");
    $("#change_succes_login_mod_member_data").attr("title", "adatok módosítása");
    var newsletterLink = "/NewsLetterLink/" + SID + "/hirlevel_lifestyle_fel.aspx";
    //alert("newsletterLink: "+newsletterLink);
    $("#change_succes_login_mod_newsletter_link").attr("href", newsletterLink);
    $("#open_login_li").attr("style", "transparent url(/skins/default/img/bullet.gif) no-repeat scroll left 5px");
    $("#open_login_panel").attr("href", "/logout.aspx");
    $("#open_login_panel").attr("title", "Kijelentkezés");
    $("#open_login_panel").text("Kijelentkezés");
    $("div#panel").slideUp("slow");*/
    return true;
}

function validateLoginData() {
    if (document.login.email.value.length == 0) {
        alert("Adja meg e-mail címét!");
        document.login.email.focus();
        return false;
    }

    var emailFilter = /^[a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;

    if (!(emailFilter.test(document.login.email.value))) {
        alert("Az e-mail cím nem megfelelő formátumú!");
        document.login.email.focus();
        return false;
    }

    if (document.login.password.value.length == 0) {
        alert("Adjon meg egy jelszót!");
        document.login.password.focus();
        return false;
    }

    return true;
}

var JsonLoginRequest =
{
    LoginValues: null
};

function startToLogin() {
    //alert("startToLogin:)");
    if (!validateLoginData())
        return false;


    JsonLoginRequest.LoginValues = $('#login').serialize();

    //$("#login_btn").attr("disabled", "disabled");
    //$("#working").show();
    $("#log_password").val("");

    //alert("JsonLoginRequest.LoginValues: " + JsonLoginRequest.LoginValues);

    $.ajax({
        type: "POST",
        url: "/skins/default/AjaxHandlers/LoginForm.ashx",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: $.toJSON(JsonLoginRequest),
        complete: function (msg) {
            //$("#working").hide();
            //$("#login_btn").attr("disabled", "");
            //window.location.hash = "topForm";
        },
        error: function (msg) {
            /*$("#panel").css("height", "150px");
            $("#msgLoginSucceeded").hide();
            $("#msgLoginFailed").html("Hiba történt a belépés folyamán.").show();*/
            alert("Hiba történt a belépés folyamán.");
        },
        success: function (msg) {
            //alert("succes... :)");
            if (msg.Status == 0) {
                //$("#msgLoginFailed").hide();
                //$("#msgSucceeded").html(msg.Message).fadeIn(500);                    
                LoginDesigne(msg.Message.split(":")[1], msg.Message.split(":")[2]);
                //alert("msg.Message: " + msg.Message);
                //alert("window.location.pathname: " + window.location.pathname);
                if (window.location.pathname.indexOf("regisztracio") != -1 || window.location.pathname.indexOf("urlap") != -1 || window.location.pathname.indexOf("nyeremeny") != -1) {
                    setTimeout(window.location.reload(), 500);
                    //window.location = '/regisztracio.aspx';
                }

                //window.location.reload();

                //$("#plcHolder").hide();
                //alert("succes1... :)");
            }
            else {
                /*$("#panel").css("height", "210px");
                //alert("window.location.pathname.indexOf(\"regisztracio\") "+window.location.pathname.indexOf("regisztracio"));
                if (msg.Message.indexOf("jelszo_emlekezteto") != -1) {
                    $("#pwdReminderLink").hide();
                }
                else {
                    $("#pwdReminderLink").fadeIn(500);
                }
                //$("#msgLoginSucceeded").hide();
                //$("#msgLoginFailed").html(msg.Message).fadeIn(500).fadeOut(500).fadeIn(500);*/
                alert(msg.Message);
            }
        }
    });
}