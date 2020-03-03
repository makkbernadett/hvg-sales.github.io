$(document).ready(function(){

	$(window).load(function(){

		var density = 40,
		speed = 1,
		winHeight = $(window).innerHeight(),
		winWidth = $(window).innerWidth(),
		start = {yMin:-250, yMax:-250, xMin:-250, xMax:winWidth+250, scaleMin:0.2, scaleMax:1, opacityMin:1, opacityMax:1},
		init = {yMin:-250, yMax:winHeight, xMin:-50, xMax:winWidth+50, scaleMin:0.2, scaleMax:1, opacityMin:1, opacityMax:1},
		end = {yMin:winHeight+250, yMax:winHeight+500, xMin:-50, xMax:winWidth+50, scaleMin:0.2, scaleMax:1, opacityMin:1, opacityMax:1};

		function range(map, prop) {
			var min = map[prop + "Min"],
				max = map[prop + "Max"];
			return min + (max - min) * Math.random();
		}

		function spawn(particle,firstrun) {
			var wholeDuration = (15 / speed) * (0.7 + Math.random() * 0.4),
				delay = wholeDuration * Math.random(),
				partialDuration = (wholeDuration + 1) * (0.3 + Math.random() * 0.4);

			//set the starting values
			
				TweenLite.set(particle, {opacity:range(start, "opacity"), y:range(start, "y"), x:range(start, "x"), scale:range(start, "scale")});
				TweenLite.to(particle, wholeDuration, {delay:delay, y:range(end, "y"), ease:Linear.easeNone});
				TweenLite.to(particle, wholeDuration, {delay:delay,  opacity:1, ease:Linear.easeNone, onComplete:spawn, onCompleteParams:[particle,false]});
			
		}

		$(window).ready(function() {

			for (var i = 0; i < density; i++) {
				var idnum = Math.ceil(Math.random()*6);
				var clone = $('#snowflake-0'+idnum).clone().attr('id', 'snowclone'+i);
				spawn(clone.addClass("snowclone").appendTo($('#snowfall')),true);
			}
		});

	});

});