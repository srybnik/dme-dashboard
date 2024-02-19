let panels = [
    {id: 1, name: "ВПП-1"},
    {id: 2, name: "ВПП-2"},
    {id: 3, name: "Объекты РТОП"}
]

let controlTypes = [
    {typeID: 1},
    {typeID: 2},
    {typeID: 3}
]

let bools = [
    {value: true, name: "Да"},
    {value: false, name: "Нет"}
]

let modes = [
    {value: true, name: "INPUT"},
    {value: false, name: "OUTPUT"}
]

let durables = [
    {dur: 0, name: "0 сек"},
    {dur: 0.5, name: "0.5 сек"},
    {dur: 1, name: "1 сек"},
    {dur: 1.5, name: "1.5 сек"},
    {dur: 2, name: "2 сек"},
    {dur: 2.5, name: "2.5 сек"},
    {dur: 3, name: "3 сек"},
    {dur: 3.5, name: "3.5 сек"},
    {dur: 4, name: "4 сек"},
    {dur: 4.5, name: "4.5 сек"},
    {dur: 5, name: "5 сек"},
    {dur: 5.5, name: "5.5 сек"},
    {dur: 6, name: "6 сек"},
    {dur: 6.5, name: "6.5 сек"},
    {dur: 7, name: "7 сек"},
    {dur: 7.5, name: "7.5 сек"},
    {dur: 8, name: "8 сек"},
    {dur: 8.5, name: "8.5 сек"},
    {dur: 9, name: "9 сек"},
    {dur: 9.5, name: "9.5 сек"},
    {dur: 10, name: "10 сек"}
]


let activeBoards = [
    {boardID:0},
    {boardID:1},
    {boardID:3}
    ]


