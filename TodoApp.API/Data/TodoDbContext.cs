using Microsoft.EntityFrameworkCore;
using TodoApp.API.Models;
using TodoApp.API.Data;


namespace TodoApp.API.Data
{
  public class TodoDbContext : DbContext
  {
    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options) { }

    public DbSet<TodoItem> Todos { get; set; }
  }
}
