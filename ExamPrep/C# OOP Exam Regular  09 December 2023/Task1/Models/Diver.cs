using NauticalCatchChallenge.Models.Contracts;
using NauticalCatchChallenge.Utilities.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NauticalCatchChallenge.Models
{
    public abstract class Diver : IDiver
    {
        private string name;
        private double competitionPoints;
        private List<string> catchh;

        public Diver(string name, int oxygenLevel)
        {
            Name = name;
            OxygenLevel = oxygenLevel;

            catchh = new();
            HasHealthIssues = false;
            CompetitionPoints = 0;
        }
        public string Name
        {
            get
            {
                return name;
            }
            private set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new ArgumentException(ExceptionMessages.DiversNameNull);
                }

                name = value;
            }
        }

        public int OxygenLevel { get; protected set; }
        public IReadOnlyCollection<string> Catch { get { return catchh; } }

        public double CompetitionPoints
        {
            get
            {
                return Math.Truncate(competitionPoints * 100) / 100;
            }
            private set
            {
              

                competitionPoints = value;
            }
        } //init value 0

        public bool HasHealthIssues { get; private set; } // inir value false;

        public void Hit(IFish fish)
        {
            OxygenLevel -= fish.TimeToCatch;
            if(OxygenLevel <= 0)
            {
                OxygenLevel = 0;
                UpdateHealthStatus();
            }
            catchh.Add(fish.Name);

            CompetitionPoints += fish.Points;

        }

        public abstract void Miss(int TimeToCatch);

        public abstract void RenewOxy();

        public void UpdateHealthStatus()
        {
            if (HasHealthIssues)
            {
                HasHealthIssues = false;
            }
            else
            {
                HasHealthIssues = true;
            }
        }

        public override string ToString()
        {
            StringBuilder sb = new();
            sb.AppendLine($"Diver [ Name: {Name}, Oxygen left: {OxygenLevel}, Fish caught: {catchh.Count}, Points earned: {CompetitionPoints} ]");
            return sb.ToString().TrimEnd();
        }
    }
}
