using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using WebAPI.Database;
using WebAPI.Dto;
using WebAPI.Model;
using static System.Reflection.Metadata.BlobBuilder;

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

        public BookDTO GetBookById(int id)
        {
            var book = db.Book.Include(p => p.Category).Include(p => p.Author).Include(p => p.Publisher)
                            .Include(p => p.Ratings).Include(p => p.Votes)
                            .AsSplitQuery()
                            .FirstOrDefault(b => b.BookId == id) ?? new();
            var bookDtos = new BookDTO
            {
                BookId = book.BookId,
                Title = book.Title,
                Description = book.Description,
                CoverImage = book.CoverImage,
                Price = book.Price,
                CategoryId = book.CategoryId,
                CategoryName = book.Category.CategoryName,
                AuthorId = book.AuthorId,
                AuthorDescription = book.Author.AuthorDescription,
                AuthorUrl = book.Author.AuthorUrl,
                AuthorName = book.Author.AuthorName,
                PublisherId = book.PublisherId,
                PublicationDate = book.PublicationDate,
                PublisherUrl = book.Publisher.PublisherUrl,
                TotalPage = book.TotalPage,
                PublisherName = book.Publisher.PublisherName,
                CreatedAt = book.CreatedAt,
                UpdatedAt = book.UpdatedAt
            };
            return bookDtos;
        }

        public ICollection<BookDTO> GetBookByName(string name)
        {
            var books =  db.Book.Where(b => b.Title.ToLower().Trim().Contains(name.ToLower().Trim()))
                            .Include(p => p.Category).Include(p => p.Author).Include(p => p.Publisher)
                            .Include(p => p.Ratings).Include(p => p.Votes)
                            .AsSplitQuery()
                            .ToList();
            foreach (var book in books)
            {
                db.Entry(book.Category).State = EntityState.Detached;
                book.Category.Books = new List<Book>();
            }

            var bookDtos = books.Select(b => new BookDTO
            {
                BookId = b.BookId,
                Title = b.Title,
                Description = b.Description,
                CoverImage = b.CoverImage,
                Price = b.Price,
                CategoryId = b.CategoryId,
                CategoryName = b.Category.CategoryName,
                AuthorId = b.AuthorId,
                AuthorName = b.Author.AuthorName,
                AuthorDescription = b.Author.AuthorDescription,
                AuthorUrl = b.Author.AuthorUrl,
                PublicationDate = b.PublicationDate,
                TotalPage = b.TotalPage,
                PublisherId= b.PublisherId,
                PublisherName = b.Publisher.PublisherName,
                PublisherUrl = b.Publisher.PublisherUrl,
                CreatedAt = b.CreatedAt,
                UpdatedAt = b.UpdatedAt
            }).ToList();
            return bookDtos;
        }

        public int BookCount()
        {
            return db.Book.Count();
        }

        public ICollection<Book> GetAllBooks()
        {
            var books = db.Book
                .Include(p => p.Category)
                .Include(p => p.Author)
                .Include(p => p.Publisher)
                .Include(p => p.Ratings)
                .Include(p => p.Votes)
                .AsSplitQuery()
                .OrderBy(b => b.Title)
                .ToList();

            foreach (var book in books)
            {
                db.Entry(book.Category).State = EntityState.Detached;
                book.Category.Books = new List<Book>();
            }

            return books;
        }


        public ICollection<BookDTO> GetBookDTOs(int pageSize, string startCursor)
        {
            IQueryable<Book> query = db.Book.Include(p => p.Category).Include(p => p.Author).Include(p => p.Publisher).Include(p => p.Ratings).Include(p => p.Votes)
                .AsSplitQuery()
                .OrderBy(b => b.BookId);

            if (!string.IsNullOrEmpty(startCursor))
            {
                int cursor = 0;
                // Find the book that matches the start cursor
                List<Book> listBook = db.Book.OrderBy(b => b.BookId).ToList();
                Book startBook = listBook[int.TryParse(startCursor, out cursor) ? cursor-1 : -1];
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

                    // Map the books to BookDTOs
                    var bookDtos = bookList.Select(b => new BookDTO
                    {
                        BookId = b.BookId,
                        Title = b.Title,
                        Description = b.Description,
                        CoverImage = b.CoverImage,
                        Price = b.Price,
                        CategoryName = b.Category.CategoryName,
                        AuthorName = b.Author.AuthorName,
                        PublicationDate = b.PublicationDate,
                        TotalPage = b.TotalPage,
                        PublisherName = b.Publisher.PublisherName,
                        CreatedAt = b.CreatedAt,
                        UpdatedAt = b.UpdatedAt
                    }).ToList();

                    return bookDtos;
                }
            }

            // Take the requested number of books
            query = query.Take(pageSize);

            // Materialize the query into a list of books
            List<Book> books = query.ToList();

            // Map the books to BookDTOs
            var bookDTOs = books.Select(b => new BookDTO
            {
                BookId = b.BookId,
                Title = b.Title,
                Description = b.Description,
                CoverImage = b.CoverImage,
                Price = b.Price,
                CategoryName = b.Category.CategoryName,
                AuthorName = b.Author.AuthorName,
                PublicationDate = b.PublicationDate,
                TotalPage = b.TotalPage,
                PublisherName = b.Publisher.PublisherName,
                CreatedAt = b.CreatedAt,
                UpdatedAt = b.UpdatedAt
            }).ToList();

            return bookDTOs;
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
