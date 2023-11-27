function sumEvenOrOddNumber(number){

    const arr = String(number).split("");

    let evenSum = 0;
    let oddSum = 0;
    for (const number of arr) {
        const num = Number(number);

        if(num % 2 === 0){
            evenSum+=num;
        }else{
            oddSum+=num;
        }
    }


    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);
    
}

sumEvenOrOddNumber(1000435);