var time = 61
var timer_running = false;

function pauseTimer() {
    timer_running = !timer_running;
    if(timer_running) {
        document.getElementById("pause").innerHTML = "Pause";
    } else {
        document.getElementById("pause").innerHTML = "Resume";
    }
}

function startTimer() {
    timer_running = true;
}

function stopTimer() {
    timer_running = false;
    time = 25*60;
    document.getElementById("timer").innerHTML = "<b>25:00</b>";
    document.getElementById("timer").setAttribute('style', '')
}

function updateTimer() {
    if(timer_running && time>0) {
        time--;
        document.getElementById("timer").innerHTML = "<b>"+Math.floor(time/60) + ":" + time%60+"</b>";

        if(time==60) {
            document.getElementById("timer").setAttribute('style', 'color:red; background-color: white; border-radius: 5px')
        }
        if(time<=0) {
            alert("Take a break!");
        }
    }

}

setInterval(updateTimer, 1000)