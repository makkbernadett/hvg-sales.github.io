jQuery(function($) {
	$('.bm-calc-box').each(function() {
		$(this).find('a').attr('data-utm', $(this).find('a').attr('href')).attr('href', 'javascript:null');
	});

	// Lakástakarék
	$('.ltp-calc-slider input').on("change", function () {
		$(this).closest('.ltp-calc').find('a').attr('href', 'https://penzugyi-kalkulatorok.hvg.hu/kalkulatorok/lakastakarek-kalkulator/?monthlyDeposit=' + $(this).data('from') + '&' + $(this).closest('.ltp-calc').find('a').attr('data-utm'));
	}).ionRangeSlider({
		type: 'single',
		min: 20000,
		max: 100000,
		step: 20000,
		grid: true,
		prettify: function (num) {
			var value = parseInt(Math.round((num + '').replace(/[^\d\,\.\-]/g, '')));
			if (!value) {
				value = 0;
			}

			value = value + '';
			var output = '';
			for (var i = 0; i < value.length; i++) {
				if ((value.length - i - 1) % 3 === 2) {
					output += ' ';
				}

				output += value[i];
			}
			if (output[0] === ' ')
				return output.substr(1) + ' Ft';
			return output + ' Ft';
		}
	}).change();

	// Lakáshitel
	$('.lh-calc .loan-numberfield').on('input', inputMasking);
});
function inputMasking() {
	var element = jQuery(this);
	var value = element.val();

	// store current positions in variables
	var start = this.selectionStart;
	var end = this.selectionEnd;

	// Összeg esetén ha a szám elejét kitörli ne nullázzuk ki
	if (value.length > 0 && (value[0] === '0' || value[0] === ' ' || value[0] === '-')) {
		if (value.length === 1 || start === 0) {
			return false;
		}
	}
	if (value.length === 0) {
		return false;
	}

	// Ha számot kérünk be megformázzuk
	var value1 = defaultMask(value);
	element.val(value1);

	// Pozíció kiszámítása
	var dif = value1.split(' ').length - value.split(' ').length;
	start = Math.min(start + dif, value1.length);
	end = Math.min(end + dif, value1.length);

	// restore from variables...
	if (typeof this.setSelectionRange === 'function') {
		this.setSelectionRange(start, end);
	}

	var value = parseInt(element.val().split(' ').join(''));
	if (value > 1000000) {
		element.closest('.lh-calc').find('a').attr('href', 'https://penzugyi-kalkulatorok.hvg.hu/kalkulatorok/lakashitel/?loanAmount=' + value + '&' + $(this).closest('.lh-calc').find('a').attr('data-utm'));
		element.closest('.lh-calc').find('.error').hide();
	} else {
		element.closest('.lh-calc').find('a').attr('href', 'javascript:null').attr('class', 'disabled');
		element.closest('.lh-calc').find('.error').html('A megadható legalacsonyabb hitelösszeg 1 000 000 Ft').show();
	}
	return true;
}

function defaultMask(value) {
	value = parseInt(Math.round((value + '').replace(/[^\d\,\.\-]/g, '')));
	if (!value)
		value = 0;

	value = value + '';
	var output = '';
	for (var i = 0; i < value.length; i++) {
		if ((value.length - i - 1) % 3 === 2) {
			output += ' ';
		}

		output += value[i];
	}
	if (output[0] === ' ') {
		return output.substr(1);
	} else {
		return output;
	}
}
