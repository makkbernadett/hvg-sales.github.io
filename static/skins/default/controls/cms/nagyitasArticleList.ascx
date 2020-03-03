<%@ Control Inherits="CMS.WebUtilities.Components.Controls.ArticleList" Language="C#" %>
<%@ Register TagPrefix="HVGControl" TagName="Pager" Src="~/skins/default/controls/Pager.ascx" %>
<%@ Import Namespace="CMS.BusinessEntities" %>
<%@ Import Namespace="CMS.WebUtilities" %> 

<asp:Repeater ID="rptArticles" runat="server" OnItemCreated="Item_Created">
    <ItemTemplate>
        <div class="columnarticle-wide nagyitasWrapper">
            <h2>
                <a href="<%# ArticleUrl((ArticleBaseEntity)Container.DataItem, RequestContext.CurrentColumn) %>" title="<%# ((ArticleBaseEntity)Container.DataItem).Caption.Replace("\"", "&apos;") %>"> <%# ((ArticleBaseEntity)Container.DataItem).Caption%></a> 
                <%# ((ArticleBaseEntity)Container.DataItem).HasVideo ? "<img src=\"/skins/default/img/withvideo.png\" alt=\"videóval\" />" : String.Empty%>
            </h2>
            <p class="zoominfo">
                <%# ControlHelper.DisplayAgo(((ArticleBaseEntity)Container.DataItem).ReleaseDate.Value)%>
                
                <asp:PlaceHolder runat="server" Visible="<%# !String.IsNullOrEmpty(((ArticleBaseEntity)Container.DataItem).AuthorName) %>">
                    <a href="<%# ArticleUrl((ArticleBaseEntity)Container.DataItem, RequestContext.CurrentColumn) %>">
                        <img class="transparent" alt="szerző" src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/author.png" /> <%# ((ArticleBaseEntity)Container.DataItem).AuthorName %>
                    </a>                                
                </asp:PlaceHolder>
                
                <asp:PlaceHolder runat="server" Visible="<%# ((ArticleBaseEntity)Container.DataItem).IsComment %>">
                     &nbsp;&bull;&nbsp;&nbsp;<a href="<%# ArticleUrl((ArticleBaseEntity)Container.DataItem, RequestContext.CurrentColumn) %>#comments"><img class="transparent" src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/addcomment.png" alt="komment" /> <%#((ArticleBaseEntity)Container.DataItem).CommentCounter > 0 ? ((ArticleBaseEntity)Container.DataItem).CommentCounter.ToString() + " hozzászólás" : "Szóljon hozzá"%></a>
                </asp:PlaceHolder>
            </p>
            <p>
                <strong><%# CheckMaxLength(((ArticleBaseEntity)Container.DataItem).Lead)%></strong>
            </p>
            
            <asp:PlaceHolder runat="server" Visible="<%# HasImage %>">
               <div class="zoom">
                <a href="<%# ArticleUrl((ArticleBaseEntity)Container.DataItem, RequestContext.CurrentColumn) %>" title="<%#((ArticleBaseEntity)Container.DataItem).Caption.Replace("\"", "&apos;") %>">
                    <%--<img class="framed" src="<%#!((ArticleBaseEntity)Container.DataItem).DefaultImageID.HasValue ? String.Empty : "/image.aspx?id=" + ((ArticleBaseEntity)Container.DataItem).DefaultImageID.Value + "&view=77b35f82-3c9f-4f85-88fe-7bbfe9f7ce2c"%>" />--%>
                    <img class="framed" src="<%#!((ArticleBaseEntity)Container.DataItem).DefaultImageID.HasValue ? String.Empty : PageNavigator.ImageURL(RequestContext.CurrentSite, ((ArticleBaseEntity)Container.DataItem).DefaultImageID.Value.ToString(), "77b35f82-3c9f-4f85-88fe-7bbfe9f7ce2c")%>" />
                </a>
                <span></span>
               </div>
            </asp:PlaceHolder>
            
            <asp:PlaceHolder runat="server" Visible='<%#Container.ItemIndex == 0 %>'> 
                <CMSControls:PageLayoutControl ID="PageLayoutControl1" runat="server" PageID="4583" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
            </asp:PlaceHolder>
        </div>            
    </ItemTemplate>            
