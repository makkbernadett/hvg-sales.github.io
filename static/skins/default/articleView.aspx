<%@ Page Language="C#" MasterPageFile="~/skins/default/MasterPages/Default.master" ValidateRequest="false" %>
<%@ Import Namespace="CMS.Utilities" %>
<%@ Import Namespace="CMS.WebUtilities" %>
<%@ Import Namespace="CMS.WebUtilities.Components.Controls" %> 
<%@ Register TagPrefix="HVGControl" TagName="JoblineBox" Src="~/skins/default/controls/JoblineBox.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="ApronetBox" Src="~/skins/default/controls/ApronetBox.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="BreadCrumb" Src="~/skins/default/controls/BreadCrumb.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="ArticleView" Src="~/skins/default/controls/ArticleView.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="ColumnTapetaTop" Src="~/skins/default/controls/ColumnTapetaTop.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="ColumnTapetaSide" Src="~/skins/default/controls/ColumnTapetaSide.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="ColumnSuperBanner" Src="~/skins/default/controls/ColumnSuperBanner.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="ArticleListPubShortNews" Src="~/skins/default/controls/ArticleListPubShortNews.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="TapetaTopPublic" Src="~/skins/default/controls/TapetaTopPublic.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="OrangeSlider" Src="~/skins/default/controls/OrangeSlider.ascx" %>

<%@ Register TagPrefix="ColumnSponsor" Namespace="ColumnSponsor" Assembly="ColumnSponsor" %>

<asp:Content ContentPlaceHolderID="TapetaLeftSide" runat="server">
	<%if (RequestContext.CurrentColumn != null &&
		!String.IsNullOrEmpty(RequestContext.CurrentColumn.WebID) &&
		RequestContext.CurrentColumn.WebID == "_itthon") {%>
		
		<%--!-- Goa3 beépítés: Goa3 - HVG - Gasztro_H alak_bal, 1741173 -->
        <div id="zone1741173" class="goAdverticum" style="width: 120px; position: absolute; left: -120px; top: 0;"></div>
        <script type="text/javascript" src="http://imgs.adverticum.net/scripts/goa3/goa3.js"></script--%>
		
		<div style="width: 120px; position: absolute; left: -120px; top: 0;">
			<a target="_blank" href="http://ad.adverticum.net/b/cl,1,65476,1899409,1900615/click.prm">
				<img src="http://hvg.hu/skins/default/img/sponsor/Infiniti/120x600_1.jpg" alt="Infiniti" />
			</a>
		</div>

	<%}%>
</asp:Content>

<asp:Content ID="TapetaRightSide" ContentPlaceHolderID="TapetaRightSide" runat="server">
	<%if (RequestContext.CurrentColumn != null &&
		!String.IsNullOrEmpty(RequestContext.CurrentColumn.WebID) &&
		RequestContext.CurrentColumn.WebID == "_itthon") {%>
		<%--!-- Goa3 beépítés: Goa3 - HVG - Gasztro - H alak_jobb, 1741179 -->
        <div id="zone1741179" class="goAdverticum" style="width: 120px; position: absolute; right: -120px; top: 0;"></div>
        <script type="text/javascript" src="http://imgs.adverticum.net/scripts/goa3/goa3.js"></script--%>
		
		<div style="width: 120px; position: absolute; right: -120px; top: 0;">
			<a target="_blank" href="http://ad.adverticum.net/b/cl,1,65476,1899409,1900615/click.prm">
				<img src="http://hvg.hu/skins/default/img/sponsor/Infiniti/120x600_2.jpg" alt="Infiniti" />
			</a>
		</div>

	<%}%>
</asp:Content>

