using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
using WebAPI.Dto;
using WebAPI.Model;

namespace UnitTest
{
    public class UnitTest1
    {
        [Theory]
        [InlineData(10,"1")]
        [InlineData(2,"2")]
        public async Task GetOnePage(int pageSize, string cursor) 
        { 
            HttpResponseMessage resp = await Helper.Client.GetAsync($"books?pageSize={pageSize}&startCursor={cursor}");
            Assert.True(resp.IsSuccessStatusCode);
            JsonDocument json = JsonDocument.Parse(await resp.Content.ReadAsStringAsync());
            Assert.NotNull(json);
            JsonElement books = json.RootElement.GetProperty("books");
            List<Book>? data = books.Deserialize<List<Book>>();
            Assert.NotNull(data);
            Assert.True(data.Count <= pageSize);
        }

        [Theory]
        [InlineData(1)]
        public async Task GetBookById_ReturnsCorrectBook(int bookId)
        {
            // Arrange
            var book = new BookDTO { BookId = 1, Title = "To Kill a Mockingbird" };
            var content = new StringContent(JsonConvert.SerializeObject(book), Encoding.UTF8, "application/json");
            var client = Helper.Client;
            var request = new HttpRequestMessage(HttpMethod.Get, Helper.Client.BaseAddress + $"books/{bookId}");

            // Act
            var response = await client.SendAsync(request);

            // Assert
            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();
            var actualBook = JsonConvert.DeserializeObject<BookDTO>(responseContent);
            Assert.Equal(book.BookId, actualBook.BookId);
            Assert.Equal(book.Title, actualBook.Title);
        }

        [Theory]
        [InlineData("Mockingbird")]
        [InlineData("None")]
        public async Task GetBookByName_ReturnsMatchingBooks(string name)
        {
            // Arrange
            var expectedBooks = new List<BookDTO>
            {
                new BookDTO { BookId = 1, Title = "To Kill a Mockingbird" }
            };
            var requestUri = $"books/search?name={name}";

            // Act
            var response = await Helper.Client.GetAsync(requestUri);

            // Assert
            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();
            var actualBooks = JsonConvert.DeserializeObject<List<BookDTO>>(responseContent);
            Assert.Equal(expectedBooks.Count, actualBooks.Count);
            for (int i = 0; i < expectedBooks.Count; i++)
            {
                Assert.Equal(expectedBooks[i].BookId, actualBooks[i].BookId);
                Assert.Equal(expectedBooks[i].Title, actualBooks[i].Title);
            }
        }

        [Theory]
        [InlineData(10,"Test")]
        [InlineData(5,"None")]
        public async Task GetBooksByUsername_ReturnsMatchingBooks(int pageSize, string username)
        {
            // Arrange
            var requestUri = $"books/user?pagesize={pageSize}&username={username}";

            // Act
            var response = await Helper.Client.GetAsync(requestUri);

            // Assert
            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();
            var responseObject = JObject.Parse(responseContent);

            var books = responseObject["books"].ToObject<List<BookDTO>>();
            var pageInfo = responseObject["pageInfo"];

            Assert.NotNull(books);
            Assert.True(books.Count <= pageSize);

            Assert.NotNull(pageInfo);
            Assert.True(pageInfo["count"].ToObject<int>() == books.Count);
            Assert.False(pageInfo["hasNextPage"].ToObject<bool>());
            Assert.NotNull(pageInfo["endCursor"].ToString());
        }

        [Theory]
        [InlineData(10, "Test", "Mockingbird","1")]
        [InlineData(2, "Test", "Mockingbird","1")]
        public async Task GetBookByGivenUsername_ReturnsMatchingBooks(int pageSize,string username,string bookname,string startCursor)
        {
            // Arrange
            //var pageSize = 10;
            //var username = "Test";
            //var bookname = "Mockingbird";
            //var startCursor = "1";
            var requestUri = $"books/userbook?pagesize={pageSize}&username={username}&bookname={bookname}&startcursor={startCursor}";

            // Act
            var response = await Helper.Client.GetAsync(requestUri);

            // Assert
            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();
            var responseObject = JObject.Parse(responseContent);

            var books = responseObject["books"].ToObject<List<BookDTO>>();
            var pageInfo = responseObject["pageInfo"];

            Assert.NotNull(books);
            Assert.True(books.Count <= pageSize);

            Assert.NotNull(pageInfo);
            Assert.True(pageInfo["count"].ToObject<int>() == books.Count);
            Assert.False(pageInfo["hasNextPage"].ToObject<bool>());
            Assert.NotNull(pageInfo["endCursor"].ToString());
        }

