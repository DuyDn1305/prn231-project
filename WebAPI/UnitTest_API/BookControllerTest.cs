using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;

namespace UnitTest_API
{
    [TestClass]
    public class BookControllerTest
    {
        [TestMethod]
        public void GetBooks_ReturnsOkResult()
        {
            // Arrange
            var mockRepository = new Mock<BookRepository>();
            var mockBookDTOs = new List<BookDTO>
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
            var books = value.GetType().GetProperty("books").GetValue(value, null) as ICollection<BookDTO>;
            var pageInfo = value.GetType().GetProperty("pageInfo").GetValue(value, null);
            var count = (int)pageInfo.GetType().GetProperty("count").GetValue(pageInfo, null);
            var hasNextPage = (bool)pageInfo.GetType().GetProperty("hasNextPage").GetValue(pageInfo, null);
            var endCursor = pageInfo.GetType().GetProperty("endCursor").GetValue(pageInfo, null);
            Assert.AreEqual(mockBookDTOs.Count, books.Count);
            Assert.AreEqual(2, count);
            Assert.IsFalse(hasNextPage);
            Assert.AreEqual(mockBookDTOs.Last().BookId.ToString(), endCursor);
        }
    }
}
