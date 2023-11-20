function SumDigit(num){
    let splitNum =  num.toString().split("");
    let sum = 0;
    
    splitNum.forEach(element => {

        sum += parseInt(element);
        
    });

    console.log(sum);
}

