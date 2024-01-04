function createHeroRegister(input) {
  const heroRegister = [];

  // Parse input and create objects for each hero
  input.forEach((heroInfo) => {
    const [heroName, heroLevel, itemsString] = heroInfo.split(" / ");
    const hero = {
      name: heroName,
      level: Number(heroLevel),
      items: itemsString.split(", ").filter((item) => item !== ""), // Split items and remove empty items
    };
    heroRegister.push(hero);
  });

  // Sort heroes by level in ascending order
  heroRegister.sort((a, b) => a.level - b.level);

  // Generate the formatted output
  const output = heroRegister.map((hero) => {
    return `Hero: ${hero.name}\nlevel => ${
      hero.level
    }\nitems => ${hero.items.join(", ")}`;
  });

  console.log(output.join("\n"));
}

createHeroRegister([
  "Isacc / 25 / Apple, GravityGun",
  "Derek / 12 / BarrelVest, DestructionSword",
  "Hes / 1 / Desolator, Sentinel, Antara",
]);
