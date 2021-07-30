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

export {
    ListFactory,
}