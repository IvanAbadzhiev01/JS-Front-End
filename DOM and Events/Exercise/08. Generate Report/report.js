function generateReport() {
  const input = document.querySelectorAll("input");

  const checkboxes = Array.from(
    document.querySelectorAll(`input[type="checkbox"]:checked`)
  );
  checkboxes.map((chec) => {
    const row =
      chec.parentElement.parentElement.parentElement.parentElement.querySelector(
        "tbody"
      );
    const name = row.querySelector("td:nth-of-type(1)");

    console.log(row);
    console.log(name);
  });
}
