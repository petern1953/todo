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

const pendingToDos = document.querySelector('.pending.todos');
const completedToDos = document.querySelector('.completed.todos');

let pendingToDosArray = [];
let completedToDosArray = [];


const getTodos = () => {
    pendingToDosArray = JSON.parse(localStorage.getItem('pendingToDos'));
    completedToDosArray = JSON.parse(localStorage.getItem('completedToDos'));
}

const fillInToDos = (todoArray, status) => {
    if (status === 'pending') {

    }
}

const todoManager = () => {
    fillInDate();
    getTodos();
}


localStorage.setItem('pendingToDos', JSON.stringify(['enni', 'inni', 'aludni']));
localStorage.setItem('completedToDos', JSON.stringify(['programozás', 'bevásárlás', 'séta']));