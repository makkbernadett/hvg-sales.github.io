function sztakiSearch(){
  var word = document.getElementById('sztakikwd').value;
  var item = document.getElementById('sztakilangs').options[document.getElementById('sztakilangs').selectedIndex].value;
  window.open('http://dict.sztaki.hu/dict_search.php?L=' + item + '&T=1&C=1&A=1&E=1&in_mozcontext=0.1&W=' + word + '&in_bookmarklet=1','EduLine','width=510,height=400,resizable=yes,toolbar=no,status=no,menubar=no,scrollbars=yes');
}

function isUrl(s) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(s);
}

function validateRegister()
{
  /*var curYear = new Date().getFullYear();
  var bornYear = document.getElementById('rbornyear');
  if (bornYear.value.length != 0) {
    if (bornYear.value < (curYear - 120) || bornYear.value > (curYear - 1)) {
      alert('Érvénytelen a születési év. Az évnek ' + (curYear - 120) + ' és ' + (curYear - 1) + ' közé kell esnie');
      return false;
    }
  }*/
  if (document.getElementById('remail').value.length == 0){
    alert('Az e-mail cím megadása kötelező !');
    return false;
  }
  else if (emailValidation(document.getElementById('remail').value) == false){
    alert('Hibásan adta meg az e-mail címet ! Kérjük létező e-mail címet adjon meg !');
    return false;
  }
  else if (document.getElementById('rnickname').value.length == 0){
    alert('A felhasználói név megadása kötelező !');
    return false;
  }
  else if (document.getElementById('rpassword').value.length == 0){
    alert('A jelszó megadása kötelező !');
    return false;
  }
  else if (document.getElementById('rpassword').value != document.getElementById('rretype').value){
    alert('A megadott jelszavak nem egyeznek !');
    return false;
  }
  /*else if (document.getElementById('rlastname').value.length == 0 || document.getElementById('rfirstname').value.length == 0){
    alert('A vezetéknév és az utónév megadása kötelező');
    return false;
  }
    else if(document.getElementById('rzip').value.length == 0)
  {
    alert('Az irányítószám megadása kötelező');
    return false;
  }
  else if (document.getElementById('rbornyear').value.length == 0)
  {
    alert('A születési év megadása kötelező');
    return false;
  }
  else if (document.getElementById('rbornmonth').selectedIndex < 1)
  {
    alert('A születési hónap megadása kötelező');
    return false;
  }
  else if (document.getElementById('rbornday').selectedIndex < 1)
  {
    alert('A születési nap megadása kötelező');
    return false;
  }*/

  else if (document.getElementById('chkbaccept').checked == false) {
    alert('A regisztrációhoz el kell fogadnia a felhasználási feltételeket !');
    return false;
  } else {
    return true;
  }
}

function validateProfil()
{
  var curYear = new Date().getFullYear();
  var bornYear = document.getElementById('rbornyear');
  if (bornYear.value.length != 0) {
    if (bornYear.value < (curYear - 120) || bornYear.value > (curYear - 1)) {
      alert('Érvénytelen a születési év. Az évnek ' + (curYear - 120) + ' és ' + (curYear - 1) + ' közé kell esnie');
      return false;
    }
  }
  if (document.getElementById('remail').value.length == 0){
    alert('Az e-mail cím megadása kötelező !');
    return false;
  }
  else if (emailValidation(document.getElementById('remail').value) == false){
    alert('Hibásan adta meg az e-mail címet ! Kérjük létező e-mail címet adjon meg !');
    return false;
  }
  else if (document.getElementById('rnickname').value.length == 0){
    alert('A felhasználói név megadása kötelező !');
    return false;
  }
  /*else if (document.getElementById('rlastname').value.length == 0 || document.getElementById('rfirstname').value.length == 0){
    alert('A vezetéknév és az utónév megadása kötelező');
    return false;
  }
    else if (document.getElementById('rzip').value.length == 0)
  {
    alert('Az irányítószám megadása kötelező');
    return false;
  }
  else if (document.getElementById('rbornyear').value.length == 0)
  {
    alert('A születési év megadása kötelező');
    return false;
  }
  else if (document.getElementById('rbornmonth').selectedIndex < 1)
  {
    alert('A születési hónap megadása kötelező');
    return false;
  }
  else if (document.getElementById('rbornday').selectedIndex < 1)
  {
    alert('A születési nap megadása kötelező');
    return false;
  }*/
  else if (document.getElementById('chkbaccept') && document.getElementById('chkbaccept').checked == false) {
    alert('A regisztrációhoz el kell fogadnia a felhasználási feltételeket !');
    return false;
  } else {
    return true;
  }
}

