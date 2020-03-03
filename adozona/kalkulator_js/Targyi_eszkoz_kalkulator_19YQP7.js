$(function() {
	if($(window).width() <=  451) {	
		modifyCalculator();
	}
	window.onresize = function() {		
		if($(window).width() <= 451 && !$('.hvg-calculator .hvgBlock').hasClass('modifiedCalculator')) {
			modifyCalculator();
		}
	};	
	function modifyCalculator() {
		$('.hvgCalculator').addClass('hvg-calculator');$('.hvg-calculator .hvgRadio, .hvg-calculator .hvgCheck').css({'float':'left'});$('.hvg-calculator p').css({'position':'relative'});$('.hvg-calculator p label').css({'margin-left':'10px','margin-top':'-2px'});
		$('input[readonly="readonly"]').css({'background-color' : '#d8d8d8 !important', 'border':'none !important'});
		var calculatorToModify = '.hvgCalculator .hvgBlock';
		$(calculatorToModify).each(function(indexRoot, elementRoot){
			var headerArray = []; 
			$(' thead tr td',this).each(function(){
				if($(this).text().trim()) {
					headerArray.push($(this).text());
				} else if($.trim($('p',this).html()) == '&nbsp;'){
					$(this).remove();
				}
			});	

			$(this).addClass('modifiedCalculator');
			//$(' thead',this).hide();
			$(' tfoot tr',this).each(function(){
				if(!$(this).hasClass('hvg-button')){
						$('td',this).each(function(index,element){
							$(this).css({'position': 'relative'});
							$(this).parent().find('input').css({'text-align':'left'});

							if( $.trim($('p',this).html()) != '&nbsp;') {
								$('tbody',this).hide();

								if(index<3) {
									$(this).prepend('<label style="">'+headerArray[index]+'</label>');
								}

								if(index==3 && $(this).html() && $.trim($('p',this).html()) != '&nbsp;'){
									var tempText= $(this).html();
									if($(this).find('p').size() == 3) {
										var inputPArray = [];
										$(this).find('p').each(function(k,element){
											inputPArray.push($(this).html());
										});
										console.log(inputPArray);
										$(this).parent().find('input').each(function(indexInput,element){
											if(inputPArray[indexInput] === undefined){
												
												$(this).after('<span style=" position: absolute;    background: #ffffff;    right: 12px;    bottom: 2px;    height: 24px;    width: auto;    border: none;">'+inputPArray[indexInput-3]+'</span>');
											} else {

												$(this).after('<span style=" position: absolute;    background: #ffffff;    right: 12px;    bottom: 2px;    height: 24px;    width: auto;    border: none;">'+inputPArray[indexInput]+'</span>');
											}
										});
									} else {
										$(this).parent().find('input').css({'text-align':'left'}).after('<span style=" position: absolute;    background: #ffffff;    right: 12px;    bottom: 2px;    height: 30px;    width: auto;    border: none;">'+tempText+'</span>');
									}
									$(this).remove();
								}									
																
							}							
							if( $.trim($('p',this).html()) == '&nbsp;') {
								$(this).remove();
							}
						});
					
				}
			});
		});
		$('.new-style').css({'position':'fixed'});
	}
});