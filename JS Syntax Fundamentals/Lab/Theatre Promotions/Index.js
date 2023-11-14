function PromotionsCalculate(dayOfWeak, age){
    let cost = 0;
    if(age >= 0 && age <= 18){
        switch(dayOfWeak){
            case "Weekday":
                cost = 12;
                break;
                case "Weekend":
                    cost = 15;
                    break;
                    case "Holiday":
                        cost = 5;
                        break;
                        
        }
    }else if(age > 18 && age <= 64){
        switch(dayOfWeak){
            case "Weekday":
                cost = 18;
                break;
                case "Weekend":
                    cost = 20;
                    break;
                    case "Holiday":
                        cost = 12;
                        break;
                        
        }

    }else if(age > 64 && age <= 122){
        switch(dayOfWeak){
            case "Weekday":
                cost = 12;
                break;
                case "Weekend":
                    cost = 15;
                    break;
                    case "Holiday":
                        cost = 10;
                        break;
                       

        }

    }

    if(cost === 0){
        console.log("Error!");
    }else{
        console.log(cost + "$");
    }


}