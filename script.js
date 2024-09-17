let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const timeDisplay = document.getElementById('timeDisplay');
const lapsContainer = document.getElementById('lapsContainer');
const body = document.body;

document.getElementById('startBtn').addEventListener('click', startStopwatch);
document.getElementById('pauseBtn').addEventListener('click', pauseStopwatch);
document.getElementById('resetBtn').addEventListener('click', resetStopwatch);
document.getElementById('lapBtn').addEventListener('click', recordLap);

function startStopwatch() {
    if (!isRunning) {
        body.className = 'start-bg'; // Change background to green
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 100);
        isRunning = true;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        body.className = 'pause-bg'; // Change background to orange
        clearInterval(intervalId);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(intervalId);
    body.className = 'reset-bg'; // Change background to red
    isRunning = false;
    elapsedTime = 0;
    startTime = 0;
    timeDisplay.textContent = "00:00:00";
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement('div');
        lapElement.className = 'lap-item';
        lapElement.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
}

function padZero(number) {
    return number < 10 ? `0${number}` : number;
}
