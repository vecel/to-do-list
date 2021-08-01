import { URL_ID_PARAMETER_NAME } from './constants';

console.log('list id: ' + getListIdFromUrl());

function getListIdFromUrl() {
    const queryString = window.location.search;
    const urlParameters = new URLSearchParams(queryString);
    const listId = urlParameters.get(URL_ID_PARAMETER_NAME);
    return listId;
}