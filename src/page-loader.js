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

    const _makeListCard = (title) => {
        const container = document.createElement('div');
        container.classList.add('task-list');
        container.classList.add('list-card');
        container.appendChild(_addTitleSpan(title));
        container.appendChild(_addHorizontalLineSeparator());
        return container;
    }

    const _addTitleSpan = (title) => {
        const titleSpan = document.createElement('span')
        titleSpan.classList.add('list-title');
        titleSpan.textContent = title;
        return titleSpan;
    }

    const _addHorizontalLineSeparator = () => {
        const line = document.createElement('div');
        line.classList.add('horizontal-line');
        return line;
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
    }
})();

export const DOMTaskListLoader = (() => {
    const pageContent = document.querySelector('main');

    const addTask = () => {
        const newTaskButton = document.querySelector('div#new-task');
        pageContent.insertBefore(_makeEmptyTaskElement(), newTaskButton);
    }

    const renderTaskList = (taskList) => {
        // const addTaskButton = pageContent.querySelector('div#new-task');
        pageContent.innerHTML = ''; // remove children
        for (let i = 0; i < taskList.length; ++i) {
            const element = _renderFilledTaskListElement(taskList[i]);
            // pageContent.insertBefore(element, addTaskButton);
            pageContent.appendChild(element);
        }
        pageContent.appendChild(_makeAddTaskButtom());
    }

    const _renderFilledTaskListElement = (taskObject) => {
        const taskElement = _makeEmptyTaskElement();
        taskElement.querySelector('.task-container .task-info .title-input input').value = taskObject.title;
        taskElement.querySelector('.task-container .task-info .checkbox-container input').checked = taskObject.done;
        taskElement.querySelector('.task-container .task-info .date-display').textContent = taskObject.dueDate;

        // set proper values for every element
        return taskElement;
    }

    const _makeEmptyTaskElement = () => {
        const taskElementContainer = document.createElement('div');   
        taskElementContainer.classList.add('task-container');
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
        newTaskContainer.id = 'new-task';
        newTaskContainer.innerHTML = '<span class="material-icons-outlined font-2em">add</span>';
        return newTaskContainer;
    }

    return {
        addTask,
        renderTaskList,
    }
})();