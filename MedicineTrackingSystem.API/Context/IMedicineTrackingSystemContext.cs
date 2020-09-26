using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicineTrackingSystem.API
{
    public interface IMedicineTrackingSystemContext : IDisposable
    {
        DbSet<Medicine> Medicines { get; set; }

    }
}
