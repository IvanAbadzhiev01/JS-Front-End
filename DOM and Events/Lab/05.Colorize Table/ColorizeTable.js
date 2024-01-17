function colorize() {
  // var lineNumber = e.stack.split("\n")[1].split(":")[2];

  for (
    let index = 0;
    index < document.getElementsByTagName("tr").length;
    index++
  ) {
    if ((index + 1) % 2 === 0) {
      document.getElementsByTagName("tr")[index].style.background = "teal";
    }
  }
}
