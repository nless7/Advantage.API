using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Advantage.API.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Advantage.API
{
    public class Startup
    {
        private string connectionString = null;
        private const int NumberOfCustomers = 20;
        private const int NumberOfOrders = 1000;

        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        //This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Add Cors.
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy",
                    b => b.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials());
            }
            );

            //Access secret connectionstring.
            connectionString = Configuration["secretConnectionString"];

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            //Register service that allows you to work with entityframework and setup database connection.
            services.AddDbContext<ApiDbContext>(
                options => options.UseSqlServer(connectionString)
            );

            //Add transcient service for seeding database.
            services.AddTransient<DataSeed>();
        }

        //This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, DataSeed seed)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                #region Check connection string

                //Check if there's a connection string.
                //var result = string.IsNullOrEmpty(connectionString) ? "Null" : "Not Null";

                //app.Run(async (context) =>
                //{
                //    await context.Response.WriteAsync($"Secret is {result}");
                //});

                #endregion

                //Add Cors policy.
                app.UseCors("CorsPolicy");
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors("CorsPolicy");

            //Seed the database.
            seed.SeedData(NumberOfCustomers, NumberOfOrders);

            //app.UseHttpsRedirection();

            app.UseMvc(routes => routes.MapRoute(
                "default", "api/{controller}/{action}/{id?}"
            ));

        }
    }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    