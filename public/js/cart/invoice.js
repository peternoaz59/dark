let items = [];
var table3 = jQuery('#example1').DataTable();
var setBtn = document.getElementById('settings');
var wouldYou = document.getElementById('would');
var anonLink = document.getElementById('anon-link');
var bitCoin = document.getElementById('bit-coin');
var bitMail = document.getElementById('bit-mail');
var bitPhone = document.getElementById('bit-phone');
var bitSms = document.getElementById('bit-sms');

var cartLogo = document.getElementById('cart-logo');

var theLogo = document.getElementById('logo');
var theLogo2 = document.getElementById('vpn-img');

var profileModal = document.getElementById('profileModal');
var modalDialog = profileModal.getElementsByClassName('modal-dialog')[0];

if(!localStorage.getItem('banklogs') || ((JSON.parse(localStorage.getItem('banklogs')).length) < 1)) {
    document.getElementById('confirm').style.display = 'flex';
    document.getElementById('logs-invoice').style.display = 'none';
} else {
    document.getElementById('confirm').style.display = 'none';
    document.getElementById('logs-invoice').style.display = 'flex';
}

if(localStorage.getItem('banklogs') && ((JSON.parse(localStorage.getItem('banklogs')).length) > 0)){

    items = JSON.parse(localStorage.getItem('banklogs'));
    document.getElementById('cartlength').innerText = (JSON.parse(localStorage.getItem('banklogs')).length);

    items.map(data=>{
        var image = `<td><img src=${data.image}></td>`
        var balance = `<td class="btn-balance">${data.balance}</td>`
        var price = `<td class="btn-price">${data.price}</td>`
        var remove = `<td><button class="btn-cloze btn-remove"></button></td>`
        var account = `<td>${data.account}</td>`
        var website = `<td>${data.website}</td>`
        var info1 = `<td>${data.info1}</td>`
        var info2 = `<td>${data.info2}</td>`
        var info3 = `<td>${data.info3}</td>`
        var info4 = `<td>${data.info4}</td>`
        var info5 = `<td>${data.info5}</td>`
        var info6 = `<td>${data.info6}</td>`
        
        table3.row.add([
            image,
            balance,      
            account,   
            remove,
            price,
            info1,   
            info2,   
            info3,   
            info4,   
            info5,   
            info6,   
            website,      
        ]).draw();
    });

    var removeFromCartButtons = document.getElementsByClassName('btn-remove');
    for(var i = 0; i <removeFromCartButtons.length; i++){
        var button = removeFromCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }
    updateCartTotal();

} else {
    document.getElementById('cartlength').style.display = 'none';
    setBtn.innerHTML = `Bank Log <img src="img/partners/bitcoin.png">`;
    setBtn.removeAttribute('data-bs-toggle');
    setBtn.setAttribute('href', 'banklogs');

    document.getElementById('thetot').setAttribute('data-bs-target', '#vpnModal');

    if (window.innerWidth > 1092) {
        modalDialog.style.top = '7vh';
        modalDialog.style.minWidth = '85vw';
    } 
}


function removeCartItem(event) {
    var buttonClicked = event.target
    var cartItem = buttonClicked.parentElement.parentElement;
    var price = cartItem.children[4].innerText;
    var balance = cartItem.children[1].innerText;
    var account = cartItem.children[2].innerText;
    var website = cartItem.children[11].innerText;
    var image = cartItem.children[0].children[0].src;
    var info1 = cartItem.children[5].innerText;
    var info2 = cartItem.children[6].innerText;
    var info3 = cartItem.children[7].innerText;
    var info4 = cartItem.children[8].innerText;
    var info5 = cartItem.children[9].innerText;
    var info6 = cartItem.children[10].innerText;
    removeItemFromCart(price, balance, account,website,image,info1,info2,info3,info4,info5,info6);
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal()
}

