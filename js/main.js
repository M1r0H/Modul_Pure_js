import { films } from './film.js';
import { quantity } from "./constants.js";
import { usePagination } from "./pagination.js";
import { hideFilter } from "./filter.js";
import { favorite } from "./favorite.js";
import { input } from "./constants.js";
const button = document.getElementById('btn');
const pagination = document.getElementById('pagination');
const search = document.getElementById('search');
const scroll = document.getElementById('scroll_top');
if (document.location.pathname.includes('Films')) {
    films();
    const btnScroll = () => {
        if (window.pageYOffset > '700') {
            scroll.style.display = 'block';
        } else {
            scroll.style.display = 'none';
        };
    };
    window.addEventListener('onscroll', btnScroll)
    search.addEventListener('click', hideFilter);
    quantity.addEventListener('change', films);
    pagination.addEventListener('click', usePagination);
    button.addEventListener('click', films);
    input.addEventListener('keydown', function(e) {
        if (e.keyCode === 13) {
            films()
        };
    });
};
if (document.location.pathname.includes('Favourite')) {
    favorite();
};