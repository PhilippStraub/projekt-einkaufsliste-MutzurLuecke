function addlist(){
    var eingabe = prompt("Bitte die ID der Liste eingeben:", "ID");
    if(eingabe != ""){

        if(listElements() == true){
            elementAnlegen(eingabe);
            
        } else {
            //letztes Element bzw Liste löschen
            document.querySelector("div");
            document.getElementById("elemente").parentNode.removeChild('div class="liste" onclick="list()"');
            elementAnlegen(eingabe);
        }

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
	newElement.innerHTML = '<div class="start" id="begrüßung"><h1>Herzliche willkommen zu deiner Lieblings ToDo-App</h1><h3>Mit diesem lblblblblblblblbllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll</h3></div><div class="start" id="tutorial"><h1 id="tut">Wie funktionert das Ganze?</h1><h3 id="tutu">Nachdem du deine API erhalten hast kannst du auf dem kleinen  Feld links unten eine neue Liste erstellen. Du musst nur den Key in das Textfeld kopieren und schon kannst du in deiner neuen Liste ToDos hinzufügen, als fertig gestellt markieren oder löschen.</h3></div>';
    newElement.className = "mainframe";
    document.getElementById("main").appendChild(newElement);

    var c1 = document.getElementById("main").childNodes;
    console.log(c1);
    var e2 = c1[0];
    console.log(e2);
}

function list(){
    var newElement = document.createElement("div");
	newElement.innerHTML = "<div><h4>Test</h4></div>";
    newElement.className = "mainframe";
    document.getElementById("main").appendChild(newElement);
    
}

function listElements(){
    var count = document.getElementById("elemente").childElementCount;
    if(count < 10){
        return true;
    } else {
        return false;
    }
}

function elementAnlegen(eingabe){
    //HTTP Get request
            
    var newElement = document.createElement("div");
    newElement.innerHTML = '<div onclick="list()">' + eingabe + '</div>';
    newElement.className = "liste";
    document.getElementById("elemente").appendChild(newElement);

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
