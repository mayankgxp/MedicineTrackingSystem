using MedicineTrackingSystem.API;
using MedicineTrackingSystem.API.BusinessService;
using MedicineTrackingSystem.API.Models;
using Moq;
using NUnit;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicineTrackingSystem.Api.UnitTest
{
    [TestFixture]
    public class UnitTest1
    {
        /// <summary>
        /// Constructor
        /// </summary>
        public UnitTest1()
        {
            // create some mock medicines to play with
            List<MedicineDto> medicines = new List<MedicineDto>
                {
                    new MedicineDto { MedicineId = 1, Name = "Paracetamol" },
                    new MedicineDto { MedicineId = 2, Name = "Brufen" },
                    new MedicineDto { MedicineId = 3, Name = "Disprin" }
                };

            // Mock the Medicines Repository using Moq
            Mock<IMedicineBusinessService> mockMedicineRepository = new Mock<IMedicineBusinessService>();

            // Return all the medicines
            mockMedicineRepository.Setup(mr => mr.GetAllMedicines().Result).Returns(medicines);

            // return a medicine by Id
            mockMedicineRepository.Setup(mr => mr.GetMedicineById(
                It.IsAny<int>()).Result).Returns((int i) => medicines.Where(
                x => x.MedicineId == i).Single());



            // Allows us to test saving a medicine
            mockMedicineRepository.Setup(mr => mr.AddMedicine(It.IsAny<Medicine>()).Result).Returns(
                (Medicine target) =>
                {
                    DateTime now = DateTime.Now;

                    if (target.MedicineId.Equals(default(int)))
                    {
                        target.MedicineId = medicines.Count() + 1;
                        medicines.Add(new MedicineDto() { MedicineId = target.MedicineId, Name = target.Name, BrandId = target.BrandId, Price = target.Price, ExpireDate = target.ExpireDate });
                    }
                    return target;
                });

            // Complete the setup of our Mock Medicine Repository
            this.MockMedicinesRepository = mockMedicineRepository.Object;
        }


        /// <summary>
        /// Our Mock Medicines Repository for use in testing
        /// </summary>
        public readonly IMedicineBusinessService MockMedicinesRepository;

        /// <summary>
        /// Can we return a medicine By Id?
        /// </summary>
        [TestCase]
        public async Task CanReturnMedicineById()
        {
            // Try finding a Medicine by id
            MedicineDto testMedicine = await this.MockMedicinesRepository.GetMedicineById(2);

            Assert.IsNotNull(testMedicine); // Test if null
            Assert.AreEqual("Brufen", testMedicine.Name); // Verify it is the right Medicine
        }

        /// <summary>
        /// Can we return all Medicines?
        /// </summary>
        [TestCase]
        public async Task CanReturnAllMedicines()
        {
            // Try finding all Medicines
            IList<MedicineDto> testMedicines = await this.MockMedicinesRepository.GetAllMedicines();

            Assert.IsNotNull(testMedicines); // Test if null
            Assert.AreEqual(3, testMedicines.Count); // Verify the correct Number
        }

        /// <summary>
        /// Can we insert a new Medicine?
        /// </summary>
        [TestCase]
        public async Task CanInsertMedicine()
        {
            Medicine newMedicine = new Medicine
            { Name = "Ciplin DS", BrandId = 1, Price = 39.99f, ExpireDate = new DateTime().Date };

            var medicines = await this.MockMedicinesRepository.GetAllMedicines();
            Assert.AreEqual(3, medicines.Count);

            // try saving our new Medicine
            await this.MockMedicinesRepository.AddMedicine(newMedicine);

            // demand a recount
            var medicinePostCount = await this.MockMedicinesRepository.GetAllMedicines();
            Assert.AreEqual(4, medicinePostCount);

            // verify that our new Medicine has been saved
            MedicineDto testMedicine = await this.MockMedicinesRepository.GetMedicineById(4);
            Assert.IsNotNull(testMedicine); // Test if null
            Assert.AreEqual(4, testMedicine.MedicineId); // Verify it has the expected MedicineId
        }
    }
}