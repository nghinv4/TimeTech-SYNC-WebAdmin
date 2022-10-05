using System.Collections.Generic;

namespace Lib.Setting
{
    public class ConstantConsul
    {
        //----------------------------PublicSetting--------------------------------------------------------------------------------------
        #region UrlConfig
        public const string UrlConfig_GatewayUrl = "PublicSetting:UrlConfig:GatewayUrl";
        //public const string UrlConfig_GatewaySecret = "PublicSetting:UrlConfig:GatewaySecret";
        public const string UrlConfig_StorageUrl = "PublicSetting:UrlConfig:StorageUrl";
        //public const string UrlConfig_OAuth2_Secret = "PublicSetting:UrlConfig:OAuth2_Secret";
        public const string UrlConfig_OAuth2_Url = "PublicSetting:UrlConfig:OAuth2_Url";
        #endregion
        
        #region ConnectionDB       
        //ConnectionDB:PRF_INTERNAL
        public const string PRF_INTERNAL_ConnectionString = "PublicSetting:ConnectionDB:PRF_INTERNAL:ConnectionString";
        public const string PRF_INTERNAL_DatabaseName = "PublicSetting:ConnectionDB:PRF_INTERNAL:DatabaseName";
        public const string PRF_INTERNAL_FindMaxTime = "PublicSetting:ConnectionDB:PRF_INTERNAL:FindMaxTime";
        public const string PRF_INTERNAL_TypeName = "PublicSetting:ConnectionDB:PRF_INTERNAL:TypeName";
        //ConnectionDB:TIME_STARTER_DB
        public const string TIME_STARTER_DB_ConnectionString = "PublicSetting:ConnectionDB:TIME_STARTER_DB:ConnectionString";
        public const string TIME_STARTER_DB_DatabaseName = "PublicSetting:ConnectionDB:TIME_STARTER_DB:DatabaseName";
        public const string TIME_STARTER_DB_FindMaxTime = "PublicSetting:ConnectionDB:TIME_STARTER_DB:FindMaxTime";
        public const string TIME_STARTER_DB_TypeName = "PublicSetting:ConnectionDB:TIME_STARTER_DB:TypeName";
        #endregion         
        #region S3_FileStorage
        public const string S3_FileStorage_RestEndPoint = "PublicSetting:S3_FileStorage:RestEndPoint";
        public const string S3_FileStorage_AccessKeyID = "PublicSetting:S3_FileStorage:AccessKeyID";
        public const string S3_FileStorage_RecretAccessKey = "PublicSetting:S3_FileStorage:RecretAccessKey";
        public const string S3_FileStorage_BucketName = "PublicSetting:S3_FileStorage:BucketName";
        public const string S3_FileStorage_PublicFolder = "PublicSetting:S3_FileStorage:PublicFolder";
        #endregion        
        #region Redis
        public const string Redis_HostName = "PublicSetting:Redis:HostName";
        public const string Redis_Port = "PublicSetting:Redis:Port";
        #endregion
        #region MailServer
        public const string MailServer_SmtpServer = "PublicSetting:MailServer:SmtpServer";
        public const string MailServer_SmtpUserName = "PublicSetting:MailServer:SmtpUserName";
        public const string MailServer_SmtpPassword = "PublicSetting:MailServer:SmtpPassword";
        public const string MailServer_Port = "PublicSetting:MailServer:Port";
        public const string MailServer_FromMail = "PublicSetting:MailServer:FromMail";
        public const string MailServer_FromDisplayName = "PublicSetting:MailServer:FromDisplayName";
        #endregion
        #region SuportInfo
        public const string SuportInfo_SuportName = "PublicSetting:SuportInfo:SuportName";
        public const string SuportInfo_SuportPhone = "PublicSetting:SuportInfo:SuportPhone";
        public const string SuportInfo_SuportEmail = "PublicSetting:SuportInfo:SuportEmail";
        #endregion

        //---------------------------- PrivateSetting ---------------------------------------------------------------------------------------
         
        #region Microservice.Identity       
        public const string Microservice_Identity_Service_Name = "PrivateSetting:Microservice.Identity:Service_Name";
        public const string Microservice_Identity_Host = "PrivateSetting:Microservice.Identity:Host";
        public const string Microservice_Identity_Endpoint_AuthUri = "PrivateSetting:Microservice.Identity:Endpoint:AuthUri";
        public const string Microservice_Identity_Endpoint_AccessTokenUri = "PrivateSetting:Microservice.Identity:Endpoint:AccessTokenUri";
        public const string Microservice_Identity_Endpoint_UserInfoUri = "PrivateSetting:Microservice.Identity:Endpoint:UserInfoUri";
        public const string Microservice_Identity_UserName = "PrivateSetting:Microservice.Identity:UserName";
        public const string Microservice_Identity_PassWord = "PrivateSetting:Microservice.Identity:PassWord";
        public const string Microservice_Identity_ClientId = "PrivateSetting:Microservice.Identity:ClientId";
        public const string Microservice_Identity_Realms = "PrivateSetting:Microservice.Identity:Realms";
        public const string Microservice_Identity_ClientSecret = "PrivateSetting:Microservice.Identity:ClientSecret";     
        public const string Microservice_Identity_TokenExpire_Signature = "PrivateSetting:Microservice.Identity:TokenExpire:Signature";
        public const string Microservice_Identity_TokenExpire_AccessToken = "PrivateSetting:Microservice.Identity:TokenExpire:AccessToken";
        public const string Microservice_Identity_TokenExpire_RefreshToken = "PrivateSetting:Microservice.Identity:TokenExpire:RefreshToken";
        #endregion

        #region Microservice.Profiles       
        public const string Microservice_Profiles_Service_Name = "PrivateSetting:Microservice.Profiles:Service_Name";
        public const string Microservice_Profiles_Host = "PrivateSetting:Microservice.Profiles:Host";
        public const string Microservice_Profiles_TokenExpire_MailActivated = "PrivateSetting:Microservice.Profiles:TokenExpire:MailActivated";

        #endregion
        #region Microservice.Projects        
        public const string Microservice_Projects_Service_Name = "PrivateSetting:Microservice.Projects:Service_Name";
        public const string Microservice_Projects_Host = "PrivateSetting:Microservice.Projects:Host";
        #endregion
        #region Microservice.Storage    
        public const string Microservice_Storage_Service_Name = "PrivateSetting:Microservice.Storage:Service_Name";
        public const string Microservice_Storage_Host = "PrivateSetting:Microservice.Storage:Host";
        public const string Microservice_Storage_MaxLengthUpload = "PrivateSetting:Microservice.Storage:MaxLengthUpload";

        #endregion
        #region Microservice.SyncProfile
        public const string Microservice_SyncProfile_Service_Name = "PrivateSetting:Microservice.SyncProfile:Service_Name";
        public const string Microservice_SyncProfile_Host = "PrivateSetting:Microservice.SyncProfile:Host";
        #endregion


        //---------------------------- ----------------- ---------------------------------------------------------------------------------------
    }
}
