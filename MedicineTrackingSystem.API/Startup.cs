using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using MedicineTrackingSystem.API.BusinessService;
using MedicineTrackingSystem.API.DataService;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;

namespace MedicineTrackingSystem.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddCors();
            services.AddSingleton(Configuration);
            var connectionString = "Data Source=./;initial catalog=MedicineDB;user id=root;password=password;Convert Zero Datetime=True;connectiontimeout=120;";
            services.AddTransient<IDbConnection>((sp) => new MySqlConnection(connectionString));
            services.AddDbContext<MedicineTrackingSystemContext>(options => options.UseMySQL(connectionString));
            services.AddTransient<IMedicineTrackingSystemContext, MedicineTrackingSystemContext>();
            services.AddTransient<IMedicineBusinessService, MedicineBusinessService>();
            services.AddTransient<IMedicineDataService, MedicineDataService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, Microsoft.AspNetCore.Hosting.IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors();
        }
    }
}
