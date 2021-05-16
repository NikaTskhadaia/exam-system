using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Text;
using USML_Project.Data.Models;

namespace USML_Project.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Question>()
                .Property(q => q.Topic)
                .IsRequired(false);

            modelBuilder.Entity<Exam>()
                .Property(e => e.UserId)
                .HasColumnType("nvarchar(450)");

            base.OnModelCreating(modelBuilder);
        }


        public virtual DbSet<Answer> Answers { get; set; }
        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<Exam> Exams { get; set; }
    }
}
