using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicineTrackingSystem.API
{
    public class Medicine
    {
        [Key]
        public int MedicineId { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string Notes { get; set; }
        [ForeignKey("Brand")]
        public int BrandId { get; set; }
        public System.DateTime ExpireDate { get; set; }
        public virtual Brand Brand { get; set; }
    }

    public class Brand
    {
        [Key]
        public int BrandId { get; set; }
        public string BrandName { get; set; }
    }
}