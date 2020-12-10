// Egy Teendőlista alkalmazást kell lefejlesztened. Az alkalmazás designját és működését a todo1..todo3.jpg ábrák
// (basic design, completed tasks, empty todo-list) szemléltetik.
// A színeket, ikonokat és a betűtípust szabadon választhatod
// A checkboxoknak nem kell egyedi designt készíteni.
// Az alkalmazás localStorage-ban tárolja a teendőket.
// Az alkalmazás indításkor ellenőrzi, vannak-e mentett teendők, ha igen, akkor betölti őket a storage-ból.
// Felül szerepelnie kell a jelenlegi dátumnak.
// Az input mező placholdere: "Take the garbage out"
// A plusz jelre kattintva egy animáció kíséretében megjelenik az új teendő a listában, az input tartalma törlődik.
// A teendőlista feletti mondatban (You have X pending items) látható, hogy szerepel a teendők száma, ez dinamikusan frissüljön mindig.
// Ha egy teendő fölé visszük a kurzort, egy animáció kíséretében megjelenik a kuka ikon, amire kattintva törlődik a teendő.
// A teendő előtti checkboxot bejelölve az adott teendő elvégzett lesz, a listáról eltűnik.
// A Show / Hide Complete szövegre kattintva lehet megjeleníteni / elrejteni a már elvégzett teendőket.
// A Clear All-ra kattintva a még el nem végzett összes teendő törlésre kerül.

'use strict';

const pendingToDoListName = 'pendingToDos';
const completedToDoListName = 'completedToDos';
const pendingItemsNumber = document.querySelector('.pending_items .number');

// pendingToDos Root
// const pendingToDos = document.querySelector('.pending.todos');
const pendingToDosList = document.querySelector('.pending.todos');
// completedToDos Root
// const completedToDos = document.querySelector('.completed.todos');
const completedToDosList = document.querySelector('.completed.todos');
const instruction = document.querySelector('#instruction');
const plusButton = document.querySelector('.instruction-div button');

let pendingToDosArray = [];
let completedToDosArray = [];

