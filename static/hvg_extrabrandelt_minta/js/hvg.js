var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;

$(document).ready(function (){
	
	
	if(!isMobile && $(window).width()>800){
		$('.video-holder').append('<video class="hero-video"  id="bgvid" playsinline autoplay muted loop><source src="images/video.mp4" type="video/mp4"></video>');
		var video = $(document).find('#bgvid')[0];
		video.load();

		$('.video-holder').fadeTo('slow',1);
	}
	
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
		$('.navbar a').removeClass('active');
		$(this).addClass('active');
		var target=$(this).attr('href');
		$('html, body').animate({
			scrollTop: $(target).offset().top-$('.navbar').height()
		}, 800);
		if($(window).width()<990) {
			$('.navbar-collapse').removeClass('show');
		}
	});	
	
	$('.share-toggle').click(function(e) {
		e.preventDefault();
		$(this).next('.share-buttons').toggleClass('active');
	});	

	/*masonry*/
	if($('.grid-gallery').length){	
		var photoGalleryCarousel = [];
		var loadedGallery=false;
		$(".grid").each(function(index, value) {
			
			$(this).masonry({
				itemSelector: '.grid-item',
				columnWidth: '.grid-sizer',
				percentPosition: true
			})
		});

		$(".grid-gallery .grid-item").each(function(index, value) {
			var img=$(this).attr('data-src');
			$(this).css({'background-image':'url('+img+')'}).append('<a href="'+img+'" class="lightbox photo-link" data-target="'+index+'"></a>');
			photoGalleryCarousel.push(img);
		});
		$('.lightbox').click(function(e) {
			e.preventDefault();
				var title = $(this).attr('title');
				var src = $(this).attr("href");
				// Change the line above to modify the src according to your naming convention for larger images. 
				// You could even change it to source a data attrib ;)
				var targetIndex=$(this).attr('data-target');console.log(targetIndex);
				if(loadedGallery==false){
					var galleryCarousel='<div class="photo-gallery-outer"><div class="close-photo-gallery"><button type="button" class="close white" aria-label="Close">  <span aria-hidden="true">&times;</span></button></div><div id="photoGallery" class="carousel slide" data-interval="false">  <div class="carousel-inner">  ';
					$.each( photoGalleryCarousel, function( index, value ){
						galleryCarousel += '<div class="carousel-item"><img src="'+value+'" /></div>';
					});
					galleryCarousel += '</div>';
					galleryCarousel += '  <a class="carousel-control-prev" href="#photoGallery" role="button" data-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="carousel-control-next" href="#photoGallery" role="button" data-slide="next"> <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="sr-only">Next</span> </a></div> </div>';
					$('body').append(galleryCarousel);
					$('#photoGallery').carousel();
					$('#photoGallery .carousel-item').removeClass('active').eq(targetIndex).addClass('active');
					$('.photo-gallery-outer').addClass('fadeInCarousel');
					loadedGallery=true;
				} else {
					$('#photoGallery .carousel-item').removeClass('active').eq(targetIndex).addClass('active');
					$('.photo-gallery-outer').addClass('fadeInCarousel').fadeIn();					
				}
				$('#photoGallery').carousel({
					interval: 5000
				}).on('slide.bs.carousel', function (e) {
					var nextH = $(e.relatedTarget).height();
					$(this).find('.active').parent().animate({ height: nextH }, 500);
				});
				/*var alt = $(this).children('img').attr("alt") || "";
				var $img = $('<img class="center-block img-responsive" alt="' + alt + '" src="' + src + '">');
				$('.modal-title').html(title);
				$('.modal-body').html('<p>Loading...</p>');
				$('#lightbox').modal({
						show: true
				});
				$img.on('load',function() {
					$('.modal-body').html($img);
				});*/
		});
		$(document).on('click','.close-photo-gallery', function(e) { 
			$('.photo-gallery-outer').removeClass('fadeInCarousel').fadeOut();		
		});
	}
	
	carouselNormalization('#hvgSubsidiariesCarousel .carousel-item ');
	carouselNormalization('#quote-carousel .carousel-item ');
	$('body').scrollspy({ target: '#site-nav' });
	
	const blockquoteItemsCount = $('.blockqoute_items .blockquote_item_holder').length;
	const blockqouteItemWidth = $('.blockqoute_items .blockquote_item_holder').width();
	console.log(blockquoteItemsCount);
	let blockquoteTempCount=0;
	$('.blockqoute_items .blockquote_item_holder').each(function(){
		$(this).addClass('blockquote_item_'+blockquoteTempCount);
		blockquoteTempCount++;
	});
	blockquoteTempCount = 0;
	if($(window).width()<768){
		var blockquoteItemToHide = '2';
	} else if($(window).width()<990){
		var blockquoteItemToHide = '3';

	} else {
		var blockquoteItemToHide = '4';
	}
