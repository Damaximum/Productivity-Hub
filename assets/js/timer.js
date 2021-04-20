var pomodoro = 0;
var worktime = 1500;
var shortbreak = 300;
var longbreak = $('#breakselect').find(':selected').val();
var setTime;
var minutes = Math.floor((setTime % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((setTime % (1000 * 60)) / 1000);
var pause = false;

function worktimer() {
    setTime = worktime;
    var pTimer = setInterval(function (){
        if (!pause) {
            setTime--;
            $('#timerDisplay').html(`${minutes} : ${seconds}`);
            if (setTime === 0) {
                clearInterval(pTimer);
                pomodoro++;
                breaktimer();
            }
        }   
    }, 1000);
};

function breaktimer() {
    if (pomodoro === 8) {
        setTime = longbreak;
        var pTimer = setInterval(function (){
            if (!pause) {
                setTime--;
                $('#timerDisplay').html(`${minutes} : ${seconds}`);
                if (setTime === 0) {
                    clearInterval(pTimer);
                    pomodoro = 0;

                }
            }
        }, 1000);
    } else if (pomodoro === 4) {
        setTime = longbreak;
        var pTimer = setInterval(function (){
            if (!pause) {
                setTime--;
                $('#timerDisplay').html(`${minutes} : ${seconds}`);
                if (setTime === 0) {
                    clearInterval(pTimer);
                    worktimer;
                    pomodoro = 0;
                }
            }
        }, 1000);
    } else {
        setTime = shortbreak;
        var pTimer = setInterval(function (){
            if (!pause) {
                setTime--;
                $('#timerDisplay').html(`${minutes} : ${seconds}`);
                if (setTime === 0) {
                    clearInterval(pTimer);
                    worktimer;
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
})