function editElement(element, mach, replace) {
  function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
  }
  var newString = replaceAll(element.textContent, mach, replace);
  element.textContent = newString;

  // TODO
}
