<%@ Control Language="C#" %>

<script language="javascript" type="text/javascript">
    var generatedAt = '<%=DateTime.Now.AddMinutes(1).ToString("yyyy.MM.dd HH:mm") %>';
</script>
<%--<div id="newsNotification" style="float:left; margin:0 0 0 10px;">--%>
<div id="newsNotification" <%= !itIsInPgContent ? @"style=""margin: 0 10px 0 10px;""" : string.Empty %>>
    <div class="boxcontainer" style="position:relative; overflow:visible; z-index:100;">
        <div class="box" style="overflow:visible;">
            <a id="newsUpdate" class="notification" href="javascript:void('0');"></a>
            <div class="boxbody boxcontainer" style="display:none; position:absolute; top:-3px; left:-3px; background:#ffc; z-index:99999; width: 598px; padding: 1px;" id="latestNotificationNews">
                <div class="box" style="padding-bottom: 10px;">
					<div class="boxtitle">
						<span id="notiCloser" style="float:right; font-weight: bold; margin-top: 12px; cursor:pointer;" >X</span>
						<h6>MOST ÉRKEZETT</h6>
					</div>
                </div>
            </div> 
        </div>                         
    </div>                    
</div>

<script type="text/javascript">
    if ($('#footLBannerForNotifier') && $('#footLBannerForNotifier').children() && $('#footLBannerForNotifier').children().length > 0)
        $('#newsNotification').css('float', 'left');
</script>

<script runat="server">
    private bool itIsInPgContent = false;

    public string ItIsInPgContent
    {
        set
        {
            if (!string.IsNullOrEmpty(value))
                bool.TryParse(value, out itIsInPgContent);
        }
    }
</script>