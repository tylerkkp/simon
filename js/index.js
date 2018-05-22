// Arbitrary goal for this project: use vanilla JS only. No jQuery or other libraries

//create computer pattern array
var comppat = [];
//create string version of comppat array
var comppatstr = [];
//create player pattern array
var playerpat = [];
//create strict variable
var strict = 0;
//create variable to count current 'level'
var count = 0;

//audio sounds
var sound1 = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
var sound2 = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
var sound3 = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
var sound4 = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";

//turn sound url's into audio
var beep1 = new Audio(sound1);
var beep2 = new Audio(sound2);
var beep3 = new Audio(sound3);
var beep4 = new Audio(sound4);

//compare the two arrays to see if they are equal
function compare(arr1, arr2) {
  if (arr1.length !== arr2.length) {
        alert('dont match');
        return false;
  }
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i]) {
            alert('boo');
            return false;
    }
    }
    alert ('yay');
    return true;
}

//create test to run at each human button press
function btntest() {
  var testitem = playerpat[playerpat.length -1];
  var checkitem = comppat[playerpat.length -1];
  if (testitem !== checkitem) {
    if (strict == 1) {
      alert('wrong');
      restart();
      compseq();
    } else {
    alert('wrong');
    repeat();
    playerpat = [];
  }
  } else if (playerpat.length == 20 && testitem == checkitem) {
    wincondition();
    } else if (playerpat.length < comppat.length) {
    return true;
  } else {
    compseq();
  }
}

function wincondition() {
  alert('winner!');
}

function restart() {
  updatecount();
  comppat = [];
  comppatstr = [];
  playerpat = [];
  count = 0;
}

function arraytest() {
  alert('comppat = ' + comppat + '\n' + 'playerpat = ' + playerpat + '\n' + 'comppatstr = ' + comppatstr);
}

// Random function
function randFunc() {
  return Math.floor(Math.random() * (4 - 1 + 1)) + 1;
}

function btnflash(id) {
  var origcolor = document.getElementById(id).style.backgroundColor;
  document.getElementById(id).style.backgroundColor = "white";
    setTimeout(function() {
 document.getElementById(id).style.backgroundColor = origcolor;
    }, 400)
}

//need to disable buttons so player can't simply 'follow along'
function offbtns() {
  document.getElementById('one').style.pointerEvents = 'none';
}
//see above: need to re-enable buttons
function onbtns() {
  document.getElementById('one').style.pointerEvents = 'auto';
}

function startgame() {
  restart();
  compseq();
}

//computer makes a play
function compplay(input) {
  //add the input value to the comppat array
  comppat.push(input);
  //takes the input and converts to string to add to the comppatstr array (which is used to look up id's)
  switch(input) {
    case 1:
        comppatstr.push('one');
        break;
    case 2:
        comppatstr.push('two');
        break;
    case 3:
        comppatstr.push('three');
        break;
    case 4:
        comppatstr.push('four');
        break;
    default:
        break;
}
  repeat();  
  playerpat = [];
  count += 1;
  updatecount();
//////////////////////////////
}

function repeat() {
  var length = comppat.length; //determine how many numbers are in the sequence
  var i = 0; //initialize i at 0
  (function seqLoop (i) {
  setTimeout(function () {
    switch(comppat[i]) {
    case 1:
        beep1.play(); //play the corresponding audio
  document.getElementById('one').style.backgroundColor = "rgba(255,255,255,0.9)"; //change btn color to silver
    setTimeout(function() {
 document.getElementById('one').style.backgroundColor = '#1B998B'; //after 600ms, change the background to white
    }, 600)
        break;
    case 2:
        beep2.play();
        document.getElementById('two').style.backgroundColor = "rgba(255,255,255,0.9)";
    setTimeout(function() {
 document.getElementById('two').style.backgroundColor = "#CC3809";
    }, 600)
        break;
    case 3:
        beep3.play();
        document.getElementById('three').style.backgroundColor = "rgba(255,255,255,.9)";
    setTimeout(function() {
 document.getElementById('three').style.backgroundColor = "#FFBE0B";
    }, 600)
        break;
    case 4:
        beep4.play();
        document.getElementById('four').style.backgroundColor = "rgba(255,255,255,0.9)";
    setTimeout(function() {
 document.getElementById('four').style.backgroundColor = "#083D77";
    }, 600)
        break;
    default:
        break;
}
    if (i < length + 1) {          // If i < length + 1, keep going
      i++;
      //call the loop again, this time with updated i as the parameter
      seqLoop(i);       
    }
  }, 800); // 1000ms delay in loop iterations
})(i);
}

function updatecount() {
  document.getElementById("count").innerHTML = count;
}

// Computer sequence
function compseq() {
  var randnum = randFunc();
  compplay(randnum);
}


// Button press function
function btnone() {
  playerpat.push(1);
  beep1.play();
  var btnoneid = 'one';
  btnflash(btnoneid);
  btntest();
}

function btntwo() {
  playerpat.push(2);
  beep2.play();
  var btntwoid = 'two';
  btnflash(btntwoid);
  btntest();
}

function btnthree() {
  playerpat.push(3);
  beep3.play();
  var btnthreeid = 'three';
  btnflash(btnthreeid);
  btntest();
}

function btnfour() {
  playerpat.push(4);
  beep4.play();
  var btnfourid = 'four';
  btnflash(btnfourid);
  btntest();
}

//strict toggle button
function toggle() {
  if (!strict) {
 document.getElementById("strictmode").style.backgroundColor = "red";
    strict += 1;
  } else {
    document.getElementById("strictmode").style.backgroundColor = "silver";
    strict -= 1;
  }
  }