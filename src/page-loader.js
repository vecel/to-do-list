export const DOMMainPageLoader = (() => {
    const pageContent = document.querySelector('main');

    const _makeAddListButton = () => {
        const buttonConatiner = document.createElement('div');
        buttonConatiner.classList.add('add-new');
        buttonConatiner.classList.add('center-content');
        buttonConatiner.id = 'new-list';
        buttonConatiner.textContent = 'Add new list';
        return buttonConatiner;
    }

    const load = () => {
        console.log('loading here');
        pageContent.appendChild(_makeAddListButton());
    }

    return {
        load,
    }
})();