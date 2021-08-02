import './task-style.css';
import { URL_ID_PARAMETER_NAME } from './constants';
import { LocalStorageManager } from './storage-manager';
import { DOMTaskListLoader } from './page-loader';
import { ListItemFactory, listItemPrototype } from './factories';

const listId = getListIdFromUrl();
const LIST_STORAGE_KEY = LocalStorageManager.getTaskListKey(listId);

let tempTaskList = LocalStorageManager.getTaskListByListId(listId);
let taskList = parseToTaskFactoryObjects(tempTaskList);

// sort array - function below

// let customTasks = [{title: 'Lorem', done: false, dueDate: '02-08-2021'}, {title: 'Ipsum', done: true}];
sortTaskList(taskList);

// console.log(customTasks);

DOMTaskListLoader.renderTaskList(taskList);

const taskCards = document.querySelectorAll('div.task-container');
const newTaskButton = document.querySelector('div#new-task');



const addNewTask = () => {
    let task = ListItemFactory();
    taskList.push(task);
    DOMTaskListLoader.addTask();
    LocalStorageManager.addTask(LIST_STORAGE_KEY, task);
    // apply event listeners
}

const toggleCheckboxValue = (e) => {
    console.log('toggle checkbox event');
    const id = getTaskCardIndex(e.target);
    console.log(id);

    taskList[id].toggleDoneStatus();

    console.log(taskList[id]);

    sortTaskList(taskList);
    LocalStorageManager.updateTaskList(LIST_STORAGE_KEY, taskList);

    DOMTaskListLoader.renderTaskList(taskList);
    // ^ it removes eventListeners

    // console.log(taskList);

}


const checkboxList = document.querySelectorAll('label.checkbox-container span');
for (let i = 0; i < checkboxList.length; ++i) {
    checkboxList[i].addEventListener('click', toggleCheckboxValue);
} 
// for (let i = 0; i < taskCards.length; ++i) {
//     const checkbox = taskCards[i].querySelector('label.checkbox-container span');
//     checkbox.addEventListener('click', toggleCheckboxValue);
// }
newTaskButton.addEventListener('click', addNewTask);

function getListIdFromUrl() {
    const queryString = window.location.search;
    const urlParameters = new URLSearchParams(queryString);
    const listId = urlParameters.get(URL_ID_PARAMETER_NAME);
    return listId;
}

function parseToTaskFactoryObjects(taskList) {
    let parsedArray = [];
    for (let i = 0; i < taskList.length; ++i) {
        parsedArray.push(Object.setPrototypeOf(taskList[i], listItemPrototype));
    }
    return parsedArray;
}

function sortTaskList(taskList) {
    taskList.sort((taskA, taskB) => {
        if (taskA.done !== taskB.done) {
            if (taskA.done) return 1;
            return -1;
        }

        // dates

        if (taskA.priority > taskB.priority) return -1;
        return 0;
    })
}

function getTaskCardIndex(element) {
    const taskCards = Array.from(document.querySelectorAll('div.task-container')); 
    let temporaryElement = element;
    while (!taskCards.includes(temporaryElement)) {
        temporaryElement = temporaryElement.parentNode;
    }
    const parent = temporaryElement.parentNode;
    return Array.prototype.indexOf.call(parent.children, temporaryElement);
}