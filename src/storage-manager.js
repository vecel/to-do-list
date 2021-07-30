import { STORAGE_LISTS_KEY } from "./constants"

export const LocalStorageManager = (() => {
    const initLists = () => {
        const listsArray = JSON.parse(localStorage.getItem(STORAGE_LISTS_KEY));
        if (listsArray === null) localStorage.setItem(STORAGE_LISTS_KEY, JSON.stringify([]));
    }

    const addList = (newList) => {
        let lists = JSON.parse(localStorage.getItem(STORAGE_LISTS_KEY));
        lists.push(newList);
        localStorage.setItem(STORAGE_LISTS_KEY, JSON.stringify(lists));
        console.log(lists);
    }

    const getListsArray = () => {
        return JSON.parse(localStorage.getItem(STORAGE_LISTS_KEY));
    }
    

    return {
        initLists,
        addList,
        getListsArray,
    }
})();