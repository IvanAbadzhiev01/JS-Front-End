function solve(spice){

    let winSpice = 0;
    let days = 0;
while(true){
    if(spice < 100){
        if(winSpice >= 26){
            winSpice -= 26;
        }
        break;
    }

    winSpice += spice
    days++;
    if(winSpice >= 26){
        winSpice -= 26;
    }
    spice -= 10;


 
}
console.log(days);
console.log(winSpice);

}

solve(450);