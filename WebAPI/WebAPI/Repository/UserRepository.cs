using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebAPI.Database;
using WebAPI.Model;

namespace WebAPI.Repository
{
    public class UserRepository
    {
        private readonly AppDBContext db;
        public UserRepository(AppDBContext appDbContext)
        {
            db = appDbContext;
        }
        public bool CreateUser(User user)
        {
            db.Add(user);
            return Save();
        }
        public bool Save()
        {
            int saved = db.SaveChanges();
            return saved > 0;
        }
        public ICollection<User> GetUsers()
        {
            return db.User.OrderBy(b => b.UserId).ToList();
        }

        public Task<User?>? FindByNameAsync(string username)
        {
            return db.User.FirstOrDefaultAsync(u => u.UserName == username) ?? null;
        }

        public async Task<bool> CheckPasswordAsync(User user, string password)
        {
            bool result = user.Password == password;
            return await Task.FromResult(result);
        }

        public Task<User?>? FindByEmailAsync(string email)
        {
            return db.User.FirstOrDefaultAsync(u => u.Email == email) ?? null;
        }

        public async Task<IdentityResult> CreateAsync(User user, string password)
        {
            string hashedPassword = new PasswordHasher<User>().HashPassword(user, password);
            user.Password = hashedPassword;
            await db.AddAsync(user);
            return db.SaveChangesAsync().Result > 0 ? IdentityResult.Success : IdentityResult.Failed();
        }
    }
}
