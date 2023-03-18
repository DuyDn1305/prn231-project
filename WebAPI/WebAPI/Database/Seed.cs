using WebAPI.Model;

namespace WebAPI.Database
{
    public class Seed
    {
        private readonly AppDBContext db;
        public Seed(AppDBContext context)
        {
            db = context;
        }

        public void SeedDataContext()
        {
            if (db.Book.Any() || db.Category.Any() || db.Author.Any() || db.Publisher.Any() || db.User.Any())
            {
                return; // Data already exists
            }
            // Seed categories
            List<Category> categories = new()
            {
                new Category { CategoryName = "Self-Help" },
                new Category { CategoryName = "Novels" },
                new Category { CategoryName = "Non-Fiction" },
                new Category { CategoryName = "Fiction" },
                new Category { CategoryName = "Short Story" },
                new Category { CategoryName = "Documetation" },

            };
            db.Category.AddRange(categories);
            db.SaveChanges();

            // Seed authors
            List<Author> authors = new()
            {
                new Author {
                    AuthorName = "Hoa Nhất",
                    AuthorDescription = "Hoa Nhất là nữ tác giả người An Huy (Trung Quốc), thuở nhỏ đã thông thạo Ngũ cầm hí (một loại khí công cổ đại – mô phỏng điệu bộ của năm loài thú: cọp, khỉ, chim, nai, gấu), văn hay, chữ tốt, hiểu biết rộng. Cô từng đạt rất nhiều thành tựu trong cuộc sống. Hiện tại, cô là chuyên gia thiết kế và hoạch định trường học thuộc Bộ Giáo Dục; Đại sứ hình tượng Văn hóa & Du lịch thành phố Bạc Châu…" ,
                    AuthorUrl = "",
                    Nation = "China"
                },
                new Author {
                    AuthorName = "Vãn Tình",
                    AuthorDescription = "Vãn Tình là một nữ tác giả, biên kịch trẻ đến từ Trung Quốc. Thơ văn của Vãn Tình đi sâu vào khai thác các mối quan hệ giữa bản thân, gia đình và cuộc sống xung quanh. Với ngòi bút tả thực cùng giọng văn sắc sảo, chiêm nghiệm về cuộc đời sâu sắc và tinh tế, các tác phẩm của Vãn Tình được xem là hành tranh cho các bạn trẻ trong cuộc sống hiện đại ngày nay." ,
                    AuthorUrl = "https://cotich.net/van-tinh-la-ai-tac-gia-van-tinh-co-nhung-sach-noi-tieng-nao-a2402.html",
                    Nation = "China"
                },
                new Author {
                    AuthorName = "Harper Lee",
                    AuthorDescription = "Nelle Harper Lee (April 28, 1926 – February 19, 2016) was an American novelist. She penned the 1960 novel To Kill a Mockingbird that won the 1961 Pulitzer Prize and became a classic of modern American literature. Lee received numerous accolades and honorary degrees, including the Presidential Medal of Freedom in 2007 which was awarded for her contribution to literature." ,
                    AuthorUrl = "https://en.wikipedia.org/wiki/Harper_Lee",
                    Nation = "America"
                },
                new Author {
                    AuthorName = "J.D. Salinger",
                    AuthorDescription = "Jerome David Salinger (/ˈsælɪndʒər/; January 1, 1919 – January 27, 2010) was an American author best known for his 1951 novel The Catcher in the Rye. Salinger got his start in 1940, before serving in World War II, by publishing several short stories in Story magazine." ,
                    AuthorUrl = "https://en.wikipedia.org/wiki/J._D._Salinger",
                    Nation = "America"
                },
                new Author {
                    AuthorName = "Douglas Adams",
                    AuthorDescription = "Douglas Adams was an English author and humorist, best known for his science fiction series, The Hitchhiker's Guide to the Galaxy. He was born in Cambridge, England and studied at St. John's College, where he became involved in writing and performing comedy. After working as a radio producer and scriptwriter, he published. The Hitchhiker's Guide to the Galaxy in 1979, which became an instant classic and spawned a series of books, a television series, and a feature film. Adams' writing was known for its wit, satire, and irreverent take on science fiction and popular culture." ,
                    AuthorUrl = "https://www.douglasadams.com/",
                    Nation = "England"
                }
            };
            db.Author.AddRange(authors);
            db.SaveChanges();

            // Seed publishers
            List<Publisher> publishers = new()
            {
                new Publisher { PublisherName = "NXB Thế Giới", PublisherUrl="http://www.thegioipublishers.vn/en/home/" },
                new Publisher { PublisherName = "NXB Văn Học", PublisherUrl="https://nxbvanhoc.com.vn/"},
                new Publisher { PublisherName = "Little, Brown and Company", PublisherUrl="https://www.littlebrown.com/" },
                new Publisher { PublisherName = "J. B. Lippincott & Co.", PublisherUrl="https://en.wikipedia.org/wiki/J._B._Lippincott_%26_Co." },
                new Publisher { PublisherName = "Alfred A. Knopf", PublisherUrl="https://en.wikipedia.org/wiki/The_Nightingale_(Hannah_novel)" },
            };
            db.Publisher.AddRange(publishers);
            db.SaveChanges();

            // Seed books
            List<Book> books = new()
            {
                new Book {
                    Title = "To Kill a Mockingbird",
                    Description = "\"To Kill a Mockingbird\" is a novel by Harper Lee that takes place in the small town of Maycomb, Alabama during the 1930s. The story is told through the eyes of a young girl named Scout Finch, who lives with her older brother Jem and their widowed father, Atticus. The novel follows Scout and Jem as they navigate their way through the racial and social injustices of their town, including their father's decision to defend a black man named Tom Robinson who has been accused of raping a white woman.",
                    CategoryId = categories[1].CategoryId,
                    Category = categories[1],
                    AuthorId = authors[2].AuthorId,
                    Author = authors[2],
                    PublisherId = publishers[3].PublisherId,
                    Publisher = publishers[3],
                    CoverImage = "https://ik.imagekit.io/nav26/PRN231-Danna/To_Kill_a_Mockingbird__first_edition_cover_.jpg?updatedAt=1678868153319",
                    Price = 159000,
                    PublicationDate = DateTime.Parse("1960/07/11"),
                    TotalPage = 281,
                    CreatedAt = DateTime.Parse("2023/02/23"),
                    UpdatedAt = DateTime.Parse("2023/02/23")
                },
                new Book {
                    Title = "The Catcher in the Rye",
                    Description = "The Catcher in the Rye is an American novel by J. D. Salinger that was partially published in serial form from 1945–46 before being novelized in 1951. Originally intended for adults, it is often read by adolescents for its themes of angst and alienation, and as a critique of superficiality in society. The novel also deals with complex issues of innocence, identity, belonging, loss, connection, sex, and depression. The main character, Holden Caulfield, has become an icon for teenage rebellion. Caulfield, nearly of age, gives his opinion on just about everything as he narrates his recent life events.",
                    CategoryId = categories[1].CategoryId,
                    Category = categories[1],
                    AuthorId = authors[3].AuthorId,
                    Author = authors[3],
                    PublisherId = publishers[2].PublisherId,
                    Publisher = publishers[2],
                    CoverImage = "https://ik.imagekit.io/nav26/PRN231-Danna/640px-The_Catcher_in_the_Rye__1951__first_edition_cover_.jpg?updatedAt=1678867114675",
                    Price = 153000,
                    PublicationDate = DateTime.Parse("1951/7/16"),
                    TotalPage = 234,
                    CreatedAt = DateTime.Parse("2023/02/23"),
                    UpdatedAt = DateTime.Parse("2023/02/23")
                },
                new Book {
                    Title = "Càng bình tĩnh, càng hạnh phúc",
                    Description = "Cuốn sách số 7 với bìa sách tông màu tím cùng hoa diên vỹ mang thông điệp về sự bình tĩnh, an yên và hạnh phúc. Quy tụ 70 câu chuyện xoay quanh chủ đề tình yêu, hôn nhân, gia đình, sự nghiệp,.. Đấy là những câu chuyện của chính tác giả, của bạn bè, người thân xung quanh. Mình vẫn luôn đánh giá cao điều này ở tất cả các tác phẩm của Vãn Tình. Vì không chỉ mình, mà tất cả độc giả sẽ dễ dàng cảm nhận cũng như bắt gặp câu chuyện bản thân. Với một thông điệp truyền tải: Hy vọng giúp các cô gái trưởng thành, độc lập và tự tin hơn, tìm lại bản ngã và sống cuộc đời mà mình mong muốn.",
                    CategoryId = categories[0].CategoryId,
                    Category = categories[0],
                    AuthorId = authors[1].AuthorId,
                    Author = authors[1],
                    PublisherId = publishers[0].PublisherId,
                    Publisher = publishers[0],
                    CoverImage = "https://ik.imagekit.io/nav26/PRN231-Danna/cangbinhtinhcanghanhphuc_saysach-5_o9tRXdkUL.jpg?updatedAt=1679137339703",
                    Price = 95000,
                    PublicationDate = DateTime.Parse("2022/10/10"),
                    TotalPage = 352,
                    CreatedAt = DateTime.Parse("2023/02/23"),
                    UpdatedAt = DateTime.Parse("2023/02/23")
                },
                new Book {
                    Title = "Là Một Người Con Gái Gai Góc Cũng Có Thể Sưởi Ấm Cả Thế Gian",
                    Description = "Là một người con gái gai góc cũng có thể sưởi ấm cả thế gian gồm 7 chương sách, nội dung xoay quanh những vấn đề của chính tác giả, từ cuộc sống đến tình yêu, gia đình và có cả công việc. Thông điệp mà cuốn sách muốn gửi đến độc giả đó là sinh ra là con gái chúng ta thường bị xã hội định kiến và gắn mác yếu đuối thế nhưng không vì đó mà chúng ta ngại không dám thay đổi bản thân, không dám theo đuổi ước mơ. Dù có là cô gái mạnh mẽ hay yếu đuối thì bạn xứng đáng được yêu thương và trân trọng.",
                    CategoryId = categories[0].CategoryId,
                    Category = categories[0],
                    AuthorId = authors[0].AuthorId,
                    Author = authors[0],
                    PublisherId = publishers[1].PublisherId,
                    Publisher = publishers[1],
                    CoverImage = "https://ik.imagekit.io/nav26/PRN231-Danna/image-20210122093912-2_pWPU3RAsv.jpg?updatedAt=1679137339913",
                    Price = 102000,
                    PublicationDate = DateTime.Parse("2020/11/12"),
                    TotalPage = 340,
                    CreatedAt = DateTime.Parse("2023/02/23"),
                    UpdatedAt = DateTime.Parse("2023/02/23")
                },
                new Book {
                    Title = "The Great Gatsby",
                    Description = "\"The Great Gatsby\" is a classic novel by author F. Scott Fitzgerald, first published in 1925. The story revolves around the main character, Jay Gatsby, a wealthy and mysterious man, and his tumultuous relationship with a woman named Daisy Buchanan. The extravagant parties, complex romances, and struggles between the rich and poor are vividly and authentically depicted in this novel, creating a magnificent literary work about human desire, ambition, and desperation",
                    CategoryId = categories[1].CategoryId,
                    Category = categories[1],
                    AuthorId = authors[4].AuthorId,
                    Author = authors[4],
                    PublisherId = publishers[4].PublisherId,
                    Publisher = publishers[4],
                    CoverImage = "https://ik.imagekit.io/nav26/PRN231-Danna/The_Great_Gatsby_Cover_1925_Retouched_jJKUyAz7p.jpg?updatedAt=1679137550524",
                    Price = 110000,
                    PublicationDate = DateTime.Parse("1925/04/10"),
                    TotalPage = 156,
                    CreatedAt = DateTime.Parse("2023/02/23"),
                    UpdatedAt = DateTime.Parse("2023/02/23")
                }
            };
            db.Book.AddRange(books);

            // Save changes to database
            db.SaveChanges();

            List<User> Users = new()
            {
                new User
                {
                    UserName = "Admin",
                    Password = "123456",
                    Email = "Admin@gmail.com",
                    Phone = "0123456789"

                },
                    new User
                {
                    UserName = "Test",
                    Password = "123456",
                    Email = "Test@gmail.com",
                    Phone = "0987654321"
                }
            };
            db.User.AddRange(Users);
            db.SaveChanges();
        }
    }
}
