import { createElement } from "./createElement.js";
const container = document.getElementById('container');
const modal = document.getElementById('myModal');
const close = document.getElementById('close');
const modalImg = document.getElementById('modalImg');
const modalFilmName = document.getElementById('filmName');
const modalFilmGenre = document.getElementById('filmGenre');
const modalFilmRating = document.getElementById('filmRating');
const modalFilmDescr = document.getElementById('description');
export const favorite = () => {
    let data = [];
    for (let i = 0; i < localStorage.length; i++) {
        const localKey = localStorage.key(i);
        const localValue = localStorage.getItem(localKey);
        const realData = JSON.parse(localValue);
        data.push(realData);
    };
    data.forEach((element) => {
        const divFilm = createElement('div', 'id', 'divFilms');
        const img = createElement('img', 'id', 'card');
        const like = createElement('a', 'id', 'like');
        const likeImg = createElement('img', 'id', 'imgLike');
        likeImg.setAttribute('src', '../assets/img/1.png');
        img.setAttribute('src', element.img);
        container.appendChild(divFilm);
        divFilm.appendChild(like);
        like.appendChild(likeImg)
        divFilm.appendChild(img);
        const modalFn = () => {
            modalImg.innerHTML = '';
            modalFilmName.innerHTML = '';
            modalFilmGenre.innerHTML = '';
            modalFilmRating.innerHTML = '';
            modalFilmDescr.innerHTML = '';
            likeImg.style.zIndex = '1';
            modal.style.display = 'block';
            const imgModal = img.cloneNode(img);
            modalImg.appendChild(imgModal);
            modalFilmName.append(element.name);
            modalFilmGenre.append(element.genres);
            modalFilmRating.append(`${element.rating}🤩`);
            if (element.description.length > 250) {
                modalFilmDescr.innerHTML = `${element.description.slice(0, 250)}...`;
            } else {
                modalFilmDescr.innerHTML = `${element.description.slice(0, 250)}`;
            };
            const allDescription = () => {
                modalFilmDescr.innerHTML = element.description;
            };
            modalFilmDescr.addEventListener('click', allDescription);
        };
        const modalClose = () => {
            modal.style.display = 'none';
        };
        const closeModal = (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            };
        };
        const deleteFavorite = () => {
            localStorage.removeItem(`${element.name}`);
            location.reload();
        };
        window.addEventListener('click', closeModal);
        img.addEventListener('click', modalFn);
        close.addEventListener('click', modalClose);
        likeImg.addEventListener('click', deleteFavorite);
    });
};