function setPublic(elem, field){
  switch (elem.className){
    case "private":
      elem.className = "public";
      document.getElementById(field).value = "1";
      break;
    case "public":
      elem.className = "private";
      document.getElementById(field).value = "0";
      break;
  }
}

function emailValidation(str){
  var at="@"
  var dot="."
  var lat=str.indexOf(at)
  var lstr=str.length
  var ldot=str.indexOf(dot)
  if (str.indexOf(at)==-1){
     //alert("Hibás e-mail cím")
     return false
  }

  if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
     //alert("Hibás e-mail cím")
     return false
  }

  if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
      //alert("Hibás e-mail cím")
      return false
  }

   if (str.indexOf(at,(lat+1))!=-1){
      //alert("Hibás e-mail cím")
      return false
   }

   if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
      //alert("Hibás e-mail cím")
      return false
   }

   if (str.indexOf(dot,(lat+2))==-1){
      //alert("Hibás e-mail cím")
      return false
   }

   if (str.indexOf(" ")!=-1){
      //alert("Hibás e-mail cím")
      return false
   }

   return true					
}

function setClickOff(submitbutton){
  //document.getElementById(submitbutton).disabled = true;
}

function toogleDisplay(element){
	if(element.style.display == "block")
		element.style.display = "none";
	else
		element.style.display = "block";	
}	

function toogleContainerDisplay(elementID) {
	var element = document.getElementById(elementID);	
	toogleDisplay(element);
	var ico = document.getElementById(elementID+"Ico");	
	if(element.style.display == "block")
		ico.innerHTML = "-";
	else
		ico.innerHTML = "+";	
}	

function forumSearchInCheckedChanged(elem){
  document.getElementById('h_'+elem.id).value = (elem.checked ? 1 : 0);
}

function validateForumSearch(){
  if (document.getElementById('search_keyword').value.length == 0)
  {
    alert('A keresés indításához meg kell adnod a keresendő kifejezést !');
    return false;
  }
  
  if (document.getElementById('h_inpublic_forums').value == 0 && document.getElementById('h_ingroup_forums').value == 0)
  {
    alert('A kereséshez meg kell adnod hogy milyen típusú fórumban keressen a rendszer !');
    return false;
  }
  return true;
}

function radioCheckChanged(radiocontrol){
  switch (radiocontrol.id)
  {
    case 'rbstudent1':
      document.getElementById('rschool_type1').disabled = (radiocontrol.checked == true ? false : true);
      break;
    case 'rbstudent2':
      document.getElementById('rschool_type1').disabled = radiocontrol.checked;
      break;
    case 'rblearning1':
      document.getElementById('rschool_type2').disabled = (radiocontrol.checked == true ? false : true);
      document.getElementById('rcourse_type').disabled = (radiocontrol.checked == true ? false : true);
      break;
    case 'rblearning2':
      document.getElementById('rschool_type2').disabled = radiocontrol.checked;
      document.getElementById('rcourse_type').disabled = radiocontrol.checked;
      break;
      
  }
  
}

function checkEnter(e)
{ 
  var characterCode 
  if(e && e.which) { 
    e = e
    characterCode = e.which //character code is contained in NN4's which property
  } else {
    e = event
    characterCode = e.keyCode //character code is contained in IE's keyCode property
  }

  return (characterCode == 13);
}

