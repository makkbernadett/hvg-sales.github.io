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
        if($('#mainNav').length) $("#mainNav").offset().top > 100 ? $("#mainNav").addClass("navbar-shrink") : $("#mainNav").removeClass("navbar-shrink")
    });
    /*data-background-src*/
    $("[data-background-src]").each(function() {
        var attr = $(this).attr('data-background-src');
        if (typeof attr !== typeof undefined && attr !== false) {
            $(this).css('background-image', 'url(' + attr + ')');
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
			$(hero +' .hero-content .hero-content-inner').css({
			   transform: 'translateY(' + (+scroll/5) + '%)',// scale('+(scroll/2500+1)+')',
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
    //$(window).on('load',function () {		
		setTimeout(function(){
		 nvsAddAnimation(animationObject);
		}, 10);		

        
    //});
	var progressLoaded=false;
	var countStarted = false;	
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
    });		

	/*carousel set same heights*/
	if(('.carousel').length){
		$('.carousel').each( function( index, element ){
			carouselNormalization($(this)); 
			carouselIndicators($(this));
		});
	}
	
	/*for wfkit*/
    $('.fluid-selector-block input[type="checkbox"].width').click(function() {
    
		if($(this).is(":checked")){
			$('.container-fluid:not(.stay-fluid)').css({'max-width':'1250px'});
		} else {
			$('.container-fluid').css({'max-width':'100%'});
		}
 
    });	
    $('.fluid-selector-block input[type="checkbox"].color').click(function() {
    
		if($(this).is(":checked")){
			$('body').css({'background-color':'#343434','color':'#ffffff'});
		} else {
			$('body').css({'background-color':'#e8e8e8','color':'#898989'});
		}
 
    });
	
	/*wfkit show more job hack*/
	$('.show-more-jobs').click(function(e){
		e.preventDefault();
		var target=$(this).data('target');
		var count = $('.count-item span',this).text();
		$('#'+target).clone().insertBefore($(this)).addClass('vivify fadeIn').attr('id','clonedItem');
		
	});
		
}(jQuery);

/*load script*/
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

/*carousel height normalization - set same height items*/
function carouselNormalization(carousel) {
	var items = carousel.find('.carousel-item'), //grab all slides
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
