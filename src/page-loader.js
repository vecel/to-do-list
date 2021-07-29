HTMLElement.prototype.appendChildren = function(elements) {
    for (let i = 0; i < elements.length; ++i) {
        this.appendChild(elements[i]);
    }
}

export const DOMMainPageLoader = (() => {
    const pageContent = document.querySelector('main');

    const _makeListButton = (title) => {
        const container = document.createElement('div');
        container.classList.add('list-selection');
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

    const _getListsFromLocalStorage = () => JSON.parse(localStorage.getItem('lists'));

    const _getListElementsArray = () => {
        const lists = _getListsFromLocalStorage();
        let listElements = [];
        for (let i = 0; i < lists.length; ++i) {
            listElements.push(_makeListButton(lists[i].title));
        }
        return listElements;
    }

    const _makeAddListButton = () => {
        const buttonConatiner = document.createElement('div');
        buttonConatiner.classList.add('list-selection');
        buttonConatiner.classList.add('center-content');
        buttonConatiner.id = 'new-list';
        buttonConatiner.innerHTML = '<span class="material-icons-outlined font-4em">add</span>'
        
        return buttonConatiner;
    }

    const load = () => {
        console.log('loading here');
        console.log(_getListsFromLocalStorage());
        pageContent.appendChildren(_getListElementsArray());
        pageContent.appendChild(_makeAddListButton());
        
    }

    return {
        load,
    }
})();