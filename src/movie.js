import axios from "axios";
import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as mdb from "mdb-ui-kit"; // lib
import { Input } from "mdb-ui-kit"; // module
import { MDBBadge } from "mdb-react-ui-kit";
import { SupabaseSaveMovie } from "./supas/supabaseSaveMovie";
import { SupabaseGetAllSaved } from "./supas/supabaseGetAllSaved";
import { SupabaseUnsaveMovie } from "./supas/supabaseUnsaveMovie";
import { Link } from "react-router-dom";
import { SupabaseFavorite } from "./supas/supabaseFavorite";
import RatingStars from "./RatingStars";

function Movie() {
    // var id = props.location.state
    // console.log(data)
    const location = useLocation();
    const [id, setID] = useState(location.state.id);
    //
    // ^tt\d{8}$/gi
    if (!/^tt[0-9]{6,8}$/gi.test(location.state.id)) {
        console.log("id not goood", id);
        async function regexx(s) {
            await axios
                .get(
                    `https://api.themoviedb.org/3/movie/${s}?api_key=c4aa72a3b011582e85cbcc03fe277717&language=en-US`
                )
                .then((response) => {
                    setID(response.data["imdb_id"]);
                    console.log(response.data["imdb_id"]);
                })
                .catch((err) => {
                    console.log(err, "its for regexx");
                });
        }
        regexx(location.state.id);
    }
    const userID = localStorage.getItem("userId");
    const [details, setDetails] = useState({});

    const [backupPoster, setBackupPoster] = useState("");
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
    const [casts, setCasts] = useState([]);
    const [writers, setWriters] = useState("");
    const [awards, setAwards] = useState("");
    const [boxOffice, setBoxOffice] = useState(0);

    const [posterCounter, setPosterCounter] = useState(1);

    const [searchTitle, setSearchTitle] = useState("");

    const [myRating, setMyRating] = useState(0);

    const options = {
        method: "GET",
        url: "https://movie-database-alternative.p.rapidapi.com/",
        params: { r: "json", i: id },
        headers: {
            "X-RapidAPI-Key":
                "676d565cf9msh03913601fbc68d3p181769jsnc91829350ae4",
            "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
        },
    };
    var uselessDatas = [
        "Year",
        "Language",
        "Country",
        // "Poster",
        "Ratings",
        "Metascore",
        "imdbVotes",
        "imdbID",
        "Type",
        "Production",
        "Website",
        "Response",
        "DVD",
    ];

    const fetch = async () => {
        await axios
            .request(options)
            .then(function (response) {
                let newDetails = [];

                console.log(response.data);
                if (!response.data) {
                    console.warn("no movie found -> ", response.data);
                }
                for (const key in response.data) {
                    // if (!uselessDatas.includes(key)) {
                    //     let newObj = response.data[key];
                    //     // setDetails([...details, newObj])
                    //     newDetails.push(newObj);
                    //     console.log(newDetails);
                    // }
                    if (uselessDatas.includes(key)) {
                        delete response.data[key];
                        // setDetails([...details, newObj])
                        // newDetails.push(newObj);
                        // console.log(newDetails);
                    }
                }
                newDetails = response.data;
                // setDetails(newDetails);
                setDetails(response.data);
                setPosterUrls([newDetails.Poster]);
                setTitle(newDetails.Title);
                setSearchTitle(newDetails.Title.replace(" ", "+"));
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

                var newCasts = [];
                newCasts = newCasts.concat(newDetails.Director.split(","));
                newCasts = newCasts.concat(newDetails.Writer.split(","));
                newCasts = newCasts.concat(newDetails.Actors.split(","));
                var r = [];
                newCasts.forEach((x) => {
                    r.push(x.trim());
                });
                setCasts(r);
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
    };

    useEffect(() => {
        fetch();
        isSaved();
    }, [id]);

    const show = () => {
        var e = [
            title,
            released,
            rating,
            genres,
            plot,
            time,
            imdb,
            awards,
            actors,
            directors,
            writers,
            details,
            posterUrls,
            boxOffice,
            casts,
            "backup",
            backupPoster,
        ];
        e.map((x) => {
            console.log(x);
        });
    };
    const nextPoster = (x) => {
        if (posterCounter + x > posterUrls.length) {
            setPosterCounter(1);
        } else if (posterCounter + x <= 0) {
            setPosterCounter(posterUrls.length);
        } else {
            setPosterCounter(posterCounter + x);
        }
    };
    // useEffect(() => {
    //     let isSaved = localStorage.getItem(id);
    //     console.log(isSaved);
    //     const saved = document.querySelector(".ms-2");
    //     const saved2 = document.querySelector("#saved");
    //     if (isSaved === "true") {
    //         saved.style.display = "none";
    //         saved2.style.display = "block";
    //     } else {
    //         saved.style.display = "block";
    //         saved2.style.display = "none";
    //     }
    // });

    const isSaved = async () => {
        const saveds = await SupabaseFavorite(userID);
        const saved = document.querySelector("#saved");
        const unsaved = document.querySelector("#unsaved");
        // console.log(saveds);
        Object.keys(saveds).forEach((x) => {
            // console.log(x);
            if (x === id) {
                console.log(saveds, id);
                localStorage.setItem(id, true);
                unsaved.style.display = "none";
                saved.style.display = "block";
                if (saveds[x] !== false) {
                    setMyRating(saveds[x]);
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
        const savedThis = await SupabaseSaveMovie(userID, id);
        if (savedThis) {
            localStorage.setItem(id, true);
            unsaved.style.display = "none";
            saved.style.display = "block";
            // alert("This movie was saved to your favourites list... +", id);
        } else {
            alert(`${id} this movie was already saved...!`);
        }
    };
    const unsaveMovie = async () => {
        const ss = await SupabaseUnsaveMovie(userID, id);
        localStorage.setItem(id, false);
        const saved = document.querySelector("#saved");
        const unsaved = document.querySelector("#unsaved");
        unsaved.style.display = "block";
        saved.style.display = "none";
        console.log(ss);
        // alert("This movie was removed from your favourites list... -", id);
    };
    return (
        <div id="movieCont">
            <div id="moviePoster">
                {/* <img
                    id="poster"
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterUrls[0]}`}
                    alt=""
                    onClick={() => show()}
                /> */}
                <div
                    id="carouselExampleCrossfade"
                    class="carousel slide carousel-fade"
                    data-mdb-ride="carousel"
                    data-mdb-interval="1000000"
                    // onClick={() => show()}
                >
                    <div id="unsaved" onClick={() => saveMovie()}></div>
                    <div id="saved" onClick={() => unsaveMovie()}></div>
                    {posterUrls.map((x, i) => {
                        var g = i > 0 ? "" : "active";
                        return (
                            <div class={`carousel-item ${g}`}>
                                <img
                                    key={i}
                                    src={`${x}`}
                                    class="d-block w-100 h-100 hover-shadow"
                                    alt={`${i}`}
                                />
                            </div>
                        );
                    })}
                    <div id="posterCounter">
                        <h1>
                            {posterCounter}/{posterUrls.length}
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
                        class="carousel-control-prev"
                        type="button"
                        data-mdb-target="#carouselExampleCrossfade"
                        data-mdb-slide="prev"
                        onClick={() => nextPoster(-1)}
                    >
                        <span
                            class="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button
                        class="carousel-control-next"
                        type="button"
                        data-mdb-target="#carouselExampleCrossfade"
                        data-mdb-slide="next"
                        onClick={() => nextPoster(1)}
                    >
                        <span
                            class="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
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
                        <div className="flex w-full h-1/6 items-center w-full px-2">
                            <h1>Rate this movie : </h1>
                            <RatingStars
                                userId={userID}
                                id={id}
                                rating={myRating}
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
                            href={`https://www1.123movies.co/search/?s=${searchTitle}`}
                            target="_"
                        >
                            <h1>Watch here</h1>
                        </a>
                    </div>
                </div>
            </div>
            {/* <div
                                    id="carouselExampleCrossfade"
                                    class="carousel slide carousel-fade"
                                    data-mdb-ride="carousel"
                                >
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterUrls[0]}`}
                                                class="d-block w-100"
                                                alt="Wild Landscape"
                                            />
                                        </div>
                                        <div class="carousel-item active">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterUrls[1]}`}
                                                class="d-block w-100"
                                                alt="Camera"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        class="carousel-control-prev"
                                        type="button"
                                        data-mdb-target="#carouselExampleCrossfade"
                                        data-mdb-slide="prev"
                                    >
                                        <span
                                            class="carousel-control-prev-icon"
                                            aria-hidden="true"
                                        ></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button
                                        class="carousel-control-next"
                                        type="button"
                                        data-mdb-target="#carouselExampleCrossfade"
                                        data-mdb-slide="next"
                                    >
                                        <span
                                            class="carousel-control-next-icon"
                                            aria-hidden="true"
                                        ></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div> */}
        </div>
    );
}

export default Movie;
