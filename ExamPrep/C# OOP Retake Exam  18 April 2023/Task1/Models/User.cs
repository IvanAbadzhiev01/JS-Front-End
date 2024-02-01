using EDriveRent.Models.Contracts;
using EDriveRent.Utilities.Messages;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDriveRent.Models
{
    public class User : IUser
    {
        private string firstName = null;
        private string lastName = null;
        private string drivingLicense = null;

        public User(string firstName, string lastName, string drivingLicenseNumber)
        {
            FirstName = firstName;
            LastName = lastName;
            DrivingLicenseNumber = drivingLicenseNumber;

            IsBlocked = false;
            Rating = 0;
        }


        public string FirstName
        {
            get
            {
                return firstName;
            }
            private set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new ArgumentException(ExceptionMessages.FirstNameNull);
                }
                firstName = value;
            }
        }
        public string LastName
        {
            get
            {
                return lastName;
            }
            private set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new ArgumentException(ExceptionMessages.LastNameNull);
                }
                lastName = value;
            }
        }

        public double Rating { get; private set; }

        public string DrivingLicenseNumber
        {
            get
            {
                return drivingLicense;
            }
            private set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new ArgumentException(ExceptionMessages.DrivingLicenseRequired);
                }
                drivingLicense = value;
            }
        }

        public bool IsBlocked { get; private set; }

        public void DecreaseRating()
        {
            Rating -= 2;
            if(Rating <= 0)
            {
                Rating = 0;
                IsBlocked = true;
            }
        }

        public void IncreaseRating()
        {
            Rating += 0.5;
            if(Rating >= 10)
            {
                Rating = 10;
            }
        }

        public override string ToString()
        {
            StringBuilder sb = new();

            sb.AppendLine($"{FirstName} {LastName} Driving license: {DrivingLicenseNumber} Rating: {Rating}");

            return sb.ToString().TrimEnd();
        }
    }
}
