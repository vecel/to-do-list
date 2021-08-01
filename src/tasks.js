import './task-style.css';
import { URL_ID_PARAMETER_NAME } from './constants';
import { LocalStorageManager } from './storage-manager';
import { DOMTaskListLoader } from './page-loader';

const listId = getListIdFromUrl();

console.log('list id: ' + getListIdFromUrl());
console.log(LocalStorageManager.getTaskListByListId(listId));

DOMTaskListLoader.load();


function getListIdFromUrl() {
    const queryString = window.location.search;
    const urlParameters = new URLSearchParams(queryString);
    const listId = urlParameters.get(URL_ID_PARAMETER_NAME);
    return listId;
}
