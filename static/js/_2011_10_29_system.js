$(document).ready(function() {
    $("#btn_to_mobile").click(
	    function() {
		$.cookie("_hvg_mobile", null);
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
    
    if (generatedAt != undefined) 
    {        
        $.Notifier();
    }
 
    var commentLogin = false;        
    $("#loginForm label").inFieldLabels();    
    
    $('a.loginlink').click(function (e) {   
        commentLogin = false;       
        $.fn.colorbox({width:"430", height: "460", opacity: 0.7, inline:true, scrolling:false, href:"#logindialog", open:true});        
        $("#lo_message").html("");
    }); 
    $('a.hvgCommentLogin').click(function (e) {   
        commentLogin = true;       
        $.fn.colorbox({width:"430", height: "460", opacity: 0.7, inline:true, scrolling:false, href:"#logindialog", open:true});
        $("#lo_message").html("");
    });
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
	return false;
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
 
jQuery.Notifier = function()
{
    (function($) {
        
        var updateInterval = 60000;
        var originalTitle = $(document).attr('title');
        var trid = 0;
        var newitems = null;
        
        //TODO:N
 
        init = function() 
        { 
            jQuery(document).keypress(function(e)
            { 
                if (e.target.tagName=='HTML' || e.target.tagName=='BODY') 
                {
                    if (!e.altKey && !e.ctrlKey && e.which==110) 
    		        { // N    		            
    		            showNewItems();
    		            if ( $('#newsNotification').is(':visible')) {
    		                $.scrollTo($('#newsNotification'));
    		            }
    		        }
    		    }
            });
                		        
            setTimeout(this.checkNews, updateInterval);            
            //checkNews();
            $("#newsUpdate").click(function (e) {  
                showNewItems();
            }); 
            
        };   
        
        checkNews = function() 
        {           
             $.ajax({type: 'GET',
                    url: '/ajax/notifier.ashx?s=' + encodeURI(generatedAt) + '&trid=' + trid,
                    cache:false,
                    success: function(result) {     
                        resultObj = $.evalJSON(result);
                        if (generatedAt == '' && resultObj.trid == trid)
                            generatedAt = resultObj.since;
 
                        if(resultObj.count > 0 && resultObj.trid == trid)
                        {                
                            for (i = 0; i< resultObj.articles.length; i++)
                            {
                                if ($('#notification-' + resultObj.articles[i].id).length != 0)
                                {
                                    resultObj.count--;
                                    resultObj.articles[i] == null;                                       
                                }
                            }                             
                            
                            if (resultObj.count > 0)
                            {
                                $(document).attr('title', '(' + resultObj.count + ') ' +originalTitle);
                                $("#newsUpdate").html(resultObj.count + ' új cikk érkezett.');
                                $("#newsNotification .boxtitle").hide();
                                $("#newsNotification").show();
                                $("#newsUpdate").show();
                                
                                newitems = resultObj.articles;  
                            }                                                     
                        }
                        
                         setTimeout(checkNews, updateInterval);
                    }                        
                    });           
        };
        
        showNewItems = function() 
        {
            for (i =  newitems.length - 1; i >= 0; i--)
            {
               if (newitems != null && $('#notification-' + newitems[i].id).length == 0)
               {
                   var toInsert = "<div class=\"notificationItem\" id=\"notification-" + newitems[i].id + "\"><h2><a href=\"" + newitems[i].url + "\" target=\"_blank\">" + newitems[i].title + "</a></h2>";
                   toInsert += "<p>" + newitems[i].lead + "</p></div>"
                   $("#latestNotificationNews").prepend(toInsert);
               }
            }
            $(document).attr('title', originalTitle);
            $("#newsUpdate").hide();
            $("#latestNotificationNews").show();
            $("#newsNotification .boxtitle").show();
            generatedAt = '';
            trid++;
            checkNews();
        }
        
        init();       
})(jQuery)};
 
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