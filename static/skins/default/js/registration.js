var JsonRequest =
{
    RequiredRegistration: true,
    FormID: null,
    FormDataValues: null,
    RegistrationValues: null        
};
    
$(function() {
    $('input#saveFormData').click(function (e) {   
        e.stopPropagation();
        e.preventDefault();
                
        if(!$("#registration").validationEngine({returnIsValid:true}))
        {
            return;
        }

        if (isHVGConnected && $("#old_password").val().length > 0)
        {
            //alert("TODO: nézze meg, hogy akar-e változtatni jelszót.")
            if ($("#password").val().length == 0 && $("#old_password").val().length !=0) 
            {
                alert("Mivel rég jelszavát megadta, ezért kérem adja meg az új jelszavát is. Vagy törölje régi jelszavát!");
                $("#password").focus();
                return false;
            }

            if ($("#password").val().length < 4 && $("#old_password").val().length !=0) 
            {
                alert("Az új jelszó legalább négy karatktert tartalmazzon!");
                $("#password").focus();
                return false;
            }

            if ($("#password_again").val().length == 0 && $("#old_password").val().length !=0) 
            {
                alert("Adja meg új jelszavát ismét!");
                $("#password_again").focus();
                return false;
            }

            if ($("#password").val() != $("#password_again").val() && $("#old_password").val().length !=0) 
            {
                alert("A két új jelszó nem egyezik meg!");
                $("#password").focus();
                return false;
            }
        }

        JsonRequest.RegistrationValues = $('#registration').serialize();        
        JsonRequest.FormID = $("#formId").val();
        
        $("#btnSave").attr("disabled", "disabled");
        $("#working").show();
        $("#old_password").val("");
        $("#password").val("");
        $("#password_again").val("");
        $.ajax({
            type: "POST",
            url: "/Ajax/Registration.ashx",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: $.toJSON(JsonRequest),
            complete: function(msg) {
                $("#working").hide();
                $("#btnSave").attr("disabled", "");
                window.location.hash = "topForm";
            },
            error: function(msg) {
                $("#msgSucceeded").hide();
                $("#msgFailed").html("Hiba történt a mentés folyamán.").show();
            },
            success: function(msg) {
                if (msg.Status == 0) {
                    $("#msgFailed").hide();
                    $("#msgSucceeded").html(msg.Message).fadeIn(500);
                    
                    //$("#plcHolder").hide();
                }
                else {
                    $("#msgSucceeded").hide();
                    $("#msgFailed").html(msg.Message).fadeIn(500).fadeOut(500).fadeIn(500);
                }
            }
        });
        return false;
    }); 
 });   
    
    
