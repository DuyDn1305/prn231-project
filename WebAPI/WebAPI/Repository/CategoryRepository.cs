using WebAPI.Database;
using WebAPI.Model;

namespace WebAPI.Repository
{
    public class CategoryRepository
    {
        private readonly AppDBContext db;
        public CategoryRepository(AppDBContext appDbContext)
        {
            db = appDbContext;
        }
        public bool CreateCategory(Category category)
        {
            db.Add(category);
            return Save();
        }

        public bool DeleteCategory(Category category)
        {
            db.Remove(category);
            return Save();
        }

        public virtual ICollection<Category> GetCategories()
        {
            return db.Category.OrderBy(c => c.CategoryName).ToList();
        }

        public Category GetCategoryById(int id)
        {
            return db.Category.FirstOrDefault(c => c.CategoryId == id) ?? new();
        }

        public bool IsCategoryExits(int id)
        {
            return db.Category.Any(c => c.CategoryId == id);
        }

        public bool Save()
        {
            int saved = db.SaveChanges();
            return saved > 0;
        }

        public bool UpdateCategory(Category category)
        {
            db.Update(category);
            return Save();
        }
    }
}
