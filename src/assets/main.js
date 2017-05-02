var totalplayers = 4;
var startX = 35;
var stage, canvas, preload, allCards, queue;
var players = [];
var cardShreddingContainer, aspectRatio;
var playerContainer, oppositePlayer;
var playerCard, oppositeCard = [];
var oppositePlayed = 0;
var hitted = false,
  hittedBy = "";

function init() {
  canvas = document.getElementById('cardGame');
  stage = new createjs.Stage(canvas);
  queue = new createjs.LoadQueue(false);
  stage.canvas.width = window.innerWidth;
  stage.canvas.height = window.innerHeight;
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
  canvas.style.display = "block";
  oppositePlayed = 0;
  hitted = false;
  hittedBy = "";
  cardShreddingContainer = new createjs.Container();
  playerContainer = new createjs.Container();
  stage.addChild(playerContainer);
  aspectRatio = window.innerWidth / 1024
  aspectRatio = aspectRatio > 1 ? 1 : aspectRatio;
  oppositePlayer = [];
  for (var i = 1; i < totalplayers; i++) {
    var oppositeContainer = new createjs.Container();
    stage.addChild(oppositeContainer);
    oppositePlayer.push(oppositeContainer);
  }
  stage.addChild(cardShreddingContainer);
  var card = queue.getResult("card game");
  var bitmap = new createjs.Bitmap(card);
  bitmap.x = 300 * aspectRatio;
  bitmap.scaleX = bitmap.scaleY = aspectRatio;
  bitmap.y = (stage.canvas.height / 2 - card.height / 2) + (25 * aspectRatio);
  stage.addChild(bitmap);
  players = [];
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
    players[totalplayers-2]=[];
  }
  showCardsToPlayer();

}


function showCardsToPlayer() {
  var i, indexOf;
  for (i = 0; i < players.length; i += 1) {
    players[i].sort(function (a, b) {
      return a - b
    });
  }
  createPlayerCard();
  otherPlayerCard();
  indexOf = players[0].indexOf(13)
  if (indexOf > 0) {
    userPlayCard(null)
  } else {
    for (i = 1; i < players.length; i += 1) {
      indexOf = players[i].indexOf(13)
      if (indexOf > 0) {
        console.log("calling from showcards ")
        oppositionPlayCard(null, i)
        break;
      }
    }
  }
}

function createPlayerCard() {
  var i, images, bitmap;
  var min, max;
  playerContainer.removeAllChildren();
  for (i = 0; i < players[0].length; i += 1) {
    var images = queue.getResult(players[0][i].toString())
    var bitmap = new createjs.Bitmap(images)
    bitmap.x = startX * i * aspectRatio;
    bitmap.name = i;
    bitmap.data = players[0][i];
    bitmap.scaleX = bitmap.scaleY = aspectRatio;
    playerContainer.addChild(bitmap);
    playerContainer.y = (stage.canvas.height - (images.height * aspectRatio)) - 25;
    playerContainer.x = ((stage.canvas.width / 2) - (playerContainer.getBounds().width / 2)) * aspectRatio;
  }

}

function otherPlayerCard() {
  var i, j, images, bitmap;
  for (i = 0; i < oppositePlayer.length; i++) {
    oppositePlayer[i].removeAllChildren();
  }
  for (j = 0; j < oppositePlayer.length; j += 1) {
    for (i = 0; i < players[j + 1].length; i += 1) {
      images = queue.getResult("card game");
      bitmap = new createjs.Bitmap(images)
      bitmap.name = i;
      bitmap.scaleX = bitmap.scaleY = aspectRatio;
      bitmap.data = players[j + 1][i];
      oppositePlayer[j].addChild(bitmap);
      if (j == 1) {
        bitmap.x = startX * i * aspectRatio;
        oppositePlayer[j].y = 25 * aspectRatio;
        oppositePlayer[j].x = ((stage.canvas.width / 2) - (oppositePlayer[j].getBounds().width / 2)) * aspectRatio;
      } else if (j == 2) {
        bitmap.y = startX / 2 * i * aspectRatio;
        bitmap.rotation = 90;
        bitmap.regX = images.width / 2;
        bitmap.regY = images.height / 2;
        oppositePlayer[j].x = stage.canvas.width - 100;
        oppositePlayer[j].y = ((stage.canvas.height / 2) - (oppositePlayer[j].getBounds().height / 2)) * aspectRatio;
      } else {
        bitmap.y = startX / 2 * i * aspectRatio;
        bitmap.rotation = 90;
        bitmap.regX = images.width / 2;
        bitmap.regY = images.height / 2;
        oppositePlayer[j].x = 100 * aspectRatio;
        oppositePlayer[j].y = ((stage.canvas.height / 2) - (oppositePlayer[j].getBounds().height / 2)) * aspectRatio;
      }
    }
  }
}

