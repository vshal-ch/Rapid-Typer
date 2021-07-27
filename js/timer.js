let timerInterval;
export let totalSeconds = 0;
export function startTimer(element){
    timerInterval = setInterval(()=>{
        totalSeconds++;
        let sec = ~~(totalSeconds%60);
        let mins = ~~(totalSeconds/60);
        element.textContent = '';
        if(sec<10){
            element.textContent = `${mins}:0${sec}`;
        }else{
            element.textContent = `${mins}:${sec}`;
        }
    },1000);
}

export function stopTimer(){
    clearInterval(timerInterval);
}

export function resetTimer(){
    totalSeconds = 0;
}