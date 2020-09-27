using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicineTrackingSystem.API.Models
{
    public class MedicineDto
    {
        public int MedicineId { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string Notes { get; set; }
        public BrandDto Brand { get; set; }
        public int BrandId { get; set; }
        public int Quantity { get; set; }
        public DateTime ExpireDate { get; set; }
    }
    public class BrandDto
    {
        public int BrandId { get; set; }
        public string BrandName { get; set; }
    }
}
