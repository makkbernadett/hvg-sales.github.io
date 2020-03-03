function GAPushUserStatus(isPaid) {

}

/*ORIGINAL SCRIPT*/
/*
function GAPushUserStatus(isPaid) {
	setTimeout(function(){
        if (ga) {
			var size = $(window).width();
			
			ga('gtm1.send', {
				hitType: 'event',
				eventCategory: 'user_status',
				eventAction: 'page_load',
				eventLabel: 'is_paid: ' + isPaid + ' | width: ' + size
			});

			console.log('Adv. zone data pushed to GA');
		}
		else {
			console.log('ga is not defined');
		}
	}, 6000)
}*/