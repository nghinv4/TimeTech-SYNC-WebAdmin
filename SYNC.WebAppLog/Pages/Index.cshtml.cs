using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace SYNC.WebAppLog.Pages
{    
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;        
        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;            
        }       

        public ActionResult OnPost()
        {
            return Page();
        }
        public IActionResult OnGet()
        {
            return Page();
        }        

    }
}
