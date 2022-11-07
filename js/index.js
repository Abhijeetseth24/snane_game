//Game constrants and variable
let inputDir ={x:0,y:0};
const bg_sound=  new Audio ('bg song.mp3');
const food_sound=new Audio ('food.mp3');
const gameover_sound=new Audio ('game over.mp3');
const move_sound=new Audio ('move.mp3');
let speed=10;
let score=0;
let lastPaintTime=0;
let snakeArr=[{x: 13, y: 15}]
let food={x: 6, y: 7};

//Game functions
function main(ctime)
{
    window.requestAnimationFrame(main);
    
    if((ctime-lastPaintTime)/1000<1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    //If you bump into yourself
    for(let i=1; i<snakeArr.length; i++)
    {
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y)
        {
            return true;
        }
    }
    //If you bump into wall
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
        {
            return true;
        }
    return false;
}
 
function gameEngine()
{  

    //part1: Updating the snake array and food
    if (isCollide(snakeArr)) {
        gameover_sound.play();
        bg_sound.pause();
        inputDir ={x:0,y:0};
        alert('Game over, Press any key to play again!');
        snakeArr =[{x:13,y:15}];
        score=0;
    } 

     // If you have eaten thr food ,increment the food and regenerate the food
     if (snakeArr[0].x==food.x && snakeArr[0].y==food.y) {
        food_sound.play();
        score+=1;
        if (score>hiscoreval) {
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="hiscore: "+ hiscoreval;
        }
        scoreBox.innerHTML="Score:" + score;
        snakeArr.unshift({x:snakeArr[0].x +inputDir.x , y:snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()) ,y:Math.round(a+(b-a)*Math.random())};
    }

    //moving the snake
    for(let i=snakeArr.length-2; i>=0; i--)
    {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;


    //display the snake
    board.innerHTML="";
    snakeArr.forEach((element,index)=>
    {
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=element.y;
        snakeElement.style.gridColumnStart=element.x;
        if(index==0){
            
            snakeElement.classList.add('head');
        }
        else{
             snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    //display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


//Main logic start here

let hiscore=localStorage.getItem("hiscore");
if(hiscore==null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else
{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="Hiscore: " + hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1} //start the game
    bg_sound.play();
    move_sound.play();
    bg_sound.volume=0.2;
    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp');
            inputDir.x= 0;
            inputDir.y= -1;
            break;

        case 'ArrowDown':
           console.log('ArrowDown');
           inputDir.x= 0;
           inputDir.y= 1;
           break;

        case 'ArrowLeft':
            console.log('ArrowLeft');
            inputDir.x=-1;
            inputDir.y= 0;
            break;

        case 'ArrowRight':
            console.log('ArrowRight');
            inputDir.x= 1;
            inputDir.y= 0;
            break; 

        default:
            break;
    }
});
