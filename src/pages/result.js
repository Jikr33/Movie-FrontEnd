import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ResultsPageSwitcher from "../components/ResultsPageSwitcher";
import search from "../supas/homeSearch";

function Result() {
    var [name, setName] = useState(localStorage.getItem("name"));
    const [valid, setValid] = useState(false);

    const [movies, setMovies] = useState([]);
    // const search = async (page = 1) => {
    //     // var uname = encodeURIComponent(name);
    //     const options = {
    //         method: "GET",
    //         url: `https://api.themoviedb.org/3/search/movie?api_key=c4aa72a3b011582e85cbcc03fe277717&language=en-US&query=${name}&page=${page}&include_adult=true`,
    //     };
    //     await axios
    //         .request(options)
    //         .then((response) => {
    //             var res = response.data.results;
    //             // sorting the result
    //             res.sort((a, b) => {
    //                 return b.release_date - a.release_date;
    //             });
    //             console.log("RESPONSE IRSEN SHUUUUU!!!!", res);
    //             setMovies(res);
    //             // setMovies(movies.concat(res));
    //             if (res.length < 1) {
    //                 console.warn("no movies");
    //                 const warning = document.getElementById("warning");
    //                 warning.style.display = "flex";
    //             }
    //         })
    //         .catch((error) => {
    //             console.log("Гарсан алдаа______", error);
    //             console.warn("no movies");
    //             const warning = document.getElementById("warning");
    //             warning.style.display = "flex";
    //         });
    // };
    useEffect(() => {
        search(name, setMovies);
    }, [name]);

    const poster = (x) => {
        if (x === null) {
            return "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.explicit.bing.net%2Fth%3Fid%3DOIP.IlGzaN0i9-JDL6dQSj_bUQAAAA%26pid%3DApi&f=1&ipt=b522a5f77745c417bc2f0a78baab3df4fa0648355c7e8a1754c5fa594fa4256f&ipo=images";
        }
        return `https://image.tmdb.org/t/p/original${x}`;
    };
    return (
        <div
            id="contResult"
            className="relative bg-cover bg-center bg-no-repeat bg-orange-200 h-screen w-screen"
        >
            <div id="resultTitle">
                <div>
                    <Link to={"/"}>{`<-`}</Link>
                </div>
                {/* <div className="input-group">
                    <div className="homeSearchInput">
                        <input
                            autoFocus
                            type="search"
                            id="searchInput"
                            onChange={(e) => setValue(e)}
                            placeholder="Search for a movie or tv show"
                        />
                    </div>
                    {valid ? (
                        <Link
                            id="search-button"
                            className="btn btn-primary text-center text-xl shadow-5"
                            to="result"
                        >
                            Search
                        </Link>
                    ) : (
                        <Link
                            id="search-button"
                            className="btn btn-primary text-center text-xl shadow-5"
                            to=""
                            onClick={() => invalidInput()}
                        >
                            Search
                        </Link>
                    )}
                </div> */}

                <ResultsPageSwitcher
                    search={search}
                    setMovies={setMovies}
                ></ResultsPageSwitcher>
                <h1>Search results for "{name}"</h1>
            </div>
            <div id="itemsResult" className="scrollbar">
                {movies.length > 0 && (
                    <ul>
                        {movies.map((x) => {
                            if (
                                x.release_date &&
                                x.adult ^ (x.original_language == "ja")
                            ) {
                                console.log(x.adult != x.original_language);
                                return x.id ? (
                                    <Link
                                        to={"/movie"}
                                        state={{ id: x.id }}
                                        className="items"
                                        key={x.id}
                                    >
                                        <div className="resultPosters">
                                            <img
                                                src={poster(x.poster_path)}
                                                className="resultPoster"
                                                alt=""
                                            />
                                            <h1 className="item">
                                                {x.original_title}
                                            </h1>
                                        </div>
                                        <div className="item">
                                            {x.release_date}
                                        </div>
                                    </Link>
                                ) : (
                                    <div
                                        className="items"
                                        onClick={alert(
                                            "This movie does not have proper ID"
                                        )}
                                    >
                                        <div className="resultPosters">
                                            <img
                                                src={poster(x.poster_path)}
                                                className="resultPoster"
                                                alt=""
                                            />
                                            <h1 className="item">
                                                {x.original_title}
                                            </h1>
                                        </div>
                                        <div className="item">
                                            ! {x.release_date}
                                        </div>
                                    </div>
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
