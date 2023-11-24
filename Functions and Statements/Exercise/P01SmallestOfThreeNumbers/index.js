function findSmallestNumber(numberOne, numberTwo, numberThree){
    const numbers = [
        numberOne,
        numberTwo,
        numberThree
    ]
    const smallestNumber = Math.min(...numbers);
    console.log(smallestNumber);
}

