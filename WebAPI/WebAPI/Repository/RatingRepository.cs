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
            return db.Rating.OrderBy(b => b.RateId).ToList();
        }

    }
}
