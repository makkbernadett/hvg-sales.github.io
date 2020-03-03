<%@ Control Language="C#" %>
<div class="video-cimlap">
    <table cellspacing="0" cellpadding="0" class="embedvideo" style="width: 620px;">
        <tr>
            <td class="embedvideotop"><img src="/skins/default/img/videoupleft.gif" alt="" /></td>
        </tr>
        <tr>
            <td class="embedvideobody">
                <h2><a href="/video" title="Videók">VIDEÓK</a></h2>
                <%= CustomizeEmbedCode()%>
                <%--<iframe src="http://player.vimeo.com/video/21529160" width="550" height="309" frameborder="0">
                </iframe>--%>
            </td>
        </tr>
        <tr>
            <td class="embedvideofooter" style="background-image: none;">
                <iframe src="<%= string.Format("http://www.facebook.com/plugins/like.php?href={0}&amp;layout=button_count&amp;show_faces=false&amp;width=100&amp;action=like&amp;colorscheme=light&amp;height=21", GetVideoURL(video.WebID))%>"
                    scrolling="no" frameborder="0" style="float: right; padding-top: 10px; border: none;
                    overflow: hidden; width: 100px; height: 21px;" allowtransparency="true"></iframe>
                <h6>
                    <a href="<%=GetVideoURL(video.WebID) %>" title="<%=video.Title %>"><%=video.Title %></a></h6>
                <b>Szerző:</b>&nbsp;<%=video.Author %><br />
            </td>
        </tr>
        <tr>
            <td class="embedvideobody embedvideofooter">
                <div class="related">
                    <asp:Repeater ID="rptRelated" runat="server" Visible="false">
                    <ItemTemplate>
                        <div class="<%# Container.ItemIndex == 2 ? "third last" : "third"%>">
                            <a class="imageframe_wide" href="<%# GetVideoURL(((CMS.BusinessEntities.VideoEntity)Container.DataItem).WebID)%>" title="<%# ((CMS.BusinessEntities.VideoEntity)Container.DataItem).Title%>">
                                <img class="transparent" style="background: #151515 url(<%#!string.IsNullOrEmpty(((CMS.BusinessEntities.VideoEntity)Container.DataItem).PreviewImageID) ? ImageUrl(((CMS.BusinessEntities.VideoEntity)Container.DataItem).PreviewImageID, viewID) : "http://hvg.hu/static/skins/default/img/no_video.png"%>) no-repeat 50% 50%"
                                    alt="" src="http://hvg.hu/skins/default/img/play_wide.png" /></a>
                            <h2>
                                <a href="<%# GetVideoURL(((CMS.BusinessEntities.VideoEntity)Container.DataItem).WebID)%>" title="<%# ((CMS.BusinessEntities.VideoEntity)Container.DataItem).Title%>"><%# ((CMS.BusinessEntities.VideoEntity)Container.DataItem).Title%></a></h2>
                        </div>
                    </ItemTemplate>
                    </asp:Repeater>
                    <%--<div class="third">
                        <a class="imageframe_wide" href="" title="">
                            <img class="transparent" style="background: #151515 url(http://hvg.hu/image.aspx?id=8bf3386b-3408-4440-803f-5f65c925392c&view=2307cce3-0efd-4a14-b0c8-7432c987ab7a) no-repeat 50% 50%"
                                alt="" src="http://hvg.hu/skins/default/img/play_wide.png" /></a>
                        <h2>
                            <a href="" title="">Segítőkutyák</a></h2>
                    </div>
                    <div class="third">
                        <a class="imageframe_wide" href="" title="">
                            <img class="transparent" style="background: #151515 url(http://hvg.hu/image.aspx?id=8bf3386b-3408-4440-803f-5f65c925392c&view=2307cce3-0efd-4a14-b0c8-7432c987ab7a) no-repeat 50% 50%"
                                alt="" src="http://hvg.hu/skins/default/img/play_wide.png" /></a>
                        <h2>
                            <a href="" title="">Melyik a nehezebb? Az ólom, a vas vagy a színarany?</a></h2>
                    </div>
                    <div class="third last">
                        <a class="imageframe_wide" href="" title="">
                            <img class="transparent" style="background: #151515 url(http://hvg.hu/image.aspx?id=8bf3386b-3408-4440-803f-5f65c925392c&view=2307cce3-0efd-4a14-b0c8-7432c987ab7a) no-repeat 50% 50%"
                                alt="" src="http://hvg.hu/skins/default/img/play_wide.png" /></a>
                        <h2>
                            <a href="" title="">Videó: a Tűzraktér nem fog kiköltözni</a></h2>
                    </div>--%>
                    <div class="cl">
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td class="embedvideobottom">
                <a href="<%=GetVideoURL(null) %>" title="További videók">További videók</a>
            </td>
        </tr>
    </table>
