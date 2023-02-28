using WebAPI.Database;
using WebAPI.Model;

namespace WebAPI.Repository
{
    public class PublisherRepository
    {
        private readonly AppDBContext db;
        public PublisherRepository(AppDBContext appDbContext)
        {
            db = appDbContext;
        }
        public bool CreatePublisher(Publisher publisher)
        {
            db.Add(publisher);
            return Save();
        }

        public bool DeletePublisher(Publisher publisher)
        {
            db.Remove(publisher);
            return Save();
        }

        public Publisher GetPublisherById(int id)
        {
            return db.Publisher.FirstOrDefault(p => p.PublisherId == id) ?? new();
        }

        public ICollection<Publisher> GetPublishers()
        {
            return db.Publisher.OrderBy(p => p.PublisherName).ToList();
        }

        public bool IsPublisherExits(int id)
        {
            return db.Publisher.Any(p => p.PublisherId == id);
        }

        public bool Save()
        {
            int saved = db.SaveChanges();
            return saved > 0;
        }

        public bool UpdatePublisher(Publisher publisher)
        {
            db.Update(publisher);
            return Save();
        }
    }
}
