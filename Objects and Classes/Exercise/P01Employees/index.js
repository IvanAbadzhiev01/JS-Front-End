function createEmployees(input) {
  class Employees {
    constructor(name) {
      this.name = name;
      this.personalNumber = name.length;
    }
  }
  const emp = [];
  input.forEach((element) => {
    emp.push(new Employees(element));
  });

  Object.entries(emp).forEach(([key, value]) => {
    console.log(
      `Name: ${emp[key].name} -- Personal Number: ${emp[key].personalNumber}`
    );
  });
}
createEmployees([
  "Silas Butler",
  "Adnaan Buckley",
  "Juan Peterson",
  "Brendan Villarreal",
]);
