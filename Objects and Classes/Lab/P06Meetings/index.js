function meatingBook(arr) {
  const meating = arr.reduce((acc, curr) => {
    const [day, name] = curr.split(" ");

    if (acc[day]) {
      console.log(`Conflict on ${day}!`);
    } else {
      acc[day] = name;
      console.log(`Scheduled for ${day}`);
    }

    return acc;
  }, {});

  Object.entries(meating).forEach(([key, value]) => {
    console.log(`${key} -> ${value}`);
  });
}
meatingBook([
  "Friday Bob",
  "Saturday Ted",
  "Monday Bill",
  "Monday John",
  "Wednesday George",
]);
