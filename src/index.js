import './style.css';
import { DOMMainPageLoader } from './page-loader';
import { ListFactory, ListItemFactory } from './factories';
import { LocalStorageManager } from './storage-manager';

LocalStorageManager.initLists();
DOMMainPageLoader.load();

const addNewList = () => {
    console.log('new list');
    let list = ListFactory();
    LocalStorageManager.addList(list);
    DOMMainPageLoader.pushNewListCard(list.title).addEventListener('click', openList);
}

const openList = (listTitle) => {
    console.log(listTitle);
}

const listCards = document.querySelectorAll('div.list-card');
const newListCardButton = document.querySelector('div#new-list');

for (let listCard of listCards) {
    listCard.addEventListener('click', openList);
}
newListCardButton.addEventListener('click', addNewList);
