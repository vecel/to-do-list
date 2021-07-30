import './style.css';
import { DOMMainPageLoader } from './page-loader';
import { ListFactory } from './factories';

DOMMainPageLoader.load();

const addNewList = () => {
    console.log('new list');
}

const openList = (listTitle) => {
    console.log(listTitle);
}

const listCards = document.querySelectorAll('div.list-card');
const newListCardButton = document.querySelector('div#new-list');
// console.log(newListCardButton);

for (let listCard of listCards) {
    listCard.addEventListener('click', openList);
}
newListCardButton.addEventListener('click', addNewList);

let list1 = ListFactory();
let list2 = ListFactory();

// set lists under 'lists' key in local storage, if you change key name, change it in page-loader.js file, second argument is stringified array of list objects
localStorage.setItem('lists', JSON.stringify([list1, list2]));



