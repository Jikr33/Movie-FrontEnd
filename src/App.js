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
    useEffect(() => {
        if (userID != null && !tokenSupabase) {
            SupabaseLog(userID);
            localStorage.setItem("logged", true);
        }
    }, [userID]);

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
