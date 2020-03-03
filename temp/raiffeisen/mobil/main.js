var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


//Ékezetes karakterek eltávolítása a string-ből
String.prototype.changeAccentedChars = function () {
    var accents = 'áéíóöőúüűÁÉÍÓÖŐÚÜŰ+';
    var replace = 'aeiooouuuAEIOOOUUU_';
    accents = accents.split('');
    replace = replace.split('');
    var textLength = this.length;
    var text = '';
    for (var i = 0; i < textLength; i++) {
      var pos = accents.indexOf(this[i]);
      if (pos > -1) {text += replace[pos];
      } else {text += this[i];}
    }
    return text;}


/*
** CALCULATOR
----------------------------------------------------------------------*/
// Init TEXT
Number.prototype.formatMoney1 = function(c, d, t){
    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    var result = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    return result.replace(".",",")+" <span style='color:#787979;font-weight:normal;'>Ft</span>";
};          
Number.prototype.formatMoney = function(c, d, t){
    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    var result = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    return result.replace(".",",");
};
Number.prototype.formatMoney3 = function(c, d, t){
    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    var result = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    return result.replace(".",",");
};  
Number.prototype.number_format = function(decPlaces, thouSeparator, decSeparator) {
            var n = this,
            decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
            decSeparator = decSeparator == undefined ? "." : decSeparator,
            thouSeparator = thouSeparator == undefined ? "" : thouSeparator,
            sign = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
            return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
        };
 
Number.prototype.math_round = function(decimals){
    var num = this;
    return Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals);
    
}


var kamat5Eves="4.25";
var kamat10Eves="5.35";
var buborKamat="0.05";
var standardKamat="3.2";

var kamatfelarKedvezmeny=0.75;
//var tovabbiKoltsegek=12600;
var tovabbiKoltsegek=0;
var jovedelem=0.1;
var szamla=0.35;
var forgKedv=0.2;
var kamat=0;
var thm=0;
var kamatozasTipus=2;
var kamatfelarKedvezmenyegyuttvalue = 1;
    
var lakashitelKamatKedvezmenyekFix=new Array();
lakashitelKamatKedvezmenyekFix[0]={displayText:" A fenti két kamatkedvezmény együtt"};
var lakashitelKamatKedvezmenyekStandard=new Array();
lakashitelKamatKedvezmenyekStandard.push({displayText:" Alacsony hitelösszeg-forgalmi érték arány esetén",discount:0.2});
lakashitelKamatKedvezmenyekStandard.push({displayText:" Havi jóváírási kötelezettség és elvárt tranzakciószám teljesítése esetén",discount:0.35});
var lakashitelKamatKedvezmenyek5Eves=new Array();
lakashitelKamatKedvezmenyek5Eves.push({displayText:" Alacsony hitelösszeg-forgalmi érték arány esetén",discount:0.2});
lakashitelKamatKedvezmenyek5Eves.push({displayText:" Havi jóváírási kötelezettség és elvárt tranzakciószám teljesítése esetén",discount:0.35});
var lakashitelKamatKedvezmenyek10Eves=new Array();
lakashitelKamatKedvezmenyek10Eves.push({displayText:" Alacsony hitelösszeg-forgalmi érték arány esetén",discount:0.2});
lakashitelKamatKedvezmenyek10Eves.push({displayText:" Havi jóváírási kötelezettség és elvárt tranzakciószám teljesítése esetén",discount:0.35});
var lakashitelTovabbiInduloKoltsegekFix=new Array();
lakashitelTovabbiInduloKoltsegekFix.push({displayText:" Kifizetéshez szükséges tulajdoni lap lekérésének díja (TAKARNET)",discount:0});
lakashitelTovabbiInduloKoltsegekFix.push({displayText:" Földhivatali bejegyzés díja",discount:0});
var lakashitelTovabbiInduloKoltsegek5eves=new Array();
lakashitelTovabbiInduloKoltsegek5eves.push({displayText:" Kifizetéshez szükséges tulajdoni lap lekérésének díja (TAKARNET)",discount:0});
lakashitelTovabbiInduloKoltsegek5eves.push({displayText:" Földhivatali bejegyzés díja",discount:0});
var lakashitelTovabbiInduloKoltsegek=new Array();
lakashitelTovabbiInduloKoltsegek.push({displayText:" Folyósítási díj",discount:0});
lakashitelTovabbiInduloKoltsegek.push({displayText:" Tulajdoni lap másolatának lekérési díja",discount:0});
lakashitelTovabbiInduloKoltsegek.push({displayText:" Jelzálogjog-bejegyzés díja",discount:0});
var lakashitelKamatKedvezmenyek=lakashitelKamatKedvezmenyek5Eves;


    // Init

    stepAmount      = 500000;   // ugrás mértéke
    stepHouseAmount = 500000;   // ugrás mértéke
    stepYear        = 1;        // ugrás mértéke

    minAmount       = 1000000;   // min összeg a slideren
    minHouseAmount  = 5000000;   // min összeg a slideren
    minYear         = 5;        // min év a slideren
    maxAmount       = 60000000;  // max összeg a slideren
    maxHouseAmount  = 100000000;  // max összeg a slideren
    maxYear         = 25;       // ha nem érte el az adott warAmount1-et akkor ez lesz a max év.





    var parameters=getUrlVars();
    var clickTags=decodeURIComponent(parameters['clickTag']);
    console.log(clickTags);
    var p1=clickTags.split('price'); 
    
    var p4=decodeURIComponent(p1[1]);
    console.log(p4);
    var getprice=p4.split('='); 
    
    if (getprice[1]>0)
    {
        var ha=getprice[1];
    }
    else 
    {
        var ha=10000000;
    }

        h=((ha*0.8)/1000000).math_round(0);
        maxosszeg=h*1000000;
        if (maxosszeg>maxAmount)    maxosszeg=maxAmount;


        var pricenum=Math.round((ha*0.5)/1000000)*1000000;
        $("#kalkulatorAmount").val(pricenum+" Ft");


        $("#kalkulatorHouseAmount").val(ha);

    doCalculate($( "#kalkulatorYear" ).val(),Number($( "#kalkulatorAmount" ).val().replace(" Ft","")),$( "#kalkulatorHouseAmount" ).val());