        [Theory]
        [InlineData(1)]
        [InlineData(-1)]
        [InlineData(300)]
        public async Task UpdateBook_ReturnsSuccess(int bookId)
        {
            // Arrange
            var updateBook = new Book { BookId = bookId, Title = "To Kill a Mockingbird Test" };
            var requestUri = $"books/{bookId}";

            var content = new StringContent(JsonConvert.SerializeObject(updateBook), Encoding.UTF8, "application/json");

            // Act
            var response = await Helper.Client.PutAsync(requestUri, content);

            // Assert
            if (response.StatusCode == HttpStatusCode.BadRequest)
            {
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
                return;
            }
            else if (response.StatusCode == HttpStatusCode.NotFound)
            {
                Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
                return;
            }
            else
            {
                Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
                return;
            }
        }

        [Fact]
        public async Task CreateBook_ReturnsSuccess()
        {
            // Arrange
            // Arrange
            var bookRequest = new BookRequest
            {
                Title = "Test Book",
                Description = "This is a test book",
                CoverImage = new FormFile(new MemoryStream(Encoding.UTF8.GetBytes("This is a dummy image")), 0, Encoding.UTF8.GetBytes("This is a dummy image").Length, "CoverImage", "dummy.jpg"),
                Price = 9.99m,
                CategoryId = 1,
                AuthorId = 1,
                UserId = 2,
                PublicationDate = DateTime.Now.Date,
                TotalPage = 100,
                PublisherId = 1
            };
            var requestUri = $"books";

            var multipartContent = new MultipartFormDataContent();
            multipartContent.Add(new StringContent(bookRequest.Title), "Title");
            multipartContent.Add(new StringContent(bookRequest.Description), "Description");
            multipartContent.Add(new StreamContent(bookRequest.CoverImage.OpenReadStream()), "CoverImage", "CoverImage.jpg");
            multipartContent.Add(new StringContent(bookRequest.Price.ToString()), "Price");
            multipartContent.Add(new StringContent(bookRequest.CategoryId.ToString()), "CategoryId");
            multipartContent.Add(new StringContent(bookRequest.AuthorId.ToString()), "AuthorId");
            multipartContent.Add(new StringContent(bookRequest.UserId.ToString()), "UserId");
            multipartContent.Add(new StringContent(bookRequest.PublicationDate.ToString("yyyy-MM-dd")), "PublicationDate");
            multipartContent.Add(new StringContent(bookRequest.TotalPage.ToString()), "TotalPage");
            multipartContent.Add(new StringContent(bookRequest.PublisherId.ToString()), "PublisherId");

            // Act
            var response = await Helper.Client.PostAsync(requestUri, multipartContent);

            // Assert
            if (response.StatusCode == HttpStatusCode.BadRequest)
            {
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
                return;
            }
            else if (response.StatusCode == HttpStatusCode.NoContent)
            {
                Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
                return;
            }
            else
            {
                Assert.True(false, $"Unexpected status code: {response.StatusCode}");
            }

        }

        [Fact]
        public async Task DeleteBook_WithValidBookId_ReturnsNoContent()
        {
            // Arrange
            var bookIdToDelete = 7;
            var requestUri = $"books/{bookIdToDelete}";

            // Act
            var response = await Helper.Client.DeleteAsync(requestUri);

            // Assert
            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Fact]
        public async Task DeleteBook_WithNonExistentBookId_ReturnsNotFound()
        {
            // Arrange
            var nonExistentBookId = 999;
            var requestUri = $"books/{nonExistentBookId}";

            // Act
            var response = await Helper.Client.DeleteAsync(requestUri);

            // Assert
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task DeleteBook_WithInvalidBookId_ReturnsBadRequest()
        {
            // Arrange
            var invalidBookId = -1;
            var requestUri = $"books/{invalidBookId}";

            // Act
            var response = await Helper.Client.DeleteAsync(requestUri);

            // Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

    }
}