
var notifierIsRunning = false;

$(document).ready(function () {
    //if (generatedAt != undefined)
    //alert('generatedAt: ' + generatedAt);
    if (typeof (generatedAt) != "undefined") {
        $.Notifier();
    }
});

jQuery.Notifier = function () {
    (function ($) {
        var firstUpdateInterval = 600000; /*5000;*/
        var updateInterval = 600000;
        var originalTitle = $(document).attr('title');
        var trid = 0;
        var newitems = null;
        var myTimeout = null;
        var maxElementNumber = 6;

        init = function () {
            myTimeout = setTimeout(this.checkNews, firstUpdateInterval);
            $("#icon_fresh").click(function (e) {
                checkNews();
                //DeleteShowedNews();
            });
            setZeroNotification();
        };

        DeleteShowedNews = function () {
            if (newitems != null && newItemCounter > 0) {
                for (i = 0; i < newitems.length; i++) {
                    newitems[i].url = null;
                }
            }
            $("#icon_fresh").html('');
        };

        setZeroNotification = function () {
            if (!$('#fresh_container #fresh .ZeroNotification') || $('#fresh_container #fresh .ZeroNotification').length == 0) {
                $('#fresh_container #fresh').append("<label id=\"newsUpdate\"></label>");
                //$('#fresh_container #fresh #newsUpdate').html("<div class=\"ZeroNotification\">Jelenleg nincsenek friss értesítések.<" + "/div>");
                var htmlString = "<div class=\"ZeroNotification\">Jelenleg nincsenek friss értesí­tések.";
                htmlString += "</br>A korábbi értesítésekért <a href=\"/ertesitesek\">kattintson ide »</a>"
                htmlString += "</div>";
                $('#fresh_container #fresh #newsUpdate').html(htmlString);
            }
            //$('#latestNotificationNews').html("<div id=\"noNewNotification\">Nincs új cikk....</div>");
        };

        setMoreNotification = function () {
            if (!$('#fresh_container #fresh .ZeroNotification') || $('#fresh_container #fresh .ZeroNotification').length == 0) {
                $('#fresh_container #fresh').append("<label id=\"newsUpdate\" style=\"padding-top: 0px;\"></label>");
                var htmlString = "<div class=\"ZeroNotification\">";
                htmlString += "A korábbi értesítésekért <a href=\"/ertesitesek\">kattintson ide »</a>"
                htmlString += "</div>";
                $('#fresh_container #fresh #newsUpdate').html(htmlString);
            }
        }

        checkNews = function () {
            clearTimeout(myTimeout);
            $.ajax({ type: 'GET',
                //url: '/ajax/notifier.ashx?s=' + encodeURI(generatedAt) + '&trid=' + trid + '&dlimit=' + 120,
                url: '/skins/default/AjaxHandlers/notifier.ashx?s=' + encodeURI(generatedAt) + '&trid=' + trid,
                cache: false,
                success: function (resultObj) {
                    if (!notifierIsRunning) {
                        notifierIsRunning = true;
                        //resultObj = $.evalJSON(result);
                        if (generatedAt == '' && resultObj.trid == trid)
                            generatedAt = resultObj.since;
                        if (resultObj.count > 0 && resultObj.trid == trid) {
                            if (resultObj.articles.length > 0) {
                                var newItemCounter = 0;
                                var isThereAnyNew = false;
                                if (newitems != null) {
                                    for (i = resultObj.articles.length - 1; i >= 0; i--) {
                                        var isTiNewsItems = true;
                                        var upIndex = newitems.length;

                                        for (j = 0; j < upIndex; j++) {
                                            if (newitems[j].id == resultObj.articles[i].id) {
                                                isTiNewsItems = false;
                                                break;
                                            }
                                        }
                                        if (isTiNewsItems) {
                                            for (k = upIndex; k > 0; k--) {
                                                newitems[k] = newitems[k - 1];
                                            }
                                            newitems[0] = resultObj.articles[i];
                                        }

                                        if (isTiNewsItems == true) {
                                            isThereAnyNew = true;
                                        }
                                    }
                                }
                                else {
                                    newitems = resultObj.articles;
                                    isThereAnyNew = true;
                                }

                                //newitems = resultObj.articles;
                                //newItemCounter = resultObj.articles.length;
                                if (newitems.length > maxElementNumber) {
                                    newItemCounter = maxElementNumber;
                                }
                                else
                                    newItemCounter = newitems.length;

                                if (isThereAnyNew) {
                                    $("#icon_fresh").html('<span class="badge" style="display:none;">' + newItemCounter + '</span>');
                                    //$("#icon_fresh").html('<span class="badge">' + resultObj.articles.length + '</span>');
                                    $("#icon_fresh .badge").show(500);
                                }

                                //$('#latestNotificationNews').html("<ul></ul>");
                                //$('#fresh_container #fresh').prepend("<ul></ul>");
                                $('#fresh_container #fresh #newsUpdate').remove();
                                $('#fresh_container #fresh ul').remove();
                                $('#fresh_container #fresh').append("<ul></ul>");
                                if (newitems != null) {
                                    var upIndex = newitems.length;
                                    if (newitems.length > maxElementNumber)
                                        upIndex = maxElementNumber;
                                    for (i = 0; i < upIndex; i++) {
                                        if (newitems[i].url != null) {
                                            var toInsert = "<li id=\"notification-" + newitems[i].id + "\">";
                                            if (i == (upIndex - 1))
                                                toInsert = "<li style=\"border:none; padding-bottom:0;\" id=\"notification-" + newitems[i].id + "\">";
                                            toInsert += "<a href=\"" + newitems[i].url + "\""
                                            if (newitems[i].isOwnSite == "True")
                                                toInsert += " class=\"own\"";
                                            toInsert += ">";
                                            if (newitems[i].isOwnSite == "False") {
                                                var displayName = newitems[i].siteDomain;
                                                switch (displayName) {
                                                    case "automenedzser.hu":
                                                        displayName = "Autómenedzser.hu";
                                                        break;
                                                    case "ecoline.hu":
                                                        displayName = "Ecoline.hu";
                                                        break;
                                                    case "eduline.hu":
                                                        displayName = "Eduline.hu";
                                                        break;
                                                    case "ingatlanmenedzser.hu":
                                                        displayName = "Ingatlanmenedzser.hu";
                                                        break;
                                                    case "hirszerzo.hu":
                                                        displayName = "Hírszerző.hu";
                                                        break;
                                                    case "life-style.hu":
                                                        displayName = "Life-style.hu";
                                                        break;
                                                    case "techline.hu":
                                                        displayName = "Techline.hu";
                                                        break;
                                                }

                                                toInsert += displayName + ": ";
                                            }
                                            toInsert += newitems[i].title + " »</a>";
                                            //toInsert += "<p>" + newitems[i].lead + "</p></li>";
                                            toInsert += "</li>";
                                            //alert("toInsert: " + toInsert);
                                            $("#fresh_container #fresh ul").append(toInsert); //.prepend(toInsert);
                                            setMoreNotification();
                                            //newitems[i].url = null;
                                        }
                                    }
                                }
                                /*else {
                                $("#icon_fresh").html('');
                                $('#latestNotificationNews').html("<div id=\"noNewNotification\">Nincs új cikk....</div>");
                                }*/

                            }
                            /*else {
                            $("#icon_fresh").html('');
                            $('#latestNotificationNews').html("<div id=\"noNewNotification\">Nincs új cikk....</div>");
                            }*/
                        }
                        else if (newitems == null || newItemCounter == 0) {
                            $("#icon_fresh").html('');
                            setZeroNotification();
                        }

                        $("#fresh_container #boxtitle").show();
                        $("#fresh_container #fresh ul").show();

                        myTimeout = setTimeout(checkNews, updateInterval);
                        notifierIsRunning = false;
                    }
                }
            });
        };

        init();
    })(jQuery)
};