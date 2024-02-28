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
