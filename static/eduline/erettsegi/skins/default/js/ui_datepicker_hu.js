jQuery(function($){
	$.datepicker.regional['hu'] = {
		closeText: 'bezárás',
		prevText: '&laquo;&nbsp;vissza',
		nextText: 'előre&nbsp;&raquo;',
		currentText: 'ma',
		monthNames: ['január', 'február', 'március', 'április', 'május', 'június',
		'július', 'augusztus', 'szeptember', 'október', 'november', 'december'],
		monthNamesShort: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún',
		'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
		dayNames: ['Vasárnap', 'Hétfö', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
		dayNamesShort: ['Vas', 'Hét', 'Ked', 'Sze', 'Csü', 'Pén', 'Szo'],
		dayNamesMin: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
		dateFormat: 'yy. MM dd.', firstDay: 1,
		isRTL: false};
	$.datepicker.setDefaults($.datepicker.regional['hu']);
});