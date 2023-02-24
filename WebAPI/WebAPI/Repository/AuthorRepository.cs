using WebAPI.Database;
using WebAPI.Interface;
using WebAPI.Model;

namespace WebAPI.Repository
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly AppDBContext db;
        public AuthorRepository(AppDBContext appDbContext)
        {
            db = appDbContext;
        }
        public bool CreateAuthor(Author author)
        {
            db.Add(author);
            return Save();
        }

        public bool DeleteAuthor(Author author)
        {
            db.Remove(author);
            return Save();
        }

        public Author GetAuthorById(int id)
        {
            return db.Author.FirstOrDefault(a => a.AuthorId == id) ?? new();
        }

        public ICollection<Author> GetAuthors()
        {
            return db.Author.OrderBy(a => a.AuthorName).ToList();
        }

        public bool IsAuthorExits(int id)
        {
            return db.Author.Any(a => a.AuthorId == id);
        }

        public bool Save()
        {
            int saved = db.SaveChanges();
            return saved > 0;
        }

        public bool UpdateAuthor(Author author)
        {
            db.Update(author);
            return Save();
        }
    }
}
