import './task-style.css';
import { URL_ID_PARAMETER_NAME } from './constants';
import { LocalStorageManager } from './storage-manager';
import { DOMTaskListLoader } from './page-loader';
import { ListItemFactory, listItemPrototype } from './factories';

const listId = getListIdFromUrl();
const LIST_STORAGE_KEY = LocalStorageManager.getTaskListKey(listId);

let tempTaskList = LocalStorageManager.getTaskListByListId(listId);
let taskList = parseToTaskFactoryObjects(tempTaskList);

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
    let taskElement = DOMTaskListLoader.addTask(task.id);
    // console.log(taskElement);
    applyEventListeners(taskElement);
}

const toggleCheckboxValue = (e) => {
    console.log('toggle checkbox event');
    const index = getTaskIndexCorrespondingToElement(e.target);
    taskList[index].toggleDoneStatus();
    sortTaskList(taskList);
    LocalStorageManager.updateTaskList(LIST_STORAGE_KEY, taskList);
    DOMTaskListLoader.renderTaskList(taskList);
}

const changePriority = (e) => {
    console.log(e.target);
    const priority = getPriorityFromList(e.target);       
    const index = getTaskIndexCorrespondingToElement(e.target);
    taskList[index].setPriority(priority);
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

const showTaskDetails = (e) => {
    console.log('show details');    
    const taskIndex = getTaskId(e.target);
    const taskId = taskList.findIndex(task => task.id === parseInt(taskIndex));
    const taskObject = taskList[taskId];
    
    const details = DOMTaskListLoader.toggleTaskDetailsDisplay(taskIndex, taskObject);
    if (details !== undefined)
        applyDetailsBoxEventListeners(details);
}



for (let i = 0; i < taskCards.length; ++i) {
    applyEventListeners(taskCards[i]);
}
newTaskButton.addEventListener('click', addNewTask);



function applyEventListeners(taskElement) {
    const checkbox = taskElement.querySelector('.task-info label.checkbox-container span');
    const titleDisplay = taskElement.querySelector('.task-info label.title-input input');
    const detailsButton = taskElement.querySelector('button.details-button');
    
    checkbox.addEventListener('click', toggleCheckboxValue);
    titleDisplay.addEventListener('focusout', changeTitle);
    detailsButton.addEventListener('click', showTaskDetails);
}

function applyDetailsBoxEventListeners(detailsElement) {
    const priorityList = detailsElement.querySelector('ul.priority');
    
    
    
    priorityList.addEventListener('click', changePriority);
}

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
    // console.log(taskCards);
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

function getPriorityFromList(element) {
    while (element.tagName !== 'LI') element = element.parentNode;
    const priority = extractPriorityFromClassList(element.classList);
    updatePriorityPreview(element, priority);
    element.parentNode.parentNode.querySelector('.priority-preview').textContent = priority;
    return priority;
}

function extractPriorityFromClassList(classList) {
    for (let i = 0; i < classList.length; ++i) {
        const priority = parseInt(classList[i]);
        if (!Number.isNaN(priority)) return priority;
    }
    return -1;
}

function updatePriorityPreview(element, priority) {
    while (!element.classList.contains('details-section')) element = element.parentNode;
    element.querySelector('.priority-preview').textContent = priority;
}