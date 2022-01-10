
//create a keypress Class for game Objects
class DirectionInput {
  constructor() {
    this.heldDirections = [];
    this.map = {
      "ArrowUp": "up",
      "KeyW": "up",
      "ArrowDown": "down",
      "KeyS": "down",
      "ArrowLeft": "left",
      "KeyA": "left",
      "ArrowRight": "right",
      "KeyD": "right",
    }
  }

  get direction() {
    //console.log(this.heldDirections[0])
    return this.heldDirections[0]
  }


  initKeys() {
    document.addEventListener("keydown", e => {
      //console.log(e.code);
      const dir = this.map[e.code]

      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
        console.log(this.heldDirections)
      }
    });
    document.addEventListener("keyup", e => {
      const dir = this.map[e.code];
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
        console.log(this.heldDirections)
      }
    })

  }
}


///Sprite
//Player animation
const imagesX = {}

imagesX.player = new Image();
imagesX.player.src = './assets/people/npc3.png'//'./assets/AdventurerSpriteSheetv1.1.png' //'./assets/cuphead.png'

// const playerWidth = '32';  //per sprite width px based on sheet
// const playerHeight = '32';     //per sprite height px based on sheet
// const playerWidthExt = 72;
// const playerHeightExt = 72;
// let playerFrameX = 3;            //which sprite in sprite sheet
// let playerFrameY = 0;            //which sprite in sprite sheet
// let playerX = 20;                  //position in canvas
// let playerY = 20;                  //position in canvas
// const playerSpeed = 6; 

// function animatePerson(facing){
//   console.log(facing)
//   if (facing = 'front'){
//     playerFrameY = 0; //front facing
//   }else{
//     playerFrameY = 2; 
//   }
//   //walking loop
//   //walking facefront
//   // let playerFrameY = 0; 
//   //   if (playerFrameX <3){
//   //     playerFrameX++;
//   //   }else playerFrameX = 0;

//   // walking backfacing
//   // let playerFrameY = 2; 
//   console.log(playerFrameY)
//     if (playerFrameX <3){
//       playerFrameX++;
//     }else playerFrameX = 0;

//   if (playerX < canvas_back.width + playerWidthExt) {
//     playerX += playerSpeed
//   }else playerX = 0 + playerWidthExt

//   drawSprite(imagesX.player, playerWidth * playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight, playerX, playerY, playerWidthExt, playerHeightExt);
//   }

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx_back.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}



// player object
class Player {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.color = 'green'

    this.playerWidth = '32';       //per sprite width px based on sheet
    this.playerHeight = '32';     //per sprite height px based on sheet
    this.playerWidthExt = 72;         //stretch the player size
    this.playerHeightExt = 72;        //stretch the player size
    this.playerFrameX = 3;            //which sprite in sprite sheet
    this.playerFrameY = 0;            //which sprite in sprite sheet
    this.faceAnimation = []           //contains facing of player

    this.directionUpdate = {
      "up": ['y', -5, 'back'],
      "down": ['y', 5, 'front'],
      "left": ['x', -5, 'left'],
      "right": ['x', 5, 'right'],
      "stay": ['x', 0, 'front'],

    }
  }

  updatePosition(inputKeys) {
    console.log(inputKeys)
    console.log(this.directionUpdate[inputKeys])
    const [axisProperty, changePixel, face] = this.directionUpdate[inputKeys || "stay"] // [key] : value pair //undefined if no or condition
    this[axisProperty] += changePixel //this.x += changePixel
    this.faceAnimation = face
    // console.log(this.faceAnimation)
    // console.log(axisProperty)
    // console.log(changePixel)

  }
  drawImg() {
    const x = this.x; // x coordinate
    const y = this.y; // y coordinate
    //ctx_back.drawImage(imgPerson, x, y, 30, 40); //wait till img loaded
    this.playerAnimateLoop(this.faceAnimation)

  }
  update(inputKeys) {
    this.updatePosition(inputKeys)
    this.drawImg()

  }

  playerAnimateLoop(facing) {
    console.log(facing)
    switch (facing) {

      case 'front':             //front facing
        this.playerFrameY = 0;
        break
      case 'right':
        this.playerFrameY = 1; //right facing
        break
      case 'back':
        this.playerFrameY = 2; //back facing
        break
      case 'left':
        this.playerFrameY = 3; //left facing
        break
    }
    console.log(this.playerFrameY)

    if (this.playerFrameX < 3) {
      this.playerFrameX++;            //loop throgh x-axis sprite
    } else this.playerFrameX = 0;

    // if (this.playerX < canvas_back.width + this.playerWidthExt) {
    //   this.playerX += this.playerSpeed
    // }else this.playerX = 0 + this.playerWidthExt

    //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    //drawSprite(imagesX.player, this.playerWidth * this.playerFrameX, this.playerHeight * this.playerFrameY, this.playerWidth, this.playerHeight, this.playerX, this.playerY, this.playerWidthExt, this.playerHeightExt);
    drawSprite(imagesX.player, this.playerWidth * this.playerFrameX, this.playerHeight * this.playerFrameY, this.playerWidth, this.playerHeight, this.x, this.y, this.playerWidthExt, this.playerHeightExt);
  }

  draw() {
    ctx_back.beginPath()
    const x = this.x; // x coordinate
    const y = this.y; // y coordinate
    const radius = this.radius; // Arc radius
    const startAngle = Math.PI * 0; // Starting point on circle //0 is at right horizontal
    const endAngle = Math.PI * 2; // End point on circle
    const counterclockwise = false;
    ctx_back.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    ctx_back.stroke()
  }
}

