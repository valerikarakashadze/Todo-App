using Microsoft.EntityFrameworkCore;
using TodoApp.API.Data;

var builder = WebApplication.CreateBuilder(args); 

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TodoDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAngular",
      builder => builder
          .WithOrigins("http://localhost:4200")
          .AllowAnyMethod()
          .AllowAnyHeader());
});

var app = builder.Build(); 

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngular");
app.UseAuthorization();
app.MapControllers();

app.Run();
