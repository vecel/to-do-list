import { STORAGE_LISTS_KEY } from "./constants"

const CREATED_LISTS_NUMBER_KEY = 'createdListsNumber';

export const LocalStorageManager = (() => {
    const initLists = () => {
        const listsArray = JSON.parse(localStorage.getItem(STORAGE_LISTS_KEY));
        if (listsArray === null) {
            localStorage.setItem(STORAGE_LISTS_KEY, JSON.stringify([]));
        }
        const createdListsNumber = JSON.parse(localStorage.getItem(CREATED_LISTS_NUMBER_KEY));
        if (createdListsNumber === null) {
            localStorage.setItem(CREATED_LISTS_NUMBER_KEY, JSON.stringify(0));
        }
    }

    const addList = (newList) => {
        let lists = JSON.parse(localStorage.getItem(STORAGE_LISTS_KEY));
        lists.push(newList);
        localStorage.setItem(STORAGE_LISTS_KEY, JSON.stringify(lists));
    }

    const getListsArray = () => {
        return JSON.parse(localStorage.getItem(STORAGE_LISTS_KEY));
    }

    const getCreatedListsNumber = () => {
        return JSON.parse(localStorage.getItem(CREATED_LISTS_NUMBER_KEY));
    }
    
    const incrementCreatedListsNumber = () => {
        let listsNumber = getCreatedListsNumber();
        localStorage.setItem(CREATED_LISTS_NUMBER_KEY, JSON.stringify(listsNumber + 1));
    }

    const initTaskList = (listKey) => {
        localStorage.setItem(listKey, JSON.stringify([]));
    }

    const getTaskListByKey = (listKey) => {
        return JSON.parse(localStorage.getItem(listKey));
    }

    const getTaskListByListId = (listId) => {
        const listArray = getListsArray();
        const list = listArray[listId];
        const taskListKey = list.storageTaskListKey;
        return JSON.parse(localStorage.getItem(taskListKey));
    }

    return {
        initLists,
        addList,
        getListsArray,
        getCreatedListsNumber,
        incrementCreatedListsNumber,
        initTaskList,
        getTaskListByKey,
        getTaskListByListId,
    }
})();