function oppositionPlayCard(value, playerPosition) {
  //playerContainer.alpha = 0.1;
  var min, max;
  try {
    if (players[playerPosition].length >= 1) {
      if (value == null) {
        if (hitted == false) {
          console.log("cleared")
          oppositeCard.splice(0, oppositeCard.length);
        }
        var random;
        if (players[playerPosition].length > 1) {
          random = Math.floor(Math.random() * (players[playerPosition].length - 1)) + 1;
        } else {
          random = 0;
        }

        var target = oppositePlayer[playerPosition - 1].getChildByName(random);

        var images = queue.getResult(target.data.toString())
        var cardName = new createjs.Bitmap(images)
        cardName.name = target.name;

        cardShreddingContainer.addChild(cardName);
        cardName.data = target.data;
        cardName.regX = cardName.image.width / 2;
        cardName.regY = cardName.image.height / 2;
        cardName.x = stage.canvas.width / 2;
        cardName.y = stage.canvas.height / 2;
        cardName.rotation = Math.random() * 360;
        cardName.scaleX = cardName.scaleY = aspectRatio;
        oppositePlayer[playerPosition - 1].removeChildAt(random);
        oppositeCard[playerPosition] = target.data;
        console.log("target.data first", target.data, oppositeCard)
        players[playerPosition].splice(random, 1)
        if (hitted == false) {
          oppositePlayed = 1;
          if (playerPosition == oppositePlayer.length) {
            userPlayCard(cardName.data);
          } else {
            console.log("calling from oppositionPlayCard inside if condition ")
            oppositionPlayCard(cardName.data, playerPosition + 1);
          }
        } else {
          setTimeout(function () {
            validateNextCardShredding();
          }, 2000)
        }
      } else {
        if ((value >= 1) && (value <= 13)) {
          min = 1;
          max = 13
        } else if ((value >= 14) && (value <= 26)) {
          min = 14;
          max = 26;
        } else if ((value >= 27) && (value <= 39)) {
          min = 27;
          max = 39
        } else {
          min = 40;
          max = 52;
        }
        var filterArray = players[playerPosition].filter(function (a, b) {
          return a >= min && a <= max
        });
        if (filterArray.length > 0) {
          var random, filterRandom;
          if (filterArray.length > 1) {
            filterRandom = Math.floor(Math.random() * (filterArray.length - 1)) + 1;
          } else {
            filterRandom = 0;
          }
          random = players[playerPosition].indexOf(filterArray[filterRandom])
          players[playerPosition].splice(random, 1);
          var target = oppositePlayer[playerPosition - 1].getChildByName(random);
          var images = queue.getResult(target.data.toString())
          var cardName = new createjs.Bitmap(images);
          cardShreddingContainer.addChild(cardName);
          cardName.data = target.data;
          cardName.regX = cardName.image.width / 2;
          cardName.regY = cardName.image.height / 2;
          cardName.x = stage.canvas.width / 2 + (50 * aspectRatio * oppositePlayed);
          cardName.y = stage.canvas.height / 2;
          cardName.scaleX = cardName.scaleY = aspectRatio;
          cardName.rotation = Math.random() * 360;

          oppositeCard[playerPosition] = target.data;
          console.log("target.data n", target.data, oppositeCard)
          oppositePlayer[playerPosition - 1].removeChildAt(random);
          oppositePlayed += 1;

          if (oppositePlayed == totalplayers) {
            setTimeout(function () {
              validateNextCardShredding();
            }, 2000)
          } else {
            if (playerPosition == oppositePlayer.length) {
              userPlayCard(cardName.data);
            } else {
              console.log("calling from oppositionPlayCard inside else condition ")
              oppositionPlayCard(cardName.data, playerPosition + 1);
            }
          }
        } else {
          hitted = true;
          hittedBy = playerPosition.toString();
          console.log("calling from oppositionPlayCard inside else condition hitting ")
          oppositionPlayCard(null, playerPosition)
        }

      }
    } else {
      oppositeCard[playerPosition] = 0;
      oppositePlayed += 1;
      if (oppositePlayed == totalplayers) {
        setTimeout(function () {
          validateNextCardShredding();
        }, 2000)
      } else {
        var data = 0;
        if (playerCard == 0) {
          for (var i = 0; i < oppositeCard.length; i++) {
            if ((oppositeCard[i] != undefined) && (oppositeCard[i] != 0)) {
              data = oppositeCard[i];
            }
          }
        }
        else { data = playerCard}
        if (playerPosition == oppositePlayer.length) {
          if (data != 0) {
            userPlayCard(data);
          } else {
            userPlayCard(null)
          }
        } else {
          if (data != 0) {
            console.log("calling from oppositionPlayCard inside if condition card empty before ")
            oppositionPlayCard(data, playerPosition + 1);
          } else {
            onsole.log("calling from oppositionPlayCard inside if condition card empty before ")
            oppositionPlayCard(null, playerPosition + 1);
          }

        }
      }
    }
  } catch (e) {
    console.error(e)
  }
  otherPlayerCard();

}

