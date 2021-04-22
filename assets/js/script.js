//for the collapsible section of what is a pamodora?
$(document).ready(function(){
    $('.collapsible').collapsible();
});

//   Modal Stuff from Materialize.
$(document).ready(function(){
    $('.modal').modal();
});

// select functionality of Materialize
$(document).ready(function(){
    $('select').formSelect();
});

// Pomodoro Timer Stuff
var pomodoro = 0;
var worktime = 1500;
var shortbreak = 300;
var longbreak;
var setTime;
var minutes;
var seconds;
var pause = false;
var loop = 0;
var pTimer;

// Timers
function worktimer() {
    setTime = worktime;
    pTimer = setInterval(function() {
        if (!pause) {
            minutes = Math.floor((setTime / 60) % 60);
            seconds = Math.floor(setTime % 60);
            setTime--;
            $('.timerDisplay').html(`${minutes} : ${seconds}`);
            console.log(minutes);
            console.log(seconds);
            if (setTime === 0) {
                clearInterval(pTimer);
                pomodoro++;
                if ( pomodoro === 4) {
                    $('#modal2').modal('open');
                } else {
                    $('#modal1').modal('open');
                }
            }
        }   
    }, 1000)
    $('.pause').removeClass('hidden');
    $('.stop').removeClass('hidden');
    $('.start').addClass('hidden');
};

function breaktimer() {
    console.log(loop);
    console.log(longbreak);
    longbreak = $('#breakselect').find('option:selected').data('time');
    if (loop > 1) {
        setTime = longbreak;
        pTimer = setInterval(function (){
            if (!pause) {
                minutes = Math.floor((setTime / 60) % 60);
                seconds = Math.floor(setTime % 60);
                setTime--;
                $('.timerDisplay').html(`${minutes} : ${seconds}`);
                if (setTime === 0) {
                    clearInterval(pTimer);
                    pomodoro = 0;
                    loop = 0;
                    // TODO: start timer back up
                    $('#modal3').modal('open');
                }
            }
        }, 1000);
    } else {
        setTime = longbreak;
        pTimer = setInterval(function (){
            if (!pause) {
                minutes = Math.floor((setTime / 60) % 60);
                seconds = Math.floor(setTime % 60);
                setTime--;
                $('.timerDisplay').html(`${minutes} : ${seconds}`);
                if (setTime === 0) {
                    clearInterval(pTimer);
                    pomodoro = 0;
                    loop++;
                    // TODO: start timer back up
                    $('#modal3').modal('open');
                }
            }
        }, 1000);
    }
    $('.pause').removeClass('hidden');
    $('.stop').removeClass('hidden');
    $('.start').addClass('hidden');
}

function shortBreakTimer() {
    setTime = shortbreak;
    pTimer = setInterval(function (){
        minutes = Math.floor((setTime / 60) % 60);
        seconds = Math.floor(setTime % 60);
        if (!pause) {
            setTime--;
            $('.timerDisplay').html(`${minutes} : ${seconds}`);
            if (setTime === 0) {
                clearInterval(pTimer);
                // TODO: start timer back up
                $('#modal3').modal('open');
            }
        }
    }, 1000);
    $('.pause').removeClass('hidden');
    $('.stop').removeClass('hidden');
    $('.start').addClass('hidden');
};

// button functionality
$('.start').on('click', function(e){
    e.preventDefault();
    $('.pause').removeClass('hidden');
    $('.stop').removeClass('hidden');
    $('.start').addClass('hidden');
    worktimer();
});

$('.pause').on('click', function(e) {
    e.preventDefault();
    pause = true;
    $('.resume').removeClass('hidden');
    $('.pause').addClass('hidden');
});

$('.resume').on('click', function(e){
    e.preventDefault();
    pause = false;
    $('.pause').removeClass('hidden');
    $('.resume').addClass('hidden');
});

$('.stop').on('click', function(e){
    e.preventDefault();
    $('.resume').addClass('hidden');
    $('.pause').addClass('hidden');
    $('.stop').addClass('hidden');
    $('.start').removeClass('hidden');
    $('.timerDisplay').html('25 : 00');
    clearInterval(pTimer);
})


$('#modalbutton1').on('click', shortBreakTimer);
$('#modalbutton2').on('click', breaktimer);
$('#modalbutton3').on('click', worktimer);

$('.pomoDone').on('click', function(e) {
    e.preventDefault();
    $('.resume').addClass('hidden');
    $('.pause').addClass('hidden');
    $('.stop').addClass('hidden');
    $('.start').removeClass('hidden'); 
    $('.timerDisplay').html('25 : 00');
    clearInterval(pTimer);
});

// $('.pomodorotest').on('click', function() {
//     pomodoro = 4;
// });
// $('.looptest').on('click', function() {
//     pomodoro = 4;
//     loop = 2;
// });