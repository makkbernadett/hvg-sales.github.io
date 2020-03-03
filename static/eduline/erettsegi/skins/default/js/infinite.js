//var whereFlyIn = 0.9;
var staticCounterInfintite = 3;
var loadCounter = staticCounterInfintite;
var ajaxUrl = "/ajax/infinite/"
var ajaxWorking = false;
//var moreBtnHtml = '<div id="moreBtn" class="pager flex"><div class="prev flexbox"><a href="javascript:void();"><span>Tovább »</span></a><div class="clearfix"></div></div></div>';
//var moreBtnHtml = '<div class="pager flex" id="moreBtn"><div class="prev flexbox"><a href="javascript:void();"><span>Tovább »</span></a></div><div class="clearfix"></div></div><div class="clearfix"></div></div>';
var moreBtnHtml = '<a id="moreBtn" class="button loadmore" href="javascript:void();">További cikkek betöltése</a>';

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

function doRequest() {
    if ($("#lastArticleId").length == 1) {
        var tmpUrl = ajaxUrl + $("#lastArticleId").val() + "/5";
        $.ajax({
            type: "GET",
            url: tmpUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "HTML",
            beforeSend: function (xhr) {
                $("#postlist").append('<div class="loader"></div>');
                $("#lastArticleId").remove();
                $("#moreBtn").remove();
            },
            error: function (msg) {
                $("#postlist .loader").replaceWith('<div class="ajaxError">Hiba történt a kommunikáció folyamán.<div>');
                $("#postlist .ajaxError").fadeOut(500).fadeIn(500);
            },
            success: function (data) {
                $("#postlist .loader").replaceWith($(data).html());
                if ($(".post", data).length > 0) {                    
                if (loadCounter == 0) {
                    $("#postlist").append(moreBtnHtml);
                    $("#moreBtn").click(function () {
                        doRequest();
                    });
                }
                $('img[data-href]').asynchImageLoader({ effect: "fadeIn", speed: 1600 });
                }
                ajaxWorking = false;
            }
        });
    }
    else {
        $("#postlist").append('<div class="ajaxError">Nincs több megjeleníthető cikk.<div>');
        $("#postlist .ajaxError").fadeOut(500).fadeIn(500);
    }
}

$(document).ready(function ($) {
    $(window).scroll(function () {
        //var lastScreen = getScrollY() + $(window).height() < $(document).height() * whereFlyIn ? false : true;
        var lastScreen = getScrollY() + $(window).height() < $(document).height() - 10 ? false : true;
        if (lastScreen && loadCounter > 0 && !ajaxWorking) {

            ajaxWorking = true;
            //            var tmpUrl = ajaxUrl + (staticCounterInfintite + 4 - loadCounter) + "/5";
            loadCounter--;

            //alert("tmpUrl: " + tmpUrl);

            //tmpUrl = "http://alma.cooom/bad.request.aspx/kuka"           

            doRequest();

            /*$.get(tmpUrl, function (data) {
            //$("#postlist").end().append(data);
            $("#postlist").append(data);
            ajaxWorking = false;
            }, 'html');*/

            //alert("loadCounter: " + loadCounter);
        }
    });

    $("#upprev_close").click(function () {
        $("#upprev_box").stop().animate({ right: "-400px" });
        upprev_closed = true;
        upprev_hidden = true;
        $.cookie(cookieName, "no", { expires: 1, path: '/' }); // Sample 2
    });

});