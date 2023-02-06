import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Result() {
    var name = localStorage.getItem("name");

    var uname = encodeURIComponent(name);
    const [movies, setMovies] = useState({});
    const search = async () => {
        await axios
            .get(
                `https://movie-backend-8isc.onrender.com/api/v1/movies/${uname}`
            )
            .then((response) => {
                var res = response.data.movies.Search;
                // sorting the result
                res.sort((a, b) => {
                    return parseInt(b.Year) - parseInt(a.Year);
                });
                console.log("RESPONSE IRSEN SHUUUUU!!!!", res);
                setMovies(res);
                // console.log(movies);
            })
            .catch((error) => {
                console.log("Гарсан алдаа______", error);
            });
    };
    useEffect(() => {
        if (movies.length === 0) {
            console.warn("no movies");
            const warning = document.getElementById("warning");
            warning.style.display = "flex";
        }
    }, [movies]);
    useEffect(() => {
        search();
    }, []);

    const poster = (x) => {
        if (x === "N/A") {
            return "../notfoundposter.jpeg";
        }
        return x;
    };
    return (
        <div
            id="contResult"
            className="relative bg-cover bg-center bg-no-repeat bg-orange-200 h-screen w-screen"
        >
            <div id="resultTitle">Search results for {name}</div>
            <div id="itemsResult" className="scrollbar">
                {movies.length > 0 && (
                    <ul>
                        {movies.map((x) => {
                            if (x.Year) {
                                return (
                                    <Link
                                        to={"/movie"}
                                        state={{ id: x.imdbID }}
                                        className="items"
                                        key={x.imdbID}
                                    >
                                        <div className="resultPosters">
                                            <img
                                                src={poster(x.Poster)}
                                                className="resultPoster"
                                                alt=""
                                            />
                                            <h1 className="item">{x.Title}</h1>
                                        </div>
                                        <div className="item">{x.Year}</div>
                                    </Link>
                                );
                            }
                        })}
                    </ul>
                )}
            </div>
            <div
                id="warning"
                className="absolute top-60 h-44 flex flex-col justify-evenly items-center rounded-lg"
            >
                <h1 className="py-3">
                    No movies were found with name: "{name}"
                </h1>
                <Link id="warningLink" className="p-2 rounded-lg" to={"/"}>
                    Go Back To Search
                </Link>
            </div>
        </div>
    );
}

export default Result;
