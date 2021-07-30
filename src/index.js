import './style.css';
import { DOMMainPageLoader } from './page-loader';
import { ListFactory, ListItemFactory } from './factories';
import { STORAGE_LISTS_KEY } from './constants';

DOMMainPageLoader.load();

let listsArray = [];

const addNewList = () => {
    console.log('new list');
    let list = ListFactory();
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

// let list1 = ListFactory();
// let list2 = ListFactory();

// set lists under 'lists' key in local storage, if you change key name, change it in page-loader.js file, second argument is stringified array of list objects
// localStorage.setItem(STORAGE_LISTS_KEY, JSON.stringify([]));



function updateListsInStorage() {
    localStorage.setItem(STORAGE_LISTS_KEY, JSON.stringify(listsArray));
}