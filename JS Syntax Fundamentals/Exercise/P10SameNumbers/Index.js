function SameNumbers(num){
  let number = num.toString().split("");


let isSame = true;
   for (let index = 0; index < number.length - 1; index++) {
    if(number[index] === number[index + 1]){

    }else{
        isSame = false;
    }
    
  }

  let sum = 0;
  number.forEach(element => {
    sum += parseInt(element);
  });

  console.log(isSame);
  console.log(sum)
}
