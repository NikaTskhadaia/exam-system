using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace USML_Project.Data.Models
{
    public class Exam
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public string Answers { get; set; }

        public int Duration { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
