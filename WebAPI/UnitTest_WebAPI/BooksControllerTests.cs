using Microsoft.AspNetCore.Mvc;
using Moq;
using WebAPI.Controllers;
using WebAPI.Database;
using WebAPI.Dto;
using WebAPI.Model;
using WebAPI.Repository;

namespace WebAPI.Tests.Controllers
{
    public class BooksControllerTests
    {
        private readonly AppDBContext db;
        private readonly Mock<BookRepository> _bookRepositoryMock;
        private readonly Mock<AuthorRepository> _authorRepositoryMock;
        private readonly Mock<CategoryRepository> _categoryRepositoryMock;
        private readonly Mock<PublisherRepository> _publisherRepositoryMock;

        public BooksControllerTests()
        {
            _bookRepositoryMock = new Mock<BookRepository>();
            _authorRepositoryMock = new Mock<AuthorRepository>();
            _categoryRepositoryMock = new Mock<CategoryRepository>();
            _publisherRepositoryMock = new Mock<PublisherRepository>();
        }

        [Fact]
        public void GetBooks_ReturnsOkResult()
        {
            // Arrange
            int pageSize = 10;
            string startCursor = "";
            List<BookDTO> bookDTOs = new()
            {
                new BookDTO { BookId = 1, Title = "Book 1" },
                new BookDTO { BookId = 2, Title = "Book 2" },
                new BookDTO { BookId = 3, Title = "Book 3" }
            };
            BookRepository bookRepository = new(db);
            AuthorRepository authorRepository = new(db);

            CategoryRepository categoryRepository = new(db);
            PublisherRepository publisherRepository = new(db);

            _bookRepositoryMock.Setup(x => x.GetBookDTOs(pageSize, startCursor)).Returns(bookDTOs);
            _authorRepositoryMock.Setup(x => x.GetAuthors()).Returns(new List<Author>());
            _categoryRepositoryMock.Setup(x => x.GetCategories()).Returns(new List<Category>());
            _publisherRepositoryMock.Setup(x => x.GetPublishers()).Returns(new List<Publisher>());

            BooksController controller = new(
                bookRepository,
                authorRepository,
                categoryRepository,
                publisherRepository);

            // Act
            IActionResult result = controller.GetBooks(pageSize, startCursor);

            // Assert
            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            object model = Assert.IsType<object>(okResult.Value);
            Assert.Equal(3, ((dynamic)model).books.Count);
            Assert.Equal(3, ((dynamic)model).pageInfo.count);
            Assert.True(((dynamic)model).pageInfo.hasNextPage);
            Assert.Equal("3", ((dynamic)model).pageInfo.endCursor);
        }

    }
}
