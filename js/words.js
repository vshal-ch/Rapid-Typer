// let sentence = 'A paragraph is a series of related sentences developing a central idea, called the topic.'
let sentence = 'A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.'

let words = sentence.split(' ');

let newWords = [];
words.forEach(word =>{
    if(word.length>=3){
        newWords.push(word);
    }
});

export {newWords};