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
    const [newDetails, setNewDetails] = useState({});
    const search = async () => {
        await axios
            .get(`https://movie-backend-8isc.onrender.com/api/v1/movies/get/${id}`)
            .then((response) => {
                console.log("RESPONSE IRSEN SHUUUUU!!!!", response.data.result);
                setDetails(response.data.result);
            })
            .catch((error) => {
                console.log("Гарсан алдаа______", error);
            });
    };
    var uselessDatas = [
        "released",
        "score",
        "score_average",
        "traktid",
        "tmdbid",
        "apiused",
        "backdrop",
        "certification",
        "commonsense",
        "response",
        "spoken_language",
        "status",
        "streams",
        "watch_providers",
    ];
    useEffect(() => {
        if (!details) {
            console.warn("no movie found -> ", details);
            // const warning = document.getElementById("warning");
            // warning.style.display = "flex";
        }
        for (const key in details) {
            if (uselessDatas.includes(key)) {
                delete details[key];
            } else {
                // setNewDetails({...newDetails, key: details[key]})
                setNewDetails((currentState) => {
                    return { ...currentState, key: details[key] };
                });
                console.log(newDetails, details[key]);
            }
        }
    }, [details]);
    useEffect(() => {
        search();
    }, []);

    return (
        <div>
            <div>
                <p>Hello, {details.title}</p>
                {newDetails.length > 0 && (
                    <ul>
                        {newDetails.map((x) => (
                            <li key={x}>{x}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Movie;