function userPlayCard(value) {
  playerContainer.alpha = 1;
  if (value == null) {
    if (hitted == false) {

      oppositeCard.splice(0, oppositeCard.length);
      console.log("cleared player", oppositeCard)
    }
    for (var i = 0; i < playerContainer.numChildren; i++) {
      var cardName = playerContainer.getChildAt(i);
      cardName.addEventListener("click", cardClicked);
    }
  } else {

    if ((value >= 1) && (value <= 13)) {
      min = 1;
      max = 13
    } else if ((value >= 14) && (value <= 26)) {
      min = 14;
      max = 26;
    } else if ((value >= 27) && (value <= 39)) {
      min = 27;
      max = 39
    } else {
      min = 40;
      max = 52;
    }
    var filterArray = players[0].filter(function (a, b) {
      return a >= min && a <= max
    });
    if (filterArray.length > 0) {
      for (var i = 0; i < filterArray.length; i++) {
        var random = players[0].indexOf(filterArray[i])
        var cardName = playerContainer.getChildByName(random);
        cardName.addEventListener("click", cardClicked);
      }
    } else {
      hitted = true;
      hittedBy = "player";
      for (var i = 0; i < playerContainer.numChildren; i++) {
        var cardName = playerContainer.getChildAt(i);
        cardName.addEventListener("click", cardClicked);
      }
    }
  }
}


function cardClicked(e) {
  for (var i = 0; i < playerContainer.numChildren; i++) {
    var cardName = playerContainer.getChildAt(i);
    cardName.removeEventListener("click", cardClicked);
  }
  var cardName = e.currentTarget;
  cardName.regX = cardName.image.width / 2;
  cardName.regY = cardName.image.height / 2;
  createjs.Tween.get(cardName).to({
    x: stage.canvas.width / 2 - playerContainer.x,
    y: stage.canvas.height / 2 - playerContainer.y,
    rotation: Math.random() * 180
  }, 300).call(createjs.proxy(userCardAnimated, this, cardName));
  stage.setChildIndex(playerContainer, 3);
}

function userCardAnimated(e, card) {
  var cardName = card.clone();
  var random = card.name;
  players[0].splice(random, 1);
  playerContainer.removeChildAt(random);
  cardName.regX = cardName.image.width / 2;
  cardName.regY = cardName.image.height / 2;
  cardName.data = card.data;
  cardName.x = stage.canvas.width / 2 + (50 * aspectRatio * oppositePlayed);
  cardName.y = stage.canvas.height / 2;
  cardName.scaleX = cardName.scaleY = aspectRatio;
  cardShreddingContainer.addChild(cardName);
  playerCard = cardName.data;
  stage.setChildIndex(playerContainer, 0);
  if (oppositePlayed == 0) {
    oppositePlayed = 1;
    oppositionPlayCard(card.data, 1);
  } else {
    if (hitted == false) {
      oppositePlayed += 1;
      if (oppositePlayed < totalplayers) {
        oppositionPlayCard(card.data, 1);
      } else {
        setTimeout(function () {
          validateNextCardShredding();
        }, 2000)
      }
    } else {
      setTimeout(function () {
        validateNextCardShredding();
      }, 2000)
    }
  }
  createPlayerCard();
}

function shaddingCardsAndNextRound() {
  var d = oppositeCard.slice();
  d.splice(0, 1)

  var largest = Math.max.apply(Math, d);
  console.log(playerCard,"shradding",largest);
  if (playerCard > largest) {
    setTimeout(function () {
      userPlayCard(null);
    }, 200);

  } else {
    
    var indexof = oppositeCard.indexOf(largest)
      console.log("index of shradding",indexof);
    oppositeCard = [];
    otherPlayerCard();
    setTimeout(function () {
      console.log("calling from shaddingCardsAndNextRound ")
      oppositionPlayCard(null, indexof);
    }, 2000);


  }
}

