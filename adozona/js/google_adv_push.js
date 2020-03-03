function GAPushAdverticumZoneStatus(zoneId, status) {
	
}

/*ORIGINAL SCRIPT*/
/*function GAPushAdverticumZoneStatus(zoneId, status) {
	setTimeout(function(){
		console.log('GAAdvPush called with ' + zoneId + 'zoneId');
		if (ga) {
			var urlPath = window.location.pathname;
			console.log('zone ' + zoneId + ' data push');
			ga('gtm1.send', {
				hitType: 'event',
				eventCategory: 'adverticum_zone_status',
				eventAction: 'page_load',
				eventLabel: 'zone_id: ' + zoneId + ' | status: ' + status + ' | url_path: ' + urlPath
			});
		}
		else {
			console.log('ga is not defined');
		}
	}, 3000)
}*/