import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

function RenderFavoritePosters(props) {
    const userId = localStorage.getItem("userId");
    // const [faves, setFaves] = useState([]);
    const [ratings, setRatings] = useState(props.ratings);
    // const [faves, setFaves] = useState([

    //     {
    //         Title: "Prey for the Devil",
    //         Year: "2022",
    //         Rated: "PG-13",
    //         Released: "28 Oct 2022",
    //         Runtime: "93 min",
    //         Genre: "Horror, Thriller",
    //         Director: "Daniel Stamm",
    //         Writer: "Robert Zappia, Earl Richey Jones, Todd R. Jones",
    //         Actors: "Jacqueline Byers, Debora Zhecheva, Christian Navarro",
    //         Plot: 'According to real-life Vatican reports, occurrences of demonic possession have increased significantly in recent years. In response, the Catholic church has secretly reopened exorcism schools to train priests in the sacred rite. The Devil\'s Light immerses you into the world of one of these schools; humanity\'s last line of defense against the powers of everlasting evil. Jacqueline Byers ("Roadies," "Salvation") stars as Sister Ann, who devoutly believes that performing exorcisms is her calling, despite the fact that historically only priests - not sisters - are allowed to perform them. When one professor senses her special gift, allowing her to be the first nun to study and master the ritual, her own soul will be in danger as the demonic forces she battles reveal a mysterious connection to her traumatic past.',
    //         Language: "English, Bulgarian, Spanish, Latin",
    //         Country: "United States",
    //         Awards: "N/A",
    //         Poster: "https://m.media-amazon.com/images/M/MV5BNzNjNmE4YTktMTZiNS00YTQ0LWExY2YtZTU2MGNiNzBiMzI5XkEyXkFqcGdeQXVyMTA0OTI1NDM2._V1_SX300.jpg",
    //         Ratings: [
    //             {
    //                 Source: "Internet Movie Database",
    //                 Value: "5.2/10",
    //             },
    //             {
    //                 Source: "Rotten Tomatoes",
    //                 Value: "17%",
    //             },
    //             {
    //                 Source: "Metacritic",
    //                 Value: "38/100",
    //             },
    //         ],
    //         Metascore: "38",
    //         imdbRating: "5.2",
    //         imdbVotes: "11,034",
    //         imdbID: "tt9271672",
    //         Type: "movie",
    //         DVD: "13 Dec 2022",
    //         BoxOffice: "$8,254,099",
    //         Production: "Lionsgate",
    //         Website: "N/A",
    //         Response: "True",
    //     },
    //     {
    //         Title: "Malcriados",
    //         Year: "2023",
    //         Rated: "N/A",
    //         Released: "15 Feb 2023",
    //         Runtime: "N/A",
    //         Genre: "Comedy",
    //         Director: "Gabriela Sobarzo",
    //         Writer: "Mirella Granucci, Aníbal Herrera",
    //         Actors: "Renata Notni, Cassandra Sanchez Navarro, Consuelo Duval",
    //         Plot: "N/A",
    //         Language: "Spanish",
    //         Country: "N/A",
    //         Awards: "N/A",
    //         Poster: "https://m.media-amazon.com/images/M/MV5BZTEwMjhiZTQtNDc2NS00YWY0LWJiZDYtMGVmOWY0M2MxYmFhXkEyXkFqcGdeQXVyNTU1MzI3NDM@._V1_SX300.jpg",
    //         Ratings: [],
    //         Metascore: "N/A",
    //         imdbRating: "N/A",
    //         imdbVotes: "N/A",
    //         imdbID: "tt12058412",
    //         Type: "movie",
    //         DVD: "N/A",
    //         BoxOffice: "N/A",
    //         Production: "N/A",
    //         Website: "N/A",
    //         Response: "True",
    //     },
    //     {
    //         Title: "The Super Mario Bros. Movie",
    //         Year: "2023",
    //         Rated: "PG",
    //         Released: "07 Apr 2023",
    //         Runtime: "92 min",
    //         Genre: "Animation, Adventure, Comedy",
    //         Director: "Aaron Horvath, Michael Jelenic",
    //         Writer: "Matthew Fogel",
    //         Actors: "Chris Pratt, Anya Taylor-Joy, Charlie Day",
    //         Plot: "The story of The Super Mario Bros. on their journey through the Mushroom Kingdom",
    //         Language: "English",
    //         Country: "Japan, United States",
    //         Awards: "N/A",
    //         Poster: "https://m.media-amazon.com/images/M/MV5BNGZhYWIyZWUtOTdjZS00ZTc1LWFlZDMtNzU5MTE0OTcyMjg1XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
    //         Ratings: [],
    //         Metascore: "N/A",
    //         imdbRating: "N/A",
    //         imdbVotes: "N/A",
    //         imdbID: "tt6718170",
    //         Type: "movie",
    //         DVD: "N/A",
    //         BoxOffice: "N/A",
    //         Production: "Universal Pictures",
    //         Website: "N/A",
    //         Response: "True",
    //     },
    //     {
    //         Title: "Joker",
    //         Year: "2019",
    //         Rated: "R",
    //         Released: "04 Oct 2019",
    //         Runtime: "122 min",
    //         Genre: "Crime, Drama, Thriller",
    //         Director: "Todd Phillips",
    //         Writer: "Todd Phillips, Scott Silver, Bob Kane",
    //         Actors: "Joaquin Phoenix, Robert De Niro, Zazie Beetz",
    //         Plot: "Arthur Fleck works as a clown and is an aspiring stand-up comic. He has mental health issues, part of which involves uncontrollable laughter. Times are tough and, due to his issues and occupation, Arthur has an even worse time than most. Over time these issues bear down on him, shaping his actions, making him ultimately take on the persona he is more known as...Joker.",
    //         Language: "English",
    //         Country: "United States, Canada",
    //         Awards: "Won 2 Oscars. 122 wins & 239 nominations total",
    //         Poster: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
    //         Ratings: [
    //             {
    //                 Source: "Internet Movie Database",
    //                 Value: "8.4/10",
    //             },
    //             {
    //                 Source: "Rotten Tomatoes",
    //                 Value: "69%",
    //             },
    //             {
    //                 Source: "Metacritic",
    //                 Value: "59/100",
    //             },
    //         ],
    //         Metascore: "59",
    //         imdbRating: "8.4",
    //         imdbVotes: "1,313,700",
    //         imdbID: "tt7286456",
    //         Type: "movie",
    //         DVD: "03 Oct 2019",
    //         BoxOffice: "$335,477,657",
    //         Production: "N/A",
    //         Website: "N/A",
    //         Response: "True",
    //     },
    //     {
    //         Title: "Holly Slept Over",
    //         Year: "2020",
    //         Rated: "Not Rated",
    //         Released: "03 Mar 2020",
    //         Runtime: "87 min",
    //         Genre: "Comedy",
    //         Director: "Joshua Friedlander",
    //         Writer: "Joshua Friedlander",
    //         Actors: "Josh Lawson, Nathalie Emmanuel, Britt Lower",
    //         Plot: "This unconventional comedy follows the relationship struggles of a married couple trying to conceive, their friends who have lost their spark, and the tension that ensues when an old college roommate stays over for the weekend.",
    //         Language: "English",
    //         Country: "United States",
    //         Awards: "N/A",
    //         Poster: "https://m.media-amazon.com/images/M/MV5BYWYxMjA3MTQtNmNhNS00ZjEwLTkyM2MtOWNmNDMxYTMxMWZjXkEyXkFqcGdeQXVyOTU3MjU4ODM@._V1_SX300.jpg",
    //         Ratings: [
    //             {
    //                 Source: "Internet Movie Database",
    //                 Value: "5.6/10",
    //             },
    //         ],
    //         Metascore: "N/A",
    //         imdbRating: "5.6",
    //         imdbVotes: "2,132",
    //         imdbID: "tt7453044",
    //         Type: "movie",
    //         DVD: "02 Mar 2020",
    //         BoxOffice: "N/A",
    //         Production: "N/A",
    //         Website: "N/A",
    //         Response: "True",
    //     },
    //     {
    //         Title: "Venus",
    //         Year: "2022",
    //         Rated: "N/A",
    //         Released: "02 Dec 2022",
    //         Runtime: "100 min",
    //         Genre: "Horror",
    //         Director: "Jaume Balagueró",
    //         Writer: "Fernando Navarro",
    //         Actors: "Ester Expósito, Inés Fernández, Ángela Cremonte",
    //         Plot: "Horror invades the concrete corridors of a cursed apartment complex on the outskirts of Madrid.",
    //         Language: "Spanish",
    //         Country: "United States, Spain",
    //         Awards: "2 nominations",
    //         Poster: "https://m.media-amazon.com/images/M/MV5BZTRlNDk5ZTUtZGY4MC00N2IyLWE0N2UtYzI1ZWQ4MGJkY2QzXkEyXkFqcGdeQXVyMTU1ODc2Mjkz._V1_SX300.jpg",
    //         Ratings: [
    //             {
    //                 Source: "Internet Movie Database",
    //                 Value: "5.5/10",
    //             },
    //             {
    //                 Source: "Rotten Tomatoes",
    //                 Value: "77%",
    //             },
    //         ],
    //         Metascore: "N/A",
    //         imdbRating: "5.5",
    //         imdbVotes: "1,215",
    //         imdbID: "tt15676664",
    //         Type: "movie",
    //         DVD: "N/A",
    //         BoxOffice: "N/A",
    //         Production: "N/A",
    //         Website: "N/A",
    //         Response: "True",
    //     },
    //     {
    //         Title: "Roald Dahl's Matilda the Musical",
    //         Year: "2022",
    //         Rated: "PG",
    //         Released: "25 Dec 2022",
    //         Runtime: "117 min",
    //         Genre: "Comedy, Drama, Family",
    //         Director: "Matthew Warchus",
    //         Writer: "Dennis Kelly, Tim Minchin, Roald Dahl",
    //         Actors: "Alisha Weir, Emma Thompson, Lashana Lynch",
    //         Plot: "Based on the hit award-winning musical and the beloved novel by Roald Dahl, Matilda tells the story about Matilda, a intelligent little girl who is stuck with her nasty parents and her sadist school headmistress. With her kind teacher, revolting classmates, and her huge imagination, she tries to change her destiny.",
    //         Language: "English",
    //         Country: "United Kingdom, United States",
    //         Awards: "Nominated for 2 BAFTA 2 wins & 9 nominations total",
    //         Poster: "https://m.media-amazon.com/images/M/MV5BZDQyMDEwOTMtYzQ4Ny00NGVmLWI5NWYtMTQ3ODE2MGNlN2Y4XkEyXkFqcGdeQXVyMTA1OTcyNDQ4._V1_SX300.jpg",
    //         Ratings: [
    //             {
    //                 Source: "Internet Movie Database",
    //                 Value: "7.1/10",
    //             },
    //             {
    //                 Source: "Metacritic",
    //                 Value: "72/100",
    //             },
    //         ],
    //         Metascore: "72",
    //         imdbRating: "7.1",
    //         imdbVotes: "19,368",
    //         imdbID: "tt3447590",
    //         Type: "movie",
    //         DVD: "N/A",
    //         BoxOffice: "N/A",
    //         Production: "N/A",
    //         Website: "N/A",
    //         Response: "True",
    //     },
    //     {
    //         Title: "Puss in Boots: The Last Wish",
    //         Year: "2022",
    //         Rated: "PG",
    //         Released: "21 Dec 2022",
    //         Runtime: "102 min",
    //         Genre: "Animation, Adventure, Comedy",
    //         Director: "Joel Crawford, Januel Mercado",
    //         Writer: "Paul Fisher, Tommy Swerdlow, Tom Wheeler",
    //         Actors: "Antonio Banderas, Salma Hayek, Harvey Guillén",
    //         Plot: "When Puss in Boots discovers that his passion for adventure has taken its toll and he has burned through eight of his nine lives, he launches an epic journey to restore them by finding the mythical Last Wish.",
    //         Language: "English, Spanish",
    //         Country: "United States",
    //         Awards: "Nominated for 1 Oscar. 1 win & 51 nominations total",
    //         Poster: "https://m.media-amazon.com/images/M/MV5BNjMyMDBjMGUtNDUzZi00N2MwLTg1MjItZTk2MDE1OTZmNTYxXkEyXkFqcGdeQXVyMTQ5NjA0NDM0._V1_SX300.jpg",
    //         Ratings: [
    //             {
    //                 Source: "Internet Movie Database",
    //                 Value: "7.9/10",
    //             },
    //             {
    //                 Source: "Metacritic",
    //                 Value: "73/100",
    //             },
    //         ],
    //         Metascore: "73",
    //         imdbRating: "7.9",
    //         imdbVotes: "69,136",
    //         imdbID: "tt3915174",
    //         Type: "movie",
    //         DVD: "N/A",
    //         BoxOffice: "N/A",
    //         Production: "20th Century Fox",
    //         Website: "N/A",
    //         Response: "True",
    //     },
    // ]);

    // var faves = []
    // useEffect(() => {
    //     setFaves(props.faves);
    //     console.log("props faves changed.", props.faves);
    // }, [props.faves]);
    const [faves, setFaves] = useState(props.faves);
    useEffect(() => {
        setRatings(props.ratings);
        console.log(props.ratings);
    }, [props.ratings]);
    useEffect(() => {
        setFaves(props.faves);
    }, [props.faves, faves]);

    return (
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
                                            {item.Title} ({item.Released})
                                        </Link>
                                    </h1>
                                    <a
                                        className="text-xl hover:text-yellow-300"
                                        href={`https://www.imdb.com/title/${item.imdbID}/`}
                                    >
                                        {item.imdbRating}/10
                                    </a>
                                </span>
                                <span className="favoriteItemTitle2 w-full text-sm">
                                    {item.Rated} | {item.Genre} | {item.Runtime}
                                </span>
                                <div className="favoriteItemDetail w-full px-2 mt-3">
                                    <h1 className="font-normal text-m line-clamp-3">
                                        {item.Plot}
                                    </h1>
                                    <span className="flex flex-col justify-evenly w-full ml-0 mt-1 text-sm h-16">
                                        <h1>Director: {item.Director}</h1>
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
            <button
                onClick={() => {
                    console.log(faves);
                }}
            >
                ss
            </button>
        </div>
    );
}
export default RenderFavoritePosters;
