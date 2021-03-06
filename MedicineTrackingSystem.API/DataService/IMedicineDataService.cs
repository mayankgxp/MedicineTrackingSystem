﻿using MedicineTrackingSystem.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicineTrackingSystem.API.DataService
{
    public interface IMedicineDataService
    {
        Task<List<MedicineDto>> GetAllMedicines();
        Task<MedicineDto> GetMedicineById(int id);
        Task<Medicine> AddMedicine(Medicine medicine);
    }
}
