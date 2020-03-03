<%@ Control Inherits="CMS.WebUtilities.Components.Controls.ArticleView" Language="C#" %>

<%@ Register TagPrefix="HVGControl" TagName="Comments" Src="~/skins/default/controls/ArticleComments.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="BreakingNews" Src="~/skins/default/controls/Breaking.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="Flyer" Src="~/skins/default/controls/flyer.ascx" %>
<%@ Register TagPrefix="HVGControl" TagName="ScarabFlyer" Src="~/skins/default/controls/ScarabFlyer.ascx" %>

<%@ Import Namespace="CMS.BusinessEntities" %>
<%@ Import Namespace="CMS.WebUtilities" %>
<%@ Import Namespace="CMS.Utilities" %> 
<%@ Import Namespace="CMS.WebUtilities.Components.Controls" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="HtmlAgilityPack" %>
<%@ Import Namespace="System.Collections.Generic" %>

<%if (!String.IsNullOrEmpty(Article.SubCaption) && Issue != null){ %><h2 class="subcaption"><%=Article.SubCaption.ToUpper()%></h2><%} %>

<%--<%if (!isShortNews) {%>
    <h1><%=Article.Caption%></h1>
<%} %>--%>
<%-- if (Article.Author != null && Article.Author.ImageId.HasValue) { %>
    <img class="framed3" alt="" src="/image.aspx?id=<%=Article.Author.ImageId.Value %>&amp;view=dab273e8-04c8-440b-8714-2d2f192ea497"/>
<%} --%>
<%if (Article.BreakingNewsID.HasValue) {%>
<h6 class="redh6">PERCRŐL PERCRE</h6>
<%} %>
<%if (RequestContext.CurrentColumn != null && !RequestContext.CurrentColumn.Name.ToLower().Equals("egyeb"))  { %>                     
    <p style="margin-top:0;">
        <%if (!Article.BreakingNewsID.HasValue) {%>
            <%=Issue == null ? Article.ReleaseDate.Value.ToString("yyyy. MMMM dd., dddd, HH:mm", new System.Globalization.CultureInfo("hu-HU")) : Article.ReleaseDate.Value.ToString("yyyy. MMMM dd., dddd", new System.Globalization.CultureInfo("hu-HU"))%>        
            <%if (Article.LastModifyDate.HasValue && Article.LastModifyDate.Value > Article.ReleaseDate.Value){ %> &bull;  <b>Utolsó frissítés:</b> <%=Article.LastModifyDate.HasValue ? ControlHelper.DisplayAgo(Article.LastModifyDate.Value) : String.Empty%><%} %><br />
        <%} %>    
        <asp:PlaceHolder runat="server" ID="plhAuthorHolder"><b>Szerző:</b> <%if (Article.Author.Public && !String.IsNullOrEmpty(Article.Author.Email.Trim())) { %><a href="mailto:<%=Article.Author.Email%>"><%} %><%=Article.Author.Name%><%if (Article.Author.Public && !String.IsNullOrEmpty(Article.Author.Email.Trim())){ %></a><%} %></asp:PlaceHolder>
    </p>
    <hr />

    <asp:Repeater ID="rptTags" runat="server">
        <HeaderTemplate>
            <p><b>Címkék:</b> 
        </HeaderTemplate>
        <ItemTemplate>
            <a href="/cimke/<%# HttpUtility.UrlEncode(((TagEntity)Container.DataItem).Name.Replace(".", "%2E"))%>"><%#((TagEntity)Container.DataItem).Name%></a>; 
        </ItemTemplate>
        <FooterTemplate>
            </p>
        </FooterTemplate>
    </asp:Repeater>

    <%if (DisplayMode != DisplayModes.print && ShowFullBody){ %>
   <%-- <div id="sharetip">
        <h6>TETSZETT A CIKK?</h6>
        
        <p>Ossza meg az alábbi közösségi oldalakon is:</p>

        <a title="Megosztás az iWiW-en" rel="nofollow" target="_blank" href="http://iwiw.hu/pages/share/share.jsp?u=<%="http://" + Request.Url.Host + HttpUtility.UrlEncode(PageNavigator.GetPublicArticleUrl(this.Article)) %>&amp;t=<%=HttpUtility.UrlEncode(this.Article.Caption) %>">
		    <img src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/iwiwlogo.gif" alt="iwiw" />&nbsp;iwiw
	    </a>
	    <a title="Megosztás a Delicious-on" rel="nofollow" target="_blank" href="http://del.icio.us/post?url=<%="http://" + Request.Url.Host + HttpUtility.UrlEncode(PageNavigator.GetPublicArticleUrl(this.Article)) %>&amp;title=<%=HttpUtility.UrlEncode(this.Article.Caption) %>">
	        <img src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/Deliciouslogo.gif" alt="Delicious" />&nbsp;Delicious
        </a>
        <a title="Diggelés" rel="nofollow" target="_blank" href="http://digg.com/submit?phase=2&amp;url=<%="http://" + Request.Url.Host + HttpUtility.UrlEncode(PageNavigator.GetPublicArticleUrl(this.Article)) %>&amp;title=<%=HttpUtility.UrlEncode(this.Article.Caption) %>">
		    <img src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/Digglogo.gif" alt="Digg" align="left" />&nbsp;Digg
	    </a>
        <a title="Megosztás a Facebook-on" rel="nofollow" target="_blank" href="http://www.facebook.com/share.php?u=<%="http://" + Request.Url.Host + HttpUtility.UrlEncode(PageNavigator.GetPublicArticleUrl(this.Article)) %>&amp;t=<%=HttpUtility.UrlEncode(this.Article.Caption) %>">
		    <img src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/Facebooklogo.gif" alt="Facebook" />&nbsp;Facebook
	    </a>
        <a title="Megosztás a Google Reader-en" href="javascript:var%20b=document.body;var%20GR________bookmarklet_domain='http://www.google.com';if(b&amp;&amp;!document.xmlVersion){void(z=document.createElement('script'));void(z.src='http://www.google.com/reader/ui/link-bookmarklet.js');void(b.appendChild(z));}else{}">
            <img src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/GReaderlogo.gif" alt="GReader" />&nbsp;GReader
        </a>    	
        <a title="Megosztás az UrlGuru-n" rel="nofollow" target="_blank" href="http://urlguru.hu/ajanl.aspx?url=<%="http://" + Request.Url.Host + HttpUtility.UrlEncode(PageNavigator.GetPublicArticleUrl(this.Article)) %>&amp;title=<%=HttpUtility.UrlEncode(this.Article.Caption) %>&amp;rate=5&amp;tags=<%=HttpUtility.UrlEncode(this.TagsText) %>&amp;opinion=<%=HttpUtility.UrlEncode(this.Article.Lead) %>">
		    <img src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/URLGurulogo.gif" alt="URLGuru" />&nbsp;URLGuru
	    </a>		
	    <a title="Megosztás a StumbleUpon-on" rel="nofollow" target="_blank" href="http://www.stumbleupon.com/submit?url=<%="http://" + Request.Url.Host + HttpUtility.UrlEncode(PageNavigator.GetPublicArticleUrl(this.Article)) %>&amp;title=<%=HttpUtility.UrlEncode(this.Article.Caption) %>">
		    <img src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/StumbleUponlogo.gif" alt="StumbleUpon" />&nbsp;StumbleUpon
	    </a>		
	    <a title="Megosztás a Tumblr-en" rel="nofollow" target="_blank" href="http://www.tumblr.com/share?v=3&amp;u=<%=Request.Url.Host + HttpUtility.UrlEncode(PageNavigator.GetPublicArticleUrl(this.Article)) %>&amp;t=<%=HttpUtility.UrlEncode(this.Article.Caption) %>">
		    <img src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/Tumblrlogo.gif" alt="Tumblr" />&nbsp;Tumblr
	    </a>		    
	    <a title="Csiripelés Twitter-re" rel="nofollow" target="_blank" href="http://twitter.com/home?status=<%="http://" + Request.Url.Host + HttpUtility.UrlEncode(PageNavigator.GetPublicArticleUrl(this.Article)) %>">
		    <img src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/Twitterlogo.gif" alt="Twitter" />&nbsp;Twitter
	    </a>
    	
	    <img alt="dropshadow" src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/dropshadow.gif" class="centered" />
    	
	    <p>
	    Többre kíváncsi? Iratkozzon fel a <a href="/regisztracio" target="_blank">hírlevelünkre</a>, <a href="/other/rss" target="_blank">RSS-feedünkre</a>, 
	    vagy a <a href="http://twitter.com/hvg_hu" rel="nofollow" target="_blank">Twitter csatornánkra</a> is!
	    </p>
    </div>   --%> 
<%if (!HttpUtility.UrlEncode(PageNavigator.GetPublicArticleUrl(this.Article)).Contains("hvgfriss"))
  { %>
<div class="box articlemenu">
    <p class="greyboxbody" style="position: relative;"> <%-- *z-index: -1;">--%>
        <a href="<%=PageNavigator.GetPublicArticleUrl(this.Article)%>/print" rel="nofollow"
            target="_blank">
            <img src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/print.gif"
                alt="kinyomtatom" align="left" />Kinyomtatom</a> &bull; <a href="javascript:void('0');"
                    class="articlesendlink">
                    <img src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/mailto.gif"
                        alt="Elküldöm" align="left" />Elküldöm</a>
        <%if (Article.IsComment)
          { %>
        &bull;<a href="#comments"><img class="transparent" src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/addcomment.png"
            alt="hozzászólások" align="left" /><%=ctrArticleComments.Visible && ctrArticleComments.commentsCount.Equals("0") ? "Szóljon hozzá" : "Hozzászólások (#" + ctrArticleComments.commentsCount + ")"%></a><%} %>
        <a style="position: absolute; top: 9px; right: 198px;">
            <g:plusone size="medium" count="false" href="<%="http://" + Request.Url.Host +  Regex.Replace(HttpUtility.UrlEncode(PageNavigator.GetPublicArticleUrl(this.Article)), "%2f", "/") %>"></g:plusone>
        </a><a title="Csiripelés Twitter-re" rel="nofollow" target="_blank" style="position: absolute;
            top: 8px; right: 130px;" href="http://twitter.com/home?status=<%="http://" + Request.Url.Host + HttpUtility.UrlEncode(PageNavigator.GetPublicArticleUrl(this.Article)) %>">
            <img src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/twitter.png"
                alt="Twitter" /></a>
        <iframe src="http://www.facebook.com/plugins/like.php?href=<%="http://hvg.hu" + PageNavigator.GetPublicArticleUrl(this.Article) %>&amp;send=false&amp;layout=button_count&amp;width=115&amp;show_faces=false&amp;action=recommend&amp;colorscheme=light&amp;font&amp;height=21"
            scrolling="no" frameborder="0" style="border: none; overflow: hidden; position: absolute;
            top: 9px; right: 0; width: 135px; height: 21px;" allowtransparency="true"></iframe>
    </p>
</div>
<%} %>
    <%} %>
<%} %>


