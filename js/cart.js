function localControl() {

    if (localStorage.length>0) {
        for (let i = 0; i < localStorage.length; i++) {
            if(localStorage.key(i)!='item'){
                let keyName = localStorage.key(i);
                let element = JSON.parse(localStorage.getItem(keyName));
                document.getElementById(`${keyName}`).onclick= function(){
                    let r = confirm(`Estás a punto de eliminar ${element.name} de tu carrito de compras`);
                    if (r == true) {
                        document.getElementById(`${keyName}`).className = "product none";
                        localStorage.removeItem(keyName);
                    }
                };
                setElementsJson(element);
            }
        }
    }
}
document.addEventListener('DOMContentLoaded', function (e) {
    localControl();
});
document.getElementById("acept").addEventListener("click", function(){
    getTicket();
    clearCart();
});
function setElementsJson(jsonItem){
    document.getElementById(`${jsonItem.id}`).className = "product";
    document.getElementById(`${jsonItem.id}_price`).innerHTML = (+jsonItem.unitPrice).toFixed(2);
    document.getElementById(`${jsonItem.id}_name`).innerHTML = jsonItem.name;
    document.getElementById(`${jsonItem.id}_quantity`).innerHTML = (+jsonItem.quantity);
    document.getElementById(`${jsonItem.id}_total`).innerHTML = jsonItem.total;
}

function getTicket() {
    var ticket = 'Gracias por preferir a LA TIENDA, recuerda que siempre tenemos los mejores precios!\n ';
    ticket+= '\nTu compra es:\n';
    if (localStorage.length>0) {
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            if(localStorage.key(i)!='item'){
                let keyName = localStorage.key(i);
                let element = JSON.parse(localStorage.getItem(keyName));
                total+=(+element.total);
                ticket += `\t${element.quantity} ${element.name} $${element.total} ($${element.unitPrice} c/u)\n`;
            }
        }
        ticket+= `TOTAL: $${(total).toFixed(2)}\n\n¡Te eperamos de vuelta!`;
        
    }
    alert(ticket);
}
function clearCart(){
    if (localStorage.length>0) {
        for (let i = 0; i < localStorage.length; i++) {
            if(localStorage.key(i)!='item'){
                let keyName = localStorage.key(i);
                document.getElementById(`${keyName}`).className = "product none";
            }
        }
        localStorage.clear();
    }
}