var apikey = null; //Dev API Key: a3f48db84af0037bac2c9ad2fd5fbf88
var listen = [null];
var zähler = 0;
aktiveListen();
document.getElementById("benutzer").value = "Einloggen..";

// setInterval(function (){
//     btns = header.getElementsByClassName("liste");
//     markieren();
// }, 1000);

function aktiveListen(){
    
    if(listen[0] != null){
        for(var i = 0; i < listen.length; i++){
            /*
            addListe(listen[i]);
            console.log(listen[i]);
            addListe(window.localStorage.getItem(i));*/
        }
    }else{
        
    }
}

function addlist(){
    var eingabe = prompt("Bitte die ID der Liste eingeben:", "ID");
    if(eingabe != null){
        if(eingabe != ""){
            addListe(eingabe);
            // nicwnieocnmeocmwe
            
            new Promise(function(){
                var current = document.getElementsByClassName("liste");
                for (var i = 1; i < current.length; i++) {
                    current[i].className = "liste";
                }
                current[current.length-1].className = "liste active";
            })
            
            
            
        } else{
            alert("Keine Eingabe erhalten!\nBitte erneut versuchen.");
        }
    }else{
        
    }
}

function addListe(eingabe){
    
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
        var nameListe = json["name"];
        var newElement = document.createElement("button");
        newElement.innerHTML = nameListe + '<a title="Liste ausblenden"><img src=minus.png class="trash" id="rempic" onclick="removeListe('+ "'" + json._id + "'" + ')" alt="Ausblenden"></a><a title="Liste löschen"><img src=trash.png class="trash" onclick="deleteListe('+ "'" + json._id + "'" + ')" alt="Entfernen"></a>';
        newElement.className = 'liste';
        newElement.id = json._id;
        newElement.addEventListener('click',
        function(event) {
            btns = header.getElementsByClassName("liste");
            markieren();
            showlist(event.target.id);
        });
        /*
        listen[zähler] = String(eingabe);
        console.log(listen[zähler]);
        zähler++;*//*
        window.localStorage.setItem(zähler,String(eingabe));
        zähler++;*/
        

        
        

    document.getElementById("elemente").appendChild(newElement);
    
    showlist(eingabe);
    
    



    });
    

}

function showlist(id){
    console.log(id);
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
                var newHinzufuegen = document.createElement("div");
                newHinzufuegen.className = "item";
                newHinzufuegen.id = "additem";
                newHinzufuegen.innerHTML = 'Item hinzufügen';
                newHinzufuegen.liste = json._id;
                //Request
                newHinzufuegen.addEventListener('click',
                function adding(event) {
                    
                    var eingabe = prompt("Bitte Namen des neuen Elements eingeben", "Name");
                    if(eingabe != null){
                        if(eingabe != "" && eingabe != "Name"){
                            fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + json._id + "/items",
                            {
                                headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                                },
                                method: "POST",
                                body: JSON.stringify({name: eingabe})
                            }).then(
                                function(res){
                                return res.json();
                            }).then(
                                function(event) {
                                    showlist(json._id);
                                }
                            )  

                        }else{
                            alert("Keine Eingabe erhalten!\nBitte erneut versuchen.");
                        }
                    }else{

                    }                  
                });
                document.getElementById("mainframe").appendChild(newHinzufuegen);

                for (i = 0; i < Object.keys(json.items).length; i++){
                    var items = json["items"][i]["name"];
                    var id = json["items"][i]["_id"];
                    var newElement = document.createElement("div");
                    newElement.className = "item";
                    newElement.id = id;
                    newElement.innerHTML = '<label class="switch"><input type="checkbox"><span class="slider round"></span></label>' + items + '<img src=trash.png class="trash" onclick="deleteElement('+ "'" + json._id + "','" + id + "'" + ')" alt="Entfernen">';
                    console.log(items);
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
	newElement.innerHTML = '<div class="start" id="begrüßung"><h1>Herzliche willkommen zu deiner Lieblings ToDo-App</h1><h3>Mit diesem</h3></div><div class="start" id="tutorial"><h1 id="tut">Wie funktionert das Ganze?</h1><h3 id="tutu">Nachdem du deine API erhalten hast kannst du auf dem kleinen  Feld links unten eine neue Liste erstellen. Du musst nur den Key in das Textfeld kopieren und schon kannst du in deiner neuen Liste ToDos hinzufügen, als fertig gestellt markieren oder löschen.</h3></div>';
    newElement.id = "mainframe";
    document.getElementById("main").appendChild(newElement);

    var c1 = document.getElementById("main").childNodes;
    console.log(c1);
    var e2 = c1[0];
    console.log(e2);


    var current = document.getElementsByClassName("liste");
    current[0].className = "liste active";
    for (var i = 1; i < current.length; i++) {
        current[i].className = "liste";
    }
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

function deleteElement(liste, element){
    console.log(liste);
    console.log(element);
    console.log("Ich werde entfernt..");
    //DELETE fetch
    fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists/"+ liste +"/items/"+ element,
    {
        method: "DELETE",
    }).then(
        function(){
            showlist(liste);
    })
}