<div id="articleBody0" class="articlecontent">

    <% if (!String.IsNullOrEmpty(Article.Lead)){%>
        <p>
        <strong><%=Article.Lead%></strong>
        </p>
    <%} %>
    
    <asp:PlaceHolder runat="server" ID="hldLockedMessage" Visible="false">
        <div class="messagebox" style="overflow: hidden;">
            <p>
                <%if (issue != null && issue.ImageId.HasValue) { %>
                    <img alt="<%=issue.Year %> / <%=issue.IssueNum %>" style="margin-bottom: 10px;" src="/image.aspx?id=<%=issue.ImageId.HasValue ? issue.ImageId .Value.ToString() : String.Empty%>&amp;view=dab273e8-04c8-440b-8714-2d2f192ea497" />
                <%} else {%>
                    <img src="/skins/default/img/error.jpg" alt="alert" />
                <%} %>                    
                <strong>A cikk teljes terjedelmében a hetilapban olvasható.</strong><br />
                A legfrissebb lapszámot keresse az újságárusoknál, iPadre optimalizált változatát az App Store-ban, vagy fizessen elő hetilapunkra az 
                <a href="https://ugyfelpont.hvg.hu/pls/webitem/pkg_webshop_products.show" target="_blank">Előfizetés</a> 
                oldalon.
            </p>
        </div>
    </asp:PlaceHolder>

    <asp:PlaceHolder runat="server" ID="hldMustLoggedIn" Visible="false">
        <div class="messagebox" style="overflow: hidden;">
            <p>
                <%if (issue != null && issue.ImageId.HasValue) { %>
                    <img alt="<%=issue.Year %> / <%=issue.IssueNum %>" style="margin-bottom: 10px;" src="/image.aspx?id=<%=issue.ImageId.HasValue ? issue.ImageId .Value.ToString() : String.Empty%>&amp;view=dab273e8-04c8-440b-8714-2d2f192ea497" />
                <%} else {%>
                    <img src="/skins/default/img/error.jpg" alt="alert" />
                <%} %>                    
                <strong>Ezt a tartalmat csak regisztrált és bejelentkezett felhasználóink láthatják!</strong><br />                
                Ha még nem regisztrált látogatónk, kérjük <a href="<%=RegistrationURL %>" title="Regisztráció">kattintson ide</a> és a megjelenő oldalon végezze el a regisztrációs folyamatot.
            </p>
            
            <hr />
            
            <p>
                Amennyiben már rendelkezik regisztrációval, akkor                 
                <a href="<%=LoginURL %>" class="loginlink">ide kattintva bejelentkezhet</a> e-mail 
                címével és jelszavával és megtekintheti a zárolt tartalmat.
            </p>
        </div>
    </asp:PlaceHolder>
    
    <%if (ShowFullBody) { %>
    <%if (DisplayMode != DisplayModes.print && RequestContext.CurrentColumn != null && !RequestContext.CurrentColumn.Name.ToLower().Equals("egyeb") && !RequestContext.CurrentColumn.Name.ToLower().Equals("nagyítás"))
      { %>
      <asp:PlaceHolder runat="server" ID="hldLeadBanner"></asp:PlaceHolder>    
    <%} %>
    <CMSControls:ArticleBodyPlaceHolder runat="server" ID="hldArticleBody" />   
    <%} %>     
