using Lib.Setting;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace SYNC.WebAppLog
{
    public class Program
    {        
        private static string HTTP_URL = string.Empty;
        public static void Main(string[] args)
        {
            HTTP_URL = Config.APP_SETTING["HostSetting"][Constant.HTTP_URL].Value;
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingContext, config) =>
                {                                                  
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>().UseUrls(HTTP_URL);
                });


    }
}
