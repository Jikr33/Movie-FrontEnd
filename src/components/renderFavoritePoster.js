import React, { useState } from "react";
import RatingStars from "./RatingStars";
import { Link } from "react-router-dom";

export default function RenderFavoritePoster({ movie, ratings, userId }) {
    const [language, setLanguage] = useState(
        localStorage.getItem("lang") || "eng"
    );
    return (
        <>
            <div className="favoriteItem" key={movie.imdbID}>
                <img src={movie.Poster} alt="." />
                <div className="favoriteItemDetails">
                    <span className="favoriteItemTitle">
                        <h1 className="text-xl font-medium flex w-4/5 h-full items-center justify-between">
                            <Link
                                className="hover:text-yellow-400"
                                to={"/movie"}
                                state={{ id: movie.imdbID }}
                            >
                                {movie.Title} ({movie.Released})
                            </Link>
                        </h1>
                        <a
                            className="text-xl hover:text-yellow-300"
                            href={`https://www.imdb.com/title/${movie.imdbID}/`}
                        >
                            {movie.imdbRating}/10
                        </a>
                    </span>
                    <span className="favoriteItemTitle2 w-full text-sm">
                        {movie.Rated} | {movie.Genre} | {movie.Runtime}
                    </span>
                    <div className="favoriteItemDetail w-full px-2 mt-3">
                        <h1 className="font-normal text-m line-clamp-3">
                            {movie.Plot}
                        </h1>
                        <span className="flex flex-col justify-evenly w-full ml-0 mt-1 text-sm h-16">
                            <h1>
                                {language === "eng" ? "Director" : "Найруулагч"}
                                : {movie.Director}
                            </h1>
                            <h1>
                                {language === "eng" ? "Writer" : "Зохиолч"}:{" "}
                                {movie.Writer}
                            </h1>
                            <h1>
                                {language === "eng" ? "Actors" : "Жүжигчид"}:{" "}
                                {movie.Actors}
                            </h1>
                        </span>
                    </div>
                    <div
                        className="flex w-full h-1/6 items-center px-2"
                        id="favoritePostersRating"
                    >
                        <h1>
                            {language === "eng"
                                ? "Rate this movie"
                                : "Энэ киног үнэлэх"}{" "}
                            :{" "}
                        </h1>
                        <RatingStars
                            userId={userId}
                            id={movie.imdbID}
                            rating={ratings[movie.imdbID]}
                        ></RatingStars>
                    </div>
                </div>
            </div>
        </>
    );
}
