<%@ Control Inherits="CMS.WebUtilities.Components.Controls.ArticleVideo" Language="C#" %>
<%@ Import Namespace="CMS.BusinessEntities" %>
<%@ Import Namespace="CMS.WebUtilities" %>

<table cellspacing="0" cellpadding="0" class="embedvideo">
    <%--<tr>
        <td> 
            <%=Video.Title %>
        </td>
    </tr>--%>
    
	<tr><td class="embedvideotop"><img src="/skins/default/img/videoupleft.gif" alt="" /></td></tr>
	
    <tr>
        <td class="embedvideobody">
            <%--<%=CustomizeEmbedCode(Video.EmbededCode)%>--%>
            <%=CustomizeEmbedCode()%>
        </td>
    </tr>
	
	<tr>
		<td class="embedvideofooter">
			<iframe src="http://www.facebook.com/plugins/like.php?href=http://hvg.hu<%=GetVideoUrl(Video)%>&amp;layout=button_count&amp;show_faces=false&amp;width=95&amp;action=like&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="float: right; padding-top: 10px; border: none; overflow: hidden; width: 110px; height: 21px;" allowTransparency="true"></iframe>
			<h6><a href="http://hvg.hu<%=GetVideoUrl(Video)%>"><%=Video.Title %></a></h6>
			<%--<b>Szerző:</b> <%=Video.Author %><br />--%>
			<%= !string.IsNullOrEmpty(Video.Author) && !string.IsNullOrEmpty(Video.Author.Trim()) ? string.Format("<b>Szerző:</b>{0}<br />",Video.Author) : String.Empty %>
		</td>
	</tr>
	
	<tr><td class="embedvideobottom"><a href="/video/">További videók</a></td></tr>
	
    <%--<tr>
        <td>
            <asp:Repeater runat="server" ID="rptTags">
                <HeaderTemplate>
                    <h6>
                        Címkék:</h6>
                    <p class="tags">
                </HeaderTemplate>
                <ItemTemplate><asp:PlaceHolder runat="server" Visible="<%#Container.ItemIndex > 0 %>">;&nbsp;</asp:PlaceHolder><a href="<%#GetTagVideoUrl((TagEntity)Container.DataItem) %>" title="<%# ((TagEntity)Container.DataItem).Name %>"><%# ((TagEntity)Container.DataItem).Name %></a></ItemTemplate>
                <FooterTemplate>
                    </p>
                </FooterTemplate>
            </asp:Repeater>
        </td>
    </tr>
    <tr>
        <td>
            <asp:Repeater runat="server" ID="rptLinkedArticles">
                <HeaderTemplate>
                    <h6>
                        Kapcsolódó cikk:</h6>
                    <ul>
                </HeaderTemplate>
                <ItemTemplate>
                    <li>&bull;&nbsp;<a href="<%# PageNavigator.GetPublicArticleUrl((ArticleBaseEntity)Container.DataItem)%>" title="<%#((ArticleBaseEntity)Container.DataItem).Caption %>"><%#((ArticleBaseEntity)Container.DataItem).Caption %></a></li>
                </ItemTemplate>
                <FooterTemplate>
                    </ul>
                </FooterTemplate>
            </asp:Repeater>
        </td>
    </tr>
    <tr>
        <td>
            <b>Szerző:</b>&nbsp;<%=Video.Author %><br />
            <b>Feltöltve:</b>&nbsp;<%=Video.CreateDate.Value.ToString("yyyy. MMMM. dd.") %>
        </td>
    </tr>--%>
</table>

