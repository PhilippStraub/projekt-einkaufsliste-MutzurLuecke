function addlist(){
    var eingabe = prompt("Bitte die ID der Liste eingeben:", "ID");
    if(eingabe != null){
        if(eingabe != ""){
            fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists/"+eingabe).then(
                function (antwort) {
                    if(antwort.status == 200){
                        return antwort.json();
                    } else {
                        alert("Fehler aufgetreten:" + antwort.status);
                        throw new Error("Fehler aufgetreten:" + antwort.status);
                    }
                }).then(
                function (json) {
                console.log(json["name"]);
                var nameListe = json["name"];
                var newElement = document.createElement("div");
                newElement.innerHTML = nameListe;
                newElement.className = 'liste';
                newElement.id = json._id;
                newElement.addEventListener('click',
                function(event) {
                    console.log(event.target.id);
                    showlist(event.target.id);
                });
                

                
                

            document.getElementById("elemente").appendChild(newElement);
            showlist(eingabe);
            
            



            });

            
            
        } else{
            alert("Keine Eingabe erhalten!\nBitte erneut versuchen.");
        }
    }else{
        
    }
}

function showlist(id){
    fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists/"+id).then(
        function(antwort){
            return antwort.json();
        }).then(
            function(json){
                var c = document.getElementById("mainframe").childNodes;
                var element = c[0];
                console.log(element);

                //Elemente davor entfernen
                const e1 = document.getElementById("mainframe");
                while (e1.firstChild) {
                e1.removeChild(e1.firstChild);
                }
                for (i = 0; i < Object.keys(json.items).length; i++){
                    var items = json["items"][i]["name"];
                    var newElement = document.createElement("div");
                    newElement.className = "item";


                    newElement.innerHTML = '<label class="switch"><input type="checkbox"><span class="slider round"></span></label>' + items;
                    document.getElementById("mainframe").appendChild(newElement);
                }

            }
        )
        
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
    newElement.id = "mainframe";
    document.getElementById("main").appendChild(newElement);

    var c1 = document.getElementById("main").childNodes;
    console.log(c1);
    var e2 = c1[0];
    console.log(e2);
}

function list(){
    //Elemente davor entfernen
    const e1 = document.getElementById("main");
    while (e1.firstChild) {
    e1.removeChild(e1.firstChild);
    }

    //Neue Elemente anzeigen
    var newElement = document.createElement("div");
	newElement.innerHTML = '<div class="item">Element1</div><div class="item">Element2</div>';
    newElement.id = "mainframe";
    document.getElementById("main").appendChild(newElement);
    
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
