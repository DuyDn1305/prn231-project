namespace UnitTest
{
    public static class Helper
    {
        public static HttpClient Client { get; set; } = null!;

        static Helper()
        {
            Client = new HttpClient();
            Client.BaseAddress = new("http://localhost:5295/api/");
        }
    }
}