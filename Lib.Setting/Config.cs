using System.Collections.Generic;
using System.IO;
using System.Xml.Linq;
using Lib.Json;
using Microsoft.Extensions.Configuration;


namespace Lib.Setting
{
    public class ProviderOptions
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public int? FindMaxTime { get; set; }
        public string TypeName { get; set; }
    }
    public sealed class Config
    {
        private static XDocument _FILE_SERVER_CONFIG;
        public static XDocument FILE_SERVER_CONFIG
        {
            get
            {
                if (_FILE_SERVER_CONFIG == null)
                    _FILE_SERVER_CONFIG = XDocument.Load(Path.Combine(Directory.GetCurrentDirectory() + @"/configuration", "FileServerCfg.xml"));
                return _FILE_SERVER_CONFIG;
            }
        }

        private static JSONNode _CONFIGURATION_DATA;
        public static JSONNode CONFIGURATION_DATA
        {
            get
            {
                if (_CONFIGURATION_DATA == null)
                {
                    var file = Path.Combine(Directory.GetCurrentDirectory() + @"/configuration", "configuration.data.json");
                    string SendData = File.ReadAllText(file);
                    _CONFIGURATION_DATA = JSON.Parse(SendData);
                }
                return _CONFIGURATION_DATA;
            }
        }

        private static JSONNode _APP_SETTING;
        public static JSONNode APP_SETTING
        {
            get
            {
                if (_APP_SETTING == null)
                {
                    var file = Path.Combine(Directory.GetCurrentDirectory() + @"/", "appsettings.json");
                    string SendData = File.ReadAllText(file);
                    _APP_SETTING = JSON.Parse(SendData);
                }
                return _APP_SETTING;
            }
        }

        private static JSONNode _CONFIGURATION_APP_SETTING;
        public static JSONNode CONFIGURATION_APP_SETTING
        {
            get
            {
                if (_CONFIGURATION_APP_SETTING == null)
                {
                    var file = Path.Combine(Directory.GetCurrentDirectory() + @"/configuration", "configuration.appsettings.json");
                    string SendData = File.ReadAllText(file);
                    _CONFIGURATION_APP_SETTING = JSON.Parse(SendData);
                }
                return _CONFIGURATION_APP_SETTING;
            }
        }

        #region Database ConnectionString
        private static Dictionary<string, List<ProviderOptions>> _DictConnectionString;
        public static Dictionary<string, List<ProviderOptions>> DictConnectionString
        {
            get
            {
                if (_DictConnectionString == null || _DictConnectionString.Count == 0)
                {
                    IConfigurationBuilder builder = new ConfigurationBuilder();
                    builder.AddJsonFile(Path.Combine("configuration", "configuration.appsettings.json"));
                    var root = builder.Build();
                    _DictConnectionString = root.GetSection("ConnectionString").Get<Dictionary<string, List<ProviderOptions>>>();

                }
                return _DictConnectionString;
            }
        }

        public static IConfiguration NEO4J_CONFIGURATION { get; set; }
        #endregion       
        private static string _CMCSOFT_MAIL;
        public static string CMCSOFT_MAIL
        {
            get
            {
                if (string.IsNullOrEmpty(_CMCSOFT_MAIL))
                {
                    _CMCSOFT_MAIL = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.CMCSOFT_MAIL].Value;
                }
                return _CMCSOFT_MAIL;
            }
        }

        private static string _API_KEY;
        public static string API_KEY
        {
            get
            {
                if (string.IsNullOrEmpty(_API_KEY))
                {
                    _API_KEY = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.API_KEY].Value;
                }
                return _API_KEY;
            }
        }

        private static string _USING_ENVIROMENT;
        public static string USING_ENVIROMENT
        {
            get
            {
                if (string.IsNullOrEmpty(_USING_ENVIROMENT))
                {
                    _USING_ENVIROMENT = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.USING_ENVIROMENT].Value;
                }
                return _USING_ENVIROMENT;
            }
        }

        private static string _SIGN_TYPE_FILE;
        public static string SIGN_TYPE_FILE
        {
            get
            {
                if (string.IsNullOrEmpty(_SIGN_TYPE_FILE))
                {
                    _SIGN_TYPE_FILE = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.SIGN_TYPE_FILE].Value;
                }
                return _SIGN_TYPE_FILE;
            }
        }

        private static string _SERVICE_NAME;
        public static string SERVICE_NAME
        {
            get
            {
                if (string.IsNullOrEmpty(_SERVICE_NAME))
                {
                    _SERVICE_NAME = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.SERVICE_NAME].Value;
                }
                return _SERVICE_NAME;
            }
        }

        private static string _KEY_AUTHORIZATION;
        public static string KEY_AUTHORIZATION
        {
            get
            {
                if (string.IsNullOrEmpty(_KEY_AUTHORIZATION))
                {
                    _KEY_AUTHORIZATION = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.KEY_AUTHORIZATION].Value;
                }
                return _KEY_AUTHORIZATION;
            }
        }

        private static string _PATH_DATA_SERVICE;
        public static string PATH_DATA_SERVICE
        {
            get
            {
                if (string.IsNullOrEmpty(_PATH_DATA_SERVICE))
                {
                    _PATH_DATA_SERVICE = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.PATH_DATA_SERVICE].Value;
                }
                return _PATH_DATA_SERVICE;
            }
        }

        private static string _PATH_DATA_SAVE_FILE;
        public static string PATH_DATA_SAVE_FILE
        {
            get
            {
                if (string.IsNullOrEmpty(_PATH_DATA_SAVE_FILE))
                {
                    _PATH_DATA_SAVE_FILE = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.PATH_DATA_SAVE_FILE].Value;
                }
                return _PATH_DATA_SAVE_FILE;
            }
        }

        private static string _LOG_PATH;
        public static string LOG_PATH
        {
            get
            {
                if (string.IsNullOrEmpty(_LOG_PATH))
                {
                    if (!System.IO.Directory.Exists(System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location) + "/Log"))
                    {
                        System.IO.Directory.CreateDirectory(System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location) + "/Log");
                    }
                    _LOG_PATH = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location) + "/Log";

                }
                return _LOG_PATH;
            }
        }

        private static string _ASSEMBLY_NAME;
        public static string ASSEMBLY_NAME
        {
            get
            {
                if (string.IsNullOrEmpty(_ASSEMBLY_NAME))
                {
                    _ASSEMBLY_NAME = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.ASSEMBLY_NAME].Value;
                }
                return _ASSEMBLY_NAME;
            }
        }

        private static string _NAMESPACE_NAME;
        public static string NAMESPACE_NAME
        {
            get
            {
                if (string.IsNullOrEmpty(_NAMESPACE_NAME))
                {
                    _NAMESPACE_NAME = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.NAMESPACE_NAME].Value;
                }
                return _NAMESPACE_NAME;
            }
        }

        private static string _PAGE_SIZE;
        public static string PAGE_SIZE
        {
            get
            {
                if (string.IsNullOrEmpty(_PAGE_SIZE))
                {
                    _PAGE_SIZE = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.PAGE_SIZE].Value;
                }
                return _PAGE_SIZE;
            }
        }

        #region Product info
        private static string _SOFTWARE_NAME;
        public static string SOFTWARE_NAME
        {
            get
            {
                if (string.IsNullOrEmpty(_SOFTWARE_NAME))
                {
                    _SOFTWARE_NAME = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.SOFTWARE_NAME].Value;
                }
                return _SOFTWARE_NAME;
            }
        }

        private static string _VERSION;
        public static string VERSION
        {
            get
            {
                if (string.IsNullOrEmpty(_VERSION))
                {
                    _VERSION = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.VERSION].Value;
                }
                return _VERSION;
            }
        }

        private static string _SOFTWARE_CODE;
        public static string SOFTWARE_CODE
        {
            get
            {
                if (string.IsNullOrEmpty(_SOFTWARE_CODE))
                {
                    _SOFTWARE_CODE = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.SOFTWARE_CODE].Value;
                }
                return _SOFTWARE_CODE;
            }
        }

        private static string _LICENSE_KEY;
        public static string LICENSE_KEY
        {
            get
            {
                if (string.IsNullOrEmpty(_LICENSE_KEY))
                {
                    _LICENSE_KEY = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.LICENSE_KEY].Value;
                }
                return _LICENSE_KEY;
            }
        }

        #endregion

        #region config - infomation

        private static string _SUPPLIER_COMPANY_NAME;
        public static string SUPPLIER_COMPANY_NAME
        {
            get
            {
                if (string.IsNullOrEmpty(_SUPPLIER_COMPANY_NAME))
                {
                    _SUPPLIER_COMPANY_NAME = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.SUPPLIER_COMPANY_NAME].Value;
                }
                return _SUPPLIER_COMPANY_NAME;
            }
        }

        private static string _SUPPLIER_PHONE_SUPPORT;
        public static string SUPPLIER_PHONE_SUPPORT
        {
            get
            {
                if (string.IsNullOrEmpty(_SUPPLIER_PHONE_SUPPORT))
                {
                    _SUPPLIER_PHONE_SUPPORT = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.SUPPLIER_PHONE_SUPPORT].Value;
                }
                return _SUPPLIER_PHONE_SUPPORT;
            }
        }

        private static string _SUPPLIER_WEBSITE_SUPPORT;
        public static string SUPPLIER_WEBSITE_SUPPORT
        {
            get
            {
                if (string.IsNullOrEmpty(_SUPPLIER_WEBSITE_SUPPORT))
                {
                    _SUPPLIER_WEBSITE_SUPPORT = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.SUPPLIER_WEBSITE_SUPPORT].Value;
                }
                return _SUPPLIER_WEBSITE_SUPPORT;
            }
        }

        #endregion

        #region Solr
        private static string _SOLR_URL_CORE_BASE;
        public static string SOLR_URL_CORE_BASE
        {
            get
            {
                if (string.IsNullOrEmpty(_SOLR_URL_CORE_BASE))
                {
                    _SOLR_URL_CORE_BASE = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.SOLR_URL_CORE_BASE].Value;
                }
                return _SOLR_URL_CORE_BASE;
            }
        }

        private static string _SOLR_URL_REPORT;
        public static string SOLR_URL_REPORT
        {
            get
            {
                if (string.IsNullOrEmpty(_SOLR_URL_REPORT))
                {
                    _SOLR_URL_REPORT = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.SOLR_URL_REPORT].Value;
                }
                return _SOLR_URL_REPORT;
            }
        }

        private static string _SOLR_URL_SEARCH;
        public static string SOLR_URL_SEARCH
        {
            get
            {
                if (string.IsNullOrEmpty(_SOLR_URL_SEARCH))
                {
                    _SOLR_URL_SEARCH = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.SOLR_URL_SEARCH].Value;
                }
                return _SOLR_URL_SEARCH;
            }
        }

        private static string _SOLR_PAGE_SIZE;
        public static string SOLR_PAGE_SIZE
        {
            get
            {
                if (string.IsNullOrEmpty(_SOLR_PAGE_SIZE))
                {
                    _SOLR_PAGE_SIZE = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.SOLR_PAGE_SIZE].Value;
                }
                return _SOLR_PAGE_SIZE;
            }
        }
        #endregion

        #region FTP CONFIG

        private static string _FTP_USING;
        public static string FTP_USING
        {
            get
            {
                if (string.IsNullOrEmpty(_FTP_USING))
                {
                    _FTP_USING = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.FTP_USING].Value;
                }
                return _FTP_USING;
            }
        }

        private static string _FTP_SERVER_URI;
        public static string FTP_SERVER_URI
        {
            get
            {
                if (string.IsNullOrEmpty(_FTP_SERVER_URI))
                {
                    _FTP_SERVER_URI = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.FTP_SERVER_URI].Value;
                }
                return _FTP_SERVER_URI;
            }
        }

        private static string _FTP_USER;
        public static string FTP_USER
        {
            get
            {
                if (string.IsNullOrEmpty(_FTP_USER))
                {
                    _FTP_USER = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.FTP_USER].Value;
                }
                return _FTP_USER;
            }
        }

        private static string _FTP_PASSWORD;
        public static string FTP_PASSWORD
        {
            get
            {
                if (string.IsNullOrEmpty(_FTP_PASSWORD))
                {
                    _FTP_PASSWORD = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.FTP_PASSWORD].Value;
                }
                return _FTP_PASSWORD;
            }
        }

        private static string _FTP_DOWNLOAD_FILE;
        public static string FTP_DOWNLOAD_FILE
        {
            get
            {
                if (string.IsNullOrEmpty(_FTP_DOWNLOAD_FILE))
                {
                    _FTP_DOWNLOAD_FILE = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.FTP_DOWNLOAD_FILE].Value;
                }
                return _FTP_DOWNLOAD_FILE;
            }
        }

        #endregion

        #region RabbitMQ

        private static string _MQ_PORT;
        public static string MQ_PORT
        {
            get
            {
                if (string.IsNullOrEmpty(_MQ_PORT))
                {
                    _MQ_PORT = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.MQ_PORT].Value;
                }
                return _MQ_PORT;
            }
        }

        private static string _MQ_NAME;
        public static string MQ_NAME
        {
            get
            {
                if (string.IsNullOrEmpty(_MQ_NAME))
                {
                    _MQ_NAME = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.MQ_NAME].Value;
                }
                return _MQ_NAME;
            }
        }

        private static Dictionary<int, string> _DICT_MQ_NAME;
        public static Dictionary<int, string> DICT_MQ_NAME
        {
            get
            {
                if (_DICT_MQ_NAME == null || _DICT_MQ_NAME.Count == 0)
                {
                    Dictionary<int, string> dict = new Dictionary<int, string>();
                    IConfigurationBuilder builder = new ConfigurationBuilder();
                    builder.AddJsonFile(Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json"));
                    var root = builder.Build();
                    string mqName = root.GetConnectionString(Constant.MQ_NAME_LIST);
                    if (!string.IsNullOrEmpty(mqName))
                    {

                        var array = mqName.Split(',');

                        for (int i = 0; i < array.Length; i++)
                        {
                            dict.Add(i, array[i]);
                        }

                    }

                    _DICT_MQ_NAME = dict;

                }
                return _DICT_MQ_NAME;
            }
        }

        private static string _MQ_USER;
        public static string MQ_USER
        {
            get
            {
                if (string.IsNullOrEmpty(_MQ_USER))
                {
                    _MQ_USER = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.MQ_USER].Value;
                }
                return _MQ_USER;
            }
        }



        private static string _MQ_PASSWORD;
        public static string MQ_PASSWORD
        {
            get
            {
                if (string.IsNullOrEmpty(_MQ_PASSWORD))
                {
                    _MQ_PASSWORD = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.MQ_PASSWORD].Value;
                }
                return _MQ_PASSWORD;
            }
        }

        private static string _MQ_HOST;
        public static string MQ_HOST
        {
            get
            {
                if (string.IsNullOrEmpty(_MQ_HOST))
                {
                    _MQ_HOST = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.MQ_HOST].Value;
                }
                return _MQ_HOST;
            }
        }

        #endregion       

        #region CA
        private static string _CA_TOKENT_SERIAL;
        public static string CA_TOKENT_SERIAL
        {
            get
            {
                if (string.IsNullOrEmpty(_CA_TOKENT_SERIAL))
                {
                    _CA_TOKENT_SERIAL = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.CA_TOKENT_SERIAL].Value;
                }
                return _CA_TOKENT_SERIAL;
            }
        }
        private static string _CA_FILE_NAME;
        public static string CA_FILE_NAME
        {
            get
            {
                if (string.IsNullOrEmpty(_CA_FILE_NAME))
                {
                    _CA_FILE_NAME = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.CA_FILE_NAME].Value;
                }
                return _CA_FILE_NAME;
            }
        }

        private static string _CA_PASSWORD;
        public static string CA_PASSWORD
        {
            get
            {
                if (string.IsNullOrEmpty(_CA_PASSWORD))
                {
                    _CA_PASSWORD = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.CA_PASSWORD].Value;
                }
                return _CA_PASSWORD;
            }
        }

        #endregion

        #region MICRO SERVICE
        private static string _MICRO_SERVICE_IP;
        public static string MICRO_SERVICE_IP
        {
            get
            {
                if (string.IsNullOrEmpty(_MICRO_SERVICE_IP))
                {
                    _MICRO_SERVICE_IP = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.MICRO_SERVICE_IP].Value;
                }
                return _MICRO_SERVICE_IP;
            }
        }
        private static string _MICRO_SERVICE_PORT;
        public static string MICRO_SERVICE_PORT
        {
            get
            {
                if (string.IsNullOrEmpty(_MICRO_SERVICE_PORT))
                {
                    _MICRO_SERVICE_PORT = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.MICRO_SERVICE_PORT].Value;
                }
                return _MICRO_SERVICE_PORT;
            }
        }

        private static string _MICRO_SERVICE_NAME;
        public static string MICRO_SERVICE_NAME
        {
            get
            {
                if (string.IsNullOrEmpty(_MICRO_SERVICE_NAME))
                {
                    _MICRO_SERVICE_NAME = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.MICRO_SERVICE_NAME].Value;
                }
                return _MICRO_SERVICE_NAME;
            }
        }

        private static string _MICRO_SERVICE_DISPLAY_NAME;
        public static string MICRO_SERVICE_DISPLAY_NAME
        {
            get
            {
                if (string.IsNullOrEmpty(_MICRO_SERVICE_DISPLAY_NAME))
                {
                    _MICRO_SERVICE_DISPLAY_NAME = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.MICRO_SERVICE_DISPLAY_NAME].Value;
                }
                return _MICRO_SERVICE_DISPLAY_NAME;
            }
        }
        #endregion
        #region CONFIG SSO

        private static string _SSO_HOST;
        public static string SSO_HOST
        {
            get
            {
                if (string.IsNullOrEmpty(_SSO_HOST))
                {
                    _SSO_HOST = Config.CONFIGURATION_APP_SETTING["AppSetting"][Constant.SSO_HOST].Value;
                }
                return _SSO_HOST;
            }
        }

        #endregion
    }
}
