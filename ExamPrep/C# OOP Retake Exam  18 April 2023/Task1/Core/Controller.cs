using EDriveRent.Core.Contracts;
using EDriveRent.Models;
using EDriveRent.Models.Contracts;
using EDriveRent.Repositories;
using EDriveRent.Utilities.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDriveRent.Core
{
    public class Controller : IController
      {
        private UserRepository users;
        private VehicleRepository vehicles;
        private RouteRepository routes;
        public Controller()
        {
            users = new UserRepository();
            vehicles = new VehicleRepository();
            routes = new RouteRepository(); 
        }
        public string AllowRoute(string startPoint, string endPoint, double length)
        {
           IRoute rout = routes.GetAll().FirstOrDefault(r => r.StartPoint == startPoint && r.EndPoint == endPoint && r.Length == length);

            if(rout != null)
            {
                return String.Format(OutputMessages.RouteExisting, startPoint, endPoint, length);
            }

            IRoute rout2 = routes.GetAll().FirstOrDefault(r => r.StartPoint == startPoint && r.EndPoint == endPoint && r.Length < length);

            if(rout2 != null)
            {
                return String.Format(OutputMessages.RouteIsTooLong, startPoint, endPoint);
            }

            IRoute route = new Route(startPoint, endPoint, length, routes.GetAll().Count + 1);
            routes.AddModel(route);

            IRoute rout3 = routes.GetAll().FirstOrDefault(r => r.StartPoint == startPoint && r.EndPoint == endPoint && r.Length > length);
            if(rout3 != null)
            {
                rout3.LockRoute();
            }

            return String.Format(OutputMessages.NewRouteAdded, startPoint, endPoint, length);
        }

        public string MakeTrip(string drivingLicenseNumber, string licensePlateNumber, string routeId, bool isAccidentHappened)
        {
            if (users.FindById(drivingLicenseNumber).IsBlocked)
            {
                 return String.Format(OutputMessages.UserBlocked, drivingLicenseNumber);
            }
            if (vehicles.FindById(licensePlateNumber).IsDamaged)
            {
                return String.Format(OutputMessages.VehicleDamaged, licensePlateNumber);
            }
            if (routes.FindById(routeId).IsLocked)
            {
                return String.Format(OutputMessages.RouteLocked, routeId);
            }

            vehicles.FindById(licensePlateNumber).Drive(routes.FindById(routeId).Length);

            if (isAccidentHappened)
            {
                vehicles.FindById(licensePlateNumber).ChangeStatus();
                users.FindById(drivingLicenseNumber).DecreaseRating();
            }
            else
            {

            users.FindById(drivingLicenseNumber).IncreaseRating();
            }

            return vehicles.FindById(licensePlateNumber).ToString();
        }

        public string RegisterUser(string firstName, string lastName, string drivingLicenseNumber)
        {
          if(users.FindById(drivingLicenseNumber) != null)
            {
                return String.Format(OutputMessages.UserWithSameLicenseAlreadyAdded, drivingLicenseNumber);
            }

            IUser user = new User(firstName, lastName, drivingLicenseNumber);
            users.AddModel(user);

            return String.Format(OutputMessages.UserSuccessfullyAdded, firstName, lastName, drivingLicenseNumber);
        }

        public string RepairVehicles(int count)
        {
            List<IVehicle> damageVeacle = new();

            foreach (var vehicle in vehicles.GetAll())
            {
                if (vehicle.IsDamaged)
                {
                    damageVeacle.Add(vehicle);
                }
            }

            List<IVehicle> ordar = damageVeacle.OrderBy(v => v.Brand).ThenBy(v => v.Model).Take(count).ToList();

            foreach (var vehicle1 in ordar)
            {
                vehicle1.ChangeStatus();
            }

            return String.Format(OutputMessages.RepairedVehicles, ordar.Count);
        }

        public string UploadVehicle(string vehicleType, string brand, string model, string licensePlateNumber)
        {
            switch (vehicleType)
            {
                case "PassengerCar":
                    if(vehicles.FindById(licensePlateNumber) != null)
                    {
                        return String.Format(OutputMessages.LicensePlateExists, licensePlateNumber);
                    }

                    IVehicle vehicle = new PassengerCar(brand, model, licensePlateNumber);
                    vehicles.AddModel(vehicle);
                    return String.Format(OutputMessages.VehicleAddedSuccessfully, brand, model, licensePlateNumber);

                    
                case "CargoVan":
                    if (vehicles.FindById(licensePlateNumber) != null)
                    {
                        return String.Format(OutputMessages.LicensePlateExists, licensePlateNumber);
                    }

                    IVehicle vehicle1 = new CargoVan(brand, model, licensePlateNumber);
                    vehicles.AddModel(vehicle1);
                    return String.Format(OutputMessages.VehicleAddedSuccessfully, brand, model, licensePlateNumber);

                default:
                    return String.Format(OutputMessages.VehicleTypeNotAccessible, vehicleType);
            }
        }

        public string UsersReport()
        {
            List<IUser> order = users.GetAll().OrderByDescending(u => u.Rating).ThenBy(u => u.LastName).ThenBy(u => u.FirstName).ToList();

            StringBuilder sb = new();

            sb.AppendLine("*** E-Drive-Rent ***");

            foreach (var user in order)
            {
                sb.AppendLine(user.ToString());
            }

            return sb.ToString().TrimEnd();
        }
    }
}
