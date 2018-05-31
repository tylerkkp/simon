// Arbitrary goal for this project: use vanilla JS only. No jQuery or other libraries

var comppat = []; //create computer pattern array

var comppatstr = []; //create string version of comppat array

var playerpat = []; //create player pattern array

var strict = 0; //create strict variable

var count = 0; //create variable to count current 'level'

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



//test player button press against generated sequence
function btntest() {
  var testitem = playerpat[playerpat.length -1]; //testitem = the most recent player input
  var checkitem = comppat[playerpat.length -1]; //checkitem = the most recent computer input
  if (testitem !== checkitem) {
    if (strict == 1) {
      alert('OOPS! Start Over');
      restart();
      compseq();
    } else {
    alert('Try Again');
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
  alert('Yay! You Win!');
}

//reset all variables and lists
function restart() {
  updatecount();
  comppat = [];
  comppatstr = [];
  playerpat = [];
  count = 0;
}

//generate random integer in range (1:4)
function randFunc() {
  return Math.floor(Math.random() * 4) + 1;
}

//temporarily change color of button
function btnflash(id) {
  var origcolor = document.getElementById(id).style.backgroundColor; //saves original background color of the element
  document.getElementById(id).style.backgroundColor = "white"; //changes the background color to white
    setTimeout(function() {
 document.getElementById(id).style.backgroundColor = origcolor;
    }, 400) //after 400ms, changes the background color to the original color
}


//TODO: need to disable buttons so player can't simply 'follow along'. Still in progress
function offbtns() {
  document.getElementById('one').style.pointerEvents = 'none';
}
//TODO: see above - need to re-enable buttons
function onbtns() {
  document.getElementById('one').style.pointerEvents = 'auto';
}


//start game function
function startgame() {
  restart();
  compseq();
}

//computer makes a play
function compplay(input) {
  comppat.push(input); //add the input value to the comppat array
  
  //takes the input and converts to string to add to the comppatstr array (which is used to look up id's)
  //probably a more elegant way to look up id's (without creating a separate array), but good excuse to use a switch statement
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
    if (i < length + 1) {
      i++;
      seqLoop(i); //call the loop again, this time with updated i as the parameter. Will keep running through entire comppat array       
    }
  }, 800); // 800ms delay in loop iterations
})(i);
}

//update the 'count' readout to show current 'level'
function updatecount() {
  document.getElementById("count").innerHTML = count;
}

// Computer sequence
function compseq() {
  var randnum = randFunc(); //store random number generated by randFunc
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

//strict toggle button: changes color of button and also toggles 'strict' variable
function toggle() {
  if (!strict) {
 document.getElementById("strictmode").style.backgroundColor = "red";
    strict += 1;
  } else {
    document.getElementById("strictmode").style.backgroundColor = "silver";
    strict -= 1;
  }
  }



/* USED FOR TESTING; NO LONGER NEEDED
//compare the two arrays to check if they are equal
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

//create popup showing current values for the computer and player sequences
function arraytest() {
  alert('comppat = ' + comppat + '\n' + 'playerpat = ' + playerpat + '\n' + 'comppatstr = ' + comppatstr);
}

*/