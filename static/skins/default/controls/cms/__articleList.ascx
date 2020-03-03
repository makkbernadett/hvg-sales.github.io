<%@ Control Inherits="CMS.WebUtilities.Components.Controls.ArticleList" Language="C#" %>
<%@ Register TagPrefix="HVGControl" TagName="Pager" Src="~/skins/default/controls/Pager.ascx" %>
<%@ Import Namespace="CMS.BusinessProcess.Managers" %>
<%@ Import Namespace="CMS.BusinessEntities" %>
<%@ Import Namespace="CMS.WebUtilities" %>
<%@ Import Namespace="CMS.WebUtilities.Components.Controls" %> 
<asp:Repeater ID="rptArticles" runat="server" OnItemCreated="Item_Created">
    <ItemTemplate>
        <div class="columnarticle">        
            <h2>
                <%# (((ArticleBaseEntity)Container.DataItem).StandHVG.HasValue && ((ArticleBaseEntity)Container.DataItem).StandHVG.Value) || ((ArticleBaseEntity)Container.DataItem).IssueID.HasValue ? "<img src=\"" + System.Configuration.ConfigurationSettings.AppSettings["StaticServer"] + "/skins/default/img/hvglogo.png\" alt=\"HVG Hetilap\" /> " : String.Empty%>
                <a href="<%# ArticleUrl((ArticleBaseEntity)Container.DataItem, RequestContext.CurrentColumn) %>" title="<%# ((ArticleBaseEntity)Container.DataItem).Caption.Replace("\"", "&apos;") %>"> <%# ((ArticleBaseEntity)Container.DataItem).Caption%></a> 
                <%# ((ArticleBaseEntity)Container.DataItem).HasVideo ? "<img src=\"" + System.Configuration.ConfigurationSettings.AppSettings["StaticServer"] + "/skins/default/img/withvideo.png\" alt=\"videóval\" />" : String.Empty%>
            </h2>
            <asp:PlaceHolder ID="hldImage" runat="server" Visible="<%# HasImage %>"><a href="<%# ArticleUrl((ArticleBaseEntity)Container.DataItem, RequestContext.CurrentColumn) %>" title="<%#((ArticleBaseEntity)Container.DataItem).Caption.Replace("\"", "&apos;") %>"><img class="framed" src="<%#!((ArticleBaseEntity)Container.DataItem).DefaultImageID.HasValue ? String.Empty : "/image.aspx?id=" + ((ArticleBaseEntity)Container.DataItem).DefaultImageID.Value + "&view=" + GetImageView()%>" align="left" /></a></asp:PlaceHolder>
            
            <p>
                <%# ((ArticleBaseEntity)Container.DataItem).Lead%>
            </p>
            
            <p class="columnarticleinfo">
                <asp:PlaceHolder runat="server" Visible="<%# ((ArticleBaseEntity)Container.DataItem).IsComment %>">
                    <a href="<%# ArticleUrl((ArticleBaseEntity)Container.DataItem, RequestContext.CurrentColumn) %>#comments"><img class="transparent" src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/comment.png" alt="komment" /> <%#((ArticleBaseEntity)Container.DataItem).CommentCounter > 0 ? ((ArticleBaseEntity)Container.DataItem).CommentCounter.ToString() + " hozzászólás" : "Szóljon hozzá"%></a>
                </asp:PlaceHolder>
                
                <asp:PlaceHolder runat="server" Visible="<%# !String.IsNullOrEmpty(((ArticleBaseEntity)Container.DataItem).AuthorName) %>">
                    <a href="<%# ArticleUrl((ArticleBaseEntity)Container.DataItem, RequestContext.CurrentColumn) %>">
                        <img class="transparent" alt="szerző" src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/author.png" /> <%# ((ArticleBaseEntity)Container.DataItem).AuthorName %>
                    </a>                                
                </asp:PlaceHolder>
                                
                <img class="transparent" src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/time.png" alt="idő" /> <%# ControlHelper.DisplayAgo(((ArticleBaseEntity)Container.DataItem).ReleaseDate.Value)%>
            </p>
        </div>      
        <asp:PlaceHolder runat="server" ID="hldBanner"></asp:PlaceHolder>
        <%--<asp:PlaceHolder runat="server" Visible="<%# Container.ItemIndex == 4 %>">
            <CMSControls:PageLayoutControl ID="PageLayoutControl1" runat="server" PageID="5016" Visible="True" TemplateItemName="pageLayout" IsCachingEnabled="true" CacheSeconds="30" />
        </asp:PlaceHolder>--%>
    </ItemTemplate>            
</asp:Repeater>

<HVGControl:Pager ID="ctrlPager" runat="server" Visible="false" />    


