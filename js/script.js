// store country names in this array.
var country = ["ethiopia","kenya","southafrica","america","korea","china","russia","england","germany","poland",
               "sudan","egypt","morrocow","tunisia","algeria","nigeria","gana","congo","libiya","zambia","mali","angola",
               "pakistan","argentina","brazil","mexico","colombia","france","spain","canada","italy","pourtugal","sweden",
               "india","australia","isral","saudiArabia","yemen","sirya","iraq"];

//Global variables to be accessed by functions.
var i = 0;
var deposite = 0;

//generate random number inorder to get the random word to guess.
var randomNum = Math.round(Math.random()*41);
var wordToGuess = country[randomNum];

//store all guessed letters in this array.
var guessedLetters = [];
var RightGuessCount = 0;

//generate the stars with equal length as the word to guess.
var starsToDisplay = [];
for(j = 0; j < wordToGuess.length; j++){
	starsToDisplay[j]= "*";
}

//This function will be called, when players start playing. 
function displayMenu(){
	var playername = Form1["pname"].value;
	document.getElementById("firstMenu").innerHTML = 
				"Welcome to word gessing game " + playername + "....Guess a country Name</br>"+
				"Each letter is represented by a star.</br>You have to type only one letter in one try</br>"+
				"You have 5 tries to try and guessing the word.";
	Form2.innerHTML = "<p>Deposite Money to Play:<input type=\"text\" class=\"dep\" name=\"dep2\"></p>";
	return false;
}

//This function will be called, when players start guessing letters.
function Guess(){
	switch(i){
		case 0:
			var mainDep = parseInt(Form1["dep"].value);
			deposite = parseInt(Form2["dep2"].value);
			if(mainDep > deposite){
				Form2.innerHTML = "<p>Deposite Money to Play: "+deposite+
					"</p><p>Guess a letter:<input type=\"text\" class=\"dep\" name=\"guess\"></p>";
				i++;	
			}
			break;
		case 6:
		    //notify the players whether they won or loss
			if(RightGuessCount > 3){
				document.getElementById("firstMenu").innerHTML = "You won!</br>You guessed "+RightGuessCount
																+ " letters right.</br>"+"The country was: "+wordToGuess
																+".</br>You gain "+ (10*deposite) +" birr from your deposite.";															;
			}else{
				document.getElementById("firstMenu").innerHTML = "You Lose!</br>You guessed "+RightGuessCount
																+ " letters right.</br>"+"The country was: "+wordToGuess;
			}
			//when players guess five letters, Prompt them to play again.
			Form2.innerHTML = 
				"<h4>Do you want to play again?</h4>"+
				"<button onClick=\"onYesButtonClicked()\">YES</button>"+
				"<button onClick=\"onNoButtonClicked()\">NO</button>"
			break;
		default:
			guessedLetters[i-1] = Form2["guess"].value;

			//Notify the players their status
			Form2.innerHTML = "<p>Deposite Money to Play: "+deposite+
					"</p><p>Guessed letters: "+guessedLetters.toString()+"</p>";

			//find the letter guessed in the target word.
			var letterPosition = wordToGuess.indexOf(guessedLetters[i-1]);

			//notify the players whether they fail to guess a letter or able to find one.
			if(letterPosition == -1){
				Form2.innerHTML +=
					"<p>Wrong Guess!</p>";
			}else{
				starsToDisplay[letterPosition] = guessedLetters[i-1];
				Form2.innerHTML +=
					"<p>You found a letter!Isn't that exciting!</p>";
				RightGuessCount++;
			}
			Form2.innerHTML +=
				"<p>you have " + (6-i) + " guess left</p><p>"+starsToDisplay.toString()+"</p>"+
				"<p>Guess a letter:<input type=\"text\" class=\"dep\" name=\"guess\"></p>";
			//increment count
			i++;
	}
	return false;
}
function onYesButtonClicked(){
	//intiate every thing again for the new game;
	randomNum = Math.round(Math.random()*41);
	wordToGuess = country[randomNum];
	i = 0;
	deposite = 0;
	guessedLetters = [];
	RightGuessCount = 0;
	starsToDisplay = [];
	for(j = 0; j < wordToGuess.length; j++){
		starsToDisplay[j]= "*";
	}	
	Form2.innerHTML = "";
}
function onNoButtonClicked(){
	Form2.innerHTML = "";
	Form1.innerHTML = "";
}
