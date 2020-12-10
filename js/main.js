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

const fillInDate = () => {
    const date = document.querySelector('.date');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-GB', options)
        .replace(', ', '<br>')
        .replace(/\//g, '-');
    date.innerHTML = dateString;
}

// pendingToDos Root
// const pendingToDos = document.querySelector('.pending.todos');
const pendingToDosList = document.querySelector('.pending.todos');
// completedToDos Root
// const completedToDos = document.querySelector('.completed.todos');
const completedToDosList = document.querySelector('.completed.todos');
const instruction = document.querySelector('#instruction');
const plusButton = document.querySelector('.instruction-div button');




let newToDo;
const getNewToDo = () => {
    return instruction.value;
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
const activateBid = () => {
    const pendigToDoItems = document.querySelectorAll('.pending .todo');

    pendigToDoItems.forEach(item => item.addEventListener('mouseenter', showBid));
    // pendigToDoItems.forEach(item => item.addEventListener('mouseleave', hideBid));
}

let pendingToDosArray = [];
let completedToDosArray = [];

const getTodos = () => {
    pendingToDosArray = JSON.parse(localStorage.getItem('pendingToDos'));
    completedToDosArray = JSON.parse(localStorage.getItem('completedToDos'));
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
    pendingToDosArray.forEach(todo => fillInToDo(todo, 'pending'));
    completedToDosArray.forEach(todo => fillInToDo(todo, 'completed'));
};

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
    newToDo = getNewToDo();
    showNewToDo(newToDo);
    clearToDoInputField();
    activateBid();
}
activateBid();
plusButton.addEventListener('click', handleNewToDo);


// todoManager main
(function () {
    fillInDate();
    getTodos();
    fillInToDos();
})();

// just for test
localStorage.setItem('pendingToDos', JSON.stringify(['enni', 'inni', 'aludni']));
localStorage.setItem('completedToDos', JSON.stringify(['programozás', 'bevásárlás', 'séta']));
