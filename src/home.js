import React from "react";
import { useState, useEffect } from "react";
import Result from "./result";
import { Link, redirect } from "react-router-dom";
function Home({ navigation }) {
    localStorage.setItem("name", "");
    const [name, setName] = useState("");
    useEffect(() => {
        localStorage.setItem("name", name);
        console.log("set local - ", localStorage.getItem("name"));
    }, [name]);
    const setValue = (s) => {
        setName(s.target.value);
        console.log(s);
    };
    const checkInput = async () => {
        // initialize search input
        var input = document.getElementById("searchInput");
        if (name.length <= 1) {
            console.warn("Movie name must be valid...");
            input.style.borderColor = "red";
            input.style.borderBottomWidth = "5px";
            input.style.animation = "shake";
            input.style.animationDuration = "1.5s";
        } else {
            window.location = "/result";
        }
    };
    return (
        <div
            id="homeContainer"
            className="bg-cover bg-center bg-no-repeat bg-orange-200"
        >
            <h1 className="capitalize text-amber-900 font-mono font-bold text-3xl h-14 w-2/5 text-center pt-2 rounded-full ">
                Search for Movies. i got you
            </h1>
            <div id="search" className="rounded-md">
                <input
                    type="text"
                    id="searchInput"
                    className="outline-0 border border-b-2 rounded-lg max-h-15 w-full h-2/3 pl-3"
                    onChange={(e) => setValue(e)}
                />
                <button
                    className="p-2 m-4 bg-yellow-500 text-white w-80 text-xl"
                    onClick={() => checkInput()}
                >
                    Search
                </button>
                <Link
                    className="p-2 m-2 bg-yellow-500 text-white text-center w-80 text-xl"
                    to={"/memes"}
                >
                    Entertain me with memes
                </Link>
                <Link
                    className="p-2 m-2 bg-yellow-500 text-white text-center w-80 text-xl"
                    to={"/memes"}
                >
                    Favorite Movies
                </Link>
            </div>
        </div>
    );
}

export default Home;
