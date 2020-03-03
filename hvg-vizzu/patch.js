function enterFullscreen(element) 
{
	var requestMethod = element.requestFullscreen ||
						element.webkitRequestFullscreen ||
						element.webkitRequestFullScreen ||
						element.mozRequestFullScreen ||
						element.msRequestFullscreen;
	if( requestMethod ) {
		requestMethod.apply( element );
	}
}

function toggleFullscreen() 
{
	let elem = document.documentElement;
	if (!document.fullscreenElement) {
	enterFullscreen(elem).catch(err => {
		alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
	});
	} else {
		document.exitFullscreen();
	}
}
