$(function() {
    $("a.articlesendlink").colorbox({width:"430", height: "390", opacity: 0.7, scrolling:false, inline:true, href:"#articleSendDialog"});	       
    $("#mailForm label").inFieldLabels();
    $("#mailForm").validationEngine();
    $("#shareHelp,#shareHelpBottom").tooltip({ tip: '#sharetip', delay: 1000, events: { def: "click,mouseout"} , opacity: 1, position: 'top center', effect: 'slide'});
    
    if (isFbConnected)
        OnFBLogged();
        
    if (isHVGConnected)
        OnHVGLogged(false);
    
    $('input#commentPostImage').click(function (e) {   
        e.stopPropagation();
        e.preventDefault();

        //$("#commentPostImage").attr('disabled', true);

        if (!$("#commentForm").validationEngine({ returnIsValid: true })) 
        {
            return;
        }

        $("#commentPostImage").attr('disabled', true);

        if (!isFbConnected)
        {
            formData = $('#commentForm').serialize();  
            
            $.ajax({
                type: "POST",
                url: "/ajax/username.ashx",
                data: formData,
                dataType: "json",
                error: function(msg) {
                    alert("Hiba történt a küldés folyamán!");             
                },
                success: function(msg) {
                    if (msg.Status == 0) 
                    {
                         $("#commentForm").submit();
                    } else {
                        /*$("input#new_username").focus();
                        alert(msg.Message);*/
                        $("input#new_username").focus();
                        //$("#commentPostImage").removeAttr('disabled');
                        $("#commentPostImage").attr('disabled', false);
                        alert(msg.Message);
                        return;
                    }
                }
            });
        
            return;
        }
        
        if (isFbConnected)
        {
            if($('input#fbPostWAll').attr('checked'))
            {                
                /*FB.Facebook.apiClient.users_hasAppPermission("publish_stream",
                    function(result) {
                        // prompt publish_stream permission
                        if (result == 0) {
                            // render the permission dialog
                            FB.Connect.showPermissionDialog("publish_stream",
                                function(result){
                                    if (null == result)
                                    {
                                        alert("A hozzászólás Facebookra küldéséhez engedélyt kell adnia!");
                                        return;
                                    }
                                    else {
                                        if (result != "publish_stream")
                                        {                                            
                                            alert("A hozzászólás Facebookra küldéséhez engedélyt kell adnia!");
                                            return;
                                        } else {
                                            $("#commentForm").submit();
                                        }
                                    }
                                }, true, null);                            
                        } else {
                            $("#commentForm").submit();
                        }
                    });*/
                $("#commentForm").submit();
            } else { $("#commentForm").submit(); }
        } else {
            $("#commentForm").submit();
        }
                            
    });
    
    $('input#mailPostImage').click(function (e) {   
        e.stopPropagation();
        e.preventDefault(); 
        $("#articleSend_message").html("");
        
        to=$('#to').val();
        from=$('#from').val();
        var emailFilter=/^[a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;

        if(!checkField(to,"Adja meg a címzett e-mail címét!"))
        {
            $('#to').focus();
            return false;
        }
        
        if (!(emailFilter.test(to))) 
        { 
	        $("#articleSend_message").html("A címzett e-mail címe nem megfelelő formátumú!").fadeOut(500).fadeIn(500);
	        $('#to').focus();
	        return false;
        }
        
        if(!checkField(from,"Adja meg az Ön e-mail címét!"))
        {
            $('#from').focus();
            return false;
        }

        if (!(emailFilter.test(from))) 
        { 
	        $("#articleSend_message").html("Az Ön e-mail címe nem megfelelő formátumú!").fadeOut(500).fadeIn(500);
	        $('#from').focus();
	        return false;
        }

        formData = $('#mailForm').serialize();  
        $("#mailPostImage").attr("disabled", "disabled");
        $("#articleSend_message").html("<img src='/skins/default/img/loadingAnimation.gif' border='0' />");
        $.fn.colorbox.resize();
        
        $.ajax({
            type: "POST",
            url: "/ajax/SendMail.ashx",
            data: formData,
            error: function(msg) {
                $("#mailPostImage").attr("disabled", "");       
                $("#articleSend_message").html("Hiba történt a küldés folyamán.").fadeOut(500).fadeIn(500); 
                $.fn.colorbox.resize();            
            },
            success: function(msg) {
                $("#mailPostImage").attr("disabled", "");       
                $("#articleSend_message").html("A levél elküldve.").fadeOut(500).fadeIn(500);
                $.fn.colorbox.resize();
            }
        });
        
        return false;
     });    
});    

function checkField (value, message) 
{
    if (value == "") 
    {
        $("#articleSend_message").html(message).fadeOut(500).fadeIn(500);
        $.fn.colorbox.resize();
        return false;
    } 
    else
	    return true;
}

function OnTextarea() {
    if (!isHVGConnected && !isFbConnected) {
        $("#logInFBWrapper").show();
        $('#comment').attr('readonly', true);
        $('#charlimitinfo').hide();
    }
    else {
        $('#comment').attr('readonly', false);
        $('#charlimitinfo').show();   
    }
}

/*function OnFBLogin() {
    FB.login(function(response) {
        if (response.session) {
            if (response.perms) {
                // user is logged in and granted some permissions.
                // perms is a comma separated list of granted permissions
            } else {
                // user is logged in, but did not grant any permissions
                alert("A hozzászólás Facebookra küldéséhez engedélyt kell adnia!");
            }
            OnFBLogged();
        } else {
            // user is not logged in
        }
    }, { perms: 'publish_stream' });
}*/

/*function OnFBLogin() {
    console.log("First step OnFBLogin");
    FB.login(function (response) {
        console.log("response: " + response);
        console.log("typeof(response): " + typeof (response));
        console.log("before checking response.authResponse");
        if (response.authResponse) {
            //            if (response.scope) {
            ////             user is logged in and granted some permissions.
            ////             perms is a comma separated list of granted permissions
            //            } else {
            ////             user is logged in, but did not grant any permissions
            //                alert("A hozzászólás Facebookra küldéséhez engedélyt kell adnia!");
            //            }
            console.log("response.authResponse is ture");
            OnFBLogged();
        } else {
            // user is not logged in
            console.log("response.authResponse is false or undefined.... sorry");
            console.log("response.authResponse: " + response.authResponse);
        }
    }, { scope: 'publish_stream' });
    //      }, { scope: 'email' });
}*/

function OnFBLogin() {
    //console.log("First step OnFBLogin");
    FB.login(function (response) {
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected')
                UpdateFaceBookWrapper(response.authResponse.userID, response.authResponse.accessToken);
            //OnFBLogged();
        }, true);
    }, { scope: 'publish_stream' });
}