let boarPins = [
    {boardID: 0, pinID: 0, name: "Плата:0 Пин:PA0"},
    {boardID: 0, pinID: 1, name: "Плата:0 Пин:PA1"},
    {boardID: 0, pinID: 2, name: "Плата:0 Пин:PA2"},
    {boardID: 0, pinID: 3, name: "Плата:0 Пин:PA3"},
    {boardID: 0, pinID: 4, name: "Плата:0 Пин:PA4"},
    {boardID: 0, pinID: 5, name: "Плата:0 Пин:PA5"},
    {boardID: 0, pinID: 6, name: "Плата:0 Пин:PA6"},
    {boardID: 0, pinID: 7, name: "Плата:0 Пин:PA7"},
    {boardID: 0, pinID: 8, name: "Плата:0 Пин:PB0"},
    {boardID: 0, pinID: 9, name: "Плата:0 Пин:PB1"},
    {boardID: 0, pinID: 10, name: "Плата:0 Пин:PB2"},
    {boardID: 0, pinID: 11, name: "Плата:0 Пин:PB3"},
    {boardID: 0, pinID: 12, name: "Плата:0 Пин:PB4"},
    {boardID: 0, pinID: 13, name: "Плата:0 Пин:PB5"},
    {boardID: 0, pinID: 14, name: "Плата:0 Пин:PB6"},
    {boardID: 0, pinID: 15, name: "Плата:0 Пин:PB7"},

    {boardID: 1, pinID: 0, name: "Плата:1 Пин:PA0"},
    {boardID: 1, pinID: 1, name: "Плата:1 Пин:PA1"},
    {boardID: 1, pinID: 2, name: "Плата:1 Пин:PA2"},
    {boardID: 1, pinID: 3, name: "Плата:1 Пин:PA3"},
    {boardID: 1, pinID: 4, name: "Плата:1 Пин:PA4"},
    {boardID: 1, pinID: 5, name: "Плата:1 Пин:PA5"},
    {boardID: 1, pinID: 6, name: "Плата:1 Пин:PA6"},
    {boardID: 1, pinID: 7, name: "Плата:1 Пин:PA7"},
    {boardID: 1, pinID: 8, name: "Плата:1 Пин:PB0"},
    {boardID: 1, pinID: 9, name: "Плата:1 Пин:PB1"},
    {boardID: 1, pinID: 10, name: "Плата:1 Пин:PB2"},
    {boardID: 1, pinID: 11, name: "Плата:1 Пин:PB3"},
    {boardID: 1, pinID: 12, name: "Плата:1 Пин:PB4"},
    {boardID: 1, pinID: 13, name: "Плата:1 Пин:PB5"},
    {boardID: 1, pinID: 14, name: "Плата:1 Пин:PB6"},
    {boardID: 1, pinID: 15, name: "Плата:1 Пин:PB7"},

    {boardID: 2, pinID: 0, name: "Плата:2 Пин:PA0"},
    {boardID: 2, pinID: 1, name: "Плата:2 Пин:PA1"},
    {boardID: 2, pinID: 2, name: "Плата:2 Пин:PA2"},
    {boardID: 2, pinID: 3, name: "Плата:2 Пин:PA3"},
    {boardID: 2, pinID: 4, name: "Плата:2 Пин:PA4"},
    {boardID: 2, pinID: 5, name: "Плата:2 Пин:PA5"},
    {boardID: 2, pinID: 6, name: "Плата:2 Пин:PA6"},
    {boardID: 2, pinID: 7, name: "Плата:2 Пин:PA7"},
    {boardID: 2, pinID: 8, name: "Плата:2 Пин:PB0"},
    {boardID: 2, pinID: 9, name: "Плата:2 Пин:PB1"},
    {boardID: 2, pinID: 10, name: "Плата:2 Пин:PB2"},
    {boardID: 2, pinID: 11, name: "Плата:2 Пин:PB3"},
    {boardID: 2, pinID: 12, name: "Плата:2 Пин:PB4"},
    {boardID: 2, pinID: 13, name: "Плата:2 Пин:PB5"},
    {boardID: 2, pinID: 14, name: "Плата:2 Пин:PB6"},
    {boardID: 2, pinID: 15, name: "Плата:2 Пин:PB7"},

    {boardID: 3, pinID: 0, name: "Плата:3 Пин:PA0"},
    {boardID: 3, pinID: 1, name: "Плата:3 Пин:PA1"},
    {boardID: 3, pinID: 2, name: "Плата:3 Пин:PA2"},
    {boardID: 3, pinID: 3, name: "Плата:3 Пин:PA3"},
    {boardID: 3, pinID: 4, name: "Плата:3 Пин:PA4"},
    {boardID: 3, pinID: 5, name: "Плата:3 Пин:PA5"},
    {boardID: 3, pinID: 6, name: "Плата:3 Пин:PA6"},
    {boardID: 3, pinID: 7, name: "Плата:3 Пин:PA7"},
    {boardID: 3, pinID: 8, name: "Плата:3 Пин:PB0"},
    {boardID: 3, pinID: 9, name: "Плата:3 Пин:PB1"},
    {boardID: 3, pinID: 10, name: "Плата:3 Пин:PB2"},
    {boardID: 3, pinID: 11, name: "Плата:3 Пин:PB3"},
    {boardID: 3, pinID: 12, name: "Плата:3 Пин:PB4"},
    {boardID: 3, pinID: 13, name: "Плата:3 Пин:PB5"},
    {boardID: 3, pinID: 14, name: "Плата:3 Пин:PB6"},
    {boardID: 3, pinID: 15, name: "Плата:3 Пин:PB7"},

    {boardID: 4, pinID: 0, name: "Плата:4 Пин:PA0"},
    {boardID: 4, pinID: 1, name: "Плата:4 Пин:PA1"},
    {boardID: 4, pinID: 2, name: "Плата:4 Пин:PA2"},
    {boardID: 4, pinID: 3, name: "Плата:4 Пин:PA3"},
    {boardID: 4, pinID: 4, name: "Плата:4 Пин:PA4"},
    {boardID: 4, pinID: 5, name: "Плата:4 Пин:PA5"},
    {boardID: 4, pinID: 6, name: "Плата:4 Пин:PA6"},
    {boardID: 4, pinID: 7, name: "Плата:4 Пин:PA7"},
    {boardID: 4, pinID: 8, name: "Плата:4 Пин:PB0"},
    {boardID: 4, pinID: 9, name: "Плата:4 Пин:PB1"},
    {boardID: 4, pinID: 10, name: "Плата:4 Пин:PB2"},
    {boardID: 4, pinID: 11, name: "Плата:4 Пин:PB3"},
    {boardID: 4, pinID: 12, name: "Плата:4 Пин:PB4"},
    {boardID: 4, pinID: 13, name: "Плата:4 Пин:PB5"},
    {boardID: 4, pinID: 14, name: "Плата:4 Пин:PB6"},
    {boardID: 4, pinID: 15, name: "Плата:4 Пин:PB7"},

    {boardID: 5, pinID: 0, name: "Плата:5 Пин:PA0"},
    {boardID: 5, pinID: 1, name: "Плата:5 Пин:PA1"},
    {boardID: 5, pinID: 2, name: "Плата:5 Пин:PA2"},
    {boardID: 5, pinID: 3, name: "Плата:5 Пин:PA3"},
    {boardID: 5, pinID: 4, name: "Плата:5 Пин:PA4"},
    {boardID: 5, pinID: 5, name: "Плата:5 Пин:PA5"},
    {boardID: 5, pinID: 6, name: "Плата:5 Пин:PA6"},
    {boardID: 5, pinID: 7, name: "Плата:5 Пин:PA7"},
    {boardID: 5, pinID: 8, name: "Плата:5 Пин:PB0"},
    {boardID: 5, pinID: 9, name: "Плата:5 Пин:PB1"},
    {boardID: 5, pinID: 10, name: "Плата:5 Пин:PB2"},
    {boardID: 5, pinID: 11, name: "Плата:5 Пин:PB3"},
    {boardID: 5, pinID: 12, name: "Плата:5 Пин:PB4"},
    {boardID: 5, pinID: 13, name: "Плата:5 Пин:PB5"},
    {boardID: 5, pinID: 14, name: "Плата:5 Пин:PB6"},
    {boardID: 5, pinID: 15, name: "Плата:5 Пин:PB7"},

    {boardID: 6, pinID: 0, name: "Плата:6 Пин:PA0"},
    {boardID: 6, pinID: 1, name: "Плата:6 Пин:PA1"},
    {boardID: 6, pinID: 2, name: "Плата:6 Пин:PA2"},
    {boardID: 6, pinID: 3, name: "Плата:6 Пин:PA3"},
    {boardID: 6, pinID: 4, name: "Плата:6 Пин:PA4"},
    {boardID: 6, pinID: 5, name: "Плата:6 Пин:PA5"},
    {boardID: 6, pinID: 6, name: "Плата:6 Пин:PA6"},
    {boardID: 6, pinID: 7, name: "Плата:6 Пин:PA7"},
    {boardID: 6, pinID: 8, name: "Плата:6 Пин:PB0"},
    {boardID: 6, pinID: 9, name: "Плата:6 Пин:PB1"},
    {boardID: 6, pinID: 10, name: "Плата:6 Пин:PB2"},
    {boardID: 6, pinID: 11, name: "Плата:6 Пин:PB3"},
    {boardID: 6, pinID: 12, name: "Плата:6 Пин:PB4"},
    {boardID: 6, pinID: 13, name: "Плата:6 Пин:PB5"},
    {boardID: 6, pinID: 14, name: "Плата:6 Пин:PB6"},
    {boardID: 6, pinID: 15, name: "Плата:6 Пин:PB7"},

    {boardID: 7, pinID: 0, name: "Плата:7 Пин:PA0"},
    {boardID: 7, pinID: 1, name: "Плата:7 Пин:PA1"},
    {boardID: 7, pinID: 2, name: "Плата:7 Пин:PA2"},
    {boardID: 7, pinID: 3, name: "Плата:7 Пин:PA3"},
    {boardID: 7, pinID: 4, name: "Плата:7 Пин:PA4"},
    {boardID: 7, pinID: 5, name: "Плата:7 Пин:PA5"},
    {boardID: 7, pinID: 6, name: "Плата:7 Пин:PA6"},
    {boardID: 7, pinID: 7, name: "Плата:7 Пин:PA7"},
    {boardID: 7, pinID: 8, name: "Плата:7 Пин:PB0"},
    {boardID: 7, pinID: 9, name: "Плата:7 Пин:PB1"},
    {boardID: 7, pinID: 10, name: "Плата:7 Пин:PB2"},
    {boardID: 7, pinID: 11, name: "Плата:7 Пин:PB3"},
    {boardID: 7, pinID: 12, name: "Плата:7 Пин:PB4"},
    {boardID: 7, pinID: 13, name: "Плата:7 Пин:PB5"},
    {boardID: 7, pinID: 14, name: "Плата:7 Пин:PB6"},
    {boardID: 7, pinID: 15, name: "Плата:7 Пин:PB7"}
]


