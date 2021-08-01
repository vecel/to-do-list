import './task-style.css';
import { URL_ID_PARAMETER_NAME } from './constants';
import { LocalStorageManager } from './storage-manager';
import { DOMTaskListLoader } from './page-loader';
import { ListItemFactory } from './factories';

const listId = getListIdFromUrl();
const listStorageKey = LocalStorageManager.getTaskListKey(listId);
let taskList = LocalStorageManager.getTaskListByListId(listId);

// sort array - function below

let customTasks = [{title: 'Lorem', done: false, dueDate: '02-08-2021'}, {title: 'Ipsum', done: true}];
sortTaskList(customTasks);

// console.log(customTasks);

DOMTaskListLoader.renderTaskList(customTasks);

const taskCards = document.querySelectorAll('div.task-container');
const newTaskButton = document.querySelector('div#new-task');



const addNewTask = () => {
    let task = ListItemFactory();
    taskList.push(task);
    DOMTaskListLoader.addTask();
    LocalStorageManager.addTask(listStorageKey, task);
}

// for (let taskCard of taskCards) {
//     const 
// }
newTaskButton.addEventListener('click', addNewTask);

function getListIdFromUrl() {
    const queryString = window.location.search;
    const urlParameters = new URLSearchParams(queryString);
    const listId = urlParameters.get(URL_ID_PARAMETER_NAME);
    return listId;
}

// function addCustomTask() {
//     let task = ListItemFactory();
//     task.title = 'Lorem Ipsum';
//     task.done = true;
//     task.dueDate = 'tommorow';
//     taskList.push(task);
//     DOMTaskListLoader.addTask();
//     LocalStorageManager.addTask(listStorageKey, task);
// }

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