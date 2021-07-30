import './style.css';
import { DOMMainPageLoader } from './page-loader';
import { ListFactory } from './factories';

let list1 = ListFactory();
let list2 = ListFactory();

// set lists under 'lists' key in local storage, if you change key name, change it in page-loader.js file, second argument is stringified array of list objects
localStorage.setItem('lists', JSON.stringify([list1, list2]));

DOMMainPageLoader.load();


