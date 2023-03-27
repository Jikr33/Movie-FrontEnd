import React from "react";
import { Link } from "react-router-dom";

export default function RenderResults({ movies, handleSearchScroll }) {
    const poster = (x) => {
        if (x === null) {
            return "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.explicit.bing.net%2Fth%3Fid%3DOIP.IlGzaN0i9-JDL6dQSj_bUQAAAA%26pid%3DApi&f=1&ipt=b522a5f77745c417bc2f0a78baab3df4fa0648355c7e8a1754c5fa594fa4256f&ipo=images";
        }
        //   return `https://image.tmdb.org/t/p/original${x}`;
        return `https://image.tmdb.org/t/p/w220_and_h330_face/${x}`;
    };
    return (
        <div
            id="itemsResult"
            className="scrollbar"
            onScroll={handleSearchScroll}
        >
            {movies.length > 0 && (
                <ul>
                    {movies.map((x) => {
                        if (
                            x.release_date ^
                            !(x.adult && x.original_language === "ja")
                        ) {
                            //  console.log(x.id);
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
                                        <span className="homeResultsInfos">
                                            <h1 className="item">
                                                {x.original_title}
                                            </h1>
                                            {/* <h5 className="text-sm">
                                                {x.overview}
                                            </h5> */}
                                            <h5>
                                                {`${x.overview.substring(
                                                    0,
                                                    300
                                                )}`}
                                            </h5>
                                        </span>
                                    </div>
                                    <div className="item">{x.release_date}</div>
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
    );
}
