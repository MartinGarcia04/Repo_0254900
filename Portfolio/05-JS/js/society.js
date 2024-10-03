var myGamePiece = new Array();
var happySrc = "images/smiley.gif";
var sadSrc = "images/angry.gif";
var maxDist = 5;  // Distance for interaction

var myGameArea = {
  timer: 0,
  running: true,
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.context = this.canvas.getContext("2d");
    this.context.font = "12px serif";
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function flatlander(width, height, x, y, isHappy) {
  this.image = new Image();
  this.isHappy = isHappy;
  this.happyPoints = isHappy ? 1 : 0;
  this.image.src = isHappy ? happySrc : sadSrc;
  this.width = width;
  this.height = height;
  this.speedX = (Math.random() * 100) % 6;
  this.speedY = (Math.random() * 100) % 6;
  this.x = x;
  this.y = y;

  // Update position
  this.update = function () {
    let ctx = myGameArea.context;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.fillText(this.happyPoints.toFixed(2), this.x, this.y + 40);  // Display happiness points
  };

  // New position logic with bounce back
  this.newPos = function (canvasWidth, canvasHeight) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x <= 0 || this.x + this.width >= canvasWidth) {
      this.speedX = -this.speedX;
    }
    if (this.y <= 0 || this.y + this.height >= canvasHeight) {
      this.speedY = -this.speedY;
    }
  };

  // Increase happiness
  this.moreHappy = function () {
    this.happyPoints += 0.1;  // Increment happiness points
    if (this.happyPoints > 1) {
      this.isHappy = true;
      this.image.src = happySrc;  // Become happy
    }
  };

  // Decrease happiness
  this.lessHappy = function () {
    this.happyPoints -= 0.1;  // Decrement happiness points
    if (this.happyPoints < 0) {
      this.isHappy = false;
      this.image.src = sadSrc;  // Become sad
    }
  };

  // Calculate the distance between two individuals
  this.checkSurroundings = function (other) {
    var x = Math.pow(this.x - other.x, 2);
    var y = Math.pow(this.y - other.y, 2);
    return Math.sqrt(x + y);
  };
}

function startGame() {
  var n = document.getElementById("totalIndividuals").value; // Total number of individuals
  var m = document.getElementById("sadIndividuals").value;   // Number of sad individuals

  if (parseInt(m) > parseInt(n)) {
    window.alert("Cannot have more sad individuals than total.");
    return;
  }

  var sad = 0;
  for (i = 0; i < n; i++) {
    var nX = (Math.random() * 10000) % myGameArea.canvas.width;
    var nY = (Math.random() * 10000) % myGameArea.canvas.height;
    var isSad = ++sad > m;
    var gamePiece = new flatlander(30, 30, nX, nY, !isSad);
    myGamePiece.push(gamePiece);
  }

  myGameArea.start();
}

function updateGameArea() {
  if (myGameArea.running) {
    myGameArea.clear();
    for (i = 0; i < myGamePiece.length; i++) {
      myGamePiece[i].newPos(myGameArea.canvas.width, myGameArea.canvas.height);
      myGamePiece[i].update();
    }

    var tmpFocus, d;
    var happy = 0;
    var sad = 0;

    // Check surroundings and update happiness
    for (i = 0; i < myGamePiece.length; i++) {
      tmpFocus = myGamePiece[i];
      for (j = i + 1; j < myGamePiece.length; j++) {
        d = tmpFocus.checkSurroundings(myGamePiece[j]);
        if (d < maxDist) {
          if (myGamePiece[j].isHappy) {
            tmpFocus.moreHappy();  // Interact with a happy individual
          } else {
            tmpFocus.lessHappy();  // Interact with a sad individual
          }
        }
      }
      if (tmpFocus.isHappy) {
        happy++;
      } else {
        sad++;
      }
    }

    myGameArea.timer++;
    document.getElementById("happyIndividuals").textContent = "Happy: " + happy;
    document.getElementById("sadIndividuals").textContent = "Sad: " + sad;
  } else return;

  if (happy === 0 || sad === 0) {
    var msg;
    myGameArea.running = false;
    if (happy == 0) msg = "Absolute sadness.... SAD!";
    else msg = "Absolute happiness reached.... Hurray!!";
    document.getElementById("timer").textContent =
      "Time: " + myGameArea.timer + "       " + msg;
  } else {
    document.getElementById("timer").textContent = "Time: " + myGameArea.timer;
  }
}
