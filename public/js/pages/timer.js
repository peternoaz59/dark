var j = true;

var coastNumber = '';

if (localStorage.getItem('banklogs') && (JSON.parse(localStorage.getItem('banklogs')).length) > 0) {
    if((JSON.parse(localStorage.getItem('banklogs')).length) == 1){
        coastNumber = localStorage.getItem('banktotal');
    } else if((JSON.parse(localStorage.getItem('banklogs')).length) > 1){
        coastNumber = localStorage.getItem('divtotal');
    }
} 

var theirName = '';

auth.onAuthStateChanged(user => {
    if(user.email || localStorage.getItem('emailGuy')) {
        if(user.displayName) {
            theirName = user.displayName
        } else {
            var themaily = localStorage.getItem('emailGuy');
            var theaddressy = themaily.substring(0, themaily.indexOf('@'));

            theirName = theaddressy;
        }
    } else if(user.phoneNumber) {
        theirName = user.phoneNumber;
    } else if(user.isAnonymous) {
        theirName = 'Anonymous User';
    }

    
    if(localStorage.getItem('banklogs')) {
        if((JSON.parse(localStorage.getItem('banklogs')).length) > 0) {
            var elemj = document.getElementById('pablos');        
            
            var id = setInterval(frame, 1000);

            if(!localStorage.getItem('timez-set')) {
                var jo = new Date();
                var po = jo.getTime();
                var p1ko = po/1000;

                var p1knoDecimalo = Math.trunc(p1ko);

                localStorage.setItem('seconds-left', p1knoDecimalo);
                localStorage.setItem('timez-set', true);
            }
            let width = 600;

            function frame(){

                var j = new Date();
                var p = j.getTime();
                var p1k = p/1000;
                var p1knoDecimal = Math.trunc(p1k);
                var theTime = localStorage.getItem('seconds-left');
                var timeDifference = parseFloat(p1knoDecimal) - parseFloat(theTime);
                width = 600 - timeDifference;


                if(width < 10){
                    setTimeout(() => {
                        window.location.assign('banklogs');
                    }, 1000);
                } 



                else if( width == 30) {
                    var minutes = Math.floor(width/60); var seconds = width - minutes * 60; if(seconds < 10){ seconds = '0'+seconds } 
                    elemj.style.width = (width/6) + "%"; document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;

                    var shortCutFunction = 'success';

                    var msg = `
                        30 Seconds Left! <br> ${theirName}, <hr class="to-hr hr15-bot"> 
                        Time is running out. <hr class="hr10-nil">  
                    `;
                    toastr.options = {closeButton: true, debug: false, newestOnTop: true, progressBar: true, positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null};var $toast = toastr[shortCutFunction](msg);$toastlast = $toast;
                } 

                

                else if( width == 120) {
                    var minutes = Math.floor(width/60); var seconds = width - minutes * 60; if(seconds < 10){ seconds = '0'+seconds } 
                    elemj.style.width = (width/6) + "%"; document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;

                    var shortCutFunction = 'success';

                    var msg = `
                        2 Minutes Left! <br> ${theirName},    <hr class="to-hr hr15-bot"> 
                        Send: $${coastNumber} BTC.     <hr class="hr10-nil"> 
                    `;
                    toastr.options = {closeButton: true, debug: false, newestOnTop: true, progressBar: true, positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null};var $toast = toastr[shortCutFunction](msg);$toastlast = $toast;
                } 

                

                else if(width <= 200) {
                    elemj.classList.add("bg-danger");
                    var minutes = Math.floor(width/60); var seconds = width - minutes * 60; if(seconds < 10){ seconds = '0'+seconds } 
                    elemj.style.width = (width/6) + "%"; document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
                } 




                else if( width == 240) {
                    var minutes = Math.floor(width/60); var seconds = width - minutes * 60; if(seconds < 10){ seconds = '0'+seconds } 
                    elemj.style.width = (width/6) + "%"; document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;

                    var shortCutFunction = 'success';
                    var msg = `
                        4 Minutes Left! <br> ${theirName},    <hr class="to-hr hr15-bot"> 
                        Send: $${coastNumber} BTC.     <hr class="hr10-nil"> 
                    `; 
                    toastr.options = {closeButton: true, debug: false, newestOnTop: true, progressBar: true, positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null};var $toast = toastr[shortCutFunction](msg);$toastlast = $toast;
                } 




                else if(width == 360) {
                    var minutes = Math.floor(width/60); var seconds = width - minutes * 60; if(seconds < 10){ seconds = '0'+seconds } 
                    elemj.style.width = (width/6) + "%"; document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;

                    var shortCutFunction = 'success';
                    var msg = `
                        6 Minutes Left! <br> ${theirName},    <hr class="to-hr hr15-bot"> 
                        Send: $${coastNumber} BTC.     <hr class="hr10-nil"> 
                    `; 
                    toastr.options = {closeButton: true, debug: false, newestOnTop: true, progressBar: true, positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null};var $toast = toastr[shortCutFunction](msg);$toastlast = $toast;
                } 



                else if(width <= 400) {
                    elemj.classList.add("bg-warning");
                    var minutes = Math.floor(width/60); var seconds = width - minutes * 60; if(seconds < 10){ seconds = '0'+seconds } 
                    elemj.style.width = (width/6) + "%"; document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
                } 



                else if(width == 480) {
                    var minutes = Math.floor(width/60); var seconds = width - minutes * 60; if(seconds < 10){ seconds = '0'+seconds } 
                    elemj.style.width = (width/6) + "%"; document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;

                    var shortCutFunction = 'success';
                    var msg = `
                        8 Minutes Left! <br> ${theirName},    <hr class="to-hr hr15-bot"> 
                        Send: $${coastNumber} BTC.     <hr class="hr10-nil"> 
                    `; 
                    toastr.options = {closeButton: true, debug: false, newestOnTop: true, progressBar: true, positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null};var $toast = toastr[shortCutFunction](msg);$toastlast = $toast;
                } 


                else {
                    var minutes = Math.floor(width/60);
                    var seconds = width - minutes * 60;
                    if(seconds < 10){ seconds = '0'+seconds }
                    elemj.style.width = (width/6) + "%";
                    document.getElementById('escoz').innerHTML = `Time left: ${minutes}:${seconds}`;
                }
            }

        } 
    } 
});  
