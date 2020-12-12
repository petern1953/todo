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
const completedPercent = document.querySelector('.completed_percent .number');

const pendingToDosList = document.querySelector('.pending.todos');
const completedToDosList = document.querySelector('.completed.todos');

const instruction = document.querySelector('#instruction');
const plusButton = document.querySelector('.instruction-div button');
const hideOrShowButton = document.querySelector('.hideOrShow__button');
const hideOrShowText = document.querySelector('.hideOrShow__text');
const clearAllButton = document.querySelector('.clearAll__button');

const tasks = document.querySelector('.tasks');
const commands = document.querySelector('.commands');
const noTodos = document.querySelector('.no-todos');

let pendingToDosArray = [];
let completedToDosArray = [];

const fillInDate = () => {
    const date = document.querySelector('.date');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    // const dateString = now.toLocaleDateString('en-GB', options)
    const dateString = now.toLocaleDateString('en-US', options)
        .replace(', ', '<br>')
        .replace(/\//g, '-');
    date.innerHTML = dateString;
};

const fillInPendingNumber = () => {
    pendingItemsNumber.textContent = pendingToDosArray.length;
};

const fillInCompletedPercent = () => {
    completedPercent.textContent = (completedToDosArray.length + pendingToDosArray.length) ?
        Math.ceil(completedToDosArray.length / (pendingToDosArray.length + completedToDosArray.length) * 100) :
        0;
};

const fillInToDoInfo = () => {
    fillInPendingNumber();
    fillInCompletedPercent();
};

// status: pending / completed, action: insert / delete
const updateToDosArray = (toDo, status, action) => {
    if (status === 'pending') {
        if (action === 'insert') pendingToDosArray.push(toDo);
        else {
            const newArray = pendingToDosArray.filter(item => item !== toDo);
            pendingToDosArray = newArray;
        }
    } else {
        completedToDosArray.push(toDo);
    }
};

let newToDo;
const getNewToDo = () => {
    const newToDo = instruction.value;
    return newToDo;
};

const clearToDoInputField = () => {
    instruction.value = '';
    newToDo = '';
};

const showBid = (event) => {
    event.target.children[3].classList.remove('hidden');
}

const hideBid = (event) => {
    event.target.children[3].classList.add('hidden');
}

const makeToDoCompleted = (toDoRow) => {
    moveToCompleted(toDoRow.outerHTML);
    toDoRow.remove();

    const toDo = toDoRow.textContent.trim();
    updateToDosArray(toDo, 'pending', 'delete');
    updateToDosArray(toDo, 'completed', 'insert');
    handleIfPendingToDoListEmpty();

    localStorage.setItem(pendingToDoListName, JSON.stringify(pendingToDosArray));
    localStorage.setItem(completedToDoListName, JSON.stringify(completedToDosArray));

    fillInToDoInfo();
};

const activateCheckBox = (checkBox) => {
    checkBox.onclick = function () {
        const toDoRow = this.parentElement;
        if (this.checked) {
            makeToDoCompleted(toDoRow);
        }
    };
};

const activateCheckBoxes = () => {
    const checkBoxes = document.querySelectorAll('.pending .todo .checkbox');
    checkBoxes.forEach(checkBox => activateCheckBox(checkBox));
}
const activateBid = (toDoItem) => {
    toDoItem.addEventListener('mouseenter', showBid);
    toDoItem.addEventListener('mouseleave', hideBid);
    const bid = toDoItem.querySelector('i.fa-trash');
    if (bid) {
        bid.addEventListener('click', removePendingToDo);
    }
}

const activateBids = () => {
    const pendigToDoItems = document.querySelectorAll('.pending .todo');
    pendigToDoItems.forEach(item => activateBid(item));
}

const getTodos = () => {
    const pending = localStorage.getItem(pendingToDoListName);
    pendingToDosArray = pending ? JSON.parse(pending) : [];
    const completed = localStorage.getItem(completedToDoListName);
    completedToDosArray = completed ? JSON.parse(completed) : [];
}

const createToDoElement = () => {
    const toDoElement = document.createElement('li');
    toDoElement.classList.add('todo');
    return toDoElement;
}

const makeListItem = (toDo) => {
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
        // } else if (status === 'completed') {
    } else {
        completedToDosList.insertBefore(toDoHTML, completedToDosList.firstElementChild);
    };
};

