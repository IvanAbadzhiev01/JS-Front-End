using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NauticalCatchChallenge.Models
{
    public class FreeDiver : Diver
    {

        private const int freeDiverOxygenLevel = 120;
        public FreeDiver(string name) : base(name, freeDiverOxygenLevel)
        {
        }

        public override void Miss(int TimeToCatch)
        {
            double time = (double)TimeToCatch / 100 * 60;
            this.OxygenLevel -= (int)Math.Round(time, MidpointRounding.AwayFromZero);
            if (this.OxygenLevel <= 0)
            {
                OxygenLevel = 0;
                UpdateHealthStatus();
            }

        }

        public override void RenewOxy()
        {
            this.OxygenLevel = freeDiverOxygenLevel;
        }
    }
}
