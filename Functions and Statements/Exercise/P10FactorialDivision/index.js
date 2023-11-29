function divideTwoNumberFactorial(n, n2) {
  let answer = 1;
  if (n == 0 || n == 1) {
  } else if (n > 1) {
    for (var i = n; i >= 1; i--) {
      answer = answer * i;
    }
  }

  let answer2 = 1;
  if (n2 == 0 || n2 == 1) {
  } else if (n2 > 1) {
    for (var i = n2; i >= 1; i--) {
      answer2 = answer2 * i;
    }
  }
  const result = answer / answer2;
  console.log(result.toFixed(2));
}
divideTwoNumberFactorial(5, 2);