function removeAddresse(addresseInput, idStr, formId)
{
  var i = document.getElementById(addresseInput)
  if (i != null)
  {
    var v = i.value
    idStr += ";"
    i.value = v.replace(idStr,"")
    var f = document.getElementById(formId)
    if (f != null) f.submit()
  }
}

function popupWindow(url)
{
  window.open(url,'EduLine','width=600,height=500,resizable=yes,toolbar=no,status=no,menubar=no,scrollbars=yes');
}

function meghivoAlertBezar(id)
{
  var o = document.getElementById(id);
  o.style.display= "None";
}

function popupWindow(url,wi,he)
{
  window.open(url,'EduLine','width='+ wi + ',height=' + he + ',resizable=no,toolbar=no,status=no,menubar=no,scrollbars=yes');
}

function schoolSearch(target, typeCtrl, regionCtrl, cityCtrl, keywordCtrl, pageIndex, pageSize)
{
  var type = document.getElementById(typeCtrl);
  var typeValue = -1;
  if (type != null)
    typeValue = type.options[type.selectedIndex].value;
    
  var region = document.getElementById(regionCtrl);
  var regionValue = -1;
  if (region != null)
    regionValue = region.options[region.selectedIndex].value;
    
  var city = document.getElementById(cityCtrl)
  var cityValue = '_'
  if (city != null)
    if (city.value != '')
      cityValue = city.value;
  
  var keyword = document.getElementById(keywordCtrl)
  var keywordValue = '_'
  if (keyword != null)
    if (keyword.value != '')
      keywordValue = keyword.value;
  
  var url = '/' + target + '/' + typeValue + '/' + regionValue + '/' + cityValue + '/' + keywordValue;
  if (pageIndex != '')
    url += '/' + pageIndex;
  if (pageSize != '')
    url += '/' + pageSize;
    
  window.location = url;
}

function schoolSearchUpgraded(target, departmentCtrl, typeCtrl, regionCtrl, cityCtrl, keywordCtrl, pageIndex, pageSize) {
  
    var department = document.getElementById(departmentCtrl);
    var departmentValue = '_';
    if (department!=null && department.value!='')
        departmentValue = department.value;

    if (departmentValue == "_") {
        //alert("mĂˇsik keresĹ‘...");
        schoolSearch(target, typeCtrl, regionCtrl, cityCtrl, keywordCtrl, pageIndex, pageSize);
        return false;
    }

    var type = document.getElementById(typeCtrl);
    var typeValue = -1;
    if (type != null)
        typeValue = type.options[type.selectedIndex].value;

    var region = document.getElementById(regionCtrl);
    var regionValue = -1;
    if (region != null)
        regionValue = region.options[region.selectedIndex].value;

    var city = document.getElementById(cityCtrl)
    var cityValue = '_'
    if (city != null)
        if (city.value != '')
        cityValue = city.value;
    
    var keyword = document.getElementById(keywordCtrl)
    var keywordValue = '_'
    if (keyword != null)
        if (keyword.value != '')
        keywordValue = keyword.value;

    //var url = '/' + target + '/' + typeValue + '/' + regionValue + '/' + cityValue + '/' + keywordValue;
    var url = '/' + target + '/' + departmentValue + '/' + typeValue + '/' + regionValue + '/' + cityValue + '/' + keywordValue;
    pageSize = pageSize / 2;
    //alert("pageSize: " + pageSize);
    if (pageIndex != '')
        url += '/' + pageIndex;
    if (pageSize != '')
        url += '/' + pageSize;

    //alert("url: " + url);

    //window.location = url;
    document.location = url;

    return false;
}

// helper methods...:)

function LTrim( value ) {
	
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
	
}

// Removes ending whitespaces
function RTrim( value ) {
	
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
	
}

// Removes leading and ending whitespaces
function trim( value ) {
	
	return LTrim(RTrim(value));
	
}

