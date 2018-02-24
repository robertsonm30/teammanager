var inquirer = require("inquirer");

function player(name, position, offense, defense) {
	this.name = name;
	this.position = position;
	this.offense = offense;
	this.defense = defense;

	this.goodGame = function() {
		var mod = Math.floor((Math.random() * 2) + 1);
		var value = Math.floor((Math.random() * 2) + 1);
		if (value === 1 && mod === 1) {
			this.offense++
		} else if (value === 2 && mod === 1) {
			this.defense++
		} else {
			return;
		}
	};

	this.badGame = function() {
		var mod = Math.floor((Math.random() * 2) + 1);
		var value = Math.floor((Math.random() * 2) + 1);
		if (value === 1 && mod === 1) {
			this.offense--
		} else if (value === 2 && mod === 1) {
			this.defense--
		} else {
			return;
		}
	};

	this.printStats = function() {
		console.log("\n~~~~~~~~~~\n" + "Name: "+ this.name + "\n" + "Position: " + this.position + "\n" + "Offense: " + this.offense + "\n" + "Defense: " + this.defense + "\n~~~~~~~~~~\n")
	};

};

var count = 0;
var playerArray = [];
var score = 0;
var overallScore = 0;

var prompt = function() {
	if (count <3) {
		console.log("New Player Your 3rd player is a Substitue");

		inquirer.prompt([
			{
				type: "input",
				name: "name",
				message: "What is the Player Name?"
			}, {
				type: "input",
				name: "position",
				message: "What is the Player Position?"
			}, {
				type: "list",
				name: "offense",
				message: "What is the offense Level?",
				choices:["1","2","3","4","5","6","7","8","9","10"]
			}, {
				type: "list",
				name: "defense",
				message: "What is the defense Level?",
				choices:["1","2","3","4","5","6","7","8","9","10"]
			}


			]).then(function(answer) {

				var intoffense = parseInt(answer.offense);
				var intdefense = parseInt(answer.defense);
				
				var newPlayer = new player(
					answer.name,
					answer.position,
					intoffense,
					intdefense
					);
				playerArray.push(newPlayer);

				count++;
				prompt();

			});

	} else {
		for (var i = 0; i < playerArray.length; i++) {
			playerArray[i].printStats();
		
		};

			playGame();
	}
};
var gamecount = 0;
var player1 = 0;
var player2 = 1;

var subprompt = function() {
			inquirer.prompt([
			{
				type: "list",
				name: "subyn",
				message: "Would you like to use a sub?",
				choices:["Yes","No"]
			}

			]).then(function(qanswer) {
				if (qanswer.subyn === "Yes") {
					subchanger()
				} else {
					gamecount++;
					playGame()
					return;

				}	
			})
};


var subchanger = function() {
	inquirer.prompt([
			{
				type: "list",
				name: "subchoice",
				message: "Who are you replaceing with the sub?",
				choices:["1","2"]
			}

			]).then(function(subanswer) {
				var thesubber = parseInt(subanswer.subchoice)
				if (thesubber === 1) {
					player1 = 2;
				} else {
					player2 =2;
				}
					gamecount++;
					playGame()

				});
}

var playAgain = function() {
		console.log("you Won " + overallScore + " games")
		for (var i = 0; i < playerArray.length; i++) {
			playerArray[i].printStats();
		
		};
		inquirer.prompt([
			{
				type: "list",
				name: "playmore",
				message: "Would you like to playagain?",
				choices:["Yes","No"]
			}

			]).then(function(playme) {
				if (playme.playmore === "Yes") {
					gamecount = 0;
					score = 0;
					overallScore++;
					playGame()
				} else {
					return;

				}	
			})
};



function playGame() {
	if (gamecount <5) {
	var firstGO = Math.floor((Math.random() * 20) + 1);
	var secondGO = Math.floor((Math.random() * 20) + 1);
	var teamOFF = playerArray[player1].offense + playerArray[player2].offense;
	var teamDEF = playerArray[player1].defense + playerArray[player2].defense;



	if (firstGO < teamOFF) {
		score++;
	};
	if (secondGO > teamDEF) {
		score--;
	};

	console.log("Score: " + score + "\n" + "Current Players, " + playerArray[player1].name + "," + playerArray[player2].name )
	subprompt()



	} else {
		if (score > 0) {
			for (var i = 0; i < playerArray.length; i++) {
			playerArray[i].goodGame();
			};
			console.log("You Won")
			playAgain()
		} else if (score < 0) {
			for (var i = 0; i < playerArray.length; i++) {
			playerArray[i].badGame();
			};
			console.log("YouLOse")
			playAgain()
		} else {
			console.log("Tie")
			playAgain()
		}


	};


};


prompt();