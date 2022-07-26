

let wheel = document.getElementById('spin-wheel');

// Degrees that I have used
// 328 - 0 - 44 Try again
// 45 - 55 free meal
// 56 - 180 Try again
// 181 - 244 10% Coupon
// 245 - 312 free photo
// 313 - 327 free gift


//I'm using notify lk api
//read the docs here https://developer.notify.lk/
//you can change the link and use any API
//if you are using notify lk services, please replace following. 
//set admin number to any number 

    let ID= "";
    let apiKey= "";
    let senderID= "";
    const adminNum = ""
    let mainPass = "12345678"
    let spinTotal;
    let fNum;

    //modal
    const pNumF = document.getElementById('numberInp');
    const passF = document.getElementById('pass');
    const spinNumF = document.getElementById('numSpins');
    
    function modalEnter() {

      if (mainPass == passF.value) {
   
        
   
   
        if (pNumF.value.length < 9) {
            alert("Numbers missing. Please check");
        } else if (pNumF.value.length == 9 && pNumF.value.slice(0,1) == 7 ) {
            fNum = '94' + pNumF.value;
            spinTotal = spinNumF.value;
            document.getElementById('chances').innerHTML = "Spins Left : " + spinTotal;
            document.getElementById('modal-container').style.display = "none";
        } else if(pNumF.value.length == 10 && pNumF.value.slice(0,1) == 0 ) {
            fNum = '94' + pNumF.value.slice(1,10);
            spinTotal = spinNumF.value;
            document.getElementById('chances').innerHTML = "Spins Left : " + spinTotal;
            document.getElementById('modal-container').style.display = "none";
        } else if (pNumF.value.length == 11 && pNumF.value.slice(0,2) == 94 ) {
            fNum = pNumF.value;
            spinTotal = spinNumF.value;
            document.getElementById('chances').innerHTML = "Spins Left : " + spinTotal;
            document.getElementById('modal-container').style.display = "none";
        } else {
          console.log(pNumF.value)
            alert("invalid number");
        }
   
      } else {
        alert("Wrong Password!")
      }
       
   }

var i = 0;
let randAng;
let prize;
let fMsg;
let adminMsg;
let adminMsgTxt;
let userMsgTxt;
let coupon;
let msgSTS;



function spin(){


  if (spinTotal > 0) {
    spinTotal--;
    document.getElementById('chances').innerHTML = "Spins Left : " + spinTotal;
    document.getElementById('result-head').innerHTML = "Spining !!";

  if (i == 0) {
    i = 1;
    // var elem = document.getElementById("myBar");
    let fAng = 1;
    randAng = Math.floor(Math.random() * 360);
    let roAng = 720 + randAng;
    console.log(randAng);
    var id = setInterval(frame, 1);
    function frame() {
      if (fAng >= roAng) {
        clearInterval(id);
        i = 0;
      } else {
        fAng++;
        wheel.style.transform = "rotate(" + fAng + "deg)";
        //elem.innerHTML = fAng  + "%";
      }
    }
  }

  if (randAng > 327 || randAng <45) {
    msgSTS = 0; //false

  } else if (randAng < 56) {
    prize = "Free Meal"; 
    msgSTS = 1; //true
    coupon = "FFT7" + Math.floor(Math.random() * 99999) + "FM";
  } else if (randAng < 181) {
    msgSTS = 0; //false
  } else if (randAng <245) {
    prize = "10% Coupon"
    msgSTS = 1;
    coupon = "FFT7" + Math.floor(Math.random() * 99999) + "TP";
  } else if (randAng < 313) {
    prize = "Free Photo"
    msgSTS = 1;
    coupon = "FFT7" + Math.floor(Math.random() * 99999) + "PC";
  } else if (randAng < 328) {
    prize = "Free Gift"
    msgSTS = 1;
    coupon = "FFT7" + Math.floor(Math.random() * 99999) + "FG";
  }

  //sending msg
  setTimeout(afterSpin, 4000);
  

  } else {
    alert("No Spins Left!")
  }
}

function afterSpin() {
    switch(msgSTS) {
        case 0: //No Luck
            document.getElementById('result-head').innerHTML = "Better Luck Next Time";
            document.getElementById('modalWonText').innerHTML = "Sorry! Better Luck Next time";
            document.getElementById('modal-icon').className = "bi bi-x-circle-fill";
            document.getElementById('modal-icon').style.color = "red";
            document.getElementById('modal-container1').style.display = "block";
            if (spinTotal == 0) {
            document.getElementById('modalClose').onclick = refresh;
            document.getElementById('modalWonDescription').innerHTML = "No Spins Left! Click Arrow to Exit";
          } else if (spinTotal > 1) {
            document.getElementById('modalWonDescription').innerHTML = spinTotal + " Spins Left! Click Arrow to Re-Spin";
          } else {
            document.getElementById('modalWonDescription').innerHTML = spinTotal + " Spin Left! Click Arrow to Re-Spin";
          }
      
            break;
         case 1: //won
            document.getElementById('result-head').innerHTML = "Congratulations! You've won " + prize;
            document.getElementById('modalWonText').innerHTML = "Congratulations! You've won " + prize;
            document.getElementById('modal-icon').style.color = "green";
            document.getElementById('modal-icon').className = "bi bi-check-circle-fill";

            
            document.getElementById('modal-container1').style.display = "block";

            if (spinTotal == 0) {
              document.getElementById('modalClose').onclick = refresh;
              document.getElementById('modalWonDescription').innerHTML = "No Spins Left! Click Arrow to Exit";
            } else if (spinTotal > 1) {
              document.getElementById('modalWonDescription').innerHTML = spinTotal + " Spins Left! Click Arrow to Re-Spin";
            } else {
              document.getElementById('modalWonDescription').innerHTML = spinTotal + " Spin Left! Click Arrow to Re-Spin";
            }


            adminMsgTxt = prize + "Coupon Generated. Code-" + coupon; //send to admin
            userMsgTxt = "Congratulations! You've won " + prize + ". Coupon-" + coupon; //send to user
    
            url = 'https://app.notify.lk/api/v1/send?user_id=11228&api_key='+ apiKey +'&sender_id=' + senderID + '&to=' + adminNum + '&message=' + adminMsgTxt;
            url2 = 'https://app.notify.lk/api/v1/send?user_id=11228&api_key='+ apiKey +'&sender_id=' + senderID + '&to=' + fNum + '&message=' + userMsgTxt;
    
                fetch(url)
                    .then(res => console.log('Admin Message has been sent'))
                    .catch(err => console.log('Admin MSG Failed'));

                fetch(url2)
                    .then(res => console.log('User Message has been sent'))
                    .catch(err => console.log('USER MSG Failed'));
            break;
      }
}

function modalClose() {
  document.getElementById('modal-container1').style.display = "none"
}


function refresh() {
  location.reload();
}
