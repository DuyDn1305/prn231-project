using WebAPI.Model;

namespace WebAPI.Interface
{
    public interface ICategoryRepository
    {
        ICollection<Category> GetCategories();
        Category GetCategoryById(int id);
        bool CreateCategory(Category category);
        bool UpdateCategory(Category category);
        bool DeleteCategory(Category category);
        bool IsCategoryExits(int id);
        bool Save();
    }
}