// end helper methods... :)

function addOnSearch(target,categoryCtrl, subjectCtrl, schoolCtrl, keywordCtrl, currentCtrl, beforeCtrl, pageIndex, pageSize)
{
  var cat = document.getElementById(categoryCtrl);
  var catValue = -1;
  if (cat != null)
    catValue = cat.options[cat.selectedIndex].value;

  var subject = document.getElementById(subjectCtrl);
  var subjectValue = -1;
  if (subject != null)
    subjectValue = subject.options[subject.selectedIndex].value;

  var school = document.getElementById(schoolCtrl);
  var schoolValue = '_';
  if (school != null)
    if (school.value != '')
      schoolValue = school.value;
    
  var keyword = document.getElementById(keywordCtrl);
  var keywordValue = '_';
  if (keyword != null)
    if (keyword.value != '')
      keywordValue = trim(keyword.value);
    
  var current = document.getElementById(currentCtrl);
  var currentValue = '1';
  if (current != null)
    if (!current.checked)
      currentValue = '0';
    
  var before = document.getElementById(beforeCtrl);
  var beforeValue = '1';
  if (before != null)
    if (!before.checked)
      beforeValue = '0';
    
  var url = '/' + target + '/' + catValue + '/' + subjectValue + '/' + schoolValue + '/' + keywordValue + '/' + currentValue + '/' + beforeValue;
  if (pageIndex != '')
    url += '/' + pageIndex;
  if (pageSize != '')
    url += '/' + pageSize;
  
  window.location = url;
}

function setForumParams(target,orderCtrl,pageIndex,pageSizeCtrl)
{
  var order = document.getElementById(orderCtrl);
  var orderValue = 'd';
  if (order != null)
    orderValue = order.options[order.selectedIndex].value;

  var pageSize = document.getElementById(pageSizeCtrl);
  var pageSizeValue = '10';
  if (pageSize != null)
    pageSizeValue = pageSize.options[pageSize.selectedIndex].value;

  var url = target + '/' + orderValue + '/' + pageIndex + '/' + pageSizeValue;
  window.location = url;
}

function countrySelectedIndexChange(countryControl, regionControlPlaceHolder)
{
  if (countryControl.options[countryControl.selectedIndex].value != 126)
  {
    document.getElementById(regionControlPlaceHolder).style.display = 'none';
    //document.getElementById(cityControlPlaceHolder).style.display = 'none';
  }
  else
  {
    document.getElementById(regionControlPlaceHolder).style.display = 'block';
    //document.getElementById(cityControlPlaceHolder).style.display = 'block';
  }
}

function regionSelectedIndexChange(regionControl, cityControlId)
{
  if(regionControl.options[regionControl.selectedIndex].value == 5)
    document.getElementById(cityControlId).value = regionControl.options[regionControl.selectedIndex].text;
  else
    document.getElementById(cityControlId).value = '';
}

function postPager(formName, pageIndex, pageSize)
{
  var f = document.getElementById(formName + 'Form');
  if (f != null)
  {
    document.getElementById(formName + 'Page').value = pageIndex;
    document.getElementById(formName + 'Size').value = pageSize;
    f.submit();
  }
}

function deleteMessages(parentElement, cbName)
{
  var p = document.getElementById(parentElement);
  if (p != null)
  {
    var r = '';
    var l = p.getElementsByTagName('input');
    if (l != null)
      for(i = 0; i < l.length; i++)
        if(l[i].name.substring(0,cbName.length) == cbName && l[i].checked)
          r += l[i].value + ';';
    if (r != '')
    {
      if (confirm('Biztosan törlöd az üzenetet?'))
      {
        document.getElementById('CommandParams').value = r;
        document.getElementById('CommandName').value = 'deleteMessages';
        document.getElementById('MessageCommand').submit();
      }
    } else {
      alert('Kérlek válassz ki legalább egy elemet a listából!');
    }
  }
}

