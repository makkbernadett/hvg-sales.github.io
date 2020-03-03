$(document).ready(function () {
	var linkToReplace = $("body a[href='https://bolt.hvg.hu/megrendelesi_feltetelek");
	linkToReplace.attr('href', 'https://bolt.hvg.hu/megrendelesi_feltetelek_360');
});
$(function () {
	$('#orderQuantity').hide();
	$('#orderQuantityError').hide();
	$('#order-details > label').get(0).remove();
});
