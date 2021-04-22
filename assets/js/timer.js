var pomodoro = 0;
var worktime = 1500;
var shortbreak = 300;
var longbreak = $('#breakselect').find(':selected').val();
var setTime;
var minutes;
var seconds;
var pause = false;
var loop = 0;
var pTimer;

function worktimer() {
    setTime = worktime;
    minutes = Math.floor((setTime % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((setTime % (1000 * 60)) / 1000);
    pTimer = debounce(function() {
        if (!pause) {
            setTime--;
            $('#timerDisplay').html(`${minutes} : ${seconds}`);
            if (setTime === 0) {
                clearInterval(pTimer);
                pomodoro++;
            }
        }   
    }, worktime)
};

function breaktimer() {
    if (loop === 1) {
        setTime = longbreak;
        minutes = Math.floor((setTime % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((setTime % (1000 * 60)) / 1000);
        pTimer = setInterval(function (){
            if (!pause) {
                setTime--;
                $('#timerDisplay').html(`${minutes} : ${seconds}`);
                if (setTime === 0) {
                    clearInterval(pTimer);
                    pomodoro = 0;
                    loop = 0
                }
            }
        }, 1000);
    } else if (pomodoro === 4) {
        setTime = longbreak;
        minutes = Math.floor((setTime % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((setTime % (1000 * 60)) / 1000);
        pTimer = setInterval(function (){
            if (!pause) {
                setTime--;
                $('#timerDisplay').html(`${minutes} : ${seconds}`);
                if (setTime === 0) {
                    clearInterval(pTimer);
                    worktimer;
                    pomodoro = 0;
                    loop++;
                }
            }
        }, 1000);
    } else {
        setTime = shortbreak;
        minutes = Math.floor((setTime % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((setTime % (1000 * 60)) / 1000);
        pTimer = setInterval(function (){
            if (!pause) {
                setTime--;
                $('#timerDisplay').html(`${minutes} : ${seconds}`);
                if (setTime === 0) {
                    clearInterval(pTimer);
                }
            }
        }, 1000);
    }
};

$('.start').on('click', function(e){
    $('#play-pause').removeClass('start').addClass('pause');
    worktimer();
});

$('.pause').on('click', function(e) {
    e.preventDefault();
    pause = true;
    $('#play-pause').removeClass('pause').addClass('resume');
});

$('.resume').on('click', function(e){
    e.preventDefault();
    pause = false;
    $('#play-pause').removeClass('resume').addClass('pause');
});

$('.stop').on('click', function(e){
    e.preventDefault();
    $('#play-pause').removeClass('pause resume').addClass('start');
    clearInterval(timer);
})




  