window.addEventListener("load", function (evt) {
    // var startDate = document.getElementById("startDate");
    // var endDate = document.getElementById("endDate");
    // startDate.setAttribute("value", new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10));
    // endDate.setAttribute("value", new Date().toISOString().slice(0, 10));
    // GetData()


    addTabloRow( 1, 'ВПП-1', 0, 0, 0,1,false, true);
    addTabloRow( 1, 'ВПП-2', 0, 2, 0,3,true,false);


    addObjectRow( 1, 'DMB 1', 1);
    addObjectRow( 2, 'DVOR', 2);
    addObjectRow( 3, 'DME', 3);
    addObjectRow( 4, 'KRM', 1);
    addObjectRow( 5, 'PTC', 3);
    addObjectRow( 6, 'ВАВА', 2);


    addComponentRow(7, 'Новый Фид', 1, 3, 0, 4, true, true, false, 1.5);
    addComponentRow(8, 'Фид. 1', 1, 2, 1, 1,true, true, false, 1);
    addComponentRow(9, 'Фид. 2', 1, 3, 1, 2,true, true, false, 7);
    addComponentRow(10, 'Фид. 1', 1, 1, 6, 9,true, true, false, 2.5);

});

function GetData() {
    var table = document.getElementById("tbody");

    var startDate = document.getElementById("startDate");
    var endDate = document.getElementById("endDate");

    fetch("http://{{.}}/logs/" + startDate.value + "/" + endDate.value)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            table.innerHTML = data
        })

}

