import { LocalStorageManager } from "./storage-manager";

const listPrototype = {
    setTitle (title) {
        this.title = title;
    },
}

const ListFactory = () => {
    let object = Object.create(listPrototype);
    object.title = `To Do List`;
    object.storageTaskListKey = `key${LocalStorageManager.getCreatedListsNumber()}`;

    LocalStorageManager.incrementCreatedListsNumber();

    return object;
}

const listItemPrototype = {
    setTitle (title) {
        this.title = title;
    },
    toggleDoneStatus () {
        this.done = !this.done;
    },
    setPriority (priority) {
        this.priority = priority;
    },
    setDueDate (date) {
        this.date = date;
    },
}

const ListItemFactory = (listKey) => {
    let object = Object.create(listItemPrototype);
    object.id = LocalStorageManager.getCreatedTaskNumber(listKey);
    object.title = '';
    object.done = false;
    object.priority = 0;
    object.dueDate = null;
    return object;
}

export {
    ListFactory,
    ListItemFactory,
    listItemPrototype,
}