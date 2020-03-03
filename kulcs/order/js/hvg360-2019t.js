$(document).ready(function () {
    $("#ExtraConditionSection label").attr({ for: "HVG360GameRule" });
    $("#ExtraConditionSection").prependTo("#ExtraInputDataSectionWrapper");
});
$(function () {
	$('#orderQuantity').hide();
	$('#orderQuantityError').hide();
	$('#order-details > label').get(0).remove();
});

function DoValidationextraInputData() {
    var validationErrorType = 'none';
    var data = {
        succes: true,
        items: []
    };
    var id = "HVG360GameRule";
    var input = $("#"+id);

    if (input.hasClass('requied')) {
        if (input.is(':checked')) {
            data.items.push({ name: id, val: "accepted" });
        }
        else {
            data.succes = false;
            showValidationMessage("A megrendelés feladásához el kell fogadnia a játékszabállyal kapcsolatos feltételeket, amellyel részt vehet a hvg360 nyereményjáték sorsolásán.", '#' + id + 'Error', '#' + id);
        }
    }
    return data;
}