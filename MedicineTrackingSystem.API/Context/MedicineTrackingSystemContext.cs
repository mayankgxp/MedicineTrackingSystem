using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicineTrackingSystem.API
{
    public class MedicineTrackingSystemContext : DbContext, IMedicineTrackingSystemContext
    {
        private readonly string _connectionString;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(_connectionString);
        }

        public MedicineTrackingSystemContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        public DbSet<Medicine> Medicines { get; set; }
    }
}