const fillInDate = () => {
    const date = document.querySelector('.date');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-GB', options)
        .replace(', ', '<br>')
        .replace(/\//g, '-');
    date.innerHTML = dateString;
};

const fillInToDoInfo = () => {
    pendingItemsNumber.textContent = pendingToDosArray.length;
};

// status: pending / completed, action: insert / delete
const updateToDosArray = (toDo, status, action) => {
    if (status === 'pending') {
        if (action === 'insert') pendingToDosArray.unshift(toDo);
        else {
            // meg kell keresni a tömbben, és törölni belőle
        }
    } else {
        // completed
        if (action === 'insert') completedToDosArray.unshift(toDo);
        else {
            // meg kell keresni a tömbben, és törölni belőle
        }
    }
};

let newToDo;
const getNewToDo = () => {
    const newToDo = instruction.value;
    // updateToDosArray(newToDo, 'pending', 'insert');
    return newToDo;
};

const clearToDoInputField = () => {
    instruction.value = '';
    newToDo = '';
};

const showBid = (event) => {
    event.target.children[3].classList.remove('hidden');
    // console.log(event.target.children[3].classList);
}

const hideBid = (event) => {
    event.target.children[3].classList.add('hidden');
    // console.log(event.target.children[3].classList);
}
// toDO: complete
const makeToDoCompleted = (toDoRow) => {
    console.log(toDoRow, toDoRow.textContent.trim());
};

// toDO: complete
const activateCheckBox = (checkBox) => {
    checkBox.onclick = function () {
        // these 3 rows are needed to know which row to remove
        const toDoRow = this.parentElement;
        // console.log(toDoRow);
        // console.log(toDoRow.textContent.trim());
        // ---------------------------
        if (this.checked) {
            // console.log(toDoRow, toDoRow.textContent.trim());
            makeToDoCompleted(toDoRow);
        }
    };
};
// toDO: complete
const activateCheckBoxes = () => {
    const checkBoxes = document.querySelectorAll('.pending .todo .checkbox');
    // pendigToDoItems.forEach(item => item.addEventListener('mouseenter', showBid));
    // pendigToDoItems.forEach(item => item.addEventListener('mouseleave', hideBid));
    checkBoxes.forEach(checkBox => activateCheckBox(checkBox));
}

const activateBid = (toDoItem) => {
    toDoItem.addEventListener('mouseenter', showBid);
    toDoItem.addEventListener('mouseleave', hideBid);
}

const activateBids = () => {
    const pendigToDoItems = document.querySelectorAll('.pending .todo');
    // pendigToDoItems.forEach(item => item.addEventListener('mouseenter', showBid));
    // pendigToDoItems.forEach(item => item.addEventListener('mouseleave', hideBid));
    pendigToDoItems.forEach(item => activateBid(item));
}

const getTodos = () => {
    const pending = localStorage.getItem(pendingToDoListName);
    pendingToDosArray = pending ? JSON.parse(pending) : [];
    const completed = localStorage.getItem(completedToDoListName);
    completedToDosArray = completed ? JSON.parse(completed) : [];
    // JSON.parse(localStorage.getItem(completedToDoListName));
}
const createToDoElement = () => {
    const toDoElement = document.createElement('li');
    toDoElement.classList.add('todo');
    return toDoElement;
}

const makeListItem = (toDo) => {
    // return `<li class="todo">
    //     <input class="checkbox" type="checkbox">
    //     <i class="fa fa-check"></i><p>${toDo}</p><i class="fa fa-trash hidden"></i>
    // </li>`;
    const toDoElement = createToDoElement();
    toDoElement.innerHTML =
        `<input class="checkbox" type="checkbox">
        <i class="fa fa-check"></i><p>${toDo}</p><i class="fa fa-trash hidden"></i>`;
    activateBid(toDoElement);
    return toDoElement;
}

const fillInToDo = (toDo, status) => {
    const toDoHTML = makeListItem(toDo);
    if (status === 'pending') {
        pendingToDosList.insertBefore(toDoHTML, pendingToDosList.firstElementChild);
        // pendingToDosList.innerHTML = toDoHTML + pendingToDosList.innerHTML;
    } else {
        // completedToDosList.innerHTML = toDoHTML + completedToDosList.innerHTML;
        completedToDosList.insertBefore(toDoHTML, completedToDosList.firstElementChild);
    };
};

const fillInToDos = () => {
    if (pendingToDosArray.length > 0) pendingToDosArray.forEach(todo => fillInToDo(todo, 'pending'));
    if (completedToDosArray.length > 0) completedToDosArray.forEach(todo => fillInToDo(todo, 'completed'));
};

const storeToDos = (toDo, status) => {
    if (status === 'pending' || status === '') {
        updateToDosArray(toDo, status, 'insert');
        localStorage.setItem(pendingToDoListName, JSON.stringify(pendingToDosArray));
    }
    if (status === 'completed' || status === '')
        localStorage.setItem(completedToDoListName, JSON.stringify(completedToDosArray));
    // localStorage.setItem(JSON.stringify(completedToDoListName, completedToDosArray));
}

// toDO: check these if needed at all
//
const showNewToDo = newToDo => {
    const toDoHTML =
        `<li class="todo">
        <input class="checkbox" type="checkbox">
        <i class="fa fa-check"></i><p>${newToDo}</p><i class="fa fa-trash"></i>
    </li>`;
    pendingToDosList.innerHTML = toDoHTML + pendingToDosList.innerHTML;
}

const handleNewToDo = () => {
    newToDo = getNewToDo().trim();
    if (newToDo === '') {
        clearToDoInputField();
        return;
    }
    showNewToDo(newToDo);
    storeToDos(newToDo, 'pending');
    fillInToDoInfo();
    clearToDoInputField();
    activateBids();
    activateCheckBoxes();
}
activateBids();
plusButton.addEventListener('click', handleNewToDo);

const handleCompletedToDo = () => {

};
// const activateCheckBox = () => {
//     const checkBox =
//         checkBox.addEventListener
// }

// todoManager main
(function () {
    fillInDate();
    getTodos();
    fillInToDos();
    fillInToDoInfo();
})();

// just for test
// localStorage.setItem(pendingToDoListName, JSON.stringify(['enni', 'inni', 'aludni']));
// localStorage.setItem('completedToDos', JSON.stringify(['programozás', 'bevásárlás', 'séta']));
