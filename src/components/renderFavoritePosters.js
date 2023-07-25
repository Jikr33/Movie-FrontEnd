import { React, useEffect, useState } from "react";
import RenderFavoritePoster from "./renderFavoritePoster";
import fetchAll from "../supas/fetchAll";

function RenderFavoritePosters(props) {
    const userId = localStorage.getItem("userId");
    const [faves, setFaves] = useState([]);
    const [ratings, setRatings] = useState(
        JSON.parse(localStorage.getItem("ratings"))
    );
    const fetch = async () => {
        if (ratings) {
            var fetched = await fetchAll(ratings);
            // console.log(fetched.length, "fetched");
            var fet = fetched.sort(
                (a, b) => parseInt(a.Year) + parseInt(b.Year)
            );
            setFaves(fet);
            // console.log(fet);
        }
    };
    useEffect(() => {
        if (ratings) {
            fetch();
        }
    }, []);

    return (
        <div id="favorite">
            {faves &&
                faves.length > 0 &&
                faves.map((item) => {
                    return (
                        <RenderFavoritePoster
                            movie={item}
                            ratings={ratings}
                            userId={userId}
                            key="renderFavoritePosterComponent"
                        ></RenderFavoritePoster>
                    );
                })}
        </div>
    );
}
export default RenderFavoritePosters;
