import axios from "axios";
import { React, useEffect, useState } from "react";
import { SupabaseFavorite } from "./supabaseFavorite";
import { SupabaseUsername } from "./supabaseUsername";

function Favorite() {
    const userId = localStorage.getItem("userId");
    var [username, setUsername] = useState("");
    // const userName = localStorage.getItem("userId");
    const [faves, setFaves] = useState([]);

    useEffect(() => {
        userId
            ? console.log(userId, "user has signed in")
            : console.log(userId, "user has not signed in!!!");
        // Supabase(userId);
        fetch();
        console.log(username);
        fetchName();
    }, []);

    const fetchName = async () => {
        var s = await SupabaseUsername(userId);
        setUsername(s.toUpperCase());
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
        "BoxOffice",
        "Awards",
        "Actors",
        "Writer",
        "Director",
        "Genre",
    ];
    const fetchAll = async (s) => {
        if (s.length <= 0) {
            return false;
        }
        var respo = [];
        s.forEach(async (id) => {
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
                    console.log("this is fetchall", response.data);
                    respo.push(response.data);
                })
                .catch(function (error) {
                    console.error("fetchall err", error);
                });
        });
        setFaves(respo);
    };

    const fetch = async () => {
        const s = await SupabaseFavorite(userId);
        return await fetchAll(s);
    };
    return (
        <div id="contFavorites">
            <div id="contFavorite">
                <h1>{username}'s watchlist</h1>
                <div id="favorite">
                    {faves.map((s) => {
                        return <h1>{s.Title}</h1>;
                    })}
                </div>
                <button
                    onClick={() => {
                        console.log(faves);
                    }}
                >
                    ss
                </button>
            </div>
        </div>
    );
}
export default Favorite;
