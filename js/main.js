import { films } from './film.js';
import { quantity } from "./constants.js";
import { usePagination } from "./pagination.js";
import { hideFilter } from "./filter.js";
import { favorite } from "./favorite.js";
const button = document.getElementById('btn');
const pagination = document.getElementById('pagination');
const search = document.getElementById('search');
const scroll = document.getElementById('scroll_top');
if (document.location.pathname.includes('Films')) {
    films();
    window.onscroll = function () {
        if (window.pageYOffset > '700') {
            scroll.style.display = 'block';
        } else {
            scroll.style.display = 'none';
        };
    };
    search.addEventListener('click', hideFilter);
    quantity.addEventListener('change', films);
    pagination.addEventListener('click', usePagination);
    button.addEventListener('click', films);
}
if (document.location.pathname.includes('Favourite')) {
    favorite();
};




