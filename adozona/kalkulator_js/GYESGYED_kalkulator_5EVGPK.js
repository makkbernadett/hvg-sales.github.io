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
			var headerArray = []; 
			$(' thead tr th',this).each(function(){
				if($(this).text().trim()) {
					headerArray.push($(this).text());
				} else if($.trim($('p',this).html()) == '&nbsp;'){
					$(this).remove();
				}
			});	
			$(this).addClass('modifiedCalculator');
			$(' thead',this).hide();
			$(' tfoot tr',this).each(function(){
				if(!$(this).hasClass('hvg-button')){
						$('td',this).each(function(index,element){
							$(this).css({'position': 'relative'});
							$(this).parent().find('input').css({'text-align':'left'});

							if(indexRoot==0) {
								if(index==2 && $(this).html() && $.trim($('p',this).html()) != '&nbsp;'){
									$(this).parent().find('input').css({'text-align':'left'}).after('<span style=" position: absolute;    background: #ffffff;    right: 12px;    bottom: 8px;    height: 30px;    width: auto;    border: none;">'+$(this).html()+'</span>');
									$(this).remove();
								}
								
							} else if(indexRoot == 1){
								if(index==1){
									$(this).css({'text-align':'left'}).append('<span style=" position: absolute;    background: #ffffff;    right: 12px;    bottom: 8px;    height: 30px;    width: auto;    border: none;"><p>-tól</p></span>');
								}		
								if(index==3){
									$(this).css({'text-align':'left'}).append('<span style=" position: absolute;    background: #ffffff;    right: 12px;    bottom: 8px;    height: 30px;    width: auto;    border: none;"><p>-ig</p></span>');
								}	
								if(index==2 || index == 4){
									$(this).remove();
								}
							}
							else if( $.trim($('p',this).html()) != '&nbsp;' && indexRoot==2) {
								$('tbody',this).hide();

								
								if(index==0){
									$('p',this).prepend('<label style="padding-left: 0;margin-left: 0;">'+headerArray[0]+'</label>');
								} else if(index>0 && index <4){
									$('p',this).prepend('<label style="padding-left: 0;margin-left: 0;">'+headerArray[1]+' - '+headerArray[index+3]+'</label>');
								} else if(index>=4 && index<6){
									$('p',this).prepend('<label style="padding-left: 0;margin-left: 0;">'+headerArray[2]+' - '+headerArray[index+3]+'</label>');
								}else{
									$('p',this).prepend('<label style="padding-left: 0;margin-left: 0;">'+headerArray[3]+'</label>');
								}	

								if($('input',this).length){
									$('input',this).after('<span style=" position: absolute;    background: #ffffff;    right: 12px;    bottom: 8px;    height: 30px;    width: auto;    border: none;"><p>Ft</p></span>');
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