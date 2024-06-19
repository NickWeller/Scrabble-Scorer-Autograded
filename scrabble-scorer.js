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

function oldScrabbleScore(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let word = ''
function initialPrompt() {
   word = input.question("Let's play some scrabble! Enter a word: ")
   console.log('\n')
};



function simpleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = 0
   let i = 0
   while (i < word.length){
      letterPoints ++
      i++
   }
   return letterPoints
};

function vowelBonusScorer(word){
word = word.toUpperCase();
let letterPoints = 0
let i = 0
while (i < word.length){
   const vowels = ['A', 'E', 'I', 'O' , 'U']
   if (vowels.includes(word[i])){
      letterPoints = letterPoints + 3
      i++
   } else {
      letterPoints++
      i++
   }
   } return letterPoints
}


function transform(words) {
   let newWordPoints = {};
   for (let newOrder in words) {
     let letterSpec = words[newOrder]
     for (let i = 0; i < letterSpec.length; i++) {
       newWordPoints[letterSpec[i].toLowerCase()] = Number(newOrder);
     }
   }
 
   return newWordPoints;
 };
 
 let newPointStructure = transform(oldPointStructure);


function scrabbleScorer(word) {
   let letterPoints = 0;
   word = word.toLowerCase();
   for (let i = 0; i < word.length; i++) {
     letterPoints += newPointStructure[word[i]];
   }  
   return letterPoints;
 
 } 
 
 const scoringAlgorithms = [
   {
       name: 'Simple Score',
       number: '0',
       description: '0 - One point per character.',
       scorerFunction: simpleScorer
},
   {
       name: 'Vowel Bonus Score',
       number: '1',
       description: '1 - Vowels are worth 3 points.',
       scorerFunction: vowelBonusScorer
},
   {
       name: 'Scrabble Score',
       number: '2',
       description: '2 - Uses scrabble point system.',
       scorerFunction: scrabbleScorer
}];

let algo = 0

function scorerPrompt() {
   algo = input.question("Please select a scoring algorithm: \n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system \n\n");
}




function runProgram() {
   transform(oldPointStructure);
   initialPrompt()
   scorerPrompt()
   console.log("\n")
   console.log(`Score for '${word}': ` + scoringAlgorithms[algo].scorerFunction(word)) 
   return scoringAlgorithms[algo].scorerFunction(word);
   ;
   
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
