import axios from "axios";

async function fetchAll(s) {
    if (s.length <= 0) {
        return false;
    }
    var respo = [];
    Object.keys(s).forEach(async (id) => {
        const options = {
            method: "GET",
            url: `https://www.omdbapi.com/?apikey=c7326058&&i=${id}&plot=full`,
        };
        await axios
            .request(options)
            .then(function (response) {
                console.log("this is fetchall", response.data);
                respo.push(response.data);
            })
            .catch(function (error) {
                console.error("fetchall err", error);
            });
    });
    return respo;
}
export default fetchAll;
