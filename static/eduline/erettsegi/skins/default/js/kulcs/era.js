$(document).ready(function() {

	$("input").placeholder();
	
	//nyitogato
	$("a.toggle").toggle(function(){
		$(this).removeClass('active');
		$("div.personal-block").slideUp();
	}, function() {
		$(this).addClass('active');
		$("div.personal-block").slideDown();
	});
	
	//tab
	$(".tab-content").hide();
	$("ul.tabs li:first").addClass("active").show();
	$(".tab-content:first").show();
	
	$("ul.tabs li").click(function() {
		$("ul.tabs li").removeClass("active");
		$(this).addClass("active");
		$(".tab-content").hide();
		
		var activeTab = $(this).find("a").attr("href");
		$(activeTab).show();
		return false;
	});

});