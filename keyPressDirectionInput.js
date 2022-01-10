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
  