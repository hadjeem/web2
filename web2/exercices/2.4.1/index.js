const btn1 = document.querySelector("#myBtn1");

btn1.addEventListener("mouseover", timerGame);
btn1.addEventListener("click",counter);

let timeoutId;
const delayInSeconds = 5;
const delayInMiliSeconds = delayInSeconds * 1000;
let click = 0;

let time;

function timerGame(){
    const now = new Date();
    time = now.getSeconds();
    if(click<10){
        timeoutId = setTimeout(() => {
        alert(`Game over, you did not click 10 times within ${delayInSeconds} s!`);
    },delayInMiliSeconds);
    }
}

function counter(){
    click++;
    if(click>=10){
        const now = new Date();
        const timeDone = now.getSeconds();
        let X = timeDone-time;
        alert(`You win ! You clicked ${click} times within ${X}s`);
        clearTimeout(timeoutId)
        click=0;
    } 
    }