<asp:Content ContentPlaceHolderID="ContentPlaceHolder" runat="server">
    <HVGControl:ArticleView runat="server" ID="ctrlArticleView" />    
    <ColumnSponsor:PHDControl runat="server">
        <ColumnSponsor:ColumnItem ColumnList="w" runat="server" />
        <ColumnSponsor:DefaultColumnItem runat="server">
            <HVGControl:ApronetBox ID="ApronetBox1" runat="server" />
            <HVGControl:JoblineBox ID="JoblineBox1" runat="server" />
        </ColumnSponsor:DefaultColumnItem>
    </ColumnSponsor:PHDControl>
    <asp:PlaceHolder runat="server" ID="hldLeftBottom"></asp:PlaceHolder> 
</asp:Content>

<asp:Content ContentPlaceHolderID="SideBarHolder" runat="server">
    <%--<asp:PlaceHolder runat="server" ID="hldRightTopSpons"></asp:PlaceHolder>
    <br clear="all" />--%>
    <HVGControl:OrangeSlider id="orangeSlider" runat="server"/>
    <asp:PlaceHolder runat="server" ID="hldRightTop"></asp:PlaceHolder>
</asp:Content>

<asp:Content ContentPlaceHolderID="HeadBottom" runat="server">
    <%if (RequestContext.CurrentColumn.WebID != "w")
      { %>
        <HVGControl:BreadCrumb runat="server" />
    <%} %>
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="SuperBannerHolder" runat="server"><HVGControl:ColumnSuperBanner ID="ColumnSuperBanner1"  runat="server" /></asp:Content>

<asp:Content ContentPlaceHolderID="TapetaTopHolder" runat="server">
    <ColumnSponsor:PHDControl runat="server">
        <ColumnSponsor:ColumnItem ColumnList="w" runat="server">
            <%--<div class="publicist_head">
		        <iframe src="http://www.facebook.com/plugins/like.php?href=http://www.facebook.com/Wblog&amp;send=false&amp;layout=button_count&amp;width=55&amp;show_faces=false&amp;action=recommend&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="float: right; border: none; overflow: hidden; width: 135px; height: 21px; margin-right: 55px;" allowtransparency="true"></iframe>
		        <div class="cl"></div>
	        </div>--%>
	        <HVGControl:TapetaTopPublic runat="server" />
	    </ColumnSponsor:ColumnItem>
	    <ColumnSponsor:DefaultColumnItem>
	        <HVGControl:ColumnTapetaTop runat="server" />
	    </ColumnSponsor:DefaultColumnItem>
	</ColumnSponsor:PHDControl>    
    <%--<h1 class="articleCaption">
        <%=ctrlArticleView.Article != null && !ctrlArticleView.IsShortNews ? ctrlArticleView.Article.Caption : String.Empty%>
    </h1>--%>
    <div id="footLBannerForNotifier" style="float:right">
        <asp:PlaceHolder runat="server" ID="hldRightTopSpons" />
    </div>
</asp:Content>
<asp:Content ContentPlaceHolderID="ArticleCaption" runat="server">
    <h1 class="articleCaption" style="margin-bottom:10px;">
        <%=ctrlArticleView.Article != null && !ctrlArticleView.IsShortNews ? ctrlArticleView.Article.Caption : String.Empty%>
    </h1>
</asp:Content>
<asp:Content ContentPlaceHolderID="TapetaSideHolder" runat="server">
    <ColumnSponsor:PHDControl runat="server">
        <ColumnSponsor:ColumnItem ColumnList="w" runat="server">
            <%--HVGControl:ArticleListPubShortNews runat="server" /--%>
        </ColumnSponsor:ColumnItem>
        <ColumnSponsor:DefaultColumnItem runat="server">
            <HVGControl:ColumnTapetaSide runat="server" /> 
        </ColumnSponsor:DefaultColumnItem>
    </ColumnSponsor:PHDControl>
</asp:Content>

