import axios from "axios";
import { React, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Modal from "react-modal";
import * as mdb from "mdb-ui-kit"; // mdbootstrap lib, need it for the carousel to work
import RatingStars from "../components/RatingStars";
import MoviePosterCarousel from "../components/MoviePosterCarousel";
// import { SupabaseSaveMovie } from "../supas/supabaseSaveMovie";
// import { SupabaseUnsaveMovie } from "../supas/supabaseUnsaveMovie";
// import { SupabaseFavorite } from "../supas/supabaseFavorite";
import fetchGlobalRatings from "../supas/fetchGlobalRatings";
// const SupabaseFavorite = lazy(() => import("../supas/supabaseFavorite"));
// const SupabaseSaveMovie = lazy(() => import("../supas/supabaseSaveMovie"));
// const SupabaseUnsaveMovie = lazy(() => import("../supas/supabaseUnsaveMovie"));

function Movie() {
    const location = useLocation();
    const [id, setID] = useState(location.state.id);

    useEffect(() => {
        if (!/^tt[0-9]{6,9}$/gi.test(location.state.id)) {
            console.log("id not goood", id);
            async function regexx(s) {
                await axios
                    .get(
                        `https://api.themoviedb.org/3/movie/${s}?api_key=c4aa72a3b011582e85cbcc03fe277717&language=en-US`
                    )
                    .then((response) => {
                        let thisID = response.data["imdb_id"];
                        setID(thisID);
                        console.log(thisID);
                        fetch(thisID);
                    })
                    .catch((err) => {
                        console.log(err, "its for regexx");
                    });
            }
            regexx(location.state.id);
        } else {
            fetch(id);
        }
    }, []);

    const userID = localStorage.getItem("userId");
    const [posterUrls, setPosterUrls] = useState([]);
    const [title, setTitle] = useState("");
    const [released, setReleased] = useState("");
    const [rating, setRating] = useState("");
    const [genres, setGenres] = useState("");
    const [plot, setPlot] = useState("");
    const [time, setTime] = useState();
    const [imdb, setImdb] = useState();
    const [actors, setActors] = useState("");
    const [directors, setDirectors] = useState("");
    const [writers, setWriters] = useState("");
    const [awards, setAwards] = useState("");
    const [boxOffice, setBoxOffice] = useState(0);
    // const [casts, setCasts] = useState([]);

    // const [posterCounter, setPosterCounter] = useState(1);

    const [myRating, setMyRating] = useState(0);
    const [saved, setSaved] = useState(false);

    const [mustLoginModal, setMustLoginModal] = useState(false);
    // useEffect(() => {
    //     fetch();
    //     console.log("used effecto");
    // }, [id]);

    // const options = {
    //     method: "GET",
    //     url: "https://movie-database-alternative.p.rapidapi.com/",
    //     params: { r: "json", i: id },
    //     headers: {
    //         "X-RapidAPI-Key":
    //             "676d565cf9msh03913601fbc68d3p181769jsnc91829350ae4",
    //         "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
    //     },
    // };

    const fetch = async (newId) => {
        const options = {
            method: "GET",
            url: "https://movie-database-alternative.p.rapidapi.com/",
            params: { r: "json", i: newId },
            headers: {
                "X-RapidAPI-Key":
                    "676d565cf9msh03913601fbc68d3p181769jsnc91829350ae4",
                "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
            },
        };
        await axios
            .request(options)
            .then(function (response) {
                let newDetails = [];

                console.log(
                    response.data,
                    newId,
                    "movie details were fetched..."
                );
                if (!response.data) {
                    console.warn("no movie found -> ", response.data);
                }
                // for (const key in response.data) {
                //     if (uselessDatas.includes(key)) {
                //         delete response.data[key];
                //     }
                // }
                newDetails = response.data;
                setPosterUrls([newDetails.Poster]);
                setTitle(newDetails.Title);
                setReleased(newDetails.Released);
                setRating(newDetails.Rated);
                setGenres(newDetails.Genre);
                setPlot(newDetails.Plot);
                setTime(newDetails.Runtime);
                setImdb(newDetails.imdbRating);

                setActors(newDetails.Actors);
                setAwards(newDetails.Awards);
                setDirectors(newDetails.Director);
                setWriters(newDetails.Writer);

                setBoxOffice(newDetails.BoxOffice);

                // var newCasts = [];
                // newCasts = newCasts.concat(newDetails.Director.split(","));
                // newCasts = newCasts.concat(newDetails.Writer.split(","));
                // newCasts = newCasts.concat(newDetails.Actors.split(","));
                // var r = [];
                // newCasts.forEach((x) => {
                //     r.push(x.trim());
                // });
                // setCasts(r);
            })
            .catch(function (error) {
                console.error(error, id);
            });

        await axios
            .get(
                `https://api.themoviedb.org/3/movie/${id}/images?api_key=c4aa72a3b011582e85cbcc03fe277717&language=en-US&include_image_language=en`
            )
            .then(function (response) {
                setPosterUrls([]);
                console.log(response.data.posters);
                let posters = response.data.posters;
                let newPosterUrls = [];
                for (let i = 0; i < posters.length; i++) {
                    let j = posters[i].file_path;
                    newPosterUrls.push(
                        `https://image.tmdb.org/t/p/original${j}`
                    );
                }
                setPosterUrls(newPosterUrls);
            })
            .catch(function (err) {
                console.log("problem with poster", err);
            });
        isSaved(newId);
    };

    // const nextPoster = (x) => {
    //     if (posterCounter + x > posterUrls.length) {
    //         setPosterCounter(1);
    //     } else if (posterCounter + x <= 0) {
    //         setPosterCounter(posterUrls.length);
    //     } else {
    //         setPosterCounter(posterCounter + x);
    //     }
    // };

    // const fetchGlobalRatings = async (id) => {
    //     const ratings = await SupabaseFavorite(id);
    //     if (ratings) {
    //         localStorage.setItem("ratings", JSON.stringify(ratings));
    //     }
    // };
    const isSaved = async (id) => {
        // const saveds = await SupabaseFavorite(userID);
        const saveds = JSON.parse(localStorage.getItem("ratings"));
        const saved = document.querySelector("#saved");
        const unsaved = document.querySelector("#unsaved");
        Object.keys(saveds).forEach((x) => {
            if (x === id) {
                console.log(saveds, id, "this movie is saved");
                localStorage.setItem(id, true);
                unsaved.style.display = "none";
                saved.style.display = "block";
                if (saveds[x]) {
                    setMyRating(saveds[x]);
                    setSaved(true);
                    console.log(saveds[x], "saveds[x]");
                }
            }
        });
    };

    const saveMovie = async () => {
        if (!userID) {
            alert("You must login to use this feature...");
            return false;
        }
        console.log("saved this movie", id, "user", userID);
        const saved = document.querySelector("#saved");
        const unsaved = document.querySelector("#unsaved");

        localStorage.setItem(id, true);
        import("../supas/supabaseSaveMovie").then(async (module) => {
            const savedThis = await module.SupabaseSaveMovie(userID, id);
            if (savedThis) {
                localStorage.setItem(id, true);
                unsaved.style.display = "none";
                saved.style.display = "block";
                const r = await fetchGlobalRatings(userID);
            } else {
                alert(`${id} this movie was already saved...!`);
            }
        });
    };
    const unsaveMovie = async () => {
        import("../supas/supabaseUnsaveMovie").then(async (module) => {
            const ss = await module.SupabaseUnsaveMovie(userID, id);
            if (ss) {
                localStorage.setItem(id, false);
                const saved = document.querySelector("#saved");
                const unsaved = document.querySelector("#unsaved");
                unsaved.style.display = "block";
                saved.style.display = "none";
                const r = await fetchGlobalRatings(userID);
            }
            console.log(ss);
        });
    };
    return (
        <div id="movieCont">
            <div id="moviePoster">
                <MoviePosterCarousel
                    posterUrls={posterUrls}
                    saveMovie={saveMovie}
                    unsaveMovie={unsaveMovie}
                    // posterCounter={posterCounter}
                    // nextPoster={nextPoster}
                ></MoviePosterCarousel>
            </div>
            <div id="movieDetails">
                <div id="movieDetail">
                    <div id="movieTitles">
                        <a
                            href={`https://www.imdb.com/title/${id}`}
                            target="_"
                            id="movieImdb"
                        >
                            {imdb}
                        </a>
                        <div id="movieTitle">
                            {title}
                            <div id="movieRating">
                                <h1>{rating}</h1> |<h1>{time}</h1> |
                                <h1>{released}</h1>
                            </div>
                        </div>
                    </div>
                    <div id="movieDetailes">
                        <div className="movieFlexDiv plot">{plot}</div>

                        <div className="movieFlexDiv">
                            <h1>
                                Directed by: <span>{directors}</span>
                            </h1>
                        </div>
                        <div className="movieFlexDiv">
                            <h1>
                                Written by: <span>{writers}</span>
                            </h1>
                        </div>
                        <div className="movieFlexDiv">
                            <h1>
                                Rated: <span>{rating}</span>
                            </h1>
                        </div>
                        <div className="movieFlexDiv">
                            <h1>
                                Running time: <span>{time}</span>
                            </h1>
                        </div>
                        <div className="movieFlexDiv">
                            <h1>
                                Release date: <span>{released}</span>
                            </h1>
                        </div>
                        <div className="movieFlexDiv">
                            <h1>
                                Gross Box Office: <span>{boxOffice}</span>
                            </h1>
                        </div>

                        <div className="movieFlexDiv">
                            <h1>
                                Awards and Nominations: <span>{awards}</span>
                            </h1>
                        </div>
                        <div className="movieFlexDiv">
                            <h1>
                                Genre: <span>{genres}</span>
                            </h1>
                        </div>
                        <div className="movieFlexDiv">
                            <h1>
                                Actors: <span>{actors}</span>
                            </h1>
                        </div>
                        <div
                            className="flex h-1/6 items-center w-full px-2"
                            id="movieRatingStars"
                        >
                            <h1>Rate this movie : </h1>
                            <RatingStars
                                // fetchGlobalRatings={fetchGlobalRatings}
                                userId={userID}
                                saved={saved}
                                id={id}
                                rating={myRating}
                                setMustLoginModal={setMustLoginModal}
                            ></RatingStars>
                        </div>
                    </div>
                    <div id="links">
                        <a
                            id="trailer"
                            href={`https://www.youtube.com/results?search_query=${title}`}
                            target="_"
                        >
                            <h1>Watch trailer</h1>
                        </a>
                        <a
                            id="watchLink"
                            href={`https://www1.123movies.co/search/?s=${
                                title ? title.replace(" ", "+") : ""
                            }`}
                            target="_"
                        >
                            <h1>Watch here</h1>
                        </a>
                        <a
                            id="watchLink2"
                            href={`https://ww8.0123movie.net/search.html?q=${
                                title ? title.replace(" ", "+") : ""
                            }`}
                            target="_"
                        >
                            <h1>Watch here</h1>
                        </a>
                    </div>
                </div>
            </div>
            <Modal
                id="mustLoginModal"
                isOpen={mustLoginModal}
                onRequestClose={() => setMustLoginModal(false)}
                ariaHideApp={false}
                shouldCloseOnOverlayClick={true}
            >
                <div id="mustLoginCont">
                    <h4 className="py-2 text-xl font-extrabold">
                        You must login to use this feature!
                    </h4>
                    <div id="mustLoginButtons">
                        <Link
                            id="mustLoginButton"
                            to={"/"}
                            className="bg-green-500"
                        >
                            Login Now
                        </Link>
                        <input
                            id="mustLoginButton"
                            type="button"
                            value="Close"
                            onClick={() => setMustLoginModal(false)}
                            className="bg-red-600"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
export default Movie;
