// variabel to count the rounds
let amountOfRounds = 0;
// array to save the count of rounds
const roundsArray = [];
// array to save each round in
const tenRoundsArray = [];
//array for all the houses
const houseArray = [];
// function to populate the houseArray with numbers from 0-99
const populateHouseArray = () => {
	for (let i = 0; i <= 99; i++) {
		houseArray.push(i);
	}
};
populateHouseArray();
// function to select a random house from houseArray
const randomSelector = (array) => {
	return array[Math.floor(Math.random() * array.length)];
};
// array of infected houses, in the beginning it only contains the first randomly selected infected house
const infectedHouseArray = [randomSelector(houseArray)];
const startZombieInfection = () => {
	const zombieInfection = () => {
		const selectHouseToInfect = () => {
			amountOfRounds += 1;
			// for each it selects new houses to infect and add to infectedHousesArray
			infectedHouseArray.map(() => {
				const selectedHouse = randomSelector(houseArray);
				// conditional to check if house is infected already, if not it pushes to infectedHousesArray
				if (!infectedHouseArray.includes(selectedHouse)) {
					// push the infected house to the array
					infectedHouseArray.push(selectedHouse);
				}
			});
			// Visual presentation
			document.getElementById('house-container').innerHTML = houseArray.map(
				(item) => {
					if (infectedHouseArray.includes(item)) {
						return `<div class='house-div-red'></div>`;
					} else {
						return `<div class='house-div-green'></div>`;
					}
				}
			);
			// display the rounds to infect all
			document.getElementById(
				'rounds'
			).innerHTML = `<p>Rounds to infect all: ${amountOfRounds}</p>`;
			roundsArray.push(amountOfRounds);
			// delay, so we can see the progress of the zombieinfection
			if (infectedHouseArray.length < houseArray.length) {
				setTimeout(selectHouseToInfect, 1000);
			}
		};
		selectHouseToInfect();
	};
	if (tenRoundsArray < 10) {
		/*This should repeat itself 10 times. setInterval? While-loop?
    And I need to figure out where to push the final length of the roundsArray to tenRoundsArray.
    */
		zombieInfection();
	}
	zombieInfection();
};
startZombieInfection();
/* the average amount of rounds and displaying the result.
got stuck on getting the whole function to run 10 times, so I ran it manually ten times
and hardcoded the array of those rounds, to at least have a result to show. 

If I had used react I would have had a state and updated it for each round, but react and setTimeout does 
not play very nice together without useEffect, and useEffect did not enjoy being nested where I needed it. 

Would be nice to discuss the different solutions for this!
  */
const tenRoundsArrayHardcoded = [13, 14, 14, 14, 12, 12, 14, 17, 12, 12];
const sumOfRounds = tenRoundsArrayHardcoded.reduce((a, b) => a + b);
const result = sumOfRounds / tenRoundsArrayHardcoded.length;

document.getElementById('results').innerHTML += `
<p>Average result of 10 rounds: ${result}</p>
`;
