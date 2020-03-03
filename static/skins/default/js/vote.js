$(function() {
    $('input.votePost').click(function (e) {   
        e.stopPropagation();
        e.preventDefault(); 
        
        //var ez = $(this).parents('form:first').find("[id=voteID]").val();
        var form = $(this).parents('form:first');
        formData = form.serialize();  
        $(this).attr("disabled", "disabled");
        
        $.ajax({
            type: "POST",
            url: "/ajax/vote",
            data: formData,
            error: function(msg) {
                $(this).attr("disabled", "");       
                alert("Hiba történt a kommunikáció folyamán.");             
            },
            success: function(msg) {
                $(this).attr("disabled", "");       
                $(form).find('[class=voteWrapper]').html(msg);
            }
        });
        
        return false;
    });    
});