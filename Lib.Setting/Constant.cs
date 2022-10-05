using System.Collections.Generic;

namespace Lib.Setting
{      
    public class Constant
    {
        public const string LOADING = "0";
        public const string UPDATING = "1";
        public const string SUCCESS = "2";
        public const string ERROR = "3";
        public const string PENDING = "0";
        public const string APPROVAL = "1";
        public const string ASSIGN = "2";
        
        public static string[] ATTRIBUTES_USER_PROFILE = new string[]
        {
            "Code",
            "ReferralCode",
            "HierarchyPath",
            "DateOfBirth",
            "Address",
            "Address2",
            "Phone",
            "StateProvince",
            "City",
            "ZipCode",
            "Sex",
            "Country",
            "NationalIdNumber",
            "NationalIdImage",
            "NationalIdImage2",
            "NationalIdSelfieImage"
        };
        public static string INSTANCE_FILE_IMPORT = "INSTANCE_DATA_01";
        public static string INSTANCE_DATA_SEND_MAIL = "INSTANCE_DATA_02";
        public static string INSTANCE_DATA_NOTIFICATIONS = "INSTANCE_NOTIFICATIONS";
        public static Dictionary<string, object> DICT_INSTANCE_NAME = new Dictionary<string, object>();
        public static Dictionary<string, int[]> DICT_INSTANCE_NAME_PROCESS = new Dictionary<string, int[]>();
        public static Dictionary<string, string> DICT_RETURN_CODE_TRANSACTION = new Dictionary<string, string>
        {
            {"100","Tiếp nhận giao dịch" },
            {"101","Giao dịch đang xử lý" },
            {"200","Giao dịch thành công" },
            {"203","Giao dịch bị lỗi" }
        };
        public static Dictionary<string, string> DICT_MIME_TYPES = new Dictionary<string, string> { 
            #region Big freaking list of mime types        
            {".323", "text/h323"},
            {".3g2", "video/3gpp2"},
            {".3gp", "video/3gpp"},
            {".3gp2", "video/3gpp2"},
            {".3gpp", "video/3gpp"},
            {".7z", "application/x-7z-compressed"},
            {".aa", "audio/audible"},
            {".AAC", "audio/aac"},
            {".aaf", "application/octet-stream"},
            {".aax", "audio/vnd.audible.aax"},
            {".ac3", "audio/ac3"},
            {".aca", "application/octet-stream"},
            {".accda", "application/msaccess.addin"},
            {".accdb", "application/msaccess"},
            {".accdc", "application/msaccess.cab"},
            {".accde", "application/msaccess"},
            {".accdr", "application/msaccess.runtime"},
            {".accdt", "application/msaccess"},
            {".accdw", "application/msaccess.webapplication"},
            {".accft", "application/msaccess.ftemplate"},
            {".acx", "application/internet-property-stream"},
            {".AddIn", "text/xml"},
            {".ade", "application/msaccess"},
            {".adobebridge", "application/x-bridge-url"},
            {".adp", "application/msaccess"},
            {".ADT", "audio/vnd.dlna.adts"},
            {".ADTS", "audio/aac"},
            {".afm", "application/octet-stream"},
            {".ai", "application/postscript"},
            {".aif", "audio/x-aiff"},
            {".aifc", "audio/aiff"},
            {".aiff", "audio/aiff"},
            {".air", "application/vnd.adobe.air-application-installer-package+zip"},
            {".amc", "application/x-mpeg"},
            {".application", "application/x-ms-application"},
            {".art", "image/x-jg"},
            {".asa", "application/xml"},
            {".asax", "application/xml"},
            {".ascx", "application/xml"},
            {".asd", "application/octet-stream"},
            {".asf", "video/x-ms-asf"},
            {".ashx", "application/xml"},
            {".asi", "application/octet-stream"},
            {".asm", "text/plain"},
            {".asmx", "application/xml"},
            {".aspx", "application/xml"},
            {".asr", "video/x-ms-asf"},
            {".asx", "video/x-ms-asf"},
            {".atom", "application/atom+xml"},
            {".au", "audio/basic"},
            {".avi", "video/x-msvideo"},
            {".axs", "application/olescript"},
            {".bas", "text/plain"},
            {".bcpio", "application/x-bcpio"},
            {".bin", "application/octet-stream"},
            {".bmp", "image/bmp"},
            {".c", "text/plain"},
            {".cab", "application/octet-stream"},
            {".caf", "audio/x-caf"},
            {".calx", "application/vnd.ms-office.calx"},
            {".cat", "application/vnd.ms-pki.seccat"},
            {".cc", "text/plain"},
            {".cd", "text/plain"},
            {".cdda", "audio/aiff"},
            {".cdf", "application/x-cdf"},
            {".cer", "application/x-x509-ca-cert"},
            {".chm", "application/octet-stream"},
            {".class", "application/x-java-applet"},
            {".clp", "application/x-msclip"},
            {".cmx", "image/x-cmx"},
            {".cnf", "text/plain"},
            {".cod", "image/cis-cod"},
            {".config", "application/xml"},
            {".contact", "text/x-ms-contact"},
            {".coverage", "application/xml"},
            {".cpio", "application/x-cpio"},
            {".cpp", "text/plain"},
            {".crd", "application/x-mscardfile"},
            {".crl", "application/pkix-crl"},
            {".crt", "application/x-x509-ca-cert"},
            {".cs", "text/plain"},
            {".csdproj", "text/plain"},
            {".csh", "application/x-csh"},
            {".csproj", "text/plain"},
            {".css", "text/css"},
            {".csv", "text/csv"},
            {".cur", "application/octet-stream"},
            {".cxx", "text/plain"},
            {".dat", "application/octet-stream"},
            {".datasource", "application/xml"},
            {".dbproj", "text/plain"},
            {".dcr", "application/x-director"},
            {".def", "text/plain"},
            {".deploy", "application/octet-stream"},
            {".der", "application/x-x509-ca-cert"},
            {".dgml", "application/xml"},
            {".dib", "image/bmp"},
            {".dif", "video/x-dv"},
            {".dir", "application/x-director"},
            {".disco", "text/xml"},
            {".dll", "application/x-msdownload"},
            {".dll.config", "text/xml"},
            {".dlm", "text/dlm"},
            {".doc", "application/msword"},
            {".docm", "application/vnd.ms-word.document.macroEnabled.12"},
            {".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
            {".dot", "application/msword"},
            {".dotm", "application/vnd.ms-word.template.macroEnabled.12"},
            {".dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template"},
            {".dsp", "application/octet-stream"},
            {".dsw", "text/plain"},
            {".dtd", "text/xml"},
            {".dtsConfig", "text/xml"},
            {".dv", "video/x-dv"},
            {".dvi", "application/x-dvi"},
            {".dwf", "drawing/x-dwf"},
            {".dwp", "application/octet-stream"},
            {".dxr", "application/x-director"},
            {".eml", "message/rfc822"},
            {".emz", "application/octet-stream"},
            {".eot", "application/octet-stream"},
            {".eps", "application/postscript"},
            {".etl", "application/etl"},
            {".etx", "text/x-setext"},
            {".evy", "application/envoy"},
            {".exe", "application/octet-stream"},
            {".exe.config", "text/xml"},
            {".fdf", "application/vnd.fdf"},
            {".fif", "application/fractals"},
            {".filters", "Application/xml"},
            {".fla", "application/octet-stream"},
            {".flr", "x-world/x-vrml"},
            {".flv", "video/x-flv"},
            {".fsscript", "application/fsharp-script"},
            {".fsx", "application/fsharp-script"},
            {".generictest", "application/xml"},
            {".gif", "image/gif"},
            {".group", "text/x-ms-group"},
            {".gsm", "audio/x-gsm"},
            {".gtar", "application/x-gtar"},
            {".gz", "application/x-gzip"},
            {".h", "text/plain"},
            {".hdf", "application/x-hdf"},
            {".hdml", "text/x-hdml"},
            {".hhc", "application/x-oleobject"},
            {".hhk", "application/octet-stream"},
            {".hhp", "application/octet-stream"},
            {".hlp", "application/winhlp"},
            {".hpp", "text/plain"},
            {".hqx", "application/mac-binhex40"},
            {".hta", "application/hta"},
            {".htc", "text/x-component"},
            {".htm", "text/html"},
            {".html", "text/html"},
            {".htt", "text/webviewhtml"},
            {".hxa", "application/xml"},
            {".hxc", "application/xml"},
            {".hxd", "application/octet-stream"},
            {".hxe", "application/xml"},
            {".hxf", "application/xml"},
            {".hxh", "application/octet-stream"},
            {".hxi", "application/octet-stream"},
            {".hxk", "application/xml"},
            {".hxq", "application/octet-stream"},
            {".hxr", "application/octet-stream"},
            {".hxs", "application/octet-stream"},
            {".hxt", "text/html"},
            {".hxv", "application/xml"},
            {".hxw", "application/octet-stream"},
            {".hxx", "text/plain"},
            {".i", "text/plain"},
            {".ico", "image/x-icon"},
            {".ics", "application/octet-stream"},
            {".idl", "text/plain"},
            {".ief", "image/ief"},
            {".iii", "application/x-iphone"},
            {".inc", "text/plain"},
            {".inf", "application/octet-stream"},
            {".inl", "text/plain"},
            {".ins", "application/x-internet-signup"},
            {".ipa", "application/x-itunes-ipa"},
            {".ipg", "application/x-itunes-ipg"},
            {".ipproj", "text/plain"},
            {".ipsw", "application/x-itunes-ipsw"},
            {".iqy", "text/x-ms-iqy"},
            {".isp", "application/x-internet-signup"},
            {".ite", "application/x-itunes-ite"},
            {".itlp", "application/x-itunes-itlp"},
            {".itms", "application/x-itunes-itms"},
            {".itpc", "application/x-itunes-itpc"},
            {".IVF", "video/x-ivf"},
            {".jar", "application/java-archive"},
            {".java", "application/octet-stream"},
            {".jck", "application/liquidmotion"},
            {".jcz", "application/liquidmotion"},
            {".jfif", "image/pjpeg"},
            {".jnlp", "application/x-java-jnlp-file"},
            {".jpb", "application/octet-stream"},
            {".jpe", "image/jpeg"},
            {".jpeg", "image/jpeg"},
            {".jpg", "image/jpeg"},
            {".js", "application/x-javascript"},
            {".json", "application/json"},
            {".jsx", "text/jscript"},
            {".jsxbin", "text/plain"},
            {".latex", "application/x-latex"},
            {".library-ms", "application/windows-library+xml"},
            {".lit", "application/x-ms-reader"},
            {".loadtest", "application/xml"},
            {".lpk", "application/octet-stream"},
            {".lsf", "video/x-la-asf"},
            {".lst", "text/plain"},
            {".lsx", "video/x-la-asf"},
            {".lzh", "application/octet-stream"},
            {".m13", "application/x-msmediaview"},
            {".m14", "application/x-msmediaview"},
            {".m1v", "video/mpeg"},
            {".m2t", "video/vnd.dlna.mpeg-tts"},
            {".m2ts", "video/vnd.dlna.mpeg-tts"},
            {".m2v", "video/mpeg"},
            {".m3u", "audio/x-mpegurl"},
            {".m3u8", "audio/x-mpegurl"},
            {".m4a", "audio/m4a"},
            {".m4b", "audio/m4b"},
            {".m4p", "audio/m4p"},
            {".m4r", "audio/x-m4r"},
            {".m4v", "video/x-m4v"},
            {".mac", "image/x-macpaint"},
            {".mak", "text/plain"},
            {".man", "application/x-troff-man"},
            {".manifest", "application/x-ms-manifest"},
            {".map", "text/plain"},
            {".master", "application/xml"},
            {".mda", "application/msaccess"},
            {".mdb", "application/x-msaccess"},
            {".mde", "application/msaccess"},
            {".mdp", "application/octet-stream"},
            {".me", "application/x-troff-me"},
            {".mfp", "application/x-shockwave-flash"},
            {".mht", "message/rfc822"},
            {".mhtml", "message/rfc822"},
            {".mid", "audio/mid"},
            {".midi", "audio/mid"},
            {".mix", "application/octet-stream"},
            {".mk", "text/plain"},
            {".mmf", "application/x-smaf"},
            {".mno", "text/xml"},
            {".mny", "application/x-msmoney"},
            {".mod", "video/mpeg"},
            {".mov", "video/quicktime"},
            {".movie", "video/x-sgi-movie"},
            {".mp2", "video/mpeg"},
            {".mp2v", "video/mpeg"},
            {".mp3", "audio/mpeg"},
            {".mp4", "video/mp4"},
            {".mp4v", "video/mp4"},
            {".mpa", "video/mpeg"},
            {".mpe", "video/mpeg"},
            {".mpeg", "video/mpeg"},
            {".mpf", "application/vnd.ms-mediapackage"},
            {".mpg", "video/mpeg"},
            {".mpp", "application/vnd.ms-project"},
            {".mpv2", "video/mpeg"},
            {".mqv", "video/quicktime"},
            {".ms", "application/x-troff-ms"},
            {".msi", "application/octet-stream"},
            {".mso", "application/octet-stream"},
            {".mts", "video/vnd.dlna.mpeg-tts"},
            {".mtx", "application/xml"},
            {".mvb", "application/x-msmediaview"},
            {".mvc", "application/x-miva-compiled"},
            {".mxp", "application/x-mmxp"},
            {".nc", "application/x-netcdf"},
            {".nsc", "video/x-ms-asf"},
            {".nws", "message/rfc822"},
            {".ocx", "application/octet-stream"},
            {".oda", "application/oda"},
            {".odc", "text/x-ms-odc"},
            {".odh", "text/plain"},
            {".odl", "text/plain"},
            {".odp", "application/vnd.oasis.opendocument.presentation"},
            {".ods", "application/oleobject"},
            {".odt", "application/vnd.oasis.opendocument.text"},
            {".one", "application/onenote"},
            {".onea", "application/onenote"},
            {".onepkg", "application/onenote"},
            {".onetmp", "application/onenote"},
            {".onetoc", "application/onenote"},
            {".onetoc2", "application/onenote"},
            {".orderedtest", "application/xml"},
            {".osdx", "application/opensearchdescription+xml"},
            {".p10", "application/pkcs10"},
            {".p12", "application/x-pkcs12"},
            {".p7b", "application/x-pkcs7-certificates"},
            {".p7c", "application/pkcs7-mime"},
            {".p7m", "application/pkcs7-mime"},
            {".p7r", "application/x-pkcs7-certreqresp"},
            {".p7s", "application/pkcs7-signature"},
            {".pbm", "image/x-portable-bitmap"},
            {".pcast", "application/x-podcast"},
            {".pct", "image/pict"},
            {".pcx", "application/octet-stream"},
            {".pcz", "application/octet-stream"},
            {".pdf", "application/pdf"},
            {".pfb", "application/octet-stream"},
            {".pfm", "application/octet-stream"},
            {".pfx", "application/x-pkcs12"},
            {".pgm", "image/x-portable-graymap"},
            {".pic", "image/pict"},
            {".pict", "image/pict"},
            {".pkgdef", "text/plain"},
            {".pkgundef", "text/plain"},
            {".pko", "application/vnd.ms-pki.pko"},
            {".pls", "audio/scpls"},
            {".pma", "application/x-perfmon"},
            {".pmc", "application/x-perfmon"},
            {".pml", "application/x-perfmon"},
            {".pmr", "application/x-perfmon"},
            {".pmw", "application/x-perfmon"},
            {".png", "image/png"},
            {".pnm", "image/x-portable-anymap"},
            {".pnt", "image/x-macpaint"},
            {".pntg", "image/x-macpaint"},
            {".pnz", "image/png"},
            {".pot", "application/vnd.ms-powerpoint"},
            {".potm", "application/vnd.ms-powerpoint.template.macroEnabled.12"},
            {".potx", "application/vnd.openxmlformats-officedocument.presentationml.template"},
            {".ppa", "application/vnd.ms-powerpoint"},
            {".ppam", "application/vnd.ms-powerpoint.addin.macroEnabled.12"},
            {".ppm", "image/x-portable-pixmap"},
            {".pps", "application/vnd.ms-powerpoint"},
            {".ppsm", "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"},
            {".ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow"},
            {".ppt", "application/vnd.ms-powerpoint"},
            {".pptm", "application/vnd.ms-powerpoint.presentation.macroEnabled.12"},
            {".pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"},
            {".prf", "application/pics-rules"},
            {".prm", "application/octet-stream"},
            {".prx", "application/octet-stream"},
            {".ps", "application/postscript"},
            {".psc1", "application/PowerShell"},
            {".psd", "application/octet-stream"},
            {".psess", "application/xml"},
            {".psm", "application/octet-stream"},
            {".psp", "application/octet-stream"},
            {".pub", "application/x-mspublisher"},
            {".pwz", "application/vnd.ms-powerpoint"},
            {".qht", "text/x-html-insertion"},
            {".qhtm", "text/x-html-insertion"},
            {".qt", "video/quicktime"},
            {".qti", "image/x-quicktime"},
            {".qtif", "image/x-quicktime"},
            {".qtl", "application/x-quicktimeplayer"},
            {".qxd", "application/octet-stream"},
            {".ra", "audio/x-pn-realaudio"},
            {".ram", "audio/x-pn-realaudio"},
            {".rar", "application/octet-stream"},
            {".ras", "image/x-cmu-raster"},
            {".rat", "application/rat-file"},
            {".rc", "text/plain"},
            {".rc2", "text/plain"},
            {".rct", "text/plain"},
            {".rdlc", "application/xml"},
            {".resx", "application/xml"},
            {".rf", "image/vnd.rn-realflash"},
            {".rgb", "image/x-rgb"},
            {".rgs", "text/plain"},
            {".rm", "application/vnd.rn-realmedia"},
            {".rmi", "audio/mid"},
            {".rmp", "application/vnd.rn-rn_music_package"},
            {".roff", "application/x-troff"},
            {".rpm", "audio/x-pn-realaudio-plugin"},
            {".rqy", "text/x-ms-rqy"},
            {".rtf", "application/rtf"},
            {".rtx", "text/richtext"},
            {".ruleset", "application/xml"},
            {".s", "text/plain"},
            {".safariextz", "application/x-safari-safariextz"},
            {".scd", "application/x-msschedule"},
            {".sct", "text/scriptlet"},
            {".sd2", "audio/x-sd2"},
            {".sdp", "application/sdp"},
            {".sea", "application/octet-stream"},
            {".searchConnector-ms", "application/windows-search-connector+xml"},
            {".setpay", "application/set-payment-initiation"},
            {".setreg", "application/set-registration-initiation"},
            {".settings", "application/xml"},
            {".sgimb", "application/x-sgimb"},
            {".sgml", "text/sgml"},
            {".sh", "application/x-sh"},
            {".shar", "application/x-shar"},
            {".shtml", "text/html"},
            {".sit", "application/x-stuffit"},
            {".sitemap", "application/xml"},
            {".skin", "application/xml"},
            {".sldm", "application/vnd.ms-powerpoint.slide.macroEnabled.12"},
            {".sldx", "application/vnd.openxmlformats-officedocument.presentationml.slide"},
            {".slk", "application/vnd.ms-excel"},
            {".sln", "text/plain"},
            {".slupkg-ms", "application/x-ms-license"},
            {".smd", "audio/x-smd"},
            {".smi", "application/octet-stream"},
            {".smx", "audio/x-smd"},
            {".smz", "audio/x-smd"},
            {".snd", "audio/basic"},
            {".snippet", "application/xml"},
            {".snp", "application/octet-stream"},
            {".sol", "text/plain"},
            {".sor", "text/plain"},
            {".spc", "application/x-pkcs7-certificates"},
            {".spl", "application/futuresplash"},
            {".src", "application/x-wais-source"},
            {".srf", "text/plain"},
            {".SSISDeploymentManifest", "text/xml"},
            {".ssm", "application/streamingmedia"},
            {".sst", "application/vnd.ms-pki.certstore"},
            {".stl", "application/vnd.ms-pki.stl"},
            {".sv4cpio", "application/x-sv4cpio"},
            {".sv4crc", "application/x-sv4crc"},
            {".svc", "application/xml"},
            {".swf", "application/x-shockwave-flash"},
            {".t", "application/x-troff"},
            {".tar", "application/x-tar"},
            {".tcl", "application/x-tcl"},
            {".testrunconfig", "application/xml"},
            {".testsettings", "application/xml"},
            {".tex", "application/x-tex"},
            {".texi", "application/x-texinfo"},
            {".texinfo", "application/x-texinfo"},
            {".tgz", "application/x-compressed"},
            {".thmx", "application/vnd.ms-officetheme"},
            {".thn", "application/octet-stream"},
            {".tif", "image/tiff"},
            {".tiff", "image/tiff"},
            {".tlh", "text/plain"},
            {".tli", "text/plain"},
            {".toc", "application/octet-stream"},
            {".tr", "application/x-troff"},
            {".trm", "application/x-msterminal"},
            {".trx", "application/xml"},
            {".ts", "video/vnd.dlna.mpeg-tts"},
            {".tsv", "text/tab-separated-values"},
            {".ttf", "application/octet-stream"},
            {".tts", "video/vnd.dlna.mpeg-tts"},
            {".txt", "text/plain"},
            {".u32", "application/octet-stream"},
            {".uls", "text/iuls"},
            {".user", "text/plain"},
            {".ustar", "application/x-ustar"},
            {".vb", "text/plain"},
            {".vbdproj", "text/plain"},
            {".vbk", "video/mpeg"},
            {".vbproj", "text/plain"},
            {".vbs", "text/vbscript"},
            {".vcf", "text/x-vcard"},
            {".vcproj", "Application/xml"},
            {".vcs", "text/plain"},
            {".vcxproj", "Application/xml"},
            {".vddproj", "text/plain"},
            {".vdp", "text/plain"},
            {".vdproj", "text/plain"},
            {".vdx", "application/vnd.ms-visio.viewer"},
            {".vml", "text/xml"},
            {".vscontent", "application/xml"},
            {".vsct", "text/xml"},
            {".vsd", "application/vnd.visio"},
            {".vsi", "application/ms-vsi"},
            {".vsix", "application/vsix"},
            {".vsixlangpack", "text/xml"},
            {".vsixmanifest", "text/xml"},
            {".vsmdi", "application/xml"},
            {".vspscc", "text/plain"},
            {".vss", "application/vnd.visio"},
            {".vsscc", "text/plain"},
            {".vssettings", "text/xml"},
            {".vssscc", "text/plain"},
            {".vst", "application/vnd.visio"},
            {".vstemplate", "text/xml"},
            {".vsto", "application/x-ms-vsto"},
            {".vsw", "application/vnd.visio"},
            {".vsx", "application/vnd.visio"},
            {".vtx", "application/vnd.visio"},
            {".wav", "audio/wav"},
            {".wave", "audio/wav"},
            {".wax", "audio/x-ms-wax"},
            {".wbk", "application/msword"},
            {".wbmp", "image/vnd.wap.wbmp"},
            {".wcm", "application/vnd.ms-works"},
            {".wdb", "application/vnd.ms-works"},
            {".wdp", "image/vnd.ms-photo"},
            {".webarchive", "application/x-safari-webarchive"},
            {".webtest", "application/xml"},
            {".wiq", "application/xml"},
            {".wiz", "application/msword"},
            {".wks", "application/vnd.ms-works"},
            {".WLMP", "application/wlmoviemaker"},
            {".wlpginstall", "application/x-wlpg-detect"},
            {".wlpginstall3", "application/x-wlpg3-detect"},
            {".wm", "video/x-ms-wm"},
            {".wma", "audio/x-ms-wma"},
            {".wmd", "application/x-ms-wmd"},
            {".wmf", "application/x-msmetafile"},
            {".wml", "text/vnd.wap.wml"},
            {".wmlc", "application/vnd.wap.wmlc"},
            {".wmls", "text/vnd.wap.wmlscript"},
            {".wmlsc", "application/vnd.wap.wmlscriptc"},
            {".wmp", "video/x-ms-wmp"},
            {".wmv", "video/x-ms-wmv"},
            {".wmx", "video/x-ms-wmx"},
            {".wmz", "application/x-ms-wmz"},
            {".wpl", "application/vnd.ms-wpl"},
            {".wps", "application/vnd.ms-works"},
            {".wri", "application/x-mswrite"},
            {".wrl", "x-world/x-vrml"},
            {".wrz", "x-world/x-vrml"},
            {".wsc", "text/scriptlet"},
            {".wsdl", "text/xml"},
            {".wvx", "video/x-ms-wvx"},
            {".x", "application/directx"},
            {".xaf", "x-world/x-vrml"},
            {".xaml", "application/xaml+xml"},
            {".xap", "application/x-silverlight-app"},
            {".xbap", "application/x-ms-xbap"},
            {".xbm", "image/x-xbitmap"},
            {".xdr", "text/plain"},
            {".xht", "application/xhtml+xml"},
            {".xhtml", "application/xhtml+xml"},
            {".xla", "application/vnd.ms-excel"},
            {".xlam", "application/vnd.ms-excel.addin.macroEnabled.12"},
            {".xlc", "application/vnd.ms-excel"},
            {".xld", "application/vnd.ms-excel"},
            {".xlk", "application/vnd.ms-excel"},
            {".xll", "application/vnd.ms-excel"},
            {".xlm", "application/vnd.ms-excel"},
            {".xls", "application/vnd.ms-excel"},
            {".xlsb", "application/vnd.ms-excel.sheet.binary.macroEnabled.12"},
            {".xlsm", "application/vnd.ms-excel.sheet.macroEnabled.12"},
            {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
            {".xlt", "application/vnd.ms-excel"},
            {".xltm", "application/vnd.ms-excel.template.macroEnabled.12"},
            {".xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template"},
            {".xlw", "application/vnd.ms-excel"},
            {".xml", "text/xml"},
            {".xmta", "application/xml"},
            {".xof", "x-world/x-vrml"},
            {".XOML", "text/plain"},
            {".xpm", "image/x-xpixmap"},
            {".xps", "application/vnd.ms-xpsdocument"},
            {".xrm-ms", "text/xml"},
            {".xsc", "application/xml"},
            {".xsd", "text/xml"},
            {".xsf", "text/xml"},
            {".xsl", "text/xml"},
            {".xslt", "text/xml"},
            {".xsn", "application/octet-stream"},
            {".xss", "application/xml"},
            {".xtp", "application/octet-stream"},
            {".xwd", "image/x-xwindowdump"},
            {".z", "application/x-compress"},
            {".zip", "application/x-zip-compressed"},
            #endregion
        };
        //ConnectString
        //public static string MONGO_CONNECTION_STRING = "mongodb://identity_user:identity_user@10.20.0.210:27017/identity?safe=true";
        public static string MONGO_CONNECTION_STRING = "mongodb://{0}:{1}@{2}:{3}/{4}?safe=true";
        public static string POSTGRESQL_CONNECTION_STRING = "Server={0};Port={1};User Id={2};Password={3};Database={4};";
        public static string MYSQL_CONNECTION_STRING = "Server={0};Port={1};User Id={2};Password={3};Database={4};";
        public static string SQLSERVER_CONNECTION_STRING = "Data Source = {0};Initial Catalog={1};Integrated Security=True;MultipleActiveResultSets=true;User ID={2};Password={3};";
        public static string SQLLITE_CONNECTION_STRING = "Data Source={0}.sqlite;Version={1};";
        public static string Authorization = "Authorization";
        public static string APP_SETTING = "AppSetting";
        public static string LANGUAGE = "LANGUAGE";
        public static string ACCESS_TOKEN = "ACCESS_TOKEN";
        //Setting SSO
        public const string SSO_HOST = "SSO_HOST";

        public const string SESSION_USER_LOGIN = "SESSION_USER_LOGIN";
        public const string SESSION_SERVICE_API = "SESSION_SERVICE_API";

        //Database NEO4J

        public const string NEO4J_DRIVER_URL = "NEO4J_DRIVER_URL";
        public const string NEO4J_CLIENT_URL = "NEO4J_CLIENT_URL";
        public const string NEO4J_USER = "NEO4J_USER";
        public const string NEO4J_PASSWORD = "NEO4J_PASSWORD";
        //Host setting
        public const string HTTP_URL = "HTTP_URL";
        public const string HTTPS_URL = "HTTPS_URL";

        //Lucene
        public const string IS_USE_LUCENE = "IS_USE_LUCENE";
        public const string IS_UPDATE_LUCENE = "IS_UPDATE_LUCENE";
        public const string PATH_INDEX_LUCENE_MSSQL = "PATH_INDEX_LUCENE_MSSQL";
        public const string PATH_INDEX_LUCENE_ORACLE = "PATH_INDEX_LUCENE_ORACLE";
        public const string LUCENE_PAGE_SIZE = "LUCENE_PAGE_SIZE";
        public const string MAX_FIELD_LENGTH = "MAX_FIELD_LENGTH";
        public const string FILE_NAME_LOCK_LUCENE = "FILE_NAME_LOCK_LUCENE";//"write.lock";
        //PREFIX
        public const string PREFIX = "PREFIX";
        //PREFIX
        public const string API_KEY = "API_KEY";
        //CMCSOFT_MAIL
        public const string CMCSOFT_MAIL = "CMCSOFT_MAIL";
        //MICRO SERVICE
        public const string MICRO_SERVICE_IP = "MICRO_SERVICE_IP";
        public const string MICRO_SERVICE_PORT = "MICRO_SERVICE_PORT";
        public const string MICRO_SERVICE_NAME = "MICRO_SERVICE_NAME";
        public const string MICRO_SERVICE_DISPLAY_NAME = "MICRO_SERVICE_DISPLAY_NAME";
        public const string MICRO_SERVICE_MAXLENGTH_MESSAGESIZE = "MICRO_SERVICE_MAXLENGTH_MESSAGESIZE";
        //USING_ENVIROMENT
        public const string USING_ENVIROMENT = "USING_ENVIROMENT";
        //Solr
        public const string SOLR_URL_CORE_BASE = "SOLR_URL_CORE_BASE";
        public const string SOLR_URL_REPORT = "SOLR_URL_REPORT";
        public const string SOLR_URL_SEARCH = "SOLR_URL_SEARCH";
        public const string SOLR_URL_SHARE = "SOLR_URL_SHARE";
        public const string SOLR_URL_DMDC = "SOLR_URL_DMDC";
        //Thong tin CA
        public const string CA_FILE_NAME = "CA_FILE_NAME";
        public const string CA_PASSWORD = "CA_PASSWORD";
        public const string CA_TOKENT_SERIAL = "CA_TOKENT_SERIAL";
        //SOLR_PAGE_SIZE
        public const string SOLR_PAGE_SIZE = "SOLR_PAGE_SIZE";
        //LogPath
        public const string LOG_PATH = "LOG_PATH";
        public const string PATH_DATA_PORTAL = "PATH_DATA_PORTAL";
        public const string PATH_DATA_SERVICE = "PATH_DATA_SERVICE";
        public const string PATH_DATA_SAVE_FILE = "PATH_DATA_SAVE_FILE";

        public const string SERVICE_NAME = "SERVICE_NAME";
        public const string KEY_AUTHORIZATION = "KEY_AUTHORIZATION";
        public const string LIST_HOST_REFERER = "LIST_HOST_REFERER";
        //Product info
        public const string VERSION = "VERSION";
        public const string SOFTWARE_NAME = "SOFTWARE_NAME";
        public const string ASSEMBLY_NAME = "ASSEMBLY_NAME";
        public const string NAMESPACE_NAME = "NAMESPACE_NAME";
        public const string SOFTWARE_CODE = "SOFTWARE_CODE";
        public const string LICENSE_KEY = "LICENSE_KEY";
        public const string LICENSE_SERVICE = "LICENSE_SERVICE";
        public const string PAGE_SIZE = "PAGE_SIZE";
        //CONFIG-INFOMATION        
        public const string SUPPLIER_COMPANY_NAME = "SUPPLIER_COMPANY_NAME";
        public const string SUPPLIER_PHONE_SUPPORT = "SUPPLIER_PHONE_SUPPORT";
        public const string SUPPLIER_WEBSITE_SUPPORT = "SUPPLIER_WEBSITE_SUPPORT";
        public const string SUPPLIER_WEBSITE_SEARCH = "SUPPLIER_WEBSITE_SEARCH";

        public const string SIGN_TYPE_FILE = "SIGN_TYPE_FILE";
        //File upload
        public const string FILE_UPLOAD_EXTENSIVE = "*.xls|*.xlsx|*.xlt";
        //ENCRYPT_KEY
        public const string ENCRYPT_KEY = "120619841721484752016";
        //RabbitMQ
        //public const string MQ_NAME_HTKK = "MQ_NAME_HTKK";
        public const string MQ_NAME_LIST = "MQ_NAME_LIST";
        public const string MQ_NAME = "MQ_NAME";
        public const string MQ_PORT = "MQ_PORT";
        public const string MQ_USER = "MQ_USER";
        public const string MQ_PASSWORD = "MQ_PASSWORD";
        public const string MQ_HOST = "MQ_HOST";
        // FTP CONFIG
        public const string FTP_USING = "FTP_USING";
        public const string FTP_SERVER_URI = "FTP_SERVER_URI";
        public const string FTP_USER = "FTP_USER";
        public const string FTP_PASSWORD = "FTP_PASSWORD";
        public const string FTP_DOWNLOAD_FILE = "FTP_DOWNLOAD_FILE";
        //Return code
        public const string RETURN_CODE_RECEIVE = "100";
        public const string RETURN_CODE_PROCESSING = "101";
        public const string RETURN_CODE_SUCCESS = "200";
        public const string RETURN_CODE_META_SUCCESS = "201";
        public const string RETURN_CODE_ERROR = "203";
        public const string RETURN_CODE_WARNING = "403";
        public const string RETURN_CODE_NOT_FOUND = "404";
        public const string RETURN_CODE_NOT_PERMISSION = "401";
        //Message throw exception        
        public const string MESSAGE_ERROR = "Thực hiện không thành công ! ";
        public const string MESSAGE_NOT_FOUND = "Không tìm thấy thông tin ! ";
        public const string MESSAGE_ERROR_ADD = "Thêm mới dữ liệu không thành công ! ";
        public const string MESSAGE_ERROR_DELETE = "Xóa dữ liệu không thành công ! ";
        public const string MESSAGE_ERROR_UPDATE = "Cập nhật dữ liệu không thành công ! ";
        public const string MESSAGE_ERROR_EXIST = "Nội dung đã tồn tại trong hệ thống ! ";

        public const string MESSAGE_SUCCESS = "Thực hiện thành công ! ";
        public const string MESSAGE_META_SUCCESS = "Bóc tách dữ liệu thành công";
        public const string MESSAGE_SUCCESS_ADD = "Thêm mới dữ liệu thành công ! ";
        public const string MESSAGE_SUCCESS_UPDATE = "Cập nhật dữ liệu thành công ! ";
        public const string MESSAGE_SUCCESS_DELETE = "Xóa dữ liệu thành công ! ";
        public const string MESSAGE_TRANS_CODE_NOT_VALIDATE = "Mã giao dịch không đúng ! ";
        public const string MESSAGE_NOT_VALIDATE = "Nội dung message không đúng ! ";
        public const string MESSAGE_BLANK_VALIDATE = "Nội dung không được trống ! ";
        public const string MESSAGE_DATE_VALIDATE = "Ngày không đúng định dạng yyyy-MM-dd ! ";
        public const string MESSAGE_NOT_VALIDATE_FIRE_BASE = "Người dung chưa được đăng ký nhận thông báo ! ";

        public const string MESSAGE_AUT_SUCCESS = "Xác thực thành công ! ";
        public const string MESSAGE_AUT_ERROR_ACTIVE = "Dịch vụ chưa được kích hoạt!";
        public const string MESSAGE_AUT_ERROR_DUPLICATE = "Dịch vụ đã được đăng ký !";
        public const string MESSAGE_AUT_ERROR_EXPIRED = "Dịch vụ hết hạn sử dụng !";
        public const string MESSAGE_AUT_ERROR_TOKEN = "Token không hợp lệ!";
        public const string MESSAGE_AUT_ERROR_INVALID = "Yêu cầu không hợp lệ.Vui lòng kiểm tra lại.";
        public const string MESSAGE_AUT_ERROR_GET_TOKEN = "Thực hiện tạo token không thành công!";
        public const string MESSAGE_AUT_ERROR = "Tài khoản không hợp lệ (Không tồn tại,Chưa kích hoạt,hết hạn sử dụng...) !";
        public const string MESSSAGE_NOT_PERMISSION = "Không có quyền truy cập.";
        public const string MESSAGE_SERVER_OVERLOAD = "Server đang quá tải, bạn vui lòng thực hiện lại thao tác sau ít phút.";
        public const string MESSAGE_DATA_INVALID = "Dữ liệu chưa hợp lệ, bạn vui lòng kiểm tra lại.";

        public const string MESSAGE_VALIDATE_EMAIL = "Địa chỉ email không hợp lệ ! ";
        public const string MESSAGE_VALIDATE_PHONE = "Số điện thoại không hợp lệ ! ";
        public const string MESSAGE_VALIDATE_EMAIL_PHONE = "Thông tin khách hàng phải có số điện thoại hoặc email ! ";
        public const string MESSAGE_VALIDATE_CONTENT = "Nội dung không hợp lệ ! ";
        public const string MESSAGE_VALIDATE_PASSWORD = "2 Mật khẩu không giống nhau hợp lệ ! ";
        public const string MESSAGE_VALIDATE_ACCOUNT = "Tài khoản không hợp lệ ! ";
        public const string MESSAGE_VALIDATE_SESSION = "Tài khoản chưa đăng nhập ! ";
        public const string MESSAGE_VALIDATE_AUDIT = "2 đối tượng không hợp lệ ! ";
        public const string MESSAGE_VALIDATE_TRANS_AMOUNT = "Số tiền giao dịch phải lớn hơn 0 ! ";
        public const string MESSAGE_VALIDATE_eKYC = "Khách hàng chưa xác thực eKYC ! ";

        public const string MESSAGE_VALIDATE_BANK_STK = "Số tài khoản không hợp lệ ! ";
        public const string MESSAGE_VALIDATE_BANK_STK_NAME = "Tên tài khoản không hợp lệ ! ";
        public const string MESSAGE_VALIDATE_BANK_NAME = "Mã ngân hàng không hợp lệ ! ";

        public const string MESSAGE_VALIDATE_FILLTER_LOGS = "Nội dung tra cứu chỉ trong quý hiện tại! ";
        public const string MESSAGE_NOT_MESSAGE_TYPE = "Loại giao dịch không hợp lệ ! ";
        public const string MESSAGE_NOT_APPLICATION = "Mã ứng dụng không hợp lệ ! ";
        public const string MESSAGE_NOT_RECEIVER = "Mã tiếp nhận không hợp lệ ! ";
        public const string MESSAGE_NOT_STATUS = "Mã trạng thái không hợp lệ ! ";
        public const string MESSAGE_NOT_SENDER_CODE = "Mã người gửi không hợp lệ ! ";

        public const string MESSAGE_TRANSACTION_DUPLICATE = "Mã giao dịch đã tồn tại !";
        public const string MESSAGE_TRANSACTION_SUCCESS = "Tiếp nhận giao dịch thành công ! ";
        public const string MESSAGE_TRANSACTION_ERROR = "Tiếp nhận giao dịch không thành công !";

        public const string MESSAGE_TRANSACTION_PROCESS_SUCCESS = "Tiếp nhận giao dịch chờ xử lý thành công ! ";
        public const string MESSAGE_TRANSACTION_PROCESS_ERROR = "Tiếp nhận giao dịch chờ xử lý không thành công !";

        public const string MESSAGE_TRANSACTION_PAYMENT_SUCCESS = "Xử lý giao dịch thành công ! ";
        public const string MESSAGE_TRANSACTION_PAYMENT_ERROR = "Xử lý giao dịch không thành công ! ";
        public const string MESSAGE_TRANSACTION_TRANSFER_SUCCESS = "Xử lý giao dịch thành công ! ";
        public const string MESSAGE_TRANSACTION_TRANSFER_ERROR = "Xử lý giao dịch không thành công ! ";
        public const string MESSAGE_TRANSACTION_CUSTOMER_ERROR = "Không tồn tại mã khách hàng ! ";
        public const string MESSAGE_TRANSACTION_CUSTOMER_NAME_ERROR = "Không tồn tại tên khách hàng ! ";
        public const string MESSAGE_TRANSACTION_CONTRACT_ERROR = "Không tồn tại mã hợp đồng ! ";
        public const string MESSAGE_TRANSACTION_CONTRACT_NAME_ERROR = "Không tồn tại tên hợp đồng ! ";
        public const string MESSAGE_TRANSACTION_TRANS_CODE_ERROR = "Không tồn tại mã giao dịch ! ";
        public const string MESSAGE_TRANSACTION_PAYMENT_WAIT_NOTIFY = "Xử lý giao dịch thành công.Chờ phản hồi từ kênh thanh toán";
        public const string MESSAGE_TRANSACTION_PAYMENT_SUCCESS_NOTIFY = "Xử lý giao dịch {0} thành công";
        public const string MESSAGE_TRANSACTION_PAYMENT_ERROR_NOTIFY = "Xử lý giao dịch {0} không thành công";
        public const string MESSAGE_TRANSACTION_CONFIG_NOTIFY = "Số điện thoại chưa được đăng ký notify ! ";

        public const string MESSAGE_TRANSACTION_CONTRACT_INTEREST_ERROR = "Mã hợp đồng chưa có lãi suất áp dụng để tính lãi hàng ngày";
        public const string MESSAGE_TRANSACTION_CONTRACT_INTEREST = "Lãi suất áp dụng để tính lãi hàng ngày phải lớn hơn 0 ! ";
        public const string MESSAGE_TRANSACTION_CONTRACT_LIMITS_ERROR = "Mã hợp đồng chưa thiết lập hạn mức";
        public const string MESSAGE_TRANSACTION_CONTRACT_LIMITS = "Hạn mức thiết lập phải lớn hơn 0 ! ";

        public const string MESSAGE_EVALUATE_EXPRESSIONS_ERROR = "Biểu thức không hợp lệ ! ";
        public const string MESSAGE_EVALUATE_ELEMENT_2_ERROR = "Số lượng phần tử phải > 1 ! ";
        public const string MESSAGE_EVALUATE_ELEMENT_ERROR = "Phần tử không tồn tại trong biểu thức ! ";

        public const string MESSAGE_ERROR_CALL_API = "Thực hiện không thành công ! ";
        public const string MESSAGE_SUBJECT_EMAIL_PROCESS = "Thông báo xử lý giao dịch mã hợp đồng:{0}";
        public const string MESSAGE_SUBJECT_EMAIL_RECEIVER = "Thông báo tiếp nhận giao dịch mã hợp đồng:{0}";
        //Nội dung chuyển tiền
        public const string MESSAGE_TRANSER_CONTENT = "Xử lý mã hợp đồng:{0}";

    }
}
