var pomodoro = 0;
var worktime = 1500;
var shortbreak = 300;
var longbreak = $('#breakselect').find(':selected').val();
var setTime;
var minutes = Math.floor((setTime % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((setTime % (1000 * 60)) / 1000);


function worktimer() {
    setTime = worktime;
    var pTimer = setInterval(function (){
        setTime--;
        $('#timerDisplay').html(`${minutes} : ${seconds}`);
        if (setTime === 0) {
            clearInterval(pTimer);
            pomodoro++;
            breaktimer();
        }
    }, 1000);
};

function breaktimer() {
    if (pomodoro === 8) {
        setTime = longbreak;
        var pTimer = setInterval(function (){
            setTime--;
            $('#timerDisplay').html(`${minutes} : ${seconds}`);
            if (setTime === 0) {
                clearInterval(pTimer);
                pomodoro = 0;

            }
        }, 1000);
    } else if (pomodoro === 4) {
        setTime = longbreak;
        var pTimer = setInterval(function (){
            setTime--;
            $('#timerDisplay').html(`${minutes} : ${seconds}`);
            if (setTime === 0) {
                clearInterval(pTimer);
                worktimer;
                pomodoro = 0;
            }
        }, 1000);
    } else {
        setTime = shortbreak;
        var pTimer = setInterval(function (){
            setTime--;
            $('#timerDisplay').html(`${minutes} : ${seconds}`);
            if (setTime === 0) {
                clearInterval(pTimer);
                worktimer;
            }
        }, 1000);
    }
};

$('#start-button').on('click', function() {
    if () {

    } else {
        worktimer();
    }
});