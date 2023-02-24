//using System;
//using WebAPI.Model;

//namespace WebAPI.Database
//{
//    public class Seed
//    {
//        private readonly AppDBContext db;
//        public Seed(AppDBContext context)
//        {
//            this.db = context;
//        }

//        public void SeedDataContext()
//        {
//            if (db.Book.Any() || db.Category.Any() || db.Author.Any() || db.Publisher.Any())
//            {
//                return; // Data already exists
//            }
//            // Seed categories
//            var categories = new List<Category>
//            {
//                new Category { CategoryName = "Self-Help" },
//                new Category { CategoryName = "Novels" }
//            };
//            db.Category.AddRange(categories);

//            // Seed authors
//            var authors = new List<Author>
//        {
//            new Author { AuthorName = "Hoa Nhất", AuthorDescription = "Hoa Nhất là nữ tác giả người An Huy (Trung Quốc), thuở nhỏ đã thông thạo Ngũ cầm hí (một loại khí công cổ đại – mô phỏng điệu bộ của năm loài thú: cọp, khỉ, chim, nai, gấu), văn hay, chữ tốt, hiểu biết rộng. Cô từng đạt rất nhiều thành tựu trong cuộc sống. Hiện tại, cô là chuyên gia thiết kế và hoạch định trường học thuộc Bộ Giáo Dục; Đại sứ hình tượng Văn hóa & Du lịch thành phố Bạc Châu…" },
//            new Author { AuthorName = "Vãn Tình", AuthorDescription = "Author of A Brief History of Time" },
//            new Author { AuthorName = "Harper Lee", AuthorDescription = "Former First Lady of the United States" },
//            new Author { AuthorName = "J.D. Salinger", AuthorDescription = "Former First Lady of the United States" }
//        };
//            context.Authors.AddRange(authors);

//            // Seed publishers
//            var publishers = new List<Publisher>
//        {
//            new Publisher { PublisherName = "Bloomsbury Publishing" },
//            new Publisher { PublisherName = "Bantam Books" },
//            new Publisher { PublisherName = "Crown Publishing Group" }
//        };
//            context.Publishers.AddRange(publishers);

//            // Seed books
//            var books = new List<Book>
//        {
//            new Book { Title = "Harry Potter and the Philosopher's Stone", Description = "The first book in the Harry Potter series", CategoryId = 1, AuthorId = 1, PublisherId = 1 },
//            new Book { Title = "A Brief History of Time", Description = "A popular science book on cosmology", CategoryId = 2, AuthorId = 2, PublisherId = 2 },
//            new Book { Title = "Becoming", Description = "A memoir by Michelle Obama", CategoryId = 4, AuthorId = 3, PublisherId = 3 }
//        };
//            context.Books.AddRange(books);

//            // Save changes to database
//            context.SaveChanges();
//        }
//    }
//}
