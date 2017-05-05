var totalplayers = 4;
var startX = 35;
var stage, canvas, preload, allCards, queue;
var players = [];
var cardShreddingContainer, aspectRatio;
var playerContainer, oppositePlayer;
var playerCard = 0,
  oppositeCard = [];
var oppositePlayed = 0;
var hitted = false,
  hittedBy = "";
var loadCount = 0;
var imagesArray = [],
  loadingCardImage;
createjs.proxy = function (method, scope) {
  var aArgs = Array.prototype.slice.call(arguments, 2);
  return function () {
    return method.apply(scope, Array.prototype.slice.call(arguments, 0).concat(aArgs));
  };
}

function init() {
  canvas = document.getElementById('cardGame');
  stage = new createjs.Stage(canvas);
  stage.canvas.width = 1024;
  stage.canvas.height = 768;
  loadingCardImage = new Image();
  loadingCardImage.src = "assets/images/card game.png";
  document.getElementById("animationContainer").appendChild(loadingCardImage);
  var scaleX = window.innerWidth / 1024;
  var scaleY = window.innerHeight / 768;
  loadingCardImage.onload = function (e) {
    imagesArray["card game"] = e.currentTarget;
    var cardWidth = 1024 / 2 - e.currentTarget.width / 2;
    var cardHeight = 768 / 2 - e.currentTarget.height / 2;
    loadingCardImage.style.position = "absolute";
    loadingCardImage.style.left = cardWidth + "px";
    loadingCardImage.style.top = cardHeight + "px";
    loadingCardImage.style.opacity = 0;
    loadImages();
  }
  // queue.loadManifest([

  //   {
  //     "id": "card game",
  //     "src": "assets/images/card game.png"
  //   }
  // ]);
  createjs.Ticker.addEventListener('tick', stage);
}

function loadImages() {
  for (var i = 1; i < 53; i++) {
    var loadImage = new Image()
    loadImage.src = "assets/images/" + i + ".png";
    loadImage.id = i;
    loadImage.onload = function (e) {
      imagesArray[e.currentTarget.id] = e.currentTarget;
      loadCount++;
      loadingCardImage.style.opacity = ((100 / 52) * loadCount) / 100;

      if (loadCount == 52) {
        var cssSelector = anime({
          targets: loadingCardImage,
          scale: 0,
          complete: createSpadeCard
        });
      }
    }
  }
}

function createSpadeCard() {
  var spadeCard = imagesArray[13];
  document.getElementById("animationContainer").appendChild(spadeCard);
  var cardWidth = 1024 / 2 - spadeCard.width / 2;
  var cardHeight = 768 / 2 - spadeCard.height / 2;
  spadeCard.style.position = "absolute";
  spadeCard.style.left = cardWidth + "px";
  spadeCard.style.top = cardHeight + "px";
  spadeCard.style.transform = "scale(0)";
  spadeCard.style.opacity = 0;

  var cssSelector = anime({
    targets: spadeCard,
    scale: 1,
    opacity: 1,
    complete: animateAll
  });
}

function animateAll() {
  for (var i = 1; i < 52; i++) {
    var spadeCard = imagesArray[i];
    document.getElementById("animationContainer").appendChild(spadeCard);
    var cardWidth = 1024 / 2 - spadeCard.width / 2;
    var cardHeight = 768 / 2 - spadeCard.height / 2;
    spadeCard.style.position = "absolute";
    spadeCard.style.left = cardWidth + "px";
    spadeCard.style.top = cardHeight + "px";
    var random = Math.floor(Math.random() * 2) + 1;
    if (random == 1) {
      anime({
        targets: spadeCard,
        opacity: 1,
        top: Math.floor(Math.random() * 768) + 1,
        left: Math.floor(Math.random() * 1024) + 1,
        duration: 3000,
        scale: 0
      });
    } else {
      anime({
        targets: spadeCard,
        opacity: 1,
        top: Math.floor(Math.random() * 768) + 1,
        left: Math.floor(Math.random() * 1024) + 1,
        duration: 3000,
        scale: 0
      });
    }
  }
  setTimeout(function () {
    handleComplete()
  }, 2000)
}

function handleComplete() {
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
  // var card = queue.getResult("card game");
  // var bitmap = new createjs.Bitmap(card);
  // bitmap.x = 300 * aspectRatio;
  // bitmap.scaleX = bitmap.scaleY = aspectRatio;
  // bitmap.y = (stage.canvas.height / 2 - card.height / 2) + (25 * aspectRatio);
  // stage.addChild(bitmap);
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
    var images = imagesArray[players[0][i]]
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
      images = imagesArray["card game"];
      bitmap = new createjs.Bitmap(images)
      bitmap.name = i;
      bitmap.scaleX = bitmap.scaleY = aspectRatio;
      bitmap.data = players[j + 1][i];
      oppositePlayer[j].addChild(bitmap);
      if (j == 1) {
        bitmap.x = startX / 2 * i * aspectRatio;
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

function oppositeCardPlayedNull(e, cardName, playerPosition) {
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
    }, 1000)
  }
}