</div>

<%if (ShowFullBody) { %>
    <HVGControl:BreakingNews runat="server" ID="ctrlBreakingNews" PageSize="10"/>

    <% if (PageCount > 1 && PageIndex < PageCount && PageBreaks != null && PageBreaks.Count > PageIndex){ %>
        <a class="more2" href="<%= ArticleUrl(PageIndex + 1) %>"><%=PageBreaks[PageIndex] %> &raquo;</a>
    <%} %>

    <% if (PageCount > 1 && PageIndex > 1 && PageBreaks != null && PageBreaks.Count > PageIndex - 1){ %>
        <% if (PageIndex == 2){ %>
            <a class="more1" href="<%= ArticleUrl(PageIndex - 1) %>">&laquo; vissza az első oldalra </a>
        <% } else { %>        
            <a class="more1" href="<%= ArticleUrl(PageIndex - 1) %>">&laquo; <%=PageBreaks[PageIndex - 1] %> </a>
        <%} %>
    <%} %>
<%} %> 

<%--<iframe src="http://www.facebook.com/plugins/like.php?href=<%="http://" + Request.Url.Host + HttpUtility.UrlEncode(PageNavigator.GetPublicArticleUrl(this.Article)) %>&amp;layout=standard&amp;show_faces=true&amp;width=450&amp;action=recommend&amp;colorscheme=light&amp;height=60" scrolling="no" frameborder="0" allowTransparency="true" style="margin-left: 10px; border:none; overflow:hidden; width:550px; height:60px"></iframe>--%>
<iframe src="http://www.facebook.com/plugins/like.php?href=<%="http://" + Request.Url.Host + PageNavigator.GetPublicArticleUrl(this.Article) %>&amp;layout=standard&amp;show_faces=true&amp;width=450&amp;action=recommend&amp;colorscheme=light&amp;height=60" scrolling="no" frameborder="0" allowTransparency="true" style="margin-left: 10px; border:none; overflow:hidden; width:550px; height:70px"></iframe>

<%if (DisplayMode != DisplayModes.print && !RequestContext.CurrentColumn.Name.ToLower().Equals("egyeb"))  { %>
    <%if (ShowFullBody) { %>
<div class="box articlemenu">
    <p class="greyboxbody" style="position: relative">
        <a href="<%=PageNavigator.GetPublicArticleUrl(this.Article)%>/print" rel="nofollow"
            target="_blank">
            <img src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/print.gif"
                alt="kinyomtatom" align="left" />Kinyomtatom</a> &bull; <a href="javascript:void('0');"
                    class="articlesendlink">
                    <img src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/mailto.gif"
                        alt="Elküldöm" align="left" />Elküldöm</a>
        <%if (Article.IsComment)
          { %>
        &bull;<a href="#comments"><img class="transparent" src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/addcomment.png"
            alt="hozzászólások" align="left" /><%=ctrArticleComments.Visible && ctrArticleComments.commentsCount.Equals("0") ? "Szóljon hozzá" : "Hozzászólások (#" + ctrArticleComments.commentsCount + ")"%></a><%} %>
        <a style="position: absolute; top: 9px; right: 88px;">
            <g:plusone size="medium" href="<%="http://hvg.hu" +  Regex.Replace(HttpUtility.UrlEncode(PageNavigator.GetPublicArticleUrl(this.Article)), "%2f", "/") %>"></g:plusone>
        </a><a href="http://twitter.com/home?status=<%="http://hvg.hu"  + Regex.Replace(HttpUtility.UrlEncode(PageNavigator.GetPublicArticleUrl(this.Article)), "%2f", "/") %>"
            data-url="<%="http://hvg.hu" + Regex.Replace(HttpUtility.UrlEncode(PageNavigator.GetPublicArticleUrl(this.Article)), "%2f", "/") %>"
            title="Csiripelés Twitter-re" rel="nofollow" target="_blank" style="position: absolute;
            top: 8px; right: 10px;" class="twitter-share-button" data-count="horizontal">
        </a>

        <script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>

    </p>
</div>
        <%if (Issue == null ) { %>
            <asp:PlaceHolder runat="server" ID="hldBottom468"></asp:PlaceHolder> 
        <%} %>            
    <%} %>
    
    <%if (Issue == null && ShowFullBody) { %>
        <div <%=rptLinkedArticles.Items.Count > 0 || rptLinkedLinks.Items.Count > 0 ? "style=\"float: right; margin-bottom: 5px;\"" : "align=\"center\" style=\"margin-bottom: 5px;\"" %>>
            <asp:PlaceHolder runat="server" ID="hldBottom300"></asp:PlaceHolder>
        </div>
    <% } else  {%>
        <hr />
        <div class="authorbox">
            <%if (issue.ImageId.HasValue) { %>
                <img alt="<%=issue.Year %> / <%=issue.IssueNum %>" src="/image.aspx?id=<%=issue.ImageId.HasValue ? issue.ImageId .Value.ToString() : String.Empty%>&amp;view=6be5105f-a4d8-4df3-92ae-45b6639ebecb" />
            <%} %>
            
            <p class="dark">
            <asp:PlaceHolder runat="server" ID="phdIssueArticleAuthor"><strong>Szerző:</strong><br/><%if (Article.Author.Public && !String.IsNullOrEmpty(Article.Author.Email.Trim())) { %><a href="mailto:<%=Article.Author.Email%>"><%} %><%=Article.Author.Name%><%if (Article.Author.Public && !String.IsNullOrEmpty(Article.Author.Email.Trim())){ %></a><%} %><br/><br/></asp:PlaceHolder>
            <strong><%=Issue.ReleaseDate.ToString("yyyy. MMMM d.", new System.Globalization.CultureInfo("hu-HU"))%></strong>
            <br/><br/>A cikket a <strong><%=Issue.Year %>/<%=Issue.IssueNum %>.</strong> lapszámban olvashatja.<br/>
            <ul class="defaultul">
                <li><a href="http://rendeles.hvg.hu/orderone.aspx" target="_blank">Megrendelés</a></li>
            </ul>
            </p>
        </div>             
    <%} %>                 
<%} %>
            
