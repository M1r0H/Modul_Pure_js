const genre = document.getElementById('genre');
const lang = document.getElementById('lang');
const filterHide = document.getElementById('filter');

export const hideFilter = (event) => {
    const filterDrop = event.target.closest('#input');
    if (filterDrop) {
        filterHide.style.display = 'flex';
    } else {
        filterHide.style.display = 'none';
    };
    document.body.onclick = function(e) {
        if (e.target.id !== 'input' && e.target.id !== 'genre' && e.target.id !== 'lang') {
            filterHide.style.display = 'none';
        };
    };
};

export const filter = (data) => {
    if (genre.value !== 'All') {
        const filterGenre = data.filter(item => item.show.genres.includes(genre.value));
        if (lang.value !== 'All') {
            return filterGenre.filter(item => item.show.language.includes(lang.value));
        };
        return filterGenre;
    } else {
        data.filter(item => item.show.language.toLowerCase().includes(lang.value));
    };
    return data;
};