document.addEventListener('DOMContentLoaded', function (e) {
    let elements = document.getElementsByClassName("unit");
    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute('onclick', "getData(this.id)");
    }
});
function getData(id){
    let name = document.getElementById(id+"-name").innerText;
    let price = document.getElementById(id+"-price").innerText;
    let direction = document.getElementById(id+"-img").getAttribute('src');
    let description = 'Descripcion no disponible ';
    let jsonTicket ={
        //  key: value
            "id": id,
            "name": name,
            "price": price,
            "description": description,
            "images": direction
    };
    window.localStorage.removeItem('item');
    window.localStorage.setItem('item',JSON.stringify(jsonTicket));
    window.open('../product.html', '_self');
}