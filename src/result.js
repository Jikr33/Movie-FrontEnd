import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Result() {
    var name = localStorage.getItem("name");
    const [movies, setMovies] = useState({});
    const search = async () => {
        await axios
            .get(
                `https://movie-backend-8isc.onrender.com/api/v1/movies/${name}`
            )
            .then((response) => {
                // sorting the result
                var res = response.data.movies.search;
                res.sort((a, b) => {
                    return b.year - a.year;
                });
                console.log("RESPONSE IRSEN SHUUUUU!!!!", res);
                setMovies(res);
                console.log(movies);
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
    return (
        <div
            id="contResult"
            className="relative bg-cover bg-center bg-no-repeat bg-orange-200 h-screen w-screen"
        >
            <div id="resultTitle">Search results for {name}</div>
            <div id="itemsResult" className="scrollbar">
                {movies.length > 0 && (
                    <ul>
                        {movies.map((user) => {
                            if (user.year) {
                                return (
                                    <Link
                                        to={"/movie"}
                                        state={{ id: user.id }}
                                        className="items"
                                        key={user.id}
                                    >
                                        <h1 className="item">{user.title}</h1>
                                        <div className="item">{user.year}</div>
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
