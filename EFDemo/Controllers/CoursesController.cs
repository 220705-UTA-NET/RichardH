using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EFDemo.DL;
using EFDemo.Models;

namespace EFDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private static List<Course> Courses = new List<Course>
        {
            new Course
            {
                CourseId = 1,
                Title = "Physics 101",
                Credits = 3
            }
        };

        [HttpGet]
        public async Task<ActionResult<List<Course>>> Get()
        {
            return Ok(Courses);
        }

        [HttpGet]
        public async Task<ActionResult<Course>> Get(int id)
        {
            var course = Courses.Find(c => c.CourseId == id);
            if (course == null)
                return BadRequest("Course not found.");
            return Ok(course);
        }

        [HttpPut]
        public async Task<ActionResult<List<Course>>> AddCourse(Course newCourse)
        {
            Courses.Add(newCourse);
            return Ok(Courses);
        }

        [HttpPost]
        public async Task<ActionResult<List<Course>>> UpdateCourse(Course request)
        {
            var course = Courses.Find(c => c.CourseId == request.CourseId);
            if (course == null)
                return BadRequest("Course not found.");

            course.CourseId = request.CourseId;
            course.Title = request.Title;
            course.Credits = request.Credits;

            return Ok(course);
        }
    }
}