console.log('tohide'+blockquoteItemToHide);
	$('.blockquote_item_holder').slice((blockquoteItemToHide-1),blockquoteItemsCount).find('.blockquote-item').css({'opacity':'0'});

	$('.blockqoute_nav .previous').on('click', function () {
		var thisBTN = $(this);
		thisBTN.addClass('disabled');
		$('.blockqoute_items').css({'left':-1 * blockqouteItemWidth + 'px'}); 
		$('.blockquote_item_holder:first').before($('.blockquote_item_holder:last'));
		$('.blockqoute_items').addClass('transition').css({'transform':'translateX('+blockqouteItemWidth + 'px)'}); 
		$('.blockquote_item_holder:first .blockquote-item').css({'opacity':'0'}).animate({opacity:'1'},100);
		$('.blockquote_item_holder:nth-child('+blockquoteItemToHide+') .blockquote-item').css({'opacity':'1'}).animate({opacity:'0'},100);
		setTimeout(function(){
			$('.blockqoute_items').removeClass('transition')
			$('.blockqoute_items').removeAttr("style");
			$('.blockquote_item_holder .blockquote-item').removeClass('transition');
			thisBTN.removeClass('disabled');
		},700); 
	});
	$('.blockqoute_nav .next').on('click', function (e) {
		var thisBTN = $(this);
		thisBTN.addClass('disabled');
		$('.blockqoute_items').addClass('transition').css({'transform':'translateX(' + (-1 * blockqouteItemWidth) + 'px)'}); 
		$('.blockquote_item_holder:first .blockquote-item').addClass('transition').css({'opacity':'0'});
		$('.blockquote_item_holder:nth-child('+blockquoteItemToHide+') .blockquote-item').css({'opacity':'0'}).animate({opacity:'1'},100);
		setTimeout(function(){
			$('.blockquote_item_holder:last').after($('.blockquote_item_holder:first'));
			$('.blockqoute_items').removeClass('transition')
			$('.blockqoute_items').css('transform','translateX(0px)'); 
			$('.blockquote_item_holder .blockquote-item').removeClass('transition');
			$('.blockquote_item_holder').slice(3,blockquoteItemsCount).find('.blockquote-item').css({'opacity':'0'});
			thisBTN.removeClass('disabled');
		},700)		
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
        //$('.navbar').removeClass('shrinky');
    } else {
        //$('.navbar').addClass('shrinky');
    }
});


