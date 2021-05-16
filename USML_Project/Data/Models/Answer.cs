using System;
using System.Collections.Generic;

#nullable disable

namespace Models
{
    public partial class Answer
    {
        public int Id { get; set; }
        public string AnswerText { get; set; }
        public int QuestionId { get; set; }

        public bool IsCorrect { get; set; }

        public virtual Question Question { get; set; }
    }
}
