function solve(input) {
  class Town {
    constructor(townName, latitude, longitude) {
      this.townName = townName;
      this.latitude = latitude;
      this.longitude = longitude;
    }
  }
  const towns = [];
  input.forEach((element) => {
    const [townName, latitude, longitude] = element.split(" | ");
    towns.push(
      new Town(
        townName,
        Number(latitude).toFixed(2),
        Number(longitude).toFixed(2)
      )
    );
  });

  towns.forEach((element) => {
    console.log(
      `{ town: '${element.townName}', latitude: '${element.latitude}', longitude: '${element.longitude}' }`
    );
  });
}
solve(["Sofia | 42.696552 | 23.32601", "Beijing | 39.913818 | 116.363625"]);
