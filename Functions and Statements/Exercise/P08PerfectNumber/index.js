function perfefctNumber(n){
if(n < 0){
    console.log("It's not so perfect.");
}
    let sum = 0;
    for (let i = 1; i < n; i++) {
        
        if(n % i === 0){
            sum += i;
        }
    }
if(sum === n){
    console.log("We have a perfect number!");
}else{
    console.log("It's not so perfect.");
}


}

perfefctNumber(6);