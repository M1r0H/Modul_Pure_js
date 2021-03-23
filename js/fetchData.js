import { input } from "./constants.js";
import { page } from "./pagination.js";

const pagination = document.getElementById('pagination');
const currentPage = document.getElementById('currentPage');

export const promise = () => {
    if (!input.value) {
        currentPage.style.display = 'block';
        pagination.style.display = 'flex';
        return fetch(`http://api.tvmaze.com/shows?page=${page}`);
    };
    currentPage.style.display = 'none';
    pagination.style.display = 'none';
    return fetch(`http://api.tvmaze.com/search/shows?q=${input.value}`);
};