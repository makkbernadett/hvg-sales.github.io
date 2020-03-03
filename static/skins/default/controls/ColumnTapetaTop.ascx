<%@ Control Inherits="CMS.WebUtilities.Components.Controls.BaseControl" Language="C#" %>
<%@ Import Namespace="CMS.WebUtilities" %>
<%@ Import Namespace="CMS.WebUtilities.Components.Controls" %>

<div class="topAndLSponsor">
    <asp:PlaceHolder runat="server" ID="phdItthon" Visible="false">
        <div class="banner01">
            <div class="bannercontainer"><img alt="banner940" src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/banner940.jpg"/></div>
        </div>
    </asp:PlaceHolder>
	
    <asp:PlaceHolder runat="server" ID="phdcegauto" Visible="false">
	    <div id="zone63758" class="goAdverticum"></div>
    </asp:PlaceHolder>
	
    <asp:PlaceHolder runat="server" ID="phdsport" Visible="false">
        <div id="zone63755" class="goAdverticum"></div>	                
    </asp:PlaceHolder>
	
    <asp:PlaceHolder runat="server" ID="phdgazdasag" Visible="false">
        <style type="text/css">
            h1.articleCaption { width: 610px; display: inline; float: left;}
            #newsNotification { width: 620px; }
            .topAndLSponsor { margin: 0 0 10px 10px; }
			#footLBannerForNotifier { margin: 0 10px 10px 0; }
            <%= QueryStringParser.Exist("articleWebID") ? "#pg-sidecolumn { /*margin-top: -40px;*/}" : string.Empty%>
        </style>

		<div id="zone63727" class="goAdverticum" style="width:960px; overflow:hidden;"></div>

    </asp:PlaceHolder>
	
    <asp:PlaceHolder runat="server" ID="phdkkv" Visible="false">
        <style type="text/css">
            h1.articleCaption { width: 610px; display: inline; float: left;}
            #newsNotification { width: 620px; }
            .topAndLSponsor { margin: 0 0 10px 10px; }
            <%= QueryStringParser.Exist("articleWebID") ? "#pg-sidecolumn { /*margin-top: -40px;*/}" : string.Empty%>
        </style>
		
        <div id="zone63759" class="goAdverticum"></div> 
    </asp:PlaceHolder>	
	
    <asp:PlaceHolder runat="server" ID="phdtudomany" Visible="false">
		<style type="text/css">
            h1.articleCaption { width: 610px; display: inline; float: left;}
            #newsNotification { width: 620px; }
            .topAndLSponsor { margin: 0 0 10px 10px; }
			#footLBannerForNotifier { margin: 0 10px 10px 0; }
            <%= QueryStringParser.Exist("articleWebID") ? "#pg-sidecolumn { /*margin-top: -40px;*/}" : string.Empty%>
        </style>
		
		<div id="zone1921218" class="goAdverticum"></div>
    </asp:PlaceHolder>

    <asp:PlaceHolder runat="server" ID="phdEgeszseg" Visible="false">
		<style type="text/css">
            h1.articleCaption { width: 610px; display: inline; float: left;}
            #newsNotification { width: 620px; }
            .topAndLSponsor { margin: 0 0 10px 10px; }
			#footLBannerForNotifier { margin: 0 10px 10px 0; }
            <%= QueryStringParser.Exist("articleWebID") ? "#pg-sidecolumn { /*margin-top: -40px;*/}" : string.Empty%>
        </style>
		
		<div id="zone63760" class="goAdverticum"></div>
    </asp:PlaceHolder>

    <%--<asp:PlaceHolder runat="server" ID="activeLBannerStyle" Visible="false">
        <style type="text/css">
            h1.articleCaption { width: 580px; }
            #newsNotification { width: 580px; }
            #pg-sidecolumn { padding: 190px 0 0; }
            .topAndLSponsor { position: relative; }
            .topAndLSponsor .banner2 {
                position: absolute;
                top: 50px;
                right: 10px;
            }
        </style>
    </asp:PlaceHolder>--%>
    <%--<asp:PlaceHolder runat="server" ID="activeLBannerStyleIsNotAvaiable" Visible="true">
        <style type="text/css">
            .topAndLSponsor {float:right; padding: 0 10px;}
        </style>
    </asp:PlaceHolder>--%>

    <%--<asp:PlaceHolder runat="server" ID="hldRightTopSpons" />--%>
