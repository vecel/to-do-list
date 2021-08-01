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

    return {
        initLists,
        addList,
        getListsArray,
        getCreatedListsNumber,
        incrementCreatedListsNumber,
    }
})();