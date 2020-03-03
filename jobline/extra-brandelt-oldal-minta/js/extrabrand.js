! function($) {
    "use strict";
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var e = $(this.hash);
            if ((e = e.length ? e : $("[name=" + this.hash.slice(1) + "]")).length) {
                return $('html, body').animate({
                    scrollTop: e.offset().top - 48
                }, 500);
                /*$("html, body").animate({
                	scrollTop: e.offset().top - 48
                }, 1e3, "ease-in-out"), !1*/
            }
        }
    });
    $(".js-scroll-trigger").click(function() {
        $(".navbar-collapse").collapse("hide")
    });
    $("body").scrollspy({
        target: "#mainNav",
        offset: 48
    });
    $(window).scroll(function() {
        $("#mainNav").offset().top > 100 ? $("#mainNav").addClass("navbar-shrink") : $("#mainNav").removeClass("navbar-shrink")
    });
    /*data-background-src*/
    $("[data-background-src]").each(function() {
        var attr = $(this).attr('data-background-src');
        if (typeof attr !== typeof undefined && attr !== false) {
            $(this).css('background-image', 'url(' + attr + ')');
        }
		if($(window).width()<992 && $(this).hasClass('bg-to-img-md')){
			$(this).css({'background-image':'none'}).append('<img src="'+attr+'" class="bg-img pt-3 pb-0 mb-0" />');
		}
	});
	
	/*animated hero effect*/
	if($('.hero').length && $('.hero').hasClass('hero-animated')){
		var hero = '.hero';
		var heroBG = $(hero).attr('data-background-src');
		$(hero).append('<div class="zoom" style="background-image:url('+heroBG+');"></div>').css({'background-image':'none','background-color':'#343434'});
		var scroll = $(window).scrollTop();
	   $(".zoom").css({
		   backgroundSize: (100 + scroll / 20) + "%"/*,
		   top: -(scroll / 10) + "%"*/
	   }); 
	   var pxlCount=0;
	   $(window).scroll(function() {
			var scroll = $(window).scrollTop();
			pxlCount = $(document).scrollTop()/50;

			var op = (($('.zoom').height() - scroll*1.75) / $('.zoom').height()).toFixed(5);
						console.log((1-op)/2);
			if(op>0) {
				$(hero +' .hero-content .hero-content-inner').css({
				   transform: 'translateY(' + (+scroll/10) + '%)',// scale('+(scroll/2500+1)+')',
				   /*top: 50 + (scroll / 10) + "%",*/
				   opacity: op,
				   /*"-webkit-filter": "blur(" + (scroll / 200) + "px)",
				   filter: "blur(" + (scroll / 200) + "px)",*/
				});
				$(".zoom").css({
					'transform': 'scale('+((1-op)/2+1)+')',
				   /*backgroundSize: (100 + scroll / 20) + "%",*/
				   /*top: -(scroll / 20) + "%",*/
				   top: (scroll / 10) + "%",
				   opacity: op,
				   /*"-webkit-filter": "blur("+pxlCount+"px)","-moz-filter": "blur("+pxlCount+"px)","filter": "blur("+pxlCount+"px)"*/
				   /*"-webkit-filter": "blur(" + (scroll / 200) + "px)",
				   filter: "blur(" + (scroll / 200) + "px)"*/
				});	
			}
	   });
	}
	/*carousel swipe*/
	$(".carousel").swipe({
		swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'left') $(this).carousel('next');
			if (direction == 'right') $(this).carousel('prev');
		},
		allowPageScroll: "vertical"
	});
	if(('.carousel').length){
		$('.carousel').each( function( index, element ){
			carouselNormalization($(this)); 
			carouselIndicators($(this));
		});
	}	
   $('#slider-thumbs  a').click( function(){
		var id = $(this).attr('data-slide-to');
		var id = parseInt(id);
		$('.carousel').carousel(id);
	});

	// When the carousel slides, auto update the text
	$('.carousel').on('slide.bs.carousel', function (e) {
		var id= $(".active", e.target).index();
		 $('#slider-thumbs  div').removeClass('active').eq(id).addClass('active');
			
	});
	/*multiple-carousel*/
	if ($('.carousel-multiple').length) {
		$('.carousel-multiple').on('slide.bs.carousel', function(e) {

			var $e = $(e.relatedTarget);
			var idx = $e.index();
			var itemsPerSlide = 3;
			var totalItems = $('.carousel-item').length;

			if (idx >= totalItems - (itemsPerSlide - 1)) {
				var it = itemsPerSlide - (totalItems - idx);
				for (var i = 0; i < it; i++) {
					// append slides to end
					if (e.direction == "left") {
						$('.carousel-item').eq(i).appendTo('.carousel-inner');
					} else {
						$('.carousel-item').eq(0).appendTo('.carousel-inner');
					}
				}
			}
		});
	}


	/*not working on localhost*/
	/*if($('.carousel').length){			
		onDemandScript( "js/jquery.touchSwipe.min.js" ).done(function( script, textStatus ) {
		  console.log( textStatus );
		});	
	}*/

	/*btn ripple effect*/
	$('.btn').on('click', function (event) {
		//event.preventDefault(); 
		$(this).addClass('ripple');
		var $div = $('<div/>'),
		btnOffset = $(this).offset(),
			xPos = event.pageX - btnOffset.left,
			yPos = event.pageY - btnOffset.top;
		$div.addClass('ripple-effect');
		var $ripple = $(".ripple-effect");      
		$ripple.css("height", $(this).height());
		$ripple.css("width", $(this).height());
		$div.css({
				top: yPos - ($ripple.height()/2),
				left: xPos - ($ripple.width()/2),
				background: $(this).data("ripple-color")
			}) 
			.appendTo($(this));
		window.setTimeout(function(){
		$div.remove();
		}, 2000);
	});	

	/*reveal animation when on screen*/
    var animationObject=$('[nvs-animation-type]');
    $(window).on('load',function () {	
		if($(window).width()>768) {
			setTimeout(function(){
			 nvsAddAnimation(animationObject);
			}, 0);		
		}
        
    });
	var progressLoaded=false;
	var countStarted = false;
	var circleProgressLoaded=false;	
    $(window).on('scroll', function (e) {
		if($(window).width()>768) {
			nvsAddAnimation(animationObject);
		}
		
		if ($('.progress-wrapper').length && nvsOnScreen($('.progress-wrapper'))) {

			if(progressLoaded==false) {
				moveProgressBar();
				progressLoaded=true;
			}
		}
		if ($('.gauge-cont').length && nvsOnScreen($('.gauge-cont'))) {
			runAllGauges();
		}		
		if($('.tag-cloud').length && nvsOnScreen($('.tag-cloud'))){
			var tagDelay=100;
			$('.tag-cloud .tag').each(function() {	
				$(this).addClass('vivify popIn delay-'+tagDelay);
				tagDelay+=50;
			});
		}	

		if ($('.counter-block').length && nvsOnScreen($('.counter-block'))) {
			if(countStarted==false) {
				$('.counter-block .timer').each(count);  
				countStarted=true;				
			}

		}	
		/*circle animation progress*/
		if($('.circleProgress').length && nvsOnScreen($('.circleProgress'))){
			
			if(circleProgressLoaded==false) {
				$('.circleProgress').each(function() {
					runCircleProgress($(this));
					circleProgressLoaded=true;
				});
			}
		}			
    });	
	
	/*masonry*/
	if($('.grid-gallery').length){	
		var photoGalleryCarousel = [];
		var loadedGallery=false;
		$('.grid').masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			percentPosition: true
		})
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
	/*if($('.mason-container').length){
			//var photos=["content/gallery/test_1.jpg", "content/gallery/test_2.jpg", "content/gallery/test_3.jpg", "content/gallery/test_4.jpg", "content/gallery/test_5.jpg", "content/gallery/test_6.jpg", "content/gallery/test_7.jpg", "content/gallery/test_8.jpg", "content/gallery/test_9.jpg", "content/gallery/test_10.jpg", "content/gallery/test_11.jpg", "content/gallery/test_12.jpg"];
		var photos = [];
		var item;
	   $(".mason-container img").each(function() {

			var src = $(this).attr("src");
			var width = $(this).width();
			var height = $(this).height();

			item = {}
			item ['width'] = width;
			item ['height'] = height;		
			item ['url'] = src;


			photos.push(item);
		});

		console.log(photos);


	}*/
	
	/*tag random style*/
	if($('.tag-cloud').length){
		$('.tag-cloud .tag').each(function() {	
			var addStyle=pickColor();
			$(this).css({'background-color': addStyle[0],'font-size': addStyle[1]});
		});
	}
	
	/*half third grid height hack*/
	if($('.grid-half-third').length && $(window).width()>768){
		var gH1 = $('.grid-half-third .grid-full-h').outerHeight();
		var gH2 = $('.grid-half-third .grid-half-h .grid-box:first-of-type').outerHeight() + $('.grid-half-third .grid-half-h .grid-box:last-of-type').outerHeight() + 10;
		console.log(gH1 + ' - '+ gH2);
		if(gH1>gH2) {
			var diff = (gH1)/2;
			$('.grid-half-third .grid-half-h .grid-box').css({'height': diff+'px'});
		}
	}
	
	/*horizontal scrolling*/

	/*carousel set slide heights*/
	if($('.carousel').length){
		$('.carousel').each(function() {
			carouselNormalization();
		});
	}
	

	

}(jQuery);

