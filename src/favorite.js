import axios from "axios";
import { React, useEffect, useState } from "react";
import { Supabase } from "./supabase";
import { SupabaseFavorite } from "./supabaseFavorite";
function Favorite() {
    const userId = localStorage.getItem("userId");
    // const userName = localStorage.getItem("userId");
    const [faves, setFaves] = useState([]);

    useEffect(() => {
        userId
            ? console.log(userId, "user has signed in")
            : console.log(userId, "user has not signed in!!!");
        // Supabase(userId);
        setFaves(fetch());
    }, []);

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
        "BoxOffice",
        "Awards",
        "Actors",
        "Writer",
        "Director",
        "Genre",
    ];

    const fetch = async () => {
        const s = await SupabaseFavorite(userId);

        var res = [];
        s.map(async (id) => {
            const options = {
                method: "GET",
                url: "https://movie-database-alternative.p.rapidapi.com/",
                params: { r: "json", i: id },
                headers: {
                    "X-RapidAPI-Key":
                        "676d565cf9msh03913601fbc68d3p181769jsnc91829350ae4",
                    "X-RapidAPI-Host":
                        "movie-database-alternative.p.rapidapi.com",
                },
            };
            await axios
                .request(options)
                .then(function (response) {
                    res.push(response.data);
                    console.log(res);
                })
                .catch(function (error) {
                    console.error(
                        "problem with requesting favorite movies details",
                        error
                    );
                });
        });
        console.log(res, faves);
        return res;
    };
    return (
        <div id="contFavorites">
            <div id="contFavorite">
                <h1>Suld's watchlist</h1>
                <div id="favorite">
                    {faves.map((x) => {
                        <div>{x.Title}</div>;
                    })}
                </div>
            </div>
        </div>
    );
}
export default Favorite;
