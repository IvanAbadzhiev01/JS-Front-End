using RobotService.Core.Contracts;
using RobotService.Models;
using RobotService.Models.Contracts;
using RobotService.Repositories;
using RobotService.Repositories.Contracts;
using RobotService.Utilities.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace RobotService.Core
{
    public class Controller : IController
    {
        SupplementRepository supplements;
        RobotRepository robots;

        public Controller()
        {
            supplements = new SupplementRepository();
            robots = new RobotRepository();
        }


        public string CreateRobot(string model, string typeName)
        {
            switch (typeName)
            {
                case "DomesticAssistant":
                    IRobot domesticRobot = new DomesticAssistant(model);
                    robots.AddNew(domesticRobot);
                    return string.Format(OutputMessages.RobotCreatedSuccessfully, typeName, model);


                case "IndustrialAssistant":
                    IRobot insdustrialRobot = new IndustrialAssistant(model);
                    robots.AddNew(insdustrialRobot);
                    return string.Format(OutputMessages.RobotCreatedSuccessfully, typeName, model);
                default:

                    return string.Format(OutputMessages.RobotCannotBeCreated, typeName);

            }
        }

        public string CreateSupplement(string typeName)
        {
            switch (typeName)
            {
                case "SpecializedArm":
                    ISupplement specialized = new SpecializedArm();
                    supplements.AddNew(specialized);
                    return string.Format(OutputMessages.SupplementCreatedSuccessfully, typeName);


                case "LaserRadar":
                    ISupplement laserRadar = new LaserRadar();
                    supplements.AddNew(laserRadar);
                    return string.Format(OutputMessages.SupplementCreatedSuccessfully, typeName);
                default:

                    return string.Format(OutputMessages.SupplementCannotBeCreated, typeName);

            }
        }

        public string PerformService(string serviceName, int intefaceStandard, int totalPowerNeeded)
        {
            List<IRobot> robotSuportInterface = new();
            foreach (var robot in robots.Models())
            {
                if (robot.InterfaceStandards.Contains(intefaceStandard))
                {
                    robotSuportInterface.Add(robot);
                }
            }

            if(robotSuportInterface.Count == 0)
            {
                return String.Format(OutputMessages.UnableToPerform, intefaceStandard);

            }

           List<IRobot> ordaredRobot = robotSuportInterface.OrderByDescending(r => r.BatteryLevel).ToList();


            int batterylevelSum = robotSuportInterface.Sum(r => r.BatteryLevel);

            if(batterylevelSum < totalPowerNeeded)
            {
                return String.Format(OutputMessages.MorePowerNeeded, serviceName, (totalPowerNeeded-batterylevelSum) );

            }


            int counterRobotWork = 0;

            while(totalPowerNeeded > 0)
            {
                foreach (var robot in ordaredRobot)
                {
                    if(robot.BatteryLevel >= totalPowerNeeded)
                    {
                        robot.ExecuteService(totalPowerNeeded);
                        totalPowerNeeded -= totalPowerNeeded;
                        counterRobotWork++;
                        break;
                    }
                    else
                    {
                        totalPowerNeeded -= robot.BatteryLevel;
                        robot.ExecuteService(robot.BatteryLevel);
                        counterRobotWork++;
                        if(totalPowerNeeded <= 0)
                        {
                            break;
                        }
                    }
                }
            }


            return String.Format(OutputMessages.PerformedSuccessfully, serviceName, counterRobotWork);

        }

        public string Report()
        {
            StringBuilder sb = new();

            List<IRobot> ordarRobot = robots.Models().OrderByDescending(r => r.BatteryLevel).ThenBy(r => r.BatteryCapacity).ToList(); 



            foreach (var robot in ordarRobot)
            {
                sb.AppendLine(robot.ToString());
            }

            return sb.ToString().TrimEnd();
        }

        public string RobotRecovery(string model, int minutes)
        {
            List<IRobot> thisModelRobots = new();

            foreach (var robot in robots.Models())
            {
                if(robot.Model == model)
                {
                    thisModelRobots.Add(robot);
                }
            }

            int feedRobot = 0;

            foreach (var robot1 in thisModelRobots)
            {
                if(robot1.BatteryLevel < (robot1.BatteryCapacity / 2))
                {

                    robot1.Eating(minutes);
                    feedRobot++;
                }
            }

            return String.Format(OutputMessages.RobotsFed, feedRobot);
        }

        public string UpgradeRobot(string model, string supplementTypeName)
        {
            int interfaceValue = supplements.Models().FirstOrDefault(s => s.GetType().Name == supplementTypeName).InterfaceStandard;
            List<IRobot> robotNotSuportInterface = new();
            foreach (var robot in robots.Models()) 
            {
                if(!robot.InterfaceStandards.Contains(interfaceValue))
                {
                    robotNotSuportInterface.Add(robot);
                }
            }

            List<IRobot> robotCorectModel = new();

            foreach (var robot1 in robotNotSuportInterface)
            {
                if(robot1.Model == model)
                {
                    robotCorectModel.Add(robot1);
                }
            }

            if(robotCorectModel.Count == 0)
            {
                return String.Format(OutputMessages.AllModelsUpgraded, model);
            }

            robotCorectModel[0].InstallSupplement(supplements.Models().FirstOrDefault(s => s.GetType().Name == supplementTypeName));

            supplements.RemoveByName(supplementTypeName);

            return String.Format(OutputMessages.UpgradeSuccessful, model, supplementTypeName);
        }
    }
}

