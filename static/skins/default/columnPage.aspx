<%@ Page Language="C#" MasterPageFile="~/skins/default/MasterPages/Default.master" %>
<%@ Import Namespace="CMS.WebUtilities" %> 
<%@ Import Namespace="CMS.WebUtilities.Components.Controls" %> 
<%@ Register TagPrefix="HVGControl" TagName="JoblineBox" Src="~/skins/default/controls/JoblineBox.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="ApronetBox" Src="~/skins/default/controls/ApronetBox.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="BreadCrumb" Src="~/skins/default/controls/BreadCrumb.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="ColumnSuperBanner" Src="~/skins/default/controls/ColumnSuperBanner.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="ColumnTapetaTop" Src="~/skins/default/controls/ColumnTapetaTop.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="ColumnTapetaSide" Src="~/skins/default/controls/ColumnTapetaSide.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="ArticleList" Src="~/skins/default/controls/cms/articleList.ascx" %>

<%@ Register TagPrefix="ColumnSponsor" Namespace="ColumnSponsor" Assembly="ColumnSponsor" %>

<asp:Content ID="TapetaLeftSide" ContentPlaceHolderID="TapetaLeftSide" runat="server">
	<%if (RequestContext.CurrentColumn != null &&
		!String.IsNullOrEmpty(RequestContext.CurrentColumn.WebID) &&
		RequestContext.CurrentColumn.WebID == "_itthon") {%>
		
		<%--script type='text/javascript' src='http://imgs.adverticum.net/scripts/goa3/goa3.js'></script>
		<div id='zone1713794' class='goAdverticum' style="width: 120px; position: absolute; left: -120px; top: 0;"></div>
		<!-- (c) 2000-2011 Gemius SA ver 1.4 Impressions: 1st round/HVG Online/HVG/Gazdaság/Kapu-120x950bal, merokod -->
		<img src='http://ghu.hit.gemius.pl/redot.gif?id=ba06sU9Cp9NazzhpJTjIAZYl..LdOKPFHLJlxClPyET.e7/stparam=kamjktpkao' border='0'></img--%>
		
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
		<%--script type='text/javascript' src='http://imgs.adverticum.net/scripts/goa3/goa3.js'></script>
		<div id='zone1713792' class='goAdverticum' style='width: 120px; position: absolute; right: -120px; top: 0;"></div>
		<!-- (c) 2000-2011 Gemius SA ver 1.4 Impressions: 1st round/HVG Online/HVG/Gazdaság/Kapu-120x950jobb, merokod -->
		<img src='http://ghu.hit.gemius.pl/redot.gif?id=ba06sU9Cp9NazzhpJTjIAZYl..LdOKPFHLJlxClPyET.e7/stparam=rcrmelnizd' border='0'></img--%>
		
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
    <%--<asp:PlaceHolder runat="server" ID="hldLeadingItem"></asp:PlaceHolder>--%>
    <ColumnSponsor:PHDControl ID="phdLeadingItem" runat="server">
        <ColumnSponsor:ColumnItem ColumnList="itthon" runat="server">
            <CMSControls:PageLayoutControl ID="PageLayoutControl1" runat="server" PageID="4560" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
        </ColumnSponsor:ColumnItem>
        <ColumnSponsor:ColumnItem ColumnList="vilag" runat="server">
            <CMSControls:PageLayoutControl ID="PageLayoutControl2" runat="server" PageID="4561" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
        </ColumnSponsor:ColumnItem>
        <ColumnSponsor:ColumnItem ColumnList="gazdasag" runat="server">
            <CMSControls:PageLayoutControl ID="PageLayoutControl3" runat="server" PageID="4562" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
        </ColumnSponsor:ColumnItem>
        <ColumnSponsor:ColumnItem ColumnList="tudomany" runat="server">
            <CMSControls:PageLayoutControl ID="PageLayoutControl4" runat="server" PageID="4563" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
        </ColumnSponsor:ColumnItem>
        <ColumnSponsor:ColumnItem ColumnList="kultura" runat="server">
            <CMSControls:PageLayoutControl ID="PageLayoutControl5" runat="server" PageID="4564" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
        </ColumnSponsor:ColumnItem>
        <ColumnSponsor:ColumnItem ColumnList="sport" runat="server">
            <CMSControls:PageLayoutControl ID="PageLayoutControl6" runat="server" PageID="4565" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
        </ColumnSponsor:ColumnItem>
        <ColumnSponsor:ColumnItem ColumnList="kkv" runat="server">
            <CMSControls:PageLayoutControl ID="PageLayoutControl7" runat="server" PageID="4566" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
        </ColumnSponsor:ColumnItem>
        <ColumnSponsor:ColumnItem ColumnList="karrier" runat="server">
            <CMSControls:PageLayoutControl ID="PageLayoutControl8" runat="server" PageID="4567" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
        </ColumnSponsor:ColumnItem>
        <ColumnSponsor:ColumnItem ColumnList="egeszseg" runat="server">
            <CMSControls:PageLayoutControl ID="PageLayoutControl9" runat="server" PageID="4568" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
        </ColumnSponsor:ColumnItem>
        <ColumnSponsor:ColumnItem ColumnList="panorama" runat="server">
            <CMSControls:PageLayoutControl ID="PageLayoutControl10" runat="server" PageID="4569" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
        </ColumnSponsor:ColumnItem>
        <ColumnSponsor:ColumnItem ColumnList="gasztronomia" runat="server">
            <CMSControls:PageLayoutControl ID="PageLayoutControl11" runat="server" PageID="4570" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
        </ColumnSponsor:ColumnItem>
        <ColumnSponsor:ColumnItem ColumnList="velemeny" runat="server">
            <CMSControls:PageLayoutControl ID="PageLayoutControl12" runat="server" PageID="4588" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
        </ColumnSponsor:ColumnItem>
        <ColumnSponsor:ColumnItem ColumnList="cegauto" runat="server">
            <CMSControls:PageLayoutControl ID="PageLayoutControl13" runat="server" PageID="4571" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
        </ColumnSponsor:ColumnItem>
        <%--<ColumnSponsor:DefaultColumnItem runat="server" />--%>
    </ColumnSponsor:PHDControl>
    <HVGControl:ArticleList runat="server" PageSize="20" ShowLinkedArticles="false" ID="ctlrArticleList"
        Visible="true" DisplayAlreadyVisibleArticles="false"/>                 
    <asp:PlaceHolder runat="server" ID="phdMore" Visible="false">
        <a class="more2" href="/<%=RequestContext.CurrentColumn.WebID %><%=RequestContext.CurrentSubColumn != null && !String.IsNullOrEmpty(RequestContext.CurrentSubColumn.WebID) ? "." + RequestContext.CurrentSubColumn.WebID : String.Empty%>/2" title="a rovat további cikkei" style="margin-top: 10px;" >a rovat további cikkei &raquo;</a> 
        <br clear="all" />
    </asp:PlaceHolder>         
    <HVGControl:ApronetBox runat="server" />     
    <HVGControl:JoblineBox runat="server" />    
    <asp:PlaceHolder runat="server" ID="hldLeftBottom"></asp:PlaceHolder>
</asp:Content>

<asp:Content ContentPlaceHolderID="SideBarHolder" runat="server">
    <asp:PlaceHolder runat="server" ID="hldRightTopSpons"></asp:PlaceHolder>
    <asp:PlaceHolder runat="server" ID="hldRightTop"></asp:PlaceHolder>    
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadBottom" runat="server">
    <asp:PlaceHolder runat="server" ID="hldTopTags"></asp:PlaceHolder>    
    <HVGControl:BreadCrumb runat="server" />
</asp:Content>

<asp:Content ContentPlaceHolderID="phdTitle" runat="server"><%=RequestContext.CurrentColumn.Name %> - HVG.hu</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="TapetaTopHolder" runat="server">
    <HVGControl:ColumnTapetaTop runat="server" />    
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="TapetaSideHolder" runat="server">
    <HVGControl:ColumnTapetaSide runat="server" />
</asp:Content>

<asp:Content ContentPlaceHolderID="SuperBannerHolder" runat="server">
    <HVGControl:ColumnSuperBanner  runat="server" />  
</asp:Content>

<script runat="server">
    protected override void OnInit(EventArgs e)
    {
        if (RequestContext.CurrentColumn == null || RequestContext.CurrentColumn.EntityID == null || !RequestContext.CurrentColumn.EntityID.ID.HasValue)
        {
            Server.Transfer("~/skins/default/404.aspx");
            return;
        }

        string mainColumnWebId = RequestContext.CurrentColumn.WebID.ToLower();
        if (RequestContext.CurrentColumn.ParentColumn != null && RequestContext.CurrentColumn.ParentColumn.EntityID != null && !String.IsNullOrEmpty(RequestContext.CurrentColumn.ParentColumn.WebID))
            mainColumnWebId = RequestContext.CurrentColumn.ParentColumn.WebID.ToLower();

        switch (mainColumnWebId)
        {
            case "itthon":
                /*if (RequestContext.CurrentSubColumn == null)                    
                    AddLeadingLayout("4560");*/
                AddLayout("4886", hldRightTopSpons);
                AddLayout("4589", hldRightTop);
                AddLayout("4668", hldLeftBottom);
                AddLayout("4797", hldTopTags);
                break;

            case "vilag":
                /*if (RequestContext.CurrentSubColumn == null)                    
                     AddLeadingLayout("4561");*/
                AddLayout("4887", hldRightTopSpons);
                AddLayout("4590", hldRightTop);
                AddLayout("4669", hldLeftBottom);
                AddLayout("4798", hldTopTags);
                break;

            case "gazdasag":
                /*if (RequestContext.CurrentSubColumn == null)                    
                    AddLeadingLayout("4562");*/
                AddLayout("4888", hldRightTopSpons);
                AddLayout("4591", hldRightTop);
                AddLayout("4670", hldLeftBottom);
                AddLayout("4799", hldTopTags);
                break;

            case "tudomany":
                /*if (RequestContext.CurrentSubColumn == null)                    
                    AddLeadingLayout("4563");*/
                AddLayout("4889", hldRightTopSpons);
                AddLayout("4592", hldRightTop);
                AddLayout("4671", hldLeftBottom);
                AddLayout("4800", hldTopTags);
                break;

            case "kultura":
                /*if (RequestContext.CurrentSubColumn == null)                    
                    AddLeadingLayout("4564");*/
                AddLayout("4890", hldRightTopSpons);
                AddLayout("4593", hldRightTop);
                AddLayout("4672", hldLeftBottom);
                AddLayout("4801", hldTopTags);
                break;

            case "sport":
                /*if (RequestContext.CurrentSubColumn == null)                    
                    AddLeadingLayout("4565");*/
                AddLayout("4891", hldRightTopSpons);
                AddLayout("4594", hldRightTop);
                AddLayout("4673", hldLeftBottom);
                AddLayout("4802", hldTopTags);
                break;

            case "kkv":
                /*if (RequestContext.CurrentSubColumn == null)                    
                    AddLeadingLayout("4566");*/
                AddLayout("4893", hldRightTopSpons);
                AddLayout("4595", hldRightTop);
                AddLayout("4674", hldLeftBottom);
                AddLayout("4803", hldTopTags);
                break;

            case "karrier":
                /*if (RequestContext.CurrentSubColumn == null)                    
                    AddLeadingLayout("4567");*/
                AddLayout("4894", hldRightTopSpons);
                AddLayout("4596", hldRightTop);
                AddLayout("4675", hldLeftBottom);
                AddLayout("4804", hldTopTags);
                break;

            case "egeszseg":
                /*if (RequestContext.CurrentSubColumn == null)                    
                    AddLeadingLayout("4568");*/
                AddLayout("4895", hldRightTopSpons);
                AddLayout("4597", hldRightTop);
                AddLayout("4676", hldLeftBottom);
                AddLayout("4805", hldTopTags);
                break;

            case "panorama":
                /*if (RequestContext.CurrentSubColumn == null)                    
                    AddLeadingLayout("4569");*/
                AddLayout("4896", hldRightTopSpons);
                AddLayout("4598", hldRightTop);
                AddLayout("4677", hldLeftBottom);
                AddLayout("4806", hldTopTags);
                break;

            case "gasztronomia":
                /*if (RequestContext.CurrentSubColumn == null)                    
                    AddLeadingLayout("4570");*/
                AddLayout("4897", hldRightTopSpons);
                AddLayout("4599", hldRightTop);
                AddLayout("4678", hldLeftBottom);
                AddLayout("4807", hldTopTags);
                break;


            case "velemeny":
                /*if (RequestContext.CurrentSubColumn == null)
                    AddLeadingLayout("4588");*/
                AddLayout("4899", hldRightTopSpons);
                AddLayout("4587", hldRightTop);
                AddLayout("4680", hldLeftBottom);
                AddLayout("4809", hldTopTags);
                break;

            case "cegauto":
                /*if (RequestContext.CurrentSubColumn == null)                    
                    AddLeadingLayout("4571");*/
                AddLayout("4898", hldRightTopSpons);
                AddLayout("4600", hldRightTop);
                AddLayout("4679", hldLeftBottom);
                AddLayout("4808", hldTopTags);
                break;

            case "gocpontok":
                AddLayout("4900", hldRightTopSpons);
                AddLayout("4701", hldRightTop);
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

            case "top500":
                AddLayout("4906", hldRightTopSpons);
                AddLayout("4810", hldRightTop);
                AddLayout("4681", hldLeftBottom);
                break;

            default:
                AddLayout("4892", hldRightTopSpons);
                if (RequestContext.CurrentSubColumn == null)
                    AddLayout("4602", hldRightTop);
                AddLayout("4681", hldLeftBottom);
                break;
        }

        if (QueryStringParser.GetInt("pageIndex", 1) <= 1)
            ctlrArticleList.DisplayAlreadyVisibleArticles = false;

        if (!QueryStringParser.Exist("pageIndex"))
        {
            ctlrArticleList.GetEntityCounter = false;
        }
    }

    protected override void OnPreRender(EventArgs e)
    {
        if (!QueryStringParser.Exist("pageIndex"))
        {
            phdMore.Visible = true;
        }
    }

    /*private void AddLeadingLayout(string pageID)
    {
        if (QueryStringParser.GetInt("pageIndex", 1) <= 1)
        {
            PageLayoutControl pgControl = new PageLayoutControl();
            pgControl.PageID = pageID;
            pgControl.TemplateItemName = "pageLayout";
            pgControl.IsCachingEnabled = true;
            pgControl.CacheSeconds = 30;

            hldLeadingItem.Controls.AddAt(0, pgControl);
        }
    }*/

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