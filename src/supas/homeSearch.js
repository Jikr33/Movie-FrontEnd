import axios from "axios";

export default async function search(name, setMovies, page = 1, movies) {
    // var uname = encodeURIComponent(name);
    const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/search/movie?api_key=c4aa72a3b011582e85cbcc03fe277717&language=en-US&query=${name}&page=${page}&include_adult=true`,
    };
    if (name === "" || name.length <= 1) {
        setMovies([]);
        console.log("avoided one api req");
        return true;
    }
    await axios
        .request(options)
        .then((response) => {
            var res = response.data.results;
            // sorting the result
            // res.sort((a, b) => {
            //     return b.release_date - a.release_date;
            // });
            console.log("RESPONSE IRSEN SHUUUUU!!!!", res);
            res.sort(
                (a, b) => new Date(b.release_date) - new Date(a.release_date)
            );
            if (page > 1) {
                setMovies((movies) => [...movies, ...res]);
                console.log(movies);
            } else {
                setMovies(res);
            }
            // setMovies(movies.concat(res));
            if (res.length < 1) {
                console.warn("no movies");
                const warning = document.getElementById("warning");
                warning.style.display = "flex";
            }
        })
        .catch((error) => {
            console.log("Гарсан алдаа______", error);
            console.warn("no movies");
            const warning = document.getElementById("warning");
            warning.style.display = "flex";
        });
}
