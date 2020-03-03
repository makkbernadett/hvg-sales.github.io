$(function () {

    function Init() {
        $("#PriceReducer").hide(); //https://jira.hvg.hu/browse/BD-2638

        if ($("#PartnerInput") && $("#PartnerInput").val()) {
            console.log("init is triggering");
            PartnerCode($("#PartnerInput").val(), true);
            console.log("init is triggered");
        }

        $("#PartnerInput").blur(function (event) {
            event.preventDefault();
            PartnerCode($(this).val());
        });

        $("#ExtraConditionSectionMemCheck label").attr({ for: "MEMeszamla" });
        $("#ExtraConditionSectionMemCheck").prependTo("#ExtraInputDataSectionWrapper");

        $("#ExtraConditionSectionMemEdmCheck label").attr({ for: "MEMEdm" });
        $("#ExtraConditionSectionMemEdmCheck").prependTo("#ExtraInputDataSectionWrapper");

        var mbText = 'A kedvezményes ár érvényesítéséhez adja meg a következő adatok egyikét. Ha Ön nem rendelkezik éves HVG előfizetéssel, ezt a lépést hagyja ki.';
        // Eredeti szöveg: Írjon be egyet a következő azonosítási lehetőségek közül:
        $("#PartnerID").replaceWith("<div id = \"PartnerID\" style=\"line-height: 16px\">" + mbText + "<br><br><ul><li>HVG-partnerszám</li><li>HVG-előfizetői megrendelésszám</li> <li>HVG-előfizetői díjbekérő vagy csekk befizető azonosítója </li> <li>HVG-előfizetéséhez megadott e-mail cím</li> </ul></div>");
        $("#PartnerInputError").insertAfter("#PartnerInput");
        $('#PriceReducer').find('span').remove();
        $('#order-details').hide();
        $('#business-account-label').html('Céges számla igénylése esetén, kérjük, feltétlenül töltse ki!<br/>A vásárlásról e-számlát állítunk ki.');
        $('#deliverAddress > h3').html('A tagság felhasználójának adatai<br/><span>(céges megrendelés esetén kötelező)</span>');
        $('#deliverAddress > small > label').contents().last()[0].textContent = 'Megegyezik a megrendelési címmel';

        $("#plhSubcriptionRange").hide();

        /*var origStartDate = new Date($("#selectSubcriptionStartDate option:first").val());
        $("#selectSubcriptionStartDate option:first").val(new Date().mmddyyyy() + '#' + origStartDate.addMonths(12).addDays(-1).mmddyyyy());*/
        // https://jira.hvg.hu/browse/BD-2658
        
        $("#selectSubscriptionStartDate option:first").val(new Date().mmddyyyy() + '#' + new Date().addMonths(12).addDays(-1).mmddyyyy());
    }

    Init();
});

var validationErrorType = 'none';

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

Date.prototype.addMonths = function (months) {
    var dat = new Date(this.valueOf());
    dat.setMonth(dat.getMonth() + months);
    return dat;
}

Date.prototype.mmddyyyy = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return mm + "/" + dd + "/" + yyyy; // padding
};

function DoValidationextraInputData() {
    var data = {
        succes: true,
        items: []
    };

    var succes = data.succes;
    CheckEdm(data);
    if (!data.succes) {
        succes = false;
    }
    CheckEszamla(data);
    if (!data.succes) {
        succes = false;
    }
    //CheckProductEntityExtraInputData(data); //https://jira.hvg.hu/browse/BD-2638

    if (!succes) {
        data.succes = false;
    }
    return data;
}

function CheckProductEntityExtraInputData(data) {
    var validationErrorType = 'none';

    $('#productEntityExtraInputData').find('input').each(function () {
        var input = $(this);
        var id = input.attr('id');
        if (!input.parent().hasClass('hide')) {
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                if (input.hasClass('requied')) {
                    showValidationMessage("Kérjük, adja meg az adatot", '#' + id + 'Error', '#' + id);
                    validationErrorType = 'error';
                    return false;
                }
            }
            else {
                data.items.push({ name: id, val: input.val() });
            }
        }
    });

    if (validationErrorType == 'error') {
        data.succes = false;
    }
    return data;
}


function CheckEdm(data) {
    var id = "MEMEdm";
    var input = $("#" + id);

    if (input.is(':checked')) {
        data.items.push({ name: id, val: "accepted" });
    }
    else {
        data.items.push({ name: id, val: "not_accepted" });
    }
}

function CheckEszamla(data) {
    var id = "MEMeszamla";
    var input = $("#" + id);

    if (input.hasClass('requied')) {
        if (input.is(':checked')) {
            data.succes = true;
            data.items.push({ name: id, val: "accepted" });
        }
        else {
            data.succes = false;
            showValidationMessage("Kérjük, járuljon hozzá az Ön nevére szóló elektronikus számla kiállításához környezetünk megóvása érdekében. Köszönjük!", '#' + id + 'Error', '#' + id);
        }
    }
}

function SetCode(name, input) {
    $("#" + name).val(input);
    console.log(name + ": " + $("#" + name).val());
}

function PartnerInputDisabledTogle() {
    $('#PartnerInput').prop('disabled', function (i, v) { return !v; });
    console.log("#PartnerInput is disabled: " + $('#PartnerInput').prop('disabled'));
}

function PartnerCode(input, isInit) { //https://jira.hvg.hu/browse/BD-2638
    SetCode("OrderitemId", "");
    SetCode("PartnerCode", "");
    return;
}

function PartnerCode_old(input, isInit) { //https://jira.hvg.hu/browse/BD-2638
    if (!input) {
        SetCode("OrderitemId", "");
        SetCode("PartnerCode", "");
        return;
    }

    var data = Object.toJsonString({
        anyKindOfIdentity: input
        , atProductWebId: getParameterByName('p')
    });

    $.ajax({
        type: "POST",
        url: urlAjaxService + "GetPartnerEntity",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            if (!isInit) {
                PartnerInputDisabledTogle();
            }
        },
        success: function (msg) {
            var message = msg.d;
            obj = JSON.parse(message);
            if (!obj.ValidFrom) {
                if (!isInit) {
                    alert("Nem találtunk valid partner azonosítót a megadott azonosítóhoz" + obj.ValidFrom);
                    PartnerInputDisabledTogle();
                }
            }
            else {
                //https://stackoverflow.com/questions/13549922/format-json-datetime-on-client-side-by-javascript-or-jquery
                var validFrom = new Date(parseInt(obj.ValidFrom.substr(6)));
                var validTo = new Date(parseInt(obj.ValidTo.substr(6)));
                if (obj.IsPaid && Date.now() <= validTo) {
                    if (!isInit) {
                        $("#PartnerInputError").html("Sikeres azonosítás! <br/> Ön kedvezményes áron vásárolhatja meg a kiválasztott csomagot.").css('color', 'green');
                    }
                    SetCode("PartnerCode", obj.Id);
                    SetCode("OrderitemId", obj.OrderItemId);
                }
                else {
                    SetCode("PartnerCode", "");
                    SetCode("OrderitemId", "");
                    if (!isInit) {
                        $("#PartnerInputError").html("Sikertelen azonosítás! <br/> Kérjük próbálkozzon egy másik adatával!");
                        PartnerInputDisabledTogle();
                    }
                }
            }
        },
        error: function (msg) {
            if (!isInit) {
                console.log("error -> msg: " + msg);
                if (!isInit) {
                    PartnerInputDisabledTogle();
                }
            }
        }
    });
}