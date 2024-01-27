using NauticalCatchChallenge.Core.Contracts;
using NauticalCatchChallenge.Models;
using NauticalCatchChallenge.Models.Contracts;
using NauticalCatchChallenge.Repositories;
using NauticalCatchChallenge.Utilities.Messages;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NauticalCatchChallenge.Core
{
    public class Controller : IController
    {

        private DiverRepository divers;
        private FishRepository fish;
        public Controller()
        {
            divers = new();
            fish = new();
        }
        public string ChaseFish(string diverName, string fishName, bool isLucky)
        {
            if(divers.GetModel(diverName) == null)
            {
                return string.Format(OutputMessages.DiverNotFound, divers.GetType().Name, diverName);
            }

            if (fish.GetModel(fishName) == null)
            {
                return string.Format(OutputMessages.FishNotAllowed, fishName);
            }

            if (divers.GetModel(diverName).HasHealthIssues)
            {
                return string.Format(OutputMessages.DiverHealthCheck, diverName);

            }



            if(divers.GetModel(diverName).OxygenLevel < fish.GetModel(fishName).TimeToCatch)
            {
                divers.GetModel(diverName).Miss(fish.GetModel(fishName).TimeToCatch);
                return string.Format(OutputMessages.DiverMisses, diverName, fishName);

            }

            if(divers.GetModel(diverName).OxygenLevel == fish.GetModel(fishName).TimeToCatch)
            {
                if (isLucky)
                {
                    divers.GetModel(diverName).Hit(fish.GetModel(fishName));
                    return string.Format(OutputMessages.DiverHitsFish, diverName, fish.GetModel(fishName).Points, fishName);
                }
                else
                {

                    divers.GetModel(diverName).Miss(fish.GetModel(fishName).TimeToCatch);
                    return string.Format(OutputMessages.DiverMisses, diverName, fishName);
                }
            }
            
            

            divers.GetModel(diverName).Hit(fish.GetModel(fishName));
            return string.Format(OutputMessages.DiverHitsFish, diverName, fish.GetModel(fishName).Points, fishName);

            



        }

        public string CompetitionStatistics()
        {
            List<IDiver> ordared = divers.Models.OrderByDescending(d => d.CompetitionPoints).ThenByDescending(d => d.Catch.Count).ThenBy(d => d.Name).Where(d => d.HasHealthIssues == false).ToList();
            StringBuilder sb = new();
            sb.AppendLine("**Nautical-Catch-Challenge**");
            foreach (var diver in ordared)
            {
                sb.AppendLine(diver.ToString());
            }
            return sb.ToString().TrimEnd();
        }

        public string DiveIntoCompetition(string diverType, string diverName)
        {


           
            switch (diverType)
            {
                case "FreeDiver":
                    if (divers.GetModel(diverName) != null)
                    {
                        return string.Format(OutputMessages.DiverNameDuplication, diverName, divers.GetType().Name);
                    }

                    IDiver free = new FreeDiver(diverName);
                    divers.AddModel(free);
                    return string.Format(OutputMessages.DiverRegistered, diverName, divers.GetType().Name);

                    
                case "ScubaDiver":
                    if (divers.GetModel(diverName) != null)
                    {
                        return string.Format(OutputMessages.DiverNameDuplication, diverName, divers.GetType().Name);
                    }

                    IDiver scuba = new ScubaDiver(diverName);
                    divers.AddModel(scuba);
                    return string.Format(OutputMessages.DiverRegistered, diverName, divers.GetType().Name);
                default:
                    return string.Format(OutputMessages.DiverTypeNotPresented, diverType);
            }
        }

        public string DiverCatchReport(string diverName)
        {
            StringBuilder sb = new();

            sb.AppendLine(divers.GetModel(diverName).ToString());

            sb.AppendLine("Catch Report:");

            foreach (var fishes in divers.GetModel(diverName).Catch)
            {
                sb.AppendLine(fish.GetModel(fishes).ToString());
            }
            return sb.ToString().TrimEnd();
        }

        public string HealthRecovery()
        {
            List<IDiver> trueDiver = divers.Models.Where(d => d.HasHealthIssues == true).ToList();

            
                foreach (var diver in trueDiver)
                {
                    diver.UpdateHealthStatus();
                    diver.RenewOxy();
                }
            
            return string.Format(OutputMessages.DiversRecovered, trueDiver.Count);
        }

        public string SwimIntoCompetition(string fishType, string fishName, double points)
        {
            switch (fishType)
            {
                case "ReefFish":
                    if (fish.GetModel(fishName) != null)
                    {
                        return string.Format(OutputMessages.FishNameDuplication, fishName, fish.GetType().Name);
                    }
                    IFish reef = new ReefFish(fishName, points);
                    fish.AddModel(reef);
                    return string.Format(OutputMessages.FishCreated, fishName);
                  
                case "DeepSeaFish":
                    if (fish.GetModel(fishName) != null)
                    {
                        return string.Format(OutputMessages.FishNameDuplication, fishName, fish.GetType().Name);
                    }
                    IFish deep = new DeepSeaFish(fishName, points);
                    fish.AddModel(deep);
                    return string.Format(OutputMessages.FishCreated, fishName);

                 
                case "PredatoryFish":
                    if (fish.GetModel(fishName) != null)
                    {
                        return string.Format(OutputMessages.FishNameDuplication, fishName, fish.GetType().Name);
                    }
                    IFish predatory = new PredatoryFish(fishName, points);
                    fish.AddModel(predatory);
                    return string.Format(OutputMessages.FishCreated, fishName);


                default:
                    return string.Format(OutputMessages.FishTypeNotPresented, fishType);
            }
        }
    }
}
