$(function () {
	// RenderHTML-nek true-nak kell lennie, mert különben nem tölti be a .js-t, viszont így el kell tűntetni az üres section-t.
	$('#EmptySection').remove();

	$('#UserCountry').on('change', function(){
		$('#DeliveryCountry option[value='+$(this).val()+']').attr('selected','selected');
	});
	
	$("<section>A MEGRENDELEM gomb megnyomásával tudomásul veszem, hogy a HVG Kiadó Zrt. (Székhelye: 1037 Budapest, Montevideo u. 14.) adatkezelő által a bolt.hvg.hu és a kulcs.hvg.hu felhasználói adatbázisában tárolt alábbi személyes adataim átadásra kerülnek az OTP Mobil Kft. (1093 Budapest, Közraktár u. 30-32.), mint adatfeldolgozó részére. Az adatkezelő által továbbított adatok köre az alábbi: név, számlázási cím, szállítási cím, telefonszám, e-mail cím, megvásárolt vagy visszavett termék és szolgáltatás ára, tranzakció összege és napja <br/><br/> Az adatfeldolgozó által végzett adatfeldolgozási tevékenység jellege és célja a SimplePay Adatkezelési tájékoztatóban, az alábbi linken tekinthető meg: <a href='https://simplepay.hu/vasarlo-aff'>https://simplepay.hu/vasarlo-aff</a> <br/>A HVG Kiadó Zrt adatkezelési tájékoztatója ezen a linken érhető el: <a href='https://hvg.hu/adatvedelem'>https://hvg.hu/adatvedelem</a></section>" ).insertAfter( "#ExtraInputDataSectionWrapper" );
	
	IsOrderPossible();
});

function IsOrderPossible(isItAsync, callback) {
    var data = '{ "productWebId": "HVG360_ONE_MONTH"}';

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
                        alert("Önnek van már aktív előfizetése, jelenleg nem tudja megrendelni a terméket. Kérdés esetén, forduljon ügyfélszolgálatunkhoz.");
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
            alert("Önnek van már aktív előfizetése, jelenleg nem tudja megrendelni a terméket. Kérdés esetén, forduljon ügyfélszolgálatunkhoz.");
        }

        return data;
    });

    return ret;
}