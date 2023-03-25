// import "./App.css";
import Home from "./pages/home";
// import Result from "./pages/result";
// import Movie from "./pages/movie";
// import Memes from "./pages/memes";
// import Favorite from "./pages/favorite";
import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy, useState, useEffect } from "react";
import { SupabaseLog } from "./supas/supabaseLog";

const Favorite = lazy(() => import("./pages/favorite"));
const Result = lazy(() => import("./pages/result"));
const Movie = lazy(() => import("./pages/movie"));
const Memes = lazy(() => import("./pages/memes"));

function App() {
    const [userID, setUserID] = useState(localStorage.getItem("userId"));
    const tokenSupabase = localStorage.getItem("logged");
    const locationSaved = localStorage.getItem("located");
    useEffect(() => {
        // if (userID != null && !tokenSupabase) {
        //     SupabaseLog(userID);
        //     localStorage.setItem("logged", true);
        // }
        if (!locationSaved) {
            getLocationAndLog();
        } else {
            if (userID != null && !tokenSupabase) {
                SupabaseLog(userID);
                localStorage.setItem("logged", true);
            }
        }
    }, [userID]);
    const getLocationAndLog = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                console.log(pos.coords, "this is coordianteor");
                var res = [pos.coords.latitude, pos.coords.longitude];
                localStorage.setItem("located", true);
                if (userID != null && !tokenSupabase) {
                    SupabaseLog(userID, res);
                    localStorage.setItem("logged", true);
                }
            });
        } else {
            console.log("user did not allow to be located down his ass...");
            if (userID != null && !tokenSupabase) {
                SupabaseLog(userID);
                localStorage.setItem("logged", true);
            }
        }
    };

    return (
        <Routes>
            <Route path="/" component={Home} element={<Home />}></Route>

            <Route
                path="result"
                component={Result}
                element={
                    <Suspense fallback={<h1>Loading Watchlist...</h1>}>
                        <Result />
                    </Suspense>
                }
            ></Route>

            <Route
                path="movie"
                component={Movie}
                element={
                    <Suspense fallback={<h1>Loading Watchlist...</h1>}>
                        <Movie />
                    </Suspense>
                }
            ></Route>
            <Route
                path="memes"
                component={Memes}
                element={
                    <Suspense fallback={<h1>Loading Watchlist...</h1>}>
                        <Memes />
                    </Suspense>
                }
            ></Route>
            <Route
                path="favorites"
                component={Favorite}
                element={
                    <Suspense fallback={<h1>Loading Watchlist...</h1>}>
                        <Favorite />
                    </Suspense>
                }
            ></Route>
        </Routes>
    );
}

export default App;
