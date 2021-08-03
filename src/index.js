import './style.css';
import { DOMMainPageLoader, DOMTaskListLoader } from './page-loader';
import { ListFactory } from './factories';
import { LocalStorageManager } from './storage-manager';
import { URL_ID_PARAMETER_NAME } from './constants';

LocalStorageManager.initLists();
DOMMainPageLoader.load();

const addNewList = () => {
    let list = ListFactory();
    LocalStorageManager.addList(list);
    LocalStorageManager.initTaskList(list.storageTaskListKey);
    const listCard = DOMMainPageLoader.pushNewListCard(list.title);
    listCard.addEventListener('click', openList);
    listCard.querySelector('label input.list-title').addEventListener('focusout', changeTitle);
}

const openList = (event) => {
    if (isEventTriggeredOnTitleInput(event)) return;

    const id = getElementIndex(event.target);
    const lists = LocalStorageManager.getListsArray();
    console.log(lists[id]);

    const url = `tasks.html?${URL_ID_PARAMETER_NAME}=${id}`;
    const target = '_self';
    let taskWindow = window.open(url, target);
    
}

const changeTitle = (event) => {
    const id = getElementIndex(event.target);
    console.log(id);
    const lists = LocalStorageManager.getListsArray();
    lists[id].title = event.target.value;

    console.log(lists);
    console.log(lists[id]);
    
    LocalStorageManager.setListsArray(lists);
    console.log('hello there')
    // console.log(LocalStorageManager.getListsArray());
}

const mainElement = document.querySelector('main');
const listCards = document.querySelectorAll('div.list-card');
const newListCardButton = document.querySelector('div#new-list');

for (let listCard of listCards) {
    listCard.addEventListener('click', openList);
    listCard.querySelector('label input.list-title').addEventListener('focusout', changeTitle);
}
newListCardButton.addEventListener('click', addNewList);



function getElementIndex(element) {
    let temporaryElement = element;
    while (temporaryElement.parentNode !== DOMMainPageLoader.getMainElement()) {
        temporaryElement = temporaryElement.parentNode;
    }
    const parent = temporaryElement.parentNode;
    return Array.prototype.indexOf.call(parent.children, temporaryElement);
}

function isEventTriggeredOnTitleInput(event) {
    return event.target.tagName.toLowerCase() === 'input';
}