function addNewObjectRow() {
    addObjectRow( getNewID(), 'Новый', 1);
}

function getNewID() {
    let dt = new Date()
    return dt.getTime() % 1000
}

function addObjectRow(objectID, objectName, panelID) {
    let objectsBody = document.getElementById('objects-body');
    let row = document.createElement('tr');

    let nameTD = document.createElement('td');
    let panelTD = document.createElement('td');
    let buttonTD = document.createElement('td');


    nameTD.setAttribute('class', "td-center");
    panelTD.setAttribute('class', "td-center");
    buttonTD.setAttribute('class', "td-right");


    let newInput = document.createElement('input');
    newInput.value = objectName;
    newInput.setAttribute('objectID', objectID);
    newInput.setAttribute('objectName', objectName);
    newInput.onchange = function () {
        newInput.setAttribute('objectName', newInput.value);
        let options = document.getElementById('components-body').getElementsByTagName('option');
        for (var i = 0; i < options.length; i++) {
            if (options[i].getAttribute('objectID') == objectID) {
                options[i].setAttribute('objectName', newInput.value);
                options[i].innerText = newInput.value;
            }
        }
    }

    nameTD.appendChild(newInput);
    row.appendChild(nameTD);

    let newSelect = document.createElement('select')
    panels.forEach(p => {
        let newOption = document.createElement('option')
        newOption.setAttribute('id', p.id);
        newOption.innerText = p.name;
        newSelect.appendChild(newOption);
    });
    newSelect.selectedIndex = panels.indexOf(panels.find(i => i.id === panelID));
    panelTD.appendChild(newSelect);
    row.appendChild(panelTD);


    //---Кнопки---

    let newbuttonUp = document.createElement('button')
    newbuttonUp.setAttribute('class', "btnrow");
    newbuttonUp.textContent = '↑'
    newbuttonUp.onclick = ev => {
        if (row.sectionRowIndex > 0) {
            let currentRow = objectsBody.rows[row.sectionRowIndex];
            let prevRow = objectsBody.rows[row.sectionRowIndex - 1];
            currentRow.parentNode.insertBefore(currentRow, prevRow);
        }
    }
    buttonTD.appendChild(newbuttonUp);

    let buttonDown = document.createElement('button')
    buttonDown.setAttribute('class', "btnrow");
    buttonDown.textContent = '↓'
    buttonDown.onclick = ev => {
        if (row.sectionRowIndex < objectsBody.rows.length - 1) {
            let currentRow = objectsBody.rows[row.sectionRowIndex];
            let nextRow = objectsBody.rows[row.sectionRowIndex + 1];
            nextRow.parentNode.insertBefore(nextRow, currentRow);
        }
    }
    buttonTD.appendChild(buttonDown);

    let buttonDel = document.createElement('button')
    buttonDel.setAttribute('class', "btnrow");
    buttonDel.textContent = "Удалить"
    buttonDel.onclick = ev => {
        let options = document.getElementById('components-body').getElementsByTagName('option');
        hasErr = false
        for (var i = 0; i < options.length; i++) {
            if (options[i].getAttribute('objectID') == objectID && options[i].parentElement.selectedIndex == options[i].index) {
                alert("Нельзя удалять объект если в нем есть компоненты. \n Нужно сначала отвязать компоненты.");
                hasErr = true
                break
            }
        }
        if (!hasErr) {
            objectsBody.removeChild(row);
            let options = document.getElementById('components-body').getElementsByTagName('option');
            for (var i = 0; i < options.length; i++) {
                if (options[i].getAttribute('objectID') == objectID) {
                    options[i].parentElement.removeChild(options[i])
                }
            }
        }
    }
    buttonTD.appendChild(buttonDel);
    row.appendChild(buttonTD)

    objectsBody.appendChild(row)

    //добавление в селекты компонентов
    let objectsSelect = document.getElementById('components-body').getElementsByTagName('select');
    for (var i = 0; i < objectsSelect.length; i++) {
        if (objectsSelect[i].hasAttribute('isObjectSelect')) {
            let newOption = document.createElement('option')
            newOption.setAttribute('objectID', objectID);
            newOption.setAttribute('objectName', objectName);
            newOption.innerText = objectName;
            objectsSelect[i].appendChild(newOption);
        }
    }
}


