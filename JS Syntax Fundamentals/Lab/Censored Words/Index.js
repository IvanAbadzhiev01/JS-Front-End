function CensoredWords(text, word){
    const censoredText = text.replace(word, "*".repeat(word.length));

    console.log(censoredText)
}

CensoredWords('A small sentence with some words',
'small');