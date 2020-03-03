<script type="text/javascript" src="http://ad.adverticum.net/g3.js"></script>

<script type="text/javascript">
    window.onGoa3Invocation = function (response, pageIID) {
        var $ = this.getjQuery();

        $.each(response, function (i, r) {
            $("#zone".concat(r.zone)).parent(".bannerwrap").css("display", "block");
        });
    };
</script>