function doCalculate(year,amount,houseamount){

    tovabbiKoltsegek=0;
    tovabbiKoltsegek+=0;
    year=Number($( "#kalkulatorYear" ).val().replace(" év",""))
        jovedelem = parseFloat($('input[name=lhckedvezmeny_input]:checked').val());
        szamla = parseFloat($('input[name=lhckedvezmeny_input1]:checked').val());
        ingatlanar=parseFloat($( "#kalkulatorHouseAmount" ).val().replace(/\D/g,""));
        hitel=parseFloat($( "#kalkulatorAmount" ).val().replace(/\D/g,""));
        forgalmiertekarany=parseFloat(hitel/ingatlanar).math_round(2).toFixed(2);
        if (forgalmiertekarany<=0.60) forgKedvezmeny=forgKedv;
        else forgKedvezmeny=0;
        
    kamatfelarKedvezmeny=jovedelem+szamla+forgKedvezmeny;
    kamatfelarKedvezmeny=kamatfelarKedvezmeny.math_round(2).toFixed(2);
    month = year*12;
    if ($('input[name="lhkamatozas"]:checked').val() == 1) {
        kamat=(parseFloat(buborKamat) + parseFloat(standardKamat) - parseFloat(kamatfelarKedvezmeny)).math_round(2);
    } else if ($('input[name="lhkamatozas"]:checked').val() == 2) {
        kamat=(parseFloat(kamat5Eves) - parseFloat(kamatfelarKedvezmeny)).math_round(2);
    } else if ($('input[name="lhkamatozas"]:checked').val() == 3) {
        kamat=(parseFloat(kamat10Eves) - parseFloat(kamatfelarKedvezmeny)).math_round(2);
    } else {
        throw "Invalid kamatozasTipus";
    }



    torleszto=((amount*((kamat/100)/12))/(1-(1/Math.pow((1+((kamat/100)/12)),month)))).math_round(2);

        //console.log("kamat5Eves"+kamat5Eves);
    
    /* THM */
    var thmTimeout = 100;
    var iterations = 0;
    var q = {'min'  : 0,
             'value': 0.5,
             'max'  : 1};
    while(true)
    {
        if (++iterations > thmTimeout) {
            throw "calculationsLakashitelKalkulator(): THM timeout reached";
            break;
        }
        
        var NPV=-1*(amount-0);
        //console.log("(-1*előző)"+NPV);
        for(i=1; i<=(year*12);i++)
            NPV+=torleszto/Math.pow((1+(q.value)),i);
        
        if(NPV>=-0.00005 && NPV<=0.00005)
            break;
        if(NPV>0.00005)
        {
            q.min=q.value;
            q.value=(q.min+q.max)/2;
        }
        else if(NPV<-0.00005)
        {
            q.max=q.value;
            q.value=(q.min+q.max)/2;
            
        }
    }
    thm=((Math.pow((1+q.value),12)-1)*100).math_round(2);
    
        $( '#interestRate' ).val( kamat.number_format(2,'','.') );
        $( '#thm' ).val(thm.toFixed(2)+" %");
        
    
    $( '#interestType' ).val($("input[name='lhkamatozas']:checked").attr('data-type-name'));
    $( '#discountType' ).val($("input[name='lhckedvezmeny_input']:checked").next('label').html());
    $( '#szamlaHidden' ).val($("input[name='lhckedvezmeny_input1']:checked").next('label').html());
    $( '#houseamountHidden' ).val(parseFloat($( "#kalkulatorHouseAmount" ).val().replace(/\D/g,"")));
    $( '#amountHidden' ).val(amount);
    $( '#kalkulatorAmount' ).val(Number(amount).number_format(0,'.','.')+" Ft" );
    $( '#kamatkedvHidden' ).val(kamatfelarKedvezmeny);
    $( '#monthHidden' ).val(month);
    $( '#installmentHidden' ).val(Math.round(torleszto));
    
    $( '#installment' ).val( Math.round(torleszto).number_format(0,'.','.')+" Ft" );
    $( '#kamatkedv' ).val(kamatfelarKedvezmeny);
}



