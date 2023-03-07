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
    }
}
