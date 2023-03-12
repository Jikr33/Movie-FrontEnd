import React from "react";
import { useState, useEffect } from "react";
import Result from "./result";
import { Link, redirect } from "react-router-dom";
import Modal from "react-modal";
import CryptoJS from "crypto-js";
import { SupabaseRegister } from "./supas/supabaseRegister";
import { SupabaseLogin } from "./supas/supabaseLogin";
import { SupabaseUser } from "./supas/supabaseUser";
import { SupabaseForgotPass } from "./supas/supabaseForgotPass";
import { tmdb } from "./supas/tmdbFetch";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import Swiper JS
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

function Home() {
    localStorage.setItem("name", "");
    const [name, setName] = useState("");
    const [valid, setValid] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [button, setButton] = useState("Log In");
    const userID = localStorage.getItem("userId");

    const [feature, setFeature] = useState("");
    const [features, setFeatures] = useState([
        {
            adult: false,
            backdrop_path: "/pt2zfjKf8vAOi7yd40HnewTNJyN.jpg",
            genre_ids: [37],
            id: 754452,
            original_language: "en",
            original_title: "The Last Manhunt",
            overview:
                "In 1909, Willie Boy and his love Carlota go on the run after he accidentally shoots her father in a confrontation gone terribly wrong. With President Taft coming to the area, the local sheriff leads two Native American trackers seeking justice for their “murdered” tribal leader.",
            popularity: 392.148,
            poster_path: "/95Bn6HZBBJcG7LOBMAzNH0gmLih.jpg",
            release_date: "2022-11-18",
            title: "The Last Manhunt",
            video: false,
            vote_average: 6.1,
            vote_count: 20,
        },
        {
            adult: false,
            backdrop_path: "/9MwjblYesldq7kfPRSgLpjfaO8q.jpg",
            genre_ids: [27],
            id: 887379,
            original_language: "es",
            original_title: "Luz Mala",
            overview:
                "A winter night. An isolated house in a small town. Two warring sides must join forces to survive an evil tied to one of the field's oldest legends.",
            popularity: 433.296,
            poster_path: "/yMZdLhcbszstxmdOH4cuuMxaSM7.jpg",
            release_date: "2022-11-17",
            title: "Luz Mala",
            video: false,
            vote_average: 3.5,
            vote_count: 2,
        },
        {
            adult: false,
            backdrop_path: "/Aqldsq65Nj1KAkQD2MzkZsAk5N5.jpg",
            genre_ids: [28, 53, 18],
            id: 846433,
            original_language: "es",
            original_title: "The Enforcer",
            overview:
                "A noir thriller set in Miami, the film follows an enforcer who discovers his femme fatale boss has branched out into cyber sex trafficking, putting a young runaway he’s befriended at risk. He sacrifices everything to save the young girl from the deadly organization he’s spent his life building.",
            popularity: 444.491,
            poster_path: "/pXC8JJbfnRWtbD8i2yKFqqWEO4X.jpg",
            release_date: "2022-09-22",
            title: "The Enforcer",
            video: false,
            vote_average: 7.3,
            vote_count: 254,
        },
        {
            adult: false,
            backdrop_path: "/bZ6hEHRoOB5wGkRm9P8AchduODu.jpg",
            genre_ids: [10752, 28, 18],
            id: 966220,
            original_language: "uk",
            original_title: "Снайпер. Білий ворон",
            overview:
                "Mykola is an eccentric pacifist who wants to be useful to humanity. When the war begins at Donbass, Mykola’s naive world is collapsing as the militants kill his pregnant wife and burn his home to the ground. Recovered, he makes a cardinal decision and gets enlisted in a sniper company. Having met his wife’s killers, he emotionally breaks down and arranges “sniper terror” for the enemy. He’s saved from a senseless death by his instructor who himself gets mortally wounded. The death of a friend leaves a “scar” and Mykola is ready to sacrifice his life.",
            popularity: 396.318,
            poster_path: "/lZOODJzwuQo0etJJyBBZJOSdZcW.jpg",
            release_date: "2022-05-03",
            title: "Sniper: The White Raven",
            video: false,
            vote_average: 7.6,
            vote_count: 320,
        },
        {
            adult: false,
            backdrop_path: "/isGINC82PZmMblEJP2rBAvSlX37.jpg",
            genre_ids: [16, 10751, 12, 35],
            id: 599019,
            original_language: "ru",
            original_title: "Большое путешествие. Специальная доставка",
            overview:
                "It has been a year since Mic Mic and Oscar returned from their incredible adventure. And now, after a diabolical plan by Vulture to sabotage the delivery of the Grizzly cub to his opponent in the American presidential elections, Mic Mic, Oscar, Panda teenager and Stork set off on another great adventure as they ride a zeppelin to return little Grizzly to its rightful parents and save the American elections and the whole continent from an erupting volcano.",
            popularity: 408.14,
            poster_path: "/dabXVfrAFfhDte8XVemom3mTJog.jpg",
            release_date: "2022-10-07",
            title: "Big Trip 2: Special Delivery",
            video: false,
            vote_average: 6.6,
            vote_count: 49,
        },
        {
            adult: false,
            backdrop_path: "/6VX3TrYBtnMOHp3v44lIWWnEp7N.jpg",
            genre_ids: [14, 10751, 35, 12],
            id: 852096,
            original_language: "en",
            original_title: "We Have a Ghost",
            overview:
                "After Kevin finds a ghost named Ernest haunting his new home, he becomes an overnight social media sensation. But when Kevin and Ernest go rogue to investigate the mystery of the latter's past, they become targets of the CIA.",
            popularity: 392.106,
            poster_path: "/xo0fgAUoEeVQ7KsKeMWypyglvnf.jpg",
            release_date: "2023-02-24",
            title: "We Have a Ghost",
            video: false,
            vote_average: 6.5,
            vote_count: 226,
        },
        {
            adult: false,
            backdrop_path: "/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg",
            genre_ids: [14, 28, 35],
            id: 616037,
            original_language: "en",
            original_title: "Thor: Love and Thunder",
            overview:
                "After his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods, Thor Odinson enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster, who now wields Mjolnir as the Mighty Thor. Together they embark upon a harrowing cosmic adventure to uncover the mystery of the God Butcher’s vengeance and stop him before it’s too late.",
            popularity: 449.249,
            poster_path: "/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
            release_date: "2022-07-06",
            title: "Thor: Love and Thunder",
            video: false,
            vote_average: 6.6,
            vote_count: 5522,
        },
        {
            adult: false,
            backdrop_path: "/qjGrUmKW78MCFG8PTLDBp67S27p.jpg",
            genre_ids: [16, 28, 12, 14, 53],
            id: 635302,
            original_language: "ja",
            original_title: "劇場版「鬼滅の刃」無限列車編",
            overview:
                "Tanjiro Kamado, joined with Inosuke Hashibira, a boy raised by boars who wears a boar's head, and Zenitsu Agatsuma, a scared boy who reveals his true power when he sleeps, boards the Infinity Train on a new mission with the Fire Hashira, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!",
            popularity: 485.422,
            poster_path: "/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg",
            release_date: "2020-10-16",
            title: "Demon Slayer -Kimetsu no Yaiba- The Movie: Mugen Train",
            video: false,
            vote_average: 8.3,
            vote_count: 2973,
        },
        {
            adult: false,
            backdrop_path: "/xTYGN1b3XkOtODryXTKgdXLtPMz.jpg",
            genre_ids: [18, 28],
            id: 480530,
            original_language: "en",
            original_title: "Creed II",
            overview:
                "Between personal obligations and training for his next big fight against an opponent with ties to his family's past, Adonis Creed is up against the challenge of his life.",
            popularity: 374.109,
            poster_path: "/v3QyboWRoA4O9RbcsqH8tJMe8EB.jpg",
            release_date: "2018-11-21",
            title: "Creed II",
            video: false,
            vote_average: 7,
            vote_count: 4607,
        },
        {
            adult: false,
            backdrop_path: "/sxQuWAUnyZCSJnjXhcGrCP6ASUy.jpg",
            genre_ids: [18, 27, 53],
            id: 931954,
            original_language: "es",
            original_title: "Venus",
            overview:
                "Lucía, a club dancer on the run, takes refuge in a sinister building on the outskirts of Madrid where her sister Rocío lives with her daughter Alba.",
            popularity: 397.713,
            poster_path: "/vyQmDx5CF8x9T6WKCLuoFotGpjf.jpg",
            release_date: "2022-12-02",
            title: "Venus",
            video: false,
            vote_average: 5.5,
            vote_count: 65,
        },
        {
            adult: false,
            backdrop_path: "/xTsERrOCW15OIYl5aPX7Jbj38wu.jpg",
            genre_ids: [28, 18, 36],
            id: 724495,
            original_language: "en",
            original_title: "The Woman King",
            overview:
                "The story of the Agojie, the all-female unit of warriors who protected the African Kingdom of Dahomey in the 1800s with skills and a fierceness unlike anything the world has ever seen, and General Nanisca as she trains the next generation of recruits and readies them for battle against an enemy determined to destroy their way of life.",
            popularity: 362.043,
            poster_path: "/438QXt1E3WJWb3PqNniK0tAE5c1.jpg",
            release_date: "2022-09-16",
            title: "The Woman King",
            video: false,
            vote_average: 7.8,
            vote_count: 1320,
        },
        {
            adult: false,
            backdrop_path: "/jDkmlTz9xBmhsIIyORb68VqRlL2.jpg",
            genre_ids: [27],
            id: 955991,
            original_language: "en",
            original_title: "The Offering",
            overview:
                "In the wake of a young Jewish girl’s disappearance, the son of a Hasidic funeral director returns home with his pregnant wife in hopes of reconciling with his father. Little do they know that directly beneath them in the family morgue, an ancient evil with sinister plans for the unborn child lurks inside a mysterious corpse.",
            popularity: 389.95,
            poster_path: "/tbaTFgGIaTL1Uhd0SMob6Dhi5cK.jpg",
            release_date: "2022-09-23",
            title: "The Offering",
            video: false,
            vote_average: 5.6,
            vote_count: 102,
        },
        {
            adult: false,
            backdrop_path: "/tsjXBo4LmzV0Bb9hdrz25tzX5GD.jpg",
            genre_ids: [10402],
            id: 1041513,
            original_language: "en",
            original_title: "Encanto at the Hollywood Bowl",
            overview:
                "A taped performance of the Encanto Live-to-Film Concert Experience at the Hollywood Bowl. The original cast puts on a miracle of a concert as they sing the favorite songs, accompanied by a full orchestra and 50 person ensemble, and the Hollywood Bowl transforms into Casita!",
            popularity: 382.27,
            poster_path: "/sa3Ku5yNVjp8NloWxJoI9dQjvOi.jpg",
            release_date: "2022-12-28",
            title: "Encanto at the Hollywood Bowl",
            video: false,
            vote_average: 7.4,
            vote_count: 103,
        },
        {
            adult: false,
            backdrop_path: "/ql4PnvKYKaMtdx9Ck4fHY2wJphT.jpg",
            genre_ids: [35, 18, 10749],
            id: 32516,
            original_language: "cn",
            original_title: "金瓶梅2 愛的奴隸",
            overview:
                "Rich and powerful Simon Qing has been schooled in the ways of sex by his virile father, but is still a virgin. That is, until he meets his first love Violetta who has fun with him all over his father’s estate. Their love does not last, so Simon embarks on a journey. Along the way he meets the comely nun Moon whom Simon deflowers and then marries. He then becomes enamored of Golden Lotus but she is married to dwarf Wu Da-Lang.",
            popularity: 380.005,
            poster_path: "/A1yymig7S0FTWv9cTtOwdI1cH5V.jpg",
            release_date: "2009-03-04",
            title: "The Forbidden Legend: Sex & Chopsticks 2",
            video: false,
            vote_average: 6,
            vote_count: 54,
        },
        {
            adult: false,
            backdrop_path: "/nWs0auTqn2UaFGfTKtUE5tlTeBu.jpg",
            genre_ids: [10751, 35, 14],
            id: 668482,
            original_language: "en",
            original_title: "Roald Dahl's Matilda the Musical",
            overview:
                "An extraordinary young girl discovers her superpower and summons the remarkable courage, against all odds, to help others change their stories, whilst also taking charge of her own destiny. Standing up for what's right, she's met with miraculous results.",
            popularity: 384.731,
            poster_path: "/ga8R3OiOMMgSvZ4cOj8x7prUNYZ.jpg",
            release_date: "2022-11-25",
            title: "Roald Dahl's Matilda the Musical",
            video: false,
            vote_average: 6.9,
            vote_count: 518,
        },
        {
            adult: false,
            backdrop_path: "/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg",
            genre_ids: [28, 18],
            id: 361743,
            original_language: "en",
            original_title: "Top Gun: Maverick",
            overview:
                "After more than thirty years of service as one of the Navy’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.",
            popularity: 353.447,
            poster_path: "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
            release_date: "2022-05-24",
            title: "Top Gun: Maverick",
            video: false,
            vote_average: 8.3,
            vote_count: 6264,
        },
        {
            adult: false,
            backdrop_path: "/sBOenwOZGRN5nZZGw4TxwtnfrEf.jpg",
            genre_ids: [28, 35, 80, 53],
            id: 899112,
            original_language: "en",
            original_title: "Violent Night",
            overview:
                "When a team of mercenaries breaks into a wealthy family compound on Christmas Eve, taking everyone inside hostage, the team isn’t prepared for a surprise combatant: Santa Claus is on the grounds, and he’s about to show why this Nick is no saint.",
            popularity: 359.183,
            poster_path: "/1XSYOP0JjjyMz1irihvWywro82r.jpg",
            release_date: "2022-11-30",
            title: "Violent Night",
            video: false,
            vote_average: 7.6,
            vote_count: 1271,
        },
        {
            adult: false,
            backdrop_path: "/cRdA9xjHBbobw4LJFsQ3j1CgpVq.jpg",
            genre_ids: [27],
            id: 663712,
            original_language: "en",
            original_title: "Terrifier 2",
            overview:
                "After being resurrected by a sinister entity, Art the Clown returns to Miles County where he must hunt down and destroy a teenage girl and her younger brother on Halloween night.  As the body count rises, the siblings fight to stay alive while uncovering the true nature of Art's evil intent.",
            popularity: 388.717,
            poster_path: "/8gLhu8UFPZfH2Hv11JhTZkb9CVl.jpg",
            release_date: "2022-10-06",
            title: "Terrifier 2",
            video: false,
            vote_average: 6.9,
            vote_count: 1054,
        },
        {
            adult: false,
            backdrop_path: "/5fxTB08O7CW1hAcN2MWOKodp1h1.jpg",
            genre_ids: [18, 35],
            id: 615777,
            original_language: "en",
            original_title: "Babylon",
            overview:
                "A tale of outsized ambition and outrageous excess, tracing the rise and fall of multiple characters in an era of unbridled decadence and depravity during Hollywood's transition from silent films and to sound films in the late 1920s.",
            popularity: 345.906,
            poster_path: "/wjOHjWCUE0YzDiEzKv8AfqHj3ir.jpg",
            release_date: "2022-12-22",
            title: "Babylon",
            video: false,
            vote_average: 7.6,
            vote_count: 1304,
        },
        {
            adult: false,
            backdrop_path: "/cU7itLM8qmwMiaNnWsJPQLKe79j.jpg",
            genre_ids: [878, 27, 12, 28],
            id: 1013870,
            original_language: "en",
            original_title: "Kids vs. Aliens",
            overview:
                "All Gary wants is to make awesome home movies with his best buds. All his older sister Samantha wants is to hang with the cool kids. When their parents head out of town one Halloween weekend, an all-time rager of a teen house party turns to terror when aliens attack, forcing the siblings to band together to survive the night.",
            popularity: 367.552,
            poster_path: "/wQ53sO5n9LCFbssV3oQ4CuajL1L.jpg",
            release_date: "2023-01-20",
            title: "Kids vs. Aliens",
            video: false,
            vote_average: 6,
            vote_count: 42,
        },
    ]);
    const [topRated, setTopRated] = useState([
        {
            adult: false,
            backdrop_path: "/dMZxEdrWIzUmUoOz2zvmFuutbj7.jpg",
            genre_ids: [12, 28, 878],
            id: 1891,
            original_language: "en",
            original_title: "The Empire Strikes Back",
            overview:
                "The epic saga continues as Luke Skywalker, in hopes of defeating the evil Galactic Empire, learns the ways of the Jedi from aging master Yoda. But Darth Vader is more determined than ever to capture Luke. Meanwhile, rebel leader Princess Leia, cocky Han Solo, Chewbacca, and droids C-3PO and R2-D2 are thrown into various stages of capture, betrayal and despair.",
            popularity: 28.328,
            poster_path: "/2l05cFWJacyIsTpsqSgH0wQXe4V.jpg",
            release_date: "1980-05-20",
            title: "The Empire Strikes Back",
            video: false,
            vote_average: 8.4,
            vote_count: 15111,
        },
        {
            adult: false,
            backdrop_path: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
            genre_ids: [12, 18, 878],
            id: 157336,
            original_language: "en",
            original_title: "Interstellar",
            overview:
                "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
            popularity: 162.497,
            poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            release_date: "2014-11-05",
            title: "Interstellar",
            video: false,
            vote_average: 8.4,
            vote_count: 30749,
        },
        {
            adult: false,
            backdrop_path: "/nC3IjYhUgZWgfKfFX0ygMigFwgc.jpg",
            genre_ids: [28, 18, 36],
            id: 14537,
            original_language: "ja",
            original_title: "切腹",
            overview:
                "Down-on-his-luck veteran Tsugumo Hanshirō enters the courtyard of the prosperous House of Iyi. Unemployed, and with no family, he hopes to find a place to commit seppuku—and a worthy second to deliver the coup de grâce in his suicide ritual. The senior counselor for the Iyi clan questions the ronin’s resolve and integrity, suspecting Hanshirō of seeking charity rather than an honorable end. What follows is a pair of interlocking stories which lay bare the difference between honor and respect, and promises to examine the legendary foundations of the Samurai code.",
            popularity: 20.035,
            poster_path: "/w7pWcLaYQkbtRUn99K6ome0DblL.jpg",
            release_date: "1962-09-15",
            title: "Harakiri",
            video: false,
            vote_average: 8.4,
            vote_count: 750,
        },
        {
            adult: false,
            backdrop_path: "/rl7Jw8PjhSIjArOlDNv0JQPL1ZV.jpg",
            genre_ids: [10749, 18],
            id: 851644,
            original_language: "ko",
            original_title: "20세기 소녀",
            overview:
                "Yeon-du asks her best friend Bora to collect all the information she can about Baek Hyun-jin while she is away in the U.S. for heart surgery. Bora decides to get close to Baek's best friend, Pung Woon-ho first. However, Bora's clumsy plan unfolds in an unexpected direction. In 1999, a year before the new century, Bora, who turns seventeen, falls into the fever of first love.",
            popularity: 154.984,
            poster_path: "/od22ftNnyag0TTxcnJhlsu3aLoU.jpg",
            release_date: "2022-10-06",
            title: "20th Century Girl",
            video: false,
            vote_average: 8.4,
            vote_count: 407,
        },
        {
            adult: false,
            backdrop_path: "/dVr11o9or7AS8AMPfwjSpEU83iU.jpg",
            genre_ids: [18, 10752],
            id: 423,
            original_language: "en",
            original_title: "The Pianist",
            overview:
                "The true story of pianist Władysław Szpilman's experiences in Warsaw during the Nazi occupation. When the Jews of the city find themselves forced into a ghetto, Szpilman finds work playing in a café; and when his family is deported in 1942, he stays behind, works for a while as a laborer, and eventually goes into hiding in the ruins of the war-torn city.",
            popularity: 48.01,
            poster_path: "/2hFvxCCWrTmCYwfy7yum0GKRi3Y.jpg",
            release_date: "2002-09-17",
            title: "The Pianist",
            video: false,
            vote_average: 8.4,
            vote_count: 7903,
        },
        {
            adult: false,
            backdrop_path: "/i1GT0e6Crg6UezT3ibXnMS3pBAd.jpg",
            genre_ids: [16, 18, 10749],
            id: 652837,
            original_language: "ja",
            original_title: "ジョゼと虎と魚たち",
            overview:
                "With dreams of diving abroad, Tsuneo gets a job assisting Josee, an artist whose imagination takes her far beyond her wheelchair. But when the tide turns against them, they push each other to places they never thought possible, and inspire a love fit for a storybook.",
            popularity: 39.951,
            poster_path: "/z1D8xi9x4uEhyFruo7uEHXUMD4K.jpg",
            release_date: "2020-12-25",
            title: "Josee, the Tiger and the Fish",
            video: false,
            vote_average: 8.4,
            vote_count: 322,
        },
        {
            adult: false,
            backdrop_path: "/fRGxZuo7jJUWQsVg9PREb98Aclp.jpg",
            genre_ids: [18, 10402],
            id: 244786,
            original_language: "en",
            original_title: "Whiplash",
            overview:
                "Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, even his humanity.",
            popularity: 65.233,
            poster_path: "/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
            release_date: "2014-10-10",
            title: "Whiplash",
            video: false,
            vote_average: 8.4,
            vote_count: 13196,
        },
        {
            adult: false,
            backdrop_path: "/jxEdvdiBpEevKiCWidpwRvDK2LY.jpg",
            genre_ids: [35, 18, 14],
            id: 40096,
            original_language: "pt",
            original_title: "O Auto da Compadecida",
            overview:
                "The lively João Grilo and the sly Chicó are poor guys living in the hinterland who cheat a bunch of people in a small in Northeastern Brazil. When they die, they have to be judged by Christ, the Devil and the Virgin Mary before they are admitted to paradise.",
            popularity: 9.459,
            poster_path: "/imcOp1kJsCsAFCoOtY5OnPrFbAf.jpg",
            release_date: "2000-09-15",
            title: "A Dog's Will",
            video: false,
            vote_average: 8.4,
            vote_count: 965,
        },
        {
            adult: false,
            backdrop_path: "/kWYfW2Re0rUDE6IHhy4CRuKWeFr.jpg",
            genre_ids: [12, 14, 28],
            id: 121,
            original_language: "en",
            original_title: "The Lord of the Rings: The Two Towers",
            overview:
                "Frodo and Sam are trekking to Mordor to destroy the One Ring of Power while Gimli, Legolas and Aragorn search for the orc-captured Merry and Pippin. All along, nefarious wizard Saruman awaits the Fellowship members at the Orthanc Tower in Isengard.",
            popularity: 87.778,
            poster_path: "/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg",
            release_date: "2002-12-18",
            title: "The Lord of the Rings: The Two Towers",
            video: false,
            vote_average: 8.4,
            vote_count: 19430,
        },
        {
            adult: false,
            backdrop_path: "/p47ihFj4A7EpBjmPHdTj4ipyq1S.jpg",
            genre_ids: [18],
            id: 599,
            original_language: "en",
            original_title: "Sunset Boulevard",
            overview:
                "A hack screenwriter writes a screenplay for a former silent film star who has faded into Hollywood obscurity.",
            popularity: 18.431,
            poster_path: "/sC4Dpmn87oz9AuxZ15Lmip0Ftgr.jpg",
            release_date: "1950-08-10",
            title: "Sunset Boulevard",
            video: false,
            vote_average: 8.4,
            vote_count: 2167,
        },
        {
            adult: false,
            backdrop_path: "/hh28CTWLdxTXA5yJgefZ6gUnFDo.jpg",
            genre_ids: [80, 9648, 53],
            id: 807,
            original_language: "en",
            original_title: "Se7en",
            overview:
                'Two homicide detectives are on a desperate hunt for a serial killer whose crimes are based on the "seven deadly sins" in this dark and haunting film that takes viewers from the tortured remains of one victim to the next. The seasoned Det. Sommerset researches each sin in an effort to get inside the killer\'s mind, while his novice partner, Mills, scoffs at his efforts to unravel the case.',
            popularity: 48.883,
            poster_path: "/69Sns8WoET6CfaYlIkHbla4l7nC.jpg",
            release_date: "1995-09-22",
            title: "Se7en",
            video: false,
            vote_average: 8.4,
            vote_count: 18464,
        },
        {
            adult: false,
            backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
            genre_ids: [28, 878, 12],
            id: 27205,
            original_language: "en",
            original_title: "Inception",
            overview:
                "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
            popularity: 86.251,
            poster_path: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
            release_date: "2010-07-15",
            title: "Inception",
            video: false,
            vote_average: 8.4,
            vote_count: 33297,
        },
        {
            adult: false,
            backdrop_path: "/AfyuI3glMCBDFmNPj9PY6DwbgGp.jpg",
            genre_ids: [18, 16, 878, 28],
            id: 18491,
            original_language: "ja",
            original_title:
                "新世紀エヴァンゲリオン劇場版 Air／まごころを、君に",
            overview:
                "The second of two theatrically released follow-ups to the Neon Genesis Evangelion series. Comprising of two alternate episodes which were first intended to take the place of episodes 25 and 26, this finale answers many of the questions surrounding the series, while also opening up some new possibilities.",
            popularity: 33.767,
            poster_path: "/j6G24dqI4WgUtChhWjfnI4lnmiK.jpg",
            release_date: "1997-07-19",
            title: "Neon Genesis Evangelion: The End of Evangelion",
            video: false,
            vote_average: 8.4,
            vote_count: 1253,
        },
        {
            adult: false,
            backdrop_path: "/aQ7444JX7gefPhGJTlvilj3zG2S.jpg",
            genre_ids: [10402],
            id: 553512,
            original_language: "ko",
            original_title: "번 더 스테이지: 더 무비",
            overview:
                "A documentary following the worldwide famous music group BTS, as they tour the world and share their experience along with their beloved band friends and fans.",
            popularity: 13.327,
            poster_path: "/pJKy1yvnKh8UjcuYeG3Rt35xHFA.jpg",
            release_date: "2018-11-15",
            title: "Burn the Stage: The Movie",
            video: false,
            vote_average: 8.4,
            vote_count: 393,
        },
        {
            adult: false,
            backdrop_path: "/zGs5tZOlvc9cprdcU6kDOVNpujf.jpg",
            genre_ids: [53, 9648],
            id: 567,
            original_language: "en",
            original_title: "Rear Window",
            overview:
                "A wheelchair-bound photographer spies on his neighbors from his apartment window and becomes convinced one of them has committed murder.",
            popularity: 21.637,
            poster_path: "/qitnZcLP7C9DLRuPpmvZ7GiEjJN.jpg",
            release_date: "1954-08-01",
            title: "Rear Window",
            video: false,
            vote_average: 8.4,
            vote_count: 5594,
        },
        {
            adult: false,
            backdrop_path: "/9LSsSPbP715XT9B7acIZzantPyX.jpg",
            genre_ids: [18],
            id: 73,
            original_language: "en",
            original_title: "American History X",
            overview:
                "Derek Vineyard is paroled after serving 3 years in prison for killing two African-American men. Through his brother, Danny Vineyard's narration, we learn that before going to prison, Derek was a skinhead and the leader of a violent white supremacist gang that committed acts of racial crime throughout L.A. and his actions greatly influenced Danny. Reformed and fresh out of prison, Derek severs contact with the gang and becomes determined to keep Danny from going down the same violent path as he did.",
            popularity: 34.389,
            poster_path: "/c2gsmSQ2Cqv8zosqKOCwRS0GFBS.jpg",
            release_date: "1998-07-01",
            title: "American History X",
            video: false,
            vote_average: 8.4,
            vote_count: 10246,
        },
        {
            adult: false,
            backdrop_path: "/5qtOVAcBFogwktkseoZSfZVq6bx.jpg",
            genre_ids: [18],
            id: 3782,
            original_language: "ja",
            original_title: "生きる",
            overview:
                "Kanji Watanabe is a middle-aged man who has worked in the same monotonous bureaucratic position for decades. Learning he has cancer, he starts to look for the meaning of his life.",
            popularity: 15.287,
            poster_path: "/dgNTS4EQDDVfkzJI5msKuHu2Ei3.jpg",
            release_date: "1952-10-09",
            title: "Ikiru",
            video: false,
            vote_average: 8.4,
            vote_count: 889,
        },
        {
            adult: false,
            backdrop_path: "/8AMKZODrCvWe2sCy9Ts7VsLcKd6.jpg",
            genre_ids: [35, 10752],
            id: 914,
            original_language: "en",
            original_title: "The Great Dictator",
            overview:
                "Dictator Adenoid Hynkel tries to expand his empire while a poor Jewish barber tries to avoid persecution from Hynkel's regime.",
            popularity: 17.502,
            poster_path: "/1QpO9wo7JWecZ4NiBuu625FiY1j.jpg",
            release_date: "1940-10-15",
            title: "The Great Dictator",
            video: false,
            vote_average: 8.4,
            vote_count: 2867,
        },
        {
            adult: false,
            backdrop_path: "/l5K9elugftlcyIHHm4nylvsn26X.jpg",
            genre_ids: [18, 10751],
            id: 255709,
            original_language: "ko",
            original_title: "소원",
            overview:
                "After 8-year-old So-won narrowly survives a brutal sexual assault, her family labors to help her heal while coping with their own rage and grief.",
            popularity: 31.642,
            poster_path: "/1xXaGHQYZGh1RBjP8yTl7vjW6qZ.jpg",
            release_date: "2013-10-02",
            title: "Hope",
            video: false,
            vote_average: 8.3,
            vote_count: 495,
        },
        {
            adult: false,
            backdrop_path: "/aYcnDyLMnpKce1FOYUpZrXtgUye.jpg",
            genre_ids: [80, 18, 53],
            id: 274,
            original_language: "en",
            original_title: "The Silence of the Lambs",
            overview:
                "Clarice Starling is a top student at the FBI's training academy.  Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism.  Crawford believes that Lecter may have insight into a case and that Starling, as an attractive young woman, may be just the bait to draw him out.",
            popularity: 11.316,
            poster_path: "/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg",
            release_date: "1991-02-14",
            title: "The Silence of the Lambs",
            video: false,
            vote_average: 8.3,
            vote_count: 14303,
        },
    ]);
    const [theatres, setTheatres] = useState([
        {
            adult: false,
            backdrop_path: "/6VEcSQCteETPnX5aQySC0vKQhOh.jpg",
            genre_ids: [10749, 35, 18],
            id: 869112,
            original_language: "en",
            original_title: "Somebody I Used to Know",
            overview:
                "On a trip to her hometown, workaholic Ally reminisces with her first love Sean, and starts to question everything about the person she's become. Things only get more confusing when she meets Sean's fiancé, Cassidy, who reminds her of the person she used to be.",
            popularity: 170.288,
            poster_path: "/ovHxxphDgjyEpYriDoGoIHfrdZL.jpg",
            release_date: "2023-02-10",
            title: "Somebody I Used to Know",
            video: false,
            vote_average: 6,
            vote_count: 73,
        },
        {
            adult: false,
            backdrop_path: "/5HpDmq6nWTRCcvRynYKqgfLtqMb.jpg",
            genre_ids: [14, 28, 35],
            id: 594767,
            original_language: "en",
            original_title: "Shazam! Fury of the Gods",
            overview:
                'Billy Batson and his foster siblings, who transform into superheroes by saying "Shazam!", are forced to get back into action and fight the Daughters of Atlas, who they must stop from using a weapon that could destroy the world.',
            popularity: 186.938,
            poster_path: "/zpCCTtuQMHiHycpsrWnW2eCrBql.jpg",
            release_date: "2023-03-15",
            title: "Shazam! Fury of the Gods",
            video: false,
            vote_average: 0,
            vote_count: 0,
        },
        {
            adult: false,
            backdrop_path: "/A5JyEZvXHbPLN2cU65oB9NaIuYH.jpg",
            genre_ids: [53, 9648, 18, 27],
            id: 768362,
            original_language: "en",
            original_title: "Missing",
            overview:
                "When her mother disappears while on vacation in Colombia with her new boyfriend, June’s search for answers is hindered by international red tape. Stuck thousands of miles away in Los Angeles, June creatively uses all the latest technology at her fingertips to try and find her before it’s too late. But as she digs deeper, her digital sleuthing raises more questions than answers... and when June unravels secrets about her mom, she discovers that she never really knew her at all.",
            popularity: 262.669,
            poster_path: "/wEOUYSU5Uf8J7152PT6jdb5233Y.jpg",
            release_date: "2023-01-19",
            title: "Missing",
            video: false,
            vote_average: 7.8,
            vote_count: 95,
        },
        {
            adult: false,
            backdrop_path: "/cG5QZHyIRJXqo53YA41gbNMlpIM.jpg",
            genre_ids: [53, 80, 18],
            id: 717980,
            original_language: "en",
            original_title: "Sharper",
            overview:
                "A small, wealthy family in New York City gets progressively torn apart by secrets, lies, and the theft that orchestrates all of it.",
            popularity: 161.468,
            poster_path: "/tq8x5F17q95T1j0up5rpzXFAylN.jpg",
            release_date: "2023-02-10",
            title: "Sharper",
            video: false,
            vote_average: 7.1,
            vote_count: 175,
        },
        {
            adult: false,
            backdrop_path: "/6ikTLqVFjQvQUC06QBuEHGTbkWH.jpg",
            genre_ids: [878, 53],
            id: 700391,
            original_language: "en",
            original_title: "65",
            overview:
                "After a catastrophic crash on an unknown planet, pilot Mills quickly discovers he's actually stranded on Earth…65 million years ago. Now, with only one chance at rescue, Mills and the only other survivor, Koa, must make their way across an unknown terrain riddled with dangerous prehistoric creatures in an epic fight to survive.",
            popularity: 233.407,
            poster_path: "/uMMIeMVk1TCG3CZilpxbzFh0JKT.jpg",
            release_date: "2023-03-02",
            title: "65",
            video: false,
            vote_average: 6.6,
            vote_count: 5,
        },
        {
            adult: false,
            backdrop_path: "/cSjccCESfkHq2AltVkY3WRYXqdg.jpg",
            genre_ids: [9648, 53, 18],
            id: 850028,
            original_language: "en",
            original_title: "Alice, Darling",
            overview:
                "A young woman trapped in an abusive relationship becomes an unwitting participant in an intervention staged by her two closest friends.",
            popularity: 160.011,
            poster_path: "/ybqS7I4tuMs1TIssvuLMk2lYlLe.jpg",
            release_date: "2022-12-30",
            title: "Alice, Darling",
            video: false,
            vote_average: 6.1,
            vote_count: 51,
        },
        {
            adult: false,
            backdrop_path: "/rzdPqYx7Um4FUZeD8wpXqjAUcEm.jpg",
            genre_ids: [18, 10749],
            id: 597,
            original_language: "en",
            original_title: "Titanic",
            overview:
                "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship. Rose tells the whole story from Titanic's departure through to its death—on its first and last voyage—on April 15, 1912.",
            popularity: 152.566,
            poster_path: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
            release_date: "1997-11-18",
            title: "Titanic",
            video: false,
            vote_average: 7.9,
            vote_count: 22516,
        },
        {
            adult: false,
            backdrop_path: "/2ZpwPckspTSY9sVEkjEyatgBWT7.jpg",
            genre_ids: [53, 18, 27],
            id: 848058,
            original_language: "es",
            original_title: "Cerdita",
            overview:
                "A bullied overweight teenager sees a glimpse of hope when her tormentors are brutally abducted by a mesmerizing stranger.",
            popularity: 159.895,
            poster_path: "/pIFeu5gF7ofAxI9NqrWbJAjjKn6.jpg",
            release_date: "2022-10-07",
            title: "Piggy",
            video: false,
            vote_average: 6.6,
            vote_count: 287,
        },
        {
            adult: false,
            backdrop_path: "/uI1EvYeXNri9BbpcP3YzE4XVUJW.jpg",
            genre_ids: [12, 16, 35, 10751, 14],
            id: 816904,
            original_language: "es",
            original_title: "Momias",
            overview:
                "Through a series of unfortunate events, three mummies end up in present-day London and embark on a wacky and hilarious journey in search of an old ring belonging to the Royal Family, that was stolen by the ambitious archaeologist Lord Carnaby.",
            popularity: 152.123,
            poster_path: "/r6Ghtw9ENhTXfeUsd1Al20ZAvX.jpg",
            release_date: "2023-01-05",
            title: "Mummies",
            video: false,
            vote_average: 6.1,
            vote_count: 20,
        },
        {
            adult: false,
            backdrop_path: "/63CDysgJZb38ZXdw2yF1UuDJgDN.jpg",
            genre_ids: [53],
            id: 979924,
            original_language: "en",
            original_title: "On the Line",
            overview:
                "A provocative and edgy radio host must play a dangerous game of cat and mouse with a mysterious caller who's kidnapped his family and is threatening to blow up the whole station.",
            popularity: 139.893,
            poster_path: "/AewaMdP1TisotuHQxPNUZVaKbyJ.jpg",
            release_date: "2022-10-31",
            title: "On the Line",
            video: false,
            vote_average: 6.2,
            vote_count: 280,
        },
        {
            adult: false,
            backdrop_path: "/9fNVu5TG0V6RVFpv8nzCIisAtBg.jpg",
            genre_ids: [35, 10749],
            id: 676841,
            original_language: "es",
            original_title: "Infelices para Siempre",
            overview:
                "María José and Alfredo are about to celebrate their 20th anniversary and their children give them a trip to the hotel where they celebrated their honeymoon, but a spell will make them repeat the same day.",
            popularity: 151.035,
            poster_path: "/qiAM7Y8xF8wJDDsjeSuLgzyFGmd.jpg",
            release_date: "2023-01-26",
            title: "Infelices para Siempre",
            video: false,
            vote_average: 6.5,
            vote_count: 2,
        },
        {
            adult: false,
            backdrop_path: "/yVpILj2KX3WylLLT49GZbj2M9AO.jpg",
            genre_ids: [10749, 18],
            id: 845659,
            original_language: "en",
            original_title: "Perfect Addiction",
            overview:
                "When successful boxing trainer Sienna Lane discovers that her boyfriend Jax, the reigning champion, has been cheating on her with her own sister, she sets out to get revenge by training the one man capable of dethroning him: his arch-nemesis Kayden.",
            popularity: 138.685,
            poster_path: "/AaLnyYIAmMpHHPzowyoaY5sO2a1.jpg",
            release_date: "2023-02-16",
            title: "Perfect Addiction",
            video: false,
            vote_average: 4.5,
            vote_count: 2,
        },
        {
            adult: false,
            backdrop_path: "/35nt3MwBzW6RYFjoqOU8POQRSib.jpg",
            genre_ids: [28, 53, 27],
            id: 799379,
            original_language: "ko",
            original_title: "늑대사냥",
            overview:
                "While under heavily armed guard, the dangerous convicts aboard a cargo ship unite in a coordinated escape attempt that soon escalates into a bloody, all-out riot. But as the fugitives continue their brutal campaign of terror, they soon discover that not even the most vicious among them is safe from the horror they unknowingly unleashed from the darkness below deck.",
            popularity: 132.996,
            poster_path: "/dniWicB6fa7NvpGbguxWlNPMc5f.jpg",
            release_date: "2022-09-21",
            title: "Project Wolf Hunting",
            video: false,
            vote_average: 6.5,
            vote_count: 98,
        },
        {
            adult: false,
            backdrop_path: "/9FwnUYt9mYnXCfhWL6AWymMsfyT.jpg",
            genre_ids: [18, 36],
            id: 854239,
            original_language: "en",
            original_title: "Till",
            overview:
                "The true story of Mamie Till Mobley’s relentless pursuit of justice for her 14 year old son, Emmett Till, who, in 1955, was lynched while visiting his cousins in Mississippi.",
            popularity: 120.807,
            poster_path: "/cmDs0CYlgioyP2AQQTTmavt3uoO.jpg",
            release_date: "2022-10-14",
            title: "Till",
            video: false,
            vote_average: 7.5,
            vote_count: 113,
        },
        {
            adult: false,
            backdrop_path: "/qAatLCuRhvLyNJbH5IGmxLyU3tx.jpg",
            genre_ids: [16, 14, 12],
            id: 876792,
            original_language: "ja",
            original_title: "劇場版 転生したらスライムだった件 紅蓮の絆編",
            overview:
                "A long-running conspiracy is swirling over a mysterious power wielded by the Queen in Raja, a small country west of Tempest. When a slime who evolved into a Demon Lord named Rimuru Tempest crosses paths with Hiiro, a survivor of the Ogre race, an incredible adventure packed with new characters begins. The power of bonds will be put to the test!",
            popularity: 142.247,
            poster_path: "/pc75KETPdVnqHWCum3mFnmM0nSn.jpg",
            release_date: "2022-11-25",
            title: "That Time I Got Reincarnated as a Slime the Movie: Scarlet Bond",
            video: false,
            vote_average: 7.6,
            vote_count: 60,
        },
        {
            adult: false,
            backdrop_path: "/hUtrCoGrlo3o8juAI1ZzA7F1LX9.jpg",
            genre_ids: [18],
            id: 777245,
            original_language: "en",
            original_title: "Women Talking",
            overview:
                "A group of women in an isolated religious colony struggle to reconcile their faith with a series of sexual assaults committed by the colony's men.",
            popularity: 114.812,
            poster_path: "/twUbb6Irktv0VEsJXQWJ3VKyxFX.jpg",
            release_date: "2022-12-23",
            title: "Women Talking",
            video: false,
            vote_average: 7,
            vote_count: 134,
        },
        {
            adult: false,
            backdrop_path: "/e4V77sv2MvSbGyViKTXDsgR3fl4.jpg",
            genre_ids: [28, 35, 80, 53],
            id: 804150,
            original_language: "en",
            original_title: "Cocaine Bear",
            overview:
                "An oddball group of cops, criminals, tourists and teens converge in a Georgia forest where a 500-pound black bear goes on a murderous rampage after unintentionally ingesting cocaine.",
            popularity: 128.08,
            poster_path: "/gOnmaxHo0412UVr1QM5Nekv1xPi.jpg",
            release_date: "2023-02-22",
            title: "Cocaine Bear",
            video: false,
            vote_average: 7,
            vote_count: 76,
        },
        {
            adult: false,
            backdrop_path: "/h4UJHYhIa80kpN4Ak6rmBQN1C2r.jpg",
            genre_ids: [10749, 35],
            id: 1087771,
            original_language: "es",
            original_title: "Nada Que Ver",
            overview:
                "After Carlos is tasked to care for Paola, both characters must work out their differences to make their time together more pleasant. As time goes on, they are faced with lessons about trust, mutual respect, and perhaps love.",
            popularity: 107.892,
            poster_path: "/ofnOwcG9l1DuGl7vB45JHsfSlR6.jpg",
            release_date: "2023-03-02",
            title: "Nada Que Ver",
            video: false,
            vote_average: 3,
            vote_count: 2,
        },
        {
            adult: false,
            backdrop_path: "/vmDa8HijINCAFYKqsMz0YM3sVyE.jpg",
            genre_ids: [80, 53],
            id: 747803,
            original_language: "en",
            original_title: "One Way",
            overview:
                "On the run with a bag full of cash after a robbing his former crime boss—and a potentially fatal wound—Freddy slips onto a bus headed into the unrelenting California desert. With his life slipping through his fingers, Freddy is left with very few choices to survive.",
            popularity: 121.248,
            poster_path: "/uQCxOziq79P3wDsRwQhhkhQyDsJ.jpg",
            release_date: "2022-09-02",
            title: "One Way",
            video: false,
            vote_average: 6.4,
            vote_count: 88,
        },
        {
            adult: false,
            backdrop_path: "/lInYIBIrx1DxX1Gngy0Ln3SDVYk.jpg",
            genre_ids: [27, 53],
            id: 296271,
            original_language: "en",
            original_title: "The Devil Conspiracy",
            overview:
                "The hottest biotech company in the world has discovered they can clone history’s most influential people from the dead. Now, they are auctioning clones of Michelangelo, Galileo, Vivaldi, and others for tens of millions of dollars to the world’s ultra-rich. But when they steal the Shroud of Turin and clone the DNA of Jesus Christ, all hell breaks loose.",
            popularity: 94.73,
            poster_path: "/1AWcMtUZjpkq4h52yDnNIp9FwEO.jpg",
            release_date: "2023-01-13",
            title: "The Devil Conspiracy",
            video: false,
            vote_average: 6.1,
            vote_count: 17,
        },
    ]);
    const [upcoming, setUpcoming] = useState([
        {
            adult: false,
            backdrop_path: "/rkUAAoBXsqlegp8bLTLZSIsRZbg.jpg",
            genre_ids: [18, 12],
            id: 848112,
            original_language: "es",
            original_title: "Los reyes del mundo",
            overview:
                "Rá, Culebro, Sere, Winny and Nano. Five boys who live on the streets of Medellín. Five kings with no kingdom, no law, no family, set out on a journey in search of the promised land. A subversive tale told through a wild and endearing clan, somewhere between reality and delirium. A journey to nowhere, where everything happens.",
            popularity: 34.054,
            poster_path: "/iK46b6jYIKvaakp7qKt0BKexN53.jpg",
            release_date: "2022-10-13",
            title: "The Kings of the World",
            video: false,
            vote_average: 6.7,
            vote_count: 17,
        },
        {
            adult: false,
            backdrop_path: null,
            genre_ids: [18, 10749],
            id: 1017066,
            original_language: "pl",
            original_title: "Heaven in Hell",
            overview:
                "Olga and Maks are 15 years away. She is a successful woman with an established position, the mother of an adult daughter, he is a handsome young man who enjoys his life in a handful and lives only in the moment. It might seem that these two different worlds will never meet, and yet fate put them in the way.",
            popularity: 44.675,
            poster_path: "/rvWpNIkOYQb4nd4wF8rw8wifF0G.jpg",
            release_date: "2023-02-10",
            title: "Heaven in Hell",
            video: false,
            vote_average: 1.6,
            vote_count: 4,
        },
        {
            adult: false,
            backdrop_path: "/nlTqPDbkfbWbqmLAsUPniKerUXW.jpg",
            genre_ids: [16, 18, 10749, 35],
            id: 865767,
            original_language: "ja",
            original_title: "ブルーサーマル",
            overview:
                "Arriving from Nagasaki with her wishful mantra is Tamaki Tsuru, who in high school could think only about volleyball. Things don’t begin well, however, when she looks for an extracurricular club to join and proceeds to immediately ding a glider at aviation club tryouts ending up having to work it off. She is initially disillusioned with campus life. Then Kuramochi, the club leader and glider pilot, takes Tamaki under his wing, and from the moment he takes her up for a flight in a glider, Tamaki becomes a captive of the vast beauty of the skies.",
            popularity: 39.461,
            poster_path: "/xUIX9FA9t4S2SgnPpTcGp9LH3Uz.jpg",
            release_date: "2022-03-04",
            title: "Blue Thermal",
            video: false,
            vote_average: 5.5,
            vote_count: 11,
        },
        {
            adult: false,
            backdrop_path: "/uHmvk8FnoxpgujDU0RIXLkv2fNt.jpg",
            genre_ids: [16, 35, 12, 10751],
            id: 573164,
            original_language: "es",
            original_title: "Un rescate de huevitos",
            overview:
                "Toto and his friends must rescue his egg children after they're taken away for a gourmet food event in Africa.",
            popularity: 35.866,
            poster_path: "/tiy4jEbUixPdvgaaqCEKtIB6K9U.jpg",
            release_date: "2021-08-12",
            title: "An Egg Rescue",
            video: false,
            vote_average: 7.9,
            vote_count: 337,
        },
        {
            adult: false,
            backdrop_path: "/h1jF78eKPrqejbXe3OHQ2KxmTJ9.jpg",
            genre_ids: [35, 10749],
            id: 972230,
            original_language: "en",
            original_title: "Maybe I Do",
            overview:
                "Michelle and Allen, who have reached the point in their relationship where they are considering next steps, decide to invite  their parents to finally meet and to offer some understanding of why marriage works. Except the parents already know each other quite well, which leads to some very distinct opinions about the value of marriage.",
            popularity: 32.908,
            poster_path: "/vj649F5QB3OQbTKqpMX3UiCkp5q.jpg",
            release_date: "2023-01-27",
            title: "Maybe I Do",
            video: false,
            vote_average: 5.2,
            vote_count: 30,
        },
        {
            adult: false,
            backdrop_path: "/dom8lzl2iU46nDu6s4lBolBNjQs.jpg",
            genre_ids: [18, 35],
            id: 736732,
            original_language: "ko",
            original_title: "브로커",
            overview:
                "Sang-hyeon is always struggling from debt, and Dong-soo works at a baby box facility. On a rainy night, they steal the baby Woo-sung, who was left in the baby box, to sell him at a good price. Meanwhile, detectives were watching, and they quietly track them down to capture the crucial evidence.",
            popularity: 39.267,
            poster_path: "/ulGCgWnidH9LJTRL9rMV23cLtQb.jpg",
            release_date: "2022-06-08",
            title: "Broker",
            video: false,
            vote_average: 7.2,
            vote_count: 199,
        },
        {
            adult: false,
            backdrop_path: "/w09WqUUi0iyNU0PvyxTlnMnFUwj.jpg",
            genre_ids: [35, 18, 36, 9648],
            id: 977506,
            original_language: "fr",
            original_title: "Mon Crime",
            overview:
                "In 1930s Paris, a pretty, young and penniless actress is accused of murdering a famous producer. Helped by her best friend, a jobless lawyer, she is acquitted on the grounds of self-defense and becomes a star, as well as a feminist icon.",
            popularity: 22.902,
            poster_path: "/A1ABwrOmR9rRBOBKfUsYKYpOhDd.jpg",
            release_date: "2023-03-08",
            title: "The Crime Is Mine",
            video: false,
            vote_average: 6.3,
            vote_count: 6,
        },
        {
            adult: false,
            backdrop_path: "/zw9UdaETZUO8JR1sGutexxiRpEU.jpg",
            genre_ids: [53, 18],
            id: 848685,
            original_language: "gl",
            original_title: "As bestas",
            overview:
                "Antoine and Olga, a French couple, have been living in a small village in Galicia for a long time. They practice eco-responsible agriculture and restore abandoned houses to facilitate repopulation. Everything should be idyllic but for their opposition to a wind turbine project that creates a serious conflict with their neighbors. The tension will rise to the point of irreparability.",
            popularity: 30.494,
            poster_path: "/vTwyQUStzo5TuIsYDUi17usotNQ.jpg",
            release_date: "2022-07-20",
            title: "The Beasts",
            video: false,
            vote_average: 7.5,
            vote_count: 302,
        },
        {
            adult: false,
            backdrop_path: "/foc0hOprAdNpk1auscKqtipMtT5.jpg",
            genre_ids: [18, 53, 9648, 28],
            id: 670,
            original_language: "ko",
            original_title: "올드보이",
            overview:
                "With no clue how he came to be imprisoned, drugged and tortured for 15 years, a desperate businessman seeks revenge on his captors.",
            popularity: 29.459,
            poster_path: "/5sTFaTUudsI96PfwYuVhPKxKu28.jpg",
            release_date: "2003-11-21",
            title: "Oldboy",
            video: false,
            vote_average: 8.3,
            vote_count: 7324,
        },
        {
            adult: false,
            backdrop_path: "/Xfn9eDOaZKSz5W3PRoJI928I9c.jpg",
            genre_ids: [28, 18, 12],
            id: 875104,
            original_language: "zh",
            original_title: "叶问宗师觉醒",
            overview:
                "When a young Master Ip stops a kidnapping, he ignites a turf war with a ruthless human trafficking ring. In retaliation, the gang kidnaps one of Ip Man’s close friends, forcing him to face the group’s brutal boxing champion head-on.",
            popularity: 33.393,
            poster_path: "/A7vhdyGrpPMKXsuFBZzxmave94F.jpg",
            release_date: "2021-09-16",
            title: "Ip Man: The Awakening",
            video: false,
            vote_average: 7.1,
            vote_count: 60,
        },
        {
            adult: false,
            backdrop_path: "/3UmGXadwnVQAssXjdG6XqXSzDAC.jpg",
            genre_ids: [18],
            id: 785398,
            original_language: "pl",
            original_title: "IO",
            overview:
                "The world is a mysterious place when seen through the eyes of an animal. EO, a grey donkey with melancholic eyes, meets good and bad people on his life’s path, experiences joy and pain, endures the wheel of fortune randomly turn his luck into disaster and his despair into unexpected bliss. But not even for a moment does he lose his innocence.",
            popularity: 31.572,
            poster_path: "/1MK86Vr2nf1GSYOtRd8pFvA5RM8.jpg",
            release_date: "2022-09-30",
            title: "EO",
            video: false,
            vote_average: 6.6,
            vote_count: 135,
        },
        {
            adult: false,
            backdrop_path: null,
            genre_ids: [27, 12],
            id: 1073070,
            original_language: "ms",
            original_title: "Pulau",
            overview:
                "The vacation of a group of youngsters turns into an endless horrifying nightmare after a losing bet forces them to spend a night on a deserted island.  As they stumble upon a mysterious abandoned village there, they accidentally break an old spell that was placed to restrain an antagonizing spirit trapped in the island. One by one, they are made to suffer the gripping and gruesome consequences of their mistakes,  infuriating an evil creature that needs human blood to stay alive. The only way out is in the hands of a girl who desperately needs to use her supernatural gift to untangle an unsettling history connected to a tainted cross-cultural love story.",
            popularity: 25.657,
            poster_path: "/fT6l5XWO9EoZx0T18VMXsJagcEV.jpg",
            release_date: "2023-03-09",
            title: "Pulau",
            video: false,
            vote_average: 0,
            vote_count: 0,
        },
        {
            adult: false,
            backdrop_path: "/rcBXFdb7Q4hdN8kV7tZ631y9TFs.jpg",
            genre_ids: [35],
            id: 868985,
            original_language: "es",
            original_title: "¡Que viva México!",
            overview:
                "It is a film that pretends to be a metaphor for an entire country and that questions our values, desires, and, above all, our idiosyncrasies; all this with a lot of black humor and framed in that little personal hell to which we all belong and that, for better or for worse, we all have: Family",
            popularity: 26.291,
            poster_path: "/gcqmgfqKZy0ieTx2vhmzTwrlBRT.jpg",
            release_date: "2023-03-23",
            title: "¡Que viva México!",
            video: false,
            vote_average: 0,
            vote_count: 0,
        },
        {
            adult: false,
            backdrop_path: "/zHyw4M8a7jWmQsnsmDTlY2ydSsr.jpg",
            genre_ids: [18],
            id: 957461,
            original_language: "es",
            original_title: "1976",
            overview:
                "Chile, 1976. Carmen heads off to her beach house to supervise its renovation. Her husband, children and grandchildren come back and forth during the winter vacation. When the family priest asks her to take care of a young man he is sheltering in secret, Carmen steps onto unexplored territories, away from the quiet life she is used to.",
            popularity: 19.766,
            poster_path: "/e8cO013usqWgawu520n1OdmX3jp.jpg",
            release_date: "2022-10-20",
            title: "Chile '76",
            video: false,
            vote_average: 7.5,
            vote_count: 6,
        },
        {
            adult: false,
            backdrop_path: "/xhJ9E1uYT7KO3gjdpUO2SCzR9dL.jpg",
            genre_ids: [18],
            id: 916405,
            original_language: "ga",
            original_title: "An Cailín Ciúin",
            overview:
                "A quiet, neglected girl is sent away from her dysfunctional family to live with relatives for the summer. She blossoms in their care, but in this house where there are meant to be no secrets, she discovers one.",
            popularity: 25.891,
            poster_path: "/kc6GM4gThJpXHE28MuLofDOmRLJ.jpg",
            release_date: "2022-05-13",
            title: "The Quiet Girl",
            video: false,
            vote_average: 7.5,
            vote_count: 104,
        },
        {
            adult: false,
            backdrop_path: "/8mDJ1GqqVgbvYYeaZzbyMCMG78Q.jpg",
            genre_ids: [99, 10402],
            id: 396194,
            original_language: "it",
            original_title: "Ennio",
            overview:
                "A portrait of Ennio Morricone, the most popular and prolific film composer of the 20th century, the one most loved by the international public, a two-time Oscar winner and the author of over five hundred unforgettable scores.",
            popularity: 21.641,
            poster_path: "/pNcFuARwXZ9r04Zoy5bviBmudZM.jpg",
            release_date: "2022-02-17",
            title: "Ennio",
            video: false,
            vote_average: 8.4,
            vote_count: 199,
        },
        {
            adult: false,
            backdrop_path: "/gjWKILGSoS22g4rqOTxDfUHE5oz.jpg",
            genre_ids: [53, 80, 9648],
            id: 925102,
            original_language: "fr",
            original_title: "La Nuit du 12",
            overview:
                "Young and ambitious Captain Vivés has just been appointed group leader at the Grenoble Criminal Squad when Clara's murder case lands on his desk. Vivés and his team investigate Clara's complex life and relations, but what starts as a professional and methodical immersion into the victim's life soon turns into a haunting obsession.",
            popularity: 14.679,
            poster_path: "/q3oWnNcbnWrMnpofDwlN947Bi6B.jpg",
            release_date: "2022-07-13",
            title: "The Night of the 12th",
            video: false,
            vote_average: 7.2,
            vote_count: 270,
        },
        {
            adult: false,
            backdrop_path: "/yc2AtGkfHkYXtxLsNRF1CwBPGgC.jpg",
            genre_ids: [18, 36],
            id: 888321,
            original_language: "de",
            original_title: "Corsage",
            overview:
                "A fictional account of one year in the life of Empress Elisabeth of Austria. On Christmas Eve 1877, Elisabeth, once idolized for her beauty, turns 40 and is officially deemed an old woman; she starts trying to maintain her public image.",
            popularity: 18.575,
            poster_path: "/3G6XFxG8bfuL3r5dH9LRFXeV5z4.jpg",
            release_date: "2022-07-07",
            title: "Corsage",
            video: false,
            vote_average: 6.9,
            vote_count: 86,
        },
        {
            adult: false,
            backdrop_path: "/obVK7bJWLuWwhMefUGyMvmlWe9z.jpg",
            genre_ids: [9648, 53],
            id: 995012,
            original_language: "en",
            original_title: "The Tutor",
            overview:
                "A professional tutor is given an unexpected assignment at a remote manor, and soon finds himself battling his disturbed student’s obsessions, which threaten to expose his darkest secrets and unravel his carefully crafted persona.",
            popularity: 15.274,
            poster_path: "/4gbSI23sXhVzOYOT1YqQEGUhJ0W.jpg",
            release_date: "2023-03-24",
            title: "The Tutor",
            video: false,
            vote_average: 0,
            vote_count: 0,
        },
        {
            adult: false,
            backdrop_path: "/khkjpfWcG7AJ9Tg5yygRODpKzzS.jpg",
            genre_ids: [35, 12],
            id: 893369,
            original_language: "fr",
            original_title: "Jack Mimoun et les secrets de Val Verde",
            overview:
                "Two years after surviving alone on the hostile island of Val Verde, Jack Mimoun has become an adventure star. The book recounting his experience is a bestseller and his television show breaks audience records. He is then approached by the mysterious Aurélie Diaz who will bring Jack Mimoun back to Val Verde to train him in search of the legendary sword of the pirate La Buse. Accompanied by Bruno Quézac, the ambitious but reckless manager of Jack, and Jean-Marc Bastos, a mercenary as disturbed as he is unpredictable, our adventurers will embark on an incredible treasure hunt through the jungle of the island of thousand dangers.",
            popularity: 13.945,
            poster_path: "/vWx3Hi7DZ7VWyjWVf9gySG6Lbq4.jpg",
            release_date: "2022-10-12",
            title: "Jack Mimoun & the Secrets of Val Verde",
            video: false,
            vote_average: 5.5,
            vote_count: 65,
        },
    ]);
    const [current, setCurrent] = useState(
        features.sort((a, b) => a.release_date - b.release_date)
    );

    const [mustLoginModal, setMustLoginModal] = useState(false);
    useEffect(() => {
        if (userID) {
            const loginButtonDiv = document.getElementById("login");
            loginButtonDiv.style.display = "none";
            console.log("User has already logged in - ", userID);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("name", name);
        console.log("set local - ", localStorage.getItem("name"));
    }, [name]);
    const setValue = (s) => {
        setName(s.target.value);
        setValid(() => (s.target.value.length <= 1 ? false : true));
        console.log(s);
    };

    const invalidInput = () => {
        var input = document.getElementById("searchInput");

        console.warn("Movie name must be valid...");
        input.style.borderColor = "red";
        input.style.borderBottomWidth = "5px";
        input.style.animation = "shake";
        input.style.animationDuration = "1.5s";
    };
    const register = () => {
        var confirm = document.getElementById("confirmPass");
        var loginContent = document.getElementById("loginContent");
        var backToLogin = document.getElementById("backToLogin");
        var forgotInputs = document.querySelectorAll(".forgotInputs");
        var minHeight = document.getElementById("minHeightSet");
        backToLogin.style.display = "block";
        confirm.style.display = "block";
        loginContent.style.height = "75%";
        minHeight.style.minHeight = "350px";
        setButton("Register");
        forgotInputs.forEach((x) => {
            x.style.display = "none";
        });
    };
    const forgotPass = () => {
        var confirm = document.getElementById("confirmPass");
        var loginContent = document.getElementById("loginContent");
        var backToLogin = document.getElementById("backToLogin");
        var forgotInputs = document.querySelectorAll(".forgotInputs");
        var minHeight = document.getElementById("minHeightSet");
        backToLogin.style.display = "block";
        confirm.style.display = "block";
        loginContent.style.height = "75%";
        minHeight.style.minHeight = "350px";
        setButton("Confirm New Password");
        forgotInputs.forEach((x) => {
            x.style.display = "none";
        });
    };
    const toLogin = () => {
        var confirm = document.getElementById("confirmPass");
        var pass = document.getElementById("password");
        var loginContent = document.getElementById("loginContent");
        var backToLogin = document.getElementById("backToLogin");
        var forgotInputs = document.querySelectorAll(".forgotInputs");
        confirm.style.border = "none";
        pass.style.border = "none";
        backToLogin.style.display = "none";
        confirm.style.display = "none";
        loginContent.style.height = "65%";
        setButton("Log In");
        forgotInputs.forEach((x) => {
            x.style.display = "block";
        });
    };
    // if modal is closed, button will be Log in
    useEffect(() => {
        setButton("Log In");
    }, []);

    function hashPassword(pass) {
        // Define a key and a iv (initialization vector)
        let key = CryptoJS.enc.Utf8.parse("0123456789abcdef");
        let iv = CryptoJS.enc.Utf8.parse("abcdefghijklmnop");
        // Encrypt the password using AES
        let encrypted = CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(pass),
            key,
            {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            }
        );
        // Return the encrypted password as a hexadecimal string
        return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    }

    const setList = async (x) => {
        // popular, toprated, theatres, upcoming
        switch (x) {
            case "theatres":
                setCurrent(
                    theatres.sort((a, b) => a.release_date - b.release_date)
                );
                break;
            case "popular":
                setCurrent(
                    features.sort((a, b) => a.release_date - b.release_date)
                );
                break;
            case "top rated":
                setCurrent(
                    topRated.sort((a, b) => a.release_date - b.release_date)
                );
                break;
            case "upcoming":
                setCurrent(
                    upcoming.sort((a, b) => a.release_date - b.release_date)
                );
                break;

            default:
                break;
        }
        console.log(x);
        if (x === "theatres") {
            let f = document.getElementById(feature);
            if (f) {
                f.style.backgroundColor = "transparent";
                f.style.color = "rgb(1, 50, 156)";
            }
            var t = document.getElementById("theatres");
            t.style.backgroundColor = "rgb(2, 78, 255)";
            t.style.color = "white";
            setFeature("theatres");
        } else if (x === "popular") {
            let f = document.getElementById(feature);
            if (f) {
                f.style.backgroundColor = "transparent";
                f.style.color = "rgb(1, 50, 156)";
            }
            t = document.getElementById("popular");
            t.style.backgroundColor = "rgb(2, 78, 255)";
            t.style.color = "white";
            setFeature("popular");
        } else if (x === "top rated") {
            let f = document.getElementById(feature);
            if (f) {
                f.style.backgroundColor = "transparent";
                f.style.color = "rgb(1, 50, 156)";
            }
            t = document.getElementById("toprated");
            t.style.backgroundColor = "blue";
            t.style.color = "white";
            setFeature("toprated");
            console.log(t);
        } else if (x === "upcoming") {
            let f = document.getElementById(feature);
            if (f) {
                f.style.backgroundColor = "transparent";
                f.style.color = "rgb(1, 50, 156)";
            }
            t = document.getElementById("upcoming");
            t.style.backgroundColor = "rgb(2, 78, 255)";
            t.style.color = "white";
            setFeature("upcoming");
        }
        return tmdb(x);
    };
    var dedi = "";
    useEffect(() => {
        if (feature === "") {
            setFeature("popular");
            let t = document.getElementById("popular");
            t.backgroundColor = "rgb(2, 78, 255)";
            t.color = "white";
            setList("popular");
        }
        // setFeatures(x);
        // dedi = features.map((x) => {
        //     console.log(x.title);
        //     return <div>{x.title}</div>;
        // });
        // const feats = document.getElementById("features");
        // feats.innerHTML = dedi;
    }, []);

    const loginHandler = async (e) => {
        var v = e.target.value;
        if (v === "Register") {
            var confirm = document.getElementById("confirmPass");
            var pass = document.getElementById("password");
            var user = document.getElementById("username");
            console.log(username, password, confirmPass);
            if (!username) {
                user.style.borderColor = "red";
                user.style.borderWidth = "1px";
            } else {
                if (confirmPass === password) {
                    var hashedPass = hashPassword(password);
                    console.log(hashedPass);
                    var success = await SupabaseRegister(username, hashedPass);
                    if (success) {
                        console.log("Successfully registered.");
                        toLogin();
                    } else {
                        toLogin();
                        alert("User Already Registered");
                        console.log("Did not register. error...");
                    }
                } else {
                    confirm.style.borderWidth = "1px";
                    pass.style.borderWidth = "1px";
                    confirm.style.borderColor = "red";
                    pass.style.borderColor = "red";
                }
            }
        } else if (v === "Log In") {
            var hashedPassLogin = hashPassword(password);
            var successLogin = await SupabaseLogin(username, hashedPassLogin);
            if (successLogin) {
                const loginButtonDiv = document.getElementById("login");
                loginButtonDiv.style.display = "none";
                console.log("Successfully logged in");
                const uid = await SupabaseUser(username);
                setModalState(false);
                localStorage.setItem("userId", uid);
            } else {
                console.log("Password incorrect");
            }
        } else if (v === "Confirm New Password") {
            confirm = document.getElementById("confirmPass");
            pass = document.getElementById("password");
            user = document.getElementById("username");
            console.log(username, password, confirmPass);
            if (username) {
                console.log("username ok");
                if (password === confirmPass) {
                    console.log("password ok");
                    var changeTo = hashPassword(password);
                    var passChanged = await SupabaseForgotPass(
                        username,
                        changeTo
                    );
                    if (passChanged) {
                        console.log(passChanged);
                        alert(
                            "Your password was successfully changed... " +
                                username
                        );
                        toLogin();
                    } else {
                        user.style.border = "2px red solid";
                        pass.style.border = "none";
                        confirm.style.border = "none";
                        alert("User does not exist...");
                    }
                } else {
                    confirm.style.border = "3px red solid";
                    pass.style.border = "3px red solid";
                }
            } else {
                user.style.border = "2px red solid";
            }
        }
    };
    return (
        <div
            id="homeContainer"
            className="bg-cover bg-center bg-no-repeat bg-orange-200"
        >
            <div id="homeSearch">
                <h1 className="capitalize text-amber-900 font-mono font-bold text-3xl h-max w-4/5 pt-2 rounded-full pl-28">
                    Search for Movies. i got you
                </h1>
                <h4 className="capitalize font-mono font-bold text-l h-max w-4/5 pt-2 rounded-full pl-28">
                    Millions of movies, TV shows and people to discover. Explore
                    now.
                </h4>
                <div className="input-group">
                    <div className="homeSearchInput">
                        <input
                            autoFocus
                            type="search"
                            id="searchInput"
                            //  className="form-control"
                            onChange={(e) => setValue(e)}
                            placeholder="Search for a movie or tv show"
                        />
                    </div>
                    {valid ? (
                        <Link
                            id="search-button"
                            className="btn btn-primary text-center text-xl shadow-5"
                            to="result"
                        >
                            Search
                        </Link>
                    ) : (
                        <Link
                            id="search-button"
                            className="btn btn-primary text-center text-xl shadow-5"
                            to=""
                            onClick={() => invalidInput()}
                        >
                            Search
                        </Link>
                    )}
                </div>
                <div id="homeMenu">
                    <Link className="homeMenuLinks" to={"memes"}>
                        memes
                    </Link>
                    {userID ? (
                        <Link className="homeMenuLinks" to={"favorites"}>
                            My Watchlist
                        </Link>
                    ) : (
                        <Link
                            className="homeMenuLinks"
                            onClick={() => setMustLoginModal(true)}
                            to={""}
                        >
                            My Watchlist
                        </Link>
                    )}

                    <button
                        id="login"
                        className="homeMenuLinks"
                        onClick={() => setModalState(true)}
                    >
                        Log In or Register
                    </button>
                </div>
            </div>

            <div id="homeFeatured" className="rounded-md">
                <div id="homeFeatures">
                    <span>
                        <button
                            onClick={() => setList("popular")}
                            id="popular"
                            type="button"
                            class="homeFeatureButton w-fit h-full text-center"
                        >
                            Popular
                        </button>
                        <button
                            onClick={() => setList("top rated")}
                            id="toprated"
                            type="button"
                            class="homeFeatureButton w-fit h-full text-center"
                        >
                            Top Rated
                        </button>
                        <button
                            onClick={() => setList("theatres")}
                            id="theatres"
                            type="button"
                            class="homeFeatureButton w-fit h-full text-center"
                        >
                            In Theatres
                        </button>
                        <button
                            onClick={() => setList("upcoming")}
                            id="upcoming"
                            type="button"
                            class="homeFeatureButton w-fit h-full text-center"
                        >
                            Upcoming
                        </button>
                        <button
                            onClick={() => {
                                console.log(current);
                            }}
                            type="button"
                            class="homeFeatureButton w-fit h-full text-center"
                        >
                            ssss
                        </button>
                    </span>
                </div>
                <div id="features">
                    <div id="homeCarousel">
                        {current.map((x) => {
                            return (
                                <div className="homePosters">
                                    <Link
                                        className="homePoster"
                                        to={"/movie"}
                                        state={{ id: x.id }}
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${x.poster_path}`}
                                            alt=""
                                        />
                                    </Link>

                                    <div className="homePostersInfo">
                                        <Link
                                            to={"/movie"}
                                            state={{ id: x.id }}
                                            className="homePosterTitle"
                                        >
                                            <h1 className="line-clamp-2">
                                                {x["original_title"]}
                                            </h1>
                                            <h1 className="text-yellow-500">
                                                {x["vote_average"]}
                                            </h1>
                                        </Link>
                                        {x["release_date"]}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Modal
                id="loginContent"
                style={customStyles}
                isOpen={modalState}
                onRequestClose={() => setModalState(false)}
                contentLabel="Example Modal"
                ariaHideApp={false}
                shouldCloseOnOverlayClick={true}
            >
                <div style={customStyles.container} id="loginCont">
                    <div id="loginIcon"></div>
                    <div style={customStyles.login} id="minHeightSet">
                        <input
                            id="username"
                            style={customStyles.inputs}
                            type="text"
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            style={customStyles.inputs}
                            type="password"
                            id="password"
                            placeholder="enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            id="confirmPass"
                            style={customStyles.inputs}
                            type="password"
                            placeholder="confirm password"
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />

                        <div style={customStyles.forgotInput}>
                            <button
                                className="forgotInputs"
                                onClick={() => forgotPass()}
                            >
                                forgot password
                            </button>
                            <button
                                className="forgotInputs"
                                onClick={() => register()}
                            >
                                register now
                            </button>
                            <button id="backToLogin" onClick={() => toLogin()}>
                                back to login
                            </button>
                        </div>

                        <input
                            id="loginButton"
                            style={customStyles.loginButton}
                            type="button"
                            value={button}
                            onClick={(e) => loginHandler(e)}
                        />
                    </div>
                </div>
            </Modal>
            <Modal
                id="mustLoginModal"
                isOpen={mustLoginModal}
                onRequestClose={() => setMustLoginModal(false)}
                ariaHideApp={false}
                shouldCloseOnOverlayClick={true}
            >
                <div id='mustLoginCont'>
                    <h4 className="py-2 text-xl font-extrabold">You must login to use this fucking feature!</h4>
                    <div id="mustLoginButtons">
                        <input
                            id="mustLoginButton"
                            type="button"
                            value="Login Now"
                            onClick={() => {
                                setMustLoginModal(false);
                                setModalState(true);
                            }}
                            className="bg-green-500"
                        />
                        <input
                            id="mustLoginButton"
                            type="button"
                            value="Close"
                            onClick={() => setMustLoginModal(false)}
                            className='bg-red-600'
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "30%",
        height: "65%",
        backgroundColor: "rgba(255, 215, 122, 0.79)",
        minHeight: "450px",
    },
    container: {
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    inputs: {
        color: "white",
        width: "90%",
        height: "3rem",
        minHeight: "1.5rem",
        margin: "1rem",
        // backgroundColor: '#FBAB7E',
        backgroundImage: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
        paddingLeft: "1rem",
        borderRadius: "1rem",
        outline: "none",
    },
    loginButton: {
        width: "60%",
        height: "3rem",
        position: "absolute",
        bottom: "0",
        backgroundColor: "green",
        color: "white",
    },
    login: {
        width: "100%",
        height: "100%",
        minHeight: "280px",
        display: "flex",
        flexDirection: "column",
        // justifyContent: 'space-evenly',
        alignItems: "center",
    },
    forgotInput: {
        width: "80%",
        height: "1rem",
        display: "flex",
        justifyContent: "space-evenly",
    },
};

export default Home;
