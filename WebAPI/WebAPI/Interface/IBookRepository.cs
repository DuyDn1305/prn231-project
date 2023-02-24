using WebAPI.Model;

namespace WebAPI.Interface
{
    public interface IBookRepository
    {
        ICollection<Book> GetBooks();
        Book GetBookById(int id);
        ICollection<Book> GetBookByName(string name);
        bool CreateBook (Book book);
        bool UpdateBook (Book book);
        bool DeleteBook (Book book);
        bool IsBookExits (int id);
        bool Save();
    }
}
