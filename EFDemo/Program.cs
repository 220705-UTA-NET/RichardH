using Microsoft.EntityFrameworkCore;
using EFDemo.DL;

var builder = WebApplication.CreateBuilder(args);


/*
 * - Start new webapi w/controllers
 * 
 * - Create Model class
                                         namespace EFDemo.Models
                                        {
                                            public class Associate
                                            {
                                                public int Id { get; set; }
                                                public string LastName { get; set; }
                                                public string FristMidName { get; set; }
                                                public DateTime DOB { get; set; }
                                        }
 *      
 * 
 * - Create Student Controller (with in-controller static list of Associates)

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
                                                if (course == null)
                                                    return BadRequest("Courses not found.");
                                                return Ok(course);
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
                                            
                                            [HttpDelete]
                                            public async Task<ActionResult<List<Course>>> DeleteCourse(int id)
                                            {
                                                var course = Courses.Find(c => c.CourseId == id);
                                                if (course == null)
                                                    return BadRequest("Course not found.");

                                                Courses.Remove(course);
                                                return ok(Courses);
                                            }
                                        }
 *
 *
 *  - test functionality of controller
 *
 *  - create db (azure), and get connection string
 *  - enter in appsettings.json 
 *      
 *      
                                        {
                                            "ConnectionStrings": {
                                            "DefaultConnection": "... ... ..."
                                            },
                                            "Logging": {
                                            "LogLevel": {
                                                "Default": "Information",
                                                "Microsoft.AspNetCore": "Warning"
                                            }
                                            },
                                            "AllowedHosts": "*"
                                        }
 *  
 *  
 *  - Create Data Context class
                                        namespace EFDemo.DL
                                        {
                                            public class SchoolContext : DbContext
                                            {                       **DEPENDENCY INJECTION**
                                                public SchoolContext(DbContextOptions<SchoolContext> options ) : base(options) { }

                                                public DbSet<Course> Courses { get; set; }
                                                public DbSet<Enrollment> Enrollments { get; set; }
                                                public DbSet<Student> Students { get; set; }

                                            }
                                        }
 *  - Will need NuGet Packages:
 *      Microsoft EntityFramework
 *      Microsoft EntityFrameworkCore
 *      Microsoft EntityFrameworkCore.Design
 *      Microsoft EntityFrameworkCore.SqlServer
 *      
 *  !!!!!!!VERSION NUMBERS!!!!!!!
 *  
 *  
 *  - Add DbContext and connection string to Program.cs
 *      
                                        builder.Services.AddControllers();
                                        builder.Services.AddDbContext<SchoolContext>(options =>
                                        {
                                            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
                                        });

                                        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
                                        builder.Services.AddEndpointsApiExplorer();
                                        builder.Services.AddSwaggerGen();

 *  
 *  
 *  
 *  
 *  
 *  - Install EF on CLI
 *      dotnet tool install dotnet-ef
 *      dotnet tool install --global dotnet-ef
 *      
 *      dotnet tool uninstall --global dotnet-ef
 *      
 *  - Create Initial Migration
 *      dotnet ef migrations add Initial
 *
 *  - Examine Migration in files - ADO.Net
 *  
 *  - Run Migration
 *      dotnet ef database update
 *      
 *  - Examine database with Azure Data Studio?
 *  
 *  - Enter value in database to demo?
 *  
 *  - Adapt Controller to use EF methods
 *  
                                        public class CoursesController : ControllerBase
                                        {
                                            public CoursesController(**SchoolContext** schoolContext)
                                            {
                                                _context = schoolContext;
                                            }

                                            [HttpGet]
                                            public async Task<ActionResult<List<Course>>> Get()
                                            {
                                                return Ok(await _context.Courses.ToListAsync());
                                            }

                                            [HttpGet]
                                            public async Task<ActionResult<Course>> Get(int id)
                                            {
                                                var course = await _context.Courses.FindAsync(id);
                                                if (course == null)
                                                    return BadRequest("Course not found.");
                                                return Ok(course);
                                            }

                                            [HttpPut]
                                            public async Task<ActionResult<List<Course>>> AddCourse(Course newCourse)
                                            {
                                                _context.Courses.Add(newCourse);
                                                await _context.SaveChangesAsync();

                                                return Ok(await _context.Courses.ToListAsync());
                                            }

                                            [HttpPost]
                                            public async Task<ActionResult<List<Course>>> UpdateCourse(Course request)
                                            {
                                                var course = await _context.Courses.FindAsync(request.CourseId);
                                                if (course == null)
                                                    return BadRequest("Course not found.");

                                                course.Title = request.Title;
                                                course.Credits = request.Credits;

                                                await _context.SaveChangesAsync();

                                                return Ok(await _context.Courses.ToListAsync());
                                            }
                                            
                                            [HttpDelete]
                                            public async Task<ActionResult<List<Course>>> DeleteCourse(int id)
                                            {
                                                var course = await _context.Courses.FindAsync(id);
                                                if (course == null)
                                                    return BadRequest("Course not found.");

                                                _context.Courses.Remove(course);
                                                await _context.SaveChangesAsync();
                                                return ok(await _context.Courses.ToListAsync());
                                            }
                                        }
 *  
 *      
 *  - Demo functionality
 *  
 *  - Add Batch model
 *  - add link table ?
 *      - many-many
 *      - one-many
 *      public virtual ICollection< **the many** > Enrollments { get; set; }
 *      
 *      
 *      
 *      
 *      
 */






















// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<SchoolContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
