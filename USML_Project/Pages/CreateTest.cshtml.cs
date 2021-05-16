using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;

namespace TestProject.Pages
{
    public class CreateTestModel : PageModel
    {
        [BindProperty]
        public List<string> Subjects { get; set; }

        [BindProperty]
        public bool TimeLimit { get; set; }
        [BindProperty]
        public bool ShowCorrectAnswer { get; set; }
        [BindProperty]
        public bool Unused { get; set; }

        public void OnGet()
        {
        }

        public IActionResult OnPost(int questionQuantity)
        {
            Subjects.Add(questionQuantity.ToString());
            return RedirectToPage("Exam", new { subjects =  JsonConvert.SerializeObject(Subjects) });
        }
    }
}
