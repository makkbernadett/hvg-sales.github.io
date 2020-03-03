$(document).ready(function() {
    $("#btn_to_mobile").click(
	    function() {
        $.cookie("_hvg_mobile", "0", { expires: -1, path: "/", domain: "hvg.hu" });
		location.href = location.href.replace("hvg.hu","m.hvg.hu");
    });

    $().bind("cbox_load", function(){ 
        $('div.bannercontainer').each(function() {
            $(this).css("height", $(this).height() + "px").css("width", $(this).width() + "px");
        });
        $('object').hide();
    });
    $().bind("cbox_closed", function(){  
       $('div.bannercontainer').each(function() {
            $(this).css("height", "").css("width", "");            
        });
        $('object').show();
    });
    $('#searchterm').focus(function() {
        if (this.value == 'Keresendő kifejezés')
            this.value = '';
    });
    $('#searchterm').blur(function() {
        if (this.value == '')
            this.value = 'Keresendő kifejezés';
    });
    
    $('div.columnarticle').mouseover(function(){
            $(this).addClass("columnarticleover");
        }).mouseout(function(){
            $(this).removeClass("columnarticleover");
        });
        
    Nagyitas.init();

    //ie6
    $('div.zoom').hover(function() {
        $(this).children('span').show();
    }, function() {
        $(this).children('span').hide();
    });

    //if (generatedAt != undefined)
    if (typeof (generatedAt) != "undefined")
    {        
        $.Notifier();
    }
 
    var commentLogin = false;        
    $("#loginForm label").inFieldLabels();    
    
    /*$('a.loginlink').click(function (e) {   
        commentLogin = false;       
        $.fn.colorbox({width:"430", height: "500", opacity: 0.7, inline:true, scrolling:false, href:"#logindialog", open:true});        
        $("#lo_message").html("");
    });
    $('a.hvgCommentLogin').click(function (e) {   
        commentLogin = true;       
        $.fn.colorbox({width:"430", height: "500", opacity: 0.7, inline:true, scrolling:false, href:"#logindialog", open:true});
        $("#lo_message").html("");
    });*/
    $().bind('cbox_complete', function(){
        $.fn.colorbox.resize();
    }); 
    
    //set index position
    if ($('#indexSelector').length && $('#topIndexBox').length)
    {
        pos = $("#topIndexBox").offset();  
        width = $("#topIndexBox").width();
        $("#indexSelector").css( { "left": (pos.left + width - 300 ) + "px", "top": (pos.top + 22) + "px" } );   
         
        $('a#indexSelectorLink').click(function (e) {   
            e.stopPropagation();
            e.preventDefault();      
            $("#indexSelector").toggle();
        });    
    }
    
    $('a.hide').click(function() {
        $('#' + $(this).attr("rel")).toggle(100);
        $(this).toggleClass("show");
        return false;
    }); 
    
    var JsonRequest =
    {
        LoginValues: null        
    };
    
    $('input#loginImage').click(function (e) {   
        e.stopPropagation();
        e.preventDefault();      
        
        JsonRequest.LoginValues = $('#loginForm').serialize();
        $("#loginImage").attr("disabled", "disabled");
        $("#lo_message").html("<img src='/skins/default/img/loadingAnimation.gif' border='0' />");
        
        $.fn.colorbox.resize();
        
        $.ajax({
            type: "POST",
            url: "/ajax/auth.ashx",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: $.toJSON(JsonRequest),
            error: function(msg) {
                $("#loginImage").attr("disabled", "");       
                $("#lo_message").html("Hiba történt a kommunikáció folyamán.").fadeOut(500).fadeIn(500);   
                $.fn.colorbox.resize();          
            },
            success: function(msg) {
                $("#loginImage").attr("disabled", "");       
                $.fn.colorbox.resize();
                if (msg.Status == 0) 
                {
                    if (commentLogin)
                    {
                        $.fn.colorbox.close();
                        OnHVGLogged(true);
                    } else {
                        $("#lo_message").html("A bejelentkezés sikeresen megtörtént!").fadeOut().fadeIn(300).fadeOut(); 
                        $.fn.colorbox.resize();
                        window.location = window.location.href.split("#")[0];
                    }
                } else {
                    $("#lo_message").html(msg.Message).fadeOut(500).fadeIn(500);
                    $.fn.colorbox.resize();
                }                
            }
        });
        
        return false;
     }); 
     
     $('a#lostPasswordLink').click(function (e) {   
        if (!validateLoginEmail()) 
            return;
            
        $("#loginImage").attr("disabled", "disabled");
        $("#lo_message").html("<img src='/skins/default/img/loadingAnimation.gif' border='0' />");
        $.fn.colorbox.resize();
        
        $.ajax({
            type: "POST",
            url: "/ajax/reminder.ashx",
            dataType: "json",
            data: $('#loginForm').serialize()+"&rmd-command=password-email",
            error: function(msg) {
                $("#loginImage").attr("disabled", "");       
                $("#lo_message").html("Hiba történt a kommunikáció folyamán.").fadeOut(500).fadeIn(500);    
                $.fn.colorbox.resize();         
            },
            success: function(msg) {
                $("#loginImage").attr("disabled", "");       
                $("#lo_message").html(msg.Message).fadeOut(500).fadeIn(500);                            
                $.fn.colorbox.resize();
            }
        });     
     }); 
     
     $('a#activatioMailLink').click(function (e) {  
        if (!validateLoginEmail()) 
            return;
            
        $("#loginImage").attr("disabled", "disabled");
        $("#lo_message").html("<img src='/skins/default/img/loadingAnimation.gif' border='0' />");
        $.fn.colorbox.resize();
        
        $.ajax({
            type: "POST",
            url: "/ajax/reminder.ashx",
            dataType: "json",
            data: $('#loginForm').serialize()+"&rmd-command=activation-email",
            error: function(msg) {
                $("#loginImage").attr("disabled", "");       
                $("#lo_message").html("Hiba történt a kommunikáció folyamán.").fadeOut(500).fadeIn(500); 
                $.fn.colorbox.resize();            
            },
            success: function(msg) {
                $("#loginImage").attr("disabled", "");       
                $("#lo_message").html(msg.Message).fadeOut(500).fadeIn(500);                            
                $.fn.colorbox.resize();
            }
        }); 
     }); 
     
     var validateLoginEmail = function() 
     {
        var emailFilter = /^[a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;
 
        if (!(emailFilter.test($("#l_email").val()))) {
            alert("Az e-mail cím nem megfelelő formátumú!");
            $("#l_email").focus();
            return false;
        }      
 
        return true;
    }
 
    $(function() {
        $('#comment').keyup(function() {
            limitChars('comment', 11000, 'charlimitinfo');
        })
    });
    
});
 
function limitChars(textid, limit, infodiv) {
    var text = $('#' + textid).val();
    var textlength = text.length;
    if (textlength > limit) {
        $('#' + infodiv).html('Csak ' + limit + ' lehet a komment szövege!');
        $('#' + textid).val(text.substr(0, limit));
        return false;
    }
    else {
        $('#' + infodiv).html('Még ' + (limit - textlength) + ' karakter van hátra.');
        return true;
    }
}
 
function openGallery(id)
{
	newWindow = window.open("/gallery/" + id , "_blank", "width=952,height=753,resizeable=no,scrollbars=auto,screenX=150,screenY=10,status=0").focus();
	return;
}

jQuery.Notifier = function () {
    (function ($) {

        var updateInterval = 60000;
        var originalTitle = $(document).attr('title');
        var trid = 0;
        var newitems = null;
        var myTimeout = null;
        var maxElementNumber = 8;

        //TODO:N

        init = function () {
            jQuery(document).keypress(function (e) {
                if (e.target.tagName == 'HTML' || e.target.tagName == 'BODY') {
                    if (!e.altKey && !e.ctrlKey && e.which == 110) { // N    		            
                        showNewItems();
                        if ($('#newsNotification').is(':visible')) {
                            $.scrollTo($('#newsNotification'));
                        }
                    }
                }
            });

            myTimeout = setTimeout(this.checkNews, updateInterval);
            //checkNews();
            $("#newsUpdate").click(function (e) {
                showNewItems();
            });

            /*$("#latestNotificationNews").hover(function () {
            //$('#latestNotificationNews').stop('fadeOut', true, false);
            //$('#latestNotificationNews').stop('fadeOut', true, false).css('z-index','9999').fadeIn(800);
            $('#latestNotificationNews').stop('fadeOut', true, false).fadeIn(800);
            //$("#newsUpdate").hide();
            }, function () {
            //$('#latestNotificationNews').delay(2000).stop('fadeIn', true, false).fadeOut(800);
            $('#latestNotificationNews').delay(2000).fadeOut(800);
            //$('#latestNotificationNews').delay(8000).fadeOut(800).delay(801).queue(function() {
            //$(this).css('z-index', '0');
            //});
            //$("#newsUpdate").show();
            });*/

            $("#latestNotificationNews .boxtitle span#notiCloser").click(function (e) {
                //$('#latestNotificationNews').delay(2000).fadeOut(800);
                $('#latestNotificationNews').stop('fadeIn', true, false).fadeOut(800);
            });
        };

        checkNews = function () {
            clearTimeout(myTimeout);
            $.ajax({ type: 'GET',
                url: '/ajax/notifier.ashx?s=' + encodeURI(generatedAt) + '&trid=' + trid,
                //url: '/ajax/notifier.ashx?s=2012.02.09%2008:13&trid=0&_=1328714040220',
                //url: '/ajax/notifier.ashx?s=2012.02.16%2015:05' + '&trid=' + trid,
                cache: false,
                contentType: "json",
                success: function (resultObj) {
                    //resultObj = $.evalJSON(result);
                    if (generatedAt == '')//&& resultObj.trid == trid)
                        generatedAt = resultObj.since;

                    if (resultObj.count > 0) {//&& resultObj.trid == trid) {
                        for (i = 0; i < resultObj.articles.length; i++) {
                            if ($('#notification-' + resultObj.articles[i].id).length != 0) {
                                resultObj.count--;
                                resultObj.articles[i] == null;
                            }
                        }

                        if (resultObj.count > 0) {
                            /*var resultObjCount = resultObj.count;
                            if (resultObj.count > maxElementNumber)
                                resultObjCount = maxElementNumber;*/
                            var resultObjCount = resultObj.articles.length;
                            if (resultObjCount > maxElementNumber)
                                resultObjCount = maxElementNumber;

                            $(document).attr('title', '(' + resultObjCount + ') ' + originalTitle);
                            //$("#newsUpdate").html(resultObjCount + ' új cikk érkezett.');
                            $("#newsUpdate").html(resultObjCount + ' új cikk érkezett.');
                            //$("#newsNotification .boxtitle").hide();
                            $("#newsNotification").show();
                            $("#newsUpdate").show();

                            /*$(document).attr('title', '(' + resultObj.count + ') ' + originalTitle);
                            $("#newsUpdate").html(resultObj.count + ' új cikk érkezett.');
                            //$("#newsNotification .boxtitle").hide();
                            $("#newsNotification").show();
                            $("#newsUpdate").show();*/

                            newitems = resultObj.articles;

                            var newitemsLength = newitems.length;
                            if (newitems.length > maxElementNumber)
                                newitemsLength = maxElementNumber;

                            //$("#latestNotificationNews").html('<div class="boxtitle"><span id="notiCloser" style="float:right; padding-right:10px; cursor:pointer;" >X</span><h6>MOST ÉRKEZETT</h6></div>');
                            if ($("#latestNotificationNews .box .notificationItem"))
                                $("#latestNotificationNews .box .notificationItem").remove();

                            for (i = newitemsLength - 1; i >= 0; i--) {
                                /*if (newitems != null && $('#notification-' + newitems[i].id).length == 0) {
                                var toInsert = "<div class=\"notificationItem\" id=\"notification-" + newitems[i].id + "\"><h2><a href=\"" + newitems[i].url + "\" target=\"_blank\">" + newitems[i].title + "</a></h2>";
                                //toInsert += "<p>" + newitems[i].lead + "</p></div>";
                                $("#latestNotificationNews .boxtitle").after(toInsert);
                                }*/
                                var toInsert = "<div class=\"notificationItem\" id=\"notification-" + newitems[i].id + "\"><h2><a href=\"" + newitems[i].url + "\" target=\"_blank\">" + newitems[i].title + "</a></h2>";
                                $("#latestNotificationNews .box .boxtitle").after(toInsert);
                            }
                        }
                    }

                    myTimeout = setTimeout(checkNews, updateInterval);
                }
            });
        };

        showNewItems = function () {
            //for (i = newitems.length - 1; i >= 0; i--) {
            /*var newitemsLength = newitems.length;
            if (newitems.length > maxElementNumber)
            newitemsLength = newitemsLength - (newitems.length - maxElementNumber);*/

            // update for tick ->

            /*for (i = newitems.length - 1; i >= (newitems.length - maxElementNumber); i--) {
            if (newitems != null && $('#notification-' + newitems[i].id).length == 0) {
            var toInsert = "<div class=\"notificationItem\" id=\"notification-" + newitems[i].id + "\"><h2><a href=\"" + newitems[i].url + "\" target=\"_blank\">" + newitems[i].title + "</a></h2>";
            //toInsert += "<p>" + newitems[i].lead + "</p></div>";
            $("#latestNotificationNews .boxtitle").after(toInsert);
            }
            }*/

            // <- update for tick

            /*for (i = newitems.length - 1; i >= 0; i--) {
            if (newitems != null && $('#notification-' + newitems[i].id).length == 0) {
            var toInsert = "<div class=\"notificationItem\" id=\"notification-" + newitems[i].id + "\"><h2><a href=\"" + newitems[i].url + "\" target=\"_blank\">" + newitems[i].title + "</a></h2>";
            toInsert += "<p>" + newitems[i].lead + "</p></div>"
            $("#latestNotificationNews").prepend(toInsert);
            }
            }*/
            $(document).attr('title', originalTitle);
            //$("#newsUpdate").hide();
            //$("#latestNotificationNews").show();
            //position: absolute; top: 0; left: 0;
            //.css('position', 'absolute').css('top', '0').css('left', '0').css('z-index', '9999').css('zoom', '1')
            //var latestNotificationNewsWidth = ($('#newsNotification .boxcontainer').css('width').replace("px", "")) - 2;
            //latestNotificationNewsWidth = latestNotificationNewsWidth - 10;
            $('#latestNotificationNews').css('width', $('#newsNotification .boxcontainer').css('width')).fadeIn(800); //.animate({ top: '0' }, 800); //.delay(10000).animate({ top: '-200px' }, 800);
            //$("#newsNotification .boxtitle").show();
            generatedAt = '';
            //trid++;
            checkNews();
        }

        init();
    })(jQuery)
};
 
//http://webakademia.hu/2008/05/google-reader-szeru-navigacio/
Nagyitas = 
{
    scrolling: false,
    actual: null,
    actualPos: null,
    selector: '.imageTable',
    mainSelector: '.nagyitasWrapper',
    headerHeight: 0,
    init: function() 
    {        
        jQuery(document).keypress(function(e)
        { 
            if (e.target.tagName=='HTML' || e.target.tagName=='BODY') 
            {
    		    if (!e.altKey && !e.ctrlKey && (e.which==106 || e.which==107)) 
    		    { // J and K
		            if (Nagyitas.scrolling) 
		            { 
		                return false; 
		            }
    		        var titles = jQuery(Nagyitas.selector);
    		        if (titles.length == 0)
    		            titles = jQuery(Nagyitas.mainSelector);
		            var step = e.which==107 ? -1 : 1;
		            var c = jQuery(document).scrollTop();
		            if (Nagyitas.actualPos === c && typeof Nagyitas.actual == 'number') 
		            {
			            var i = Nagyitas.actual + step;
		            } else {
			            var i = 0; 
			            while (i < titles.length && jQuery(titles[i]).offset().top - Nagyitas.headerHeight <= c) 
			            { 
			                i++; 
			            }
			            if (step < 0) 
                        { 
                            i-=2; 
                        }
		            }
		            if (i >= 0 && i < titles.length) 
		            {
			            Nagyitas.scrolling = true;
		                jQuery.scrollTo(jQuery(titles[i]).offset().top-Nagyitas.headerHeight, 500, { easing:'swing', onAfter: function()
		                    {
			                    Nagyitas.actual = i;
			                    Nagyitas.actualPos = jQuery(document).scrollTop();
			                    Nagyitas.scrolling = false;
			                } 
			            });
		            }	
                }		            
		    }	   		
	    });    	    	
    }
}