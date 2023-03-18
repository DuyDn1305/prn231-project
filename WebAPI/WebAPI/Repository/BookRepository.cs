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

        public ICollection<Book> GetAllBooks()
        {
            return db.Book
                .Include(p => p.Category).Include(p => p.Author).Include(p => p.Publisher)
                .Include(p => p.Ratings).Include(p => p.Votes).Include(p => p.Bookmarks)
                .AsSplitQuery()
                .OrderBy(b => b.Title).ToList()
                .Select(c => { c.Category.Books = new List<Book>(); return c; }).ToList();
        }

        public ICollection<Book> GetBooks(int pageSize, string startCursor)
        {
            IQueryable<Book> query = db.Book
                .Include(p => p.Category).Include(p => p.Author).Include(p => p.Publisher)
                .Include(p => p.Ratings).Include(p => p.Votes).Include(p => p.Bookmarks)
                .AsSplitQuery()
                .OrderBy(b => b.Title);

            if (!string.IsNullOrEmpty(startCursor))
            {
                // Find the book that matches the start cursor
                Book startBook = db.Book.FirstOrDefault(b => b.BookId.ToString() == startCursor);
                if (startBook != null)
                {
                    // Materialize the query into a list of books
                    List<Book> bookList = query.ToList();

                    // Skip books until we find the start cursor
                    int startIndex = bookList.FindIndex(b => b.BookId == startBook.BookId);
                    if (startIndex >= 0)
                    {
                        bookList = bookList.Skip(startIndex).ToList();
                    }

                    // Take the requested number of books
                    bookList = bookList.Take(pageSize).ToList();

                    return bookList;
                }
            }

            // Take the requested number of books
            query = query.Take(pageSize);

            // Materialize the query into a list of books
            List<Book> books = query.ToList();

            // Set the category's books to null to prevent a circular reference
            foreach (Book book in books)
            {
                book.Category.Books = null;
            }

            return books;
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
