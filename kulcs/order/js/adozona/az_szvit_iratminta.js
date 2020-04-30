$(function () {
    //kupon1 id is from product extraInputData
    $("input#kupon1").blur(function () {
        $('#promo-success').remove();
        $('#promo-failed').remove();

        var self = $(this);
        var data = '{ "promoCode": "' + self.val() + '", "clubCardNo" : "", "pageType" : "2" }';
        $.ajax({
            type: "POST",
            url: urlAjaxService + "CalculateSalePrice",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                console.log('beforeSend erase kupon value');
                $('#kupon').val("");
            },
            success: function (msg) {
                var message = msg.d;
                var itemReduceType = message.filter(function (o) { return o.Key == "type"; })[0].Value;
                if (itemReduceType === "Promo") {
                    var itemnetprice = message.filter(function (o) { return o.Key == "netValue"; })[0].Value;
                    var itemgrossprice = message.filter(function (o) { return o.Key == "grossValue"; })[0].Value;

                    // kupon code set
                    $('#kupon').val(self.val());
                    // setting rigth
                    $('li#productDiscontPrice').attr('data_amount', itemgrossprice);
                    $('li#productDiscontPrice').html(itemgrossprice + ' Ft');
                    // Ha kell szöveges visszajelzés a dobozhoz:
                    $('#kupon1').after('<div id="promo-success" style="color: green">Megfelelő promóciós kód <br/><strong>Fizetendő ár: ' + itemgrossprice + ' Ft <strong/>');
                }

                if (itemReduceType === "Normal") {
                    $('#kupon1').after('<div id="promo-failed" style="color: red">Nem megfelelő promóciós kód <br/><strong>');
                }
            },
            error: function (msg) {
                console.log("error: " + msg.statusText);
            }
        });
    });

    function Init() {
        $("section#order-details").hide();
        $("input#kupon1").val($('#kupon').val());
        IsOrderPossible();
    }

    Init();
});

function IsOrderPossible(isItAsync, callback) {
    var data = '{ "productWebId": " AZ_SZVIT_IRATMINTA"}';

    var ret = null;

    $.ajax({
        type: "POST",
        url: urlAjaxService + "IsOrderPossible",
        data: data,
        async: isItAsync != undefined ? isItAsync : true,
        cache: false,
        timeout: 30000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (msg) {
            if (!callback) {
                callback = function (ret) {
                    if (ret === false) {
                        alert("Önnek már van megrendelése a Számviteli iratmintacsomagra. Hozzáférési problémák esetén keresse ügyfélszolgálatunkat munkanapokon 9:00-től 14:00 óráig, az ugyfelszolgalat@hvg.hu email címen vagy a (+36-1)-436 2045 telefonszámon.");
                    }
                };
            }
            ret = callback(msg.d);
        },
        error: function (msg) {
            console.log("error: " + msg.statusText);
        }
    });

    return ret;
}

function DoValidationextraInputData() {
    var ret = IsOrderPossible(false, function (orderIsPossible) {
        var data = {
            succes: orderIsPossible,
            items: []
        };

        if (!data.succes) {
            alert("Önnek már van megrendelése a Számviteli iratmintacsomagra. Hozzáférési problémák esetén keresse ügyfélszolgálatunkat munkanapokon 9:00-től 14:00 óráig, az ugyfelszolgalat@hvg.hu email címen vagy a (+36-1)-436 2045 telefonszámon.");
        }

        if (data.succes && $('#kupon').val() === "")
        {
            $('#kupon').val('SZI2010');
            console.log('set kupon to SZI2010');
        }

        return data;
    });

    return ret;
}