</div>

<script runat="server">
    private CMS.BusinessEntities.VideoEntity video = null;
    private int playerHeight = 326;
    private int playerWidth = 580;
    private int HVGHDvideosNum = 0;
    private int VideoListNum = 0;
    private System.Collections.Generic.List<CMS.BusinessEntities.VideoEntity> videoList = null;
    private string listVideoSource = "egyeb";
    private string viewID = "2307cce3-0efd-4a14-b0c8-7432c987ab7a";

    protected string ImageUrl(string imageID, string viewID)
    {
        return CMS.WebUtilities.PageNavigator.ImageURL(CMS.WebUtilities.RequestContext.CurrentSite, imageID, viewID);
    }
    
    protected string GetVideoURL(string videoWebID)
    {
        string ret = "http://hvg.hu/video";
        if (!string.IsNullOrEmpty(videoWebID))
            ret = string.Format("http://hvg.hu/video/{0}", System.Web.HttpUtility.UrlEncode(videoWebID));
        return ret;
    }
    
    protected override void OnPreRender(EventArgs e)
    {
        video = CMS.BusinessProcess.Managers.ManagerFactory.ContentManagerProvider.GetVideos(1, 1, null, null, CMS.WebUtilities.RequestContext.CurrentSite, "1", "is_enabled", null, "HVGHD", true, ref HVGHDvideosNum)[0];
        videoList = CMS.BusinessProcess.Managers.ManagerFactory.ContentManagerProvider.GetVideos(1, 3, null, null, CMS.WebUtilities.RequestContext.CurrentSite, "1", "is_enabled", null, listVideoSource, true, ref VideoListNum);
        if (rptRelated != null && videoList != null && videoList.Count == 3)
        {
            rptRelated.DataSource = videoList;
            rptRelated.DataBind();
            rptRelated.Visible = true;
        }
        base.OnPreRender(e);
    }

    private string CustomizeEmbedCode()
    {
        string ret = video.EmbededCode;
        string vimeoURLPattern = "http://vimeo.com/api/oembed.xml?url={0}";
        string youtubeURLPattern = "http://www.youtube.com/oembed?url={0}&format=xml";
        /*String vodCode = @"<script type=""text/javascript"" src=""/videoplayer/swfobject.js"">";
            vodCode = vodCode + @"<\/script>";
            vodCode = vodCode + @"<div align=""center"">";
            vodCode = vodCode + @"<embed type=""application/x-shockwave-flash"" src=""/videoplayer/flvplayer.swf"" width=""" + playerWidth.ToString() + @""" height=""" + playerHeight.ToString() + @""" style=""undefined"" id=""mpl"" name=""mpl"" quality=""high"" allowfullscreen=""true"" flashvars=""file= {0}&amp;image= http://hvg.hu/images/hvg_video_player_skin_8.png"">";
            vodCode = vodCode + @"<script language=""javascript"" type=""text/javascript"">";
            vodCode = vodCode + @"var so = new SWFObject('/videoplayer/flvplayer.swf','mpl', " + playerWidth.ToString() + @", " + playerHeight.ToString() + @", '7');";
            vodCode = vodCode + @"so.addParam('allowfullscreen',true);";
            //vodCode = vodCode + @"so.addVariable(""file"", "" http://vod.hvg.hu/hvg_flv/szloma.flv"");";
            vodCode = vodCode + @"so.addVariable(""file"", "" {0}"");";
            vodCode = vodCode + @"so.addVariable(""image"", "" http://hvg.hu/images/hvg_video_player_skin_8.png"");";
            //vodCode = vodCode + @"so.write(""videoContainer"");";
            vodCode = vodCode + @"<\/script>";
            vodCode = vodCode + @"<\/div>";*/
        String vodCode = @"<script type=""text/javascript"" src=""/videoplayer/swfobject.js"">";
        //String vodCode = @"<script type=""text/javascript"" src=""/videoplayer/{3}.js"">";  // swfobject || swfobject2
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
                    //ret = string.Format(vodCode, url).Replace(@"<\/","</");
                    if (url.Contains(".flv"))
                        ret = string.Format(vodCode, url, "flvplayer", string.Empty).Replace(@"<\/", "</");
                    else if (url.Contains(".mp4"))
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
        catch (Exception e)
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
			ret = GetInfoByXml("//html", content, 0);
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