<%@ Control Language="c#" Inherits="CMS.WebUtilities.Components.Controls.BaseControl" %>
<%--<%@ OutputCache Duration="60" VaryByParam="*" %>--%>
<%@ Import Namespace="CMS.BusinessEntities" %>
<%@ Import Namespace="CMS.WebUtilities.Components.Controls" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="CMS.BusinessProcess.Managers.Content" %>
<%@ Import Namespace="CMS.BusinessProcess.Managers" %>
<%@ Import Namespace="CMS.WebUtilities" %>
<%@ Import Namespace="CMS.Utilities" %>
<%@ Import Namespace="CMS.BusinessEntities.Providers" %>
<%@ Import Namespace="CMS.Utilities.Providers.Cache" %>

<asp:Repeater ID="rptArticles" runat="server">
    <HeaderTemplate>
        <div class="boxcontainer pr-article">
			<div class="box">
				<div class="boxtitle"><h6>AJÁNLAT</h6></div>
				<div class="greyboxbody">
    </HeaderTemplate>
    <FooterTemplate>
                </div>
			</div>
		</div>
    </FooterTemplate>
    <ItemTemplate>
        <h5><a href="<%# ArticleUrl(((PRArticleItem)Container.DataItem).LeadingArticle) %>" title="<%# ((PRArticleItem)Container.DataItem).Caption%>"><%# ((PRArticleItem)Container.DataItem).Caption%></a></h5>
		<p><%# ControlHelper.CheckMaxLength(((PRArticleItem)Container.DataItem).Lead,203)%></p>
        <%# ((PRArticleItem)Container.DataItem).AdvertCode%>
    </ItemTemplate>
</asp:Repeater>

