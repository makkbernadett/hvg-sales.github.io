<%@ Control Language="C#" %>
<%@ OutputCache Duration="60" VaryByParam="none" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.IO" %>
<div class="boxcontainer">
    <div class="box">
        <div class="boxtitle">
            <h6>
                <a href="http://hvg.hu/befektetes" style="color: #4B4B4B;">BEFEKTETÉS</a></h6>
        </div>
        <ul id="indexes" class="boxtitle tabmenu">
            <li>
                <h4>
                    <a href="#indexes-1">RÉSZVÉNYEK</a></h4>
                <div>
                    /</div>
            </li>
            <li>
                <h4>
                    <a href="#indexes-2">INDEXEK</a></h4>
                <div>
                    /</div>
            </li>
            <li>
                <h4>
                    <a href="#indexes-3">ÁRFOLYAMOK</a></h4>
            </li>
        </ul>
        <div id="indexpanes">
            <div class="greyboxbody" id="indexes-1">
                <%--<CMSControls:XmlControl DocumentSource="~/cachedData/R_Others43.xml" TransformSource="~/skins/default/xsl/reszvenyek.xslt" runat="server" />
                <CMSControls:XmlControl DocumentSource="~/cachedData/econet_bet_kesleltetett.xml" TransformSource="~/skins/default/xsl/new_econet_reszvenyek.xslt" runat="server" />--%>
                <asp:PlaceHolder runat="server" ID="XmlControlPlaceHolderReszveny" />
            </div>
            <div class="greyboxbody" id="indexes-2">
                <CMSControls:XmlControl ID="ctrlIndex" TransformSource="~/skins/default/xsl/indexek.xslt"
                    runat="server" />
            </div>
            <div class="greyboxbody" id="indexes-3">                
                <asp:PlaceHolder runat="server" ID="XmlControlPlaceHolderDeviza" />
            </div>
        </div>
        <a class="more" href="/befektetes" title="összes részvény árfolyama">összes részvény
            árfolyama &raquo;</a>
        <script language="javascript" type="text/javascript">
            $(function () {
                $('#indexes').tabs("div#indexpanes > div", { current: 'selected', fx: { height: 'toggle', opacity: 'toggle', duration: 200} });
            });
        </script>
    </div>