const fillInToDos = () => {
    if (pendingToDosArray.length > 0) pendingToDosArray.forEach(todo => fillInToDo(todo, 'pending'));
    if (completedToDosArray.length > 0) completedToDosArray.forEach(todo => fillInToDo(todo, 'completed'));
};

const moveToCompleted = fromPending => {
    completedToDosList.innerHTML = fromPending + completedToDosList.innerHTML;
};

const storeToDos = (toDo, status) => {
    if (status === 'pending' || status === '') {
        updateToDosArray(toDo, status, 'insert');
        localStorage.setItem(pendingToDoListName, JSON.stringify(pendingToDosArray));
    }
    if (status === 'completed' || status === '')
        localStorage.setItem(completedToDoListName, JSON.stringify(completedToDosArray));
}

const showNewToDo = newToDo => {
    const toDoHTML =
        `<li class="todo">
        <input class="checkbox" type="checkbox">
        <i class="fa fa-check"></i><p>${newToDo}</p><i class="fa fa-trash hidden"></i>
    </li>`;
    pendingToDosList.innerHTML = toDoHTML + pendingToDosList.innerHTML;
}

const showChill = () => {
    tasks.classList.add('hidden');
    commands.classList.add('hidden');
    noTodos.classList.remove('hidden');
};

const hideChill = () => {
    tasks.classList.remove('hidden');
    commands.classList.remove('hidden');
    noTodos.classList.add('hidden');
};

const isChillVisible = () => {
    return !noTodos.classList.contains('hidden');
};

const isPendingToDoListEmpty = () => {
    return pendingToDosArray.length === 0;
};

const handleIfPendingToDoListEmpty = () => {
    if (!isPendingToDoListEmpty() && isChillVisible()) {
        hideChill();
        return
    };
    if (isPendingToDoListEmpty() && !isChillVisible()) {
        showChill();
    }
};

const removePendingToDo = (ev) => {
    const li = ev.target.parentElement;
    const pendingToDo = li.textContent.trim();
    li.remove();
    updateToDosArray(pendingToDo, 'pending', 'delete');
    localStorage.setItem(pendingToDoListName, JSON.stringify(pendingToDosArray));
    fillInToDoInfo();
    handleIfPendingToDoListEmpty();
}

const handleNewToDo = () => {
    newToDo = getNewToDo().trim();
    if (newToDo === '') {
        clearToDoInputField();
        return;
    }
    storeToDos(newToDo, 'pending');
    handleIfPendingToDoListEmpty();
    showNewToDo(newToDo);
    fillInToDoInfo();
    clearToDoInputField();
    activateBids();
    activateCheckBoxes();
}


activateBids();
plusButton.addEventListener('click', handleNewToDo);

// const handleCompletedToDo = () => {};

// todoManager main
(function () {
    fillInDate();
    getTodos();
    fillInToDos();
    fillInToDoInfo();
    activateBids();
    activateCheckBoxes();
})();

const hideCompletedToDos = () => {
    completedToDosList.classList.add('hidden');
};

const showCompletedToDos = () => {
    completedToDosList.classList.remove('hidden');
};

const hideComplete = () => {
    hideOrShowText.textContent = 'Show ';
    hideCompletedToDos();
};

const showComplete = () => {
    hideOrShowText.textContent = 'Hide ';
    showCompletedToDos();
};

const hideOrShowComplete = () => {
    (hideOrShowText.textContent === 'Hide ') ? hideComplete() : showComplete();
};

let toDelete;
const emptyPendingToDosList = () => {
    toDelete = pendingToDosList.querySelectorAll('li.todo:not(.endOfChain)')
    toDelete.forEach(li => li.remove());
}

const clearAll = () => {
    emptyPendingToDosList();
    pendingToDosArray = [];
    localStorage.setItem(pendingToDoListName, JSON.stringify(pendingToDosArray));
    fillInToDoInfo();
    handleIfPendingToDoListEmpty();
}

hideOrShowButton.addEventListener('click', hideOrShowComplete);
clearAllButton.addEventListener('click', clearAll);

// just for test
// localStorage.setItem(pendingToDoListName, JSON.stringify(['enni', 'inni', 'aludni']));
// localStorage.setItem('completedToDos', JSON.stringify(['programozás', 'bevásárlás', 'séta']));
