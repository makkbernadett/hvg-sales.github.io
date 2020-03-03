$(function() {

});

$(window).on('load',function() {

});

$(document).ready(function() {
	
	$('body').tooltip({
		selector: '[data-toggle="tooltip"]',
		container: 'body'
	});
	
	/*quantity changer*/
	$('.quantity').each( function( index, element ){
		var qtyInput = $(this);
		var qtyWrapper=$(this).parent('.input-group');
		qtyWrapper.addClass('quantity-wrapper');
		qtyInput.before('<span class="value-button dec">–</span>').after('<span class="value-button inc">+</span>');
		qtyWrapper.find('.dec').click(function(){decreaseValue(qtyInput);});
		qtyWrapper.find('.inc').click(function(){increaseValue(qtyInput);});		
	});
	
	/*toggle-password input for usability*/
	$('.toggle-password .toggle-password-button').click(function() {
	  $(this).toggleClass('hide');
	  var input = $(this).parent().find('input');
	  if (input.attr('type') == 'password') {
		input.attr('type', 'text');
	  } else {
		input.attr('type', 'password');
	  }
	});	
	
	/*REGISZTRÁCIÓNÁL adószám mező disable ha magánszemély vagy nonprifot*/	
	$("input[name='regCompanyType']").change(function () {
		console.log($(this).val());
		if($(this).val()=='nonprofit') {
			$('#taxNumber').prop('disabled', true);
		} else { 
			$('#taxNumber').prop('disabled', false);			
		}
	});		
	
	/*WYSIWYG*/
	$('button').click(function(){
		var id = $(this).attr('id');
		switch(id){
		case "createLink":
		argument = prompt("Adja meg a link url-ét");
		command(id, argument);
		break;
		case "insertImage":
		argument = prompt("Adja meg a beszúrandó kép url-ét");
		command(id, argument);
		break;

		case "forecolor":
		argument = prompt("Adja meg a betűszín hexakódját");
		command(id, argument);
		break;

		case "heading" :
		borto.wrapSelection('<'+argument+'/>')	
		break;
		
		default:
		command(id);
		break;
		}
		refresh();
	});

	$('.editor').keyup(function(){
		refresh();
	});

	$('#save').click(function(){
		$('.message-popup').remove();
		$('.wysiwyg').append('<div class="message-popup">All changes saved.</div>');
		setTimeout(function(){
			$('.message-popup').css("opacity", ".8");
		}, 100);
		setTimeout(function(){
			$('.message-popup').remove();
		}, 3500);
	});	
	
	/*show hide help box*/
	$('.helpTitle').click(function(e){
		$('.helpContent').toggleClass('show');
	});	
	$('.helpContent .helpClose').click(function(e){
		$('.helpContent').toggleClass('show');
	});	


	
});

$(window).on('scroll',function () {
	if ($(document).scrollTop() > 66) {
		$('header.fixed-top').addClass('shrink');
	} else {
		$('header.fixed-top').removeClass('shrink');
	}
});

$(window).on('resize',function(){

});	

/*quantity inc dec*/
function increaseValue(item) {
	var value = parseInt(item.val(), 10);
	value = isNaN(value) ? 0 : value;
	value++;
	item.val(value);
}
function decreaseValue(item) {
	var value = parseInt(item.val(), 10);
	value = isNaN(value) ? 0 : value;
	value < 1 ? value = 1 : '';
	value--;
	item.val(value);
}

/*fix height divs*/
function fixHeight(elem){
	var checkExist = setInterval(function() {
		if ($(elem).length) {
			var maxHeight = 0;
			$(elem).css('height','auto');
			$(elem).each(function(){
					console.log($(this).height());
			   if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
			});
			$(elem).height(maxHeight+20);
			clearInterval(checkExist);
		} else {
			return false;
		}
	}, 100);	
;
}

/*media upload*/
function readUrl(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      let imgData = e.target.result;
      let imgName = input.files[0].name;
      input.setAttribute("data-title", imgName);
      console.log(e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }

}

/*WYSIWYG*/
function command(name, argument){
  if (typeof argument === 'undefined') {
    argument = '';
  }
  document.execCommand(name, false, argument);
}
function refresh(){
  var value = $('.editor').html();
  $('.htmlview').text(value);
}