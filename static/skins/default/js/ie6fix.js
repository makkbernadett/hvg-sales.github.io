function ie6ImgTransparencyFix()
{
	var source, imgs=document.getElementsByTagName("img");
	for (j=0; j<imgs.length; j++)
		{
			if (!imgs[j].className.indexOf("transparent"))
				{
					source=imgs[j].src;
					imgs[j].src="http://medizona.hu/skins/default/img/spacer.gif";
					imgs[j].style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + source + "', sizingMethod=scale);";
				}
		}
}
window.onload=ie6ImgTransparencyFix;