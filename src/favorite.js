import axios from "axios";
import { React, useEffect, useState } from "react";
import { SupabaseFavorite } from "./supas/supabaseFavorite";
import { SupabaseUsername } from "./supas/supabaseUsername";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

function Favorite() {
    const userId = localStorage.getItem("userId");
    var [username, setUsername] = useState("");
    // const userName = localStorage.getItem("userId");
    const [ratings, setRatings] = useState([]);
    const [faves, setFaves] = useState([
        {
            Title: "Joker",
            Year: "2016",
            Rated: "Not Rated",
            Released: "12 Aug 2016",
            Runtime: "130 min",
            Genre: "Comedy, Drama",
            Director: "Raju Murugan, Raju Saravanan",
            Writer: "Raju Murugan",
            Actors: "Guru Somasundaram, Ramya Pandian, Gayathri",
            Plot: "Joker is a political satire which criticises the present political absurdities. Mannar Mannan (Protagonist), a rural villager, who self declares himself as President of India, always protests Government for all the absurdities happening around his village. Most of the time he is seen as a Joker. He's trailed at court for his various continuous acts. There comes his past, where he loves a beautiful girl from his near by village. The girl is willing to marry him only if he could build a toilet at his home. Government announces a toilet scheme through which all the villagers will get toilet at their homes throughout India. President plans to visit a village and he chose protagonist's village. What happens when the President comes? is toilet built at their home? did they get married? answers protagonist's act of declaring himself as President. At the end, the audiences are questioned for their involvement in opposing absurdities (who's the real Jokers)!",
            Language: "Tamil",
            Country: "India",
            Awards: "6 wins & 3 nominations",
            Poster: "https://m.media-amazon.com/images/M/MV5BMTg3NzU5Mzg1MF5BMl5BanBnXkFtZTgwODIxMDg4MDI@._V1_SX300.jpg",
            Ratings: [
                {
                    Source: "Internet Movie Database",
                    Value: "8.3/10",
                },
            ],
            Metascore: "N/A",
            imdbRating: "8.3",
            imdbVotes: "3,574",
            imdbID: "tt5611648",
            Type: "movie",
            DVD: "02 Aug 2018",
            BoxOffice: "N/A",
            Production: "N/A",
            Website: "N/A",
            Response: "True",
        },
        {
            Title: "Black Panther: Wakanda Forever",
            Year: "2022",
            Rated: "PG-13",
            Released: "11 Nov 2022",
            Runtime: "161 min",
            Genre: "Action, Adventure, Drama",
            Director: "Ryan Coogler",
            Writer: "Ryan Coogler, Joe Robert Cole, Stan Lee",
            Actors: "Letitia Wright, Lupita Nyong'o, Danai Gurira",
            Plot: "The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T'Challa.",
            Language: "Spanish, Haitian, English, Xhosa, Maya, French",
            Country: "United States",
            Awards: "Nominated for 5 Oscars. 39 wins & 147 nominations total",
            Poster: "https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
            Ratings: [
                {
                    Source: "Internet Movie Database",
                    Value: "6.8/10",
                },
                {
                    Source: "Rotten Tomatoes",
                    Value: "84%",
                },
                {
                    Source: "Metacritic",
                    Value: "67/100",
                },
            ],
            Metascore: "67",
            imdbRating: "6.8",
            imdbVotes: "231,795",
            imdbID: "tt9114286",
            Type: "movie",
            DVD: "01 Feb 2023",
            BoxOffice: "N/A",
            Production: "Walt Disney Pictures",
            Website: "N/A",
            Response: "True",
        },
        {
            Title: "Joker",
            Year: "2021–",
            Rated: "N/A",
            Released: "27 Nov 2021",
            Runtime: "N/A",
            Genre: "Comedy, Reality-TV",
            Director: "N/A",
            Writer: "N/A",
            Actors: "Siamak Ansari, Shakib Shams, Amir Hossein Tehrani",
            Plot: "Some famous Iranian celebrities should make each other laugh in any way, but the main challenge is that they should not laugh. Siamak Ansari is the referee of the program and captures the smallest smile with the cameras.",
            Language: "Persian",
            Country: "Iran",
            Awards: "N/A",
            Poster: "https://m.media-amazon.com/images/M/MV5BMzYzODNiN2YtMjcyZS00ZDU0LThmYzctOWFjMGU3YTUxYzQ0XkEyXkFqcGdeQXVyMTM0MjAwOTM5._V1_SX300.jpg",
            Ratings: [
                {
                    Source: "Internet Movie Database",
                    Value: "6.3/10",
                },
            ],
            Metascore: "N/A",
            imdbRating: "6.3",
            imdbVotes: "4,163",
            imdbID: "tt16409108",
            Type: "series",
            totalSeasons: "5",
            Response: "True",
        },
        {
            Title: "Puss in Boots: The Last Wish",
            Year: "2022",
            Rated: "PG",
            Released: "21 Dec 2022",
            Runtime: "102 min",
            Genre: "Animation, Adventure, Comedy",
            Director: "Joel Crawford, Januel Mercado",
            Writer: "Paul Fisher, Tommy Swerdlow, Tom Wheeler",
            Actors: "Antonio Banderas, Salma Hayek, Harvey Guillén",
            Plot: "When Puss in Boots discovers that his passion for adventure has taken its toll and he has burned through eight of his nine lives, he launches an epic journey to restore them by finding the mythical Last Wish.",
            Language: "English, Spanish",
            Country: "United States",
            Awards: "Nominated for 1 Oscar. 1 win & 51 nominations total",
            Poster: "https://m.media-amazon.com/images/M/MV5BNjMyMDBjMGUtNDUzZi00N2MwLTg1MjItZTk2MDE1OTZmNTYxXkEyXkFqcGdeQXVyMTQ5NjA0NDM0._V1_SX300.jpg",
            Ratings: [
                {
                    Source: "Internet Movie Database",
                    Value: "7.9/10",
                },
                {
                    Source: "Metacritic",
                    Value: "73/100",
                },
            ],
            Metascore: "73",
            imdbRating: "7.9",
            imdbVotes: "69,136",
            imdbID: "tt3915174",
            Type: "movie",
            DVD: "N/A",
            BoxOffice: "N/A",
            Production: "20th Century Fox",
            Website: "N/A",
            Response: "True",
        },
        {
            Title: "Ant-Man and the Wasp: Quantumania",
            Year: "2023",
            Rated: "PG-13",
            Released: "17 Feb 2023",
            Runtime: "125 min",
            Genre: "Action, Adventure, Comedy",
            Director: "Peyton Reed",
            Writer: "Jack Kirby, Jeff Loveness",
            Actors: "Paul Rudd, Evangeline Lilly, Jonathan Majors",
            Plot: "The further adventures of Ant-Man and the Wasp.",
            Language: "English",
            Country: "United States",
            Awards: "1 nomination",
            Poster: "https://m.media-amazon.com/images/M/MV5BMDIzM2FlNTctNjAzZi00YzhkLThjYWQtMDY5Njc0NjdmMGVlXkEyXkFqcGdeQXVyMTUzOTcyODA5._V1_SX300.jpg",
            Ratings: [],
            Metascore: "N/A",
            imdbRating: "N/A",
            imdbVotes: "N/A",
            imdbID: "tt10954600",
            Type: "movie",
            DVD: "N/A",
            BoxOffice: "N/A",
            Production: "N/A",
            Website: "N/A",
            Response: "True",
        },
        {
            Title: "Joker",
            Year: "2019",
            Rated: "R",
            Released: "04 Oct 2019",
            Runtime: "122 min",
            Genre: "Crime, Drama, Thriller",
            Director: "Todd Phillips",
            Writer: "Todd Phillips, Scott Silver, Bob Kane",
            Actors: "Joaquin Phoenix, Robert De Niro, Zazie Beetz",
            Plot: "Arthur Fleck works as a clown and is an aspiring stand-up comic. He has mental health issues, part of which involves uncontrollable laughter. Times are tough and, due to his issues and occupation, Arthur has an even worse time than most. Over time these issues bear down on him, shaping his actions, making him ultimately take on the persona he is more known as...Joker.",
            Language: "English",
            Country: "United States, Canada",
            Awards: "Won 2 Oscars. 122 wins & 239 nominations total",
            Poster: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
            Ratings: [
                {
                    Source: "Internet Movie Database",
                    Value: "8.4/10",
                },
                {
                    Source: "Rotten Tomatoes",
                    Value: "69%",
                },
                {
                    Source: "Metacritic",
                    Value: "59/100",
                },
            ],
            Metascore: "59",
            imdbRating: "8.4",
            imdbVotes: "1,313,700",
            imdbID: "tt7286456",
            Type: "movie",
            DVD: "03 Oct 2019",
            BoxOffice: "$335,477,657",
            Production: "N/A",
            Website: "N/A",
            Response: "True",
        },
    ]);
    
    useEffect(() => {
        userId
            ? console.log(userId, "user has signed in")
            : console.log(userId, "user has not signed in!!!");
        // Supabase(userId);
        fetch();
        console.log(username);
        fetchName();
    }, [username]);

    const fetchName = async () => {
        var s = await SupabaseUsername(userId);
        setUsername(s.toUpperCase());
    };

    const fetchAll = async (s) => {
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
        // s.forEach(async (id) => {});
        // setFaves(respo);
        return respo;
    };
    const fetchOne = async (id) => {
        if (!id) {
            return false;
        }
        const options = {
            method: "GET",
            url: `https://www.omdbapi.com/?apikey=c7326058&&i=${id}&plot=full`,
        };
        await axios
            .request(options)
            .then(function (response) {
                console.log("this is fetchoONE", response.data);
                return response.data;
            })
            .catch(function (error) {
                console.error("fetchall err", error);
            });
    };

    const fetch = async () => {
        const s = await SupabaseFavorite(userId);

        setRatings(s);
        return s;
        // console.log(s);
        // var d = await fetchAll(s);
        // setFaves(d);
    };

    return (
        <div id="contFavorites">
            <div id="contFavorite">
                <span className="relative h-12 w-full flex items-center justify-center bg-yellow-400/80 text-black tracking-widest font-bold">
                    <Link to={"/"} className="absolute left-2">
                        {"< HOME"}
                    </Link>
                    <h1>{username}'s watchlist</h1>
                </span>

                <div id="favorite">
                    {faves && 
                        faves.length > 0 && 
                        faves.map((item, i) => {
                            return (
                                <div className="favoriteItem" key={item.imdbID}>
                                    <img src={item.Poster} alt="." />
                                    <div className="favoriteItemDetails">
                                        <span className="favoriteItemTitle">
                                            <h1 className="text-xl font-medium flex w-4/5 h-full items-center justify-between">
                                                <Link
                                                    className="hover:text-yellow-400"
                                                    to={"/movie"}
                                                    state={{ id: item.imdbID }}
                                                >
                                                    {item.Title} (
                                                    {item.Released})
                                                </Link>
                                            </h1>
                                            <a
                                                className="text-xl hover:text-yellow-300"
                                                href={`https://www.imdb.com/title/${item.imdbID}/`}
                                            >
                                                {item.imdbRating}/10
                                            </a>
                                        </span>
                                        <span className="w-full text-sm">
                                            {item.Rated} | {item.Genre} |{" "}
                                            {item.Runtime}
                                        </span>
                                        <div className="favoriteItemDetail w-full px-2 mt-3">
                                            <h1 className="font-normal text-m line-clamp-3">
                                                {item.Plot}
                                            </h1>
                                            <span className="flex flex-col justify-evenly w-full ml-0 mt-1 text-sm h-16">
                                                <h1>
                                                    Director: {item.Director}
                                                </h1>
                                                <h1>Writer: {item.Writer}</h1>
                                                <h1>Actors: {item.Actors}</h1>
                                            </span>
                                        </div>
                                        <div className="flex w-full h-1/6 items-center w-full px-2">
                                            <h1>Rate this movie : </h1>
                                            <RatingStars
                                                userId={userId}
                                                id={item.imdbID}
                                                rating={ratings[item.imdbID]}
                                            ></RatingStars>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <button
                    onClick={async () => {
                        const s = await fetchAll(ratings);
                        var d = document.getElementById("favorite");
                        setFaves(s);
                        console.log(faves);
                    }}
                >
                    ss
                </button>
            </div>
        </div>
    );
}
export default Favorite;
