function CalculateDiffEvenOrOddNumber(arr){
    let even = 0;
    let odd = 0;
        arr.forEach(element => {
         if(element % 2 == 0){
        even += element;
         }else{
            odd += element;
         }       
        
    });

    console.log(even - odd);
}

CalculateDiffEvenOrOddNumber([3,5,7,9] )