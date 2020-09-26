using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicineTrackingSystem.API.BusinessService;
using MedicineTrackingSystem.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace MedicineTrackingSystem.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MedicineController : ControllerBase
    {
        private IMedicineBusinessService _medicineBusinessService;

        public MedicineController(MedicineBusinessService medicineBusinessService)
        {
            _medicineBusinessService = medicineBusinessService;
        }

        [HttpGet]
        [Route("GetAllMedicines")]
        public async Task<IEnumerable<MedicineDto>> GetAll()

        {
            return await _medicineBusinessService.GetAllMedicines();
        }

        [HttpGet]
        [Route("GetMedicineById/{id}")]
        public async Task<MedicineDto> GetById(int id)
        {
            return await _medicineBusinessService.GetMedicineById(id);
        }

        [HttpPost]
        [Route("AddMedicine")]
        public async Task<Medicine> Add(Medicine medicine)
        {
            return await _medicineBusinessService.AddMedicine(medicine);
        }
    }
}
