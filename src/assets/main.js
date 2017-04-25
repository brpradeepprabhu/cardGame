var totalplayers = 2;
var startX = 20;
var stage, canvas, preload, allCards, queue;
var players = [];

function init() {
  'use strict';
  canvas = document.getElementById('cardGame');
  stage = new createjs.Stage(canvas);
  queue = new createjs.LoadQueue();
  queue.on('complete', handleComplete);
  queue.loadManifest([{
      "id": "1",
      "src": "assets/images/1.png"
    },
    {
      "id": "2",
      "src": "assets/images/2.png"
    },
    {
      "id": "3",
      "src": "assets/images/3.png"
    },
    {
      "id": "4",
      "src": "assets/images/4.png"
    },
    {
      "id": "5",
      "src": "assets/images/5.png"
    },
    {
      "id": "6",
      "src": "assets/images/6.png"
    },
    {
      "id": "7",
      "src": "assets/images/7.png"
    },
    {
      "id": "8",
      "src": "assets/images/8.png"
    },
    {
      "id": "9",
      "src": "assets/images/9.png"
    },
    {
      "id": "10",
      "src": "assets/images/10.png"
    },
    {
      "id": "11",
      "src": "assets/images/11.png"
    },
    {
      "id": "12",
      "src": "assets/images/12.png"
    },
    {
      "id": "13",
      "src": "assets/images/13.png"
    },
    {
      "id": "14",
      "src": "assets/images/14.png"
    },
    {
      "id": "15",
      "src": "assets/images/15.png"
    },
    {
      "id": "16",
      "src": "assets/images/16.png"
    },
    {
      "id": "17",
      "src": "assets/images/17.png"
    },
    {
      "id": "18",
      "src": "assets/images/18.png"
    },
    {
      "id": "19",
      "src": "assets/images/19.png"
    },
    {
      "id": "20",
      "src": "assets/images/20.png"
    },
    {
      "id": "21",
      "src": "assets/images/21.png"
    },
    {
      "id": "22",
      "src": "assets/images/22.png"
    },
    {
      "id": "23",
      "src": "assets/images/23.png"
    },
    {
      "id": "24",
      "src": "assets/images/24.png"
    },
    {
      "id": "25",
      "src": "assets/images/25.png"
    },
    {
      "id": "26",
      "src": "assets/images/26.png"
    },
    {
      "id": "27",
      "src": "assets/images/27.png"
    },
    {
      "id": "28",
      "src": "assets/images/28.png"
    },
    {
      "id": "29",
      "src": "assets/images/29.png"
    },
    {
      "id": "30",
      "src": "assets/images/30.png"
    },
    {
      "id": "31",
      "src": "assets/images/31.png"
    },
    {
      "id": "32",
      "src": "assets/images/32.png"
    },
    {
      "id": "33",
      "src": "assets/images/33.png"
    },
    {
      "id": "34",
      "src": "assets/images/34.png"
    },
    {
      "id": "35",
      "src": "assets/images/35.png"
    },
    {
      "id": "36",
      "src": "assets/images/36.png"
    },
    {
      "id": "37",
      "src": "assets/images/37.png"
    },
    {
      "id": "38",
      "src": "assets/images/38.png"
    },
    {
      "id": "39",
      "src": "assets/images/39.png"
    },
    {
      "id": "40",
      "src": "assets/images/40.png"
    },
    {
      "id": "41",
      "src": "assets/images/41.png"
    },
    {
      "id": "42",
      "src": "assets/images/42.png"
    },
    {
      "id": "43",
      "src": "assets/images/43.png"
    },
    {
      "id": "44",
      "src": "assets/images/44.png"
    },
    {
      "id": "45",
      "src": "assets/images/45.png"
    },
    {
      "id": "46",
      "src": "assets/images/46.png"
    },
    {
      "id": "47",
      "src": "assets/images/47.png"
    },
    {
      "id": "48",
      "src": "assets/images/48.png"
    },
    {
      "id": "49",
      "src": "assets/images/49.png"
    },
    {
      "id": "50",
      "src": "assets/images/50.png"
    },
    {
      "id": "51",
      "src": "assets/images/51.png"
    },
    {
      "id": "52",
      "src": "assets/images/52.png"
    },
    {
      "id": "card game",
      "src": "assets/images/card game.png"
    }
  ]);
  createjs.Ticker.addEventListener('tick', stage);
}

function handleComplete(e) {
  "use stict";
  var card = queue.getResult("card game");
  var bitmap = new createjs.Bitmap(card);
  bitmap.x = 0;
  bitmap.y = stage.canvas.height / 2 - card.height / 2;
  stage.addChild(bitmap);
  for (var i = 0; i < totalplayers; i++) {
    var eachPerson = [];
    players.push(eachPerson);
  }
  shuffleArray();
}

function shuffleArray() {
  var defaultArray = [];
  var shuffledArray = [];
  for (var i = 0; i <= 52; i++) {
    defaultArray.push(i);
  }
  var count = 0;
  var personCount = 0;
  while (count < 52) {
    var indexValue = Math.floor(Math.random() * (defaultArray.length - 1)) + 1;
    shuffledArray.push(defaultArray[indexValue])
    players[personCount].push(defaultArray[indexValue])
    defaultArray.splice(indexValue, 1)
    personCount += 1;

    if (personCount == totalplayers) {
      personCount = 0;
    }
    count += 1;
  }
  showCardsToPlayer();

}
var playerContainer, oppsitePlayer;

function showCardsToPlayer() {
  var i, 
  playerContainer = new createjs.Container();
  oppsitePlayer = new createjs.Container();
  stage.addChild(playerContainer,oppsitePlayer);
  for (i = 0; i < players.length; i += 1) {
    players[i].sort(function (a, b) {
      return a - b
    });
  }
  createPlayerCard();
  otherPlayerCard();  
  var indexOf = players[0].indexOf(40)
  if(indexOf>0)
  {
    console.log("you want to shred the card")
  }
  else
  {

  }
}
function createPlayerCard()
{
  var i,images, bitmap;
  for (i = 0; i < players[0].length; i += 1) {
    var images = queue.getResult(players[0][i].toString())
    var bitmap = new createjs.Bitmap(images)
    bitmap.x = startX * i;
    bitmap.name = i;
    playerContainer.addChild(bitmap);
    playerContainer.y = stage.canvas.height - images.height - 25;
    playerContainer.x = ((stage.canvas.width / 2) - (playerContainer.getBounds().width / 2));

  }
}
function otherPlayerCard()
{
 var i, j,images, bitmap;
  for (j = 1; j < players.length; j += 1) {
    for (i = 0; i < players[j].length; i += 1) {
       images = queue.getResult(players[j][i].toString())
       bitmap = new createjs.Bitmap(images)
      bitmap.x = startX * i;
       bitmap.name = i;
      oppsitePlayer.addChild(bitmap);
      oppsitePlayer.y = 25;
      oppsitePlayer.x = ((stage.canvas.width / 2) - (oppsitePlayer.getBounds().width / 2));

    }
  }
}