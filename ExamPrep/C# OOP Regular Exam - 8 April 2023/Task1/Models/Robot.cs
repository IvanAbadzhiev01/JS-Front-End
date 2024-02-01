using RobotService.Models.Contracts;
using RobotService.Utilities.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RobotService.Models
{
    public abstract class Robot : IRobot
    {

        private string model = null;
        private int batteryCapacity = 0;
        private List<int> interfaceStandards;

        public Robot(string model, int batteryCapacity, int conversionCapacityIndex)
        {
            Model = model;
            BatteryCapacity = batteryCapacity;
            ConvertionCapacityIndex = conversionCapacityIndex;
            BatteryLevel = batteryCapacity;

                interfaceStandards = new List<int>();
        }



        public string Model
        {
            get
            {
                return model;
            }
            private set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new ArgumentException(ExceptionMessages.ModelNullOrWhitespace);
                }
                model = value;
            }
        }
        public int BatteryCapacity
        {
            get
            {
                return batteryCapacity;
            }
            private set
            {
                if (value < 0)
                {
                    throw new ArgumentException(ExceptionMessages.BatteryCapacityBelowZero);
                }
                batteryCapacity = value;
            }
        }

        public int BatteryLevel { get; private set; }

        public int ConvertionCapacityIndex { get; private set; }

        public IReadOnlyCollection<int> InterfaceStandards
        {
            get
            {
                return interfaceStandards;
            }
           
        }
        public void Eating(int minutes)
        {
            int energy = minutes * ConvertionCapacityIndex;

            BatteryLevel += energy;

            if (BatteryLevel >= BatteryCapacity)
            {
                BatteryLevel = BatteryCapacity;
                return;
            }   
        }

        public bool ExecuteService(int consumedEnergy)
        {
            if(BatteryLevel < consumedEnergy)
            {
                return false;
            }


            BatteryLevel -= consumedEnergy;
            return true;
        }

        public void InstallSupplement(ISupplement supplement)
        {
            interfaceStandards.Add(supplement.InterfaceStandard);
            BatteryCapacity -= supplement.BatteryUsage;
            BatteryLevel -= supplement.BatteryUsage;

        }

        public override string ToString()
        {
            StringBuilder sb = new();

            sb.AppendLine($"{this.GetType().Name} {Model}:");
            sb.AppendLine($"--Maximum battery capacity: {BatteryCapacity}");
            sb.AppendLine($"--Current battery level: {BatteryLevel}");

            if(interfaceStandards.Count > 0)
            {
                sb.Append($"--Supplements installed: {string.Join(" ", interfaceStandards)}");
            }
            else
            {
                sb.AppendLine("--Supplements installed: none");
            }


            return sb.ToString().TrimEnd();
        }
    }
}
