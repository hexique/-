let timeoutId;
let start_time = 0;
let elapsed_time = 0;
let mark_count = 0;
let canPause = false;
let timer = null;
let isActive = false;
let secs;
let secs_unfloor;
let isSecsPrime = false;

let max = 0;
let max_gap = 0;
let primeConcetration = 0;
let gaps = [];
let logs = [];
const targetDate = new Date(2026, 0, 12, 20, 14);

function isPrime(num){
    if(num < 2) return false
    for(let i = 2; i * i <= num; i++) { 
        if(num % i === 0) 
            return false
    } return true
}

function sum(list){
    let result = 0

    for(let i = 1; i < list.length; i++){
        result += list[i]
    }

    return result
}

let primeNums = [];
for(let i = 0; i <= 5000; i++) {
    if(isPrime(i)){
        primeNums.push(i)
    }
}

function switch_func(){
    if(canPause){
        canPause = false;
        stop()
    }
    else{
        canPause = true;
        start()
    }
}

function start(){
    console.log(`isActive : ${isActive} ->`)
    if(!isActive){
        start_time = elapsed_time - new Date(2025, 0, 12, 20, 14);
        timer = setInterval(update, 10);
        isActive = true;
        console.log(`${isActive}.\n`)
    } else {
        isActive = false;
        console.log(`${isActive}.\n`) 
    }

}

function stop(){
    clearInterval(timer);
    elapsed_time = Date.now() - start_time;
    isActive = false;
    document.getElementById("startBtn").textContent = "Restart"
}

function update(){
    const now = Date.now();
    const remaining = targetDate - now;
    
    if(remaining <= 0){
        document.getElementById("time").innerHTML = "00:00:00";
        clearInterval(timer);
        return;
    }
    
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    
    const timeString = `<font title="Дни">${String(days).padStart(2,'0')}</font>:<font title="Часы">${String(hours).padStart(2,'0')}</font>:<font title="Минуты">${String(minutes).padStart(2,'0')}</font>:<font title="Секунды">${String(seconds).padStart(2,'0')}</font>`;
    
    secs = Math.floor(elapsed_time / 1000);
    if(secs !== Math.floor(elapsed_time / 1000)){
        secs = Math.floor(elapsed_time / 1000);
    }
    
    secs_unfloor = elapsed_time / 1000 - secs
    
    document.getElementById("time").innerHTML = `<font style="color: hsla(0, 0%, ${50 - Math.floor(secs_unfloor * 50) + 50}%, 1.00)">
${timeString}</font>`
    
    elapsed_time = now - start_time;

    if (1 <= hours + days * 24 && hours + days * 24 <= 3 && document.getElementById("video").innerHTML == ""){
        document.getElementById("video").innerHTML = `<video controls width="300px"><br>
        <source src="vid/${hours}.mp4" type="video/mp4">
        Your browser doesnt support video.
</video>`
    }
}

"hsl(0, 0%, 61%)"

function hidefaq(){
    document.getElementById("faq").style.display = "None"
}



switch_func()