/*
Pig Latin
*/

window.onload = function() {
  // Asigna el evento al botón al hacer clic
  document.getElementById('btn').onclick = function() {
    var inputText = document.getElementById('txtVal').value; // Obtiene el texto del input
    var pigLatinText = igpayAtinlay(inputText); // Convierte el texto a Pig Latin
    document.getElementById('pigLatLbl').textContent = pigLatinText; // Muestra el resultado
  };
};

function igpayAtinlay(str) {
  // Initialize the word array properly by splitting the input string into words
  var returnArray = [],
    wordArray = str.split(" "); // Split the input string into an array of words
  
  // Iterate over each word in the wordArray
  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    var beginning = word.charAt(0);

    // Check if the first letter is a vowel
    if (/[aeiouAEIOU]/.test(beginning)) {
      returnArray.push(word + "way"); // If it starts with a vowel, add "way" to the end
      continue;
    }

    // If it starts with a consonant, find the first vowel
    for (var ii = 1; ii < word.length; ii++) {
      if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
        // Move all letters before the first vowel to the end and add "ay"
        var pigLatinWord = word.substring(ii) + beginning + word.substring(1, ii) + "ay";
        returnArray.push(pigLatinWord);
        break; // Exit the loop after processing the word
      } else {
        beginning += word.charAt(ii); // Append consonants to beginning
      }
    }
    
    // If there are no vowels in the word, treat the whole word as consonants
    if (returnArray.length === i) {
      returnArray.push(word + "ay"); // Add "ay" at the end
    }
  }
  
  return returnArray.join(" "); // Join the processed words back into a single string
}

// Some examples of expected outputs
console.log(igpayAtinlay("pizza")); // "izzapay"
console.log(igpayAtinlay("apple")); // "appleway"
console.log(igpayAtinlay("happy meal")); // "appyhay ealmay"
console.log(igpayAtinlay("string")); // "ingstray"
console.log(igpayAtinlay("cry")); // "ycay"
console.log(igpayAtinlay("vowel")); // "owelvay"
