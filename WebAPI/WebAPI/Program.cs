using Imagekit;
using Microsoft.EntityFrameworkCore;
using WebAPI.Database;
using WebAPI.Repository;

namespace WebAPI
{
    public class Program
    {
        public static IConfiguration Config { get; private set; } = null!;

        public static ServerImagekit Imagekit => new(Program.Config["Imagekit:PublicKey"], Program.Config["Imagekit:PrivateKey"], Program.Config["Imagekit:Url"]);

        public static void Main(string[] args)
        {
            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddCors(option =>
            {
                option.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });
            builder.Services.AddTransient<Seed>();
            builder.Services.AddDbContext<AppDBContext>(options =>
            {
                options.UseSqlServer(builder.Configuration["SQL"]);
            });
            builder.Services.BuildServiceProvider().GetService<AppDBContext>().Database.Migrate();
            builder.Services.AddScoped<BookRepository>();
            builder.Services.AddScoped<CategoryRepository>();
            builder.Services.AddScoped<AuthorRepository>();
            builder.Services.AddScoped<PublisherRepository>();
            WebApplication app = builder.Build();
            Config = app.Configuration;
            SeedData(app);

            void SeedData(IHost app)
            {
                IServiceScopeFactory? scopedFactory = app.Services.GetService<IServiceScopeFactory>();

                using IServiceScope? scope = scopedFactory.CreateScope();
                Seed? service = scope.ServiceProvider.GetService<Seed>();
                service.SeedDataContext();
            }
            app.UseCors();
            app.MapControllers();

            app.Run();
        }
    }
}