<script runat="server">
    private bool hasImage = false;
    private bool hasAuthorImage = false;
    
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
            hasAuthorImage = false;
            if (((ArticleBaseEntity)e.Item.DataItem).DefaultImageID.HasValue)
            {
                hasImage = true;
            }
            else
            {
                hasImage = false;

                if (((ArticleBaseEntity)e.Item.DataItem).AuthorID.HasValue)
                {
                    //Ha a velemeny rovat akkor nezzuk meg, hogy van-e fotója a szerzőnek...
                    if (RequestContext.CurrentColumn.WebID.ToLower().Equals("velemeny")
                        ||
                        (RequestContext.CurrentColumn.ParentColumnID.HasValue && RequestContext.CurrentColumn.ParentColumn.WebID.ToLower().Equals("velemeny"))
                       )
                    {
                        AuthorEntity author = ManagerFactory.ContentManagerProvider.GetAuthor(RequestContext.CurrentSite, ((ArticleBaseEntity)e.Item.DataItem).AuthorID.Value);
                        if (author != null && author.ImageId.HasValue)
                        {
                            ((ArticleBaseEntity)e.Item.DataItem).DefaultImageID = author.ImageId;
                            hasImage = true;
                            hasAuthorImage = true;
                        }
                    }
                }        
            }

            if (e.Item.ItemIndex == 1 || e.Item.ItemIndex == 3 || e.Item.ItemIndex == 6 || e.Item.ItemIndex == 11)
            {
                if (RequestContext.CurrentColumn == null || RequestContext.CurrentColumn.EntityID == null || !RequestContext.CurrentColumn.EntityID.ID.HasValue)
                {
                    return;
                }

                PlaceHolder hldBanner = (PlaceHolder)e.Item.FindControl("hldBanner");
                if (hldBanner == null)
                    return;
                    
                string mainColumnWebId = RequestContext.CurrentColumn.WebID.ToLower();
                if (RequestContext.CurrentColumn.ParentColumn != null && RequestContext.CurrentColumn.ParentColumn.EntityID != null && !String.IsNullOrEmpty(RequestContext.CurrentColumn.ParentColumn.WebID))
                    mainColumnWebId = RequestContext.CurrentColumn.ParentColumn.WebID.ToLower();
                
                switch (mainColumnWebId)
                {
                    case "itthon":
                        //AddLayout(e.Item.ItemIndex == 1 ? "4723" : (e.Item.ItemIndex == 6 ? "4724" : "4725"), hldBanner);
                        AddLayout(e.Item.ItemIndex == 1 ? "4723" : (e.Item.ItemIndex == 6 ? "4724" : (e.Item.ItemIndex == 3 ? "5018" : "4725")), hldBanner);
                        break;

                    case "vilag":
                        AddLayout(e.Item.ItemIndex == 1 ? "4726" : (e.Item.ItemIndex == 6 ? "4727" : (e.Item.ItemIndex == 3 ? "5020" : "4728")), hldBanner);
                        break;

                    case "gazdasag":
                        AddLayout(e.Item.ItemIndex == 1 ? "4729" : (e.Item.ItemIndex == 6 ? "4730" : (e.Item.ItemIndex == 3 ? "5022" : "4731")), hldBanner);
                        break;

                    case "tudomany":
                        AddLayout(e.Item.ItemIndex == 1 ? "4732" : (e.Item.ItemIndex == 6 ? "4733" : (e.Item.ItemIndex == 3 ? "5024" : "4734")), hldBanner);
                        break;

                    case "kultura":
                        AddLayout(e.Item.ItemIndex == 1 ? "4735" : (e.Item.ItemIndex == 6 ? "4736" : (e.Item.ItemIndex == 3 ? "5026" : "4737")), hldBanner);
                        break;

                    case "sport":
                        AddLayout(e.Item.ItemIndex == 1 ? "4738" : (e.Item.ItemIndex == 6 ? "4739" : (e.Item.ItemIndex == 3 ? "5028" : "4740")), hldBanner);
                        break;

                    case "kkv":
                        AddLayout(e.Item.ItemIndex == 1 ? "4741" : (e.Item.ItemIndex == 6 ? "4742" : (e.Item.ItemIndex == 3 ? "5030" : "4743")), hldBanner);
                        break;

                    case "karrier":
                        AddLayout(e.Item.ItemIndex == 1 ? "4744" : (e.Item.ItemIndex == 6 ? "4745" : (e.Item.ItemIndex == 3 ? "5032" : "4746")), hldBanner);
                        break;

                    case "egeszseg":
                        AddLayout(e.Item.ItemIndex == 1 ? "4747" : (e.Item.ItemIndex == 6 ? "4748" : (e.Item.ItemIndex == 3 ? "5034" : "4749")), hldBanner);
                        break;

                    case "panorama":
                        AddLayout(e.Item.ItemIndex == 1 ? "4750" : (e.Item.ItemIndex == 6 ? "4751" : (e.Item.ItemIndex == 3 ? "5036" : "4752")), hldBanner);
                        break;

                    case "gasztro":
                        AddLayout(e.Item.ItemIndex == 1 ? "4753" : (e.Item.ItemIndex == 6 ? "4754" : (e.Item.ItemIndex == 3 ? "5038" : "4764")), hldBanner);
                        break;

                    case "cegauto":
                        AddLayout(e.Item.ItemIndex == 1 ? "4756" : (e.Item.ItemIndex == 6 ? "4757" : (e.Item.ItemIndex == 3 ? "5040" : "4755")), hldBanner);
                        break;

                    case "velemeny":
                        AddLayout(e.Item.ItemIndex == 1 ? "4758" : (e.Item.ItemIndex == 6 ? "4759" : (e.Item.ItemIndex == 3 ? "5042" : "4760")), hldBanner);
                        break;

                   default:
                        AddLayout(e.Item.ItemIndex == 1 ? "4761" : (e.Item.ItemIndex == 6 ? "4762" : (e.Item.ItemIndex == 3 ? "5018" : "4763")), hldBanner);
                        break;
                }
            }           
        }
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

    private void AddLayout(string pageID, PlaceHolder placeHolder)
    {
        PageLayoutControl pgControl = new PageLayoutControl();
        pgControl.PageID = pageID;
        pgControl.TemplateItemName = "pageLayout";
        pgControl.IsCachingEnabled = true;
        pgControl.CacheSeconds = 30;

        placeHolder.Controls.AddAt(0, pgControl);
    }

    private string GetImageView()
    {
        if (hasAuthorImage)
        {
            return "4d789582-c4ce-4dfc-abe6-8d4a71f95fde";
        }   
        
        //return "f4b282a9-fd7f-4713-a250-7f239f5302df";
        return "a7ce225f-67ef-4b6d-b77d-59581e02f304";
    }
</script>

