auth.onAuthStateChanged(user => {
    "use strict";

    var toast = 0;
    var toastz = 0;

    var theLogs = '';

    var toastbtc = '';

    var theMessage = '';

    if (localStorage.getItem('banklogs') && (JSON.parse(localStorage.getItem('banklogs')).length) > 0) {
        if(JSON.parse(localStorage.getItem('banklogs')).length == 1) {
            toast = localStorage.getItem('banktotal');
            toastz = toast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            theMessage = `
                ${(JSON.parse(localStorage.getItem('banklogs'))[0].account)}, <br>
                ${(JSON.parse(localStorage.getItem('banklogs'))[0].balance)}.
            `;
        } else if(JSON.parse(localStorage.getItem('banklogs')).length == 2) { 
            toast = localStorage.getItem('divtotal');
            toastz = toast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            theMessage = `
                ${(JSON.parse(localStorage.getItem('banklogs'))[0].account)}, <br>
                ${(JSON.parse(localStorage.getItem('banklogs'))[1].account)}.
            `;
        }
    }

    let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1h');
   
    ws.onmessage = (event) => {
        let stockObject = JSON.parse(event.data);

        toastbtc = (toast / (parseFloat(stockObject.k.c))).toFixed(5);
    }

    if(user.email || localStorage.getItem('emailGuy')) {
        theLogs = `
            Bank logs will be sent to: 
            <br> ${localStorage.getItem('emailGuy')}.
        `;
    } else if(user.phoneNumber) {
        theLogs = `
            Bank logs will be sent to: 
            <br> ${user.phoneNumber}.
        `;
    } else if(user.isAnonymous) {
        theLogs = `
            ${theMessage}
        `;
    }

    
    var i = -1;
    var $toastlast;


    var getMessage = function() {        
        for (var i = 0; i < items.length; i++) {
            var msgs = [`
                    ${toastbtc} Bitcoin payment not detected,
                <hr class="hr15-bot">
                    Send $${toastz} BTC:
                <hr class="to-hr hr15-top">
                    ${theLogs}
                <hr class="hr3-nil">
            `];


            i++;
            if (i === msgs.length) {
                i = 0;
            }
            return msgs[i];
        }
    };

    var toastbut = document.getElementById('anon-check');

    var savebut = document.getElementById('monez');

    $(toastbut).click(function() {
        var shortCutFunction = 'success';
        var msg = '';
        var title = '';
        toastr.options = {
            closeButton: true,
            debug: false,
            newestOnTop: true,
            progressBar: true,
            positionClass: 'toast-top-full-width',
            preventDuplicates: true,
            onclick: null,
            timeOut: 5000
        };
        if (!msg) {
            msg = getMessage();
        }
        var $toast = toastr[shortCutFunction](msg, title);
        $toastlast = $toast;

        closeModals();
    });


    $(savebut).click(function() {
        var shortCutFunction = 'success';
        var msg = '';
        var title = '';
        toastr.options = {
            closeButton: true,
            debug: false,
            newestOnTop: true,
            progressBar: true,
            positionClass: 'toast-top-full-width',
            preventDuplicates: true,
            onclick: null,
            timeOut: 5000
        };
        if (!msg) {
            msg = getMessage();
        }
        var $toast = toastr[shortCutFunction](msg, title);
        $toastlast = $toast;

        closeModals();
    });

    function closeModals() {        
        setTimeout(() => {
            $('#exampleModal').modal('hide');
            $('#saveModal').modal('hide');
        }, 7000);

        setTimeout(() => {
            if(!(user.email && user.phoneNumber)) {
                if (!($('#vpnModal').is(':visible'))) {
                    if (!($('#exampleModal').is(':visible'))) {
                        if (!($('#saveModal').is(':visible'))) {
                            if (!($('#emailModal').is(':visible'))) {
                                $('#discountModal').modal('show');
                            }
                        }
                    }
                } 
            }
        }, 10000);
    }
});