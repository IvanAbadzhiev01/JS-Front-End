function PrintAndSumNumber(num1, num2){
  let sum = 0;
  let arr =[];
    for (let index = num1; index <= num2 ; index++){
            sum += index;
            arr.push(index);
    }

    console.log(arr.join(" "));
    console.log(`Sum: ${sum}`);
}

