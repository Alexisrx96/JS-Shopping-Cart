document.addEventListener('DOMContentLoaded', function (e) {
    setElementsJson();
    updateTotal();
});
window.addEventListener("load", function() {
    document.getElementById("quantity").addEventListener('change', function(){ 
        return soloNumeros(event);
        }, false);
    });
document.getElementById('pluss').addEventListener('click',pluss);
document.getElementById('less').addEventListener('click',less);
document.getElementById("quantity").addEventListener('input', inputValue);
document.getElementById("cart").addEventListener('click', addToCart);
let value = document.getElementById("quantity").value;
let text = window.localStorage.getItem('item');
let objJson = JSON.parse(text);
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                var allText = rawFile.responseText;
                document.getElementById("description").innerHTML = allText;
            }
        }
    }
    rawFile.send(null);
}
function setElementsJson(){
    document.getElementById("name").innerHTML = objJson.name;
    document.getElementById("image1").src  = objJson.images;
    document.getElementById("price").innerHTML = (+objJson.price).toFixed(2);
    readTextFile("../"+objJson.description);
}
function pluss() {
    document.getElementById("quantity").value = value < 999 ? ++value : value ;
    updateTotal();
}
function less() {
    document.getElementById("quantity").value = value > 1 ? --value : value ;
    updateTotal();
}
    //Solo permite introducir números.
function soloNumeros(e){
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
        //Usando la definición del DOM level 2, "return" NO funciona.
        e.preventDefault();
    }
}
function inputValue(){
    value = document.getElementById("quantity").value;
    value = value<1? 1: value<999? value : 999;
    document.getElementById("quantity").value = value;
    updateTotal();
    
}

function updateTotal(){
    let price =document.getElementById("price").innerHTML;
    value = document.getElementById("quantity").value;
    document.getElementById("total").innerHTML = (value * price).toFixed(2);

}

function addToCart(){
    let cartText = window.localStorage.getItem(`${objJson.id}`);
    let total = (+value * +objJson.price).toFixed(2);
    let r = confirm(`Estás a punto de agregar ${value} de ${objJson.name} a tu carrito de compras`);
    if (r == true) {
        if(cartText===null){
                addJson(objJson.id, objJson.name, objJson.price, total, (+value), objJson.images);
                console.log("No existía");
        }
        else{
            let cart = JSON.parse(cartText);
            cart.total= +cart.total + +total;
            cart.quantity = +cart.quantity + +value; 
            addJson(cart.id,cart.name,cart.unitPrice,cart.total,cart.quantity,cart.image);
        }
    }
}
function addJson(id,name,unitPrice,total,quantity,image) {
    let jsonTicket ={
        //  key: value
            "id": id,
            "name": name,
            "unitPrice": unitPrice,
            "total": total,
            "quantity": quantity,
            "image": image
        };
        localStorage.setItem(`${id}`,JSON.stringify(jsonTicket));
    alert(`Tienes ${jsonTicket.quantity} unidades de ${jsonTicket.name} en el carrito`);
    localStorage.removeItem('item');
    window.open('../Index.html', '_self');
}