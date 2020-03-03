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
		$('.hvgCalculator').addClass('hvg-calculator');
		$('.hvg-calculator .hvgRadio, .hvg-calculator .hvgCheck').css({'float':'left'});
		$('.hvg-calculator p label').css({'margin-left':'10px','margin-top':'-2px'});
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

							if( $.trim($('p',this).html()) != '&nbsp;' && indexRoot==1) {
								$('tbody',this).hide();
								if(index > 0) {

									$('input',this).before('<div style="padding-left: 0;margin-left: 0;">'+headerArray[index]+'</div>');

									if(index==3 && $(this).html() && $.trim($('p',this).html()) != '&nbsp;'){
										var tempText= $(this).html();
										$(this).parent().find('input').css({'text-align':'left'}).after('<span style=" position: absolute;    background: #ffffff;    right: 12px;    bottom: 8px;    height: 30px;    width: auto;    border: none;">'+tempText+'</span>');
										$(this).remove();
									}									
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