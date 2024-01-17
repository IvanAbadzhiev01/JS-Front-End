function sumTable() {
  let sum = 0;
  for (
    let index = 1;
    index < document.getElementsByTagName("tr").length - 1;
    index++
  ) {
    const curNum = Number(
      document.getElementsByTagName("tr")[index].innerText.split("\t")[1]
    );
    sum += curNum;
  }

  document.getElementById("sum").innerText = Number(sum);
}
