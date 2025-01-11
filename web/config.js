
var panels = [
    {id: 1, name: "ВПП-1"},
    {id: 2, name: "ВПП-2"},
    {id: 3, name: "Объекты РТОП"}
]

var controlTypes = [
    {typeID: 1},
    {typeID: 2},
    {typeID: 3}
]

var bools = [
    {value: true, name: "Да"},
    {value: false, name: "Нет"}
]

var modes = [
    {value: true, name: "INPUT"},
    {value: false, name: "OUTPUT"}
]

var durables = [
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


var activeBoards = [
    // {boardID:0},
    // {boardID:1},
    // {boardID:3}
    ]


var boarPins = [
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

    updateActiveBoards();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://" + location.host + "/cfg");
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        addRows(xhr.response)
    };
});

function addRows(cfg) {

    for (var item of cfg.tabloItems){
        addTabloRow( item.id, item.name, item.boardID, item.pinID, item.manageBoardID,item.managePinID,item.isActive, item.isInverse);
    }
    if (cfg.tabloItems.length == 0){
        addTabloRow( 11, item.name, item.boardID, item.pinID, item.manageBoardID,item.managePinID,item.isActive, item.isInverse);
        addTabloRow( 12, item.name, item.boardID, item.pinID, item.manageBoardID,item.managePinID,item.isActive, item.isInverse);
    }

    for (var item of cfg.objects){
        addObjectRow( item.objectID, item.objectName, item.panelID);
    }

    for (var item of cfg.items){
        additemRow(item.id, item.name, item.typeID, item.objectID, item.boardID, item.pinID, item.isInput, item.isActive, item.isInverse, item.duration);
    }

    document.getElementById('comment').value = cfg.comment
}


function addNewObjectRow() {
    addObjectRow( getNewID(), 'Новый', 1);
}

function updateActiveBoards(){
    var req = new XMLHttpRequest();
    req.open('GET', "http://" + location.host + "/boards");
    req.responseType = 'json';
    req.send();
    req.onload = function() {
        activeBoards = req.response;
        updateBoardBody();
    };
}


function getNewID() {
    var cfg = config()
    var maxID = 12
    for (var item of cfg.objects) {
        if (item.objectID > maxID) {
            maxID = item.objectID
        }
    }
    for (var item of cfg.items) {
        if (item.id > maxID) {
            maxID = item.id
        }
    }
    return maxID + 1
}

