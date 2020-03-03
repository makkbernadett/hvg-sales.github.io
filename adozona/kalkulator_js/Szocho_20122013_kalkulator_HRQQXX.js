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
		$(calculatorToModify).each(function(indexRoot, elementRoot){
			$(this).addClass('modifiedCalculator');
			var headerArray = []; 
			$(' thead tr th',this).each(function(){
				if($(this).text().trim()) {
					headerArray.push($(this).text());
				} else if($.trim($('p',this).html()) == '&nbsp;'){
					$(this).remove();
				}
			});		
			$(' thead, tbody',this).hide();
			$(' tfoot tr',this).each(function(){
				if(!$(this).hasClass('hvg-button')){
					$('td',this).each(function(index,element){
						$(this).css({'position': 'relative'});
						if( $.trim($('p',this).html()) != '&nbsp;' ) {
							$('p',this).prepend('<label style="padding-left: 0;">'+headerArray[index]+'</label>');
						}
						if(index>0 && $(this).html() && $.trim($('p',this).html()) != '&nbsp;'){
							$(this).parent().find('input').css({'text-align':'left'}).after('<span style=" display: flex;align-items:center;position: absolute;    background: #ffffff;    right: 12px;padding-right: 5px;    bottom: 8px;    height: 30px;    width: auto;    border: none;">Forint</span>');
							//$(this).remove();
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