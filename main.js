const input = document.getElementById('input');
const button = document.getElementById('btn');
const cards = document.getElementById('cards');
const genre = document.getElementById('genre');
const lang = document.getElementById('lang');
const container = document.getElementById('container');
const modal = document.getElementById('myModal');
const close = document.getElementById('close');
const modalImg = document.getElementById('modalImg');
const modalFilmName = document.getElementById('filmName');
const modalFilmGenre = document.getElementById('filmGenre');
const modalFilmRating = document.getElementById('filmRating');
const modalFilmDescr = document.getElementById('description');
const notFoundImg = 'https://cdn2.iconfinder.com/data/icons/mobile-smart-phone/64/broken_phone_fix_problem_error_danger-512.png';
const buttonTrigger = document.getElementsByClassName('dot')[0];
const dropdownMenu = document.getElementsByClassName('dropdown_menu')[0];
const pagination = document.getElementById('pagination');
const currentPage = document.getElementById('currentPage');
const quantity = document.getElementById('quantity');
const notFound = document.getElementById('not_found');
const filter = document.getElementById('filter');
const search = document.getElementById('search');
const scroll = document.getElementById('scroll_top')
// FILMS
let page = 1;
const trigger = () => {
    buttonTrigger.classList.toggle('dot_click');
    dropdownMenu.classList.toggle('drop');
}
const usePagination = (event) => {
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
        trigger();
    };
    films();
};
const createElement = (element, type, typeName) => {
    const name = document.createElement(element);
    name.setAttribute(type, typeName);
    return name;
};
const hideFilter = (event) => {
    const filterDrop = event.target.closest('#input');
    if (filterDrop) {
        filter.style.display = 'flex';
    } else {
        filter.style.display = 'none';
    }
    document.body.onclick = function (e) {
        if (e.target.id !== 'input')
            filter.style.display = 'none';
    }
}
window.onscroll = function() {
    if (window.pageYOffset > '700') {
        scroll.style.display = 'block'
    } else {
        scroll.style.display = 'none'
    };
};
const films = () => {
    const promise = () => {
        if (!input.value) {
            return fetch(`http://api.tvmaze.com/shows?page=${page}`);
        }
        return fetch(`http://api.tvmaze.com/search/shows?q=${input.value}`);
    }
    const filter = (data) => {
        if (genre.value !== 'All') {
            const filterGenre = data.filter(item => item.show.genres.includes(genre.value));
            if (lang.value !== 'All') {
                return filterGenre.filter(item => item.show.language.includes(lang.value.toLowerCase()));
            };
            return filterGenre;
        } else {
            data.filter(item => item.show.language.toLowerCase().includes(lang.value));
        };
        return data;
    };
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
if (document.location.pathname.includes('Films')) {
    films();
    search.addEventListener('click', hideFilter)
    quantity.addEventListener('change', films)
    pagination.addEventListener('click', usePagination);
    button.addEventListener('click', films);
}

// hide stick menu

//FAVOURITE

const favorite = () => {
    let data = [];
    for (let i=0; i < localStorage.length; i++) {
        const localKey = localStorage.key(i);
        const localValue = localStorage.getItem(localKey);
        const realData = JSON.parse(localValue);
        data.push(realData);
    }

    data.forEach((element) => {
        const divFilm = createElement('div', 'id', 'divFilms');
        const img = createElement('img', 'id', 'card');
        const like = createElement('a', 'id', 'like');
        const likeImg = createElement('img', 'id', 'imgLike')
        likeImg.setAttribute('src', '../assets/img/1.png')
        img.setAttribute('src', element.img);
        container.appendChild(divFilm);
        divFilm.appendChild(like);
        like.appendChild(likeImg)
        divFilm.appendChild(img);

        //MODAL
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
        window.onclick = function (e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        }
        const deleteFavorite = () => {
            localStorage.removeItem(`${element.name}`);
            location.reload();
        }
        img.addEventListener('click', modalFn);
        close.addEventListener('click', modalClose);
        likeImg.addEventListener('click', deleteFavorite)
    });
};
if (document.location.pathname.includes('Favourite')) {
    favorite();
};




