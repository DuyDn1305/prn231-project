using Microsoft.AspNetCore.Mvc;
using WebAPI.Database;
using WebAPI.Model;

namespace WebAPI.Repository
{
    public class VoteRepositorry : Controller
    {
        private readonly AppDBContext db;
        public VoteRepositorry(AppDBContext appDbContext)
        {
            db = appDbContext;
        }

        public bool CreateVote(Vote vote)
        {
            db.Add(vote);
            return Save();
        }
        public bool Save()
        {
            int saved = db.SaveChanges();
            return saved > 0;
        }
        public ICollection<Vote> GetVotes()
        {
            return db.Vote.OrderBy(b => b.VoteId).ToList();
        }
    }
}