function removeItemFromCart(price, balance,account,website,image,info1,info2,info3,info4,info5,info6){
    let item = {
        price: price,
        balance: balance,
        account: account,
        website: website,
        image: image,
        info1: info1,
        info2: info2,
        info3: info3,
        info4: info4,
        info5: info5,
        info6: info6
    }
    function checkAdult(items) {
        return JSON.stringify(items) !== JSON.stringify(item)
    }
    localStorage.setItem('banklogs', JSON.stringify(items.filter(checkAdult)));
    items = items.filter(checkAdult);
    window.location.reload()
}


function updateCartTotal() {
    let items3 = (JSON.parse(localStorage.getItem('banklogs')));
    var total = 0;
    items3.map(data=>{
        var price4 = data.price.replace('Price: ','').replace(',','').replace('$','');
        total = total + (price4 * 1);
    });
    
    document.getElementById('theno1').innerHTML = 'Cart: ' + JSON.parse(localStorage.getItem('banklogs')).length + ' , Total: $' + total.toLocaleString();

    document.getElementById('thetot').innerHTML = `Cart:  <span>$${total.toLocaleString()}</span>`;

    document.getElementById('than-check').innerHTML = `Checkout <span class="muher">$${total.toLocaleString()}</span>`;
    document.getElementById('phone-check').innerHTML = `Checkout <span class="muher">$${total.toLocaleString()}</span>`;
    document.getElementById('email-check').innerHTML = `Checkout <span class="muher">$${total.toLocaleString()}</span>`;
    document.getElementById('anon-link').innerHTML = `Checkout <span class="muher">$${total.toLocaleString()}</span>`;


    setBtn.innerHTML = `Cart: $${total.toLocaleString()} <img src="img/partners/bitcoin.png">`;
    if((JSON.parse(localStorage.getItem('banklogs')).length) == 1) {

        var bankLog = (JSON.parse(localStorage.getItem('banklogs'))[0].account);
        var bankLog2 = bankLog.substring(bankLog.indexOf("[") + 1);

        var n = bankLog.indexOf('[');
        var bankLog3 = bankLog.substring(0, n != -1 ? n : bankLog.length);

        const bankBal = (JSON.parse(localStorage.getItem('banklogs'))[0].balance);


        if(bankLog3.includes('Huntington') || bankLog3.includes('Woodforest')) {
            document.getElementById('jinaHolder').value = bankLog3.replace('Bank', '');
            document.getElementById('jinaHolder3').value = bankLog3.replace('Bank', '');
        } else {
            document.getElementById('jinaHolder').value = bankLog3;
            document.getElementById('jinaHolder3').value = bankLog3;
        }

        document.getElementById('jinaHolder2').innerHTML = bankLog2.replace(']', ' ACCOUNT'); 


        wouldYou.innerHTML = `
            ${bankLog} <br> with <span>${bankBal}</span> 
        `;

        cartLogo.src =  `${(JSON.parse(localStorage.getItem('banklogs'))[0].image)}`;

        bitCoin.src = `${(JSON.parse(localStorage.getItem('banklogs'))[0].image)}`;
        bitMail.src = `${(JSON.parse(localStorage.getItem('banklogs'))[0].image)}`;
        bitPhone.src = `${(JSON.parse(localStorage.getItem('banklogs'))[0].image)}`;
        bitSms.src = `${(JSON.parse(localStorage.getItem('banklogs'))[0].image)}`;

        theLogo.src = `${(JSON.parse(localStorage.getItem('banklogs'))[0].image)}`;
        theLogo2.src = `${(JSON.parse(localStorage.getItem('banklogs'))[0].image)}`;

        if(bankLog.includes('Chime') || bankLog.includes('Wells')) {
            bitCoin.classList.add('bit-img');
            bitMail.classList.add('bit-img');
            bitPhone.classList.add('bit-img');
            bitSms.classList.add('bit-img');

            theLogo.classList.add('bit-img');
            theLogo2.classList.add('bit-img');

            theLogo.classList.add('logo-50');
            theLogo2.classList.add('logo-50');
        } 

    } else if((JSON.parse(localStorage.getItem('banklogs')).length) > 1) {
        var Loginz = (JSON.parse(localStorage.getItem('banklogs')));
    
        for(var i = 0; i < Loginz.length; i++) {
            var logRow = document.createElement('span');
            logRow.style.fontWeight = '500';
            logRow.innerHTML = `
                ${(Loginz[i].account)} <br>
                <span>${Loginz[i].balance}</span>. 
                <hr class="nohr">
            `;
            wouldYou.append(logRow);
        }

        document.getElementById('wild').style.display = 'none';
        document.getElementById('wild-hr').style.display = 'none';
        document.getElementById('wild-hr2').style.display = 'none';
        
        bitCoin.classList.add('bit-img');


        document.getElementById('jinaHolder').value = '2 Bank Logs';
        document.getElementById('jinaHolder3').value = '2 Bank Logs';
        

        document.getElementById('jinaHolder2').innerHTML = 'With 10% Discount'; 
    } 




    if(JSON.parse(localStorage.getItem('banklogs')).length == 1) {
        const bankLog = (JSON.parse(localStorage.getItem('banklogs'))[0].account);
        const bankBal = (JSON.parse(localStorage.getItem('banklogs'))[0].balance);

        const invoiceType = document.getElementById('invoice-type');
        const theSave1 = document.getElementById('save-1');
        const theSave2 = document.getElementById('save-2');
        const theSave3 = document.getElementById('save-3');


        if(bankLog.includes('Huntington') || bankLog.includes('Woodforest')) {
            invoiceType.innerHTML = bankLog.split('Bank')[0];
            theSave1.innerHTML = `
                ${bankLog} <br> <span>${bankBal}</span>.
            `;
        } else if(bankLog.includes('America')) {
            invoiceType.innerHTML = 'BankofAmerica';
            theSave1.innerHTML = `
                ${bankLog} <br> <span>${bankBal}</span>.
            `;
        } else {
            invoiceType.innerHTML = bankLog.split('[')[0];
            theSave1.innerHTML = `
                ${bankLog} <br> <span>${bankBal}</span>.
            `;
        }
        theSave2.innerHTML = `
        10% <span id="disco">discount</span> on 2 logs.
        `;
        theSave3.innerHTML = `
            Bank logs can be sent via <br> 
            <span>email</span> or <span>SMS</span>.
        `;
    } else {
        var Loginz = (JSON.parse(localStorage.getItem('banklogs')));

        const theSave1 = document.getElementById('save-1');
        const theSave2 = document.getElementById('save-2');
        const theSave3 = document.getElementById('save-3');

        theSave1.innerHTML = '';
        document.getElementById('invoice-type').innerHTML = '2 Bank Logs';

        for(var i = 0; i < Loginz.length; i++) {
            var logRow = document.createElement('p');
            var logItems = document.getElementById('save-1');
            logRow.innerHTML = `
                <hr class="thehr thezoo"> 
                ${Loginz[i].account}  <br> <span>${Loginz[i].balance}</span>. 
                <hr style="opacity: 0 !important; margin-bottom: -10px !important; margin-top: -7px !important">
            `;
            logItems.prepend(logRow);
        }

        theSave2.style.display = 'none';
		document.getElementsByClassName('pending-2')[0].style.display = 'none';
        theSave3.innerHTML = `
            Bank logs can be sent via <br> 
            <span>email</span> or <span>SMS</span>.
        `;
    }

    if(JSON.parse(localStorage.getItem('banklogs')).length == 1) {
        if (window.innerWidth > 1092) {
            modalDialog.style.top = '7vh';
            modalDialog.style.minWidth = '85vw';
        } 
    } else if(JSON.parse(localStorage.getItem('banklogs')).length == 2) {
        if (window.innerWidth > 1092) {
            modalDialog.style.top = '5vh';
            modalDialog.style.minWidth = '92vw';
        } 
    } 

    if(localStorage.getItem('timez-set')) {
        localStorage.removeItem('timez-set');
    }
}