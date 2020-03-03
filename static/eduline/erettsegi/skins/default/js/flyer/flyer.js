var cookieName = "FlH";
var whereFlyIn = 0.5;
var upprev_closed = false;
var imgUrl; /* = "http://ghu.hit.gemius.pl/redot.gif?id=ByCQa2cBGwnwpGEN.Mi58oaArfGpEc_SeY5NbbJdRqj.s7/stparam=zgdrholrpp";*/

function getScrollY() {
    scrOfY = 0;
    if( typeof( window.pageYOffset ) == "number" ) {
        scrOfY = window.pageYOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        scrOfY = document.body.scrollTop;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        scrOfY = document.documentElement.scrollTop;
    }
    return scrOfY;
}

$(document).ready(function($) {
    var upprev_hidden = true;
    if ($.cookie(cookieName)) {
        upprev_closed = true;
    }

    $(window).scroll(function() {
        var lastScreen = getScrollY() + $(window).height() < $(document).height() * whereFlyIn ? false : true;
        if (lastScreen && !upprev_closed) {
            $("#upprev_box").stop().animate({ right: "0px" });
            if (upprev_hidden && imgUrl) {
                var tmp = Math.floor(Math.random() * 1000000000);
                $("#upprev_box").prepend('<img id="flyerAV" src="' + imgUrl + '&amp;' + tmp + '" border="0" />');
            }
            upprev_hidden = false;
        }
        /*else if (upprev_closed && getScrollY() == 0) {
        upprev_closed = false;
        }*/
        else if (!upprev_hidden) {
            upprev_hidden = true;
            $("#upprev_box").stop().animate({ right: "-400px" });
            $("#upprev_box img#flyerAV").remove();
        }
    });
    $("#upprev_close").click(function() {
        $("#upprev_box").stop().animate({ right: "-400px" });
        upprev_closed = true;
        upprev_hidden = true;
        $.cookie(cookieName, "no", { expires: 1, path: '/' }); // Sample 2
    });
});