/*function OnFBLogged()
{
    isFbConnected = true;
    $("#logInFBWrapper").hide();
    $("#loggedInFBWrapper").show();
    $("#commentPostImage").show();
//    $("#commentPostImage").show();
//    $("#formTopWrapper").hide();
   // $("#formBottomWrapper").hide();
    $("#formFBBottomWrapper").show();
    //$("#fbid").val(FB.Facebook.apiClient.get_session().uid);
    $("#fbid").val(FB.getSession().uid);
    
    $.validationEngine.closePrompt(".formError", true);
//    $("input#com_name").removeClass('validate[required]');
//    $("input#com_email").removeClass('validate[required,custom[email]]');
    $("input#comment").removeClass('validate[required]');
//    $("input#captcha").removeClass('validate[required,custom[onlyNumber]]');        
}*/

function UpdateFaceBookWrapper(uid, accessToken) {
    /*var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;*/

    //$("#fbAvatar").html('<img src="https://graph.facebook.com/' + uid + '/picture">');
    //if (typeof (uid) != "undefined") {
    if (uid) {
        FB.api('/me', function (response) {
            //$("#fbAvatar").html('<img src="https://graph.facebook.com/' + response.id + '/picture">');
            $("#fbUsername").html('<a href="http://www.facebook.com/profile.php?id=' + uid + '" class="fb_link">' + response.name + '</a>');
            $("#fbAvatar").html('<a class="fb_link" href="http://www.facebook.com/profile.php?id=' + uid + '"><img src="https://graph.facebook.com/' + uid + '/picture" alt="' + response.name + '" title="' + response.name + '" style="height:undefined;" class="fb_profile_pic_rendered"></a>');
            //$("#fbUsername").html(response.name);
            //$("#fbid").val(response.id);
            //alert("fb_access_token" + response.authResponse.accessToken);
        });
    }
    //$("#fbUsername").html(response.name);
    $("#fbid").val(uid);
    //$("#fbAccessToken").val(response.authResponse.accessToken);
    $("#fbAccessToken").val(accessToken);
    //alert("fb_access_token" + response.authResponse.accessToken);

    $("#commentPostImage").show();

    $("#logInFBWrapper").hide();
    $("#loggedInFBWrapper").show();
    $("#formFBBottomWrapper").show();

    $.validationEngine.closePrompt(".formError", true);
    $("input#comment").removeClass('validate[required]');
}

