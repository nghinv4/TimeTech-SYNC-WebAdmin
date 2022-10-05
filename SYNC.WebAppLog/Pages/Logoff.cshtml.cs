using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace SYNC.WebAppLog.Pages
{
    public class LogoffModel : PageModel
    {
        private readonly ILogger<LogoffModel> _logger;

        public LogoffModel(ILogger<LogoffModel> logger)
        {
            _logger = logger;
        }
        public IActionResult OnGet()
        {            
            return RedirectToPage("Index");
        }
    }
}
