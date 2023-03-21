using System.ComponentModel.DataAnnotations;
using WebAPI.Model;

namespace WebAPI.Dto
{
    public class VoteDto
    {
        [Range(0,2)]
        public int VoteValue { get; set; }
        public string Username { get; set; } = string.Empty;
        public int BookId { get; set; }
    }
}
