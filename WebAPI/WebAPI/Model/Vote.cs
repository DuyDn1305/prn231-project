using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Model
{
    public class Vote
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VoteId { get; set; }
        [Range(0, 2)]
        public int VoteValue { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; } = new();

        public int BookId { get; set; }
        public Book? Book { get; set; } = new();
    }
}
