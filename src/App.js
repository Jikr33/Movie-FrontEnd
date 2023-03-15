import "./App.css";
import Home from "./home";
import Result from "./result";
import Movie from "./movie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Redirect, Switch } from "react";
import Memes from "./memes";
import Favorite from "./favorite";
import RenderFavoritePosters from "./renderFavoritePosters";
// require('dotenv').config()

function App() {
    return (
            <Routes>
                <Route path="/" component={Home} element={<Home />}></Route>
                <Route
                    path="result"
                    component={Result}
                    element={<Result />}
                ></Route>
                <Route
                    path="movie"
                    component={Movie}
                    element={<Movie />}
                ></Route>
                <Route
                    path="memes"
                    component={Memes}
                    element={<Memes />}
                ></Route>
                <Route
                    path="posters"
                    component={RenderFavoritePosters}
                    element={<RenderFavoritePosters />}
                ></Route>
                <Route path="favorites" element={<Favorite />}></Route>
                {/* <Route path='/guide' element={<Guide/>}></Route> */}
            </Routes>
    );
}

export default App;
