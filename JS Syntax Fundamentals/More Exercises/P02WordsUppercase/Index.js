function solve(text){
const result = text.split(/[\W]+/).filter((w) => w.length > 0)
.map((w) => w.toUpperCase());
console.log(result.join(", "));
}

