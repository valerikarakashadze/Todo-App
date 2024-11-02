using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.API.Data;
using TodoApp.API.Models;

namespace TodoApp.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TodoController : ControllerBase
  {
    private readonly TodoDbContext _context;

    public TodoController(TodoDbContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
    {
      return await _context.Todos.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodo(int id)
    {
      var todoItem = await _context.Todos.FindAsync(id);

      if (todoItem == null)
      {
        return NotFound();
      }

      return todoItem;
    }

    [HttpPost]
    public async Task<ActionResult<TodoItem>> CreateTodo(TodoItem todoItem)
    {
      todoItem.CreatedDate = DateTime.UtcNow;
      _context.Todos.Add(todoItem);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetTodo), new { id = todoItem.Id }, todoItem);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTodo(int id, TodoItem todoItem)
    {
      if (id != todoItem.Id)
      {
        return BadRequest();
      }

      _context.Entry(todoItem).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!TodoItemExists(id))
        {
          return NotFound();
        }
        throw;
      }

      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(int id)
    {
      var todoItem = await _context.Todos.FindAsync(id);
      if (todoItem == null)
      {
        return NotFound();
      }

      _context.Todos.Remove(todoItem);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    [HttpPatch("{id}/toggle")]
    public async Task<IActionResult> ToggleTodoStatus(int id)
    {
      var todoItem = await _context.Todos.FindAsync(id);
      if (todoItem == null)
      {
        return NotFound();
      }

      todoItem.IsCompleted = !todoItem.IsCompleted;
      todoItem.CompletedDate = todoItem.IsCompleted ? DateTime.UtcNow : null;

      await _context.SaveChangesAsync();
      return Ok(todoItem);
    }

    private bool TodoItemExists(int id)
    {
      return _context.Todos.Any(e => e.Id == id);
    }
  }
}
