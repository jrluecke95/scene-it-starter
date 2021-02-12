


$(document).ready(function () {
    const $movieList = localStorage.getItem('watchlist')
    let watchlist = JSON.parse($movieList);
    console.log($movieList)
    const $movieContainer = $('.movies-container')
    function renderMovies(movieArray) {
        const $movieHTMLArray = movieArray.map(currentMovie => {
            return `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 mt-3">
            <div class="card w-100">
                <img src="${currentMovie.Poster}" class="card-img-top w-100" alt="${currentMovie.Title}">
                <div class="card-body">
                    <h5 class="card-title">${currentMovie.Title}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                        the card's content.</p>
                    <a href="#" onclick="saveToWatchList('${currentMovie.imdbID}')" class="btn btn-primary">Add Movie</a>
                </div>
            </div>
        </div>`
        })
        return $movieHTMLArray.join('')
    }
    // renderMovies($movieList)
    $movieContainer.html(renderMovies(watchlist))
})