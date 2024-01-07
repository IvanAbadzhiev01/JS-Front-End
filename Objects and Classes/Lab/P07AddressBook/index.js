function collectAddress(arr) {
  const addressBook = arr.reduce((acc, curr) => {
    const [name, address] = curr.split(":");
    acc[name] = address;

    return acc;
  }, {});

  const sortedAddressBook = Object.fromEntries(
    Object.entries(addressBook).sort(([nameA], [nameB]) =>
      nameA.localeCompare(nameB)
    )
  );

  Object.entries(sortedAddressBook).forEach(([key, value]) => {
    console.log(`${key} -> ${value}`);
  });
}

collectAddress([
  "Tim:Doe Crossing",
  "Bill:Nelson Place",
  "Peter:Carlyle Ave",
  "Bill:Ornery Rd",
]);