function deleteListe(liste){
    console.log("Ich werde entfernt..");
    //DELETE fetch
    
    fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + liste,
    {
        headers: {
        'Authorization': apikey,
        },
        method: "DELETE",
    }).then(
        function() {
            console.log("Nach Hause telefonieren");
            home();
            //Liste an der Seite löschen
            var element = document.getElementById(liste);
            element.parentNode.removeChild(element);
        }
    )  
}

function listeErstellen(){
    if(apikey==null){
        alert("Bitte einloggen.");
        document.getElementById("eingabefeld").value = "";
    }else{
        var eingabe = document.getElementById("eingabefeld").value;
        if(eingabe != ""){
            fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists",
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': apikey
                },
                method: "POST",
                body: JSON.stringify({name: eingabe})
            }).then(
                function(res){
                return res.json();
            }).then(
                function(json) {
                    var eingabe = prompt('Eine neue Liste: "'+ json.name + '" wurde erstellt:', json._id);
                    console.log('Eine neue Liste: "'+ json.name + '" wurde erstellt: ' + json._id);
                    if(eingabe != null){
                        if(eingabe != ""){
                            addListe(eingabe);
                        } else{
                            alert("Keine Eingabe erhalten!\nBitte erneut versuchen.");
                        }
                    }else{
                        
                    }
                }
            ) 
            document.getElementById("eingabefeld").value = "";
            
            
        } 
        
    }
      
}

//Wenn in input-field für neue Liste enter gedrückt wird, wird button daneben drückt
var input = document.getElementById("eingabefeld");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    document.getElementById("submit").click();
  }
});


function benutzerWechseln(){
    var eingabe = prompt('Bitte API Key eingeben:', 'Key');
    if(eingabe != null){
        if(eingabe != ""){
            apikey = eingabe;
            alert("Benutzer erfolgreich gewechselt!\nEingeloggt als: " + apikey);
            document.getElementById("benutzer").value = "Benutzer wechseln..";

            //Listen davor löschen
            const e1 = document.getElementById("elemente");
            while (e1.lastChild) {
            e1.removeChild(e1.lastChild);
            }
            var newElement = document.createElement("button");
            newElement.className = "liste active";
            newElement.id = "starter";
            document.getElementById("elemente").appendChild(newElement);
            showAllLists();
            
            
        } else{
            alert("Keine Eingabe erhalten!\nBitte erneut versuchen.");
        }
    }
    

}

function showAllLists(){
    //Request list an Backend
    fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists/",
    {
        headers: {
        'Authorization': apikey,
        },
        method: "GET",
    }).then(
        function(res){
        return res.json();
    }).then(
        function(json) {
            for(var i=0; i< json.length; i++){
                addListe(json[i]._id);
                
            }

            
           
        }
    )
    home(); 
    
    
}

function checked(liste, element){
    console.log(document.getElementsByName("checkbox").checked)
    if (document.getElementsByName("slider").input.checked == true){
        console.log("HI")
        status = false;
    }
    else {
        console.log("yey")
        status = true;
    
    }
    var jsonObject = status
   
    //Put
    console.log(liste, element);
    console.log(jsonObject)
    fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + liste + "/items/" + element,
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({"bought" : jsonObject})
    }).then(
        
        function() {
            showlist(liste);
        }
    )  
}


function removeListe(id){
    
    //Liste an der Seite löschen
    var liste = document.getElementById(id);
    liste.parentNode.removeChild(liste); 
    setTimeout(function (){
        home();
    }, 500);
    

}



var header = document.getElementById("elemente");
var btns = header.getElementsByClassName("liste");
function markieren(){
    for (var i = 0; i < btns.length; i++) {
        console.log("ja");
      btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
      });
    }
}
markieren();

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
