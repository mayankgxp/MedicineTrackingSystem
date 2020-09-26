using MedicineTrackingSystem.API.DataService;
using MedicineTrackingSystem.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicineTrackingSystem.API.BusinessService
{
    public class MedicineBusinessService : IMedicineBusinessService
    {
        private IMedicineDataService _medicineDataService;
        public MedicineBusinessService(MedicineDataService medicineDataService)
        {
            _medicineDataService = medicineDataService;
        }

        public async Task<Medicine> AddMedicine(Medicine medicine)
        {
            return await _medicineDataService.AddMedicine(medicine);
        }

        public async Task<List<MedicineDto>> GetAllMedicines()
        {
            return await _medicineDataService.GetAllMedicines();
        }

        public async Task<MedicineDto> GetMedicineById(int id)
        {
            return await _medicineDataService.GetMedicineById(id);
        }
    }
}
