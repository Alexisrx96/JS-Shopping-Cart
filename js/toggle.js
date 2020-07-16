document.getElementById("toggle").addEventListener("click", displayContent);


let toggle = false;
function displayContent() {
    if (toggle) {
        document.getElementById("toggle").className = "nav-item";
        toggle = false;
    } else {
        document.getElementById("toggle").className = "nav-item nav-item-active";
        toggle = true;
    }
}