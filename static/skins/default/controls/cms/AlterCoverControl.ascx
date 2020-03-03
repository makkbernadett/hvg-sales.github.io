<%@ Control Language="C#" Inherits="CMS.WebUtilities.Components.Controls.AlterCoverControl"%>
<%@ Register TagPrefix="HVGControl" TagName="ShoutBox" Src="~/skins/default/controls/ShoutBox.ascx" %>

<%@ Import Namespace="CMS.BusinessEntities" %>
<%@ Import Namespace="CMS.WebUtilities" %>
<%@ Import Namespace="CMS.Utilities" %>

<%@ Import Namespace="System.Linq" %>

<%if (AlterCover.Enabled && AlterCover.BeginDate < DateTime.Now && AlterCover.EndDate > DateTime.Now) {%>

<script type="text/javascript">
    /*if ($("#pg-head")) {
        $("#pg-head").addClass("maintitle-side-red");
    }*/
    if ($("#toptopics")) {
        $("#toptopics").hide();
    }
    function hideBreaking() {
        //$.cookie(bannerHaveSeenCookieName, "yes", { expires: 1, path: '/' });
        if ($("#pg-breaking")) {
            $('#pg-breaking').slideUp(2000, function() {
                //$("#toptopics").fadeIn();
                $("#pg-head").removeClass("maintitle-side-red");
                $("#toptopics").slideDown(50);
            });
        }
    }
    function hideBreakingContent() {
        if ($("#pg-breaking-content")) {
            $('#pg-breaking-content').slideUp(2000, function() {
                $("#breakingButton").show();
            });
        }
    }
    function showBreakingContent() {
        if ($("#pg-breaking-content")) {
            $("#breakingButton").hide();
            $('#pg-breaking-content').slideDown(2000, function() {
            });
        }
    }
</script>

<div id="pg-breaking">
    <div id="pg-breaking-title">
        <a id="breakingButton" style="display:none;" href="javascript:showBreakingContent();"><img alt="kinyit" src="http://hvg.hu/static/skins/default/img/altCim/megnezem.png" style="float: right; margin: 23px 0pt 0pt;"></a>
        <h2><span></span> <a href="<%=AlterCoverURL%>" title="<%=!string.IsNullOrEmpty(AlterCoverCaption) ? AlterCoverCaption : AlterCover.Title%>"><%=!string.IsNullOrEmpty(AlterCoverCaption) ? AlterCoverCaption : AlterCover.Title%></a></h2>
        <div class="pg-breaking-tit-end"></div>

        <asp:Repeater ID="rptTags" runat="server">
            <ItemTemplate>
                <div class="pg-breaking-title">
                    <a href="<%# PageNavigator.TagURL(((TagEntity)Container.DataItem).Name) %>"><%# ((TagEntity)Container.DataItem).Name%></a></div>
                <div class="pg-breaking-titleend">
                </div>
            </ItemTemplate>
        </asp:Repeater>
        <div class="cleared"></div>
    </div>
	
    <div id="pg-breaking-content">
        <%--Becsukva: div id="pg-breaking-content" style="display:none;"--%>
        <%if (AlterCover.Type == 1)
          {%>
        <div class="pg-breaking-content-row bordertop borderbottom" style="overflow:hidden">
            <div class="pg-breaking-content-doublebox space">
                <h1>
                    <a href="<%=PageNavigator.GetPublicArticleUrl(AlterCover.LeadingArticle) %>"><%=!string.IsNullOrEmpty(LeadingArticleCaption) ? LeadingArticleCaption : AlterCover.LeadingArticle.Caption%></a></h1>
                <%if (!string.IsNullOrEmpty(LeadingArticleImageID)) {%>
                <div style="border: 4px solid #464646;">
                    <a href="<%=PageNavigator.GetPublicArticleUrl(AlterCover.LeadingArticle) %>">
                        <img src="<%= !string.IsNullOrEmpty(LeadingArticleImageID) ? ImageUrl(LeadingArticleImageID, "20ac203a-a70d-454a-bbae-15bb02fc23ac") : string.Empty%>" alt="<%=!string.IsNullOrEmpty(LeadingArticleImageAlt) ? LeadingArticleImageAlt : string.Empty %>" title="<%= !string.IsNullOrEmpty(LeadingArticleImageSource) ? LeadingArticleImageSource : string.Empty%>" style="border: 1px solid #777777;" />
                    </a>
                </div>
                <%}
                else if (AlterCover.LeadingArticle.DefaultImageID.HasValue)
                  {%>
                <div style="border: 4px solid #464646;">
                    <a href="<%=PageNavigator.GetPublicArticleUrl(AlterCover.LeadingArticle) %>">
                        <img src="<%= AlterCover.LeadingArticle.DefaultImageID.HasValue ? ImageUrl(AlterCover.LeadingArticle.DefaultImageID.Value.ToString(), "20ac203a-a70d-454a-bbae-15bb02fc23ac") : string.Empty%>" alt="" style="border: 1px solid #777777;" />
                    </a>
                </div>
                <%}
                  else
                  { %>
                  <%=!string.IsNullOrEmpty(LeadingArticleLead) ? LeadingArticleLead : AlterCover.LeadingArticle.Lead%>
                <%} %>
            </div>
			
            <div class="pg-breaking-content-box borderbottom" style="border:0;">
                <asp:Repeater runat="server" ID="rptOuterLinks">
                    <HeaderTemplate>
                        <ul>
                    </HeaderTemplate>
                    <ItemTemplate>
                        <li><a href="<%#((AlterCoverLinkEntity)Container.DataItem).Address %>" title="<%# ((AlterCoverLinkEntity)Container.DataItem).Caption%>" <%#!string.IsNullOrEmpty(((AlterCoverLinkEntity)Container.DataItem).Target) && !string.IsNullOrEmpty(((AlterCoverLinkEntity)Container.DataItem).Target.Trim()) ? string.Format("target=\"{0}\"", ((AlterCoverLinkEntity)Container.DataItem).Target) : string.Empty%>><%# ((AlterCoverLinkEntity)Container.DataItem).Caption%></a></li>
                    </ItemTemplate>
                    <FooterTemplate>
                        </ul>
                    </FooterTemplate>
                </asp:Repeater>
            </div>
			
            <%if (AlterCover !=null && AlterCover.LinkedVideos != null && AlterCover.LinkedVideos.Count > 0)
              {%>
                <div class="pg-breaking-content-box bordertop">
                    <div id="videofolyam-box">
                        <div id="videofolyam-scroller">
                            <h6>Videofolyam</h6>
                                <iframe src="<%=string.Format("/iframeAltercover/{0}",AlterCover.WebID) %>"
                                    scrolling="yes" frameborder="0" style="border: none; overflow-y: scroll; overflow-x: hidden; width: 288px;
                                    height: 214px;" allowtransparency="true"></iframe>
                        </div>
                    </div>
                </div>
            <%}
              else
              { %>
                <div class="pg-breaking-content-box">
	                <h2 style="padding-left: 0"><a href="<%= PageNavigator.GetPublicArticleUrl(AlterCover.InsteadOfVideoArticle)%>" title="<%=AlterCover.InsteadOfVideoArticle.Caption%>"><%=AlterCover.InsteadOfVideoArticle.Caption%></a></h2>
	                <%if (AlterCover.InsteadOfVideoArticle.DefaultImageID.HasValue) {%>
	                    <img src="<%= AlterCover.InsteadOfVideoArticle.DefaultImageID.HasValue ? ImageUrl(AlterCover.InsteadOfVideoArticle.DefaultImageID.Value.ToString(), "6daefd71-de94-479f-8c61-26f36c53db88") : string.Empty%>" alt="<%=AlterCover.InsteadOfVideoArticle.Caption%>" style="border: 4px solid #464646;margin-right:5px;" align="left" />
	                <%} %>
                    <p style="font-style:normal;">
                        <%--<a href="<%= PageNavigator.GetPublicArticleUrl(AlterCover.InsteadOfVideoArticle)%>" title="<%=AlterCover.InsteadOfVideoArticle.Caption%>"><%=ControlHelper.CheckMaxLength(AlterCover.InsteadOfVideoArticle.Lead, 400)%></a>--%>
                        <%=ControlHelper.CheckMaxLength(AlterCover.InsteadOfVideoArticle.Lead, 400)%>
                    </p>
                </div>
            <%} %>
			
            <div class="cleared"></div>
        </div>
        <%}
          else
          {%>
        <div class="pg-breaking-content-row bordertop borderbottom">

			<div class="pg-breaking-content-doublebox space">
				<h1><a href="<%=PageNavigator.GetPublicArticleUrl(AlterCover.LeadingArticle) %>"><%=!string.IsNullOrEmpty(LeadingArticleCaption) ? LeadingArticleCaption : AlterCover.LeadingArticle.Caption%></a></h1>
				<%if (!string.IsNullOrEmpty(LeadingArticleImageID)) {%>
				    <a href="<%=PageNavigator.GetPublicArticleUrl(AlterCover.LeadingArticle) %>" title="<%=!string.IsNullOrEmpty(LeadingArticleCaption) ? LeadingArticleCaption : AlterCover.LeadingArticle.Caption%>">
                    <img src="<%= !string.IsNullOrEmpty(LeadingArticleImageID) ? ImageUrl(LeadingArticleImageID, "d95fde10-723e-462a-a755-b18b1f019bac") : string.Empty%>" alt="<%= !string.IsNullOrEmpty(LeadingArticleImageAlt) ? LeadingArticleImageAlt : string.Empty %>" title="<%=!string.IsNullOrEmpty(LeadingArticleImageSource) ? LeadingArticleImageSource : string.Empty %>" style="border: 4px solid #464646;margin-right:15px;" align="left" />
                </a>
				<%}
                  else if (AlterCover.LeadingArticle.DefaultImageID.HasValue)
                  {%>
                <a href="<%=PageNavigator.GetPublicArticleUrl(AlterCover.LeadingArticle) %>" title="<%=AlterCover.LeadingArticle.Caption%>">
                    <img src="<%= AlterCover.LeadingArticle.DefaultImageID.HasValue ? ImageUrl(AlterCover.LeadingArticle.DefaultImageID.Value.ToString(), "d95fde10-723e-462a-a755-b18b1f019bac") : string.Empty%>" alt="<%=AlterCover.LeadingArticle.Caption%>" style="border: 4px solid #464646;margin-right:15px;" align="left" />
                </a>
                <%} %>
				<p style="margin-left:104px;">
				    <%--<a href="<%=PageNavigator.GetPublicArticleUrl(AlterCover.LeadingArticle) %>" title="<%=AlterCover.LeadingArticle.Caption%>"><%=ControlHelper.CheckMaxLength(AlterCover.LeadingArticle.Lead,400)%></a>--%>
				    <%=ControlHelper.CheckMaxLength(!string.IsNullOrEmpty(LeadingArticleLead) ? LeadingArticleLead : AlterCover.LeadingArticle.Lead, 400)%>
				</p>
				<asp:Repeater runat="server" ID="rptLeadingArticleLinkedArticles">
				    <HeaderTemplate>
				        <ul>
				    </HeaderTemplate>
				    <ItemTemplate>
				        <li>
					        <a href="<%# PageNavigator.GetPublicArticleUrl((ArticleBaseEntity)Container.DataItem)%>" title="<%# ((ArticleBaseEntity)Container.DataItem).Caption%>"><%# ((ArticleBaseEntity)Container.DataItem).Caption%></a>
					    </li>
				    </ItemTemplate>
				    <FooterTemplate>
				        </ul>
				    </FooterTemplate>
				</asp:Repeater>
			</div>
			
			<%if (AlterCover != null && AlterCover.LinkedVideos != null && AlterCover.LinkedVideos.Count > 0)
            {%>
			    <div class="pg-breaking-content-box" style="padding: 20px 0 4px 0; background: url('http://hvg.hu/static/skins/default/img/altCim/videofolyambg2.png') no-repeat bottom;">
				    <div id="videofolyam-box">
					    <div id="videofolyam-scroller">
						    <h6>Videofolyam</h6>
						        <iframe src="<%=string.Format("/iframeAltercover/{0}",AlterCover.WebID) %>"
                                    scrolling="yes" frameborder="0" style="border: none; overflow-y: scroll; overflow-x: hidden; width: 290px;
                                    height: 217px;" allowtransparency="true"></iframe>
					    </div>
				    </div>
			    </div>
			<%}
             else
             { %>
                 <div class="pg-breaking-content-box">
	                <h2><a href="<%= PageNavigator.GetPublicArticleUrl(AlterCover.InsteadOfVideoArticle)%>" title="<%=AlterCover.InsteadOfVideoArticle.Caption%>"><%=AlterCover.InsteadOfVideoArticle.Caption%></a></h2>
	                <%if (AlterCover.InsteadOfVideoArticle.DefaultImageID.HasValue) {%>
	                    <img src="<%= AlterCover.InsteadOfVideoArticle.DefaultImageID.HasValue ? ImageUrl(AlterCover.InsteadOfVideoArticle.DefaultImageID.Value.ToString(), "6daefd71-de94-479f-8c61-26f36c53db88") : string.Empty%>" alt="<%=AlterCover.InsteadOfVideoArticle.Caption%>" style="border: 4px solid #464646;margin-right:5px;" align="left" />
	                <%} %>
                    <p style="font-style:normal;">
                        <%--<a href="<%= PageNavigator.GetPublicArticleUrl(AlterCover.InsteadOfVideoArticle)%>" title="<%=AlterCover.InsteadOfVideoArticle.Caption%>"><%=ControlHelper.CheckMaxLength(AlterCover.InsteadOfVideoArticle.Lead, 400)%></a>--%>
                        <%=ControlHelper.CheckMaxLength(AlterCover.InsteadOfVideoArticle.Lead, 400)%>
                    </p>
                </div>
			<%} %>
			<div class="cleared"></div>
		</div>
		<%} %>
		<%if (AlterCover != null && AlterCover.LinkedArticles != null && AlterCover.LinkedArticles.Count >= 3)
        {%>
		    <div class="pg-breaking-content-row bordertop borderbottom">
		        <asp:Repeater runat="server" ID="rptLinkedArticles">
                    <ItemTemplate>
                        <asp:PlaceHolder runat="server" Visible="<%#Container.ItemIndex < 2%>">
                            <div class="pg-breaking-content-box space">
			                    <h2><a href="<%# PageNavigator.GetPublicArticleUrl((ArticleBaseEntity)Container.DataItem)%>" title="<%#((ArticleBaseEntity)Container.DataItem).Caption%>"><%#((ArticleBaseEntity)Container.DataItem).Caption%></a></h2>
			                    <asp:PlaceHolder runat="server" Visible="<%#((ArticleBaseEntity)Container.DataItem).DefaultImageID.HasValue%>">
			                        <img src="<%# ((ArticleBaseEntity)Container.DataItem).DefaultImageID.HasValue ? ImageUrl(((ArticleBaseEntity)Container.DataItem).DefaultImageID.Value.ToString(), "6daefd71-de94-479f-8c61-26f36c53db88") : string.Empty%>" alt="<%#((ArticleBaseEntity)Container.DataItem).Caption%>" style="border: 4px solid #464646;margin-right:5px;" align="left" />
			                    </asp:PlaceHolder>
			                    <p style="font-style:normal;">
			                        <%--<a href="<%# PageNavigator.GetPublicArticleUrl((ArticleBaseEntity)Container.DataItem)%>" title="<%#((ArticleBaseEntity)Container.DataItem).Caption%>"><%#ControlHelper.CheckMaxLength(((ArticleBaseEntity)Container.DataItem).Lead,200)%></a>--%>
			                        <%#ControlHelper.CheckMaxLength(((ArticleBaseEntity)Container.DataItem).Lead,200)%>
			                    </p>
		                    </div>
                        </asp:PlaceHolder>
                        <asp:PlaceHolder runat="server" Visible="<%#Container.ItemIndex == 2%>">
                            <div class="pg-breaking-content-box">
				                <h2><a href="<%# PageNavigator.GetPublicArticleUrl((ArticleBaseEntity)Container.DataItem)%>" title="<%#((ArticleBaseEntity)Container.DataItem).Caption%>"><%#((ArticleBaseEntity)Container.DataItem).Caption%></a></h2>
			                    <asp:PlaceHolder runat="server" Visible="<%#((ArticleBaseEntity)Container.DataItem).DefaultImageID.HasValue%>">
			                        <img src="<%# ((ArticleBaseEntity)Container.DataItem).DefaultImageID.HasValue ? ImageUrl(((ArticleBaseEntity)Container.DataItem).DefaultImageID.Value.ToString(), "6daefd71-de94-479f-8c61-26f36c53db88") : string.Empty%>" alt="<%#((ArticleBaseEntity)Container.DataItem).Caption%>" style="border: 4px solid #464646;margin-right:5px;" align="left" />
			                    </asp:PlaceHolder>
			                    <p style="font-style:normal;">
			                        <%--<a href="<%# PageNavigator.GetPublicArticleUrl((ArticleBaseEntity)Container.DataItem)%>" title="<%#((ArticleBaseEntity)Container.DataItem).Caption%>"><%#ControlHelper.CheckMaxLength(((ArticleBaseEntity)Container.DataItem).Lead,200)%></a>--%>
			                        <%#ControlHelper.CheckMaxLength(((ArticleBaseEntity)Container.DataItem).Lead,200)%>
			                    </p>
			                </div>
                        </asp:PlaceHolder>
                    </ItemTemplate>
                </asp:Repeater>
			    <div class="cleared"></div>
		    </div>
		<%} %>
        <div class="pg-breaking-content-row bordertop borderbottom">
            <%if (AlterCover.BreakingArticle != null && AlterCover.BreakingArticle.Breaking != null
                && AlterCover.BreakingArticle.Breaking.Items != null && AlterCover.BreakingArticle.Breaking.Items.Count > 0)
              {%>
                <div class="pg-breaking-content-box space">
                    <h6 class="percrolpercre">Percről percre</h6>
                    <table class="breaking-top-news" cellpadding="0" cellspacing="0">
                        <asp:Repeater runat="server" ID="rptBreaking">
                            <ItemTemplate>
                                <tr>
                                    <td valign="top">
                                        <%#((BreakingNewsItemEntity)Container.DataItem).ReleaseDate.HasValue ? ((BreakingNewsItemEntity)Container.DataItem).ReleaseDate.Value.ToString("HH:mm")
                                            : ((BreakingNewsItemEntity)Container.DataItem).CreateDate.ToString("HH:mm")%>
                                    </td>
                                    <td>
                                        <a href="<%#string.Format("{0}/b{1}#{1}", PageNavigator.GetPublicArticleUrl(AlterCover.BreakingArticle, AlterCover.BreakingArticle.Column,1), ((BreakingNewsItemEntity)Container.DataItem).EntityID.ID)%>" title="<%#((BreakingNewsItemEntity)Container.DataItem).Caption %>"><%#((BreakingNewsItemEntity)Container.DataItem).Caption %></a>
                                    </td>
                                </tr>
                            </ItemTemplate>
                        </asp:Repeater>
                    </table>
                </div>
            <%}
              else
              { %>
                <div class="pg-breaking-content-box" style="padding:0 20px 0 0;">
	                <h2 style="padding-left: 0"><a href="<%= PageNavigator.GetPublicArticleUrl(AlterCover.InsteadOfBreakingArticle)%>" title="<%=AlterCover.InsteadOfBreakingArticle.Caption%>"><%=AlterCover.InsteadOfBreakingArticle.Caption%></a></h2>
	                <%if (AlterCover.InsteadOfBreakingArticle.DefaultImageID.HasValue) {%>
	                    <img src="<%= AlterCover.InsteadOfBreakingArticle.DefaultImageID.HasValue ? ImageUrl(AlterCover.InsteadOfBreakingArticle.DefaultImageID.Value.ToString(), "6daefd71-de94-479f-8c61-26f36c53db88") : string.Empty%>" alt="<%=AlterCover.InsteadOfBreakingArticle.Caption%>" style="border: 4px solid #464646;margin-right:5px;" align="left" />
	                <%} %>
                    <p style="font-style:normal;">
                        <%--<a href="<%= PageNavigator.GetPublicArticleUrl(AlterCover.InsteadOfBreakingArticle)%>" title="<%=AlterCover.InsteadOfBreakingArticle.Caption%>"><%=ControlHelper.CheckMaxLength(AlterCover.InsteadOfBreakingArticle.Lead, 400)%></a>--%>
                        <%=ControlHelper.CheckMaxLength(AlterCover.InsteadOfBreakingArticle.Lead, 400)%>
                    </p>
                </div>
            <%} %>
			
            <HVGControl:ShoutBox id="ctrlShoutBox" runat="server"/>
			
            <%if (!string.IsNullOrEmpty(AlterCover.LinkedGalleryID) && AlterCover.LinkedGallery != null)
              {%>
            <div class="pg-breaking-content-box">
                <h6 class="grafikon">
                    <%--<%=AlterCover.LinkedGallery != null && !string.IsNullOrEmpty(AlterCover.LinkedGallery.Caption) ? AlterCover.LinkedGallery.Caption : string.Empty%>--%>
                    Képek
                </h6>
                <div style="border: 4px solid #464646;">
                    <%--<%=!string.IsNullOrEmpty(AlterCover.LinkedGalleryID) ? string.Format("javascript:openGallery('{0}')", AlterCover.LinkedGalleryID) : "javascript:void(null)"%>--%>
                    <a href="#" onclick="<%=!string.IsNullOrEmpty(AlterCover.LinkedGalleryID) ? string.Format("openGallery('{0}'); return false;", AlterCover.LinkedGalleryID) : "return false;"%>" title="<%=AlterCover.LinkedGallery != null && !string.IsNullOrEmpty(AlterCover.LinkedGallery.Caption) ? AlterCover.LinkedGallery.Caption : string.Empty %>" target="_blank">
                        <%= !string.IsNullOrEmpty(AlterCover.LinkedGallery.FirstImageID) ? string.Format(imgHTML,ImageUrl(AlterCover.LinkedGallery.FirstImageID, "9548e4e5-652f-4eac-9ec3-025dc07ed14c")) : string.Empty%>
                        <%--<img src="<%= !string.IsNullOrEmpty(AlterCover.LinkedGallery.FirstImageID) ? ImageUrl(AlterCover.LinkedGallery.FirstImageID, "9548e4e5-652f-4eac-9ec3-025dc07ed14c") : string.Empty%>" alt="" style="border: 1px solid #777777;" />--%>
                    </a>
                </div>
                <h2 style="padding-left: 0">
                        <a href="#" onclick="<%=!string.IsNullOrEmpty(AlterCover.LinkedGalleryID) ? string.Format("openGallery('{0}'); return false;", AlterCover.LinkedGalleryID) : "return false;"%>" title="<%=AlterCover.LinkedGallery != null && !string.IsNullOrEmpty(AlterCover.LinkedGallery.Caption) ? AlterCover.LinkedGallery.Caption : string.Empty %>" target="_blank">
                            <%=AlterCover.LinkedGallery != null && !string.IsNullOrEmpty(AlterCover.LinkedGallery.Caption) ? AlterCover.LinkedGallery.Caption : string.Empty%>
                        </a>
                    </h2>
            </div>
            <%}
              else if (AlterCover.InsteadOfGalleryArticle != null
                  && AlterCover.InsteadOfGalleryArticle.Column != null
                  && !string.IsNullOrEmpty(AlterCover.InsteadOfGalleryArticle.Column.WebID)
                  && AlterCover.InsteadOfGalleryArticle.Column.WebID == "nagyitas")
              { %>
                <div class="pg-breaking-content-box">
                    <h6 class="grafikon">
                        Képek</h6>
                    <%if (AlterCover.InsteadOfGalleryArticle.DefaultImageID.HasValue) {%>
                        <div style="padding:0 0 10px 0; overflow:hidden;">
                            <a href="<%= PageNavigator.GetPublicArticleUrl(AlterCover.InsteadOfGalleryArticle)%>" title="<%=AlterCover.InsteadOfGalleryArticle.Caption%>">
	                            <img src="<%= AlterCover.InsteadOfGalleryArticle.DefaultImageID.HasValue ? ImageUrl(AlterCover.InsteadOfGalleryArticle.DefaultImageID.Value.ToString(), "9548e4e5-652f-4eac-9ec3-025dc07ed14c") : string.Empty%>" alt="<%=AlterCover.InsteadOfGalleryArticle.Caption%>" style="border: 4px solid #464646;margin-right:5px;" align="left" />
	                        </a>
                        </div>
                    <%} %>
                    <h2 style="padding-left: 0"><a href="<%= PageNavigator.GetPublicArticleUrl(AlterCover.InsteadOfGalleryArticle)%>" title="<%=AlterCover.InsteadOfGalleryArticle.Caption%>"><%=AlterCover.InsteadOfGalleryArticle.Caption%></a></h2>
                </div>
            <%}
              else
              { %>
                <div class="pg-breaking-content-box">
	                <h2><a href="<%= PageNavigator.GetPublicArticleUrl(AlterCover.InsteadOfGalleryArticle)%>" title="<%=AlterCover.InsteadOfGalleryArticle.Caption%>"><%=AlterCover.InsteadOfGalleryArticle.Caption%></a></h2>
	                <%if (AlterCover.InsteadOfGalleryArticle.DefaultImageID.HasValue) {%>
	                    <img src="<%= AlterCover.InsteadOfGalleryArticle.DefaultImageID.HasValue ? ImageUrl(AlterCover.InsteadOfGalleryArticle.DefaultImageID.Value.ToString(), "6daefd71-de94-479f-8c61-26f36c53db88") : string.Empty%>" alt="<%=AlterCover.InsteadOfGalleryArticle.Caption%>" style="border: 4px solid #464646;margin-right:5px;" align="left" />
	                <%} %>
                    <p style="font-style:normal;">
                        <%--<a href="<%= PageNavigator.GetPublicArticleUrl(AlterCover.InsteadOfGalleryArticle)%>" title="<%=AlterCover.InsteadOfGalleryArticle.Caption%>"><%=ControlHelper.CheckMaxLength(AlterCover.InsteadOfGalleryArticle.Lead, 400)%></a>--%>
                        <%=ControlHelper.CheckMaxLength(AlterCover.InsteadOfGalleryArticle.Lead, 400)%>
                    </p>
                </div>
            <%} %>
            <div class="cleared">
            </div>
        </div>
		
        <div class="pg-breaking-content-row bordertop">
			<div style="width:350px; margin:0 auto;">
				<p class="tetszett">Tetszett az összeállításunk?</p>
				<%--<iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fhvghu&amp;layout=button_count&amp;show_faces=false&amp;width=95&amp;action=like&amp;colorscheme=light&amp;height=21"
					scrolling="no" frameborder="0" style="border: none; overflow: hidden; width: 110px;
					height: 21px;" allowtransparency="true"></iframe>--%>
				<iframe src="<%=string.Format("http://www.facebook.com/plugins/like.php?href={0}&amp;layout=button_count&amp;show_faces=false&amp;width=110&amp;action=like&amp;colorscheme=light&amp;height=21",AlterCoverURL)%>"
					scrolling="no" frameborder="0" style="border:none; overflow:hidden;
					width:110px; height:21px;" allowTransparency="true"></iframe>
			</div>		
        </div>
		
        <div class="pg-breakingclose">
            <a href="javascript:hideBreakingContent();">
                <img src="http://hvg.hu/static/skins/default/img/altCim/pg-breakingclose-button.png" /></a>
        </div>
    </div>
</div>

<%} %>
<script runat="server">
    private int breakingLimit = 5;
    private string imgHTML = @"<img src=""{0}"" alt="""" style=""border: 1px solid #777777;"" />";

    /*protected override void OnInit(EventArgs e)
    {
        if (log != null && log.IsErrorEnabled)
        {
            log.Error("anyadért nem megy");
        }
        
        base.OnInit(e);
    }*/
    
    private string AlterCoverURL
    {
        get
        {
            string ret = "http://hvg.hu";
            if (AlterCover != null && !string.IsNullOrEmpty(AlterCover.WebID))
                ret = string.Format("http://hvg.hu/nap_temaja/{0}", AlterCover.WebID);
            return ret;
        }
    }

    protected override void OnPreRender(EventArgs e)
    {
        base.OnPreRender(e);
        if (AlterCover != null)
        {
            if (rptTags != null && AlterCover.Tags != null)
            {
                rptTags.DataSource = AlterCover.Tags;
                rptTags.DataBind();
            }

            if (AlterCover.Type == 1)
            {
                if (rptOuterLinks != null && AlterCover.Links != null)
                {
                    rptOuterLinks.DataSource = AlterCover.Links.Count > 5 ? AlterCover.Links.GetRange(0,5) : AlterCover.Links;
                    rptOuterLinks.DataBind();
                }

                /*if (rptVideos != null && AlterCover.LinkedVideos != null)
                {
                    rptVideos.DataSource = AlterCover.LinkedVideos;
                    rptVideos.DataBind();
                }*/
            }
            else
            {
                /*if (rptVideosSmall != null && AlterCover.LinkedVideos != null)
                {
                    rptVideosSmall.DataSource = AlterCover.LinkedVideos;
                    rptVideosSmall.DataBind();
                }*/

                if (rptLeadingArticleLinkedArticles != null)
                {
                    if (LinksArticlesOfLeadingArticle != null && LinksArticlesOfLeadingArticle.Count > 0)
                    {
                        rptLeadingArticleLinkedArticles.DataSource = LinksArticlesOfLeadingArticle;
                        rptLeadingArticleLinkedArticles.DataBind();
                    }
                    else if(AlterCover.LeadingArticle != null && AlterCover.LeadingArticle.LinkedArticles != null)
                    {
                        rptLeadingArticleLinkedArticles.DataSource = AlterCover.LeadingArticle.LinkedArticles;
                        rptLeadingArticleLinkedArticles.DataBind();
                    }
                }

                /*if (rptLeadingArticleLinkedArticles != null &&
                    AlterCover.LeadingArticle != null && AlterCover.LeadingArticle.LinkedArticles != null)
                {
                    rptLeadingArticleLinkedArticles.DataSource = AlterCover.LeadingArticle.LinkedArticles;
                    rptLeadingArticleLinkedArticles.DataBind();
                }*/
            }

            if (rptLinkedArticles != null && AlterCover.LinkedArticles != null && AlterCover.LinkedArticles.Count >= 3)
            {
                System.Collections.Generic.List<ArticleBaseEntity> firstThreeLinkedArticles = new System.Collections.Generic.List<ArticleBaseEntity>();
                foreach (ArticleBaseEntity item in AlterCover.LinkedArticles)
                {
                    if (firstThreeLinkedArticles.Count < 4)
                        firstThreeLinkedArticles.Add(item);
                    else
                        break;
                }
                rptLinkedArticles.DataSource = firstThreeLinkedArticles;
                rptLinkedArticles.DataBind();
            }

            if (rptBreaking != null && AlterCover.BreakingArticle != null
                && AlterCover.BreakingArticle.Breaking != null && AlterCover.BreakingArticle.Breaking.Items != null)
            {
                var sortedByReleaseDateBreakingNewsItemList = new System.Collections.Generic.SortedDictionary<DateTime, BreakingNewsItemEntity>();

                foreach (BreakingNewsItemEntity item in AlterCover.BreakingArticle.Breaking.Items)
                {
                    if (item.Enabled && item.ReleaseDate.HasValue && !sortedByReleaseDateBreakingNewsItemList.ContainsValue(item) && !sortedByReleaseDateBreakingNewsItemList.ContainsKey(item.ReleaseDate.Value))
                        sortedByReleaseDateBreakingNewsItemList.Add(item.ReleaseDate.Value, item);
                }

                System.Collections.Generic.List<BreakingNewsItemEntity> limitedSortedByReleaseDateBreakingNewsItemList = new System.Collections.Generic.List<BreakingNewsItemEntity>();

                foreach (var kvp in sortedByReleaseDateBreakingNewsItemList.Reverse())
                {
                    if (limitedSortedByReleaseDateBreakingNewsItemList.Count < breakingLimit)
                        limitedSortedByReleaseDateBreakingNewsItemList.Add(((BreakingNewsItemEntity)kvp.Value));
                    else
                        break;
                }

                rptBreaking.DataSource = limitedSortedByReleaseDateBreakingNewsItemList;
                rptBreaking.DataBind();
            }

        }
    }

    private string CustomizeEmbedCode(VideoEntity video)
    {
        /*int playerWidth = RequestContext.CurrentColumn != null && RequestContext.CurrentColumn.WebID == "nagyitas" ? 920 : 550;
        int playerHeight = RequestContext.CurrentColumn != null && RequestContext.CurrentColumn.WebID == "nagyitas" ? 520 : 350;*/
        int playerWidth = 246;
        int playerHeight = 147;

        if (video.Width != 0)
        {
            double rate = Convert.ToDouble(playerWidth) / Convert.ToDouble(video.Width);
            playerHeight = Convert.ToInt32(video.Height * rate);
        }

        string ret = video.EmbededCode;
        string vimeoURLPattern = "http://vimeo.com/api/oembed.xml?url={0}";
        string youtubeURLPattern = "http://www.youtube.com/oembed?url={0}&format=xml";
        String vodCode = @"<script type=""text/javascript"" src=""/videoplayer/swfobject.js"">";
        vodCode = vodCode + @"<\/script>";
        vodCode = vodCode + @"<div align=""center"">";
        vodCode = vodCode + @"<embed type=""application/x-shockwave-flash"" src=""/videoplayer/flvplayer.swf"" width=""" + playerWidth.ToString() + @""" height=""" + playerHeight.ToString() + @""" style=""undefined"" id=""mpl"" name=""mpl"" quality=""high"" allowfullscreen=""true"" flashvars=""file= {0}&amp;image= http://hvg.hu/images/hvg_video_player_skin_8.png"">";
        vodCode = vodCode + @"<script language=""javascript"" type=""text/javascript"">";
        vodCode = vodCode + @"var so = new SWFObject('/videoplayer/flvplayer.swf','mpl', " + playerWidth.ToString() + @", " + playerHeight.ToString() + @", '7');";
        vodCode = vodCode + @"so.addParam('allowfullscreen',true);";
        //vodCode = vodCode + @"so.addVariable(""file"", "" http://vod.hvg.hu/hvg_flv/szloma.flv"");";
        vodCode = vodCode + @"so.addVariable(""file"", "" {0}"");";
        vodCode = vodCode + @"so.addVariable(""image"", "" http://hvg.hu/images/hvg_video_player_skin_8.png"");";
        //vodCode = vodCode + @"so.write(""VODContainer"");";
        vodCode = vodCode + @"<\/script>";
        vodCode = vodCode + @"<\/div>";

        short reqvestTimeout = 30;

        if (!string.IsNullOrEmpty(video.VideoUrl) && (string.IsNullOrEmpty(ret) || string.IsNullOrEmpty(ret.Trim())))
        {
            string url = video.VideoUrl;
            string domain = GetInfoByRegex(@"^(?:[^\/]+:\/\/)?([^\/:]+)*", url, 1);
            if (!string.IsNullOrEmpty(domain))
            {
                if (domain.Contains("vimeo.com"))
                {
                    ret = GetDetailsFrom(string.Format(vimeoURLPattern, url), reqvestTimeout);
                }
                else if (domain.Contains("youtube.com"))
                {
                    url = url.Replace("/v/", "/watch?v=");
                    ret = GetDetailsFrom(string.Format(youtubeURLPattern, url), reqvestTimeout);
                }
                else if (domain.Contains("vod.hvg.hu"))
                {
                    ret = string.Format(vodCode, url).Replace(@"<\/", "</");
                }
            }
        }

        if (!string.IsNullOrEmpty(ret))
        {
            if (ret.Contains("youtube") || ret.Contains("vimeo"))
            {
                ret = ret.Replace("&quot;", "\"");
                ret = RegexpReplace(ret, @"width=[""|']?(\d+)[""|']?", playerWidth.ToString());
                ret = RegexpReplace(ret, @"height=[""|']?(\d+)[""|']?", playerHeight.ToString());
                /*.Replace("height=\"" + video.Height.ToString() + "\"", "height=\"" + playerHeight.ToString() + "\"")
                .Replace("width=\"" + video.Width.ToString() + "\"", "width=\"" + playerWidth + "\"");*/
            }
            else
            {
                if (video.Height > playerHeight)
                {
                    ret = ret.Replace("&quot;", "\"");
                    ret = RegexpReplace(ret, @"height=[""|']?(\d+)[""|']?", playerHeight.ToString());
                    //.Replace("height=\"" + video.Height.ToString() + "\"", "height=\"" + playerHeight.ToString() + "\"");
                }
                if (video.Width > playerWidth)
                {
                    ret = ret.Replace("&quot;", "\"");
                    ret = RegexpReplace(ret, @"width=[""|']?(\d+)[""|']?", playerWidth.ToString());
                    //.Replace("width=\"" + video.Width.ToString() + "\"", "width=\"" + playerWidth + "\"");
                }
            }
        }

        return ret;
    }

    private string GetInfoByRegex(string pattern, string input, int index)
    {
        string ret = null;

        Regex regEx = new Regex(pattern, RegexOptions.IgnoreCase);
        MatchCollection collection = regEx.Matches(input);
        foreach (Match match in collection)
        {
            if (match.Groups.Count > index)
            {
                ret = match.Groups[index].Value;
                break;
            }
        }
        return ret;
    }

    private string GetDetailsFrom(string url, short requestTimeout)
    {
        string charset = string.Empty;
        string content = string.Empty;
        string ret = null;
        try
        {
            byte[] checkResult = GetPage(url, requestTimeout, out charset);
            Encoding encoder = new UTF8Encoding();
            try
            {
                encoder = Encoding.GetEncoding(charset);
            }
            catch { encoder = new UTF8Encoding(); }
            content = encoder.GetString(checkResult);
        }
        catch (Exception ex) { }

        try
        {
            ret = GetInfoByRegex(@"<html>(.*)</html>", content, 1).Replace("&lt;", "<").Replace("&gt;", ">");
        }
        catch (Exception ex) { }

        return ret;
    }

    private string RegexpReplace(string baseString, string stringToFind, string toReplace)
    {
        string ret = null;
        if (!string.IsNullOrEmpty(baseString)
            && !string.IsNullOrEmpty(stringToFind)
            && !string.IsNullOrEmpty(toReplace))
        {
            System.Text.RegularExpressions.MatchCollection mc = System.Text.RegularExpressions.Regex.Matches(baseString, stringToFind, System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            if (mc.Count > 0)
                if (mc[0].Groups.Count > 1)
                    ret = baseString.Replace(mc[0].Groups[1].Value, toReplace);
        }
        return ret;
    }

    public static byte[] GetPage(string url, short timeoutSeconds, out string charset)
    {
        byte[] content;

        if (!url.Contains("http://"))
            url = string.Format("http://{0}", url);
        System.Net.HttpWebRequest request = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(url);
        System.Net.WebResponse response = null;

        request.Method = "GET";
        request.UserAgent = "HVG RSS Reader v0.1";
        request.CookieContainer = new System.Net.CookieContainer();
        request.Timeout = timeoutSeconds * 1000;

        response = request.GetResponse();

        charset = GetEncoding(response.ContentType);

        using (System.IO.Stream responseStream = response.GetResponseStream())
        {
            using (System.IO.MemoryStream memoryStream = new System.IO.MemoryStream())
            {
                int count = 0;
                byte[] buffer = new byte[4096];

                do
                {
                    count = responseStream.Read(buffer, 0, buffer.Length);
                    memoryStream.Write(buffer, 0, count);

                } while (count != 0);

                content = memoryStream.ToArray();
            }
        }

        return content;
    }

    private static string GetEncoding(string value)
    {
        string result = String.Empty;

        Regex regEx = new Regex(@"charset=([^'|^""|^>]*)?", RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.IgnorePatternWhitespace);
        Match match = regEx.Match(value);

        if (match.Success)
        {
            try
            {
                result = match.Groups[1].Value;
            }
            // name is not a valid code page name.
            catch (ArgumentException exc) { }
        }

        if (String.IsNullOrEmpty(value))
        {
            //HACK!!
            value = value.Replace("\\\"", "\"\"");

            regEx = new Regex(@"encoding=\""([^>]*)?\""", RegexOptions.IgnoreCase | RegexOptions.Multiline | RegexOptions.IgnorePatternWhitespace);
            match = regEx.Match(value);
            if (match.Success)
            {
                try
                {
                    result = match.Groups[1].Value;
                }
                // name is not a valid code page name.
                catch (ArgumentException exc) { }
            }
        }

        return result;
    }
</script>