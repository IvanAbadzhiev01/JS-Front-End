function solve(lostFightsCount, helmetPrice, swordPrice, shieldPrice,  armorPrice){
  
    let helmet = 0;
    let sword = 0;
    let shild = 0;
    let arnor = 0;

    for (let i = 1; i <= lostFightsCount; i++) {
          if(i % 2 === 0){
                helmet++;
          }
          if(i % 3 === 0){
            sword++;
          }
          if(i % 2 === 0 && i % 3 === 0){
            shild++;
            if(shild % 2 === 0){
                arnor++;
            }
          }

            
    }

    const result = (helmet * helmetPrice) + (sword * swordPrice) + (shild * shieldPrice) + (arnor * armorPrice);


    console.log(`Gladiator expenses: ${result.toFixed(2)} aureus`)
}