let imagesZom = [];
let imagesZomL = [];
//imagesZom.length =10;
//console.log(imagesZom.length)

//push images in //Right facing
let k = 1
for (let k = 1; k <= 10; k++) {
  console.log(imagesZom.length)
  imagesZom[k] = new Image();
  imagesZom[k].onload = () => {
    isLoaded = true;
    console.log(isLoaded)
  }
  imagesZom[k].src = `./assets/zombie_male/Walk (${k.toString()}).png`
  //console.log(i)
  console.log(imagesZom[k].src)
}
//left facing
let g = 1
for (let g = 1; g <= 10; g++) {
  console.log(imagesZomL.length)
  imagesZomL[g] = new Image();
  imagesZomL[g].onload = () => {
    isLoaded = true;
    console.log(isLoaded)
  }
  imagesZomL[g].src = `./assets/zombie_male_left/Walk (${g.toString()}).png`
  //console.log(i)
  console.log(imagesZomL[g].src)
}

let j = 1 //for zombieLoop
let p = 1 //for zombieLoop
function drawSpriteZom(img, dX, dY, dW, dH) {
  ctx_back.drawImage(img, dX, dY, dW, dH);
}

class Zombies {
  constructor(x, y, radius) {
    let randomX = Math.floor(Math.random() * canvas_back.width)
    let randomY = Math.floor(Math.random() * canvas_back.height)
    this.x = randomX;
    this.y = randomY;
    this.radius = 10;
    this.velocity_y = ((player_.y - this.y) / 100);
    this.velocity_x = ((player_.x - this.x) / 100);
    this.color = 'green'
    this.zomWidthExt = 84;
    this.zomHeightExt = 84;
    this.speed = 3
  }

  speedMultiplier() {
    let dist_ = Math.hypot(player_.x - this.x, player_.y - this.y) //dist bet player and zombie
    let multiplier = this.speed / dist_ //distance is varying , speed is constant

    return multiplier

  }
  update() {
    this.y = this.y + this.speedMultiplier() * (player_.y - this.y)  //chasing player in y-axis
    this.x = this.x + this.speedMultiplier() * (player_.x - this.x)  //chasing player in x-axis
    this.zombieAnimateLoop()   //update image location


  }
  zombieAnimateLoop() {
    let zomX = this.x; // x coordinate
    let zomY = this.y; // y coordinate

    if (player_.x - this.x > 0) {
      if (j < 11) {
        //console.log(j)
        drawSpriteZom(imagesZom[j], zomX, zomY, this.zomWidthExt, this.zomHeightExt);
        //console.log(imagesZom[j])
        j++
      } else {
        j = 1
        drawSpriteZom(imagesZom[j], zomX, zomY, this.zomWidthExt, this.zomHeightExt);
      }
    } else {
      if (p < 11) {
        //console.log(p)
        drawSpriteZom(imagesZomL[p], zomX, zomY, this.zomWidthExt, this.zomHeightExt);
        //console.log(imagesZomL[p])
        p++
      } else {
        p = 1
        drawSpriteZom(imagesZomL[p], zomX, zomY, this.zomWidthExt, this.zomHeightExt);
      }

    }

  }
  //ctx_back.drawImage(imgZombie, x, y, 50, 50); //wait till img loaded //50,50 for size

}



console.log('working Objects')



