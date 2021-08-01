import './style.css';
import { DOMMainPageLoader } from './page-loader';
import { ListFactory, ListItemFactory } from './factories';
import { LocalStorageManager } from './storage-manager';
import { URL_ID_PARAMETER_NAME } from './constants';

LocalStorageManager.initLists();
DOMMainPageLoader.load();

const addNewList = () => {
    let list = ListFactory();
    LocalStorageManager.addList(list);
    LocalStorageManager.initTaskList(list.storageTaskListKey);
    DOMMainPageLoader.pushNewListCard(list.title).addEventListener('click', openList);
}

const openList = (event) => {
    const id = getElementIndex(event.target);
    const lists = LocalStorageManager.getListsArray();
    console.log(lists[id]);

    const url = `tasks.html?${URL_ID_PARAMETER_NAME}=${id}`;
    const target = '_self';
    let taskWindow = window.open(url, target);
    
}

const listCards = document.querySelectorAll('div.list-card');
const newListCardButton = document.querySelector('div#new-list');

for (let listCard of listCards) {
    listCard.addEventListener('click', openList);
}
newListCardButton.addEventListener('click', addNewList);



function getElementIndex(element) {
    const parent = element.parentNode;
    return Array.prototype.indexOf.call(parent.children, element);
}