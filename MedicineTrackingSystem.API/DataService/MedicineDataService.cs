using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using MedicineTrackingSystem.API.Models;

namespace MedicineTrackingSystem.API.DataService
{
    public class MedicineDataService : BaseDataService, IMedicineDataService
    {
        public MedicineDataService(string connectionString) : base(connectionString)
        {
        }

        public async Task<Medicine> AddMedicine(Medicine medicine)
        {
            await Context.Medicines.AddAsync(new Medicine()
            {
                MedicineId = medicine.MedicineId,
                BrandId = medicine.BrandId,
                Name = medicine.Name,
                Notes = medicine.Notes,
                Price = medicine.Price,
                Quantity = medicine.Quantity
            });

            await (Context as DbContext).SaveChangesAsync();
            return medicine;
        }

        public async Task<List<MedicineDto>> GetAllMedicines()
        {
            var allMedicines = await Context.Medicines.Include("Brand").ToListAsync();

            return allMedicines?.Select((f) => new MedicineDto()
            {
                Brand = new BrandDto() { BrandId = f.BrandId, BrandName = f.Brand.BrandName },
                Name = f.Name,
                MedicineId = f.MedicineId,
                Notes = f.Notes,
                Price = f.Price
            }).ToList() ?? new List<MedicineDto>();
        }

        public async Task<MedicineDto> GetMedicineById(int id)
        {
            var dbObj = await Context.Medicines.FirstOrDefaultAsync(f => f.MedicineId == id);
            return new MedicineDto()
            {
                Brand = new BrandDto() { BrandId = dbObj.BrandId, BrandName = dbObj.Brand.BrandName },
                Name = dbObj.Name,
                MedicineId = dbObj.MedicineId,
                Notes = dbObj.Notes,
                Price = dbObj.Price
            };
        }
    }
}