function addNewComponentRow() {

    let usedBoarPin = getUsedBoarPins();
    if (usedBoarPin.length === 128) {
        alert("Упс! Уже все платы заполнены.")
        return
    }
    let boardID, pinID = 0;
    for (let i = 0; i < boarPins.length; i++) {
        p = boarPins[i];
        if (!usedBoarPin.find(j => j.boardID == p.boardID && j.pinID == p.pinID)) {
            boardID = p.boardID;
            pinID = p.pinID;
            break
        }
    }

    addComponentRow(getNewID(), 'Новый Фид', 1, 1, boardID, pinID,true, true, false, 1);
}

function addComponentRow(id, name, typeID, objectID, boardID, pinID, isInput, isActive, isInverse, duration) {
    let componentsBody = document.getElementById('components-body');
    let row = document.createElement('tr');

    let nameTD = document.createElement('td');
    let typeTD = document.createElement('td');
    let objectTD = document.createElement('td');
    let pinTD = document.createElement('td');
    let modeTD = document.createElement('td');
    let activeTD = document.createElement('td');
    let inverseTD = document.createElement('td');
    let durableTD = document.createElement('td');
    let buttonTD = document.createElement('td');


    nameTD.setAttribute('class', "td-center");
    typeTD.setAttribute('class', "td-center");
    objectTD.setAttribute('class', "td-center");
    pinTD.setAttribute('class', "td-center");
    modeTD.setAttribute('class', "td-center");
    activeTD.setAttribute('class', "td-center");
    inverseTD.setAttribute('class', "td-center");
    durableTD.setAttribute('class', "td-center");
    buttonTD.setAttribute('class', "td-right");

    row.setAttribute('id', id);
    if (componentsBody.children.length % 2 > 0) {
        row.setAttribute('class', "table-row-distinct");
    }



    //Имя
    let newInput = document.createElement('input');
    newInput.value = name;
    nameTD.appendChild(newInput);
    row.appendChild(nameTD);

    //Тип
    let typeSelect = document.createElement('select')
    controlTypes.forEach(p => {
        let newOption = document.createElement('option')
        newOption.setAttribute('typeID', p.typeID);
        newOption.innerText = p.typeID;
        typeSelect.appendChild(newOption);
    });
    typeSelect.selectedIndex = controlTypes.indexOf(controlTypes.find(i => i.typeID === typeID));
    typeTD.appendChild(typeSelect);
    row.appendChild(typeTD);

    //Обьект
    let objectSelect = document.createElement('select')
    objectSelect.setAttribute('isObjectSelect', true);
    let objectsBody = document.getElementById('objects-body');
    for (var i = 0; i < objectsBody.rows.length; i++) {
        objID = objectsBody.rows[i].cells[0].children[0].getAttribute('objectID');
        objName = objectsBody.rows[i].cells[0].children[0].getAttribute('objectName');

        let newOption = document.createElement('option')
        newOption.setAttribute('objectID', objID);
        newOption.setAttribute('objectName', objName);
        newOption.innerText = objName;
        objectSelect.appendChild(newOption);
        if (objID == objectID) {
            objectSelect.selectedIndex = i;
        }

    }
    objectTD.appendChild(objectSelect);
    row.appendChild(objectTD);

    //Плата Пин
    let boarPinSelect = document.createElement('select')
    boarPinSelect.setAttribute('isBoarPinSelect', true)
    boarPins.forEach(p => {
        let newOption = document.createElement('option')
        newOption.setAttribute('boardID', p.boardID);
        newOption.setAttribute('pinID', p.pinID);
        newOption.innerText = p.name;
        boarPinSelect.appendChild(newOption);
    });
    boarPinSelect.selectedIndex = boarPins.indexOf(boarPins.find(i => i.boardID === boardID && i.pinID === pinID));

    boarPinSelect.setAttribute('boardID', boardID);
    boarPinSelect.setAttribute('pinID', pinID);

    boarPinSelect.onchange = ev => {
        let currentOpt = boarPinSelect.childNodes[boarPinSelect.selectedIndex]
        boarPinSelect.setAttribute('boardID', currentOpt.getAttribute('boardID'));
        boarPinSelect.setAttribute('pinID', currentOpt.getAttribute('pinID'));
        changePinSelect();
    }
    pinTD.appendChild(boarPinSelect);
    row.appendChild(pinTD);

    //mode
    let modeSelect = document.createElement('select')
    modes.forEach(p => {
        let newOption = document.createElement('option')
        newOption.setAttribute('value', p.value);
        newOption.innerText = p.name;
        modeSelect.appendChild(newOption);
    });
    modeSelect.selectedIndex = modes.indexOf(modes.find(i => i.value === isInput));
    modeTD.appendChild(modeSelect);
    row.appendChild(modeTD);

    //Используется
    let activeSelect = document.createElement('select')
    bools.forEach(p => {
        let newOption = document.createElement('option')
        newOption.setAttribute('value', p.value);
        newOption.innerText = p.name;
        activeSelect.appendChild(newOption);
    });
    activeSelect.selectedIndex = bools.indexOf(bools.find(i => i.value === isActive));
    activeTD.appendChild(activeSelect);
    row.appendChild(activeTD);

    //Инверсия
    let inverseSelect = document.createElement('select')
    bools.forEach(p => {
        let newOption = document.createElement('option')
        newOption.setAttribute('value', p.value);
        newOption.innerText = p.name;
        inverseSelect.appendChild(newOption);
    });
    inverseSelect.selectedIndex = bools.indexOf(bools.find(i => i.value === isInverse));
    inverseTD.appendChild(inverseSelect);
    row.appendChild(inverseTD);

    //Задержка
    let durableSelect = document.createElement('select')
    durables.forEach(p => {
        let newOption = document.createElement('option')
        newOption.setAttribute('dur', p.dur);
        newOption.innerText = p.name;
        durableSelect.appendChild(newOption);
    });
    durableSelect.selectedIndex = durables.indexOf(durables.find(i => i.dur === duration));
    durableTD.appendChild(durableSelect);
    row.appendChild(durableTD);


    //---Кнопки---

    let newbuttonUp = document.createElement('button')
    newbuttonUp.setAttribute('class', "btnrow");
    newbuttonUp.textContent = '↑'
    newbuttonUp.onclick = ev => {
        if (row.sectionRowIndex > 0) {
            let currentRow = componentsBody.rows[row.sectionRowIndex];
            let prevRow = componentsBody.rows[row.sectionRowIndex - 1];
            currentRow.parentNode.insertBefore(currentRow, prevRow);
        }
    }
    buttonTD.appendChild(newbuttonUp);

    let buttonDown = document.createElement('button')
    buttonDown.setAttribute('class', "btnrow");
    buttonDown.textContent = '↓'
    buttonDown.onclick = ev => {
        if (row.sectionRowIndex < componentsBody.rows.length - 1) {
            let currentRow = componentsBody.rows[row.sectionRowIndex];
            let nextRow = componentsBody.rows[row.sectionRowIndex + 1];
            nextRow.parentNode.insertBefore(nextRow, currentRow);
        }
    }
    buttonTD.appendChild(buttonDown);

    let buttonDel = document.createElement('button')
    buttonDel.setAttribute('class', "btnrow");
    buttonDel.textContent = "Удалить"
    buttonDel.onclick = ev => {
        componentsBody.removeChild(row);
        updateBoardBody();
    }
    buttonTD.appendChild(buttonDel);

    row.appendChild(buttonTD)

    componentsBody.appendChild(row)

    changePinSelect();
}