(function ($, window, document, undefined) {
    'use strict';
    var animationObject;

    function nvsAddAnimation() {
		if(animationObject){
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

function carouselNormalization(item) {
	
	window.heights = [], 
	window.tallest; 
	
	function normalizeHeights() {
		jQuery(item).each(function() { 
			window.heights.push(jQuery(this).innerHeight());
		});
		window.tallest = Math.max.apply(null, window.heights); 
		jQuery(item).each(function() {
			jQuery('.row',this).css('min-height',tallest + 'px');
		});
	}
	normalizeHeights();

	jQuery(window).on('resize orientationchange', function () {
		
		window.tallest = 0, window.heights.length = 0; 
		jQuery(item).each(function() {
			jQuery('.row',this).css('min-height','0'); 
		}); 
		
		normalizeHeights(); 

	});
	
}


$(document).ready(function(){
	var imagesHtmlContent = '';
  var coversArray = [
		['1979',29]
	];
	var k;
	var z = 0;
	createCovers(z);
	var yearSelectorWrapper='';
	var activeYearClass='';
	for (var l=0;l<coversArray.length;l++){
		l==z ?  activeYearClass="active" :  activeYearClass='';		
		yearSelectorWrapper +=`<span class="${activeYearClass}" data-id="${l}" >${coversArray[l][0]}</span>`;
		
	}

	//$('.year-selector-wrapper').append(yearSelectorWrapper);

  



  
	$('.year-selector-wrapper span').on('click',function(){
		console.log($(this).data('id'));
		hideAndShowCovers($(this).data('id'));
	});
  
	var checkExist = setInterval(function() {
	   if ($('.swiper-slide-active').outerHeight()>50) {
			$('.swiper_container').css({'height':($('.swiper-slide-active').outerHeight()*1.5 + $('.swiper-slide-active .description').outerHeight())+'px'});
			clearInterval(checkExist);
	   }
	}, 100);   
	var swiper_slider;
	function createCovers(id){
		/*for(var i=0;i<coversArray[id][1];i++){
			i<10 ? k='0'+i : k = i;		
			//imagesHtmlContent += `<a href="#" class='swiper-slide'><img src="images/covers/${coversArray[id][0]}/thumbs/${coversArray[id][0]}_${k}.jpg" alt="" /><div class="description"><span>${coversArray[id][0]} - ${i}. hét</span></div></a>`;
			imagesHtmlContent += `<a href="#" class='swiper-slide'><img src="images/covers/${coversArray[id][0]}/thumbs/${coversArray[id][0]}_${k}.jpg" alt="" /><div class="description"><span>${coversArray[id][0]} - ${i}. hét</span></div></a>`;
		}*/
		for(var i=1979;i<2019;i++){
			
			//imagesHtmlContent += `<a href="#" class='swiper-slide'><img src="images/covers/${coversArray[id][0]}/thumbs/${coversArray[id][0]}_${k}.jpg" alt="" /><div class="description"><span>${coversArray[id][0]} - ${i}. hét</span></div></a>`;
			imagesHtmlContent += `<a href="#" class='swiper-slide'><img src="content/covers/${i}.jpg" alt="" /><div class="description"><span>${i}</span></div></a>`;
		}		
			$('.swiper-wrapper').append(imagesHtmlContent);
			if($(window).width()>768){
				var slidesPerViewNum = 4;
			}else if($(window).width()<=768 && $(window).width()>480) {
				var slidesPerViewNum = 3;	
			} else {
				var slidesPerViewNum = 2;	
			}
			if(swiper_slider) swiper_slider.destroy();
			swiper_slider = new Swiper('.slider_wrapper', {
				prevButton: '.slider_nav.prev',
				nextButton: '.slider_nav.next',
				slidesPerView: slidesPerViewNum,
				initialSlide: 0, 
				centeredSlides: true,
				effect: 'coverflow',
				slidesOffsetBefore: 0,
				speed: 800,
				coverflowEffect: {
					rotate: 10,
					depth: 100,
					slideShadows: false,
				},	
				keyboard: {
					enabled: true,
					onlyInViewport: false,
				},  

				pagination: {
					el: '.swiper-pagination',
					type: 'progressbar',
				},  

				simulateTouch: true,
				on:{
					init: function(){
						checkExist;
						console.log('loaded');
						//$('.slider_wrapper').addClass('fadeInCovers');
					},
					slideChange: function(){
						console.log($('.swiper-slide-active').outerHeight());
					},		
				}
			});		
		  
			var nb_slides = swiper_slider.params.slidesPerView;
			//swiper_slider.slideTo(Math.floor(nb_slides / 2));
			//swiper_slider.slideTo(0);
			$('.swiper-wrapper a').on('click', function(e){
				e.preventDefault();
				console.log($(this).index());
				swiper_slider.slideTo($(this).index());
				return false;
			});	
			
		
	}	
	
	function hideAndShowCovers(id){
		$('.year-selector-wrapper span').removeClass('active');
		$(`span[data-id="${id}"]`).addClass('active');
		$('.slider_wrapper').removeClass('fadeInCovers').addClass('fadeOutCovers').on('animationend',function(e){
			$('.swiper-wrapper').html('');
			swiper_slider.destroy()
			imagesHtmlContent = '';
			this.classList.remove('fadeOutCovers');	
			createCovers(id);
		});
		
		
	}
		


});