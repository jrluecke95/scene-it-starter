function saveToWatchList(imdbID) {
    $.get("https://www.omdbapi.com/?apikey=59354c85&i=" + imdbID) 
    .then((data) => {
        const movie = data;
        let watchlistJSON = localStorage.getItem('watchlist');
        let watchlist = JSON.parse(watchlistJSON);
        if (watchlist === null) {
            watchlist = [];
        }
        watchlist.push(movie);
        watchlistJSON = JSON.stringify(watchlist);
        localStorage.setItem('watchlist', watchlistJSON)
        })
    }



// get data from API as object
// store object as JSON - as a string
// then convert it back to object format so you can access the data


// render movies as normal without if/else related to titles 
// jsut use $('a').remove('#addButton') to get rid of buttons if titles meet criteria 
// wouldnt work immediately. would still require refresh 
// need to find a way to integrate it with the save towatchlist function 

$(document).ready(function () {
    const $movieList = localStorage.getItem("watchlist")
    let watchlist = JSON.parse($movieList);
    if (watchlist === null) {
        watchlist = [];
    }
    const $movieContainer = $('.movies-container')
    function renderMovies($movieArray) {
        const $movieHTMLArray = $movieArray.map(currentMovie => {
            let titles = []
            for (let i = 0; i < watchlist.length; i++) {
                titles.push(watchlist[i].Title)
            }
            if ($.inArray(currentMovie.Title, titles) !== -1) {
                return `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 mt-3">
                <div class="card w-100">
                    <img src="${currentMovie.Poster}" class="card-img-top w-100" alt="${currentMovie.Title}">
                    <div class="card-body">
                        <h5 class="card-title">${currentMovie.Title}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's content.</p>
                            <a href="#" id="nullButton" class="btn btn-primary" disabled>On your list</a>
                    </div>
                </div>
            </div>`
            } else {
                return `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 mt-3">
                <div class="card w-100">
                    <img src="${currentMovie.Poster}" class="card-img-top w-100" alt="${currentMovie.Title}">
                    <div class="card-body" id="card-body">
                        <h5 class="card-title">${currentMovie.Title}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's content.</p>
                        <a href="#" id="addButton" onclick="saveToWatchList('${currentMovie.imdbID}')" class="btn btn-primary">Add Movie</a>
                    </div>
                </div>
            </div>`
            }
        })
        return $movieHTMLArray.join('')
    }



    const $search = $('#search')
    $search.on('click', function(e) {
        e.preventDefault();
        const $searchBar = $('#search-bar');
        let $searchString = $searchBar.val()
        let $urlEncodedSearchString = encodeURIComponent($searchString);
        $.get("https://www.omdbapi.com/?apikey=59354c85&s=" + $urlEncodedSearchString) 
        .then((data) => {
            let movieHTML = renderMovies(data.Search)
            $movieContainer.html(movieHTML)
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


    // get movie info from moie array that is in rendermovies function 
    // const movie = movieData.find(currentMovie => {
    //     return currentMovie.imdbID == imdbID;
    // });
    // let watchlistJSON = localStorage.getItem('watchlist');
    // let watchlist = JSON.parse(watchlistJSON);
    // if (watchlist === null) {
    //     watchlist = [];
    // }
    // watchlist.push(movie);
    // watchlistJSON = JSON.stringify(watchlist);
    // localStorage.setItem('watchlist', watchlistJSON)


                // if ($.inArray(currentMovie, watchlist)) {
            //     
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