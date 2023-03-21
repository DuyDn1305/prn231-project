using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using WebAPI.Repository;

namespace UnitTestProject
{
    [TestClass]
    public class BookControllerTest
    {
        [TestMethod]
        public void GetBooks_ReturnsOkResult()
        {
            // Arrange
            Mock<BookRepository> mockRepository = new Mock<BookRepository>();
            List<BookDTO> mockBookDTOs = new List<BookDTO>
        {
            new BookDTO { BookId = 1, Title = "Book 1" },
            new BookDTO { BookId = 2, Title = "Book 2" }
        };
            mockRepository.Setup(x => x.GetBookDTOs(It.IsAny<int>(), It.IsAny<string>()))
                .Returns(mockBookDTOs);
            mockRepository.Setup(x => x.BookCount())
                .Returns(2);
            var controller = new BooksController(mockRepository.Object);

            // Act
            var result = controller.GetBooks();

            // Assert
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
            var okResult = (OkObjectResult)result;
            var value = okResult.Value;
            ICollection<BookDTO> books = value.GetType().GetProperty("books").GetValue(value, null) as ICollection<BookDTO>;
            var pageInfo = value.GetType().GetProperty("pageInfo").GetValue(value, null);
            int count = (int)pageInfo.GetType().GetProperty("count").GetValue(pageInfo, null);
            bool hasNextPage = (bool)pageInfo.GetType().GetProperty("hasNextPage").GetValue(pageInfo, null);
            var endCursor = pageInfo.GetType().GetProperty("endCursor").GetValue(pageInfo, null);
            Assert.AreEqual(mockBookDTOs.Count, books.Count);
            Assert.AreEqual(2, count);
            Assert.IsFalse(hasNextPage);
            Assert.AreEqual(mockBookDTOs.Last().BookId.ToString(), endCursor);
        }
    }
}
