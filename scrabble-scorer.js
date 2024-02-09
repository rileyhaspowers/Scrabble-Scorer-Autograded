// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function initialPrompt() {
   let inputWord = input.question("Let's play some scrabble! Enter a word:");
   return inputWord;
}

function simpleScorer(word){
   word = word.toUpperCase();
   let totalScore = 0;
      for (let i = 0; i < word.length; i++) {
         totalScore += 1;
       }
      return Number(totalScore);
}

function vowelBonusScorer(word){
   word = word.toUpperCase();
   let totalScore = 0;
   for (let i = 0; i < word.length; i++) {
      if(word[i] === "A" || word[i] === "E" || word[i] === "I" || word[i] === "O" || word[i] === "U"){
         totalScore += 3;
      } else if(word[i] === "B" || word[i] === "C" || word[i] === "D" || word[i] === "F" || word[i] === "G" || word[i] === "H" || word[i] === "J" || word[i] === "K" || word[i] === "L" || word[i] === "M" || word[i] === "N" || word[i] === "P" || word[i] === "Q" || word[i] === "R" || word[i] === "S" || word[i] === "T" || word[i] === "V" || word[i] === "W" || word[i] === "X" || word[i] === "Y" || word[i] === "Z"){
         totalScore += 1;
      } else {
          totalScore += 0;
      }
      }
       return Number(totalScore);
    } 

function scrabbleScorer(word) {
   word = word.toLowerCase();
   let totalScore = 0;
 
   for (let i = 0; i < word.length; i++) {
     for (item in newPointStructure) {
       if (item === word[i]) {
         let addPoints = newPointStructure[item];
         totalScore = totalScore + addPoints;
       }
 
     }
   }
   return totalScore;
 }

const scoringAlgorithms = [
   {
      name: "Simple Scorer",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   }, 
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   }, 
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt(inputWord) {
   let inputNumber = input.question("Which scoring algorithm would you like to use?\n" +
   "0 - Simple: One point per character\n" +
   "1 - Vowel Bonus: Vowels are worth 3 points\n" +
   "2 - Scrabble: Uses scrabble point system\n" +
   "Enter 0, 1, or 2: ");
   
   inputNumber = Number(inputNumber);

   if (inputNumber === 0){
      console.log(`Points for '${inputWord}': ${scoringAlgorithms[0].scoringFunction(inputWord)}`);
   } else if(inputNumber === 1){
      console.log(`Points for '${inputWord}': ${scoringAlgorithms[1].scoringFunction(inputWord)}`);
   }else if(inputNumber === 2){
      console.log(`Points for '${inputWord}': ${scoringAlgorithms[2].scoringFunction(inputWord)}`); 
   } else{
      console.log("Invalid input.")
      scorerPrompt(inputWord);
   }
}

function transform(oldPointStructure) {
   const transformStructure = {};

   for(key in oldPointStructure){
      let arrayLength = oldPointStructure[key].length;
      for (let i = 0; i < arrayLength; i++){
         let letter = oldPointStructure[key][i].toLowerCase();
         transformStructure[letter] = Number(key);

         // oldPointStructure[key][i] = oldPointStructure[key][i].toLowerCase();
         // transformStructure[oldPointStructure[key][i]] = oldPointStructure.key;
      }
   }
   return transformStructure;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let inputWord = initialPrompt();
   scorerPrompt(inputWord);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