function addTabloRow(id, name, boardID, pinID, activeBoardID, activePinID , isActive, isInverse) {
    let componentsBody = document.getElementById('vpp-components-body');
    let row = document.createElement('tr');

    let nameTD = document.createElement('td');
    let pinTD = document.createElement('td');
    let activePinTD = document.createElement('td');
    let activeTD = document.createElement('td');
    let inverseTD = document.createElement('td');


    nameTD.setAttribute('class', "td-center");
    pinTD.setAttribute('class', "td-center");
    activePinTD.setAttribute('class', "td-center");
    activeTD.setAttribute('class', "td-center");
    inverseTD.setAttribute('class', "td-center");

    row.setAttribute('id', id);

    //Имя
    let newInput = document.createElement('input');
    newInput.value = name;
    nameTD.appendChild(newInput);
    row.appendChild(nameTD);

    //Плата Пин : Значение
    let boarPinSelect = document.createElement('select')
    boarPinSelect.setAttribute('isBoarPinSelect', true)
    boarPins.forEach(p => {
        let newOption = document.createElement('option')
        newOption.setAttribute('boardID', p.boardID);
        newOption.setAttribute('pinID', p.pinID);
        newOption.innerText = p.name;
        boarPinSelect.appendChild(newOption);
    });
    boarPinSelect.selectedIndex = boarPins.indexOf(boarPins.find(i => i.boardID === boardID && i.pinID === pinID));

    boarPinSelect.setAttribute('boardID', boardID);
    boarPinSelect.setAttribute('pinID', pinID);

    boarPinSelect.onchange = ev => {
        let currentOpt = boarPinSelect.childNodes[boarPinSelect.selectedIndex]
        boarPinSelect.setAttribute('boardID', currentOpt.getAttribute('boardID'));
        boarPinSelect.setAttribute('pinID', currentOpt.getAttribute('pinID'));
        changePinSelect();
    }
    pinTD.appendChild(boarPinSelect);
    row.appendChild(pinTD);

    //Плата Пин : Используется/Не используется
    let boarActivePinSelect = document.createElement('select')
    boarActivePinSelect.setAttribute('isBoarPinSelect', true)
    boarPins.forEach(p => {
        let newOption = document.createElement('option')
        newOption.setAttribute('boardID', p.boardID);
        newOption.setAttribute('pinID', p.pinID);
        newOption.innerText = p.name;
        boarActivePinSelect.appendChild(newOption);
    });
    boarActivePinSelect.selectedIndex = boarPins.indexOf(boarPins.find(i => i.boardID === activeBoardID && i.pinID === activePinID));

    boarActivePinSelect.setAttribute('boardID', activeBoardID);
    boarActivePinSelect.setAttribute('pinID', activePinID);

    boarActivePinSelect.onchange = ev => {
        let currentOpt = boarActivePinSelect.childNodes[boarActivePinSelect.selectedIndex]
        boarActivePinSelect.setAttribute('boardID', currentOpt.getAttribute('boardID'));
        boarActivePinSelect.setAttribute('pinID', currentOpt.getAttribute('pinID'));
        changePinSelect();
    }
    activePinTD.appendChild(boarActivePinSelect);
    row.appendChild(activePinTD);

    //Используется
    let activeSelect = document.createElement('select')
    bools.forEach(p => {
        let newOption = document.createElement('option')
        newOption.setAttribute('value', p.value);
        newOption.innerText = p.name;
        activeSelect.appendChild(newOption);
    });
    activeSelect.selectedIndex = bools.indexOf(bools.find(i => i.value === isActive));
    activeTD.appendChild(activeSelect);
    row.appendChild(activeTD);

    //Инверсия
    let inverseSelect = document.createElement('select')
    bools.forEach(p => {
        let newOption = document.createElement('option')
        newOption.setAttribute('value', p.value);
        newOption.innerText = p.name;
        inverseSelect.appendChild(newOption);
    });
    inverseSelect.selectedIndex = bools.indexOf(bools.find(i => i.value === isInverse));
    inverseTD.appendChild(inverseSelect);
    row.appendChild(inverseTD);

    componentsBody.appendChild(row)

    changePinSelect();
}