<asp:Repeater ID="rptLinkedArticles" runat="server">
    <HeaderTemplate>
        <asp:PlaceHolder runat="server" Visible='<%#RequestContext.CurrentColumn.WebID == "w" %>'>
            <div class="publicist_related">
	            <h3>Kapcsolódó cikkek:</h3>
	            <ul>
        </asp:PlaceHolder>
        <asp:PlaceHolder runat="server" Visible='<%#RequestContext.CurrentColumn.WebID != "w" %>'>
            <h3 class="hthree">KAPCSOLÓDÓ ANYAGOK:</h3>
                <ul class="defaultul">
        </asp:PlaceHolder>
    </HeaderTemplate>
    <FooterTemplate>
        <asp:PlaceHolder runat="server" Visible='<%#RequestContext.CurrentColumn.WebID == "w" %>'>
            	</ul>        
            </div>
        </asp:PlaceHolder>
        <asp:PlaceHolder runat="server" Visible='<%#RequestContext.CurrentColumn.WebID != "w" %>'>
            </ul>
        </asp:PlaceHolder>
    </FooterTemplate>
    <ItemTemplate>
        <asp:PlaceHolder runat="server" Visible='<%#RequestContext.CurrentColumn.WebID == "w" %>'>
            <li>
			    <h4><a href="<%# ArticleUrl((ArticleBaseEntity)Container.DataItem, ((ArticleBaseEntity)Container.DataItem).Column) %>#utm_source=hvg.hu&utm_medium=listing&utm_content=related&utm_campaign=related" title="<%# ((ArticleBaseEntity)Container.DataItem).Caption%>"><%# ((ArticleBaseEntity)Container.DataItem).Caption%></a></h4>
			    <p><%# ((ArticleBaseEntity)Container.DataItem).Lead%></p>
		    </li>
		</asp:PlaceHolder>
		<asp:PlaceHolder runat="server" Visible='<%#RequestContext.CurrentColumn.WebID != "w" %>'>
            <li><%# (((ArticleBaseEntity)Container.DataItem).StandHVG.HasValue && ((ArticleBaseEntity)Container.DataItem).StandHVG.Value) || ((ArticleBaseEntity)Container.DataItem).IssueID.HasValue ? "<img src=\"" + System.Configuration.ConfigurationSettings.AppSettings["StaticServer"] + "/skins/default/img/hvglogo.png\" alt=\"HVG Hetilap\" /> " : String.Empty%><a href="<%# ArticleUrl((ArticleBaseEntity)Container.DataItem, ((ArticleBaseEntity)Container.DataItem).Column) %>#utm_source=hvg.hu&utm_medium=listing&utm_content=related&utm_campaign=related"><%# ((ArticleBaseEntity)Container.DataItem).Caption%></a></li>
        </asp:PlaceHolder>
    </ItemTemplate>
</asp:Repeater>

<asp:Repeater ID="rptLinkedLinks" runat="server">
    <HeaderTemplate>
        <h3 class="hthree">KAPCSOLÓDÓ HIVATKOZÁSOK:</h3>
            <ul class="defaultul">
    </HeaderTemplate>
    <FooterTemplate>
        </ul>        
    </FooterTemplate>
    <ItemTemplate>
        <li><a href="<%# ((LinkEntity)Container.DataItem).Address%>" target="_blank"><%# ((LinkEntity)Container.DataItem).Caption%></a></li>        
    </ItemTemplate>
</asp:Repeater>

<%if (Issue != null) { %>
    <br clear="all" />
    <asp:PlaceHolder runat="server" ID="hldBottom468Alul"></asp:PlaceHolder>     
<%} else { %>
    <asp:PlaceHolder runat="server" ID="hldCikk468Alul"></asp:PlaceHolder> 
<%} %>

<asp:PlaceHolder runat="server" ID="plhPRArticle" />
                    
<% if (DisplayMode != DisplayModes.print) { %>
    <HVGControl:Comments id="ctrArticleComments" EmailRequired="true" runat="server" />
<% } %>

<%--<div style="display: none;">
    <div id="articleSendDialog" style="background:#FFF">
	    <p><br/><strong><%=Article.Caption%></strong></p>
	    
	    <form action="<%=Request.RawUrl%>" method="post" accept-charset="utf-8" id="mailForm">	
	        <input type="hidden" name="path" value="http://<%=Request.Url.Host + Request.RawUrl %>" />
            <input type="hidden" name="subject" value="<%= RegexHelper.ReplaceQuot(Article.Caption) %>" />
            <input type="hidden" name="mailtype" value="AdvToFriendArticle" />	   
		    <p>
			    <label for="to">A címzett e-mail címe</label><br />
			    <input type="text" name="to" value="" id="to" />
		    </p>
		    
		    <p>
			    <label for="from">Az Ön e-mail címe</label><br />
			    <input type="text" name="from" value="" id="from" />
		    </p>
		    
		    <p>
			    <label for="email_comment">Üzenet (opcionális)</label><br />
			    <textarea cols="30" rows="5" name="email_comment" id="email_comment"></textarea>
		    </p>
		    <p>
			    <input id="cc" type="checkbox" name="cc" style="width: 20px; display: inline;"/>&nbsp;&nbsp;Másolat Önnek
		    </p>
		    
		    <p style="background: #EEE"><input class="centered" type="image" src="<%=System.Configuration.ConfigurationSettings.AppSettings["StaticServer"]%>/skins/default/img/mehet.gif" id="mailPostImage"/></p>
		    
		    <p id="articleSend_message"></p>
	    </form>
    </div>
</div>--%>
<HVGControl:Flyer runat="server" ID="flyer" Visible="false"/>
<HVGControl:ScarabFlyer runat="server" ID="scarabFlyer" Visible="false"/>
<br clear="all" />