</div>
<script runat="server">
    protected override void OnPreRender(EventArgs e)
    {
        XmlDocument doc = new XmlDocument();

        using (Stream strm = new MemoryStream())
        
        using (XmlWriter writer = XmlTextWriter.Create(strm))
        {
            try
            {
                writer.WriteStartDocument(true);

                writer.WriteStartElement("RATES");

                AddRateURL("http://download.finance.yahoo.com/d/quotes.csv?s=%5EDJI&f=sl1d1t1c1ohgv&e=.csv", writer);
                AddRateURL("http://download.finance.yahoo.com/d/quotes.csv?s=%5EIXIC&f=sl1d1t1c1ohgv&e=.csv", writer);
                AddRateURL("http://download.finance.yahoo.com/d/quotes.csv?s=%5EGSPC&f=sl1d1t1c1ohgv&e=.csv", writer);
                /*AddRateURL("http://proxy.hvg.hu/StreamingProxy.ashx?url=http://download.finance.yahoo.com/d/quotes.csv?s=%5EDJI%26f=sl1d1t1c1ohgv%26e=.csv", writer);
                AddRateURL("http://proxy.hvg.hu/StreamingProxy.ashx?url=http://download.finance.yahoo.com/d/quotes.csv?s=%5EIXIC%26f=sl1d1t1c1ohgv%26e=.csv", writer);
                AddRateURL("http://proxy.hvg.hu/StreamingProxy.ashx?url=http://download.finance.yahoo.com/d/quotes.csv?s=%5EGSPC%26f=sl1d1t1c1ohgv%26e=.csv", writer);*/
                AddRateURL("http://proxy.hvg.hu/StreamingProxy.ashx?url=http://download.finance.yahoo.com/d/quotes.csv?s=%5EFTSE%26f=sl1d1t1c1ohgv%26e=.csv", writer);
                //AddRateURL("http://proxy.hvg.hu/StreamingProxy.ashx?url=http://download.finance.yahoo.com/d/quotes.csv?s=%5EGDAXI%26f=sl1d1t1c1ohgv%26e=.csv", writer);
                AddRateURL("http://download.finance.yahoo.com/d/quotes.csv?s=%5EGDAXI&f=sl1d1t1c1ohgv&e=.csv", writer);

                writer.WriteEndElement(); // end topElementName
                writer.WriteEndDocument();

                writer.Flush();

                strm.Position = 0;

                using (StreamReader srd = new StreamReader(strm))
                {
                    doc.LoadXml(srd.ReadToEnd());
                }
            }
            catch (Exception ex)
            {
                //Csak, hogy ne menjen ki a kivétel....
            }
        }

        ctrlIndex.Document = doc;

        //XmlControlItem xml_reszveny = new XmlControlItem("http://proxy.hvg.hu/StreamingProxy.ashx?url=http://services.eco.hu/ecoline/ecoline_bet_kesleltetett.php", "skins/default/xsl/new_econet_reszvenyek.xslt");
        XmlControlItem xml_reszveny = new XmlControlItem("http://proxy.hvg.hu/StreamingProxy.ashx?url=http://vendor.portfoliofinancial.hu/ecohu/ecoline/ecoline_bet_kesleltetett.php", "skins/default/xsl/new_econet_reszvenyek.xslt");
        XmlControlPlaceHolderReszveny.Controls.Add(new LiteralControl(xml_reszveny.HTML));

        XmlControlItem xml_deviza = new XmlControlItem("http://proxy.hvg.hu/StreamingProxy.ashx?url=http://data150.fxdirekt.net/fxfeed/gfxrates.php?login=54ghHtdk5gd45gfd%26type=FX", "skins/default/xsl/deviza.xslt");
        XmlControlPlaceHolderDeviza.Controls.Add(new LiteralControl(xml_deviza.HTML));
        
        
        //doc.Save(Server.MapPath("~/haho.xml"));      
    }

    /*private void AddRate(string fileName, XmlWriter writer)
    {
        try
        {

            String[] fileContent = System.IO.File.ReadAllLines(Server.MapPath(fileName));
            foreach (string line in fileContent)
            {
                string[] fields = line.Split(',');

                string indexName = fields[0].Replace("\"", String.Empty).Replace("^", String.Empty);
                string indexValue = fields[1];
                string change = fields[4];

                writer.WriteStartElement("RATE");
                writer.WriteAttributeString("ITEM", indexName);
                writer.WriteAttributeString("BID", indexValue);
                writer.WriteAttributeString("CHANGE", change);
                writer.WriteEndElement();
            }
        }
        catch { }
    }*/


    private void AddRateURL(string url, XmlWriter writer)
    {
        using (System.Net.WebClient client = new System.Net.WebClient())
        {
            client.Headers["Accept-Encoding"] = "UTF-8";

            client.Encoding = System.Text.Encoding.UTF8;
            byte[] data = client.DownloadData(url);

            string result = Encoding.UTF8.GetString(data);

            MemoryStream mstr = new MemoryStream(data);            

            using (StreamReader sr = new StreamReader(mstr))
            {
                while (!sr.EndOfStream)
                {
                    try
                    {
                        string line = sr.ReadLine();
                        string[] fields = line.Split(',');
                        string indexName = fields[0].Replace("\"", String.Empty).Replace("^", String.Empty);
                        string indexValue = fields[1];
                        string change = fields[4];

                        writer.WriteStartElement("RATE");
                        writer.WriteAttributeString("ITEM", indexName);
                        writer.WriteAttributeString("BID", indexValue);
                        writer.WriteAttributeString("CHANGE", change);
                        writer.WriteEndElement();
                    }
                    catch (Exception)
                    {
                    }
                } 
            }
            mstr.Close();
        }
    }
</script>