function getUsedBoarPins() {
    let usedBoarPin = [];
    let objectsSelect = document.getElementById('components-body').getElementsByTagName('select');
    for (var i = 0; i < objectsSelect.length; i++) {
        if (objectsSelect[i].hasAttribute('isBoarPinSelect')) {
            boardID = objectsSelect[i].getAttribute('boardID');
            pinID = objectsSelect[i].getAttribute('pinID');

            usedBoarPin.push(boarPins.find(i => i.boardID == boardID && i.pinID == pinID))
        }
    }

    let vppobjectsSelect = document.getElementById('vpp-components-body').getElementsByTagName('select');
    for (var i = 0; i < vppobjectsSelect.length; i++) {
        if (vppobjectsSelect[i].hasAttribute('isBoarPinSelect')) {
            boardID = vppobjectsSelect[i].getAttribute('boardID');
            pinID = vppobjectsSelect[i].getAttribute('pinID');

            usedBoarPin.push(boarPins.find(i => i.boardID == boardID && i.pinID == pinID))
        }
    }
    return usedBoarPin;
}


function changePinSelect() {
    let usedBoarPin = getUsedBoarPins();

    let options = document.getElementById('components-body').getElementsByTagName('option');
    for (var i = 0; i < options.length; i++) {
        if (options[i].hasAttribute('boardID')) {
            boardID = options[i].getAttribute('boardID');
            pinID = options[i].getAttribute('pinID');

            options[i].hidden = usedBoarPin.find(i => i.boardID == boardID && i.pinID == pinID)
        }
    }
    let vppoptions = document.getElementById('vpp-components-body').getElementsByTagName('option');
    for (var i = 0; i < vppoptions.length; i++) {
        if (vppoptions[i].hasAttribute('boardID')) {
            boardID = vppoptions[i].getAttribute('boardID');
            pinID = vppoptions[i].getAttribute('pinID');

            vppoptions[i].hidden = usedBoarPin.find(i => i.boardID == boardID && i.pinID == pinID)
        }
    }

    updateBoardBody();
}


