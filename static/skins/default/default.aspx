<%@ Page Language="C#" MasterPageFile="~/skins/default/MasterPages/Default.master" %>
<%@ Register TagPrefix="HVGControl" TagName="AdCloud" Src="~/skins/default/controls/cms/AdCloud.ascx" %>
<%--<%@ Register TagPrefix="HVGControl" TagName="PhotoVideoBox" Src="~/skins/default/controls/cms/PhotoVideoBox.ascx" %>--%>
<%@ Register TagPrefix="HVGControl" TagName="BlogOffers" Src="~/skins/default/controls/BlogOffers.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="HVGBlogOffers" Src="~/skins/default/controls/HVGBlogOffers.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="HVGPressBox" Src="~/skins/default/controls/cms/HVGPressBox.ascx" %>
<%--<%@ Register TagPrefix="HVGControl" TagName="HVGBooksBox" Src="~/skins/default/controls/cms/HVGBooksBox.ascx" %>--%>
<%@ Register TagPrefix="HVGControl" TagName="HVGOnlinePrintBox" Src="~/skins/default/controls/HVGOnlinePrintBox.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="IndexBox" Src="~/skins/default/controls/cms/IndexBox.ascx" %>
<%--<%@ Register TagPrefix="HVGControl" TagName="IndexBox" Src="~/skins/default/controls/IndexBox.ascx" %>--%>
<%@ Register TagPrefix="HVGControl" TagName="LatestNews" Src="~/skins/default/controls/LatestNews.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="BigPictureBox" Src="~/skins/default/controls/BigPictureBox.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="BigVideoBox" Src="~/skins/default/controls/VideoOfferBox.ascx" %>

<%@ Register TagPrefix="HVGControl" TagName="JoblineBox" Src="~/skins/default/controls/JoblineBox.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="ApronetBox" Src="~/skins/default/controls/ApronetBox.ascx" %>
<%--<%@ Register TagPrefix="HVGControl" TagName="Tematikus" Src="~/skins/default/controls/Tematikus.ascx" %>--%>
<%@ Register TagPrefix="HVGControl" TagName="_old_ColumnLeadings" Src="~/skins/default/controls/ColumnLeadingsNewDesigne.ascx" %>
<%--<%@ Register TagPrefix="HVGControl" TagName="ColumnLeadings" Src="~/skins/default/controls/ColumnLeadingsByNot.ascx" %>--%>
<%@ Register TagPrefix="HVGControl" TagName="HVGKlubBox" Src="~/skins/default/controls/cms/HVGKlubBox.ascx" %>
<%@ Register TagPrefix="CMSControl" TagName="DedicatedArticles" Src="~/skins/default/controls/ArticleIsDedicatedBox.ascx" %>

<asp:Content ContentPlaceHolderID="ContentPlaceHolder" runat="server">
    <div class="boxcontainer">
        <div class="box">
            <div class="boxbody">
                <div class="half">
                    <!--[if IE]><div class="hslice" id="hvg_vezeto_slice"><div class="entry-title" style="display: none;">hvg.hu vezető cikk</div><abbr class="ttl" title="10" /><div class="entry-content"><![endif]-->
                    <CMSControls:PageLayoutControl ID="PageLayoutControl4" runat="server" PageID="4551" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
                    <!--[if IE]></div></div><![endif]-->    
                    <HVGControl:LatestNews runat="server" />
                </div>                
                <div class="half">
                    <CMSControls:PageLayoutControl runat="server" PageID="4552" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
                </div>
            </div>
        </div>
    </div>  
       
    
    <CMSControls:PageLayoutControl runat="server" PageID="4705" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />                            
    <HVGControl:BigPictureBox runat="server" />
    <CMSControls:PageLayoutControl runat="server" PageID="5016" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
    <CMSControl:DedicatedArticles runat="server" SelectedArticlesNumber="4" DisplayAlreadyVisibleArticles="false" 
        Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
    <CMSControls:PageLayoutControl runat="server" PageID="4555" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
    
    <HVGControl:BigVideoBox runat="server" />
    <%--<HVGControl:ColumnLeadings runat="server" />--%>
    <HVGControl:_old_ColumnLeadings runat="server" />
    <CMSControls:PageLayoutControl runat="server" PageID="4556" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />                    
    <%--<HVGControl:Tematikus runat="server" /> old tematikus--%>
    <%-- Tematikus --%>
    <div id="topicpages" class="boxcontainer">
        <div class="box">
            <div class="boxtitle">
                <h6>TEMATIKUS OLDALAINK</h6>
            </div>
            <CMSControls:PageLayoutControl ID="PageLayoutControl4882" runat="server" PageID="4882" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
        </div>
    </div>
    <%-- /Tematikus --%>
    <CMSControls:PageLayoutControl runat="server" PageID="4557" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />                    
    <HVGControl:ApronetBox runat="server" />    
    <HVGControl:JoblineBox runat="server" />      
    <CMSControls:PageLayoutControl runat="server" PageID="4558" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />                    
    <HVGControl:AdCloud ZoneID="1" runat="server" />  
    
