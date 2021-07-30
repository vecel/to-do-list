import './style.css';
import { DOMMainPageLoader } from './page-loader';
import { ListFactory, ListItemFactory } from './factories';
import { STORAGE_LISTS_KEY } from './constants';

initLocalStorageLists();
DOMMainPageLoader.load();
// let listsArray = [];

const addNewList = () => {
    console.log('new list');
    let list = ListFactory();
    addListToStorage(list);
    DOMMainPageLoader.pushNewListCard(list.title);
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



function initLocalStorageLists() {
    const listsArray = JSON.parse(localStorage.getItem(STORAGE_LISTS_KEY));
    if (listsArray === null)
        localStorage.setItem(STORAGE_LISTS_KEY, JSON.stringify([]));
}

function addListToStorage(newList) {
    let lists = JSON.parse(localStorage.getItem(STORAGE_LISTS_KEY));
    // if (lists === null) lists = [];
    console.log(lists);
    lists.push(newList);
    localStorage.setItem(STORAGE_LISTS_KEY, JSON.stringify(lists));
}