function OnFBLogged() {
    isFbConnected = true;
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            // the user is logged in and connected to your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token 
            // and signed request each expire

            UpdateFaceBookWrapper(response.authResponse.userID, response.authResponse.accessToken);

        } else if (response.status === 'not_authorized') {
            isFbConnected = false;
            // the user is logged in to Facebook, 
            //but not connected to the app
        } else {
            isFbConnected = false;
            // the user isn't even logged in to Facebook.
        }
    });
}



function OnFBLogout()
{
    $.validationEngine.closePrompt(".formError", true);
    FB.logout(
        function() {
            isFbConnected = false;
            
            if (isHVGConnected)
            {
                $("#loggedInHVGUser").show();
            } else {
                $("#logInFBWrapper").hide();         
//                $("#formTopWrapper").show();
                //$("#formBottomWrapper").show();                
                
//                $("input#com_name").addClass('validate[required]');
//                $("input#com_email").addClass('validate[required,custom[email]]');
                $("input#comment").addClass('validate[required]');
//                $("input#captcha").addClass('validate[required,custom[onlyNumber]]');            
            }

            $("#commentPostImage").hide();          
            $("#loggedInFBWrapper").hide();
            $("#fbid").val("");
            $("#formFBBottomWrapper").hide();
            $("#fbAccessToken").val("");
        });                       
}

function OnHVGLogged(reload)
{
    if (reload)
        $("#loggedInHVGUser").load("/ajax/hvgcommentbox").show();

    isHVGConnected = true;
    $("#logInFBWrapper").hide();
    $("#loggedInHVGUser").show();
    $("#commentPostImage").show(); 
//    $("#formTopWrapper").hide();
    //$("#formBottomWrapper").hide();
    $("#formFBBottomWrapper").hide();
    
    $.validationEngine.closePrompt(".formError", true);
//    $("input#com_name").removeClass('validate[required]');
//    $("input#com_email").removeClass('validate[required,custom[email]]');
    $("input#comment").removeClass('validate[required]');
//    $("input#captcha").removeClass('validate[required,custom[onlyNumber]]');        
}
function OnHVGLogout()
{
    $.ajax({
            type: "GET",
            url: "/ajax/logout",
            error: function(msg) {
                alert("Hiba történt a kommunikáció folyamán.");             
            },
            success: function(msg) {
                $.validationEngine.closePrompt(".formError", true);
   
                isHVGConnected = false;
                $("#logInFBWrapper").hide();
                $("#loggedInHVGUser").hide();
                $("#commentPostImage").hide(); 
//                $("#formTopWrapper").show();
                //$("#formBottomWrapper").show();
                $("#formFBBottomWrapper").hide();
                
//                $("input#com_name").addClass('validate[required]');
//                $("input#com_email").addClass('validate[required,custom[email]]');
                $("input#comment").addClass('validate[required]');
//                $("input#captcha").addClass('validate[required,custom[onlyNumber]]');             
            }
        });           
}

function onShowHiddenBG(id)
{
    if (id)
    {
        var hideID = "no"+id;
        $("#"+hideID).hide();
        //$("#"+id).css({'visibility' : ''});
        $("#"+id).css({opacity: 0, visibility: "visible"}).animate({opacity: 1},3000);
    }
}