function markReadMessages(parentElement, cbName)
{
  var p = document.getElementById(parentElement);
  if (p != null)
  {
    var r = '';
    var l = p.getElementsByTagName('input');
    if (l != null)
      for(i = 0; i < l.length; i++)
        if(l[i].name.substring(0,cbName.length) == cbName && l[i].checked)
          r += l[i].value + ';';
    if (r != '')
    {
      if (confirm('Biztosan olvasottra akarod változtatni a kijelölt üzeneteket?'))
      {
        document.getElementById('CommandParams').value = r;
        document.getElementById('CommandName').value = 'markReadMessages';
        document.getElementById('MessageCommand').submit();
      }
    } else {
      alert('Kérlek válassz ki legalább egy elemet a listából!');
    }
  }
}

function markUnreadMessages(parentElement, cbName)
{
  var p = document.getElementById(parentElement);
  if (p != null)
  {
    var r = '';
    var l = p.getElementsByTagName('input');
    if (l != null)
      for(i = 0; i < l.length; i++)
        if(l[i].name.substring(0,cbName.length) == cbName && l[i].checked)
          r += l[i].value + ';';
    if (r != '')
    {
      if (confirm('Biztosan olvasatlanra akarod változtatni a kijelölt üzeneteket?'))
      {
        document.getElementById('CommandParams').value = r;
        document.getElementById('CommandName').value = 'markUnreadMessages';
        document.getElementById('MessageCommand').submit();
      }
    } else {
      alert('Kérlek válassz ki legalább egy elemet a listából!');
    }
  }
}

function checkFileExtension(ctrlName)
{
  var validExt = new Array("zip", "rar", "doc", "rtf", "txt", "xls", "ppt", "pdf");
  ctrl = document.getElementById(ctrlName);
  if (ctrl != null) 
  {
    var filename = ctrl.value;
    var dot = filename.lastIndexOf(".");
    var addOnId = document.getElementById('ctl00_MainPlaceholder_AddOnId').value;
    if ((addOnId == '') || (filename != ''))
    {
      if (dot != -1) 
      {
        var extension = filename.substr(dot + 1,filename.length).toLowerCase();
        var found = false;
        for(idx = 0; idx < validExt.length; idx++)
        {
          if (validExt[idx] == extension)
          {
            erase_html_scripts(ctrlName);
            return true;
          }
        }
        alert('Csak zip, rar, doc, rtf, txt, xls, ppt és pdf állományok tölthetőek fel!');
      }
      else
        alert('Kérlek válassz ki egy állományt!')
    }
    else
    {
      erase_html_scripts(ctrlName);
      return true;
    }
  }
  return false;
}

function erase_html_scripts(ctrlName)
{
    var txt = new RegExp("(<|<\/)[^>]*>","g");
    for(i=0; i<document.UploadForm.elements.length; i++)
    {
        if (document.UploadForm.elements[i].name != ctrlName)
        document.UploadForm.elements[i].value = document.UploadForm.elements[i].value.replace(txt,"");
    }
}

function validateSendMessage(btnControl)
{
  var msgForm = document.getElementById('SendMessageForm');
  
  if (btnControl.id == 'sendMail')
  {
    if (document.getElementById('AddresseList').value.length == 0)
    {
      alert('Nem adtál meg egyetlen címzettet sem !');
    }
    else if (document.getElementById('NewMessageSubject').value.length == 0)
    {
      alert('Az üzenet tárgyának megadása kötelező !');
    }
    else if (document.getElementById('NewMessageMessage').value.length == 0)
    {
      alert('Az üzenet szövegének megadása kötelező !');
    }
    else
    {
      return true;
    }
  }
  else
  {
    if (document.getElementById('ToList').selectedIndex >= 0)
    {
      var v = document.getElementById('ToList').options[document.getElementById('ToList').selectedIndex].value + ';'
      var t = document.getElementById('ToList').options[document.getElementById('ToList').selectedIndex].text + ';'
      if (t.indexOf('(0) [') == -1)
      {
        if (document.getElementById('AddresseList').value.indexOf(v) == -1)
        {
          document.getElementById('AddresseList').value += v;
          return true;
        }
      }
      else
      {
        alert('A kiválaszott csoportnak nincs tagja');
      }
    }
    else
    {
      alert('Kérlek válassz ki legalább egy címzettet a listából !');
    }
  }
  return false;
}

