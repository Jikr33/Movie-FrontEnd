import axios from "axios";
import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Movie() {
    // var id = props.location.state
    // console.log(data)
    const location = useLocation();
    const { id } = location.state;
    console.log(id);
    const [details, setDetails] = useState({});

    const [posterURL, setPosterURL] = useState("");
    const [title, setTitle] = useState("");
    const [released, setReleased] = useState("");
    const [rating, setRating] = useState("");
    const [genres, setGenres] = useState("");
    const [plot, setPlot] = useState("");
    const [time, setTime] = useState();
    const [imdb, setImdb] = useState();

    const [actors, setActors] = useState("");
    const [directors, setDirectors] = useState("");
    const [writers, setWriters] = useState("");
    const [awards, setAwards] = useState("");

    const options = {
        method: "GET",
        url: "https://movie-database-alternative.p.rapidapi.com/",
        params: { r: "json", i: id },
        headers: {
            "X-RapidAPI-Key":
                "676d565cf9msh03913601fbc68d3p181769jsnc91829350ae4",
            "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
        },
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
    ];

    const fetch = async () => {
        await axios
            .request(options)
            .then(function (response) {
                let newDetails = [];

                console.log(response.data);
                if (!response.data) {
                    console.warn("no movie found -> ", response.data);
                }
                for (const key in response.data) {
                    // if (!uselessDatas.includes(key)) {
                    //     let newObj = response.data[key];
                    //     // setDetails([...details, newObj])
                    //     newDetails.push(newObj);
                    //     console.log(newDetails);
                    // }
                    if (uselessDatas.includes(key)) {
                        delete response.data[key];
                        // setDetails([...details, newObj])
                        // newDetails.push(newObj);
                        // console.log(newDetails);
                    }
                }
                newDetails = response.data;
                // setDetails(newDetails);
                setDetails(response.data);
                setPosterURL(newDetails.Poster);
                setTitle(newDetails.Title);
                setReleased(newDetails.Released);
                setRating(newDetails.Rated);
                setGenres(newDetails.Genre);
                setPlot(newDetails.Plot);
                setTime(newDetails.Runtime);
                setImdb(newDetails.imdbRating);

                setActors(newDetails.Actors);
                setAwards(newDetails.Awards);
                setDirectors(newDetails.Director);
                setWriters(newDetails.Writer);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    useEffect(() => {
        fetch();
    }, []);

    const show = () => {
        var e = [
            title,
            released,
            rating,
            genres,
            plot,
            time,
            imdb,
            awards,
            actors,
            directors,
            writers,
            details,
            posterURL,
        ];
        e.map((x) => {
            console.log(x);
        });
    };

    return (
        <div id="movieCont">
            <div id="moviePoster">
                <img id="poster" src={posterURL} alt="" />
            </div>
            <div id="movieDetails">
                <div id="movieDetail">
                    <h1 id="movieTitle">{title}</h1>
                    <div id="movieRating">
                        <h1>Rating: {rating}</h1>
                        <h1>Release date: {released}</h1>
                    </div>
                    <div className="movieFlexDiv">
                        <h1>Genre: </h1>
                        {genres}
                    </div>
                    <div className="movieFlexDiv">
                        <h1>Director</h1> {directors}
                    </div>
                    <div className="movieFlexDiv">
                        <h1>Writer:</h1> {writers}
                    </div>
                    <div className="movieFlexDiv">
                        <h1>Actors:</h1> {actors}
                    </div>
                    <div className="movieFlexDiv">
                        <h1>Plot:</h1> {plot}
                    </div>
                    <div className="movieFlexDiv">
                        <h1>Running time:</h1> {time}
                    </div>
                    <div className="movieFlexDiv">
                        <h1>Awards and Nominations:</h1> {awards}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movie;
