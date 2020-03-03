var JsonRequest =
    {
        RequiredRegistration: true,
        FormID: null,
        FormDataValues: null,
        EmailPasswordValues : null,
        PersonalValues: null
        //RegistrationValues: null        
    };

    function saveEmailPassword() {
        //alert("saveEmailPassword()... ");
        if (!validateRegistration())
            return false;
        JsonRequest.EmailPasswordValues = jQuery('#form_registration').serialize();
        JsonRequest.PersonalValues = null;
        JsonRequest.FormDataValues = null;
        saveData()
    }

    function savePersonalData() {
        //alert("savePersonalData()... ");
        if (!validatePersonalInfo())
            return false;
        JsonRequest.PersonalValues = jQuery('#form_personal').serialize();
        JsonRequest.FormDataValues = null;
        JsonRequest.EmailPasswordValues = null;
        saveData()
    }

    function saveSiteSpecificData() {
        //alert("saveSiteSpecificData()... ");
        JsonRequest.FormDataValues = jQuery('#form_siteDatas').serialize();
        JsonRequest.EmailPasswordValues = null;
        JsonRequest.PersonalValues = null;
        saveData();
    }

function saveData() {
    //alert("saveData()... ");
    /*if(JsonRequest.RequiredRegistration) {
        if(!validateRegistration())
            return false;
        JsonRequest.RegistrationValues = jQuery('#form_registration').serialize();
    }
    
    JsonRequest.FormDataValues = jQuery('#form_'+JsonRequest.FormID).serialize();*/

    jQuery("#btnSave").attr("disabled", "disabled");
    jQuery("#working").show();
    jQuery("#old_password").val("");
    jQuery("#password").val("");
    jQuery("#password_again").val("");
    jQuery.ajax({
        type: "POST",
        //url: "/Ajax/RegistrationForm_new.ashx",
        url: "/skins/default/AjaxHandlers/RegistrationForm_new.ashx",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: jQuery.toJSON(JsonRequest),
        complete: function(msg) {
            jQuery("#working").hide();
            jQuery("#btnSave").attr("disabled", "");
            window.location.hash = "topForm";
        },
        error: function(msg) {
            jQuery("#msgSucceeded").hide();
            jQuery("#msgFailed").html("Hiba történt a mentés folyamán.").show();
        },
        success: function(msg) {
            //alert("msg.Redirect: "+msg.Redirect);
            if (msg.Status == 0) {
                if (msg.Redirect == "[reload]")
                    location.reload();
                else {
                    jQuery("#msgFailed").hide();
                    jQuery("#msgSucceeded").html(msg.Message + '<a href="' + "javascript:void(jQuery('#msgSucceeded').hide());" + '"></a>').fadeIn(500);
                }
                    
                //jQuery("#article").hide();
            }
            else {
                jQuery("#msgSucceeded").hide();
                jQuery("#msgFailed").html(msg.Message + '<a href="' + "javascript:void(jQuery('#msgFailed').hide());" + '"></a>').fadeIn(500).fadeOut(500).fadeIn(500);
            }
        }
    });
}