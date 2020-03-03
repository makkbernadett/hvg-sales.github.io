// fules grafikonokat valtja
function tabimg(img, file) {
    obj = document.images ? document.images[img] : ((document.all) ? document.all[img] : document.getElementById(img));
    obj.src = "http://online.portfolio.hu/partner/hvg2010/graf/" + file + ".png";
    //obj.src = "http://online.portfolio.hu/partner/hvg-utf/graf/" + file + ".png";
}

// kibocsato popup 
function kibocsato(id) {
    //http://online.portfolio.hu/partner/hvg2010/kibocsato-12-alapadat.html
    kib = window.open("http://online.portfolio.hu/partner/hvg2010/kibocsato-" + id + "-alapadat.html", "kibocsatok", "toolbar=0,menubar=0,scrollbars,titlebar=0, statusbar=0,width=575,height=400");
    //kib = window.open("http://online.portfolio.hu/partner/hvg-utf/view.tdp?bet_kibocsato_popup.tdp?" + id, "kibocsatok", "toolbar=0,menubar=0,scrollbars,titlebar=0, statusbar=0,width=575,height=400");
    kib.focus();
}

// befalap hozam kalkulator popup 
function popup_befalap() {
    kib = window.open("http://online.portfolio.hu/partner/hvg2010/view.tdp?befalap_calc_popup.tdp", "hozamkalk", "toolbar=0,menubar=0,scrollbars=0,titlebar=0,statusbar=0,width=600,height=350");
    //kib = window.open("http://online.portfolio.hu/partner/hvg-utf/view.tdp?befalap_calc_popup.tdp", "hozamkalk", "toolbar=0,menubar=0,scrollbars=0,titlebar=0,statusbar=0,width=600,height=350");
    kib.focus();
}

// valutavalto popup 
function popup_valuta() {
    //http://online.portfolio.hu/partner/hvg2010/test/valutavalto.html
    kib = window.open("http://online.portfolio.hu/partner/hvg2010/valutavalto.html", "valutavalto", "toolbar=0,menubar=0,scrollbars=0,titlebar=0,statusbar=0,width=350,height=254");
    //kib = window.open("http://online.portfolio.hu/partner/hvg2010/view.tdp?valuta_popup.tdp", "valutavalto", "toolbar=0,menubar=0,scrollbars=0,titlebar=0,statusbar=0,width=350,height=254");
    //kib = window.open("http://online.portfolio.hu/partner/hvg-utf/view.tdp?valuta_popup.tdp", "valutavalto", "toolbar=0,menubar=0,scrollbars=0,titlebar=0,statusbar=0,width=350,height=254");
    kib.focus();
}