using Employee.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Emp = Employee.Api.Models.Employee;   // ALIAS — forces the class, not a namespace

namespace Employee.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public EmployeesController(AppDbContext context) { _context = context; }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Emp>>> GetEmployees()
            => await _context.Employees.AsNoTracking().ToListAsync();

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Emp>> GetEmployee(int id)
        {
            var emp = await _context.Employees.FindAsync(id);
            return emp is null ? NotFound() : emp;
        }

        [HttpPost]
        public async Task<ActionResult<Emp>> PostEmployee(Emp emp)
        {
            _context.Employees.Add(emp);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmployee), new { id = emp.Id }, emp);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutEmployee(int id, Emp emp)
        {
            if (id != emp.Id) return BadRequest();
            _context.Entry(emp).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var emp = await _context.Employees.FindAsync(id);
            if (emp is null) return NotFound();

            _context.Employees.Remove(emp);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
