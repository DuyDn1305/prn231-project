using WebAPI.Database;
using WebAPI.Model;

namespace WebAPI.Repository
{
    public class BookRepository
    {
        private readonly AppDBContext db;
        public BookRepository(AppDBContext appDbContext)
        {
            db = appDbContext;
        }
        public bool CreateBook(Book book)
        {
            db.Add(book);
            return Save();
        }

        public bool DeleteBook(Book book)
        {
            db.Remove(book);
            return Save();
        }

        public Book GetBookById(int id)
        {
            return db.Book.FirstOrDefault(b => b.BookId == id) ?? new();
        }

        public ICollection<Book> GetBookByName(string name)
        {
            return db.Book.Where(b => b.Title.ToLower().Trim().Contains(name.ToLower().Trim())).ToList();
        }

        public ICollection<Book> GetBooks()
        {
            return db.Book.OrderBy(b => b.Title).ToList();
        }

        public bool IsBookExits(int id)
        {
            return db.Book.Any(b => b.BookId == id);
        }

        public bool Save()
        {
            int saved = db.SaveChanges();
            return saved > 0;
        }

        public bool UpdateBook(Book book)
        {
            db.Update(book);
            return Save();
        }
    }
}
