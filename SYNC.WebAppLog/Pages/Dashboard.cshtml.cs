using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace SYNC.WebAppLog.Pages
{
    public class DashboardModel : PageModel
    {
        private readonly ILogger<DashboardModel> _logger;

        public DashboardModel(ILogger<DashboardModel> logger)
        {
            _logger = logger;
        }
        public void OnGet()
        {           

        }
        //public IActionResult OnGet()
        //{
        //    try
        //    {
        //        string sessionInfo = HttpContext.Session.GetString(Constant.SESSION_USER_LOGIN);
        //        if (string.IsNullOrEmpty(sessionInfo))
        //            return RedirectToPage("./Index");
        //        return Page();               

        //    }
        //    catch (Exception ex)
        //    {
        //        LogEventError.LogEvent(System.Reflection.MethodBase.GetCurrentMethod().Name, ex);
        //        return new RedirectToPageResult("Error");
        //    }

        //}
    }
}
