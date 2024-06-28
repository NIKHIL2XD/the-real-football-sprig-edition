/*
@title: the real football
@author: nikhil
@tags: ['soccer','football']
@addedOn: 2024-00-00
*/

const player = "p";
const ball = "b";
const goalposta = "ga";
const goalpostb = "gb";
const hurdle = "w";

//legend
setLegend(
  [ player, bitmap`
......CCC.......
....CCCCCC......
....CCCC2CC.....
....C2020CC.....
.....22222CC....
......222.......
....777777......
....777777......
....277772......
....277772......
....155551......
.....5555.......
.....2..2.......
.....2..2.......
.....L..L.......
.....LL.LL......`],
  [ ball, bitmap`
................
................
................
................
................
....000.........
..00L2L00.......
.0LLL22220......
.0LLL2LL20......
022222LL220.....
022222LL2L0.....
0LLL22222L0.....
.0LL222220......
.0222LLL20......
..002LL00.......
....000.........`],
  [ goalposta, bitmap`
.......00000....
.......0LLL00...
.......0000L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........000...`],
  [ goalpostb, bitmap`
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
..........0L0...
.......0000L0...
.......0LLL00...
.......00000....`],
  [ hurdle, bitmap`
......101.......
.....11011......
.....10001......
....110L011.....
.....10L01......
....110L011.....
.....10L01......
....1102011.....
.....10L01......
....110L011.....
.....10L01......
....110L011.....
.....10L01......
....1100011.....
.....11011......
......101.......`]
);


// levels
let level = 0; 
const levels = [
  map`
....
p...
....`,
  map`
p..
.b.
..g`,
  map`
p.wg
.bw.
....
.w..`,
  map`
p...
...b
...b
.bbg`,
  map`
...
.p.
...`,
  map`
p.w.
.bwg
....
..bg`
];


const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, ball, hurdle ]); 

// movement of player
onInput("s", () => {
  getFirst(player).y += 1; 
  playTune(move);
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(move);
});

onInput("w", () => {
    getFirst(player).y -= 1;
    playTune(move);
});

onInput("a", () => {
    getFirst(player).x -= 1;
    playTune(move);
});
onInput("s", () => {
  getFirst(player).y += 1
})

onInput("j", () => {
  const currentLevel = levels[level];

if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
 }
});


afterInput(() => {
  
  const targetNumber = tilesWith(goalpost1,goalpost2).length;
  
  const numberCovered = tilesWith(goalpost1, goalpost2, ball).length;

 
  if (numberCovered === targetNumber) {
   
    level = level + 1;

    const currentLevel = levels[level];

    
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`H` });
    }
  }
});