<script runat="server">

    private decimal? pageLayoutID = 5015;
    private List<PRArticleItem> articleItems = new List<PRArticleItem>();

    /*public Decimal PageLayoutID
    {
        set
        {
            if (pageLayoutID != value)
            {
                pageLayoutID = value;
            }
        }
    }*/

    protected override void  OnPreRender(EventArgs e)
    {
 	    base.OnPreRender(e);
        if (rptArticles != null)
        {
            if (articleItems != null && articleItems.Count > 0)
            {
                rptArticles.DataSource = articleItems;
                rptArticles.DataBind();
            }
            else
                rptArticles.Visible = false;
        }
    }

    protected override void OnInit(EventArgs e)
    {
        if (RequestContext.CurrentColumn != null && !string.IsNullOrEmpty(RequestContext.CurrentColumn.WebID))
        {
            string mainColumnWebId = RequestContext.CurrentColumn.WebID.ToLower();
            
            if (RequestContext.CurrentColumn != null && !string.IsNullOrEmpty(RequestContext.CurrentColumn.WebID))
                mainColumnWebId = RequestContext.CurrentColumn.WebID.ToLower();

            switch (mainColumnWebId)
            {
                case "itthon" :
                    pageLayoutID = 5017;
                    break;
                case "vilag":
                    pageLayoutID = 5019;
                    break;
                case "gazdasag":
                    pageLayoutID = 5021;
                    break;
                case "tudomany":
                    pageLayoutID = 5023;
                    break;
                case "kultura":
                    pageLayoutID = 5025;
                    break;
                case "sport":
                    pageLayoutID = 5027;
                    break;
                case "kkv":
                    pageLayoutID = 5029;
                    break;
                case "karrier":
                    pageLayoutID = 5031;
                    break;
                case "egeszseg":
                    pageLayoutID = 5033;
                    break;
                case "pannorama":
                    pageLayoutID = 5035;
                    break;
                case "gasztro":
                    pageLayoutID = 5037;
                    break;
                case "cegauto":
                    pageLayoutID = 5039;
                    break;
                case "velemeny":
                    pageLayoutID = 5041;
                    break;
                default:
                    pageLayoutID = 5015;
                    break;
            }
        }
        if (this.Visible && pageLayoutID.HasValue)
        {
            StringBuilder builder = new StringBuilder();
            TemplateItemName = "PRArticleItemControl";
            builder.AppendFormat("{0}#{1}#{2}", TemplateItemName, pageLayoutID.Value, RequestContext.SkinID.HasValue ? RequestContext.SkinID.Value.ToString() : String.Empty);
            cacheKey = builder.ToString();

            if (this.IsCached)
                return;
                
            ContentManagerProviderBase manager = ManagerFactory.ContentManagerProvider;
            string data = manager.GetPageItemData(pageLayoutID.Value);
            if (!String.IsNullOrEmpty(data))
            {
                //Look for template items
                Regex regEx = new Regex(@"<\s*\#{3}\s*([^\s]*)\s*([^#]*)\#{3}\s*>(.*?)<\s*\#{3}\s*(/[^\s]*)\s*\#{3}\s*>", RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.IgnorePatternWhitespace);
                MatchCollection collection = regEx.Matches(data);
                if (collection.Count != 0)
                {
                    List<Dictionary<string, string>> controls = new List<Dictionary<string, string>>();

                    MatchCollection matchCollection = regEx.Matches(data);
                    foreach (Match match in matchCollection)
                    {
                        string innerdata = match.Groups[0].Value;
                        string templateItemName = match.Groups[1].Value;
                        string parameterList = match.Groups[2].Value;
                        string innerParameterList = match.Groups[3].Value;

                        if (templateItemName.ToLower().Equals("prarticleitem"))
                        {
                            Regex paramRegEx = new Regex(@"([^=]*)=""([^\""]*)""\s*", RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.IgnorePatternWhitespace);
                            if (paramRegEx.IsMatch(parameterList))
                            {
                                Dictionary<string, string> controlParameters = new Dictionary<string, string>();

                                MatchCollection parammatchCollection = paramRegEx.Matches(parameterList);
                                foreach (Match parammatch in parammatchCollection)
                                {
                                    string propertyName = parammatch.Groups[1].Value;
                                    string propertyValue = parammatch.Groups[2].Value;

                                    if (!controlParameters.ContainsKey(propertyName.ToLower()))
                                        controlParameters.Add(propertyName.ToLower(), propertyValue);
                                }

                                controls.Add(controlParameters);
                            }
                        }
                    }

                    //Végigmenni az elemeken
                    foreach (Dictionary<string, string> controlParameters in controls)
                    {
                        if (!controlParameters.ContainsKey("articleid") || !controlParameters.ContainsKey("isprenabled") || controlParameters["isprenabled"].ToLower() != "true")
                            continue;

                        PRArticleItem entity = new PRArticleItem();

                        entity.ArticleID = new Guid(controlParameters["articleid"]);

                        if (controlParameters.ContainsKey("caption"))
                            entity.Caption = controlParameters["caption"];

                        if (controlParameters.ContainsKey("subcaption"))
                            entity.SubCaption = controlParameters["subcaption"];

                        if (controlParameters.ContainsKey("lead"))
                            entity.Lead = controlParameters["lead"];

                        if (controlParameters.ContainsKey("imageid") && RegexHelper.IsGuid(controlParameters["imageid"]))
                            entity.ImageID = new Guid(controlParameters["imageid"]);

                        if (controlParameters.ContainsKey("imagealt"))
                            entity.ImageAlt = controlParameters["imagealt"];

                        if (controlParameters.ContainsKey("imagedescription"))
                            entity.ImageDescription = controlParameters["imagedescription"];

                        if (controlParameters.ContainsKey("imagesource"))
                            entity.ImageDescription = controlParameters["imagesource"];
                            
                        if (controlParameters.ContainsKey("advertcode"))
                            entity.AdvertCode = controlParameters["advertcode"];

                        entity.LeadingArticle = BusinessEntityProviderManager.Provider.GetArticleBaseEntity();
                        entity.LeadingArticle.EntityID = new StringEntityID(entity.ArticleID.ToString());
                        entity.LeadingArticle.Load();

                        articleItems.Add(entity);
                    }
                }
            }
        }
    }

    protected string ImageUrl(string viewID, PRArticleItem entity)
    {
        if (!entity.ImageID.HasValue)
            return String.Empty;

        return PageNavigator.ImageURL(RequestContext.CurrentSite, entity.ImageID.Value.ToString(), viewID);
    }

    protected string ArticleUrl(ArticleBaseEntity entity)
    {
        return PageNavigator.GetPublicArticleUrl(entity);
    }

    private object GetFromCache(string itemKey, string cacheKey)
    {
        if (CMSConfiguration.CachingEnabled && CMSConfiguration.IsCacheEnabled(itemKey))
            return CacheProviderManager.GetProvider(itemKey).Get(cacheKey);
        else
            return null;
    }

    private void StoreInCache(string itemKey, string cacheKey, object value)
    {
        if (CMSConfiguration.CachingEnabled && CMSConfiguration.IsCacheEnabled(itemKey))
        {
            //try to store in the cache
            CacheProviderManager.GetProvider(itemKey).Set(cacheKey, value, DateTime.Now.AddSeconds(CMSConfiguration.CacheSettings[itemKey].ExpireSeconds));
        }
    }

    public class PRArticleItem
    {
        private ArticleBaseEntity leadingArticle = null;
        private Guid articleID;
        private string caption;
        private string subCaption;
        private string lead;
        private Guid? imageID;
        private string imageAlt;
        private string imageDescription;
        private string imageSource;
        private string advertCode;

        public ArticleBaseEntity LeadingArticle
        {
            get { return leadingArticle; }
            set { leadingArticle = value; }
        }

        public Guid ArticleID
        {
            get { return articleID; }
            set { articleID = value; }
        }

        public string Caption
        {
            get { return caption; }
            set { caption = value; }
        }

        public string SubCaption
        {
            get { return subCaption; }
            set { subCaption = value; }
        }

        public string Lead
        {
            get { return lead; }
            set { lead = value; }
        }

        public Guid? ImageID
        {
            get { return imageID; }
            set { imageID = value; }
        }

        public string ImageAlt
        {
            get { return imageAlt; }
            set { imageAlt = value; }
        }

        public string ImageDescription
        {
            get { return imageDescription; }
            set { imageDescription = value; }
        }

        public string ImageSource
        {
            get { return imageSource; }
            set { imageSource = value; }
        }

        public string AdvertCode
        {
            get 
            {
                if (!string.IsNullOrEmpty(advertCode))
                    return HttpUtility.UrlDecode(advertCode).Replace("&quot;", "\"");
                else
                    return null;
            }
            set { advertCode = value; }
        }

    }
</script>