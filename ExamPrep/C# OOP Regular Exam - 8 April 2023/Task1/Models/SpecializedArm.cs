using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RobotService.Models
{
    public class SpecializedArm : Supplement
    {
        //n InterfaceStandard of 10045 and a BatteryUsage of 10 000

        private const int specializedArmInterfaceStandard = 10045;
        private const int specializedArmBatteryUsage = 10000;

        public SpecializedArm() : base(specializedArmInterfaceStandard, specializedArmBatteryUsage)
        {
        }
    }
}
