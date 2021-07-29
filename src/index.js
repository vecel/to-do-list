import { DOMMainPageLoader } from './page-loader';

// test objects
let testList = {
    title: 'abc',
}
let testList2 = {
    title: 'test title',
}

// set lists under 'lists' key in local storage, if you change key name, change it in page-loader.js file, second argument is stringified array of list objects
localStorage.setItem('lists', JSON.stringify([testList, testList2]));

DOMMainPageLoader.load();
