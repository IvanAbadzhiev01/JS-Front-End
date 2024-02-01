using NUnit.Framework;

namespace VehicleGarage.Tests
{
    public class Tests
    {


        [Test]
        public void TestCtor()
        {
            Garage garage = new Garage(5);

            Assert.That(garage.Capacity, Is.EqualTo(5));
            Assert.That(garage.Vehicles.Count, Is.EqualTo(0));
        }
        [Test]
        public void TestChangeCapacity()
        {
            Garage garage = new Garage(5);

            Assert.That(garage.Capacity, Is.EqualTo(5));
            Assert.That(garage.Vehicles.Count, Is.EqualTo(0));

            garage.Capacity = 2;
            Assert.That(garage.Capacity, Is.EqualTo(2));
        }

        [Test]
        public void AddVehicleTrue()
        {
            Garage garage = new Garage(5);

            Vehicle vehicle = new Vehicle("Lada", "5", "ST2221P");

            garage.AddVehicle(vehicle);

            Assert.That(garage.Vehicles.Count, Is.EqualTo(1));
            Assert.That(garage.Vehicles[0].Brand, Is.EqualTo("Lada"));
            Assert.That(garage.Vehicles[0].Model, Is.EqualTo("5"));
            Assert.That(garage.Vehicles[0].LicensePlateNumber, Is.EqualTo("ST2221P"));

        }

        [Test]
        public void AddVehicleFalsNotCapatity()
        {
            Garage garage = new Garage(2);

            Vehicle vehicle = new Vehicle("Lada", "5", "ST2221P");
            Vehicle vehicle2 = new Vehicle("Lada", "niva", "X1122T");

            garage.AddVehicle(vehicle);
            garage.AddVehicle(vehicle2);


            Vehicle testVeacle = new Vehicle("test", "test", "test");
            Assert.That(garage.AddVehicle(testVeacle), Is.False);


        }



        [Test]
        public void AddVehicleFalsNotSameNumber()
        {
            Garage garage = new Garage(2);

            Vehicle vehicle = new Vehicle("Lada", "5", "ST2221P");
            Vehicle vehicle2 = new Vehicle("Lada", "niva", "X1122T");

            garage.AddVehicle(vehicle);
            garage.AddVehicle(vehicle2);


            Vehicle testVeacle = new Vehicle("test", "test", "X1122T");
            Assert.That(garage.AddVehicle(testVeacle), Is.False);


        }


        [Test]
        public void TestChargeVehicles()
        {
            Garage garage = new Garage(5);


            Vehicle vehicle1 = new Vehicle("1", "1", "1");
            Vehicle vehicle2 = new Vehicle("2", "2", "2");
            Vehicle vehicle3 = new Vehicle("3", "3", "3");
            Vehicle vehicle4 = new Vehicle("4", "4", "4");
            Vehicle vehicle5 = new Vehicle("5", "5", "5");


            garage.AddVehicle(vehicle1);
            garage.AddVehicle(vehicle2);
            garage.AddVehicle(vehicle3);
            garage.AddVehicle(vehicle4);
            garage.AddVehicle(vehicle5);


            Assert.That(garage.Vehicles[1].BatteryLevel, Is.EqualTo(100));
            Assert.That(garage.Vehicles[3].BatteryLevel, Is.EqualTo(100));
            Assert.That(garage.Vehicles[4].BatteryLevel, Is.EqualTo(100));

            garage.DriveVehicle("2", 51, false);
            garage.DriveVehicle("4", 51, false);
            garage.DriveVehicle("5", 70, false);


            Assert.That(garage.Vehicles[1].BatteryLevel, Is.EqualTo(49));
            Assert.That(garage.Vehicles[3].BatteryLevel, Is.EqualTo(49));
            Assert.That(garage.Vehicles[4].BatteryLevel, Is.EqualTo(30));

            Assert.That(garage.ChargeVehicles(50), Is.EqualTo(3));

            Assert.That(garage.Vehicles[1].BatteryLevel, Is.EqualTo(100));
            Assert.That(garage.Vehicles[3].BatteryLevel, Is.EqualTo(100));
            Assert.That(garage.Vehicles[4].BatteryLevel, Is.EqualTo(100));

            Assert.That(garage.ChargeVehicles(50), Is.EqualTo(0));
        }

