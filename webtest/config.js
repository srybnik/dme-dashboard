
let panels = [
    {id:1, name:"ВПП-1"},
    {id:2, name:"ВПП-Ц"},
    {id:3, name:"Объекты РТОП"}
]

let boards = [
    {boardID: 1},
    {boardID: 2},
    {boardID: 5}
]

let usedPins = [
    {boardID: 1, pinID: 1},
    {boardID: 1, pinID: 3},
    {boardID: 2, pinID: 5},
    {boardID: 5, pinID: 10}
]








window.addEventListener("load", function (evt) {
    var startDate = document.getElementById("startDate");
    var endDate = document.getElementById("endDate");
    startDate.setAttribute("value", new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10));
    endDate.setAttribute("value", new Date().toISOString().slice(0, 10));
    GetData()


    let tBody = document.getElementById('tbody');
    addObjectRow(tbody, getNewID(), 'Test', 1, true);
    addObjectRow(tbody, getNewID(), 'DVOR', 2, false);
    addObjectRow(tbody, getNewID(), 'DME', 3, false);
    addObjectRow(tbody, getNewID(), 'KRM', 1, true);


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
    let objectsBody = document.getElementById('objects-body');
    addObjectRow(objectsBody,  getNewID(), 'New', 3, true);
}

function getNewID() {
    let dt = new Date()
    return dt.getTime()
}

function addObjectRow(objectsBody, objectID, objectName, panelID) {
    let row = document.createElement('tr');

    let nameTD = document.createElement('td');
    let panelTD = document.createElement('td');
    let buttonTD = document.createElement('td');


    nameTD.setAttribute('class', "td-center");
    panelTD.setAttribute('class', "td-center");
    buttonTD.setAttribute('class', "td-right");

    row.setAttribute('id', objectID);

    let newInput = document.createElement('input');
    newInput.value = objectName;
    nameTD.appendChild(newInput);
    row.appendChild(nameTD);

    let newSelect = document.createElement('select')
    panels.forEach( p => {
        let newOption = document.createElement('option')
        newOption.setAttribute('id', p.id);
        newOption.innerText = p.name;
        newSelect.appendChild(newOption);
    });
    newSelect.selectedIndex = panelID-1;
    panelTD.appendChild(newSelect);
    row.appendChild(panelTD);


    //---Кнопки---

    let newbuttonUp = document.createElement('button')
    newbuttonUp.textContent = '↑'
    newbuttonUp.onclick = ev => {
        if (row.sectionRowIndex > 0){
            let currentRow = objectsBody.rows[row.sectionRowIndex];
            let prevRow = objectsBody.rows[row.sectionRowIndex-1];
            currentRow.parentNode.insertBefore(currentRow, prevRow);
        }
    }
    buttonTD.appendChild(newbuttonUp);

    let buttonDown = document.createElement('button')
    buttonDown.textContent = '↓'
    buttonDown.onclick = ev => {
        if (row.sectionRowIndex < objectsBody.rows.length-1){
            let currentRow = objectsBody.rows[row.sectionRowIndex];
            let nextRow = objectsBody.rows[row.sectionRowIndex+1];
            nextRow.parentNode.insertBefore(nextRow, currentRow);
        }
    }
    buttonTD.appendChild(buttonDown);

    let buttonDel = document.createElement('button')
    buttonDel.textContent = "Удалить"
    buttonDel.onclick = ev => {
        objectsBody.removeChild(row);
    }
    buttonTD.appendChild(buttonDel);

    row.appendChild(buttonTD)

    objectsBody.appendChild(row)
}



function addComponentRow(objectsBody, id, name, panel, isEnable) {
    let row = document.createElement('tr');

    let nameTD = document.createElement('td');
    let panelTD = document.createElement('td');
    let checkboxTD = document.createElement('td');
    let buttonTD = document.createElement('td');


    nameTD.setAttribute('class', "td-left");
    panelTD.setAttribute('class', "td-left");
    checkboxTD.setAttribute('class', "td-left");
    buttonTD.setAttribute('class', "td-right");

    row.setAttribute('id', id);

    let newInput = document.createElement('input');
    newInput.value = name;
    nameTD.appendChild(newInput);
    row.appendChild(nameTD);

    let newSelect = document.createElement('select')
    panels.forEach( p => {
        let newOption = document.createElement('option')
        newOption.setAttribute('id', p.id);
        newOption.innerText = p.name;
        newSelect.appendChild(newOption);
        newSelect.selectedIndex = panels.find( i => i.id === panel).id-1;

    });
    panelTD.appendChild(newSelect);
    row.appendChild(panelTD);

    let newcheckbox = document.createElement('input')
    newcheckbox.setAttribute('type', "checkbox");
    if (isEnable) {
        newcheckbox.setAttribute('checked', isEnable);
    }

    checkboxTD.appendChild(newcheckbox)

    row.appendChild(checkboxTD)



    let newbuttonUp = document.createElement('button')
    newbuttonUp.textContent = '↑'
    newbuttonUp.onclick = ev => {
        if (row.sectionRowIndex > 0){
            let currentRow = objectsBody.rows[row.sectionRowIndex];
            let prevRow = objectsBody.rows[row.sectionRowIndex-1];
            currentRow.parentNode.insertBefore(currentRow, prevRow);
        }
    }
    buttonTD.appendChild(newbuttonUp);

    let buttonDown = document.createElement('button')
    buttonDown.textContent = '↓'
    buttonDown.onclick = ev => {
        if (row.sectionRowIndex < objectsBody.rows.length-1){
            let currentRow = objectsBody.rows[row.sectionRowIndex];
            let nextRow = objectsBody.rows[row.sectionRowIndex+1];
            nextRow.parentNode.insertBefore(nextRow, currentRow);
        }
    }
    buttonTD.appendChild(buttonDown);

    let buttonDel = document.createElement('button')
    buttonDel.textContent = "Удалить"
    buttonDel.onclick = ev => {
        objectsBody.removeChild(row);
    }
    buttonTD.appendChild(buttonDel);

    row.appendChild(buttonTD)

    objectsBody.appendChild(row)
}
