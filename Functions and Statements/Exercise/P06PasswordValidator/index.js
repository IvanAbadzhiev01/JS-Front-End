function validatePassword(password){
let isValid = true;


if(!(password.length >= 6 && password.length <= 10)){

    isValid = false;

    console.log("Password must be between 6 and 10 characters");
}
const regex = "^[A-Za-z0-9]+$";

if(!password.match(regex)){

    isValid = false;
    console.log("Password must consist only of letters and digits");
}
let count = password.match(/\d/g);

if(!count || count.length < 2){
    isValid = false;
    console.log("Password must have at least 2 digits");
}

if(isValid){
    console.log("Password is valid");
}
}
