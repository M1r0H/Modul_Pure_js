const input = document.getElementById('input');
const button = document.getElementById('btn');
const cards = document.getElementById('cards');
const genre = document.getElementById('genre');
const lang = document.getElementById('lang');
const container = document.getElementById('container');
const modal = document.getElementById('myModal');
const close = document.getElementById('close');
const modalImg = document.getElementById('modalImg');
const modalDescr = document.getElementById('modalDescr');
const modalFilmName = document.getElementById('filmName');
const modalFilmGenre = document.getElementById('filmGenre');
const modalFilmRating = document.getElementById('filmRating');
const modalFilmDescr = document.getElementById('description');
const notFoundImg = 'https://cdn2.iconfinder.com/data/icons/mobile-smart-phone/64/broken_phone_fix_problem_error_danger-512.png';

// FILMS

const fn = () => {
    cards.innerHTML = '';
    const promise = fetch(`http://api.tvmaze.com/search/shows?q=${input.value ? input.value : 'cars'}`);
    promise
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(genre.value !== 'Genre' && genre.value !== 'All' || lang.value !== 'Lang') {
                return data.filter(item => item.show.genres.includes(genre.value)).filter(item =>
                    item.show.language.includes(lang.value));
            };
            return data;
        })
        .then((data) => {
            data.forEach((element) => {
                const obj = element.show;
                const divFilm = document.createElement('div');
                const imgBack = document.createElement('div');
                const img = document.createElement('img');
                const description = document.createElement('div');
                const saveFavorite = () => {
                    const savedObj = {
                        name: obj.name,
                        img: obj.image && obj.image.medium ? obj.image.medium : notFoundImg,
                        description: obj.summary,
                        genres: obj.genres,
                        rating: obj.rating.average ? obj.rating.average : 0,
                    }
                    if (obj.image) {
                        localStorage.setItem(obj.name, JSON.stringify(savedObj));
                    } else {
                        savedObj.img = notFoundImg;
                        localStorage.setItem(obj.name, JSON.stringify(savedObj));
                    }
                };
                divFilm.setAttribute('id', 'divFilms')
                imgBack.setAttribute('id', 'back_for_card')
                img.setAttribute('id', 'card');
                if (obj.image) {
                    img.setAttribute('src', obj.image.medium);
                } else {
                    img.setAttribute('src', 'https://cdn2.iconfinder.com/data/icons/' +
                        'mobile-smart-phone/64/broken_phone_fix_problem_error_danger-512.png');
                };
                description.setAttribute('id', 'descr');
                if (obj.summary.length > 150) {
                    description.innerHTML = `${obj.name} ${obj.summary.slice(0, 150)}...`;
                } else {
                    description.innerHTML = `${obj.name} ${obj.summary.slice(0, 150)}`;
                };
                imgBack.onclick = function (e) {
                    if (e.target === imgBack) {
                        img.style.transform = 'rotate3d(50, 50, 50, 360deg)';
                        img.style.transitionDuration = '.8s';
                    };
                };
                cards.appendChild(divFilm);
                divFilm.appendChild(imgBack);
                imgBack.appendChild(img);
                divFilm.appendChild(description);
                imgBack.addEventListener('click', saveFavorite);
            });
        })
};

if (document.location.pathname.includes('Films')) {
    fn();
    button.addEventListener('click', fn);
}

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
        const divFilm = document.createElement('div');
        const img = document.createElement('img');
        divFilm.setAttribute('id', 'divFilms');
        img.setAttribute('id', 'card');
        img.setAttribute('src', element.img);
        container.appendChild(divFilm);
        divFilm.appendChild(img);

        //MODAL
        const modalFn = () => {
            modalImg.innerHTML = '';
            modalFilmName.innerHTML = '';
            modalFilmGenre.innerHTML = '';
            modalFilmRating.innerHTML = '';
            modalFilmDescr.innerHTML = '';
            modal.style.display = 'block';
            const imgModal = img.cloneNode(img);
            modalImg.appendChild(imgModal);
            modalFilmName.append(element.name);
            modalFilmGenre.append(element.genres);
            modalFilmRating.append(`${element.rating}🤩`);
            // modalFilmDescr.innerHTML = element.description;
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
        img.addEventListener('click', modalFn);
        close.addEventListener('click', modalClose);
    });
};
if (document.location.pathname.includes('Favourite')) {
    favorite();
};




