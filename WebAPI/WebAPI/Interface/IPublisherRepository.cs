using WebAPI.Model;

namespace WebAPI.Interface
{
    public interface IPublisherRepository
    {
        ICollection<Publisher> GetPublishers();
        Publisher GetPublisherById(int id);
        bool CreatePublisher(Publisher publisher);
        bool UpdatePublisher(Publisher publisher);
        bool DeletePublisher(Publisher publisher);
        bool IsPublisherExits(int id);
        bool Save();
    }
}
