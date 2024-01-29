using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NauticalCatchChallenge.Models
{
    public class ScubaDiver : Diver
    {
        private const int scubaDiverOxygenLevel = 540;
        public ScubaDiver(string name) : base(name, scubaDiverOxygenLevel)
        {
        }

        public override void Miss(int TimeToCatch)
        {
            double time = (double)TimeToCatch / 100 * 30;
            this.OxygenLevel -= (int)Math.Round(time, MidpointRounding.AwayFromZero);
            if (this.OxygenLevel <= 0)
            {
                OxygenLevel = 0;
                UpdateHealthStatus();
            }

        }

        public override void RenewOxy()
        {
            this.OxygenLevel = scubaDiverOxygenLevel;
        }
    }
}
