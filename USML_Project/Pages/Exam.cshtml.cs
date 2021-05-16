using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Models;
using Newtonsoft.Json;
using USML_Project.Data;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using USML_Project.Data.Models;

namespace USML_Project.Pages
{
    public class ExamModel : PageModel
    {
        private readonly ApplicationDbContext _db;
        private readonly List<Question> _questionList;

        public ExamModel(ApplicationDbContext db, List<Question> questionList)
        {
            _db = db;
            _questionList = questionList;
        }

        public Question QuestionModel { get; set; }

        public void OnGet(string subjects)
        {
            List<string> subjectList = JsonConvert.DeserializeObject<List<string>>(subjects);

            int questionQuantity = int.Parse(subjectList[^1]);
            subjectList.Remove(questionQuantity.ToString());

            _questionList.AddRange(_db.Questions
                .Where(q => subjectList.Contains(q.Subject))
                .Include(q => q.Answers)
                .OrderBy(x => Guid.NewGuid())
                .Take(questionQuantity)
                .ToList());

            QuestionModel = _questionList.FirstOrDefault();
        }

        public IActionResult OnGetNext(int questionIndex)
        {
            Question QuestionModel = _questionList[questionIndex];

            return Partial("_QuestionViewPartial", QuestionModel);
        }

        public IActionResult OnGetPrevious(int questionIndex)
        {
            Question QuestionModel = _questionList[questionIndex - 1];

            return Partial("_QuestionViewPartial", QuestionModel);
        }

        public IActionResult OnGetRandom(int questionIndex)
        {
            Question QuestionModel = _questionList[questionIndex - 1];

            return Partial("_QuestionViewPartial", QuestionModel);
        }

        public IActionResult OnPost(int questionId, int answerId)
        {
            Question question = _questionList.Find(q => q.Id == questionId);
            var answer = _db.Answers.Where(a => a.QuestionId == questionId && a.IsCorrect == true).First();

            return Content(answer.Id.ToString());
        }

        public IActionResult OnPostFinish(string answerList, int duration, int counter)
        {
            _questionList.Clear();
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // will give the user's userId
            Exam exam = new() { Answers = answerList, Date = DateTime.Now, Duration = duration, UserId = userId };
            _db.Exams.Add(exam);
            _db.SaveChanges();
            var answers = JsonConvert.DeserializeObject<Dictionary<int, int>>(answerList);
            return Content("Statistics");
        }
    }
}