const listPrototype = {
    listCounter: 0,
    setTitle (title) {
        this.title = title;
    },
    incrementListCounter () { 
        listPrototype.listCounter++; 
    },
}

const ListFactory = () => {
    let object = Object.create(listPrototype);
    object.title = `List ${object.listCounter}`;
    object.storageListKey = `key${object.listCounter}`;
    object.tasks = [];

    listPrototype.incrementListCounter();

    return object;
}

const listItemPrototype = {
    setTitle (title) {
        this.title = title;
    },
    setPriority (priority) {
        this.priority = priority;
    },
    setDueDate (date) {
        this.date = date;
    },
}

const ListItemFactory = () => {
    let object = Object.create(listItemPrototype);
    object.title = '';
    object.done = false;
    object.priority = 0;
    object.dueDate = null;
    return object;
}

export {
    ListFactory,
    ListItemFactory,
}