</div>
<script runat="server">
    protected override void OnInit(EventArgs e)
    {
        if (RequestContext.CurrentColumn == null || RequestContext.CurrentColumn.EntityID == null || !RequestContext.CurrentColumn.EntityID.ID.HasValue)
        {
            this.Visible = false;
            return;
        }

        string mainColumnWebId = RequestContext.CurrentColumn.WebID.ToLower();
        if (RequestContext.CurrentColumn.ParentColumn != null && RequestContext.CurrentColumn.ParentColumn.EntityID != null && !String.IsNullOrEmpty(RequestContext.CurrentColumn.ParentColumn.WebID))
            mainColumnWebId = RequestContext.CurrentColumn.ParentColumn.WebID.ToLower();
            
        switch (mainColumnWebId)
        { 
            case "cegauto":
                phdcegauto.Visible = false;
                /*activeLBannerStyle.Visible = true;
                activeLBannerStyleIsNotAvaiable.Visible = false;*/
                break;     
                
             case "sport":
                phdsport.Visible = false;
                /*activeLBannerStyle.Visible = true;
                activeLBannerStyleIsNotAvaiable.Visible = false;*/
                break;            
              
            case "gazdasag":
                phdgazdasag.Visible = true;
                //activeLBannerStyle.Visible = true;
                //activeLBannerStyleIsNotAvaiable.Visible = false;
                break;

            case "tudomany":
                phdtudomany.Visible = true;
                //activeLBannerStyle.Visible = true;
                //activeLBannerStyleIsNotAvaiable.Visible = false;
                break;
                
            case "kkv":
                phdkkv.Visible = true;
                /*activeLBannerStyle.Visible = true;
                activeLBannerStyleIsNotAvaiable.Visible = false;*/
                break;

            case "egeszseg":
                phdEgeszseg.Visible = true;
                break;
        }
        
        /*switch (mainColumnWebId)
        {
            case "itthon":
                AddLayout("4886", hldRightTopSpons);
                break;

            case "vilag":
                //AddLayout("4888", hldRightTopSpons);
                //AddLayout("4887", hldRightTopSpons);
                break;

            case "gazdasag":
                AddLayout("4888", hldRightTopSpons);
                break;

            case "tudomany":
                AddLayout("4889", hldRightTopSpons);
                break;

            case "kultura":
                AddLayout("4890", hldRightTopSpons);
                break;

            case "sport":
                AddLayout("4891", hldRightTopSpons);
                break;

            case "kkv":
                AddLayout("4893", hldRightTopSpons);
                break;

            case "karrier":
                AddLayout("4894", hldRightTopSpons);
                break;

            case "egeszseg":
                AddLayout("4895", hldRightTopSpons);
                break;

            case "panorama":
                AddLayout("4896", hldRightTopSpons);
                break;

            case "gasztronomia":
                AddLayout("4897", hldRightTopSpons);
                break;

            case "cegauto":
                AddLayout("4898", hldRightTopSpons);
                break;

            case "velemeny":
                AddLayout("4899", hldRightTopSpons);
                break;

            case "gocpontok":
                AddLayout("4900", hldRightTopSpons);
                break;
            
            case "top500":
                AddLayout("4906", hldRightTopSpons);
                break;
            
            case "napi_merites":
                AddLayout("4901", hldRightTopSpons);
                break;

            case "focivb_2010":
                AddLayout("4904", hldRightTopSpons);
                break;

            case "sorkoveto":
                AddLayout("4903", hldRightTopSpons);
                break;
            
            case "pr_cikkek":
                AddLayout("4902", hldRightTopSpons);
                break;

            case "w":
                AddLayout("4905", hldRightTopSpons);
                break;
                
            default:
                AddLayout("4892", hldRightTopSpons);
                break;
        }       */
    }

    /*private void AddLayout(string pageID, PlaceHolder placeHolder)
    {
        PageLayoutControl pgControl = new PageLayoutControl();
        pgControl.PageID = pageID;
        pgControl.TemplateItemName = "pageLayout";
        pgControl.IsCachingEnabled = true;
        pgControl.CacheSeconds = 30;

        placeHolder.Controls.AddAt(0, pgControl);
    }*/
    
</script>