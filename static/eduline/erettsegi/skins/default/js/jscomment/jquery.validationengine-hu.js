

(function($) {
	$.fn.validationEngineLanguage = function() {};
	$.validationEngineLanguage = {
		newLang: function() {
			$.validationEngineLanguage.allRules = 	{"required":{    			// Add your regex rules here, you can take telephone as an example
						"regex":"none",
						"alertText":"* Kötelező kitölteni",
						"alertTextCheckboxMultiple":"* Válasszon egy opciót",
						"alertTextCheckboxe":"* Kötelező megadni"},
					"length":{
						"regex":"none",
						"alertText":"*",
						"alertText2":" és ",
						"alertText3": " karakter közötti hossz kötelező "},
					"maxCheckbox":{
						"regex":"none",
						"alertText":"* Checks allowed Exceeded"},	
					"minCheckbox":{
						"regex":"none",
						"alertText":"* Kérjük válasszon ",
						"alertText2":" options"},	
					"confirm":{
						"regex":"none",
						"alertText":"* A megadott mezők nem egyeznek"},		
					"telephone":{
						"regex":"/^[0-9\-\(\)\ ]+$/",
						"alertText":"* Invalid phone number"},	
					"email":{
						"regex":"/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/",
						"alertText":"* Az e-mail cím formátuma nem megfelelő"},	
					"date":{
                         "regex":"/^[0-9]{4}\.\[0-9]{1,2}\.\[0-9]{1,2}.$/",
                         "alertText": "* Nem jó születési dátum, ez a kötelező ÉÉÉÉ.HH.NN. formátum"},
                    "checkUserName": {
                        "regex": "/^(?!Új felhasználói név$).*/",
                         "alertText": "* Adjon meg felhasználói nevet"},
					"onlyNumber":{
						"regex":"/^[0-9\ ]+$/",
						"alertText":"* Csak számokat adjon meg"},	
					"noSpecialCaracters":{
						"regex":"/^[0-9a-zA-Z]+$/",
						"alertText":"* No special caracters allowed"},	
					"ajaxUser":{
						"file":"validateUser.php",
						"extraData":"name=eric",
						"alertTextOk":"* This user is available",	
						"alertTextLoad":"* Loading, please wait",
						"alertText":"* This user is already taken"},	
					"ajaxName":{
						"file":"validateUser.php",
						"alertText":"* This name is already taken",
						"alertTextOk":"* This name is available",	
						"alertTextLoad":"* Loading, please wait"},		
					"onlyLetter":{
						"regex":"/^[a-zA-Z\ \']+$/",
						"alertText":"* Letters only"}
					}	
		}
	}
})(jQuery);

$(document).ready(function() {	
	$.validationEngineLanguage.newLang()
});