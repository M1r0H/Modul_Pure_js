import {input} from "./constants.js";
import {page} from "./pagination.js";

export const promise = () => {
    if (!input.value) {
        return fetch(`http://api.tvmaze.com/shows?page=${page}`);
    }
    return fetch(`http://api.tvmaze.com/search/shows?q=${input.value}`);
}