<asp:Content ContentPlaceHolderID="phdTitle" runat="server"><%=!RequestContext.CurrentColumn.Name.ToLower().Equals("egyeb") ? RequestContext.CurrentColumn.Name + ":" : String.Empty%> <%=ctrlArticleView.Article != null ? ctrlArticleView.Article.Caption : String.Empty%> - HVG.hu</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="HeadHolder" runat="server">
    <script type="text/javascript" src="https://apis.google.com/js/plusone.js">
            { lang: 'hu' }
    </script>
    <script language="javascript" type="text/javascript">
        var isFbConnected = false;
        var isHVGConnected = false;
    </script>
    <%=ctrlArticleView.Article != null ? "<link rel=\"canonical\" href=\"http://" + Request.Url.Host + PageNavigator.GetPublicArticleUrl(ctrlArticleView.Article) + "\" />" : String.Empty%>
    <script language="javascript" type="text/javascript" src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/js/jquery.validationEngine-hu.js"></script>
    <script language="javascript" type="text/javascript" src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/js/jquery.validationEngine.js"></script>
    <link rel="Stylesheet" type="text/css" href="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/Style/validationEngine.jquery.css" />    
    <script language="javascript" type="text/javascript" src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/js/article.js"></script>
    
    <link rel="Stylesheet" type="text/css" href="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/Style/Flyer/upprev_flyout.css" />
    <script language="javascript" type="text/javascript" src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/js/Flyer/flyer.js"></script>
    <%if (ctrlArticleView != null
          && ctrlArticleView.Article != null
          && ctrlArticleView.Article.Enabled
          && ctrlArticleView.DisplayMode != CMS.WebUtilities.Components.Controls.ArticleView.DisplayModes.preview)
      {%>          
    <script type="text/javascript">
        var merchantId = '1B2B1F1AAECDEF17';
        var host = 'http://cdn.scarabresearch.com';
        if (document.location.protocol === 'https:') {
            host = 'https://recommender.scarabresearch.com';
        }
        document.write(unescape("%3Cscript id='scarab-js-api' src='" +
        host + "/js/" + merchantId + "/scarab-v2.js'" +
        "type='text/javascript'%3E%3C/script%3E"));
        
    </script>
    <%} %>

    <link rel="Stylesheet" type="text/css" href="<%=ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/Style/Publicist/publicist.css" />
</asp:Content>

<asp:Content ContentPlaceHolderID="MetaHolder" runat="server">
    <meta property="og:title" content="<%=ctrlArticleView.Article != null ? ctrlArticleView.Article.Caption.Replace("\"", String.Empty) : String.Empty%>"/>
    <meta property="og:site_name" content="hvg.hu"/>
    <meta property="og:url" content="http://hvg.hu<%=ctrlArticleView.Article != null ? ctrlArticleView.URL : String.Empty%>"/> 
    <meta property="og:type" content="article"/>
    <meta property="og:author" content="HVG Kiadó Zrt."/>
    <meta property="og:image" content="<%=ctrlArticleView.Article != null && ctrlArticleView.Article.DefaultImageID.HasValue ? PageNavigator.ImageURL(RequestContext.CurrentSite, ctrlArticleView.Article.DefaultImageID.ToString(), "a7ce225f-67ef-4b6d-b77d-59581e02f304") : "http://www.hvg.hu/img/fb_hvg_hu.png"%>" />
    <meta name="description" content="<%=ctrlArticleView.Article != null ? RegexHelper.ReplaceQuot(ctrlArticleView.Article.Lead) : String.Empty %>" /> 
    <meta name="keywords" content="<%=!String.IsNullOrEmpty(ctrlArticleView.TagsText) ? RegexHelper.ReplaceQuot(ctrlArticleView.TagsText) : "hírek, itthon, világ, belföld, tudomány, hirek, sport, magazin, hírek, gazdaság, külföld, bulvár, belföld, hírgyűjtő, tech-tudomány, külföldi hírek, belföldi hírek, magyar hírek, külföldi hirek" %>" /> 
    <meta name="abstract" content="hírek, gazdaság, politika" /> 
    <meta name="subject" lang="HU" content="hírek, gazdaság, politika" /> 
    <%if (ctrlArticleView != null
          && ctrlArticleView.Article != null
          && ctrlArticleView.Article.Enabled
          && ctrlArticleView.DisplayMode != CMS.WebUtilities.Components.Controls.ArticleView.DisplayModes.preview)
      {%>
        <meta name="scarabImage" content="<%= ctrlArticleView.Article.DefaultImageID.HasValue ? ctrlArticleView.Article.DefaultImageID.Value.ToString() : "NA" %>" />
        <%--<meta name="category" value="default rovat > alrovat | további rovat1 > alrovat | további rovat2 > alrovat" />--%>
        <meta name="category" value="<%=ctrlArticleView.ColumnWebIDFeedForScarab %>" />
    <%} %>