</asp:Content>

<asp:Content ContentPlaceHolderID="SideBarHolder" runat="server">
    <CMSControls:PageLayoutControl runat="server" PageID="4706" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
    <CMSControls:PageLayoutControl ID="PageLayoutControl2" runat="server" PageID="4559" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
    <%--<HVGControl:PhotoVideoBox runat="server" Visible="true"/>--%>
    <CMSControls:PageLayoutControl ID="PageLayoutControl3" runat="server" PageID="4811" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="false" CacheSeconds="30" />
   
     <br clear="all" />

    <CMSControls:XmlControl runat="server" Title="TÓTA W. ÁRPÁD" DocumentSource="~/cachedData/totaNewArticles.xml" TransformSource="~/skins/default/xsl/totaNewArticles.xslt" />
	<CMSControls:XmlControl runat="server" Title="TÓTA W. ÁRPÁD ALSÓ" DocumentSource="~/cachedData/nyuzsi.xml" TransformSource="~/skins/default/xsl/totaNewArticles_bottom.xslt" />	

    <HVGControl:HVGBlogOffers runat="server" />

    <CMSControls:PageLayoutControl runat="server" PageID="4586" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="false" CacheSeconds="30" />
    <HVGControl:BlogOffers runat="server" />

    <HVGControl:HVGPressBox runat="server" />
    <HVGControl:HVGKlubBox runat="server" />
    <%--<HVGControl:HVGBooksBox runat="server" />--%>
    <HVGControl:HVGOnlinePrintBox runat="server" />
    <HVGControl:IndexBox runat="server" />
    <CMSControls:PageLayoutControl runat="server" PageID="4573" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
</asp:Content>

<asp:Content ContentPlaceHolderID="HeadBottom" runat="server">
    <CMSControls:PageLayoutControl runat="server" PageID="4572" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
    <CMSControls:PageLayoutControl runat="server" PageID="4553" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
    <!--alt cimlap--> 
    <CMSControls:PageLayoutControl runat="server" PageID="4862" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />  
    <!--/alt cimlap--> <%-- 4862 --%>
    <%--AltCimlap<CMSControls:PageLayoutControl ID="PageLayoutControl4859" runat="server" PageID="4866" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />--%>
</asp:Content>

<asp:Content ContentPlaceHolderID="HeadHolder" runat="server">
    <!-- Lazy load JAIL -->
    <script language="javascript" type="text/javascript" src="<%=ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/js/JAIL/JAIL.js"></script>
    <script type="text/javascript">
        $(function() {
            $('img.framed2').asynchImageLoader({ effect: "fadeIn", speed: 1600 });
            //$('img.framed').asynchImageLoader();
        });
    </script>
    <!-- / -->

    <%--<link rel="Stylesheet" type="text/css" href="http://hvg.hu/static/skins/default/Style/_breaking.css" />--%>
    <link rel="Stylesheet" type="text/css" href="<%=ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/Style/_alterCover.css" />
</asp:Content>

<asp:Content ContentPlaceHolderID="SuperBannerHolder" runat="server">
    <CMSControls:PageLayoutControl ID="PageLayoutControl1" runat="server" PageID="4554" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />    
</asp:Content>

<asp:Content ContentPlaceHolderID="phdTitle" runat="server">HVG.hu - Főoldal</asp:Content>

