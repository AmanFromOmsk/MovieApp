const API_KEY  = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="

getMovies(API_URL_POPULAR);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,

        },
    });
    const respData = await resp.json();
    showMovies(respData);
}

function getClassByRate(vote) {
    if (vote >= 7) {
        return "green"
    } else if (vote > 5) {
        return "orange"
    } else {
        return "red"
    }
}

function showMovies(data) {
    const cardsEl = document.querySelector('.cards')

    //очищаем предыдущий запрос по поиску
    document.querySelector('.cards').innerHTML = '';

    data.films.forEach(card => {
        const cardEl = document.createElement('div')
        cardEl.classList.add('card')
        cardEl.innerHTML = `
            <div class="card_cover-inner">
                <img class="card-img" src="${card.posterUrlPreview}" alt="${card.nameRu}">
                <div class="card--darkened"></div>
            </div>
            <div class="card-info">
                <div class="card-info__title">${card.nameRu}</div>
                <div class="card-info__category">
                    ${card.genres.map((genre) => ` ${genre.genre}`)}
                </div>
                <div class="card-info__average card-info__average--${getClassByRate(card.rating)}">${card.rating}</div>
            </div>
        `;
        cardsEl.appendChild(cardEl)
    })
}

const form = document.querySelector('form');
const search = document.querySelector('.header__search')

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
    if(search.value) {
        getMovies(apiSearchUrl)
    }
})