function addObjectRow(objectID, objectName, panelID) {
    var objectsBody = document.getElementById('objects-body');
    var row = document.createElement('tr');

    var nameTD = document.createElement('td');
    var panelTD = document.createElement('td');
    var buttonTD = document.createElement('td');


    nameTD.setAttribute('class', "td-center");
    panelTD.setAttribute('class', "td-center");
    buttonTD.setAttribute('class', "td-right");


    var newInput = document.createElement('input');
    newInput.value = objectName;
    newInput.setAttribute('objectID', objectID);
    newInput.setAttribute('objectName', objectName);
    newInput.onchange = function () {
        newInput.setAttribute('objectName', newInput.value);
        var options = document.getElementById('items-body').getElementsByTagName('option');
        for (var i = 0; i < options.length; i++) {
            if (options[i].getAttribute('objectID') == objectID) {
                options[i].setAttribute('objectName', newInput.value);
                options[i].innerText = newInput.value;
            }
        }
    }

    nameTD.appendChild(newInput);
    row.appendChild(nameTD);

    var newSelect = document.createElement('select')
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

    var newbuttonUp = document.createElement('button')
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

    var buttonDel = document.createElement('button')
    buttonDel.setAttribute('class', "btnrow");
    buttonDel.textContent = "Удалить"
    buttonDel.onclick = ev => {
        let options = document.getElementById('items-body').getElementsByTagName('option');
        hasErr = false
        for (var i = 0; i < options.length; i++) {
            if (options[i].getAttribute('objectID') == objectID && options[i].parentElement.selectedIndex == options[i].index) {
                openDialog("Нельзя удалять объект если в нем есть элементы. \n Нужно сначала отвязать элементы.");
                hasErr = true
                break
            }
        }
        if (!hasErr) {
            objectsBody.removeChild(row);
            let options = document.getElementById('items-body').getElementsByTagName('option');
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

    //добавление в селекты элементов
    var objectsSelect = document.getElementById('items-body').getElementsByTagName('select');
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

function addNewItemRow() {

    var usedBoarPin = getUsedBoarPins();
    if (usedBoarPin.length === 128) {
        openDialog("Упс! Уже все платы заполнены.")
        return
    }
    var boardID, pinID = 0;
    for (let i = 0; i < boarPins.length; i++) {
        p = boarPins[i];
        if (!usedBoarPin.find(j => j.boardID == p.boardID && j.pinID == p.pinID)) {
            boardID = p.boardID;
            pinID = p.pinID;
            break
        }
    }

    additemRow(getNewID(), 'Новый Фид', 1, 1, boardID, pinID,true, true, false, 1);
}

function additemRow(id, name, typeID, objectID, boardID, pinID, isInput, isActive, isInverse, duration) {
    var itemsBody = document.getElementById('items-body');
    var row = document.createElement('tr');

    var nameTD = document.createElement('td');
    var typeTD = document.createElement('td');
    var objectTD = document.createElement('td');
    var pinTD = document.createElement('td');
    var modeTD = document.createElement('td');
    var activeTD = document.createElement('td');
    var inverseTD = document.createElement('td');
    var durableTD = document.createElement('td');
    var buttonTD = document.createElement('td');


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
    if (itemsBody.children.length % 2 > 0) {
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
            let currentRow = itemsBody.rows[row.sectionRowIndex];
            let prevRow = itemsBody.rows[row.sectionRowIndex - 1];
            currentRow.parentNode.insertBefore(currentRow, prevRow);
        }
    }
    buttonTD.appendChild(newbuttonUp);

    let buttonDown = document.createElement('button')
    buttonDown.setAttribute('class', "btnrow");
    buttonDown.textContent = '↓'
    buttonDown.onclick = ev => {
        if (row.sectionRowIndex < itemsBody.rows.length - 1) {
            let currentRow = itemsBody.rows[row.sectionRowIndex];
            let nextRow = itemsBody.rows[row.sectionRowIndex + 1];
            nextRow.parentNode.insertBefore(nextRow, currentRow);
        }
    }
    buttonTD.appendChild(buttonDown);

    let buttonDel = document.createElement('button')
    buttonDel.setAttribute('class', "btnrow");
    buttonDel.textContent = "Удалить"
    buttonDel.onclick = ev => {
        itemsBody.removeChild(row);
        updateBoardBody();
    }
    buttonTD.appendChild(buttonDel);

    row.appendChild(buttonTD)

    itemsBody.appendChild(row)

    changePinSelect();
}

function addTabloRow(id, name, boardID, pinID, manageBoardID, managePinID , isActive, isInverse) {
    var itemsBody = document.getElementById('tablo-items-body');
    var row = document.createElement('tr');

    var nameTD = document.createElement('td');
    var pinTD = document.createElement('td');
    var activePinTD = document.createElement('td');
    var activeTD = document.createElement('td');
    var inverseTD = document.createElement('td');


    nameTD.setAttribute('class', "td-center");
    pinTD.setAttribute('class', "td-center");
    activePinTD.setAttribute('class', "td-center");
    activeTD.setAttribute('class', "td-center");
    inverseTD.setAttribute('class', "td-center");

    row.setAttribute('id', id);

    //Имя
    var newInput = document.createElement('input');
    newInput.value = name;
    nameTD.appendChild(newInput);
    row.appendChild(nameTD);

    //Плата Пин : Значение
    var boarPinSelect = document.createElement('select')
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
    var boarActivePinSelect = document.createElement('select')
    boarActivePinSelect.setAttribute('isBoarPinSelect', true)
    boarPins.forEach(p => {
        var newOption = document.createElement('option')
        newOption.setAttribute('boardID', p.boardID);
        newOption.setAttribute('pinID', p.pinID);
        newOption.innerText = p.name;
        boarActivePinSelect.appendChild(newOption);
    });
    boarActivePinSelect.selectedIndex = boarPins.indexOf(boarPins.find(i => i.boardID === manageBoardID && i.pinID === managePinID));

    boarActivePinSelect.setAttribute('boardID', manageBoardID);
    boarActivePinSelect.setAttribute('pinID', managePinID);

    boarActivePinSelect.onchange = ev => {
        var currentOpt = boarActivePinSelect.childNodes[boarActivePinSelect.selectedIndex]
        boarActivePinSelect.setAttribute('boardID', currentOpt.getAttribute('boardID'));
        boarActivePinSelect.setAttribute('pinID', currentOpt.getAttribute('pinID'));
        changePinSelect();
    }
    activePinTD.appendChild(boarActivePinSelect);
    row.appendChild(activePinTD);

    //Используется
    var activeSelect = document.createElement('select')
    bools.forEach(p => {
        var newOption = document.createElement('option')
        newOption.setAttribute('value', p.value);
        newOption.innerText = p.name;
        activeSelect.appendChild(newOption);
    });
    activeSelect.selectedIndex = bools.indexOf(bools.find(i => i.value === isActive));
    activeTD.appendChild(activeSelect);
    row.appendChild(activeTD);

    //Инверсия
    var inverseSelect = document.createElement('select')
    bools.forEach(p => {
        var newOption = document.createElement('option')
        newOption.setAttribute('value', p.value);
        newOption.innerText = p.name;
        inverseSelect.appendChild(newOption);
    });
    inverseSelect.selectedIndex = bools.indexOf(bools.find(i => i.value === isInverse));
    inverseTD.appendChild(inverseSelect);
    row.appendChild(inverseTD);

    itemsBody.appendChild(row)

    changePinSelect();
}

function getUsedBoarPins() {
    let usedBoarPin = [];
    let objectsSelect = document.getElementById('items-body').getElementsByTagName('select');
    for (var i = 0; i < objectsSelect.length; i++) {
        if (objectsSelect[i].hasAttribute('isBoarPinSelect')) {
            var boardID = objectsSelect[i].getAttribute('boardID');
            var pinID = objectsSelect[i].getAttribute('pinID');

            usedBoarPin.push(boarPins.find(i => i.boardID == boardID && i.pinID == pinID))
        }
    }

    let tabloobjectsSelect = document.getElementById('tablo-items-body').getElementsByTagName('select');
    for (var i = 0; i < tabloobjectsSelect.length; i++) {
        if (tabloobjectsSelect[i].hasAttribute('isBoarPinSelect')) {
            var boardID = tabloobjectsSelect[i].getAttribute('boardID');
            var pinID = tabloobjectsSelect[i].getAttribute('pinID');

            usedBoarPin.push(boarPins.find(i => i.boardID == boardID && i.pinID == pinID))
        }
    }
    return usedBoarPin;
}


function changePinSelect() {
    var usedBoarPin = getUsedBoarPins();

    var options = document.getElementById('items-body').getElementsByTagName('option');
    for (var i = 0; i < options.length; i++) {
        if (options[i].hasAttribute('boardID')) {
            var boardID = options[i].getAttribute('boardID');
            var pinID = options[i].getAttribute('pinID');

            options[i].hidden = usedBoarPin.find(i => i.boardID == boardID && i.pinID == pinID)
        }
    }
    var tablooptions = document.getElementById('tablo-items-body').getElementsByTagName('option');
    for (var i = 0; i < tablooptions.length; i++) {
        if (tablooptions[i].hasAttribute('boardID')) {
            var boardID = tablooptions[i].getAttribute('boardID');
            var pinID = tablooptions[i].getAttribute('pinID');

            tablooptions[i].hidden = usedBoarPin.find(i => i.boardID == boardID && i.pinID == pinID)
        }
    }

    updateBoardBody();
}

function updateBoardBody() {
    var boardBody = document.getElementById("boards-body");
    boardBody.innerHTML = '';

    var usedBoarPin = getUsedBoarPins();

    for (var i = 0; i < 8; i++) {
        var row = document.createElement('tr');
        if (activeBoards.find(id => id.boardID === i)) {
            row.setAttribute('class', "active-board");
        }

        var col = document.createElement('td');
        col.setAttribute('class', "td-center");
        col.innerText = i;
        row.appendChild(col);

        for (var j = 0; j < 16; j++) {
            var col = document.createElement('td');
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

    var objectsSelect = document.getElementById('items-body').getElementsByTagName('select');
    for (var i = 0; i < objectsSelect.length; i++) {
        if (objectsSelect[i].hasAttribute('isBoarPinSelect')) {
            var boardID = objectsSelect[i].getAttribute('boardID');

            objectsSelect[i].parentNode.setAttribute('class', "td-center");
              if (!activeBoards.find(id => id.boardID == boardID)) {
                  objectsSelect[i].parentNode.setAttribute('class', "td-center not-active-board");
            }
        }
    }

    var objectsSelect = document.getElementById('tablo-items-body').getElementsByTagName('select');
    for (var i = 0; i < objectsSelect.length; i++) {
        if (objectsSelect[i].hasAttribute('isBoarPinSelect')) {
            var boardID = objectsSelect[i].getAttribute('boardID');

            objectsSelect[i].parentNode.setAttribute('class', "td-center");
            if (!activeBoards.find(id => id.boardID == boardID)) {
                objectsSelect[i].parentNode.setAttribute('class', "td-center not-active-board");
            }
        }
    }
}


function config() {

    //Табло
    var tabloItems = []
    var rows = document.getElementById('tablo-items-body').getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {

        var cols = rows[i].getElementsByTagName('td')

        var col0 = cols.item(0).getElementsByTagName('input').item(0)
        var col1 = cols.item(1).getElementsByTagName('select').item(0)
        var col2 = cols.item(2).getElementsByTagName('select').item(0)
        var col3 = cols.item(3).getElementsByTagName('select').item(0)
        var col4 = cols.item(4).getElementsByTagName('select').item(0)

        tabloItems.push({
            id: Number(rows[i].id),
            name:col0.value,
            boardID:Number(col1.getAttribute('boardID')),
            pinID:Number(col1.getAttribute('pinID')),
            manageBoardID:Number(col2.getAttribute('boardID')),
            managePinID:Number(col2.getAttribute('pinID')) ,
            isActive:bools[col3.selectedIndex].value,
            isInverse: bools[col4.selectedIndex].value
        })
    }

    //Объекты
    var objs = []
    var rows = document.getElementById('objects-body').getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {

        var cols = rows[i].getElementsByTagName('td')

        var col0 = cols.item(0).getElementsByTagName('input').item(0)
        var col1 = cols.item(1).getElementsByTagName('select').item(0)

        objs.push({
            objectID: Number(col0.getAttribute('objectID')),
            objectName:col0.getAttribute('objectName'),
            panelID:panels[col1.selectedIndex].id
        })
    }

    var items = []
    var rows = document.getElementById('items-body').getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {

        var cols = rows[i].getElementsByTagName('td')

        var col0 = cols.item(0).getElementsByTagName('input').item(0)
        var col1 = cols.item(1).getElementsByTagName('select').item(0)
        var col2 = cols.item(2).getElementsByTagName('select').item(0)
        var col3 = cols.item(3).getElementsByTagName('select').item(0)
        var col4 = cols.item(4).getElementsByTagName('select').item(0)
        var col5 = cols.item(5).getElementsByTagName('select').item(0)
        var col6 = cols.item(6).getElementsByTagName('select').item(0)
        var col7 = cols.item(7).getElementsByTagName('select').item(0)

        items.push({
            id: Number(rows[i].id),
            name: col0.value,
            typeID: controlTypes[col1.selectedIndex].typeID,
            objectID: Number(col2.item(col2.selectedIndex).getAttribute('objectID')),
            boardID: Number(col3.getAttribute('boardID')),
            pinID: Number(col3.getAttribute('pinID')),
            isInput: modes[col4.selectedIndex].value,
            isActive: bools[col5.selectedIndex].value,
            isInverse: bools[col6.selectedIndex].value,
            duration: durables[col7.selectedIndex].dur
        })
    }

    var comment = document.getElementById('comment')

    var result ={
        tabloItems: tabloItems,
        objects:objs,
        items: items,
        comment: comment.value
    }
    return result
}

function updateConfig() {
    var cfg = config()

    var xhr = new XMLHttpRequest();
    xhr.open('POST', "http://" + location.host + "/cfg");
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(cfg));

    xhr.onload = function() {
        if (xhr.status ==  200) {
            openDialog("Настройки успешно применены.");
        }else{
            openDialog( "Настройки не применились! Ошибка.");
        }
    };
}

function openDialog(str) {
    var dialog = document.getElementById('dialogWindow');
    var dialogText = document.getElementById('dialogtext');
    dialogText.innerText = str;
    dialog.showModal();
}



function openFile(files) {
    if (files.length != 1){
        openDialog("Файл не выбран")
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        updateActiveBoards();

        document.getElementById('items-body').innerHTML = '';
        document.getElementById('tablo-items-body').innerHTML = '';
        document.getElementById('objects-body').innerHTML = '';

        addRows(JSON.parse(e.currentTarget.result))
    };
    reader.readAsText(files[0]);

}

function saveFile(){
    var cfg = config()
    const b = new Blob([JSON.stringify(cfg)], {type: 'application/json'});
    const url = window.URL.createObjectURL(b);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.json';
    a.type = 'application/json';
    a.addEventListener('click', () => {
        setTimeout(() => window.URL.revokeObjectURL(url), 10000);
    })
    a.click()
}
