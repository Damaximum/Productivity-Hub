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
    if (loop === 2) {
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
                    
                    $('#modal4').modal('open');
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
                    
                    $('#modal4').modal('open');
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
                
                $('#modal4').modal('open');
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

// Ramdon Quotes API and Functionality
function swAPI() {
    var swCall = 'https://type.fit/api/quotes';
    fetch(swCall)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        var i = Math.floor(Math.random() * 1642);
            $('#quoteSetup').html(data[i].text);
    })
    .catch(function (err) {
        console.error(err);
    });
};

$('#swQuote').on('click', swAPI);
$('#nextQuote').on('click', function() {
    swAPI();
});

// Joke API and Functionality
function jokeAPI() {
    var jokeCall = 'https://official-joke-api.appspot.com/jokes/random';
    fetch(jokeCall)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        $('#jokeSetup').html(data.setup);
        $('#jokePunchline').html(data.punchline);
        $('#jokeNext').removeClass('hidden');
    })
    .catch(function (err) {
        console.error(err);
    });
};

$('#jokeTest').on('click', jokeAPI);
$('#jokeNext').on('click', function() {
    $('#jokeNext').addClass('hidden');
    $('#jokeEnd').removeClass('hidden');
    $('#jokePunchline').removeClass('invisible');
});
$('#jokeEnd').on('click', function() {
    $('#jokeEnd').addClass('hidden');
    $('#jokePunchline').addClass('invisible');
    $('#jokeSetup').html('');
    $('#jokePunchline').html('');
    jokeAPI();
});

//----------------------To Do List----------------------
var toDoInput = $("#to-do-text"); 
var toDoForm = $("#to-do-form");
var toDoList = $("#to-do-list");

var toDos = [];

function createToDos() {
    toDoList.html("");
    for (var i = 0; i < toDos.length; i++) {
        var toDo = toDos[i];

        var li = $('<li class="liSpacing">'); 
        li.attr("data-index", i); 
        var pEl = $('<span class="toDo">');
        pEl.text(toDo); 
        

        var button = $('<button class="waves-effect waves-light btn col s12 red darken-3 toDoBtn">'); 
        button.text("Completed"); 
        

        li.append(pEl);
        li.append(button); 
        toDoList.append(li); 
    }
};

function init() {
    var storedToDos = JSON.parse(localStorage.getItem("toDos"));

    if (storedToDos !== null) {
        toDos = storedToDos;
    }

    createToDos();
};

function storeToDos() {
    localStorage.setItem("toDos", JSON.stringify(toDos));
};

toDoForm.on("submit", function(event) { 
    event.preventDefault();

    var toDoText = toDoInput.val().trim(); 
    console.log(toDoText);

    if (toDoText === "") {
        return;
    }

    toDos.push(toDoText);
    toDoInput.val(""); 

    storeToDos();
    createToDos();
});

toDoList.on("click", function(event) { 
    event.preventDefault();

    var element = event.target;
    console.log(element);

    if (element.matches("button")) {
        var index = element.parentElement.getAttribute("data-index");
        toDos.splice(index, 1);
        element.remove(); 

        storeToDos();
        createToDos();
    }
});

init();
//----------------------End of To Do List----------------------

//---------------------- Meme Generator --------------------


function memeGen() {
    var memeAPI = 'https://meme-api.herokuapp.com/gimme';

    fetch(memeAPI)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        $('#memeTitle').html(data.title);
        $('#memeImage').attr('src', data.url).removeClass('hidden');
    })
    .catch(function (err) {
        console.error(err);
    });
};

$('#memeGenBtn').on('click', function (e) {
    e.preventDefault();
    $('#memeTitle').html('');
    $('#memeImage').attr('src', '').addClass('hidden');
    memeGen();
});
//----------------------End of Meme Generator List--------------------


//----------------------Cute Pictures API----------------------
function cutePixGen() {
    var imageType = ["cute", "cute+kitten", "cute+cat", "cute+puppy", "cute+dog", "kitten", "puppy", "cat", "dog", "hedgehog", "sloth"];
    var randomType = imageType[Math.floor(Math.random() * imageType.length)];
    var cutePixAPI = `https://pixabay.com/api/?key=21316291-4e0d90ed2a47cbd7d71f6e907&q=${randomType}&image_type=photo&category=animals`;
    //console.log(randomType);

    fetch(cutePixAPI)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
          var randomPix = Math.floor(Math.random() * data.hits.length);
        //console.log(data.hits.length);
        //console.log(randomPix);

        var imgLink = data.hits[randomPix].largeImageURL;
        $('#cutePixImage').attr('src', imgLink);
    })
    .catch(function (err) {
        console.log(err);
    });
};
$('#cutePixBtn').on('click', function (event) {
    event.preventDefault();
    $('#cutePixImage').attr('src', '');
    cutePixGen();
});
//----------------------End of Cute Pictures API----------------------
