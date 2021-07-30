import './style.css';
import { DOMMainPageLoader } from './page-loader';
import { ListFactory, ListItemFactory } from './factories';
import { LocalStorageManager } from './storage-manager';

LocalStorageManager.initLists();
DOMMainPageLoader.load();

const addNewList = () => {
    let list = ListFactory();
    LocalStorageManager.addList(list);
    DOMMainPageLoader.pushNewListCard(list.title).addEventListener('click', openList);
}

const openList = (event) => {
    const id = getElementIndex(event.target);
    const lists = LocalStorageManager.getListsArray();
    console.log(lists[id]);
    window.open('tasks.html');
    // link to second html file
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