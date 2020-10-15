import React from 'react'
import Sketch from 'react-p5'

class MathNumber{

    constructor(x, y, character, textSize, color, canvasWidth, canvasHeight, directionDown=true, directionRight=true){
        this.x = x
        this.y = y
        this.color = color
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.directionDown = directionDown
        this.directionRight = directionRight
        this.targetSize = textSize
        this.textSize = textSize
        this.character = character
        this.width = 0
        this.xMovement = (Math.random() * 5) + 0.5
        this.yMovement = (Math.random() * 5) + 0.5
    }

    render(p5){
        p5.text(this.character, this.x, this.y).fill(this.color).stroke(this.color).textSize(this.textSize).textAlign('center', 'center').textFont('Burbank Big Cd Bk')
        this.width = p5.textWidth(this.character)


        if(this.x - this.width/2 <= 0){
            this.directionRight = true
        }else if(this.x + this.width/2 >= this.canvasWidth){
            this.directionRight = false
        }
        
        if(this.y - this.textSize/2 <= 0){
            this.directionDown = true
        }else if(this.y + this.textSize/2 >= this.canvasHeight){
            this.directionDown = false
        }

        if(this.directionRight){
            this.x+= this.xMovement;
        }else{
            this.x-= this.xMovement;
        }
        if(this.directionDown){
            this.y+= this.yMovement
        }else{
            this.y-= this.yMovement
        }

        let dx = this.targetSize - this.textSize
        this.textSize += dx * 0.05
    }
    scale(times){
        if(this.targetSize <= this.canvasWidth && this.targetSize <= this.canvasHeight && this.targetSize <= 300){
            this.targetSize = this.textSize * times
        }
    }
}

const BackgroundCanvas = () => {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    const number1 = new MathNumber(Math.floor(Math.random() * (canvasWidth + 1)), Math.floor(Math.random() * (canvasHeight + 1)), 1, 60, '#2A095F', canvasWidth, canvasHeight, false, false)
    const number2 = new MathNumber(Math.floor(Math.random() * (canvasWidth + 1)), Math.floor(Math.random() * (canvasHeight + 1)), 200, 70, '#3D02BD', canvasWidth, canvasHeight, false, false)
    const number3 = new MathNumber(Math.floor(Math.random() * (canvasWidth + 1)), Math.floor(Math.random() * (canvasHeight + 1)), 5, 50, '#E25BFF', canvasWidth, canvasHeight)
    const number4 = new MathNumber(Math.floor(Math.random() * (canvasWidth + 1)), Math.floor(Math.random() * (canvasHeight + 1)), -10, 100, '#DDB1FF', canvasWidth, canvasHeight)
    const number5 = new MathNumber(Math.floor(Math.random() * (canvasWidth + 1)), Math.floor(Math.random() * (canvasHeight + 1)), 25, 40, '#FBEFFF', canvasWidth, canvasHeight)
    const number6 = new MathNumber(Math.floor(Math.random() * (canvasWidth + 1)), Math.floor(Math.random() * (canvasHeight + 1)), 0, 90, '#2A095F', canvasWidth, canvasHeight)
    const number7 = new MathNumber(Math.floor(Math.random() * (canvasWidth + 1)), Math.floor(Math.random() * (canvasHeight + 1)), 225, 110, '#DDB1FF', canvasWidth, canvasHeight, false, true)
    const number8 = new MathNumber(Math.floor(Math.random() * (canvasWidth + 1)), Math.floor(Math.random() * (canvasHeight + 1)), 9, 75, '#E25BFF', canvasWidth, canvasHeight, false)
    const number9 = new MathNumber(Math.floor(Math.random() * (canvasWidth + 1)), Math.floor(Math.random() * (canvasHeight + 1)), 57, 60, '#3D02BD', canvasWidth, canvasHeight, true, false)
    const number10 = new MathNumber(Math.floor(Math.random() * (canvasWidth + 1)), Math.floor(Math.random() * (canvasHeight + 1)), 11, 250, '#2A095F', canvasWidth, canvasHeight, false)
    
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    }
    
    const draw = (p5) => {
        p5.background('#E5E5FF');
        number1.render(p5)
        number2.render(p5)
        number3.render(p5)
        number4.render(p5)
        number5.render(p5)
        number6.render(p5)
        number7.render(p5)
        number8.render(p5)
        number9.render(p5)
        number10.render(p5)
    };

    function mouseClicked(){
        number1.scale(1.5)  
        number2.scale(1.5)  
        number3.scale(1.5)  
        number4.scale(1.5)  
        number5.scale(1.5)  
        number6.scale(1.5)  
        number7.scale(1.5)  
        number8.scale(1.5)  
        number9.scale(1.5)  
        number10.scale(1.5)  
    }

    return(
        <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked}/>
    )
}

export default BackgroundCanvas