function oppositeCardPlayed(e, cardName, playerPosition) {
  if (oppositePlayed == totalplayers) {
    setTimeout(function () {
      validateNextCardShredding();
    }, 1000)
  } else {
    if (playerPosition == oppositePlayer.length) {
      userPlayCard(cardName.data);
    } else {
      console.log("calling from oppositionPlayCard inside else condition ")
      oppositionPlayCard(cardName.data, playerPosition + 1);
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
          playerCard = 0;
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

        var images = imagesArray[target.data.toString()]
        var cardName = new createjs.Bitmap(images)
        cardName.name = target.name;
        cardShreddingContainer.addChild(cardName);
        cardName.data = target.data;
        cardName.regX = cardName.image.width / 2;
        cardName.regY = cardName.image.height / 2;
        cardName.x = target.x + oppositePlayer[playerPosition - 1].x;
        cardName.y = target.y + oppositePlayer[playerPosition - 1].y;
        cardName.rotation = Math.random() * 360;
        cardName.scaleX = cardName.scaleY = aspectRatio;
        oppositePlayer[playerPosition - 1].removeChildAt(random);
        oppositeCard[playerPosition] = target.data;
        console.log("target.data first", target.data, oppositeCard)
        players[playerPosition].splice(random, 1)
        createjs.Tween.get(cardName)
          .to({
            x: stage.canvas.width / 2 + (25 * aspectRatio * oppositePlayed),
            y: stage.canvas.height / 2
          }, 500)
          .call(createjs.proxy(oppositeCardPlayedNull, this, cardName, playerPosition));

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
          var images = imagesArray[target.data.toString()];
          var cardName = new createjs.Bitmap(images);
          cardShreddingContainer.addChild(cardName);
          cardName.data = target.data;
          cardName.regX = cardName.image.width / 2;
          cardName.regY = cardName.image.height / 2;
          cardName.x = target.x + oppositePlayer[playerPosition - 1].x;
          cardName.y = target.y + oppositePlayer[playerPosition - 1].y;
          cardName.scaleX = cardName.scaleY = aspectRatio;
          cardName.rotation = Math.random() * 360;
          oppositeCard[playerPosition] = target.data;
          console.log("target.data n", target.data, oppositeCard)
          oppositePlayer[playerPosition - 1].removeChildAt(random);
          oppositePlayed += 1;
          createjs.Tween.get(cardName)
            .to({
              x: stage.canvas.width / 2 + (25 * aspectRatio * oppositePlayed),
              y: stage.canvas.height / 2
            }, 500)
            .call(createjs.proxy(oppositeCardPlayed, this, cardName, playerPosition));
        } else {
          hitted = true;
          hittedBy = playerPosition.toString();
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
              console.log("card empty -- if", data)
              nextCardPlayerEmpty(data, playerPosition);
              break;
            }
          }
        } else {
          data = playerCard;
          nextCardPlayerEmpty(data, playerPosition);
        }
        console.log("card empty", data)

      }
    }
  } catch (e) {
    console.error(e)
  }
  otherPlayerCard();

}

function nextCardPlayerEmpty(data, playerPosition) {
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
  cardName.x = stage.canvas.width / 2 + (25 * aspectRatio * oppositePlayed);
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
        }, 1000)
      }
    } else {
      setTimeout(function () {
        validateNextCardShredding();
      }, 1000)
    }
  }
  createPlayerCard();
}

function shaddingCardsAndNextRound() {
  var d = oppositeCard.slice();
  d.splice(0, 1)

  var largest = Math.max.apply(Math, d);
  console.log(playerCard, "shradding", largest);
  if (playerCard > largest) {
    setTimeout(function () {
      userPlayCard(null);
    }, 200);

  } else {

    var indexof = oppositeCard.indexOf(largest)
    console.log("index of shradding", indexof);
    oppositeCard = [];
    otherPlayerCard();
    setTimeout(function () {
      console.log("calling from shaddingCardsAndNextRound ")
      oppositionPlayCard(null, indexof);
    }, 200);


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
  if (count == totalplayers - 1) {
    canvas.style.display = "none";
    document.getElementById("result").innerHTML = "you lose :(";
  }
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