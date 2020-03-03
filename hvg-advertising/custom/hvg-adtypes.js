$(function () {

	//adtype-zoom-out
	if ($('.adtype-zoom-out').length != 0) {
		var banner = $('.adtype-zoom-out div[id^="zone"]');
		var bannerCenterX = banner.offset().left + banner.width() / 2;
		var bannerCenterY = banner.offset().top + banner.height() / 2;
		var site = $('.perspective-wrapper');

		console.log('bannerCenterX ' + bannerCenterX);
		console.log('bannerCenterY ' + bannerCenterY);


		site.addClass('site-zoom-in');
		site.css({
			'-moz-transform-origin': bannerCenterX + "px " + bannerCenterY + "px",
			'transform-origin': bannerCenterX + "px " + bannerCenterY + "px",
			'-ms-transform-origin': bannerCenterX + "px " + bannerCenterY + "px",
			'-webkit-transform-origin': bannerCenterX + "px " + bannerCenterY + "px",
		});

		banner.hover(
			function () {
				site.addClass('site-zoom-out');
				$(this).addClass('banner-zoom-in');
			},
			function () {
				site.removeClass('site-zoom-out');
				$(this).removeClass('banner-zoom-in');
			}
		)
	}



	// adtype-strech-tv

	if ($('.adtype-strech-tv').length != 0) {

		var bannerContainer = $('.strech-tv-wrapper').closest('.placeholder-ad');
		var banner = $('.strech-tv-wrapper');

		bannerContainer.css('height', '290');

		banner.hover(
			function () {
				banner.addClass('expand');
			},
			function () {
				banner.removeClass('expand');
			}
		)

		var video = $(".strech-tv-wrapper .ad-video-player");
		var videoElement = video.get(0);

		// Buttons
		var playButton = $(".strech-tv-wrapper .play-pause");
		var muteButton = $(".strech-tv-wrapper .mute-loud");


		// autoplay
		videoElement.play();
		videoElement.muted = true;


		// play/pause button
		playButton.on("click", function () {
			if (videoElement.paused == true) {
				videoElement.play();
				playButton.addClass("pause").removeClass("play");
			} else {
				videoElement.pause();
				playButton.addClass("play").removeClass("pause");
			}
		});

		// mute button
		muteButton.on("click", function () {
			if (videoElement.muted == false) {
				videoElement.muted = true;
				muteButton.addClass("loud").removeClass("mute");
			} else {
				videoElement.muted = false;
				muteButton.addClass("mute").removeClass("loud");
			}
		});
		//}
		// video vége


	}

	// MULTIPANEL

	if ($('.adtype-multipanel').length != 0) {
		$('.adtype-multipanel').each(function () {

			var multipanelVideo = $(this).find('.ad-video-player');
			var multipanelVideoElement = multipanelVideo.get(0);

			$('.adtype-multipanel .panel-parent .expand-button').on("click", function () {
				$(this).parents().removeClass('current');
				$(this).parents().next().addClass('opened current');
			})

			$('.adtype-multipanel .panel-parent .close-button').on("click", function () {
				$(this).parents().removeClass('opened current');
				$(this).parents().prev().addClass('current');
			})

			$('.adtype-multipanel .expand-button').on("click", function () {
				if ($('.adtype-multipanel-wrapper .panel-parent:nth-of-type(2)').hasClass('opened')) {
					multipanelVideoElement.play();
				}
				else {
					multipanelVideoElement.pause();
				}
			});

			// Buttons
			var multipanelPlayButton = $(".adtype-multipanel .play-pause");
			var multipanelMuteButton = $(".adtype-multipanel .mute-loud");


			multipanelVideoElement.muted = true;


			// play/pause button
			multipanelPlayButton.on("click", function () {
				if (multipanelVideoElement.paused == true) {
					multipanelVideoElement.play();
					multipanelPlayButton.addClass("pause").removeClass("play");
				} else {
					multipanelVideoElement.pause();
					multipanelPlayButton.addClass("play").removeClass("pause");
				}
			});

			// mute button
			multipanelMuteButton.on("click", function () {
				if (multipanelVideoElement.muted == false) {
					multipanelVideoElement.muted = true;
					multipanelMuteButton.addClass("loud").removeClass("mute");
				} else {
					multipanelVideoElement.muted = false;
					multipanelMuteButton.addClass("mute").removeClass("loud");
				}
			});

		});
	}
});
