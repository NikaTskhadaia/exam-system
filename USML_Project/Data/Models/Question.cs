using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace Models
{
    public partial class Question
    {
        public Question()
        {
            Answers = new HashSet<Answer>();
        }

        public int Id { get; set; }
        public string QuestionText { get; set; }
        public string Subject { get; set; }
        public string Topic { get; set; }
        public virtual ICollection<Answer> Answers { get; set; }
    }
}
