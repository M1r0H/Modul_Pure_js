import {promise} from "./fetchData.js";
import {input} from "./constants.js";
import {quantity} from "./constants.js";
import {filter} from "./filter.js";
import {createElement} from "./createElement.js";

const notFound = document.getElementById('not_found');
const cards = document.getElementById('cards');
const notFoundImg = 'https://cdn2.iconfinder.com/data/icons/mobile-smart-phone/64/broken_phone_fix_problem_error_danger-512.png';


export const films = () => {
    promise()
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.length === 0) {
                notFound.style.display = 'block';
            }
            if (input.value) {
                return filter(data);
            };
            return data
        })
        .then((data) => {
            if (quantity.value === '5'){
                return data.slice(0, 5);
            };
            return data.slice(0, 10);
        })
        .then((data) => {
            if (input.value) {
                let newData = [];
                for (const element of data) {
                    newData.push(element.show);
                }
                return newData
            }
            return data
        })
        .then((data) => {
            cards.innerHTML = '';
            data.forEach((element) => {
                const divFilm = createElement('div', 'id', 'divFilms');
                const imgBack = createElement('div', 'id', 'back_for_card');
                const img = createElement('img', 'id', 'card');
                const like = createElement('a', 'id', 'like');
                const description = createElement('div', 'id', 'descr');
                const likeImg = createElement('img', 'id', 'imgLike');
                likeImg.setAttribute('src', '../assets/img/1.png');
                const saveFavorite = () => {
                    const savedObj = {
                        name: element.name,
                        img: element.image && element.image.medium ? element.image.medium : notFoundImg,
                        description: element.summary,
                        genres: element.genres,
                        rating: element.rating.average ? element.rating.average : 0,
                    }
                    if (element.image) {
                        localStorage.setItem(element.name, JSON.stringify(savedObj));
                    } else {
                        savedObj.img = notFoundImg;
                        localStorage.setItem(element.name, JSON.stringify(savedObj));
                    }
                    divFilm.style.backgroundColor = 'rgba(24, 24, 24, 0.2)'
                };
                if (localStorage.getItem(element.name)) {
                    divFilm.style.backgroundColor = 'rgba(24, 24, 24, 0.2)'
                };
                if (element.image) {
                    img.setAttribute('src', element.image.medium);
                } else {
                    img.setAttribute('src', 'https://cdn2.iconfinder.com/data/icons/' +
                        'mobile-smart-phone/64/broken_phone_fix_problem_error_danger-512.png');
                }
                ;
                if (element.summary.length > 150) {
                    description.innerHTML = `${element.name} ${element.summary.slice(0, 150)}...`;
                } else {
                    description.innerHTML = `${element.name} ${element.summary}`;
                }
                ;
                likeImg.onclick = function (e) {
                    if (e.target === likeImg) {
                        img.style.transform = 'scale(.95)';
                        setTimeout(function () {
                            img.style.transform = 'scale(1)'
                        }, 250);
                    }
                    ;
                };
                cards.appendChild(divFilm);
                divFilm.appendChild(imgBack);
                imgBack.appendChild(img);
                imgBack.appendChild(like);
                like.appendChild(likeImg)
                divFilm.appendChild(description);
                likeImg.addEventListener('click', saveFavorite);
            });
        });
}