/* load script */
function onDemandScript ( url, callback ) {
    callback = (typeof callback != 'undefined') ? callback : {};

    $.ajax({
         type: "GET",
         url: url,
         success: callback,
         dataType: "script",
         cache: true
     });    
}

/*add animation dynamic */
function nvsAddAnimation(animationObject) {
	animationObject.each(function (index, element) {
		var $currentElement = $(element);
		if($currentElement.attr('nvs-animation-type')) {
			var	animationType = $currentElement.attr('nvs-animation-type');
		} else {
			var	animationType = '';
		}
		if($currentElement.attr('nvs-animation-delay')) {
			var	animationDelay = $currentElement.attr('nvs-animation-delay');
		} else {
			var	animationDelay ='';
		}
		if($currentElement.attr('nvs-animation-duration')) {
			var	animationDuration = $currentElement.attr('nvs-animation-duration');
		} else {
			var	animationDuration = '';
		}	
		if (nvsOnScreen($currentElement)) {
			$currentElement.addClass('vivify ' + animationType + ' delay-' + animationDelay + ' duration-' +animationDuration);
		}
	});
}

/* is element on screen */
function nvsOnScreen(element) {
	// window bottom edge
	var windowBottomEdge = $(window).scrollTop() + $(window).height();
	// element top edge
	var elementTopEdge = element.offset().top;
	var offset = 100;
	// if element is between window's top and bottom edges
	return elementTopEdge + offset <= windowBottomEdge;
}