<script runat="server">
    protected override void OnPreRender(EventArgs e)
    {
        base.OnPreRender(e);
        if (Video != null)
        {
            /*if (rptTags != null && Video.Tags.Count > 0)
            {
                rptTags.DataSource = Video.Tags;
                rptTags.DataBind();
            }
            if (rptLinkedArticles != null && Video.LinkedArticles.Count > 0)
            {
                rptLinkedArticles.DataSource = Video.LinkedArticles;
                rptLinkedArticles.DataBind();
            }*/
            //PlayerWidth = 550;
        }
    }
	
	public string GetVideoUrl(VideoEntity video)
    {
        string ret = "#";
        if (video != null && !string.IsNullOrEmpty(video.WebID))
            ret = string.Format("/video/{0}", System.Web.HttpUtility.UrlEncode(video.WebID));
        return ret;
    }
	
    public string GetTagVideoUrl(TagEntity tag)
    {
        string ret = "#";
        if (tag != null && !string.IsNullOrEmpty(tag.Name))
            ret = string.Format("/videotag/{0}", tag.Name);
        return ret;
    }

    private string CustomizeEmbedCode()
    {
        int playerWidth = RequestContext.CurrentColumn != null && RequestContext.CurrentColumn.WebID == "nagyitas" ? 920 : 550;
        int playerHeight = RequestContext.CurrentColumn != null && RequestContext.CurrentColumn.WebID == "nagyitas" ? 520 : 350;
        if (Video.Width != 0)
        {
            double rate = Convert.ToDouble(playerWidth) / Convert.ToDouble(Video.Width);
            playerHeight = Convert.ToInt32(Video.Height * rate);
        }
        
        VideoEntity video = Video;
        string ret = video.EmbededCode;
        string vimeoURLPattern = "http://vimeo.com/api/oembed.xml?url={0}";
        string youtubeURLPattern = "http://www.youtube.com/oembed?url={0}&format=xml";
        String vodCode = @"<script type=""text/javascript"" src=""/videoplayer/swfobject.js"">";
        vodCode = vodCode + @"<\/script>";
        vodCode = vodCode + @"<div align=""center"">";
        //vodCode = vodCode + @"<embed type=""application/x-shockwave-flash"" src=""/videoplayer/flvplayer.swf"" width=""" + playerWidth.ToString() + @""" height=""" + playerHeight.ToString() + @""" style=""undefined"" id=""mpl"" name=""mpl"" quality=""high"" allowfullscreen=""true"" flashvars=""file= {0}&amp;image= http://hvg.hu/images/hvg_video_player_skin_8.png"">";
        vodCode = vodCode + @"<embed type=""application/x-shockwave-flash"" src=""/videoplayer/{1}.swf"" width=""" + playerWidth.ToString() + @""" height=""" + playerHeight.ToString() + @""" style=""undefined"" id=""mpl"" name=""mpl"" quality=""high"" allowfullscreen=""true"" flashvars=""file= {0}&amp;image= http://hvg.hu/images/hvg_video_player_skin_8.png"">";  // flvplayer || player-viral
        vodCode = vodCode + @"<script language=""javascript"" type=""text/javascript"">";
        //vodCode = vodCode + @"var so = new SWFObject('/videoplayer/flvplayer.swf','mpl', " + playerWidth.ToString() + @", " + playerHeight.ToString() + @", '7');";
        vodCode = vodCode + @"var so = new SWFObject('/videoplayer/{1}.swf','mpl', " + playerWidth.ToString() + @", " + playerHeight.ToString() + @", '7');";  // flvplayer || player-viral
        vodCode = vodCode + @"so.addParam('allowfullscreen',true);";
        vodCode = vodCode + "{2}"; // string.Empty || @"so.addVariable(""provider"", ""http"");"
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
                    if (url.Contains(".flv"))
                        ret = string.Format(vodCode, url, "flvplayer", string.Empty).Replace(@"<\/", "</");
                    else if(url.Contains(".mp4"))
                        ret = string.Format(vodCode, url, "player-viral", @"so.addVariable(""provider"", ""http"");").Replace(@"<\/", "</");
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

    private string GetInfoByXml(string xpath, string input, int index)
    {
        string ret = string.Empty;
        try
        {
            System.Xml.XmlDocument doc = new System.Xml.XmlDocument();
            doc.LoadXml(input);
            System.Xml.XmlNodeList nodes = doc.SelectNodes(xpath);
            if (nodes.Count > index)
            {
                ret = nodes[index].InnerXml;
                ret = Server.HtmlDecode(ret);
            }
            HttpContext.Current.Response.Write(string.Format("<!-- Video Resp: {0} -->", ret));
        }
        catch(Exception e)
        {
            HttpContext.Current.Response.Write(string.Format("<!-- VideoError: {0} -->", e.Message));
            ret = string.Empty;
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
            //ret = GetInfoByRegex(@"<html>(.*)</html>", content, 1).Replace("&lt;", "<").Replace("&gt;", ">");
            ret = GetInfoByXml("//html",content, 0);
        }
        catch (Exception ex) { }

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