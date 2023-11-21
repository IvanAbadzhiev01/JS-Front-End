function calculatesHowMuchMoneyYouNeedToBuyFruit(fruit, kilogram, priceForKilogram){
const cost = (kilogram / 1000) * priceForKilogram;
console.log(`I need $${cost.toFixed(2)} to buy ${(kilogram / 1000).toFixed(2)} kilograms ${fruit}.`);

}

