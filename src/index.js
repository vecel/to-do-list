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


// console.log(testList);

// const listPrototype = {
//     listCounter: 0,
//     setListTitle: (title) => {
//         this.title = title;
//     }
// };

// const ListFactory = function() {
//     return Object.assign({}, Object.create(listPrototype), {
//         title: `List ${listCounter}`,
//         storageListKey: `key${listCounter}`
//     })
// }

// console.log(ListFactory());

// let list = ListFactory();

// console.log(list);

// ListFactory.prototype.listCounter = 0;

// ListFactory.prototype.setListTitle = (title) => {
//     this.title = title;
// }

const listPrototype = {
    listCounter: 0,
    setListTitle: (title) => {
        this.title = title;
    }
}

const ListFactory = () => {
    let object = Object.create(listPrototype);
    object.title = `List ${object.listCounter}`;
    object.storageListKey = `key${object.listCounter}`;
    // increment listCounter
    // make setListTitle working
    return object;
    // return Object.assign({}, object, {
    //     title: `List ${object.listCounter}`,
    //     storageListKey: `key${object.listCounter}`
    // })
}

console.log(ListFactory());
let list = ListFactory();
let list2 = ListFactory();

console.log(list);
console.log(list2);

list.setListTitle('patointeligencja');
console.log(list);
console.log(list2);
