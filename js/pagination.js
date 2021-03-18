import {films} from './film.js';
export let page = 1;
const currentPage = document.getElementById('currentPage');
const buttonTrigger = document.getElementsByClassName('dot')[0];
const dropdownMenu = document.getElementsByClassName('dropdown_menu')[0];
export const usePagination = (event) => {
    const pageCount = event.target.closest('.page_number');
    const drop = event.target.closest('#dropdown_page');
    if (event.target.id === 'arrow_right' && page < 5) {
        page = ++page;
        currentPage.innerText = `Страница ${page}`;
    }
    if(event.target.id === 'arrow_left' && page > 1){
        page = --page;
        currentPage.innerText = `Страница ${page}`;
    }
    if (pageCount) {
        page = event.target.innerText;
        currentPage.innerText = `Страница ${page}`;
    };
    if (drop) {
        buttonTrigger.classList.toggle('dot_click');
        dropdownMenu.classList.toggle('drop');
    };
    films();
};