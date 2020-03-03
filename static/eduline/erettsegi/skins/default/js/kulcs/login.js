function LoginDesigne(loginName, SID) {
    /*if (loginName.length > 0)
        jQuery("#change_succes_login_mod_member_data").text(loginName);
    else
        jQuery("#change_succes_login_mod_member_data").text("Adatmódosítás");
    jQuery("#change_succes_login_mod_member_data").attr("title", "adatok módosítása");
    var newsletterLink = "/NewsLetterLink/" + SID + "/hirlevel_lifestyle_fel.aspx";
    //alert("newsletterLink: "+newsletterLink);
    jQuery("#change_succes_login_mod_newsletter_link").attr("href", newsletterLink);
    jQuery("#open_login_li").attr("style", "transparent url(/skins/default/img/bullet.gif) no-repeat scroll left 5px");
    jQuery("#open_login_panel").attr("href", "/logout.aspx");
    jQuery("#open_login_panel").attr("title", "Kijelentkezés");
    jQuery("#open_login_panel").text("Kijelentkezés");
    jQuery("div#panel").slideUp("slow");*/
    return true;
}

function validateLoginData() {
    if (document.login.email.value.length == 0) {
        alert("Adja meg e-mail címét!");
        document.login.email.focus();
        return false;
    }

    //var emailFilter = /^[a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;
    var emailFilter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

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

var RawURLForLogin = null;

var JsonLoginRequest =
{
    LoginValues: null
};

function startToLogin() {
    //alert("startToLogin:)");
    if (!validateLoginData())
        return false;


    JsonLoginRequest.LoginValues = jQuery('#login').serialize();

    //jQuery("#login_btn").attr("disabled", "disabled");
    //jQuery("#working").show();
    //jQuery("#log_password").val("");  nem néz ki jol.... :)

    //alert("JsonLoginRequest.LoginValues: " + JsonLoginRequest.LoginValues);

    jQuery.ajax({
        type: "POST",
        url: "/skins/default/AjaxHandlers/LoginForm.ashx",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jQuery.toJSON(JsonLoginRequest),
        complete: function (msg) {
            //jQuery("#working").hide();
            //jQuery("#login_btn").attr("disabled", "");
            //window.location.hash = "topForm";
        },
        error: function (msg) {
            /*jQuery("#panel").css("height", "150px");
            jQuery("#msgLoginSucceeded").hide();
            jQuery("#msgLoginFailed").html("Hiba történt a belépés folyamán.").show();*/
            alert("Hiba történt a belépés folyamán.");
        },
        success: function (msg) {
            //alert("succes... :)");
            if (msg.Status == 0) {
                //jQuery("#msgLoginFailed").hide();
                //jQuery("#msgSucceeded").html(msg.Message).fadeIn(500);                    
                LoginDesigne(msg.Message.split(":")[1], msg.Message.split(":")[2]);
                //alert("msg.Message: " + msg.Message);
                //alert("window.location.pathname: " + window.location.pathname);
                /*if (window.location.pathname.indexOf("regisztracio") != -1 || window.location.pathname.indexOf("urlap") != -1 || window.location.pathname.indexOf("nyeremeny") != -1) {
                setTimeout(window.location.reload(), 500);
                //window.location = '/regisztracio.aspx';
                }*/
                //alert("RawURLForLogin: " + RawURLForLogin);
                if (RawURLForLogin) {
                    setTimeout(window.location = RawURLForLogin, 500);
                }

                //window.location.reload();

                //jQuery("#plcHolder").hide();
                //alert("succes1... :)");
            }
            else {
                /*jQuery("#panel").css("height", "210px");
                //alert("window.location.pathname.indexOf(\"regisztracio\") "+window.location.pathname.indexOf("regisztracio"));
                if (msg.Message.indexOf("jelszo_emlekezteto") != -1) {
                jQuery("#pwdReminderLink").hide();
                }
                else {
                jQuery("#pwdReminderLink").fadeIn(500);
                }
                //jQuery("#msgLoginSucceeded").hide();
                //jQuery("#msgLoginFailed").html(msg.Message).fadeIn(500).fadeOut(500).fadeIn(500);*/
                alert(msg.Message);
            }
        }
    });
}