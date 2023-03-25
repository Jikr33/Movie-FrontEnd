import axios from "axios";

export async function tmdb(x, setFeat, features = [], page = 1) {
    // top rated, upcoming, theatres, popular
    console.log("tmdb called,", x, features, page);
    if (x === "theatres") {
        await axios
            .get(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=c4aa72a3b011582e85cbcc03fe277717&language=en-US&page=${page}`
            )
            .then((response) => {
                console.log(response.data.results, "page number -", page);
                // setFeat(response.data.results);
                setFeat(features.concat(response.data.results));
                return response.data.results;
            })
            .catch((err) => {
                console.log("error of tmdb fetching theatres", err);
                return err;
            });
    } else if (x === "popular") {
        await axios
            .get(
                `https://api.themoviedb.org/3/movie/popular?api_key=c4aa72a3b011582e85cbcc03fe277717&language=en-US&page=${page}`
            )
            .then((response) => {
                console.log(response.data.results);
                // setFeat(response.data.results);
                setFeat(features.concat(response.data.results));

                return response.data.results;
            })
            .catch((err) => {
                console.log("error of tmdb fetching popular", err);
            });
    } else if (x === "toprated") {
        await axios
            .get(
                `https://api.themoviedb.org/3/movie/top_rated?api_key=c4aa72a3b011582e85cbcc03fe277717&language=en-US&page=${page}`
            )
            .then((response) => {
                console.log(response.data.results);
                // setFeat(response.data.results);
                setFeat(features.concat(response.data.results));

                return response.data.results;
            })
            .catch((err) => {
                console.log("error of tmdb fetching top rated", err);
            });
    } else if (x === "upcoming") {
        await axios
            .get(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=c4aa72a3b011582e85cbcc03fe277717&language=en-US&page=${page}`
            )
            .then((response) => {
                console.log(response.data.results);
                setFeat(features.concat(response.data.results));
                return response.data.results;
            })
            .catch((err) => {
                console.log("error of tmdb fetching upcoming", err);
            });
    }
}
