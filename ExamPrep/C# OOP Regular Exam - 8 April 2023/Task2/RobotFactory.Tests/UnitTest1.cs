using NUnit.Framework;

namespace RobotFactory.Tests
{
    public class Tests
    {
        

        [Test]
        public void TestCtor()
        {
            Factory factory = new Factory("VW", 10);

            Assert.That(factory.Name, Is.EqualTo("VW"));
            Assert.That(factory.Capacity, Is.EqualTo(10));

        }

        [Test]
        public void TestProduceRobotCreateRobot()
        {
            Factory factory = new Factory("VW", 10);

            Robot robot = new("mo", 2.5, 2);
            string result = $"Produced --> {robot}";
            Assert.That(factory.ProduceRobot("mo", 2.5, 2), Is.EqualTo(result));
           
            Assert.That(factory.Robots[0].Model, Is.EqualTo("mo"));
            Assert.That(factory.Robots[0].Price, Is.EqualTo(2.5));
            Assert.That(factory.Robots[0].InterfaceStandard, Is.EqualTo(2));




        }
        [Test]
        public void TestProduceRobotCreateRobotFaild()
        {
            Factory factory = new Factory("VW", 1);

            factory.ProduceRobot("mm", 7, 2);
            string result = $"The factory is unable to produce more robots for this production day!";
            Assert.That(factory.ProduceRobot("mo", 2.5, 2), Is.EqualTo(result));

        




        }
        [Test]
        public void TestProduceSupplement()
        {
            Factory factory = new Factory("VW", 5);

            
            string result = $"Supplement: {"Analgin"} IS: {2}";
            Assert.That(factory.ProduceSupplement("Analgin", 2), Is.EqualTo(result));
            Assert.That(factory.Supplements[0].InterfaceStandard, Is.EqualTo(2));
            Assert.That(factory.Supplements[0].Name, Is.EqualTo("Analgin"));
        }

        [Test]
        public void TestProduct()
        {
            Factory factory = new Factory("VW", 5);
            Robot robot = new Robot("Asa", 200, 1);
            Supplement supplement = new Supplement("NotAsa", 2);

            
           
           
            Assert.That(factory.UpgradeRobot(robot, supplement), Is.EqualTo(false));
        }
        [Test]
        public void TestProduct2()
        {
            Factory factory = new Factory("VW", 5);
            Robot robot = new Robot("Asa", 200, 1);
            Supplement supplement = new Supplement("NotAsa", 1);

            factory.UpgradeRobot(robot, supplement);


            Assert.That(factory.UpgradeRobot(robot, supplement), Is.EqualTo(false));
        }
        [Test]
        public void TestProduct3()
        {
            Factory factory = new Factory("VW", 5);
            Robot robot = new Robot("Asa", 200, 1);
            Supplement supplement = new Supplement("NotAsa", 1);

            


            Assert.That(factory.UpgradeRobot(robot, supplement), Is.EqualTo(true));
        }
        [Test]
        public void TestSell2()
        {
            Factory factory = new Factory("Ivan", 10);

            factory.ProduceRobot("G-11", 200, 5);

            Assert.That(() => factory.SellRobot(200), Is.Not.Null); 
        }
        [Test]
        public void Testcount()
        {
            Factory factory = new Factory("VW", 5);
            ;

            factory.ProduceRobot("Asa", 200, 1);
            factory.ProduceRobot("Mira", 100, 1);
            factory.ProduceRobot("Geshe", 500, 1);

            factory.ProduceSupplement("iv", 2);
            factory.ProduceSupplement("iiiiiiiv", 3);





            Assert.That(factory.Robots.Count, Is.EqualTo(3));
            Assert.That(factory.Supplements.Count, Is.EqualTo(2));

        }
        [Test]
        public void TestSellFail()
        {
            Factory factory = new Factory("VW", 5);
            Robot robot = new Robot("Asa", 200, 1);
            Robot robot2 = new Robot("Mira", 100, 1);
            Robot robot3 = new Robot("Geshe", 500, 1);

            factory.ProduceRobot("Asa", 1000, 1);
            factory.ProduceRobot("Mira", 2000, 1);
            factory.ProduceRobot("Geshe", 100000, 1);





            Assert.That(factory.SellRobot(100), Is.EqualTo(null));
        }

    }
}