function checkAdostars(){
    var year = $( "#slider-year" ).slider("value");   
    var age  = $( "#age" ).val();
    if (age != "valassz" || !age) {
        if( Number(age) < 21 || (Number( year ) + Number(age) ) > 69){
            $('div.ageSelect').attr('title','<span class="rafi-yellow1">Tájékoztatjuk, ha az igénylés beadásakor Ön nem éri el a 21 éves életkort, vagy ha a kölcsön lejáratakor betölti a 70 éves életkort, úgy az igénylés beadásához adóstárs bevonása szükséges.</span>');
            $('div.ageSelect').tooltip({trigger: 'manual',placement: 'top'}).tooltip('show');
        }else{
            $('div.ageSelect').tooltip('destroy');
            $('div.ageSelect').attr('title','<span class="rafi-yellow1">Válasszon!</span>');
        };
    }
}


/* CALCULATOR END */



function decrOssz() {
    var w = Number($( "#kalkulatorAmount" ).val().replace(/\D/g,""));
    if (w>(minAmount+stepAmount)) w=w-stepAmount;
    else w=minAmount;
    $("#kalkulatorAmount").val(w+" Ft");
    doCalculate( Number($( "#kalkulatorYear" ).val().replace(" év","")), Number($( "#kalkulatorAmount" ).val().replace(" Ft","")), Number($( "#kalkulatorHouseAmount" ).val().replace(" Ft","")) );
}
function incrOssz() {
    var w = Number($( "#kalkulatorAmount" ).val().replace(/\D/g,""));
    if (w<(maxosszeg-stepAmount)) w=w+stepAmount;
    else w=maxosszeg;
    $("#kalkulatorAmount").val(w+" Ft");
    doCalculate( Number($( "#kalkulatorYear" ).val().replace(" év","")), Number($( "#kalkulatorAmount" ).val().replace(" Ft","")), Number($( "#kalkulatorHouseAmount" ).val().replace(" Ft","")) );
}
function decrHouseOssz() {
    var w = Number($( "#kalkulatorHouseAmount" ).val().replace(/\D/g,""));
    if (w>(minHouseAmount+stepHouseAmount)) w=w-stepHouseAmount;
    else w=minHouseAmount;
    $("#kalkulatorHouseAmount").val(w+" Ft");
    doCalculate( Number($( "#kalkulatorYear" ).val().replace(" év","")), Number($( "#kalkulatorAmount" ).val().replace(" Ft","")), Number($( "#kalkulatorHouseAmount" ).val().replace(" Ft","")) );
}
function incrHouseOssz() {
    var w = Number($( "#kalkulatorHouseAmount" ).val().replace(/\D/g,""));
    if (w<(maxHouseAmount-stepHouseAmount)) w=w+stepHouseAmount;
    else w=maxHouseAmount;
    $("#kalkulatorHouseAmount").val(w+" Ft");
    doCalculate( Number($( "#kalkulatorYear" ).val().replace(" év","")), Number($( "#kalkulatorAmount" ).val().replace(" Ft","")), Number($( "#kalkulatorHouseAmount" ).val().replace(" Ft","")) );
}
function decrYear() {
    var w = Number($( "#kalkulatorYear" ).val().replace(" év",""));
    if (w>(minYear+stepYear)) w=w-stepYear;
    else w=minYear;
    $("#kalkulatorYear").val(w+" év");
    doCalculate( Number($( "#kalkulatorYear" ).val().replace(" év","")), Number($( "#kalkulatorAmount" ).val().replace(" Ft","")), Number($( "#kalkulatorHouseAmount" ).val().replace(" Ft","")) );
}
function incrYear() {
    var w = Number($( "#kalkulatorYear" ).val().replace(" év",""));
    if (w<(maxYear-stepYear)) w=w+stepYear;
    else w=maxYear;
    $("#kalkulatorYear").val(w+" év");
    doCalculate( Number($( "#kalkulatorYear" ).val().replace(" év","")), Number($( "#kalkulatorAmount" ).val().replace(" Ft","")), Number($( "#kalkulatorHouseAmount" ).val().replace(" Ft","")) );
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