function validateNextCardShredding() {
  oppositePlayed = 0;
  console.log("hitted", hitted);
  console.log("playercard", playerCard, oppositeCard[1], oppositeCard[2], oppositeCard[3])
  cardShreddingContainer.removeAllChildren();
  if (hitted == false) {
    shaddingCardsAndNextRound();
  } else {
    hitted = false;
    if (hittedBy == "player") {
      hittedByPlayer();
    } else {
      whoHitted();
    }
    hittedBy = "";
  }
  playerCard = 0;
  checkWhoWon();

}

function checkWhoWon() {
  if (players[0].length == 0) {
    canvas.style.display = "none";
    document.getElementById("result").innerHTML = "you won :)";
  }
  var count = 0;
  for (var i = 1; i < totalplayers; i++) {
    if (players[i].length == 0) {
      count++;
    }
  }
  if (count == totalplayers-1) {
    canvas.style.display = "none";
    document.getElementById("result").innerHTML = "you lose :(";
  }
  // if (players[1].length == 0) {
  //   canvas.style.display = "none";
  //   document.getElementById("result").innerHTML = "you lose :(";
  // }
  // if (totalplayers >= 3) {
  //   if (players[2].length == 0) {
  //     canvas.style.display = "none";
  //     document.getElementById("result").innerHTML = "you lose :(";
  //   }
  // }
  // if (totalplayers == 4) {
  //   if (players[3].length == 0) {
  //     canvas.style.display = "none";
  //     document.getElementById("result").innerHTML = "you lose :(";
  //   }
  // }
}

function hittedByPlayer() {
  var d = oppositeCard.slice();
  d.splice(0, 1);
  for (var m = 0; m < d.length; m++) {
    if (d[m] == undefined) {
      d[m] = 0;
    }
  }
  var largest;
  largest = Math.max.apply(Math, d);
  var indexof = oppositeCard.indexOf(largest);
  console.log("************ hitted by player", oppositeCard, "***", indexof)
  for (var i = 0; i < oppositeCard.length; i++) {
    if (oppositeCard[i] != undefined) {
      if (oppositeCard[i] != 0) {
        players[indexof].push(oppositeCard[i]);
      }
    }
  }
  if (playerCard != undefined) {
    if (playerCard != 0) {
      players[indexof].push(playerCard);
    }
  }
  players[indexof].sort(function (a, b) {
    return a - b
  });
  console.log("*** p", players[indexof])

  otherPlayerCard();
  playerCard = 0;
  oppositeCard = [];
  setTimeout(function () {
    console.log("calling from hitted by players ")
    oppositionPlayCard(null, indexof);
  }, 2000);
}

function whoHitted() {
  var e = oppositeCard.slice();
  e.splice(hittedBy, 1);
  e.splice(0, 1);
  var count = 0;
  for (var m = 0; m < e.length; m++) {
    if (e[m] != undefined) {
      count++;
    }
  }
  for (var m = 0; m < e.length; m++) {
    if (e[m] == undefined) {
      e[m] = 0;
    }
  }
  var largest = Math.max.apply(Math, e);
  var indexof = oppositeCard.indexOf(largest)
  console.log("hitted by somone", indexof)
  if ((playerCard > oppositeCard[indexof]) || (indexof == -1)) {
    for (var m = 0; m < oppositeCard.length; m++) {
      if (oppositeCard[m] != undefined) {
        if (oppositeCard[m] != 0) {
          players[0].push(oppositeCard[m]);
        }
      }
    }
    if (playerCard != undefined) {
      if (playerCard != 0) {
        players[0].push(playerCard);
      }
    }
    players[0].sort(function (a, b) {
      return a - b
    })
    createPlayerCard();
    playerCard = 0;
    oppositeCard = [];
    setTimeout(function () {
      userPlayCard(null);
    }, 200);

  } else {
    console.log("************", oppositeCard)
    for (var m = 0; m < oppositeCard.length; m++) {
      if (oppositeCard[m] != undefined) {
        if (oppositeCard[m] != 0) {
          players[indexof].push(oppositeCard[m]);
        }
      }
    }
    if (playerCard != undefined) {
      if (playerCard != 0) {
        players[indexof].push(playerCard);
      }
    }
    players[indexof].sort(function (a, b) {
      return a - b
    })
    console.log("--------------------------target indexof", players[indexof])
    playerCard = 0;
    oppositeCard = [];
    otherPlayerCard();
    setTimeout(function () {
      console.log("calling from hitted by some one ")
      oppositionPlayCard(null, indexof);
    }, 2000);
  }



  // }

}

function replayGame() {
  stage.removeAllChildren();
  handleComplete();
}