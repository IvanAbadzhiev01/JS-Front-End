function createCatsFromArray(catStrings) {
  class Cat {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    meow() {
      console.log(`${this.name}, age ${this.age} says Meow`);
    }
  }
  const cats = [];

  for (const catString of catStrings) {
    const [name, age] = catString.split(" ");
    const cat = new Cat(name, age);
    cats.push(cat);
  }

  cats.forEach((cat) => cat.meow());
}

// Example usage:
const catStrings = ["Whiskers 3", "Fluffy 5", "Mittens 2"];
createCatsFromArray(catStrings);
