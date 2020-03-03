$(function() {
	if($(window).width() <=  451) {	
		modifyCalculator();
	}
	window.onresize = function() {		
		if($(window).width() <= 451 && !$('.hvg-calculator .hvg-block').hasClass('modifiedCalculator')) {
			modifyCalculator();
		}
	};
	
	function modifyCalculator() {
		var calculatorToModify = '.hvg-calculator .hvg-block';
		$(calculatorToModify).each(function(){

			$(this).addClass('modifiedCalculator');
			$(' thead',this).hide();
			$(' tfoot tr',this).each(function(){
				if(!$(this).hasClass('hvg-button')){
					$('td',this).each(function(index,element){
						$(this).css({'position': 'relative'});
						if( $.trim($('p',this).html()) != '&nbsp;' && index!=3) {
							//$('p',this).prepend('<label>'+headerArray[index]+'</label>');
						}
						if(index==2 && $(this).html() && $.trim($('p',this).html()) != '&nbsp;'){
							$(this).parent().find('input').css({'text-align':'left'}).after('<span style=" position: absolute;    background: #ffffff;    right: 12px;    bottom: 8px;    height: 30px;    width: auto;    border: none;">'+$(this).html()+'</span>');
							$(this).remove();
						}
						if( $.trim($('p',this).html()) == '&nbsp;') {
							$(this).remove();
						}
					});
				}
			});
		});
	}
});
