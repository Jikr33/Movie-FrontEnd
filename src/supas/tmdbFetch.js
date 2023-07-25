import axios from "axios";

const tmdb_api = process.env.REACT_APP_TMDB_API

export async function tmdb(x, setFeat, features = [], page = 1) {
    // top rated, upcoming, theatres, popular
    console.log("tmdb called,", x, features, page);
    if (x === "theatres") {
        await axios
            .get(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdb_api}&language=en-US&page=${page}`
            )
            .then((response) => {
                // console.log(response.data.results, "page number -", page);
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
                `https://api.themoviedb.org/3/movie/popular?api_key=${tmdb_api}&language=en-US&page=${page}`
            )
            .then((response) => {
                // console.log(response.data.results);
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
                `https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdb_api}&language=en-US&page=${page}`
            )
            .then((response) => {
                // console.log(response.data.results);
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
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdb_api}&language=en-US&page=${page}`
            )
            .then((response) => {
                // console.log(response.data.results);
                setFeat(features.concat(response.data.results));
                return response.data.results;
            })
            .catch((err) => {
                console.log("error of tmdb fetching upcoming", err);
            });
    }
}
