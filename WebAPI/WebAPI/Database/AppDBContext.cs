using Microsoft.EntityFrameworkCore;
using WebAPI.Model;

namespace WebAPI.Database
{
    public class AppDBContext : DbContext
    {

        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }
        public DbSet<Book> Book { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Publisher> Publisher { get; set; }
        public DbSet<Author> Author { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Rating> Rating { get; set; }
        public DbSet<Vote> Vote { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Book>(entity =>
            {
                entity.HasKey(b => b.BookId);

                entity.Property(b => b.Title)
                    .HasMaxLength(100)
                    .IsRequired();

                entity.Property(b => b.Description)
                    .HasMaxLength(int.MaxValue);

                entity.Property(b => b.CoverImage)
                    .HasMaxLength(500);

                entity.Property(b => b.Price)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                entity.HasOne(b => b.Category)
                    .WithMany(c => c.Books)
                    .HasForeignKey(b => b.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(b => b.Author)
                    .WithMany(a => a.Books)
                    .HasForeignKey(b => b.AuthorId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.Property(b => b.PublicationDate)
                    .HasColumnType("date")
                    .IsRequired();

                entity.Property(b => b.TotalPage)
                    .IsRequired();

                entity.HasOne(b => b.Publisher)
                    .WithMany(p => p.Books)
                    .HasForeignKey(b => b.PublisherId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.Property(b => b.CreatedAt)
                    .HasColumnType("datetime");

                entity.Property(b => b.UpdatedAt)
                    .HasColumnType("datetime");

                entity.HasMany(b => b.Votes)
                    .WithOne(v => v.Book)
                    .HasForeignKey(v => v.BookId);

                entity.HasMany(b => b.Ratings)
                    .WithOne(r => r.Book)
                    .HasForeignKey(r => r.BookId);
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasIndex(e => e.CategoryName, "IX_Category_CategoryName")
                    .IsUnique();

                entity.Property(e => e.CategoryName)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Author>(entity =>
            {
                entity.Property(e => e.AuthorDescription).HasMaxLength(500);

                entity.Property(e => e.AuthorName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.AuthorUrl).HasMaxLength(2000);

                entity.Property(e => e.Nation).HasMaxLength(100);
            });

            modelBuilder.Entity<Publisher>(entity =>
            {
                entity.Property(e => e.PublisherName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.PublisherUrl).HasMaxLength(2000);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.UserId);


                entity.Property(u => u.UserName)
                    .HasMaxLength(255)
                    .IsRequired();

                entity.Property(u => u.Password)
                      .HasMaxLength(255)
                      .IsRequired();

                entity.Property(u => u.Email)
                    .HasMaxLength(255);

                entity.Property(u => u.Phone)
                    .HasMaxLength(20);

                // Set relationships

                entity.HasMany(u => u.Ratings)
                    .WithOne(r => r.User)
                    .HasForeignKey(r => r.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(u => u.Votes)
                    .WithOne(v => v.User)
                    .HasForeignKey(v => v.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Vote>(entity =>
            {
                entity.HasKey(v => v.VoteId);

                entity.HasOne(v => v.User)
                    .WithMany(u => u.Votes)
                    .HasForeignKey(v => v.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(v => v.Book)
                    .WithMany(b => b.Votes)
                    .HasForeignKey(v => v.BookId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Rating>(entity =>
            {
                entity.HasKey(e => e.RateId);

                entity.HasOne(e => e.Book)
                    .WithMany(b => b.Ratings)
                    .HasForeignKey(e => e.BookId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.User)
                    .WithMany(u => u.Ratings)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.Property(e => e.RatingStar)
                    .IsRequired();

                entity.Property(e => e.RatingComment)
                    .HasMaxLength(3000)
                    .IsRequired();
            });
        }

    }
}
