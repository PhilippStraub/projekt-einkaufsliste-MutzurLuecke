var apikey = null; //Dev API Key: a3f48db84af0037bac2c9ad2fd5fbf88
var listen = [null];
var zähler = 0;
aktiveListen();
document.getElementById("benutzer").value = "Einloggen..";
home();

function aktiveListen() {
    if (listen[0] != null) {
        for (var i = 0; i < listen.length; i++) {
        }
    } else {}
}

function addlist() {
    var eingabe = prompt("Bitte die ID der Liste eingeben:", "ID");
    if (eingabe != null) {
        if (eingabe != "" && checkSyntax(eingabe) == true) {
            addListe(eingabe);
            new Promise(function () {
                var current = document.getElementsByClassName("liste");
                for (var i = 1; i < current.length; i++) {
                    current[i].className = "liste";
                }
            })
        } else {
            alert("Keine Eingabe erhalten!\nBitte erneut versuchen.");
        }
    } else {}
}

function addListe(eingabe) {
    fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + eingabe).then(
        function (antwort) {
            if (antwort.status == 200) {
                return antwort.json();
            } else {
                alert("Fehler aufgetreten:" + antwort.status);
                throw new Error("Fehler aufgetreten:" + antwort.status);
            }
        }).then(
            function (json) {
                var nameListe = json["name"];
                var newElement = document.createElement("button");
                newElement.innerHTML = nameListe + '<a title="Liste ausblenden"><img src=pictures/minus.png class="trash" id="rempic" onclick="removeListe(' + "'" + json._id + "'" + ')" alt="Ausblenden"></a><a title="Liste löschen"><img src=pictures/trash.png class="trash" onclick="deleteListe(' + "'" + json._id + "'" + ')" alt="Entfernen"></a>';
                newElement.className = 'liste';
                newElement.id = json._id;
                newElement.addEventListener('click',
                    function (event) {
                        btns = header.getElementsByClassName("liste");
                        markieren();
                        showlist(event.target.id);
                    });
                
                document.getElementById("elemente").appendChild(newElement);
                showlist(eingabe);
            });
}

function showlist(id) {
    fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + id).then(
        function (antwort) {
            return antwort.json();
        }).then(
            function (json) {
                var c = document.getElementById("mainframe").childNodes;
                var element = c[0];  
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
                newHinzufuegen.addEventListener('click',
                    function adding(event) {
                        var eingabe = prompt("Bitte Namen des neuen Elements eingeben", "Name");
                        if (eingabe != null) {
                            if (eingabe != "" && eingabe != "Name" && checkSyntax(eingabe) == true) {
                                fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + json._id + "/items",
                                    {
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        method: "POST",
                                        body: JSON.stringify({ name: eingabe })
                                    }).then(
                                        function (res) {
                                            return res.json();
                                        }).then(
                                            function (event) {
                                                showlist(json._id);
                                            }
                                        )
                            } else {
                                alert("Keine Eingabe erhalten!\nBitte erneut versuchen.");
                            }
                        } else {
                        }
                    });
                document.getElementById("mainframe").appendChild(newHinzufuegen);
                var stringarraykauf = [];
                for (i = 0; i < Object.keys(json.items).length; i++) {
                    var items = json["items"][i]["name"];
                    var id = json["items"][i]["_id"];
                    var newElement = document.createElement("div");
                    var kauf = json["items"][i]["bought"];
                    stringarraykauf.push(JSON.stringify(kauf));
                    newElement.className = "item";
                    newElement.id = id;
                    newElement.value = false;
                    if (kauf == false) {
                        newElement.innerHTML = '<label class="switch"><input type="checkbox" id="' + id + '" onclick="check(' + "'" + id + "'," + "'" + json._id + "'," + kauf + ')"><span class="slider round"></span></label>' + items + '<img src=pictures/trash.png class="trash" onclick="deleteElement(' + "'" + json._id + "'," + "'" + id + "'" + ')" alt="Entfernen">';
                        document.getElementById("mainframe").appendChild(newElement);
                    }
                    else {
                        newElement.style = "text-decoration:line-through; color:lightgray"
                        newElement.innerHTML = '<label class="switch"><input type="checkbox" id="' + id + '" onclick="check(' + "'" + id + "'," + "'" + json._id + "'," + kauf + ')" checked><span class="slider round"></span></label>' + items + '<img src=pictures/trash.png class="trash" onclick="deleteElement(' + "'" + json._id + "'," + "'" + id + "'" + ')" alt="Entfernen">';
                        document.getElementById("mainframe").appendChild(newElement);
                    }
                }
                if (allEqual(stringarraykauf) == true) {
                    document.getElementById(json._id).style = "text-decoration:line-through; color:grey"
                }
                else {
                    document.getElementById(json._id).style = "text-decoration:none; color:black"
                }
            }
        )
}

function allEqual(arr) {
    x = new Set(arr)
    if (x.has("false")) {
        return false;
    }
    else if (x.size == 1 && x.has("true")) {
        return true;
    }
    else {}
}

function checkSyntax(text){
    arr = new Set(text);
    if (arr.has("<")){
        return false;
    }
    if (arr.has(">")){
       return false; 
    }
    else {return true;}
}

