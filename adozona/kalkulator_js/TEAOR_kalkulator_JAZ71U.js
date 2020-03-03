function modifyCalculator(){
	
	var calculatorShowThead = false;
	var calculatorShowTbody = false;
	var calculatorsToModify = [0];
	
	var calculatorTables = document.querySelectorAll('.hvg-calculator .hvg-block table');
	calculatorTables.forEach(function(calculator,i){	
		if(calculatorShowTbody === false){
			var tbodyToHide = calculatorTables[i].querySelector('tbody');
			if(tbodyToHide){
				tbodyToHide.style.display = "none";
				calculatorTables[i].style.marginTop = "30px";
			}
		}			
		if(calculatorShowThead === false){
			var theadToHide = calculatorTables[i].querySelector('thead');	
			if(theadToHide){
				theadToHide.style.display = "none";
				calculatorTables[i].style.marginTop = "30px";
			}			
		}					
		//kalkulátor labelek áthelyezése
		if(calculatorsToModify.indexOf(i)!== -1 && !calculatorTables[i].classList.contains('modifiedCalculator')){		
			var tableLabels = calculatorTables[i].querySelectorAll('thead th');
			var tableLabelsToReplace = calculatorTables[i].querySelectorAll('tbody td');
			
			var labelToReplace1 = tableLabelsToReplace[1].innerHTML;
			var labelToReplace2 = tableLabelsToReplace[2].innerHTML;

			var tableRows = calculatorTables[i].querySelectorAll('tfoot tr');
			var k;
			var z;
			if(tableRows.length){
				calculatorTables[i].classList.add('modifiedCalculator');
				tableRows.forEach(function(element){
					k=0;
					z = 0;
					var tableCells = element.querySelectorAll('td');					
					tableCells.forEach(function(elementInside){
						elementInside.setAttribute('style','position:relative;');
						var elementInput = elementInside.querySelector('input');
						if(elementInput){
							elementInput.setAttribute('style', 'text-align: left;position: relative;');
						}
						var paragraphInside = elementInside.querySelector('p');
						if(elementInside.innerHTML && tableLabels[k].innerText.length > 1 && paragraphInside.style.display !=='none') {
							if(z == 1){
								elementInside.insertAdjacentHTML('beforeend','<span style="position: absolute;    background: #ffffff;    right: 12px;     bottom: 7px;    height: 32px;    width: auto;    border: none;z-index: 10;">'+labelToReplace1+'</span>');
							} else if(z>1) { 
								elementInside.insertAdjacentHTML('beforeend','<span style="position: absolute;    background: #ffffff;    right: 12px;    bottom: 7px;    height: 32px;    width: auto;    border: none;z-index: 10;">'+labelToReplace2+'</span>');
							}
							elementInside.insertAdjacentHTML('afterbegin','<label>'+tableLabels[k].innerText+'</label>');
							z++;
							k++;
						}
					});

				});	
			}			
		}
	});
}

document.addEventListener("DOMContentLoaded", function(event) {
	if(screen.width <=  451) {
		modifyCalculator();
	}
	window.onresize = function() {
		console.log(screen.width);
		if(screen.width <= 451) {
			modifyCalculator();
		}
	};
});
