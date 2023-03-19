import React, { useState } from "react";
import { Link } from "react-router-dom";

function MoviePosterCarousel({
    posterUrls,
    saveMovie,
    unsaveMovie,
    // nextPoster,
    // posterCounter,
}) {
    const [currentPoster, setCurrentPoster] = useState(1);
    const nextPoster = (x) => {
        if (currentPoster + x > posterUrls.length) {
            setCurrentPoster(1);
        } else if (currentPoster + x <= 0) {
            setCurrentPoster(posterUrls.length);
        } else {
            setCurrentPoster(currentPoster + x);
        }
    };
    return (
        <div
            id="carouselExampleCrossfade"
            className="carousel"
            // data-mdb-ride="carousel"
            // data-mdb-interval="10000"
        >
            <div id="unsaved" onClick={() => saveMovie()} key="unsaved"></div>
            <div id="saved" onClick={() => unsaveMovie()} key="saved"></div>
            {/* {posterUrls.map((x, i) => {
                var g = i > 0 ? "" : "active";
                return (
                    <div className={`carousel-item ${g}`} key={`div${i}`}>
                        <img
                            key={i}
                            src={`${x}`}
                            className="d-block w-100 h-100 hover-shadow"
                            alt={`${i}`}
                        />
                    </div>
                );
            })} */}
            <div className={`carousel-item active`}>
                <img
                    src={posterUrls[currentPoster - 1]}
                    className="d-block w-100 h-100 hover-shadow"
                    alt={currentPoster}
                />
            </div>
            <div id="posterCounter">
                <h1>
                    {currentPoster}/{posterUrls.length}
                </h1>

                <div className="w-2/4 flex justify-between">
                    <Link id="movieToFavorites" to={"/favorites"}>
                        Watchlist
                    </Link>
                    <Link id="movieToHome" to={"/"}>
                        Go back to home
                    </Link>
                </div>
            </div>

            <button
                className="carousel-control-prev"
                type="button"
                onClick={() => nextPoster(-1)}
            >
                {/* <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span> */}
                {/* <span className="visually-hidden">Previous</span> */}
            </button>
            <button
                className="carousel-control-next"
                type="button"
                onClick={() => nextPoster(1)}
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default MoviePosterCarousel;
