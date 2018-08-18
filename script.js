class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    resetTime() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        this.print(this.times);
    }

    resetList() {
        const list = document.querySelector('ol');
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
    }

    lapTime() {
        const resultLi = document.createElement("li"); 
        resultLi.innerText = document.querySelector('.stopwatch').innerText; 
        document.querySelector('ol').appendChild(resultLi); 
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${pad0(times.minutes)} : ${pad0(times.seconds)} : ${pad0(Math.floor(times.miliseconds))}`;
    }

}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetTime());

let lapTimeButton = document.getElementById('lap-time');
lapTimeButton.addEventListener('click', () => stopwatch.lapTime());

let resetListButton = document.getElementById('reset-list');
resetListButton.addEventListener('click', () => stopwatch.resetList());