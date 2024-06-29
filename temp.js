/*
@title: the real football
@author: nikhil
@tags: ['soccer','football']
@addedOn: 2024-00-00
*/

const player = "p";
const ball = "b";
const goalpost = "g";
const hurdle = "w";
const grass = "l";
const bounds = "e";

//legend
setLegend(
  [ player, bitmap`
444444CCC4444444
4444CCCCCC444444
4444CCCC2CC44444
4444C2020CC44444
4444422222CC4444
4444442224444444
4444777777444444
4444777777444444
4444277772444444
4444277772444444
4444155551444444
4444455554444444
4444424424444444
4444424424444444
44444L44L4444444
44444LL4LL444444`],
  [ ball, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444440004444444
444400L2L0044444
4440LLL222204444
4440LLL2LL204444
44022222LL220444
44022222LL2L0444
440LLL22222L0444
4440LL2222204444
4440222LLL204444
4444002LL0044444
4444440004444444
4444444444444444
4444444444444444`],
  [ goalpost, bitmap`
4000004444444444
40LLL00444444444
40000L0444444444
44440L0444444444
44440L0444444444
44440L0444444444
44440L0444444444
44440L0444444444
44440L0444444444
44440L0444444444
44440L0444444444
44440L0444444444
44440L0444444444
40000L0444444444
40LLL00444444444
4000004444444444`],
  [ hurdle, bitmap`
4444440L04444444
4444410L01444444
4444410L01444444
4444110L01144444
4444410L01444444
4444110L01144444
4444410L01444444
4444110L01144444
4444410L01444444
4444110L01144444
4444410L01444444
4444110L01144444
4444410L01444444
4444110L01144444
4444410L01444444
4444440L04444444`],
  [ grass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ bounds, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`]
);


// levels
let level = 0; 
const levels = [
  map`
llllllll
llllllll
lpblllgl
llllllll
llllllll`,
  map`
eeeeeeeeeeeeee
elllwllwlwlwle
elllwllwlwlwle
ellllllwlllwle
epblllllllllge
elllwllllwlwle
elllwllwlwlwle
elllwllwlwllle
eeeeeeeeeeeeee`,
  map`
eeeeeeeeeeeeeeee
elllwlwlwlllwlle
elllwlwlllllwlle
elllwlllllwlwlle
elllwlwlwlllllge
epblwlwlwlllwlle
elllwlwlwlllwlle
elllllllwlllwlle
elllwlllwlllwlle
eeeeeeeeeeeeeeee`,
  map`
eeeeeeeeeeeeeeeeee
elllwlllwlwlwlwlle
elllwlwlwlwlwlwlle
elllllllwlwlllwlle
epblwlwlwlwlwlwlle
elllwlwlllllllwlle
elllllllllwlwlwlle
elllllwlwlwlllllge
elllwlwlllwlwlwlle
eeeeeeeeeeeeeeeeee`,
  map`
eeeeeeeeeeeeeeeeeee
ellllwlwlwlwlwlwlle
elpblllwlllwlllllle
ellllllllwlllllwlle
ellllwlwlwlwlwlwlle
ellllwlllllwlwlwlle
ellllwlwlwlwlwlwlle
ellllllllwlwlwlllge
ellllwlllllllllwlle
ellllwlwlwlllwlwlle
eeeeeeeeeeeeeeeeeee`,
  map`
eeeeeeeeeeeeeeeeee
elllwlllllwlllwlle
elllllwlwlllllllle
elllwlwlllllwlwlle
epblllllwlwlwlwlle
elllwlwlwlwlllllle
elllllwlwlllwlllge
elllllllllwlwlwlle
elllwlwlllwlllwlle
eeeeeeeeeeeeeeeeee`,
];

setBackground(grass)

addText("The Real Football", { y: 2, color: color`2` })

const currentLevel = levels[level];

setMap(currentLevel);
addText("Dodge the hurldes", { y: 4, color: color`8` });
addText("And score a goal", { y: 5, color: color`8` });
addText("use w a s d to move", { y: 10, color: color`9` });
addText("Press j to reset", { y: 11, color: color`9` });
afterInput(() => {
  clearText();
  const numberCovered = tilesWith(player, ball).length;
})

setSolids([ player, ball, hurdle, bounds]); 

// movement of player
onInput("s", () => {
  getFirst(player).y += 1; 
  });

onInput("d", () => {
  getFirst(player).x += 1;
  });

onInput("w", () => {
    getFirst(player).y -= 1;
    });

onInput("a", () => {
    getFirst(player).x -= 1;
    });

onInput("s", () => {
    getFirst(player).y += 1;
    });

onInput("j", () => {
  const currentLevel = levels[level];

if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
 }
});

// for ball
setPushables({
  [player]: [ ball ],
});


afterInput(() => {
  
  const targetNumber = tilesWith(goalpost).length;
  
  const numberCovered = tilesWith(goalpost, ball).length;
  
  if (numberCovered === targetNumber) {
   
    level = level + 1;
    const currentLevel = levels[level];


    if (level == 0) {
    addText("To reset press j", { y: 4, color: color`H` });
  }
    
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("Game Over!", { y: 4, color: color`3` });
      addText("Thanks for playing", { y: 6, color: color`3` });
    }
  }
});
