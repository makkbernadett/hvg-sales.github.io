var isFbConnected = false;
var isHVGConnected = false;

$(function() {
    if (isFbConnected)
        OnFBLogged();

    if (isHVGConnected)
        OnHVGLogged(false);

    $('input#commentPostImage').click(function(e) {
        e.stopPropagation();
        e.preventDefault();

        if (!$("#commentForm").validationEngine({ returnIsValid: true })) {
        return;
        }

        /*alert("felhasználó név: " + $("input#new_username").val()); //-> ez maga alert szoveg hossza...

        alert("felhasználó név hossz: " + $("input#new_username").length); -> const. 1, ha van benne valami*/

        /*if (!isFbConnected && $("input#new_username").val() == "Új felhasználói név") {
            alert("Adjon új felhasználó nevet!");
            $("input#new_username").focus();
            return;
        }*/

        if (!isFbConnected) {
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
                    if (msg.Status == 0) {
                        $("#commentForm").submit();
                    } else {
                        $("input#new_username").focus();
                        alert(msg.Message);
                        return;
                    }
                }
            });

            return;
        }

        if (isFbConnected) {
            if ($('input#fbPostWAll').attr('checked')) {
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

    $('a.hvgCommentLogin').click(function(e) {
        toggleDisplay("pg-loginbox");
        $("#user2").focus();
        /*commentLogin = true;
        $.fn.colorbox({ width: "430", height: "460", opacity: 0.7, inline: true, scrolling: false, href: "#logindialog", open: true });
        $("#lo_message").html("");*/
    });

});

function OnFBLogin() {
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
}


function OnFBLogged() {
    isFbConnected = true;
    $("#logInFBWrapper").hide();
    $("#loggedInFBWrapper").show();
    //$("#formTopWrapper").hide();
    //$("#formBottomWrapper").hide();
    $("#CommentWrapper").show();
    $("#formFBBottomWrapper").show();
    //$("#fbid").val(FB.Facebook.apiClient.get_session().uid);
    $("#fbid").val(FB.getSession().uid);

    $.validationEngine.closePrompt(".formError", true);
    //$("input#com_name").removeClass('validate[required]');
    //$("input#com_email").removeClass('validate[required,custom[email]]');
    $("input#comment").removeClass('validate[required]');
    $("input#captcha").removeClass('validate[required,custom[onlyNumber]]');
    $("input#new_username").removeClass('validate[required,custom[checkUserName]]');
    
    // for techline
    $(".posts-box-comment p#newComment").show();
}

function OnFBLogout() {
    $.validationEngine.closePrompt(".formError", true);
    FB.logout(
        function() {
            isFbConnected = false;

            if (isHVGConnected) {
                $("#loggedInHVGUser").show();
            } else {
                $("#logInFBWrapper").show();
                //$("#formTopWrapper").show();
                //$("#formBottomWrapper").show();
                $("#CommentWrapper").hide();

                //$("input#com_name").addClass('validate[required]');
                //$("input#com_email").addClass('validate[required,custom[email]]');
                $("input#comment").addClass('validate[required]');
                $("input#captcha").addClass('validate[required,custom[onlyNumber]]');
            }


            $("#loggedInFBWrapper").hide();
            $("#fbid").val("");
            $("#formFBBottomWrapper").hide();
            // just for techline
            $(".posts-box-comment p#newComment").hide();
            // /just for techline
    });
}

function OnHVGLogged(reload) {
    /*if (reload)
    $("#loggedInHVGUser").load("/ajax/hvgcommentbox").show();*/

    isHVGConnected = true;
    $("#logInFBWrapper").hide();
    $("#loggedInHVGUser").show();
    //$("#formTopWrapper").hide();
    //$("#formBottomWrapper").hide();
    $("#CommentWrapper").show();
    $("#formFBBottomWrapper").hide();

    $.validationEngine.closePrompt(".formError", true);
    //$("input#com_name").removeClass('validate[required]');
    //$("input#com_email").removeClass('validate[required,custom[email]]');
    $("input#comment").removeClass('validate[required]');
    $("input#captcha").removeClass('validate[required,custom[onlyNumber]]');
    // for techline
    $(".posts-box-comment p#newComment").show();
}

function OnHVGLogout() {
    $.ajax({
        type: "GET",
        url: "/ajax/logout.aspx",
        error: function(msg) {
            alert("Hiba történt a kommunikáció folyamán.");
        },
        success: function(msg) {
            $.validationEngine.closePrompt(".formError", true);

            isHVGConnected = false;
            $("#logInFBWrapper").show();
            $("#loggedInHVGUser").hide();
            //$("#formTopWrapper").show();
            //$("#formBottomWrapper").show();
            $("#CommentWrapper").hide();
            $("#formFBBottomWrapper").hide();

            //$("input#com_name").addClass('validate[required]');
            //$("input#com_email").addClass('validate[required,custom[email]]');
            $("input#comment").addClass('validate[required]');
            $("input#captcha").addClass('validate[required,custom[onlyNumber]]');

            // just for techline
            $("#header ul#loginHeader").html("<li><a href=\"javascript:void(0);\" rel=\"pg-loginbox\" onclick=\"toggleDisplay('pg-loginbox')\">Bejelentkezés</a></li><li><a href=\"/regisztracio.aspx\">Regisztráció</a></li><li><a href=\"/jelszo_emlekezteto.aspx\">Elfelejtett jelszó</a></li>");
            $(".posts-box-comment p#newComment").hide();
            // /just for techline
        }
    });
}

function onShowHiddenBG(id) {
    if (id) {
        var hideID = "no" + id;
        $("#" + hideID).hide();
        //$("#"+id).css({'visibility' : ''});
        $("#" + id).css({ opacity: 0, visibility: "visible" }).animate({ opacity: 1 }, 3000);
    }
}

var fontSize = 11;

function setFaceSize() {
    lineHeight = fontSize + Math.round(.3 * fontSize);

    for (i = 0; i < 2; i++) {
        obj = document.getElementById("articleBody" + i);
        if (obj) {
            obj.style.fontSize = fontSize + "px";
            obj.style.lineHeight = lineHeight + "px";

            if (obj.childNodes.length > 0) {
                for (j = 0; j < obj.childNodes.length; j++) {
                    if (obj.childNodes[j].style != null) {
                        obj.childNodes[j].style.fontSize = fontSize + "px";
                        obj.childNodes[j].style.lineHeight = lineHeight + "px";
                    }
                }
            }
        }
    }
}

function eventFaceLarger() {
    fontSize = fontSize + 2;

    if (fontSize > 18) { fontSize = 18; }

    setFaceSize()
}


function eventFaceSmaller() {
    fontSize = fontSize - 2
    if (fontSize < 9) fontSize = 9;

    setFaceSize();
}

function openSendMail(path, caption) {
    urllink = "http://techline.hu/sendMail.aspx?path=http://techline.hu" + path + "&caption=" + caption;
    mywindow = window.open(urllink, 'mywindow', 'location=0,status=0,scrollbars=0,width=440,height=420');
    mywindow.moveTo(screen.width / 2 - 220, 200);
}

function VisibleForm() {
    if (document.location.toString().indexOf("#") > 0) {
        document.location = document.location.toString().substring(0, document.location.toString().indexOf("#")) + "#gotoForm";
    }
    else {
        document.location = document.location + "#gotoForm";
    }

}

function VisibleComments() {
    if (document.location.toString().indexOf("#") > 0) {
        document.location = document.location.toString().substring(0, document.location.toString().indexOf("#")) + "#comments";
    }
    else {
        document.location = document.location + "#comments";
    }

}

function GoToCommentForm() {
    VisibleForm();
    x = document.getElementById('commentform');
}