function updateBoardBody() {
    let boardBody = document.getElementById("boards-body");
    boardBody.innerHTML = '';

    let usedBoarPin = getUsedBoarPins();

    for (let i = 0; i < 8; i++) {
        let row = document.createElement('tr');
        if (activeBoards.find(id => id.boardID === i)) {
            row.setAttribute('class', "active-board");
        }

        let col = document.createElement('td');
        col.setAttribute('class', "td-center");
        col.innerText = i;
        row.appendChild(col);

        for (let j = 0; j < 16; j++) {
            let col = document.createElement('td');
            col.setAttribute('class', "td-center");
            if (usedBoarPin.find(id => id.boardID === i && id.pinID === j)) {
                col.innerHTML = '✓'; //'&#10004;&#65039;'
                if (!activeBoards.find(id => id.boardID == i)) {
                    col.setAttribute('class', "td-center not-active-board");
                }
            }
            row.appendChild(col);
        }
        boardBody.appendChild(row)
    }
    colorNotActiveRow()
}

function colorNotActiveRow() {

    var objectsSelect = document.getElementById('components-body').getElementsByTagName('select');
    for (var i = 0; i < objectsSelect.length; i++) {
        if (objectsSelect[i].hasAttribute('isBoarPinSelect')) {
            boardID = objectsSelect[i].getAttribute('boardID');

            objectsSelect[i].parentNode.setAttribute('class', "td-center");
              if (!activeBoards.find(id => id.boardID == boardID)) {
                  objectsSelect[i].parentNode.setAttribute('class', "td-center not-active-board");
            }
        }
    }

    objectsSelect = document.getElementById('vpp-components-body').getElementsByTagName('select');
    for (var i = 0; i < objectsSelect.length; i++) {
        if (objectsSelect[i].hasAttribute('isBoarPinSelect')) {
            boardID = objectsSelect[i].getAttribute('boardID');

            objectsSelect[i].parentNode.setAttribute('class', "td-center");
            if (!activeBoards.find(id => id.boardID == boardID)) {
                objectsSelect[i].setAttribute('class', "not-active-board");
            }
        }
    }
}
