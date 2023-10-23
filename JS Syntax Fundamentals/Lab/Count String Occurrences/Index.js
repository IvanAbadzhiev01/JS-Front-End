function CountStringOccurrences(text, word){
let words = text.split(" ");

let count = 0;
words.forEach(element => {
    if(element == word){
        count++;
    }
});

console.log(count);
}

CountStringOccurrences('This is a word and it also is a sentence',
'is');