function calculatePriceForVacation(numberPeople, typePeople, datOfWeek){
    let cost = 0;
    if(typePeople === "Students"){
        switch(datOfWeek){
            case "Friday":
                cost = 8.45 * numberPeople;
                break;
                case "Saturday":
                    cost = 9.80 * numberPeople;
                    break;
                    case "Sunday":
                    cost = 10.46 * numberPeople;
                    break;
        }

        if(numberPeople >= 30){
            cost -= (cost / 100) * 15;
        }
    }else if(typePeople === "Business"){

        if(numberPeople >= 100){
            numberPeople -= 10;
        }

        switch(datOfWeek){
            case "Friday":
                cost = 10.90 * numberPeople;
                break;
                case "Saturday":
                    cost = 15.60 * numberPeople;
                    break;
                    case "Sunday":
                    cost = 16 * numberPeople;
                    break;
        }
    } else if(typePeople === "Regular"){
        switch(datOfWeek){
            case "Friday":
                cost = 15 * numberPeople;
                break;
                case "Saturday":
                    cost = 20 * numberPeople;
                    break;
                    case "Sunday":
                    cost = 22.5 * numberPeople;
                    break;
        }
        if(numberPeople >= 10 && numberPeople <= 20){
            cost -= (cost / 100) * 5;
        }
    }

    console.log(`Total price: ${cost.toFixed(2)}`);


}