        [Test]
        public void TestDriveVehicle()
        {
            Garage garage = new Garage(5);


            Vehicle vehicle1 = new Vehicle("1", "1", "1");
            Vehicle vehicle2 = new Vehicle("2", "2", "2");
            Vehicle vehicle3 = new Vehicle("3", "3", "3");
            Vehicle vehicle4 = new Vehicle("4", "4", "4");
            Vehicle vehicle5 = new Vehicle("5", "5", "5");


            garage.AddVehicle(vehicle1);
            garage.AddVehicle(vehicle2);
            garage.AddVehicle(vehicle3);
            garage.AddVehicle(vehicle4);
            garage.AddVehicle(vehicle5);


            vehicle2.IsDamaged = true;
            garage.DriveVehicle("2", 51, false);
            Assert.That(garage.Vehicles[1].BatteryLevel, Is.EqualTo(100));
            Assert.That(garage.Vehicles[1].IsDamaged, Is.True);



            garage.DriveVehicle("4", 200, false);
            Assert.That(garage.Vehicles[3].BatteryLevel, Is.EqualTo(100));


            garage.DriveVehicle("5", 70, false);
            garage.DriveVehicle("5", 50, false);
            Assert.That(garage.Vehicles[4].BatteryLevel, Is.EqualTo(30));


            garage.DriveVehicle("1", 30, false);
            Assert.That(garage.Vehicles[0].BatteryLevel, Is.EqualTo(70));

            garage.DriveVehicle("3", 10, true);

            Assert.That(garage.Vehicles[2].IsDamaged, Is.True);








        }
        [Test]
        public void TestRepair()
        {
            Garage garage = new Garage(5);


            Vehicle vehicle1 = new Vehicle("1", "1", "1");
            Vehicle vehicle2 = new Vehicle("2", "2", "2");
            Vehicle vehicle3 = new Vehicle("3", "3", "3");
            Vehicle vehicle4 = new Vehicle("4", "4", "4");
            Vehicle vehicle5 = new Vehicle("5", "5", "5");


            garage.AddVehicle(vehicle1);
            garage.AddVehicle(vehicle2);
            garage.AddVehicle(vehicle3);
            garage.AddVehicle(vehicle4);
            garage.AddVehicle(vehicle5);

            string result = $"Vehicles repaired: 3";
            string resul2 = $"Vehicles repaired: 0";

            garage.Vehicles[1].IsDamaged = true;
            garage.Vehicles[2].IsDamaged = true;
            garage.Vehicles[3].IsDamaged = true;

            Assert.That(garage.Vehicles[1].IsDamaged, Is.True);
            Assert.That(garage.Vehicles[2].IsDamaged, Is.True);
            Assert.That(garage.Vehicles[3].IsDamaged, Is.True);


            Assert.That(garage.RepairVehicles(), Is.EqualTo(result));

            Assert.That(garage.Vehicles[1].IsDamaged, Is.False);
            Assert.That(garage.Vehicles[2].IsDamaged, Is.False);
            Assert.That(garage.Vehicles[3].IsDamaged, Is.False);

            Assert.That(garage.RepairVehicles(), Is.EqualTo(resul2));



        }

        [Test]
        public void Add()
        {
            Garage garage = new Garage(5);


            Vehicle vehicle1 = new Vehicle("1", "1", "1");
            Vehicle vehicle2 = new Vehicle("2", "2", "2");
            Vehicle vehicle3 = new Vehicle("3", "3", "3");

            garage.Vehicles.Add(vehicle1);
            garage.Vehicles.Add(vehicle2);

            Assert.That(garage.Vehicles.Count, Is.EqualTo(2));

            Assert.That(garage.Vehicles, Does.Contain(vehicle1));
        
        }
        [Test]
        public void Test_19()
        {

            Garage garage2 = new Garage(-3);
            Vehicle vehicle = new Vehicle("Audi", "A6", "V2211T");

            bool result = garage2.AddVehicle(vehicle);
            Assert.That(true, Is.EqualTo(result));
            Assert.That(garage2.Capacity, Is.EqualTo(-3));
            Assert.That(garage2.Vehicles.Count, Is.EqualTo(1));


        }

    }
}