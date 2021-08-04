// import { STORAGE_LISTS_KEY } from "./constants";
import { LocalStorageManager } from './storage-manager';

HTMLElement.prototype.appendChildren = function(elements) {
    for (let i = 0; i < elements.length; ++i) {
        this.appendChild(elements[i]);
    }
}

export const DOMMainPageLoader = (() => {
    const pageContent = document.querySelector('main');

    const load = () => {
        pageContent.appendChildren(_getListElementsArray());
        pageContent.appendChild(_makeAddListButton());   
    }

    const pushNewListCard = (title) => {
        const newList = _makeListCard(title);
        const addListDiv = pageContent.querySelector('div#new-list');
        pageContent.insertBefore(newList, addListDiv);
        return newList;
    }

    const getMainElement = () => {
        return pageContent;
    }

    const deleteListCard = (listId) => {
        pageContent.childNodes[listId].remove();
    }

    const _makeListCard = (title) => {
        const container = document.createElement('div');
        container.classList.add('task-list');
        container.classList.add('list-card');
        container.appendChild(_addTitleContainer(title));
        container.appendChild(_addHorizontalLineSeparator());
        container.appendChild(_addDeleteListSpan());
        return container;
    }

    const _addTitleContainer = (title) => {
        const titleLabel = document.createElement('label')

        const titleInput = document.createElement('input');
        titleInput.value = title;
        titleInput.classList.add('list-title');

        titleLabel.appendChild(titleInput);
        return titleLabel;
    }

    const _addHorizontalLineSeparator = () => {
        const line = document.createElement('div');
        line.classList.add('horizontal-line');
        return line;
    }

    const _addDeleteListSpan = () => {
        const deleteContainer = document.createElement('div');
        deleteContainer.classList.add('delete-list');
        deleteContainer.classList.add('center-content');
        deleteContainer.innerHTML = `<span class="material-icons-outlined font-2em">delete</span>`;
        return deleteContainer;
    }

    const _getListElementsArray = () => {
        const lists = LocalStorageManager.getListsArray();
        let listElements = [];
            for (let i = 0; i < lists.length; ++i) {
            listElements.push(_makeListCard(lists[i].title));
        }
        
        return listElements;
    }

    const _makeAddListButton = () => {
        const buttonConatiner = document.createElement('div');
        buttonConatiner.classList.add('task-list');
        buttonConatiner.classList.add('center-content');
        buttonConatiner.id = 'new-list';
        buttonConatiner.innerHTML = '<span class="material-icons-outlined font-4em">add</span>';
        
        return buttonConatiner;
    }

    return {
        load,
        pushNewListCard,
        getMainElement,
        deleteListCard,
    }
})();

export const DOMTaskListLoader = (() => {
    const NEW_TASK_ID = 'new-task';
    const pageContent = document.querySelector('main');
    const taskUnorderedList = document.querySelector('ul#task-list');

    const load = (taskList) => {
        pageContent.appendChild(_makeAddTaskButtom());
        taskUnorderedList.appendChildren(_makeTaskElementsArray(taskList));
    }

    const addTask = (taskId) => {
        // const newTaskButton = document.querySelector(`div#${NEW_TASK_ID}`);
        // pageContent.insertBefore(_makeEmptyTaskElement(taskId), newTaskButton);
        taskUnorderedList.appendChild(_makeEmptyTaskElement(taskId));
    }

    const renderTaskList = (taskList) => {
        let taskElements = _getTaskElementsArray();
        for (let i = 0; i < taskElements.length; ++i) {
            if (taskElements[i].id === NEW_TASK_ID) continue;

            const elementId = parseInt(taskElements[i].id);
            const order = taskList.findIndex(task => task.id === elementId);
            taskElements[i].style.order = order;
        }
    }

    const _makeTaskElementsArray = (taskList) => {
        let taskElementsArray = [];
        for (let i = 0; i < taskList.length; ++i) {
            const taskElement = _makeFilledTaskElement(taskList[i]);
            taskElementsArray.push(taskElement);
        }
        return taskElementsArray;
    }

    const _getTaskElementsArray = () => {
        return taskUnorderedList.childNodes;
    }

    const _makeFilledTaskElement = (taskObject) => {
        const taskElementContainer = _makeEmptyTaskElement(taskObject.id);
        taskElementContainer.querySelector('.task-info label input.checkbox').checked = taskObject.done;
        taskElementContainer.querySelector('.task-info label.title-input input').value = taskObject.title;
        taskElementContainer.querySelector('.task-info div.date-display').textContent = taskObject.dueDate;
        // title, date, etc.
        return taskElementContainer;
    }

    const _makeEmptyTaskElement = (taskId) => {
        const taskElementContainer = document.createElement('div');   
        taskElementContainer.classList.add('task-container');
        taskElementContainer.id = taskId;
        taskElementContainer.appendChild(_makeTaskShortInfo());
        return taskElementContainer;
    }

    const _makeTaskShortInfo = () => {
        const shortInfoContainer = document.createElement('div');
        shortInfoContainer.classList.add('task-info');
        // append children: checkbox, title input, dateDiv, burgerButton
        shortInfoContainer.appendChild(_makeCheckbox());
        shortInfoContainer.appendChild(_makeTitleInput());
        shortInfoContainer.appendChild(_makeDateDisplay());
        shortInfoContainer.appendChild(_makeDetailsButton());
        return shortInfoContainer;
    }

    const _makeCheckbox = () => {
        const checkboxWrapper = document.createElement('label');
        checkboxWrapper.classList.add('checkbox-container');

        const checkbox = document.createElement('input');
        checkbox.classList.add('checkbox');
        checkbox.type = 'checkbox';

        const checkmark = document.createElement('span');
        checkmark.classList.add('checkmark');

        checkboxWrapper.appendChild(checkbox);
        checkboxWrapper.appendChild(checkmark);

        return checkboxWrapper;
    }

    const _makeTitleInput = () => {
        const titleWrapper = document.createElement('label');
        titleWrapper.classList.add('title-input');

        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        
        titleWrapper.appendChild(titleInput);

        return titleWrapper;
    }

    const _makeDateDisplay = () => {
        const dateDisplay = document.createElement('div');
        dateDisplay.classList.add('date-display');
        dateDisplay.textContent = '';
        return dateDisplay;
    }

    const _makeDetailsButton = () => {
        const button = document.createElement('button');
        button.classList.add('details-button');
        button.innerHTML = '<span class="material-icons-outlined">menu</span>';
        return button;
    }

    const _makeAddTaskButtom = () => {
        const newTaskContainer = document.createElement('div');
        newTaskContainer.id = NEW_TASK_ID;
        newTaskContainer.innerHTML = '<span class="material-icons-outlined font-2em">add</span>';
        return newTaskContainer;
    }

    const getElementTitle = (element) => {
        return element.value;
    }

    return {
        load,
        addTask,
        renderTaskList,
        getElementTitle,
    }
})();