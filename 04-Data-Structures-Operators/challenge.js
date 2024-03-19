const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  printGoals: function (...players) {
    console.log(`${players.length} where scored`);
    for (let i = 0; i < players.length; i++) {
      console.log(players[i]);
    }
  },
};

//////////////// Challenge #1
// 1
const [players1, players2] = game.players;
console.log(players1);
console.log(players2);

// 2
const [gk, ...fieldPlayers] = players1;
console.log(gk);
console.log(fieldPlayers);

// 3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// 5
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

// 6
game.printGoals(...game.scored);

// 7
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');

//////////////// Challenge #2
// 1
for (const [index, player] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${player}`);
}

// for (let i = 0; i < game.scored.length; i++) {
//   console.log(`Goal ${i + 1}: ${game.scored[i]}`);
// }

// 2
let averageOdd = 0;
const oddsValues = Object.values(game.odds);
for (const odd of oddsValues) {
  averageOdd += odd;
}
averageOdd /= oddsValues.length;
console.log(averageOdd);

// 3
const oddsEntries = Object.entries(game.odds);
for (const [team, odd] of oddsEntries) {
  let teamStr;
  if (team === 'x') {
    teamStr = 'draw';
  } else {
    teamStr = `victory ${game[team]}`;
  }
  console.log(`Odd of ${teamStr} is ${odd}`);
}

//////////////// Challenge #3
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);
// 1. Create an array 'events' of the different game events that happened (no duplicates)
const events = new Set(gameEvents.values());
console.log(events);

//   2. After the game has finished, is was found that the yellow card from minute 64
//   was unfair. So remove this event from the game events log.
gameEvents.delete(64);
console.log(gameEvents);

//   3. Compute and log the following string to the console: "An event happened, on
//   average, every 9 minutes" (keep in mind that a game has 90 minutes)
const time = [...gameEvents.keys()].pop();
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

//   4. Loop over 'gameEvents' and log each element to the console, marking
//   whether it's in the first half or second half (after 45 min) of the game, like this:
//   [FIRST HALF] 17: ⚽ GOAL
for (const [time, event] of gameEvents) {
  if (time <= 45) {
    console.log(`[FIRST HALF] ${time}: ${event}`);
  } else if (time > 45) {
    console.log(`[SECOND HALF] ${time}: ${event}`);
  }
}
