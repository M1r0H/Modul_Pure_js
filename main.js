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
const like = document.createElement('button');
like.setAttribute('id', 'like');

// FILMS

const films = () => {
    cards.innerHTML = '';
    const promise = fetch(`http://api.tvmaze.com/shows?page=1`);
    promise
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // if(input.value) {
            //     return data.filter(item => item.name.includes(input.value));
            // }
            // if (genre.value !== 'Genre' && genre.value !== 'All') {
            //     return data.filter(item => item.genres.includes(genre.value));
            // };
            // if (lang.value !== 'Lang') {
            //     return data.filter(item => item.language.includes(lang.value));
            // };
            // return data
        })
        .then((data) => {
            const sliceData = data.slice(0, 10);
            sliceData.forEach((element) => {
                const divFilm = document.createElement('div');
                const imgBack = document.createElement('div');
                const img = document.createElement('img');
                const like = document.createElement('button');
                const description = document.createElement('div');
                like.setAttribute('id', 'like');
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
                };
                divFilm.setAttribute('id', 'divFilms')
                imgBack.setAttribute('id', 'back_for_card')
                img.setAttribute('id', 'card');
                if (element.image) {
                    img.setAttribute('src', element.image.medium);
                } else {
                    img.setAttribute('src', 'https://cdn2.iconfinder.com/data/icons/' +
                        'mobile-smart-phone/64/broken_phone_fix_problem_error_danger-512.png');
                };
                description.setAttribute('id', 'descr');
                if (element.summary.length > 150) {
                    description.innerHTML = `${element.name} ${element.summary.slice(0, 150)}...`;
                } else {
                    description.innerHTML = `${element.name} ${element.summary.slice(0, 150)}`;
                };
                like.onclick = function (e) {
                    if (e.target === like) {
                        img.style.transform = 'scale(.95)';
                        setTimeout(function () {img.style.transform = 'scale(1)'}, 250)
                    };
                };
                cards.appendChild(divFilm);
                divFilm.appendChild(imgBack);
                imgBack.appendChild(img);
                divFilm.appendChild(like);
                divFilm.appendChild(description);
                like.addEventListener('click', saveFavorite);
            });
        })
};

if (document.location.pathname.includes('Films')) {
    films();
    button.addEventListener('click', films);
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
        console.log(element)
        const like = document.createElement('button');
        const divFilm = document.createElement('div');
        const img = document.createElement('img');
        divFilm.setAttribute('id', 'divFilms');
        like.setAttribute('id', 'like');
        img.setAttribute('id', 'card');
        img.setAttribute('src', element.img);
        container.appendChild(divFilm);
        divFilm.appendChild(like);
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
        const deleteFavorite = () => {
            localStorage.removeItem(`${element.name}`);
            location.reload();
        }
        img.addEventListener('click', modalFn);
        close.addEventListener('click', modalClose);
        like.addEventListener('click', deleteFavorite)
    });
};
if (document.location.pathname.includes('Favourite')) {
    favorite();
};




