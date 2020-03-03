$(document).ready(function () {
    $("#ExtraConditionSection label").attr({ for: "WellensteynGameRule" });
    $("#ExtraConditionSection").prependTo("#ExtraInputDataSectionWrapper");
});

function DoValidationextraInputData() {
    var validationErrorType = 'none';
    var data = {
        succes: true,
        items: []
    };
    var id = "WellensteynGameRule";
    var input = $("#"+id);

    if (input.hasClass('requied')) {
        if (input.is(':checked')) {
            data.items.push({ name: id, val: "accepted" });
        }
        else {
            data.succes = false;
            showValidationMessage("A megrendelés feladásához el kell fogadnia a játékszabállyal kapcsolatos feltételeket, amellyel részt vehet a sorsolásán.", '#' + id + 'Error', '#' + id);
        }
    }
    return data;
}