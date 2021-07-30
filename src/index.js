import './style.css';
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



const listPrototype = {
    listCounter: 0,
    setListTitle (title) {
        this.title = title;
    },
    incrementListCounter () { 
        listPrototype.listCounter++; 
    }
}

const ListFactory = () => {
    let object = Object.create(listPrototype);
    object.title = `List ${object.listCounter}`;
    object.storageListKey = `key${object.listCounter}`;
    listPrototype.incrementListCounter();
    return object;
}

let list = ListFactory();
let list2 = ListFactory();

console.log(list);
console.log(list2);

list.setListTitle('patointeligencja');
console.log(list);
console.log(list2);
