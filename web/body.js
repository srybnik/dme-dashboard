
var globalError = false;
var ws

window.addEventListener("load", function (evt) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://" + location.host + "/cfg");
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        // console.log(xhr.response);
        render(xhr.response);
    };

    ws = new WebSocket("ws://" + location.host + "/ws");
    ws.onmessage = function (evt) {
             handle(evt.data)
    }
    ws.onerror = function (evt) {
        // console.error("ERROR: " + evt.data)
        globalError = true
    }
    ws.onclose = function (evt) {
        // console.error("ERROR: " + evt.data)
        document.body.style.backgroundColor = "#f34949";
        globalError = true
    }

    document.getElementById("1").onclick = function () {
            wsSend("1", 4, false);
    };

    document.getElementById("config").onclick = function() {
        window.open("http://" + location.host +"/config");
    };

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            wsSend("1", 4, false);
        }
    });

    document.oncontextmenu = function () {
        return false;
    }
    document.onclick = function () {
        menu = document.getElementById('menu')
        menu.classList.remove('show')
    }

    setInterval(ping, 5000)
});

function wsSend(elementID, typeID, value) {
    ws.send(JSON.stringify({id: elementID, typeID: typeID, value: value.toString()}));
}

function handle(str) {
    // console.log(str)
    obj = JSON.parse(str);
    let elmnt = document.getElementById(obj.id)

    // Тип led
    if (elmnt && obj.typeID == 1) {
        elmnt.className = obj.value
    }
    // Тип панель
    if (elmnt && obj.typeID == 2) {
        elmnt.className = obj.value
    }
    // Тип переключатель
    if (elmnt && obj.typeID == 3) {
        elmnt.checked = JSON.parse(obj.value)
    }
    // Табло
    if (elmnt && obj.typeID == 5) {
        elmnt.checked = JSON.parse(obj.value)
        renderVPP();
    }
     // Таймер
    if (elmnt && obj.typeID == 6) {
        elmnt.textContent = obj.value
    }
    // Подсветка таймера красным
    if (elmnt && obj.typeID == 7) {
        elmnt.className = obj.value
    }
    // Красная кнопка
    if (elmnt && obj.typeID == 4) {
        elmnt.className = obj.value
        if (obj.value == "img") {
            // stopSignal();
        } else {
            // stopSignal();
            startSignal();
        }
    }
}


function startSignal() {
    // new Promise(() => setTimeout(() => {
        var s = document.getElementById("Signal");
        s.play()
    // }, 5000));
}

function stopSignal() {
    // new Promise(() => setTimeout(() => {
        var s = document.getElementById("Signal");
        s.pause()
        s.load()
    // }, 5000));
}

function renderVPP() {
    for (var i of [11, 12]) {
        var checkboxVPP = document.getElementById(i)
        var ledVPP1 = document.getElementById("ledVPP"+i+"-1")
        var ledVPP2 = document.getElementById("ledVPP"+i+"-2")

        if (checkboxVPP && checkboxVPP.checked) {
            ledVPP1.className = "white"
            ledVPP2.className = "green"
        } else if (checkboxVPP && !checkboxVPP.checked) {
            ledVPP1.className = "green"
            ledVPP2.className = "white"
        } else {
            ledVPP1.className = "grey"
            ledVPP2.className = "grey"
        }
    }
}


async function ping() {
    try {
        const c = new AbortController();
        const id = setTimeout(() => c.abort(), 2000);
        const r = await fetch("http://" + location.host + "/ping", {signal: c.signal});
        clearTimeout(id);
        if (globalError) {
            window.location.reload()
        }
    } catch (err) {
        console.error("ERROR PING: " + err)
        document.body.style.backgroundColor = "#f34949";
        globalError = true
    }
}


function render(cfg) {
    for (var item of cfg.tabloItems) {
        var checkboxVPP = document.getElementById(item.id)
        checkboxVPP.onchange = function () {
             wsSend(this.id, 5, this.checked)
        }
        if (!item.isActive) {
            checkboxVPP.parentNode.removeChild(checkboxVPP);
        }
    }
    renderVPP();


    for (var item of cfg.objects) {
        var objectBody = document.getElementById('table-panel-' + item.panelID);

        var objectTD = document.createElement('td');
        objectTD.setAttribute('class', "col")
        objectBody.appendChild(objectTD)

        var objectDiv = document.createElement('div');
        objectDiv.setAttribute('class', 'mydiv')
        objectDiv.setAttribute('id', item.objectID)
        objectTD.appendChild(objectDiv)

        var headerDiv = document.createElement('div');
        headerDiv.setAttribute('class', 'mydivheader')
        headerDiv.innerHTML = item.objectName

        objectDiv.appendChild(headerDiv)
        objectDiv.appendChild(document.createElement('p'))
    }


    for (var item of cfg.items) {
        var itemBody = document.getElementById(item.objectID);
        if (item.typeID != 3) {

            // <div id="Led72" className="white">Фид. 2</div>

            var itemDiv = document.createElement('div');
            if (item.isActive) {
                itemDiv.setAttribute('class', 'white')
            } else {
                itemDiv.setAttribute('class', 'grey')
            }
            if (item.typeID == 2) {
                itemDiv.setAttribute('style', 'border-radius: 15px')
            }
            itemDiv.setAttribute('id', item.id)
            itemDiv.innerHTML = item.name
            itemDiv.oncontextmenu = function () {
                contextmenu(event, this.id);
            }
            itemBody.appendChild(itemDiv)
        } else {

            // <p>Выкл ДГ</p>
            // <label id="label10" class="switch">
            //     <input id="Checkbox10" type="checkbox" unchecked>
            //     <span class="slider round"></span>
            // </label>

            var p = document.createElement('p')
            p.innerHTML = item.name
            itemBody.appendChild(p)

            var label = document.createElement('label')
            label.setAttribute('class', 'switch')
            itemBody.appendChild(label)

            if (item.isActive) {
                var input = document.createElement('input')
                input.setAttribute('id', item.id)
                input.setAttribute('type', 'checkbox')
                input.onchange = function () {
                    wsSend(this.id, 3, this.checked)
                }
                label.appendChild(input)
            }
            var span = document.createElement('span')
            span.setAttribute('class', 'slider round')
            span.setAttribute('id', item.id)
            span.oncontextmenu = function () {
                contextmenu(event, this.id);
            }
            label.appendChild(span)
        }
        itemBody.appendChild(document.createElement('p'))
    }
}

function contextmenu(evt, elementID) {
    fetch("http://" + location.host + "/cfg")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // console.log(elementID)

            for (var item of data.items){
                if (item.id == elementID){
                    pin = "PA"+item.pinID
                    if (item.pinID > 7){
                        pin = "PB"+(item.pinID-8)
                    }
                    name = item.name + "<hr>" + "Плата: " + item.boardID +"  Пин: " + pin
                    document.getElementById('contextMenu').innerHTML = name
                }
            }

            evt.preventDefault();
            menu = document.getElementById('menu')
            menu.style.marginLeft = (evt.clientX - 15) + "px";
            menu.style.marginTop = (evt.clientY - 1040) + "px";
            menu.classList.add('show')
        })
}
