using Microsoft.EntityFrameworkCore;
using WebAPI.Database;
using WebAPI.Model;

namespace WebAPI.Repository
{
    public class RatingRepository
    {
        private readonly AppDBContext db;
        public RatingRepository(AppDBContext appDbContext)
        {
            db = appDbContext;
        }

        public bool CreateRating(Rating rating)
        {
            db.Add(rating);
            return Save();
        }
        public bool Save()
        {
            int saved = db.SaveChanges();
            return saved > 0;
        }
        public ICollection<Rating> GetRatings()
        {
            return db.Rating.Include(r => r.User).Include(r => r.Book).OrderByDescending(b => b.RateId).OrderBy(b => b.RateId).ToList();
        }
        public ICollection<Rating> GetRatingsByBookId(int bookId)
        {
            return db.Rating.Where(r => r.BookId == bookId).Include(r => r.User).OrderByDescending(b => b.RateId).ToList();
        }
        public bool IsBookExits(int id)
        {
            return db.Book.Any(b => b.BookId == id);
        }

    }
}
