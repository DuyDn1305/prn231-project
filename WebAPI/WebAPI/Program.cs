using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text.Json.Serialization;
using WebAPI.Database;
using WebAPI.Repository;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Imagekit.Sdk;

namespace WebAPI
{
    public class Program
    {
        public static IConfiguration Config { get; private set; } = null!;

        public static ImagekitClient Imagekit { get; private set; }


        public static void Main(string[] args)
        {
            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            builder.Services.AddControllers().AddJsonOptions(x =>
                            x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

            builder.Services.AddCors(option =>
            {
                option.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                    };
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
            builder.Services.AddScoped<RatingRepository>();
            builder.Services.AddScoped<UserRepository>();
            builder.Services.AddScoped<VoteRepositorry>();
            builder.Services.AddScoped<AppDBContext>();

            WebApplication app = builder.Build();
            Config = app.Configuration;

            Imagekit = new(Config["Imagekit:PublicKey"], Config["Imagekit:PrivateKey"], Config["Imagekit:Url"]);
            
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
            app.UseAuthentication();
            app.UseAuthorization();
            app.Run();
        }
    }
}