<script runat="server">
    private decimal pudAuthorID = 1794;
    private ColumnEntity pubShortColunm = null;
    private string mainColumnWebId = String.Empty;
    private bool isShortNews = false;
    private string columnWebIDFeedForScarab = null;

    public string ColumnWebIDFeedForScarab
    {
        get
        {
            if (columnWebIDFeedForScarab == null && Article.Column != null)
            {
                columnWebIDFeedForScarab = Article.Column.ParentColumnID.HasValue ? string.Format("{0} > {1}", Article.Column.ParentColumn.WebID, Article.Column.WebID) : Article.Column.WebID;

                foreach (ColumnEntity item in Article.Columns)
                {
                    if (item.WebID != Article.Column.WebID)
                        columnWebIDFeedForScarab = item.ParentColumnID.HasValue ? string.Format("{0} | {1} > {2}", columnWebIDFeedForScarab, item.ParentColumn.WebID, item.WebID) : string.Format("{0} | {1}", columnWebIDFeedForScarab, item.WebID);
                }
            }
            return columnWebIDFeedForScarab;
        }
    }
    
    public bool IsShortNews
    {
        get
        {
            isShortNews = pubShortColunm != null && pubShortColunm.EntityID != null && pubShortColunm.EntityID.ID.HasValue && pubShortColunm.WebID == QueryStringParser.GetString("subColumnWebID", string.Empty);
            return isShortNews;
        }
    }
    
    /*protected string LoginURL
    {
        get
        {
            string url = string.Format("http://{0}{1}", CMS.Utilities.Config.SiteConfiguration.Config.Sites[0].CookieDomain, Request.RawUrl);
            try
            {
                System.Collections.Generic.Dictionary<string, string> paramsToLogin = new System.Collections.Generic.Dictionary<string, string>();
                paramsToLogin.Add("ForceLogin", "true");
                url = CMS.WebUtilities.PageNavigator.ExtendUrlGetParam(paramsToLogin, url);
            }
            catch
            {
                url = string.Format("http://{0}{1}", CMS.Utilities.Config.SiteConfiguration.Config.Sites[0].CookieDomain, Request.RawUrl);
            }
            return url;
        }
    }*/

    public string KulcsUrl
    {
        get
        {
            return System.Configuration.ConfigurationManager.AppSettings["OAuthServerAuthorizationEndpoint"];
        }
    }

    string Base64Url
    {
        get
        {
            return ERA.WebUtilities.SiteUtils.Base64Helper.Base64EncodeUTF8(
                string.Format("http://{0}{1}", CMS.Utilities.Config.SiteConfiguration.Config.Sites[0].CookieDomain,
                Request.RawUrl));
        }
    }

    string LoginURL
    {
        get
        {
            string url = string.Format("http://{0}/OAuth.ashx/{1}?ForceLogin=True", CMS.Utilities.Config.SiteConfiguration.Config.Sites[0].CookieDomain, Base64Url);
            return url;
        }
    }

    string RegistrationURL
    {
        get
        {
            Regex reg = new Regex("/[a-zA-Z0-9]*\\.aspx", RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline);
            string path = reg.Replace(KulcsUrl, string.Empty);
            return string.Format("{0}?redirect_uri={1}", path, LoginURL);
        }
    }
    
	public string URL 
    {
        get { return article != null ? ArticleUrl(article) : string.Empty; } 
    }

	
    private string tagsText = String.Empty;
    public string TagsText
    {
        get
        {
            return tagsText;
        }
    }

    private IssueEntity issue = null;
    public IssueEntity Issue
    {
        get
        {
            return issue;
        }
        set
        {
            issue = value;
        }
    }

    private bool isLatestIssue = false;
    public bool IsLatestIssue
    {
        get
        {
            return isLatestIssue;
        }
        set
        {
            isLatestIssue = value;
        }
    }

    private bool showFullBody = true;
    public bool ShowFullBody
    {
        get
        {
            return showFullBody;
        }        
    }

    private char whichFlyer()
    {
        char ret = 'A';
        Random gen = new Random();

        int num = gen.Next(10);

        /*if (num >= 0 && num <= 5)
            ret = 'A';*/
        /*if (num >= 6 && num <= 7)
            ret = 'B';*/
        if (num >= 1 && num <= 9)
            ret = 'C';
        
        return ret;
    }

    protected override void OnInit(EventArgs e)
    {
        base.OnInit(e);
        if (QueryStringParser.Exist("subColumnWebID"))
        {
            AuthorEntity pubAuthor = CMS.BusinessProcess.Managers.ManagerFactory.ContentManagerProvider.GetAuthor(RequestContext.CurrentSite, pudAuthorID);
            if (pubAuthor != null && pubAuthor.EntityID != null && pubAuthor.EntityID.ID != null && pubAuthor.EntityID.ID.HasValue)
                pubShortColunm = CMS.BusinessProcess.Managers.ManagerFactory.ContentManagerProvider.GetColumnByAuthID(RequestContext.CurrentSite, pubAuthor.EntityID.ID.Value)[0];
            isShortNews = pubShortColunm != null && pubShortColunm.EntityID != null && pubShortColunm.EntityID.ID.HasValue && pubShortColunm.WebID == QueryStringParser.GetString("subColumnWebID",string.Empty);
        }
    }
    
    protected override void OnLoad(EventArgs e)
    {
        if (RequestContext.CurrentColumn != null && !string.IsNullOrEmpty(RequestContext.CurrentColumn.WebID))
            mainColumnWebId = RequestContext.CurrentColumn.WebID.ToLower();
        else
            mainColumnWebId = Article != null && Article.Column != null && !string.IsNullOrEmpty(Article.Column.WebID) ? Article.Column.WebID : string.Empty;
            
        if (this.Article == null)
        {
            Server.Transfer("~/skins/default/404.aspx");
            return;
        }

        char rand = whichFlyer();

        //Response.Write("RAND: " + rand.ToString());
        
        if (rand == 'A')
        {
            if (flyer != null && DisplayMode != DisplayModes.print)
            {
                flyer.Visible = true;
                //Response.Write("HVGFLYer");
                //if (Article.ColumnID.HasValue && Article.ColumnID != 1332)
                if (Article.ColumnID.HasValue && (!Article.IssueID.HasValue || Article.Issue == null))
                {
                    if (Article.Column.Visible.HasValue && !Article.Column.Visible.Value 
                        && RequestContext.CurrentColumn != null && RequestContext.CurrentColumn.EntityID != null
                        && RequestContext.CurrentColumn.EntityID.ID.HasValue)
                        flyer.ColumnID = RequestContext.CurrentColumn.EntityID.ID.Value;
                        //flyer.ColumnID = Article.Column.ParentColumnID.Value;
                    else
                        flyer.ColumnID = Article.ColumnID.Value;
                    flyer.SourceWebID = Article.WebID;
                    double calc = 0.5;
                    if (RequestContext.CurrentColumn != null && !string.IsNullOrEmpty(RequestContext.CurrentColumn.WebID)
                        && RequestContext.CurrentColumn.WebID == "nagyitas")
                    {
                        calc = 0.92;
                    }
                    else
                    {
                        if (7000 < Article.Body.Length && Article.Body.Length < 9000)
                            calc = 0.4;
                        if (5000 < Article.Body.Length && Article.Body.Length <= 7000)
                            calc = 0.38;
                        if (2000 < Article.Body.Length && Article.Body.Length <= 5000)
                            calc = 0.31;
                        if (1000 < Article.Body.Length && Article.Body.Length <= 2000)
                            calc = 0.285;
                        if (500 < Article.Body.Length && Article.Body.Length <= 1000)
                            calc = 0.26;
                        if (Article.Body.Length <= 500)
                            calc = 0.21;
                    }
                    flyer.WhereFlyIn = calc;

                }
                else
                    flyer.Visible = false;
                flyer.ReleaseDate = Article.ReleaseDate;
            }
        }
        else
        {
            if (scarabFlyer != null && DisplayMode != DisplayModes.print)
            {
                scarabFlyer.Visible = true;
                //Response.Write("ScarabFLYer");
                //if (Article.ColumnID.HasValue && Article.ColumnID != 1332)
                if (Article.ColumnID.HasValue && (!Article.IssueID.HasValue || Article.Issue == null))
                {
                    scarabFlyer.ColumnID = Article.ColumnID.Value;
                    scarabFlyer.SourceWebID = Article.WebID;
                    double calc = 0.5;
                    if (RequestContext.CurrentColumn != null && !string.IsNullOrEmpty(RequestContext.CurrentColumn.WebID)
                        && RequestContext.CurrentColumn.WebID == "nagyitas")
                    {
                        calc = 0.92;
                    }
                    else
                    {
                        if (7000 < Article.Body.Length && Article.Body.Length < 9000)
                            calc = 0.4;
                        if (5000 < Article.Body.Length && Article.Body.Length <= 7000)
                            calc = 0.38;
                        if (2000 < Article.Body.Length && Article.Body.Length <= 5000)
                            calc = 0.31;
                        if (1000 < Article.Body.Length && Article.Body.Length <= 2000)
                            calc = 0.285;
                        if (500 < Article.Body.Length && Article.Body.Length <= 1000)
                            calc = 0.26;
                        if (Article.Body.Length <= 500)
                            calc = 0.21;
                    }
                    scarabFlyer.WhereFlyIn = calc;
                    if (rand == 'B')
                        scarabFlyer.RecommandationType = "ALSO_VIEWED"; //"RELATED";
                    if (rand == 'C')
                        scarabFlyer.RecommandationType = "RELATED";
                }
                else
                    scarabFlyer.Visible = false;
                scarabFlyer.ReleaseDate = Article.ReleaseDate;
            }
        }

        /*//Add the processed body as a control to the placeHolder
        hldArticleBody.Controls.Add(ProcessedBody);
        if (DisplayMode != DisplayModes.print && RequestContext.CurrentColumn.WebID != "pub")
            hldArticleBody.PostRender += new PostRenderedEvent(onArticleBodyRendered);*/

        if (Article.Author != null)
        {
            Article.Author.Load();
        }
        plhAuthorHolder.Visible = ((Article.Author != null) && (!Article.Author.Name.Equals("")));
        if (Issue != null)
        {
            phdIssueArticleAuthor.Visible = ((Article.Author != null) && (!Article.Author.Name.Equals("")));
        }

        //breaking news
        if (Article.BreakingNewsID.HasValue && ctrlBreakingNews != null)
        {
            if (QueryStringParser.Exist("breakingNewsItemId") && QueryStringParser.GetInt("BreakingNewsItemId", -1) != -1)
            {
                ctrlBreakingNews.BreakingNewsItemId = QueryStringParser.GetInt("BreakingNewsItemId", -1);
            }
            ctrlBreakingNews.BreakingID = Article.BreakingNewsID.Value;
            ctrlBreakingNews.Article = Article;
            ctrlBreakingNews.ArticlePageIndex = this.PageIndex;
            ctrlBreakingNews.PrintPreview = DisplayMode == DisplayModes.print;
        }

        //Bind the tags
        if (Article.Tags != null && Article.Tags.Count > 0 && DisplayMode != DisplayModes.print)
        {
            rptTags.DataSource = Article.Tags;
            rptTags.DataBind();

            for (int i = 0; i < Article.Tags.Count; i++)
            {
                tagsText += Article.Tags[i].Name;
                if (i < Article.Tags.Count - 1)
                    tagsText += ", ";
            }
        }

        //Check issue
        if (Issue != null)
        {
            if (isLatestIssue)
            {
                if (Article.IssueLocked.HasValue && Article.IssueLocked.Value)
                {
                    hldLockedMessage.Visible = true;
                    showFullBody = false;
                }
            }
            else
            {
                if (RequestContext.CurrentPublicUser == null)
                {
                    hldMustLoggedIn.Visible = true;
                    showFullBody = false;
                }
            }
        }

        //Bind the linked articles
        if (showFullBody)
        {
            if (Article.LinkedArticles != null && Article.LinkedArticles.Count > 0 && DisplayMode != DisplayModes.print)
            {
                rptLinkedArticles.DataSource = Article.LinkedArticles;
                rptLinkedArticles.DataBind();
            }

            if (Article.Links != null && Article.Links.Count > 0 && DisplayMode != DisplayModes.print)
            {
                rptLinkedLinks.DataSource = Article.Links;
                rptLinkedLinks.DataBind();
            }
        }
        
        if (RequestContext.CurrentColumn != null && RequestContext.CurrentColumn.ParentColumn != null && RequestContext.CurrentColumn.ParentColumn.EntityID != null && !String.IsNullOrEmpty(RequestContext.CurrentColumn.ParentColumn.WebID))
            mainColumnWebId = RequestContext.CurrentColumn.ParentColumn.WebID.ToLower();
        
        int prLayoutID = 4580;

        PageLayoutIDForParSec = new Dictionary<int, decimal>();

        //Set layouts
        switch (mainColumnWebId)
        {
            case "itthon":
                AddLayout("4578", hldLeadBanner);
                AddLayout("4610", hldBottom468);
                AddLayout("4611", hldBottom300);
                AddLayout("4765", hldCikk468Alul);
                prLayoutID = 5000;
                AddLayout("5018", plhPRArticle);
                break;

            case "vilag":
                AddLayout("4604", hldLeadBanner);
                AddLayout("4606", hldBottom468);
                AddLayout("4607", hldBottom300);
                AddLayout("4767", hldCikk468Alul);
                prLayoutID = 5001;
                AddLayout("5020", plhPRArticle);
                break;

            case "gazdasag":
                AddLayout("4613", hldLeadBanner);
                AddLayout("4615", hldBottom468);
                AddLayout("4616", hldBottom300);
                AddLayout("4768", hldCikk468Alul);
                prLayoutID = 5002;
                AddLayout("5022", plhPRArticle);
                break;

            case "pr_cikkek":
                AddLayout("4817", hldLeadBanner);
                break;

            case "tudomany":
                AddLayout("4618", hldLeadBanner);
                AddLayout("4620", hldBottom468);
                AddLayout("4621", hldBottom300);
                AddLayout("4769", hldCikk468Alul);
                prLayoutID = 5003;
                AddLayout("5024", plhPRArticle);
                break;

            case "kultura":
                AddLayout("4623", hldLeadBanner);
                AddLayout("4625", hldBottom468);
                AddLayout("4626", hldBottom300);
                AddLayout("4770", hldCikk468Alul);
                prLayoutID = 5007;
                AddLayout("5026", plhPRArticle);
                break;

            case "sport":
                AddLayout("4628", hldLeadBanner);
                AddLayout("4630", hldBottom468);
                AddLayout("4631", hldBottom300);
                AddLayout("4771", hldCikk468Alul);
                prLayoutID = 5006;
                AddLayout("5028", plhPRArticle);
                break;

            case "kkv":
                AddLayout("4633", hldLeadBanner);
                AddLayout("4635", hldBottom468);
                AddLayout("4636", hldBottom300);
                AddLayout("4772", hldCikk468Alul);
                prLayoutID = 5012;
                AddLayout("5030", plhPRArticle);
                break;

            case "karrier":
                AddLayout("4638", hldLeadBanner);
                AddLayout("4640", hldBottom468);
                AddLayout("4641", hldBottom300);
                AddLayout("4773", hldCikk468Alul);
                prLayoutID = 5010;
                AddLayout("5032", plhPRArticle);
                break;

            case "egeszseg":
                AddLayout("4643", hldLeadBanner);
                AddLayout("4645", hldBottom468);
                AddLayout("4646", hldBottom300);
                AddLayout("4774", hldCikk468Alul);
                prLayoutID = 5009;
                AddLayout("5034", plhPRArticle);
                break;

            case "panorama":
                AddLayout("4648", hldLeadBanner);
                AddLayout("4650", hldBottom468);
                AddLayout("4651", hldBottom300);
                AddLayout("4775", hldCikk468Alul);
                prLayoutID = 5004;
                AddLayout("5036", plhPRArticle);
                break;

            case "gasztronomia":
                AddLayout("4653", hldLeadBanner);
                AddLayout("4655", hldBottom468);
                AddLayout("4656", hldBottom300);
                AddLayout("4776", hldCikk468Alul);
                prLayoutID = 5011;
                AddLayout("5038", plhPRArticle);
                break;

            case "cegauto":
                AddLayout("4658", hldLeadBanner);
                AddLayout("4660", hldBottom468);
                AddLayout("4661", hldBottom300);
                AddLayout("4777", hldCikk468Alul);
                prLayoutID = 5008;
                AddLayout("5040", plhPRArticle);
                break;

            case "velemeny":
                AddLayout("4663", hldLeadBanner);
                AddLayout("4665", hldBottom468);
                AddLayout("4666", hldBottom300);
                AddLayout("4780", hldCikk468Alul);
                prLayoutID = 5005;
                AddLayout("5042", plhPRArticle);
                break;

            case "hetilap":
                AddLayout("4689", hldLeadBanner);
                AddLayout("4580", hldBottom468Alul);
                AddLayout("4692", hldBottom300);
                break;

            case "nagyitas":
                AddLayout("4779", hldCikk468Alul);
                break;
            case "gocpontok":
                AddLayout("4826", hldLeadBanner);
                AddLayout("4580", hldBottom468);
                AddLayout("4581", hldBottom300);
                AddLayout("4778", hldCikk468Alul);
                break;

            case "top500":
                AddLayout("4827", hldLeadBanner);
                AddLayout("4580", hldBottom468);
                AddLayout("4581", hldBottom300);
                AddLayout("4778", hldCikk468Alul);
                break;

            case "napi_merites":
                AddLayout("4826", hldLeadBanner);
                AddLayout("4825", hldBottom468);
                break;

            case "w":
                AddLayout("5014", hldLeadBanner);
                break;

            default:
                AddLayout("4667", hldLeadBanner);
                AddLayout("4580", hldBottom468);
                AddLayout("4581", hldBottom300);
                AddLayout("4778", hldCikk468Alul);
                prLayoutID = 5013;
                break;
        }

        PageLayoutIDForParSec.Add(3, prLayoutID);
        this.PreProcessedBody += new PreProcessedBodyEvent(PreProcessedBodyBanner);

        //Add the processed body as a control to the placeHolder
        hldArticleBody.Controls.Add(ProcessedBody);
        if (DisplayMode != DisplayModes.print && RequestContext.CurrentColumn.WebID != "pub")
            hldArticleBody.PostRender += new PostRenderedEvent(onArticleBodyRendered);
        
        base.OnLoad(e);
    }

    void PreProcessedBodyBanner(ArticleView holder, int afterParNumber, string outputText)
    {
        if (!string.IsNullOrEmpty(outputText))
        {
            HtmlDocument htmlDoc = new HtmlDocument();
            htmlDoc.OptionWriteEmptyNodes = true;
            htmlDoc.LoadHtml(holder.Article.Body);
            //HtmlNodeCollection nodes = htmlDoc.DocumentNode.SelectNodes("p");
            HtmlNodeCollection nodes = htmlDoc.DocumentNode.SelectNodes(@"span/p | span/blockquote/p | span/div/figure | span/embed | span/object | span/iframe[contains(@src, 'youtube')] | span/iframe[contains(@src, 'vimeo')] |
              p | blockquote/p |div/figure | embed | object | iframe[contains(@src, 'youtube')] | iframe[contains(@src, 'vimeo')]");
            if (nodes != null)
            {
                int parCount = nodes.Count;
                if (parCount > afterParNumber)
                {
                    HtmlNode tmpNode = htmlDoc.CreateTextNode(outputText);
                    HtmlNode targetNode = nodes[afterParNumber];
                    targetNode.ParentNode.InsertAfter(tmpNode, targetNode);
                }

            }
            holder.Article.Body = htmlDoc.DocumentNode.InnerHtml;
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


    private static readonly int minLengthForAdsense = 1000;
    public void onArticleBodyRendered(ArticleBodyPlaceHolder holder, HtmlTextWriter writer, string outputText)
    {
        if (!String.IsNullOrEmpty(outputText) && 
            Regex.Replace(outputText, @"<[a-zA-Z\/][^>]*>", "").Trim().Length > minLengthForAdsense &&
            (
                outputText.Trim().IndexOf("class=\"picture") == -1 || 
                outputText.Trim().IndexOf("class=\"picture") > 700
            ) &&
            (
                outputText.Trim().IndexOf("<table") == -1 ||
                outputText.Trim().IndexOf("<table") > 700
            ) &&
            !RequestContext.CurrentColumn.Name.ToLower().Equals("egyeb") &&
            !RequestContext.CurrentColumn.Name.ToLower().Equals("nagyítás") &&
            !RequestContext.CurrentColumn.Name.ToLower().Equals("pr cikkek")
        )
        {
            //Banner bannerControl = (Banner)LoadControl("~/skins/default/controls/cms/Banner.ascx");
            //bannerControl.ZoneID = "30637";
            PageLayoutControl pgControl = new PageLayoutControl();
            //120-as lead
            switch (mainColumnWebId)
            {
                case "itthon":
                    pgControl.PageID = "4608";
                    //pgControl.PageID = "4705";
                    break;

                case "vilag":
                    pgControl.PageID = "4603";
                    break;

                case "gazdasag":
                    pgControl.PageID = "4612";
                    break;

                case "tudomany":
                    pgControl.PageID = "4617";
                    break;

                case "kultura":
                    pgControl.PageID = "4622";
                    break;

                case "sport":
                    pgControl.PageID = "4627";
                    break;

                case "kkv":
                    pgControl.PageID = "4632";
                    break;

                case "karrier":
                    pgControl.PageID = "4637";
                    break;

                case "egeszseg":
                    pgControl.PageID = "4642";
                    break;

                case "panorama":
                    pgControl.PageID = "4647";
                    break;

                case "gasztronomia":
                    pgControl.PageID = "4652";
                    break;

                case "cegauto":
                    pgControl.PageID = "4657";
                    break;

                case "velemeny":
                    pgControl.PageID = "4662";
                    break;

                case "hetilap":
                    pgControl.PageID = "4688";
                    break;

                default:
                    pgControl.PageID = "4577";
                    break;
            }                
            pgControl.TemplateItemName = "pageLayout";
            pgControl.IsCachingEnabled = true;
            pgControl.CacheSeconds = 30;

            //holder.Controls.AddAt(0, bannerControl);
            holder.Controls.AddAt(0, pgControl);

            ////render manually
            //outputText = holder.GetRendererContent();

            ////writer.Write(PrepareBody(outputText));
            //writer.Write(outputText);
            //return;
        }
        else
        {
            if (!RequestContext.CurrentColumn.Name.ToLower().Equals("egyeb") && !RequestContext.CurrentColumn.Name.ToLower().Equals("nagyítás"))
            {
                PageLayoutControl pgControl = new PageLayoutControl();
                //468-as lead
                switch (mainColumnWebId)
                {
                    case "itthon":
                        pgControl.PageID = "4609";
                        break;

                    case "vilag":
                        pgControl.PageID = "4605";
                        break;

                    case "gazdasag":
                        pgControl.PageID = "4614";
                        break;

                    case "tudomany":
                        pgControl.PageID = "4619";
                        break;

                    case "kultura":
                        pgControl.PageID = "4624";
                        break;

                    case "sport":
                        pgControl.PageID = "4629";
                        break;

                    case "kkv":
                        pgControl.PageID = "4634";
                        break;

                    case "karrier":
                        pgControl.PageID = "4639";
                        break;

                    case "egeszseg":
                        pgControl.PageID = "4644";
                        break;

                    case "panorama":
                        pgControl.PageID = "4649";
                        break;

                    case "gasztronomia":
                        pgControl.PageID = "4654";
                        break;

                    case "cegauto":
                        pgControl.PageID = "4659";
                        break;

                    case "velemeny":
                        pgControl.PageID = "4664";
                        break;

                    case "hetilap":
                        pgControl.PageID = "4690";
                        break;

                    default:
                        pgControl.PageID = "4579";
                        break;
                } 
                pgControl.TemplateItemName = "pageLayout";
                pgControl.IsCachingEnabled = true;
                pgControl.CacheSeconds = 30;

                //holder.Controls.AddAt(0, bannerControl);
                holder.Controls.AddAt(0, pgControl);
            }
        }
        holder.FinalRender(writer);
        
    }

    /*private string PrepareBody(string outputText)
    {
        if (String.IsNullOrEmpty(outputText))
            return outputText;

        Regex pRegex = new Regex("<p[^>]*>", RegexOptions.IgnoreCase | RegexOptions.Multiline);
        outputText = pRegex.Replace(outputText, "<br />");
        pRegex = new Regex("</p[^>]*>", RegexOptions.IgnoreCase | RegexOptions.Multiline);
        outputText = pRegex.Replace(outputText, "<br />");

        if (outputText.Trim().IndexOf("<p><strong><br />") == 0)
            outputText = "<p><strong>" + outputText.Substring(("<p><strong><br />").Length);

        if (outputText.Trim().IndexOf("<strong><br />") == 0)
            outputText = "<strong>" + outputText.Substring(("<strong><br />").Length);

        if (outputText.Trim().IndexOf("<p><strong><i><br />") == 0)
            outputText = "<p><strong><i>" + outputText.Substring(("<p><strong><i><br />").Length);

        if (outputText.Trim().IndexOf("<strong><i><br />") == 0)
            outputText = "<strong><i>" + outputText.Substring(("<strong><i><br />").Length);

        if (outputText.Trim().IndexOf("<p><br />") == 0)
            outputText = "<p>" + outputText.Substring(("<p><br />").Length);

        if (outputText.Trim().IndexOf("<p />") == 0)
            outputText = outputText.Substring(("<p />").Length);

        if (outputText.Trim().IndexOf("<br /><br /><br />") == 0)
            outputText = outputText.Substring(("<br /><br /><br />").Length);

        if (outputText.Trim().IndexOf("<br /><br />") == 0)
            outputText = outputText.Substring(("<br /><br />").Length);

        if (outputText.Trim().IndexOf("<br />") == 0)
            outputText = outputText.Substring(("<br />").Length);

        outputText = outputText.Replace("<br /><br /><br />", "<br />");

        return outputText;
    }*/
</script>

