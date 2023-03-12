import axios from "axios";

export async function tmdb(x) {
    // top rated, upcoming, theatres, popular
    if (x === "theatres") {
        await axios
            .get(
                "https://api.themoviedb.org/3/movie/now_playing?api_key=c4aa72a3b011582e85cbcc03fe277717&language=en-US&page=3"
            )
            .then((response) => {
                console.log(response.data.results);
                return response.data.results;
            })
            .catch((err) => {
                console.log("error of tmdb fetching theatres", err);
            });
    } else if (x === "popular") {
        await axios
            .get(
                "https://api.themoviedb.org/3/movie/popular?api_key=c4aa72a3b011582e85cbcc03fe277717&language=en-US&page=3"
            )
            .then((response) => {
                console.log(response.data.results);
                return response.data.results;
            })
            .catch((err) => {
                console.log("error of tmdb fetching popular", err);
            });
    } else if (x === "top rated") {
        await axios
            .get(
                "https://api.themoviedb.org/3/movie/top_rated?api_key=c4aa72a3b011582e85cbcc03fe277717&language=en-US&page=3"
            )
            .then((response) => {
                console.log(response.data.results);
                return response.data.results;
            })
            .catch((err) => {
                console.log("error of tmdb fetching top rated", err);
            });
    } else if (x === "upcoming") {
        await axios
            .get(
                "https://api.themoviedb.org/3/movie/upcoming?api_key=c4aa72a3b011582e85cbcc03fe277717&language=en-US&page=3"
            )
            .then((response) => {
                console.log(response.data.results);
                return response.data.results;
            })
            .catch((err) => {
                console.log("error of tmdb fetching upcoming", err);
            });
    }
}
