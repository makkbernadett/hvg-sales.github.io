$(document).ready(function () {
    $("#ExtraConditionSection label").attr({ for: "MakBistroGameRule" });
    $("#ExtraConditionSection").prependTo("#ExtraInputDataSectionWrapper");
	var linkToReplace = $("body a[href='https://bolt.hvg.hu/megrendelesi_feltetelek");
	linkToReplace.attr('href', 'https://bolt.hvg.hu/megrendelesi_feltetelek_360');	
});

function DoValidationextraInputData() {
    var validationErrorType = 'none';
    var data = {
        succes: true,
        items: []
    };
    var id = "MakBistroGameRule";
    var input = $("#"+id);

    if (input.hasClass('requied')) {
        if (input.is(':checked')) {
            data.items.push({ name: id, val: "accepted" });
        }
        else {
            data.succes = false;
            showValidationMessage("A megrendelés feladásához el kell fogadnia a játékszabállyal kapcsolatos feltételeket, amellyel részt vehet a sorsoláson.", '#' + id + 'Error', '#' + id);
        }
    }
    return data;
}