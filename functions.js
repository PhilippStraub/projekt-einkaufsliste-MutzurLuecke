function addlist(){
    var eingabe = prompt("Bitte den Namen der Liste eingeben:", "Listname");
    if(eingabe != ""){
        //HTTP Get request
    } else{
        alert("Keine Eingabe erhalten!\nBitte erneut versuchen.");
    }
}

/*
function add(){
    var newElement = document.createElement("div");
    //newElement.textContent = "<h4>Test</h4>";
	newElement.innerHTML = "<h4>Test</h4>";
	newElement.className = "class1"
    document.getElementById("items").appendChild(newElement);
}

function remove(){
    document.querySelector("div");
    document.getElementById("items").parentNode.removeChild("div");
}
*/