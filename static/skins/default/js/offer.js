$(function() {
    $("#offerHelp").tooltip(
        { tip: '#dynatip', opacity: 1, position: 'top center',  offset: [345, -350] });    
    
    if ($("a.blogdialoglink").length > 0)        
        $("a.blogdialoglink").colorbox({width:"430", height: "560", opacity: 0.7, scrolling:false, inline:true, href:"#blogdialog"});	    
    
    $().bind("cbox_load", function(){         
         $("#bo_message").html("");
         $("#o_blogname").val("");
         $("#o_blogurl").val("");
         $("#o_title").val("");
         $("#o_description").val("");
         $("#offerMaxWrapper").html("1000");             
         $("#offerForm label[for='o_blogname']").css('opacity', 1).show();
         $("#offerForm label[for='o_blogurl']").css('opacity', 1).show();
         $("#offerForm label[for='o_title']").css('opacity', 1).show();
         $("#offerForm label[for='o_description']").css('opacity', 1).show();  
         $("#offerForm label").inFieldLabels();           
    });
    $("#offerForm label").inFieldLabels();
    
    $('input#offerPostImage').click(function (e) {   
        e.stopPropagation();
        e.preventDefault(); 

        formData = $('#offerForm').serialize();  
        $("#offerPostImage").attr("disabled", "disabled");
        $("#bo_message").html("<img src='/skins/default/img/loadingAnimation.gif' border='0' />");
        if ($.fn.colorbox)
            $.fn.colorbox.resize();
        
        $.ajax({
            type: "POST",
            url: "/ajax/offer.ashx",
            dataType: "json",
            data: formData,
            error: function(msg) {
                $("#offerPostImage").attr("disabled", "");       
                $("#bo_message").html("Hiba történt a beküldés folyamán.").fadeOut(500).fadeIn(500);  
                if ($.fn.colorbox)
                    $.fn.colorbox.resize();           
            },
            success: function(msg) {
                $("#offerPostImage").attr("disabled", "");       
                $("#bo_message").html(msg.Message).fadeOut(500).fadeIn(500);
                if ($.fn.colorbox)
                    $.fn.colorbox.resize();
            }
        });
        
        return false;
     });            
});  

var showOfferDialog = function()
{
    $.fn.colorbox({width:"430", height: "620", opacity: 0.7, scrolling:false, inline:true, href:"#blogdialog"});	    
}

var updateOfferTextCounter = function(textarea) {
    minLength = 15;
    maxLength = 1000;

    var length = textarea.value ? $.trim(textarea.value).length : 0;
    var jTxt = $(textarea);

    counter = $("#offerMaxWrapper");
    counter.html(maxLength - length);        
}          