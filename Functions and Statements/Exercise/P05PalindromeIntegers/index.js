function plaindromOrNoot(...numbers){
const arr = String(numbers).split(",");
arr.forEach(number => {
    let reversenumber = number.toString().split('').reverse().join('');
    console.log(number === reversenumber);
});

}

plaindromOrNoot([123,323,421,121]);
