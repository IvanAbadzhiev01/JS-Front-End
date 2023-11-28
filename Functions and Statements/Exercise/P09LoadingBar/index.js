function printLoadingBar(number){
    let loder ={
        0: "0% [..........]\nStill loading...",
        10: "10% [%.........]\nStill loading...",
        20: "20% [%%........]\nStill loading...",
        30: "30% [%%%.......]\nStill loading...",
        40: "40% [%%%%......]\nStill loading...",
        50: "50% [%%%%%.....]\nStill loading...",
        60: "60% [%%%%%%....]\nStill loading...",
        70: "70% [%%%%%%%...]\nStill loading...",
        80: "80% [%%%%%%%%..]\nStill loading...",
        90: "90% [%%%%%%%%%.]\nStill loading...",
        100: "100% Complete!\n[%%%%%%%%%%]"
    };
    
    console.log(loder[number]);


}
printLoadingBar(30);