function setProfileCommand(commandtext)
{
  document.getElementById('ProfileCommand').value = commandtext;
}

function openCloseDetails(openCtrl, closeCtrl, openerCtrl)
{
  if (document.getElementById(openCtrl).style.display == 'none')
  {
    document.getElementById(openCtrl).style.display = 'block';
    document.getElementById(openerCtrl).className = 'closer';
    document.getElementById(closeCtrl).style.display = 'none';
  }
  else
  {
    document.getElementById(openCtrl).style.display = 'none';
    document.getElementById(openerCtrl).className = 'opener';
    document.getElementById(closeCtrl).style.display = 'block';
  }
}

function setAddonsVisibility(descPanel, paragraphPanel, openerSpan)
{
  if (document.getElementById(descPanel).style.display == 'none')
  {
    document.getElementById(descPanel).style.display = 'block';
    document.getElementById(openerSpan).className = 'closer';
    if (paragraphPanel != '')
      document.getElementById(paragraphPanel).style.display = 'none';
  }
  else
  {
    document.getElementById(descPanel).style.display = 'none';
    document.getElementById(openerSpan).className = 'opener';
    if (paragraphPanel != '')
      document.getElementById(paragraphPanel).style.display = 'block';
  }
}

function daysInMonth(month,year)
{
  var m = [31,28,31,30,31,30,31,31,30,31,30,31];
  if (month != 2) return m[month - 1];
  if (year % 4 != 0) return m[1];
  if (year % 100 == 0 && year % 400 != 0) return m[1];
  return m[1] + 1;
}

function fillDays(dayCtrl, yearCtrl, monthCtrl)
{
  var y = document.getElementById(yearCtrl);
  var d = document.getElementById(dayCtrl);
  var m = document.getElementById(monthCtrl);
  
  if (y != null && d != null && m != null && m != -1 && y.value.length == 4)
  {
    var dc = daysInMonth(m.options[m.selectedIndex].value,y.value);
    d.options.length = 0;
    d.options.add(new Option("Nap",-1),0)
    for(i = 1; i <= dc; i++)
      d.options.add(new Option(i,i),d.options.length)
  }
}

function setItem(ctrl, index)
{
  var c = document.getElementById(ctrl);
  if (c != null)
    c.options[index].selected = true
}

function deleteMyAddOns(url,addOnId)
{
  if (confirm('Biztosan törölni akarod a segédanyagot?'))
  {
    //window.location = '/segedanyagaim.aspx/torles/' + addOnId;
    window.location = '/' + url + '/torles/' + addOnId;
  }
  return false;
}

function editMyAddOns(url)
{
  window.location = url;
  return false;
}

function onlyNum(e) {
  if (window.event) keycode = window.event.keyCode;
  else if (e) keycode = e.which;
  if ((keycode >= 48 && keycode <= 57) || (keycode >= 96 && keycode <= 105) 
      || keycode == 8 || keycode == 46 || keycode == 39 || keycode == 37 
      || keycode == 35 || keycode == 27 || keycode == 9)
    return true
  else
    return false; 
}

function checkKeycode(e) {
  var keycode;
  if (window.event) keycode = window.event.keyCode;
  else if (e) keycode = e.which;
  alert("keycode: " + keycode);
}

function myGroupsPressedButton(str)
{
  var o = document.getElementById('pressedButton');
  o.value = str;
}

function csoportTorles(link)
{
  if (confirm('Biztos törölni szeretnéd a csoportot?')) window.location=link;
}
