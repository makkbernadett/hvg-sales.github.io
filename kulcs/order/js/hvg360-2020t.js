var dict_promo_translate = {
    1: "Tisztelt Olvasónk! Az általad kiválasztott promóciós ajánlat felhasználási időtartama lejárt vagy a megadott promóciós kód nem megfelelő. Kérdés esetén fordulj ügyfélszolgálatunkhoz az ugyfelszolgalat@hvg.hu email címen.",
    2: "Kedves olvasónk! A te HVG profiloddal nem lehetséges az adott kedvezmény igénybevétele. Amennyiben kérdésed van kérjük fordulj ügyfélszolgálatunkhoz az ugyfelszolgalat@hvg.hu email címen.",
    3: "Kedves olvasónk! A te HVG profiloddal nem lehetséges az adott kedvezmény igénybevétele. Amennyiben kérdésed van kérjük fordulj ügyfélszolgálatunkhoz az ugyfelszolgalat@hvg.hu email címen.",
    4: "Tisztelt Olvasónk! Az általad kiválasztott promóciós ajánlat felhasználási időtartama lejárt vagy a megadott promóciós kód nem megfelelő. Kérdés esetén fordulj ügyfélszolgálatunkhoz az ugyfelszolgalat@hvg.hu email címen."
};

$(function () {
    var linkToReplace = $("body a[href='https://bolt.hvg.hu/megrendelesi_feltetelek");
    linkToReplace.attr('href', 'https://bolt.hvg.hu/megrendelesi_feltetelek_360');

    $('#orderQuantity').hide();
    $('#orderQuantityError').hide();
    if ($('#order-details > label').get(0)) {
        $('#order-details > label').get(0).remove();
    }
});