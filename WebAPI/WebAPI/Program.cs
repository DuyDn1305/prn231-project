using Imagekit;
using Microsoft.EntityFrameworkCore;
using WebAPI.Database;

namespace WebAPI
{
    public class Program
    {
        public static IConfiguration Config { get; private set; } = null!;

        public static ServerImagekit Imagekit => new(Program.Config["Imagekit:PublicKey"], Program.Config["Imagekit:PrivateKey"], Program.Config["Imagekit:Url"]);

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddCors(option =>
            {
                option.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });
            builder.Services.AddDbContext<AppDBContext>(options =>
            {
                options.UseSqlServer(builder.Configuration["SQL"]);
            });

            var app = builder.Build();
            Config = app.Configuration;

            app.UseCors();
            app.MapControllers();

            app.Run();
        }
    }
}