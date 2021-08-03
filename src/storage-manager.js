import { STORAGE_LISTS_KEY } from "./constants"

const CREATED_LISTS_NUMBER_KEY = 'createdListsNumber';
const CREATED_TASKS_NUMBER_KEY = 'createdTasks';

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
        // console.log('storage manager ', lists);
        lists.push(newList);
        localStorage.setItem(STORAGE_LISTS_KEY, JSON.stringify(lists));
    }

    const getListsArray = () => {
        return JSON.parse(localStorage.getItem(STORAGE_LISTS_KEY));
    }

    const setListsArray = (lists) => {
        localStorage.setItem(STORAGE_LISTS_KEY, JSON.stringify(lists));
    }

    const getCreatedListsNumber = () => {
        return JSON.parse(localStorage.getItem(CREATED_LISTS_NUMBER_KEY));
    }
    
    const incrementCreatedListsNumber = () => {
        let listsNumber = getCreatedListsNumber();
        localStorage.setItem(CREATED_LISTS_NUMBER_KEY, JSON.stringify(listsNumber + 1));
    }

    // const updateList = (list) => {
    //     localStorage.setItem(STORAGE_LISTS_KEY, JSON.stringify(list));
    // }

    const initTaskList = (listKey) => {
        localStorage.setItem(listKey, JSON.stringify([]));
        localStorage.setItem(CREATED_TASKS_NUMBER_KEY + listKey, JSON.stringify(0));
    }

    const getCreatedTaskNumber = (listKey) => {
        return JSON.parse(localStorage.getItem(CREATED_TASKS_NUMBER_KEY + listKey));
    }

    const incrementCreatedTaskNumber = (listKey) => {
        let createdTaskNumber = JSON.parse(localStorage.getItem(CREATED_TASKS_NUMBER_KEY + listKey));
        createdTaskNumber++;
        localStorage.setItem(CREATED_TASKS_NUMBER_KEY + listKey, JSON.stringify(createdTaskNumber));
    }

    const getTaskListByKey = (listKey) => {
        return JSON.parse(localStorage.getItem(listKey));
    }

    const getTaskListByListId = (listId) => {
        const listKey = getTaskListKey(listId);
        return JSON.parse(localStorage.getItem(listKey));
    }

    const addTask = (listKey, taskItem) => {
        let taskArray = JSON.parse(localStorage.getItem(listKey));
        taskArray.push(taskItem);
        localStorage.setItem(listKey, JSON.stringify(taskArray));
        console.log(taskArray);
    }

    const updateTaskList = (listKey, taskList) => {
        localStorage.setItem(listKey, JSON.stringify(taskList));
    }

    const getTaskListKey = (listId) => {
        const listArray = getListsArray();
        const list = listArray[listId];
        return list.storageTaskListKey;
    }

    return {
        initLists,
        addList,
        getListsArray,
        getCreatedListsNumber,
        setListsArray,
        incrementCreatedListsNumber,
        initTaskList,
        getCreatedTaskNumber,
        incrementCreatedTaskNumber,
        getTaskListByKey,
        getTaskListByListId,
        addTask,
        getTaskListKey,
        updateTaskList,
    }
})();