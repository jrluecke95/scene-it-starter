function saveToWatchList(imdbID) {
    let movieData = response.data.Search
    const movie = movieData.find(currentMovie => {
        return currentMovie.imdbID == imdbID;
    });
    let watchlistJSON = localStorage.getItem('watchlist');
    let watchlist = JSON.parse(watchlistJSON);
    if (watchlist === null) {
        watchlist = [];
    }
    watchlist.push(movie);
    watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem('watchlist', watchlistJSON)
}

// get data from API as object
// store object as JSON - as a string
// then convert it back to object format so you can access the data


$(document).ready(function () {
    const $movieList = localStorage.getItem("watchlist")
    let watchlist = JSON.parse($movieList);
    const $movieContainer = $('.movies-container')
    function renderMovies($movieArray) {
        const $movieHTMLArray = $movieArray.map(currentMovie => {
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

    // if ($.inArray(currentMovie, watchlist)) {
    //     return `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 mt-3">
    //         <div class="card w-100">
    //             <img src="${currentMovie.Poster}" class="card-img-top w-100" alt="${currentMovie.Title}">
    //             <div class="card-body">
    //                 <h5 class="card-title">${currentMovie.Title}</h5>
    //                 <p class="card-text">Some quick example text to build on the card title and make up the bulk of
    //                     the card's content.</p>
    //             </div>
    //         </div>
    //     </div>`
    // } else {
    //     return `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 mt-3">
    //         <div class="card w-100">
    //             <img src="${currentMovie.Poster}" class="card-img-top w-100" alt="${currentMovie.Title}">
    //             <div class="card-body">
    //                 <h5 class="card-title">${currentMovie.Title}</h5>
    //                 <p class="card-text">Some quick example text to build on the card title and make up the bulk of
    //                     the card's content.</p>
    //                 <a href="#" onclick="saveToWatchList('${currentMovie.imdbID}')" class="btn btn-primary">Add Movie</a>
    //             </div>
    //         </div>
    //     </div>`
    // }

    const $search = $('#search')
    $search.on('click', function(e) {
        e.preventDefault();
        const $searchBar = $('#search-bar');
        let $searchString = $searchBar.val()
        let $urlEncodedSearchString = encodeURIComponent($searchString);
        $.get("http://www.omdbapi.com/?apikey=59354c85&s=" + $urlEncodedSearchString) 
        .then((data) => {
            let movieHTML = renderMovies(response.data.Search)
            $movieContainer.html = movieHTML

        })
        })
    })

    





// <!-- <div class="col-4 mb-3 mt-3">
//                   <div class="card" style="width: 18rem;">
//                       <img src="..." class="card-img-top" alt="...">
//                       <div class="card-body">
//                           <h5 class="card-title">Card title</h5>
//                           <p class="card-text">Some quick example text to build on the card title and make up the bulk of
//                               the card's content.</p>
//                           <a href="#" class="btn btn-primary">Go somewhere</a>
//                       </div>
//                   </div>
//               </div>