function home() {
    var c = document.getElementById("main").childNodes;
    var element = c[0];
    //Elemente davor entfernen
    const e1 = document.getElementById("main");
    while (e1.firstChild) {
        e1.removeChild(e1.firstChild);
    }
    //Neue Elemente anzeigen
    var newElement = document.createElement("div");
    newElement.innerHTML = '<div class="start" id="begrüßung"><h1>Herzlich Willkommen zu deiner Lieblings ToDo-App!</h1></div><div class="start" id="tutorial"><h1 id="tut">Wie funktionert das Ganze?</h1><br><h3 id="tutu">Nachdem du dir ein <a href="https://shopping-lists-api.herokuapp.com/">Konto erstellt<a> und deine API erhalten hast, kannst du dich im Feld rechts oben einloggen. Sobald das geschehen ist, werden alle Listen die du bereits erstellt hast, angezeigt. Des weiteren lassen sich von dir dort weitere Listen erstellen. <br><br>Auf "Liste hinzufügen" kannst du auch Listen auf Listen deiner Freunde zugreifen, solange du die genaue ID besitzt.<br><br>Der Rest erklärt sich von selbst, VIEL SPAß!</h3></div>';
    newElement.id = "mainframe";
    document.getElementById("main").appendChild(newElement);
    var c1 = document.getElementById("main").childNodes;
    var e2 = c1[0];
    var current = document.getElementsByClassName("liste");
    current[0].className = "liste active";
    for (var i = 1; i < current.length; i++) {
        current[i].className = "liste";
    }
}

function list() {
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

function deleteElement(liste, element) {
    //DELETE fetch
    fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + liste + "/items/" + element,
        {
            method: "DELETE",
        }).then(
            function () {
                showlist(liste);
            })
}

function deleteListe(liste) {
    //DELETE fetch
    fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + liste,
        {
            headers: {
                'Authorization': apikey,
            },
            method: "DELETE",
        }).then(
            function () {
                home();
                //Liste an der Seite löschen
                var element = document.getElementById(liste);
                element.parentNode.removeChild(element);
            }
        )
}

function listeErstellen() {
    if (apikey == null) {
        alert("Bitte einloggen.");
        document.getElementById("eingabefeld").value = "";
    } else {
        var eingabe = document.getElementById("eingabefeld").value;
        if (eingabe != "" && checkSyntax(eingabe) == true) {
            fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': apikey
                    },
                    method: "POST",
                    body: JSON.stringify({ name: eingabe })
                }).then(
                    function (res) {
                        return res.json();
                    }).then(
                        function (json) {
                            var eingabe = prompt('Eine neue Liste: "' + json.name + '" wurde erstellt:', json._id);
                            console.log('Eine neue Liste: "'+ json.name + '" wurde erstellt: ' + json._id);
                            if (eingabe != null) {
                                if (eingabe != "" && checkSyntax(eingabe) == true) {
                                    addListe(eingabe);
                                } else {
                                    alert("Keine Eingabe erhalten!\nBitte erneut versuchen.");
                                }
                            } else {
                            }
                        }
                    )
            var current = document.getElementsByClassName("liste");
            current[0].className = "liste active";
            for (var i = 1; i < current.length; i++) {
                current[i].className = "liste";
            }
            document.getElementById("eingabefeld").value = "";
        }
    }
}

//Wenn in input-field für neue Liste enter gedrückt wird, wird button daneben drückt
var input = document.getElementById("eingabefeld");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
});


function benutzerWechseln() {
    var eingabe = prompt('Bitte API Key eingeben:', 'Key');
    if (eingabe != null) {
        if (eingabe != "" && checkSyntax(eingabe) == true) {
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
        } else {
            alert("Keine Eingabe erhalten!\nBitte erneut versuchen.");
        }
    }
}

function showAllLists() {
    //Request list an Backend
    fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists/",
        {
            headers: {
                'Authorization': apikey,
            },
            method: "GET",
        }).then(
            function (res) {
                return res.json();
            }).then(
                function (json) {
                    for (var i = 0; i < json.length; i++) {
                        addListe(json[i]._id);
                    }
                }
            )
    home();
}

function check(element, liste, gekauftVal) {


    //Falls noch nicht gekauft auf gekauft setzen
    if (gekauftVal == false) {
        gekauftVal = true;
        fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + liste + "/items/" + element,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({ "bought": gekauftVal })
            }).then(
                function () {
                    showlist(liste);
                }
            )
    }
    //Falls schon gekauft auf nicht gekauft setzen
    else if (gekauftVal == true) {
        gekauftVal = false
        fetch("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + liste + "/items/" + element,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({ "bought": gekauftVal })
            }).then(
                function () {
                    showlist(liste);
                }
            )
    }

}

function removeListe(id) {

    //Liste an der Seite löschen
    var liste = document.getElementById(id);
    liste.parentNode.removeChild(liste);
    setTimeout(function () {
        home();
    }, 500);
}

var header = document.getElementById("elemente");
var btns = header.getElementsByClassName("liste");
function markieren() {
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}
markieren();