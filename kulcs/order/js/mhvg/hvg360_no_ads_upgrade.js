$(function () {
	$('#EmptySection').remove();
		
	if (isNotLoggedUser) {
		
		var redirectProductNumber = '';
		var href = new URL(location.href);
		var productNumber = href.searchParams.get('p');
	
		if (productNumber == 'HVG360_ONE_MONTH_U_NOADS') {
			href.searchParams.set('p', 'HVG360_ONE_MONTH_NOADS');
			location.href = href;
		}
		
		if (productNumber == 'HVG360_ONE_YEAR_U_NOADS') {
			href.searchParams.set('p', 'HVG360_ONE_YEAR_NOADS');
			location.href = href;
		}
	}
});