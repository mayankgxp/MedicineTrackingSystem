using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;

namespace MedicineTrackingSystem.API
{
    public abstract class BaseDataService : IDisposable
    {
        protected IMedicineTrackingSystemContext Context { get; }
        protected string _connectionString { get; }

        private bool _disposed;

        protected BaseDataService(string connectionString)
        {
            _connectionString = connectionString;
            try
            {
                Context = new MedicineTrackingSystemContext(_connectionString);
            }
            catch (AuthenticationException ex)
            {
                if (ex.InnerException is Win32Exception)
                {
                    Context = new MedicineTrackingSystemContext(_connectionString);
                }
                else
                {
                    throw;
                }
            }
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            if (_disposed) return;
            if (!disposing) return;
            try
            {
                Context?.Dispose();
            }
            catch (Exception)
            {
            }
            _disposed = true;
        }

    }
}
