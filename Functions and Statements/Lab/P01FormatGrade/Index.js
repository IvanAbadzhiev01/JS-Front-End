function formatGrade(grade) {
    let result = null;

    if(grade >= 5.50){
        result = "Excellent";
    }else if(grade >= 4.50){
        result = "Very good";
    }else if(grade >= 3.50){
        result = "Good";
    }else if(grade >= 3){
        result = "Poor";
    }else{
        result = "Fail (2)";
        console.log(result);
        return;
    }

    console.log(result + ` (${grade.toFixed(2)})`);
}
formatGrade(4.50);