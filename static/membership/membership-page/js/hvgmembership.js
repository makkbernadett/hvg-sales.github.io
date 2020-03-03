
$(document).ready(function (){
    $("[data-background]").each(function() {
        var attr = $(this).attr('data-background');
        if (typeof attr !== typeof undefined && attr !== false && !$(this).hasClass('hero-inside-post')) {
            $(this).css('background-image', 'url(' + attr + ')');
        }
	});

  $('.btn-hover')
    .on('mouseenter', function(e) {
			var parentOffset = $(this).offset(),
      		relX = e.pageX - parentOffset.left,
      		relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
    })
    .on('mouseout', function(e) {
			var parentOffset = $(this).offset(),
      		relX = e.pageX - parentOffset.left,
      		relY = e.pageY - parentOffset.top;
    	$(this).find('span').css({top:relY, left:relX})
    });
	
	$('.btn-hover').click(function(){return false});
	
	sameHeight('.short-description');
	sameHeight('.product .card-body');
	
	if( $(".toggle .toggle-title").hasClass('active') ){
		$(".toggle .toggle-title.active").closest('.toggle').find('.toggle-inner').show();
	}
	$(".toggle .toggle-title").click(function(){
		if( $(this).hasClass('active') ){
			$(this).removeClass("active").closest('.toggle').find('.toggle-inner').slideUp(200);
		}
		else{	$(this).addClass("active").closest('.toggle').find('.toggle-inner').slideDown(200);
		}
	});	
	
	$('.scroll-to').click(function(e) {
		e.preventDefault();
		var target=$(this).attr('href');
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, 800);
		if($(window).width()<990) {
			$('.navbar-collapse').removeClass('show');
		}
	});	
	
	$('.share-toggle').click(function(e) {
		e.preventDefault();
		$(this).next('.share-buttons').toggleClass('active');
	});		
});

function sameHeight(item){
	var maxHeight = 0;
	$(item).each(function(){
	   if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
	});
	$(item).height(maxHeight);
}
$(window).scroll(function () {
    if ($(document).scrollTop() < 150) {
        $('.navbar').removeClass('shrinky');
    } else {
        $('.navbar').addClass('shrinky');
    }
});


(function ($, window, document, undefined) {
    'use strict';
    var animationObject;

    function nvsAddAnimation() {
        animationObject.each(function (index, element) {
            var $currentElement = $(element),
			animationType = $currentElement.attr('nvs-animation-type'),
			animationDelay = $currentElement.attr('nvs-animation-delay'),
			animationDuration = $currentElement.attr('nvs-animation-duration');			
			if($(window).width() > 990) {
				if (nvsOnScreen($currentElement)) {
					$currentElement.addClass('vivify ' + animationType + ' delay-' + animationDelay + ' duration-' +animationDuration);
				}
			}
        });
    }

    // takes jQuery(element) a.k.a. $('element')
    function nvsOnScreen(element) {
        // window bottom edge
        var windowBottomEdge = $(window).scrollTop() + $(window).height();

        // element top edge
        var elementTopEdge = element.offset().top;
        var offset = 100;

        // if element is between window's top and bottom edges
        return elementTopEdge + offset <= windowBottomEdge;
    }

    $(window).on('load', function(){
        animationObject = $('[nvs-animation-type]');
		setTimeout(function(){
		  nvsAddAnimation();
		}, 200);		
        
    });

    $(window).on('scroll', function (e) {
        nvsAddAnimation();
    });
}(jQuery, window, document));	