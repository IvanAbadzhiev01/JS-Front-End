function ReverseArray(count, arr){
let reverseArray = arr.slice(0, count).reverse().join(" ");

console.log(reverseArray);
}


ReverseArray(3, [10,20,30,40,50,60,70]);