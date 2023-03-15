import React from "react";
import { useState, useEffect } from "react";
import Result from "./result";
import { Link, redirect } from "react-router-dom";
import { tmdb } from "./supas/tmdbFetch";

function RenderHomePosters(props) {
    const [features, setFeatures] = useState(props.features);
    useEffect(() => {
        setFeatures(props.features);
    }, [props.features]);

    return (
        <div id="homeCarousel">
            {features &&
                features.map((x) => {
                    return (
                        <div className="homePosters" key={x.id}>
                            <Link
                                className="homePoster"
                                to={"/movie"}
                                state={{ id: x.id }}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w220_and_h330_face/${x.poster_path}`}
                                    alt=""
                                />
                            </Link>

                            <div className="homePostersInfo">
                                <Link
                                    to={"/movie"}
                                    state={{ id: x.id }}
                                    className="homePosterTitle"
                                >
                                    <h1 className="line-clamp-2">
                                        {x["original_title"]}
                                    </h1>
                                    <h1 className="text-yellow-500">
                                        {x["vote_average"]}
                                    </h1>
                                </Link>
                                {x["release_date"]}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
export default RenderHomePosters;