/*horizontal progress bar animation */
function moveProgressBar() {
	var getPercent = ($('.progress-wrap').data('progress-percent') / 100);
	var getProgressWrapWidth = $('.progress-wrap').width();
	var progressTotal = getPercent * getProgressWrapWidth;
	var animationLength = 2500;

	// on page load, animate percentage bar to data percentage length
	// .stop() used to prevent animation queueing
	$('.progress-bar').stop().animate({
		left: progressTotal
	}, animationLength);
	

    $({ Counter: 0 }).stop().animate({ Counter: $('.progress-wrap').data('progress-percent') }, {
        duration: animationLength,
        easing: 'swing',
        step: function () {
            $('.progress-number').text(Math.ceil(this.Counter)+'%').css({'left':Math.ceil(this.Counter)+'%'});
        }
    });
	
	/*$({ Counter: 0}).stop().animate({ Counter: $('.progress-number').text() }, {
    duration: animationLength,
    step: function () {
      $('.progress-number').text(Math.ceil(this.Counter.toFixed(2)));console.log(this.Counter);
    }
  });*/
}

/*gauges*/
function runAllGauges()
{
  var gauges = $('.gauge-cont');
  $.each(gauges, function(i, v){
    var self = this;
		setTimeout(function(){
        setGauge(self);
    },i * 700);
  });
}

