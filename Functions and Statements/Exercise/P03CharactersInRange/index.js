function printCharInRange(charOne, charTwo){
    const charCoreOne = charOne.charCodeAt(0);
    const charCoreTwo = charTwo.charCodeAt(0);

    const chars =[
        charCoreOne,
        charCoreTwo
    ]
    const start = Math.min(...chars);
    const end = Math.max(...chars);
    const arr = [];

    for (let i = start + 1; i < end; i++){
        arr.push(String.fromCharCode(i));
       
    }
    console.log(arr.join(" "));

}

printCharInRange(`a`,`d`);