﻿namespace EFDemo.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FristMidName { get; set; }
        public DateTime EnrollmentDate { get; set; }

        public virtual ICollection<Enrollment> Enrollments { get; set; }
    }
}