function resetAllGauges()
{
  var gauges = $('.gauge-cont').get().reverse();
  $.each(gauges, function(i, v){
    var self = this;
		setTimeout(function(){
        resetGauge(self);
    },i * 700);
  });
}

function resetGauge(gauge)
{
  var spinner = $(gauge).find('.spinner');
  var pointer = $(gauge).find('.pointer');
  $(spinner).attr({
    style: 'transform: rotate(0deg)'
  });
  $(pointer).attr({
    style: 'transform: rotate(-90deg)'
  });
}

function setGauge(gauge)
{
  var percentage = $(gauge).data('percentage') / 100;
  var degrees = 180 * percentage;
  var pointerDegrees = degrees - 90;
  var spinner = $(gauge).find('.spinner');
  var pointer = $(gauge).find('.pointer');
  $(spinner).attr({
    style: 'transform: rotate(' + degrees + 'deg)'
  });
  $(pointer).attr({
    style: 'transform: rotate(' + pointerDegrees + 'deg)'
  });
}

/*random bgcolor and font size*/
function pickColor(){
    var randomStyleArray = [
		['rgba(0,0,0,0)','1.4em'],
		['rgba(0,0,0,0)','1em'],
		['rgba(0,0,0,0)','1.2em'],
		['rgba(0,0,0,0)','1em'],
		['rgba(0,0,0,0)','1.1em'],
		['rgba(0,0,0,0)','1.2em'],
		['rgba(0,0,0,0)','1.3em'],
		['rgba(0,0,0,0)','1.4em'],
		['rgba(0,0,0,0)','1.7em']

	];
    return randomStyleArray[Math.floor(Math.random() * randomStyleArray.length)];
}

/*countto*/
(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));
function count(options) {
var $this = $(this);
options = $.extend({}, options || {}, $this.data('countToOptions') || {});
$this.countTo(options);
}
/*carousel indicators - auto add indicators*/
function carouselIndicators(carousel){
	var indicators = carousel.find(".carousel-indicators");
	var id=carousel.attr('id');
	carousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
		(index === 0) ?
		indicators.append("<li data-target='#"+id+"' data-slide-to='" + index + "' class='active'></li>") :
		indicators.append("<li data-target='#"+id+"' data-slide-to='" + index + "'></li>");
	});
}

/*set each carousel item the same height*/
function carouselNormalization() {
	var items = $('.carousel .carousel-item'), //grab all slides
		heights = [], //create empty array to store height values
		tallest; //create variable to make note of the tallest slide

	if (items.length) {
		function normalizeHeights() {
			items.each(function() { //add heights to array
				heights.push($(this).height()); 
			});
			tallest = Math.max.apply(null, heights); //cache largest value
			items.each(function() {
				$(this).css('min-height',tallest + 'px');
			});
		};
		normalizeHeights();

		$(window).on('resize orientationchange', function () {
			tallest = 0, heights.length = 0; //reset vars
			items.each(function() {
				$(this).css('min-height','0'); //reset min-height
			}); 
			normalizeHeights(); //run it again 
		});
	}
}

/*radial circle animations*/
function runCircleProgress(item){
	console.log(item);
	item.circleProgress({
		value: item.data('number')/100,
		size: 150,
		thickness: 5,
		startAngle: 4.8,
		fill: {
		gradient: ["#fff700", "#ffc800"]
		},
		animation:{
			duration: 2500
		}
	}).on('circle-animation-progress', function(event, progress, stepValue) {
		$(this).find('strong').text(Math.round(stepValue.toFixed(2)*100)+'%');
	});
}