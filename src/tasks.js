import './task-style.css';
import { URL_ID_PARAMETER_NAME } from './constants';
import { LocalStorageManager } from './storage-manager';
import { DOMTaskListLoader } from './page-loader';
import { ListItemFactory, listItemPrototype } from './factories';

const listId = getListIdFromUrl();
const LIST_STORAGE_KEY = LocalStorageManager.getTaskListKey(listId);

let tempTaskList = LocalStorageManager.getTaskListByListId(listId);
let taskList = parseToTaskFactoryObjects(tempTaskList);

// taskList[0].title = 'Lorem';
// taskList[1].title = 'Ipsum';

sortTaskList(taskList);

DOMTaskListLoader.load(taskList);
DOMTaskListLoader.renderTaskList(taskList);

const taskCards = document.querySelectorAll('div.task-container');
const newTaskButton = document.querySelector('div#new-task');



const addNewTask = () => {
    let task = ListItemFactory(LIST_STORAGE_KEY);
    taskList.push(task);
    LocalStorageManager.incrementCreatedTaskNumber(LIST_STORAGE_KEY);
    LocalStorageManager.addTask(LIST_STORAGE_KEY, task);
    DOMTaskListLoader.addTask(task.id);
    // apply event listeners
    // find task element by div#taskId
}

const toggleCheckboxValue = (e) => {
    console.log('toggle checkbox event');
    const index = getTaskIndexCorrespondingToElement(e.target);
    taskList[index].toggleDoneStatus();
    sortTaskList(taskList);
    LocalStorageManager.updateTaskList(LIST_STORAGE_KEY, taskList);
    DOMTaskListLoader.renderTaskList(taskList);
}

const changeTitle = (e) => {
    const title = DOMTaskListLoader.getElementTitle(e.target);
    const id = getTaskIndexCorrespondingToElement(e.target);
    taskList[id].setTitle(e.target.value);
    LocalStorageManager.updateTaskList(LIST_STORAGE_KEY, taskList);
}



for (let i = 0; i < taskCards.length; ++i) {
    const checkbox = taskCards[i].querySelector('.task-info label.checkbox-container span');
    const titleDisplay = taskCards[i].querySelector('.task-info label.title-input input');
    
    checkbox.addEventListener('click', toggleCheckboxValue);
    titleDisplay.addEventListener('focusout', changeTitle);
}
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

function getTaskId(element) {
    const taskCards = Array.from(document.querySelectorAll('div.task-container')); 
    let temporaryElement = element;
    while (!taskCards.includes(temporaryElement)) {
        temporaryElement = temporaryElement.parentNode;
    }
    const id = parseInt(temporaryElement.id);
    return id;
}

function getTaskIndexCorrespondingToElement(element) {
    const elementId = getTaskId(element);
    const index = taskList.findIndex(task => task.id === elementId);
    return index;
}