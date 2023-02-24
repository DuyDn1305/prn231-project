using WebAPI.Model;

namespace WebAPI.Interface
{
    public interface IAuthorRepository
    {
        ICollection<Author> GetAuthors();
        Author GetAuthorById(int id);
        bool CreateAuthor(Author author);
        bool UpdateAuthor(Author author);
        bool DeleteAuthor(Author author);
        bool IsAuthorExits(int id);
        bool Save();
    }
}