</asp:Content>

<asp:Content ContentPlaceHolderID="BodyBottomHolder" runat="server">
    <div id="fb-root"></div>
    <%--<script src="http://connect.facebook.net/en_US/all.js"></script>

    <script>
        FB.init({ appId: '<%=System.Configuration.ConfigurationManager.AppSettings["APIKey"]%>', status: true, cookie: true, xfbml: true });
        FB.Event.subscribe('auth.sessionChange', function (response) {
            if (response.session) {
                OnFBLogged();
                // A user has logged in, and a new cookie has been saved
            } else {
                // The user has logged out, and the cookie has been cleared
            }
        });
    </script>--%>

    <%if (ctrlArticleView != null
          && ctrlArticleView.Article != null
          && ctrlArticleView.Article.Enabled
          && ctrlArticleView.DisplayMode != CMS.WebUtilities.Components.Controls.ArticleView.DisplayModes.preview)
      {%>
    <script>Scarab.view('<%=ctrlArticleView.Article != null ? ctrlArticleView.Article.WebID.Replace("'", "") : String.Empty %>');</script>        
    <script>Scarab.go();</script>    
    <%} %>

    <script type="text/javascript">

        window.fbAsyncInit = function () {

            FB.init({ appId: '<%=System.Configuration.ConfigurationManager.AppSettings["ApplicationId"]%>',
                status: true,
                cookie: true,
                xfbml: true,
                oauth: true

            });

            function updateButton(response) {

                if (response.authResponse) {
                    OnFBLogged();
                } else {

                }
            }

            FB.getLoginStatus(updateButton);

            FB.Event.subscribe('auth.statusChange', updateButton);
        };

        var e = document.createElement('script'); e.async = true;
        e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
        document.getElementById('fb-root').appendChild(e);
        
    </script>
 
</asp:Content>

<script runat="server">
    protected override void OnInit(EventArgs e)
    {
        if (RequestContext.CurrentColumn == null || RequestContext.CurrentColumn.EntityID == null || !RequestContext.CurrentColumn.EntityID.ID.HasValue)
        {
            Server.Transfer("~/skins/default/404.aspx");
            return;
        }

        if (orangeSlider != null && ctrlArticleView != null && ctrlArticleView.Article != null && !string.IsNullOrEmpty(ctrlArticleView.Article.WebID))
            orangeSlider.ArticlewebID = ctrlArticleView.Article.WebID.Replace("'", "");
        
        string mainColumnWebId = RequestContext.CurrentColumn.WebID.ToLower();
        if (RequestContext.CurrentColumn.ParentColumn != null && RequestContext.CurrentColumn.ParentColumn.EntityID != null && !String.IsNullOrEmpty(RequestContext.CurrentColumn.ParentColumn.WebID))
            mainColumnWebId = RequestContext.CurrentColumn.ParentColumn.WebID.ToLower();

        switch (mainColumnWebId)
        {
            case "itthon":
                AddLayout("4886", hldRightTopSpons);
                AddLayout("4589", hldRightTop);
                AddLayout("4668", hldLeftBottom);
                break;

            case "vilag":
                AddLayout("4887", hldRightTopSpons);
                AddLayout("4590", hldRightTop);
                AddLayout("4669", hldLeftBottom);
                break;

            case "gazdasag":
                AddLayout("4888", hldRightTopSpons);
                AddLayout("4591", hldRightTop);
                AddLayout("4670", hldLeftBottom);
                break;

            case "tudomany":
                AddLayout("4889", hldRightTopSpons);
                AddLayout("4592", hldRightTop);
                AddLayout("4671", hldLeftBottom);
                break;

            case "kultura":
                AddLayout("4890", hldRightTopSpons);
                AddLayout("4593", hldRightTop);
                AddLayout("4672", hldLeftBottom);
                break;

            case "sport":
                AddLayout("4891", hldRightTopSpons);
                AddLayout("4594", hldRightTop);
                AddLayout("4673", hldLeftBottom);
                break;

            case "kkv":
                AddLayout("4893", hldRightTopSpons);
                AddLayout("4595", hldRightTop);
                AddLayout("4674", hldLeftBottom);
                break;

            case "karrier":
                AddLayout("4894", hldRightTopSpons);
                AddLayout("4596", hldRightTop);
                AddLayout("4675", hldLeftBottom);
                break;

            case "egeszseg":
                AddLayout("4895", hldRightTopSpons);
                AddLayout("4597", hldRightTop);
                AddLayout("4676", hldLeftBottom);
                break;

            case "panorama":
                AddLayout("4896", hldRightTopSpons);
                AddLayout("4598", hldRightTop);
                AddLayout("4677", hldLeftBottom);
                break;

            case "gasztronomia":
                AddLayout("4897", hldRightTopSpons);
                AddLayout("4599", hldRightTop);
                AddLayout("4678", hldLeftBottom);
                break;

            case "cegauto":
                AddLayout("4898", hldRightTopSpons);
                AddLayout("4600", hldRightTop);
                AddLayout("4679", hldLeftBottom);
                break;

            case "velemeny":
                AddLayout("4899", hldRightTopSpons);
                AddLayout("4587", hldRightTop);
                AddLayout("4680", hldLeftBottom);
                break;

            case "gocpontok":
                AddLayout("4900", hldRightTopSpons);
                AddLayout("4701", hldRightTop);
                AddLayout("4681", hldLeftBottom);
                break;
            
            case "top500":
                AddLayout("4906", hldRightTopSpons);
                AddLayout("4810", hldRightTop);
                AddLayout("4681", hldLeftBottom);
                break;
            
            case "napi_merites":
                AddLayout("4901", hldRightTopSpons);
                AddLayout("4704", hldRightTop);
                AddLayout("4681", hldLeftBottom);
                break;

            case "focivb_2010":
                AddLayout("4904", hldRightTopSpons);
                AddLayout("4819", hldRightTop);
                AddLayout("4681", hldLeftBottom);
                break;

            case "sorkoveto":
                AddLayout("4903", hldRightTopSpons);
                AddLayout("4781", hldRightTop);
                AddLayout("4681", hldLeftBottom);
                break;
            
            case "pr_cikkek":
                AddLayout("4902", hldRightTopSpons);
                AddLayout("4818", hldRightTop);
                break;

            case "w":
                AddLayout("4905", hldRightTopSpons);
				AddLayout("4885", hldRightTop);
                break;
                
            default:
                AddLayout("4892", hldRightTopSpons);
                AddLayout("4602", hldRightTop);
                AddLayout("4681", hldLeftBottom);
                break;
        }       
    }

    private void AddLayout(string pageID, PlaceHolder placeHolder)
    {
        PageLayoutControl pgControl = new PageLayoutControl();
        pgControl.PageID = pageID;
        pgControl.TemplateItemName = "pageLayout";
        pgControl.IsCachingEnabled = true;
        pgControl.CacheSeconds = 30;

        placeHolder.Controls.AddAt(0, pgControl);
    }    
</script>
