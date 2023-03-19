import { lazy, React, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RenderFavoritePosters from "../components/renderFavoritePosters";

function Favorite() {
    const userId = localStorage.getItem("userId");
    var [username, setUsername] = useState("");
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        userId
            ? console.log(userId, "user has signed in")
            : console.log(userId, "user has not signed in!!!");
        console.log(username);
        fetchName();
    }, []);

    const fetchName = async () => {
        import("../supas/supabaseUsername").then(async (module) => {
            await module.SupabaseUsername(userId, setUsername);
        });
    };

    return (
            <div id="contFavorites">
                <div id="contFavorite">
                    <span className="relative h-12 w-full flex items-center justify-center bg-yellow-400/80 text-black tracking-widest font-bold">
                        <Link to={"/"} className="absolute left-2">
                            {"< HOME"}
                        </Link>
                        <h1>{username}'s watchlist</h1>
                    </span>
                    <RenderFavoritePosters
                        ratings={ratings}
                    ></RenderFavoritePosters>
                </div>
            </div>
    );
}
export default Favorite;
