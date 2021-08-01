import './task-style.css';
import { URL_ID_PARAMETER_NAME } from './constants';
import { LocalStorageManager } from './storage-manager';
import { DOMTaskListLoader } from './page-loader';
import { ListItemFactory } from './factories';

const listId = getListIdFromUrl();
const listStorageKey = LocalStorageManager.getTaskListKey(listId);
let taskList = LocalStorageManager.getTaskListByListId(listId);

// const listKey = taskList[listId].storageTaskListKey;
// console.log(listKey);

console.log('list id: ' + getListIdFromUrl());
console.log(LocalStorageManager.getTaskListByListId(listId));

DOMTaskListLoader.load(listId);




const addNewTask = () => {
    let task = ListItemFactory();
    taskList.push(task);
    // console.log(taskList);
    DOMTaskListLoader.addTask();
    LocalStorageManager.addTask(listStorageKey, task);
}

const newTaskButton = document.querySelector('div#new-task');

newTaskButton.addEventListener('click', addNewTask);

function getListIdFromUrl() {
    const queryString = window.location.search;
    const urlParameters = new URLSearchParams(queryString);
    const listId = urlParameters.get(URL_ID_PARAMETER_NAME);
    return listId;
}
