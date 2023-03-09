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
            backdrop_path: "/hegMHNsxYGlGgVgaGz9FqxPqImr.jpg",
            genre_ids: [27, 9648, 53],
            id: 631842,
            original_language: "en",
            original_title: "Knock at the Cabin",
            overview:
                "While vacationing at a remote cabin, a young girl and her two fathers are taken hostage by four armed strangers who demand that the family make an unthinkable choice to avert the apocalypse. With limited access to the outside world, the family must decide what they believe before all is lost.",
            popularity: 4112.616,
            poster_path: "/dm06L9pxDOL9jNSK4Cb6y139rrG.jpg",
            release_date: "2023-02-01",
            title: "Knock at the Cabin",
            video: false,
            vote_average: 6.5,
            vote_count: 670,
        },
        {
            adult: false,
            backdrop_path: "/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
            genre_ids: [28, 12, 878],
            id: 505642,
            original_language: "en",
            original_title: "Black Panther: Wakanda Forever",
            overview:
                "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
            popularity: 2678.485,
            poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
            release_date: "2022-11-09",
            title: "Black Panther: Wakanda Forever",
            video: false,
            vote_average: 7.4,
            vote_count: 3708,
        },
        {
            adult: false,
            backdrop_path: "/b1Y8SUb12gPHCSSSNlbX4nB3IKy.jpg",
            genre_ids: [16, 12, 35],
            id: 315162,
            original_language: "en",
            original_title: "Puss in Boots: The Last Wish",
            overview:
                "Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.",
            popularity: 2311.833,
            poster_path: "/kuf6dutpsT0vSVehic3EZIqkOBt.jpg",
            release_date: "2022-12-07",
            title: "Puss in Boots: The Last Wish",
            video: false,
            vote_average: 8.4,
            vote_count: 4159,
        },
        {
            adult: false,
            backdrop_path: "/irwQcdjwtjLnaA0iErabab9PrmG.jpg",
            genre_ids: [28, 12, 53],
            id: 646389,
            original_language: "en",
            original_title: "Plane",
            overview:
                "After a heroic job of successfully landing his storm-damaged aircraft in a war zone, a fearless pilot finds himself between the agendas of multiple militias planning to take the plane and its passengers hostage.",
            popularity: 2001.922,
            poster_path: "/qi9r5xBgcc9KTxlOLjssEbDgO0J.jpg",
            release_date: "2023-01-12",
            title: "Plane",
            video: false,
            vote_average: 6.9,
            vote_count: 717,
        },
        {
            adult: false,
            backdrop_path: "/A2avUoNFstnBhAnHiogXQs4c9Bt.jpg",
            genre_ids: [18, 27, 9648],
            id: 772515,
            original_language: "es",
            original_title: "Huesera",
            overview:
                "Valeria's joy at becoming a first-time mother is quickly taken away when she's cursed by a sinister entity. As danger closes in, she's forced deeper into a chilling world of dark magic that threatens to consume her.",
            popularity: 1514.435,
            poster_path: "/1mZcxuL4GLUvPdEXC4iZPjG2EO3.jpg",
            release_date: "2023-02-10",
            title: "Huesera: The Bone Woman",
            video: false,
            vote_average: 6.6,
            vote_count: 40,
        },
        {
            adult: false,
            backdrop_path: "/k4V6EvpcOsu8CX10JD0H53lFXLq.jpg",
            genre_ids: [53, 28, 18, 80],
            id: 1058949,
            original_language: "en",
            original_title: "Little Dixie",
            overview:
                "Erstwhile Special Forces operative Doc Alexander is asked to broker a truce with the Mexican drug cartel in secrecy. When Oklahoma Governor Richard Jeffs celebrates the execution of a high-ranking cartel member on TV, his Chief of Staff and Doc inform him about the peace he just ended. But it’s too late, as Cuco, the cartel’s hatchet man, has set his vengeful sights on Doc’s daughter Dixie.",
            popularity: 1538.518,
            poster_path: "/cmWTZj9zzT9KFt3XyL0gssL7Ig8.jpg",
            release_date: "2023-02-03",
            title: "Little Dixie",
            video: false,
            vote_average: 6.2,
            vote_count: 33,
        },
        {
            adult: false,
            backdrop_path: "/af1tFYzzT2mHIy2l7nTIU8PWfak.jpg",
            genre_ids: [80, 18, 53],
            id: 842942,
            original_language: "en",
            original_title: "Bandit",
            overview:
                "After escaping a Michigan prison, a charming career criminal assumes a new identity in Canada and goes on to rob a record 59 banks and jewellery stores while being hunted by a rogue task force. Based on the story of The Flying Bandit.",
            popularity: 1272.966,
            poster_path: "/yph9PAbmjYPvyvbeZvdYIhCZHEu.jpg",
            release_date: "2022-09-23",
            title: "Bandit",
            video: false,
            vote_average: 6.6,
            vote_count: 83,
        },
        {
            adult: false,
            backdrop_path: "/ovM06PdF3M8wvKb06i4sjW3xoww.jpg",
            genre_ids: [878, 12, 28],
            id: 76600,
            original_language: "en",
            original_title: "Avatar: The Way of Water",
            overview:
                "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
            popularity: 1144.966,
            poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
            release_date: "2022-12-14",
            title: "Avatar: The Way of Water",
            video: false,
            vote_average: 7.7,
            vote_count: 5556,
        },
        {
            adult: false,
            backdrop_path: "/jYbABnXml6XyQ7cfhZFkMRZvMQz.jpg",
            genre_ids: [80, 28],
            id: 823999,
            original_language: "it",
            original_title: "Diabolik - Ginko all'attacco!",
            overview:
                "Diabolik nearly gets caught in Inspector Ginko's latest trap, leaving his partner in crime Eva Kant behind in the escape. Furious, Eva offers Ginko her help in capturing the King of Terror, but the former has to face the return of an old flame of his: Altea, Duchess of Vallenberg.",
            popularity: 1188.531,
            poster_path: "/31MkuLvT1CfGn7RYorWrqEY7NEM.jpg",
            release_date: "2022-11-17",
            title: "Diabolik - Ginko all'attacco!",
            video: false,
            vote_average: 5.8,
            vote_count: 46,
        },
        {
            adult: false,
            backdrop_path: "/dlrWhn0G3AtxYUx2D9P2bmzcsvF.jpg",
            genre_ids: [878, 27, 35],
            id: 536554,
            original_language: "en",
            original_title: "M3GAN",
            overview:
                "A brilliant toy company roboticist uses artificial intelligence to develop M3GAN, a life-like doll programmed to emotionally bond with her newly orphaned niece. But when the doll's programming works too well, she becomes overprotective of her new friend with terrifying results.",
            popularity: 1117.018,
            poster_path: "/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg",
            release_date: "2022-12-28",
            title: "M3GAN",
            video: false,
            vote_average: 7.5,
            vote_count: 1844,
        },
        {
            adult: false,
            backdrop_path: "/zGoZB4CboMzY1z4G3nU6BWnMDB2.jpg",
            genre_ids: [28, 10749, 35],
            id: 758009,
            original_language: "en",
            original_title: "Shotgun Wedding",
            overview:
                "Darcy and Tom gather their families for the ultimate destination wedding but when the entire party is taken hostage, “’Til Death Do Us Part” takes on a whole new meaning in this hilarious, adrenaline-fueled adventure as Darcy and Tom must save their loved ones—if they don’t kill each other first.",
            popularity: 1030.834,
            poster_path: "/t79ozwWnwekO0ADIzsFP1E5SkvR.jpg",
            release_date: "2022-12-28",
            title: "Shotgun Wedding",
            video: false,
            vote_average: 6.4,
            vote_count: 565,
        },
        {
            adult: false,
            backdrop_path: "/3JSoB7eMbCd8sE8alxNiUtrNiTz.jpg",
            genre_ids: [12, 878, 35],
            id: 640146,
            original_language: "en",
            original_title: "Ant-Man and the Wasp: Quantumania",
            overview:
                "Super-Hero partners Scott Lang and Hope van Dyne, along with with Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter Cassie Lang, find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that will push them beyond the limits of what they thought possible.",
            popularity: 1001.154,
            poster_path: "/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg",
            release_date: "2023-02-15",
            title: "Ant-Man and the Wasp: Quantumania",
            video: false,
            vote_average: 6.5,
            vote_count: 819,
        },
        {
            adult: false,
            backdrop_path: "/k64bxyjMaKCuqVzX2xVp4NCmGvq.jpg",
            genre_ids: [16, 10751, 35],
            id: 1058732,
            original_language: "en",
            original_title: "The Simpsons Meet the Bocellis in Feliz Navidad",
            overview:
                "This Christmas, Homer surprises Marge with the ultimate gift: an unforgettable performance from Italian opera superstar Andrea Bocelli and his children Matteo and Virginia.",
            popularity: 919.44,
            poster_path: "/9rJFKvYvSyQ3HoTl1gcU55FOzYi.jpg",
            release_date: "2022-12-15",
            title: "The Simpsons Meet the Bocellis in Feliz Navidad",
            video: false,
            vote_average: 5.3,
            vote_count: 20,
        },
        {
            adult: false,
            backdrop_path: "/cL0cdccOMzM508ODsWPfHVMMAzo.jpg",
            genre_ids: [28],
            id: 267805,
            original_language: "en",
            original_title: "There Are No Saints",
            overview:
                "A man is imprisoned for a crime he didn't commit. When his wife is murdered and his son kidnapped and taken to Mexico, he devises an elaborate and dangerous plan to rescue his son and avenge the murder.",
            popularity: 864.512,
            poster_path: "/fcOTYArjKuAgufwHoTvx8w9UKCv.jpg",
            release_date: "2022-05-27",
            title: "There Are No Saints",
            video: false,
            vote_average: 5.6,
            vote_count: 51,
        },
        {
            adult: false,
            backdrop_path: "/AsEgGeccI32SwMBkxpwhOkhbzmF.jpg",
            genre_ids: [28, 878, 53, 27],
            id: 1011679,
            original_language: "en",
            original_title: "Shark Side of the Moon",
            overview:
                "Decades ago, the USSR developed unkillable sharks and launched them to the moon. Today, a team of American astronauts will endure the fight of their lives.",
            popularity: 1286.971,
            poster_path: "/v5CfpzxoJDkZxjZAizClFdlEF0U.jpg",
            release_date: "2022-08-12",
            title: "Shark Side of the Moon",
            video: false,
            vote_average: 3.9,
            vote_count: 8,
        },
        {
            adult: false,
            backdrop_path: "/r7Dfg9aRZ78gJsmDlCirIIlNH3d.jpg",
            genre_ids: [18],
            id: 785084,
            original_language: "en",
            original_title: "The Whale",
            overview:
                "A reclusive English teacher suffering from severe obesity attempts to reconnect with his estranged teenage daughter for one last chance at redemption.",
            popularity: 738.707,
            poster_path: "/jQ0gylJMxWSL490sy0RrPj1Lj7e.jpg",
            release_date: "2022-12-09",
            title: "The Whale",
            video: false,
            vote_average: 8,
            vote_count: 658,
        },
        {
            adult: false,
            backdrop_path: "/fTLMsF3IVLMcpNqIqJRweGvVwtX.jpg",
            genre_ids: [28, 80, 53],
            id: 1035806,
            original_language: "en",
            original_title: "Detective Knight: Independence",
            overview:
                "Detective James Knight 's last-minute assignment to the Independence Day shift turns into a race to stop an unbalanced ambulance EMT from imperiling the city's festivities. The misguided vigilante, playing cop with a stolen gun and uniform, has a bank vault full of reasons to put on his own fireworks show... one that will strike dangerously close to Knight's home.",
            popularity: 748.406,
            poster_path: "/jrPKVQGjc3YZXm07OYMriIB47HM.jpg",
            release_date: "2023-01-20",
            title: "Detective Knight: Independence",
            video: false,
            vote_average: 6.1,
            vote_count: 72,
        },
        {
            adult: false,
            backdrop_path: "/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
            genre_ids: [28, 14, 878],
            id: 436270,
            original_language: "en",
            original_title: "Black Adam",
            overview:
                "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
            popularity: 751.656,
            poster_path: "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
            release_date: "2022-10-19",
            title: "Black Adam",
            video: false,
            vote_average: 7.2,
            vote_count: 4311,
        },
        {
            adult: false,
            backdrop_path: "/afsYFdid9pnnRd6tTrHFUbHgXJn.jpg",
            genre_ids: [878, 28, 12],
            id: 843794,
            original_language: "ko",
            original_title: "정이",
            overview:
                "On an uninhabitable 22nd-century Earth, the outcome of a civil war hinges on cloning the brain of an elite soldier to create a robot mercenary.",
            popularity: 745.006,
            poster_path: "/z2nfRxZCGFgAnVhb9pZO87TyTX5.jpg",
            release_date: "2023-01-20",
            title: "JUNG_E",
            video: false,
            vote_average: 6.3,
            vote_count: 351,
        },
        {
            adult: false,
            backdrop_path: "/a4I481szRmycyreQTLrRe4f4YJe.jpg",
            genre_ids: [80, 53, 18],
            id: 842544,
            original_language: "en",
            original_title: "Transfusion",
            overview:
                "Ryan Logan, a former Special Forces operative, is battling to cope with life after the loss of his wife.  He is thrusted into the criminal underworld to keep his only son from being taken from him.",
            popularity: 666.272,
            poster_path: "/bxh5xCCW9Ynfg6EZJWUkc1zqTnr.jpg",
            release_date: "2023-01-05",
            title: "Transfusion",
            video: false,
            vote_average: 6.6,
            vote_count: 123,
        },
    ]);
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
        }
        var x = setList("popular");
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
                    <Link className="homeMenuLinks" to={"favorites"}>
                        My Watchlist
                    </Link>
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
                                console.log(features);
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
                        {features.map((x) => {
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
                                            <h1>{x["original_title"]}</h1>
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
