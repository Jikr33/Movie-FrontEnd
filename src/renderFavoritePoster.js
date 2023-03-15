import React from "react";
import RatingStars from "./RatingStars";
import { Link } from "react-router-dom";

export default function RenderFavoritePoster({ movie, ratings, userId }) {
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
                            <h1>Director: {movie.Director}</h1>
                            <h1>Writer: {movie.Writer}</h1>
                            <h1>Actors: {movie.Actors}</h1>
                        </span>
                    </div>
                    <div className="flex w-full h-1/6 items-center w-full px-2">
                        <h1>Rate this movie : </h1>
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
