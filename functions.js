function addlist(){
    var eingabe = prompt("Bitte den Namen der Liste eingeben:", "Listname");
    if(eingabe != ""){
        //HTTP Get request
    } else{
        alert("Keine Eingabe erhalten!\nBitte erneut versuchen.");
    }
}

function home(){
    var c = document.getElementById("main").childNodes;
    var element = c[0];
    console.log(element);

    //Elemente davor entfernen
    const e1 = document.getElementById("main");
    while (e1.firstChild) {
    e1.removeChild(e1.firstChild);
    }

    //Neue Elemente anzeigen
    var newElement = document.createElement("div");
	newElement.innerHTML = "<div><h4>Test</h4></div>";
    newElement.className = "class1"
    document.getElementById("main").appendChild(newElement);

    var c1 = document.getElementById("main").childNodes;
    console.log(c1);
    var e2 = c1[0];
    console.log(e2);
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
/*
var url = "http://shopping-lists-api.herokuapp.com/api/v1/liste/5da965bba83b600017fd5c0b/items/";
var req = new XMLHttpRequest();
req.open("POST", url, true);
req.setRequestHeader("Content-Type", "application/json");

//In JSON-Format wandeln um benötigte Parameter auszufüllen
var data = JSON.stringify({"name": ITEM1});
console.log(data);

//Daten senden 
req.send(data);



//Wenn Antwort erhalten soll diese dem Nutzer mitgeteilt werden.
req.onreadystatechange = function()
{
}
*/
