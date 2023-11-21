function solve(number, op1, op2, op3, op4, op5){
    let operation = [
        op1,
        op2,
        op3,
        op4,
        op5
    ]
    operation.forEach(op => {
        switch(op){
            case "chop":
                number = number / 2;
                break;
                case "dice":
                    number = Math. sqrt(number);
                    break;
                    case "spice":
                    number = number + 1;
                    break;
                    case "bake":
                        number = number * 3;
                        break;
                        case "fillet":
                            number = number - number * 0.20;
                            break;

        }
        console.log(number);
    });

    
}