</asp:Repeater>

<HVGControl:Pager ID="ctrlPager" runat="server" Visible="false" />    


<script runat="server">
    private bool banner = false;
    private bool hasImage = false;

    protected override void OnPreRender(EventArgs e)
    {
        if (rptArticles != null)
        {
            rptArticles.DataSource = Articles;
            rptArticles.DataBind();
        }

        if (this.PageCount > 1)
        {
            ctrlPager.Visible = true;
            ctrlPager.PageIndex = this.PageIndex;
            ctrlPager.TotalItemCount = this.RecordCount;
            ctrlPager.PageSize = this.PageSize;

            ctrlPager.PagerLink = PageNavigator.GetColumnUrl(Column, 1) + "/{0}";
        }

        //if (PageIndex > 1)
        //{
        //    hldPageNavigator.Visible = true;
        //}

        //if (this.PageCount > 1 && this.PageIndex == 1 && lnkArchive != null)
        //{
        //    lnkArchive.Visible = true;
        //    lnkArchive.NavigateUrl = String.Format("{0}.aspx", PageNavigator.GetColumnUrl(Column, 2));
        //}

        //// Set the properties on the next page link
        //if (this.PageIndex > 1 && this.PageIndex < this.PageCount && lnkNextPage != null)
        //{
        //    lnkNextPage.Visible = true;
        //    lnkNextPage.NavigateUrl = String.Format("{0}.aspx", PageNavigator.GetColumnUrl(Column, this.PageIndex + 1));
        //}

        //// Set the properties on the previous page link
        //if (this.PageIndex > 1 && this.PageIndex > 1 && lnkPreviousPage != null)
        //{
        //    lnkPreviousPage.Visible = true;
        //    lnkPreviousPage.NavigateUrl = String.Format("{0}.aspx", PageNavigator.GetColumnUrl(Column, this.PageIndex - 1));
        //}

    }

    void Item_Created(Object Sender, RepeaterItemEventArgs e)
    {
        if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
        {
            if (e.Item.ItemIndex == 4)
            {
                banner = true;
            }
            else
            {
                banner = false;
            }
            if (((ArticleBaseEntity)e.Item.DataItem).DefaultImageID.HasValue)
            {
                hasImage = true;
            }
            else
            {
                hasImage = false;
            }
        }
    }

    public bool Banner
    {
        get { return banner; }
    }
    public bool HasImage
    {
        get { return hasImage; }
    }

    public string CheckMaxLength(string s)
    {
        int maxLength = 270;
        if (s.Length <= maxLength)
            return s;

        s = s.Substring(0, maxLength).Trim();
        int lastDot = s.LastIndexOf(".");
        int lastQuestion = s.LastIndexOf("?");
        int lastMark = s.LastIndexOf("!");
        int lastSpace = s.LastIndexOf(" ");

        if (lastDot == -1 && lastQuestion == -1 && lastMark == -1)
        {
            if (lastSpace == -1)
                return AddDots(s.Substring(0, maxLength));
            else
                return AddDots(s.Substring(0, lastSpace));
        }

        int maxMarkIndex = lastDot > 0 ? lastDot : 0;
        maxMarkIndex = lastQuestion > maxMarkIndex ? lastQuestion : maxMarkIndex;
        maxMarkIndex = lastMark > maxMarkIndex ? lastMark : maxMarkIndex;

        return s.Substring(0, maxMarkIndex + 1).Trim();
    }
    public string AddDots(string s)
    {
        return (s.Trim() + "...").Replace("....", "...").Replace(",...", "...").Replace("?...", "...").Replace("!...", "...").Replace(";...", "...");
    }
</script>

