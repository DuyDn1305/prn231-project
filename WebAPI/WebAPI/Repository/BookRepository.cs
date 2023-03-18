using Microsoft.EntityFrameworkCore;
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
            return db.Book.Include(p => p.Category).Include(p => p.Author).Include(p => p.Publisher)
                            .Include(p => p.Ratings).Include(p => p.Votes).Include(p => p.Bookmarks)
                            .AsSplitQuery()
                            .FirstOrDefault(b => b.BookId == id) ?? new();
        }

        public ICollection<Book> GetBookByName(string name)
        {
            return db.Book.Where(b => b.Title.ToLower().Trim().Contains(name.ToLower().Trim()))
                            .Include(p => p.Category).Include(p => p.Author).Include(p => p.Publisher)
                            .Include(p => p.Ratings).Include(p => p.Votes).Include(p => p.Bookmarks)
                            .AsSplitQuery()
                            .ToList();
        }

        public int BookCount()
        {
            return db.Book.Count();
        }

        public ICollection<Book> GetBooks(int total = 0, int page = 1)
        {
            if (total == 0)
            {
                return db.Book
                .Include(p => p.Category).Include(p => p.Author).Include(p => p.Publisher)
                .Include(p => p.Ratings).Include(p => p.Votes).Include(p => p.Bookmarks)
                .AsSplitQuery()
                .OrderBy(b => b.Title).ToList()
                .Select(c => { c.Category.Books = new List<Book>(); return c; }).ToList();
            }
            else 
            {
                int position = total * (page - 1);
                Console.WriteLine(position);
                return db.Book
                    .Include(p => p.Category).Include(p => p.Author).Include(p => p.Publisher)
                    .Include(p => p.Ratings).Include(p => p.Votes).Include(p => p.Bookmarks)
                    .AsSplitQuery()
                    .OrderBy(b => b.Title).ToList()
                    .Select(c => { c.Category.Books = new List<Book>(); return c; })
                    .Skip(position)
                    .Take(total)
                    .ToList();
            }
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
