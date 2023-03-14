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
import RenderHomePosters from "./renderHomePosters";

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
    const [userID, setUserID] = useState(localStorage.getItem("userId"));
    const [features, setFeatures] = useState([]);
    const [current, setCurrent] = useState("");

    const [mustLoginModal, setMustLoginModal] = useState(false);

    useEffect(() => {
        if (current === "") {
            setCurrent("popular");
            let t = document.getElementById("popular");
            t.backgroundColor = "rgb(2, 78, 255)";
            t.color = "white";
            setList("popular");
        }
    }, []);

    useEffect(() => {
        if (userID) {
            const loginButtonDiv = document.getElementById("login");
            const logoutButtonDiv = document.getElementById("logout");
            loginButtonDiv.style.display = "none";
            console.log("User has already logged in - ", userID);
            logoutButtonDiv.style.display = "block";
        } else {
            const loginButtonDiv = document.getElementById("login");
            loginButtonDiv.style.display = "block";
            const logoutButtonDiv = document.getElementById("logout");
            console.log("User has already logged out - ", userID);
            logoutButtonDiv.style.display = "none";
        }
    }, [userID]);
    useEffect(() => {
        localStorage.setItem("name", name);
        console.log("set local - ", localStorage.getItem("name"));
    }, [name]);
    const setValue = (s) => {
        setName(s.target.value);
        setValid(() => (s.target.value.length <= 1 ? false : true));
        console.log(s);
    };
    // if modal is closed, button will be Log in
    useEffect(() => {
        setButton("Log In");
    }, [modalState]);

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
        const g = await tmdb(x, setFeatures);
        if (x === "theatres") {
            let f = document.getElementById(current);
            if (f) {
                f.style.backgroundColor = "transparent";
                f.style.color = "rgb(1, 50, 156)";
            }
            var t = document.getElementById("theatres");
            t.style.backgroundColor = "rgb(2, 78, 255)";
            t.style.color = "white";
            setCurrent("theatres");
        } else if (x === "popular") {
            let f = document.getElementById(current);
            if (f) {
                f.style.backgroundColor = "transparent";
                f.style.color = "rgb(1, 50, 156)";
            }
            t = document.getElementById("popular");
            t.style.backgroundColor = "rgb(2, 78, 255)";
            t.style.color = "white";
            setCurrent("popular");
        } else if (x === "top rated") {
            let f = document.getElementById(current);
            if (f) {
                f.style.backgroundColor = "transparent";
                f.style.color = "rgb(1, 50, 156)";
            }
            t = document.getElementById("toprated");
            t.style.backgroundColor = "blue";
            t.style.color = "white";
            setCurrent("toprated");
            console.log(t);
        } else if (x === "upcoming") {
            let f = document.getElementById(current);
            if (f) {
                f.style.backgroundColor = "transparent";
                f.style.color = "rgb(1, 50, 156)";
            }
            t = document.getElementById("upcoming");
            t.style.backgroundColor = "rgb(2, 78, 255)";
            t.style.color = "white";
            setCurrent("upcoming");
        }
        // return tmdb(x);
    };

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
                const logoutButtonDiv = document.getElementById("logout");
                logoutButtonDiv.style.display = "block";
                console.log("Successfully logged in");
                const uid = await SupabaseUser(username);
                setModalState(false);
                localStorage.setItem("userId", uid);
                setUserID(uid);
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
                <h1
                    id="homeTopTitle"
                    className="capitalize text-amber-900 font-mono font-bold text-3xl h-max w-4/5 pt-2 rounded-full pl-28"
                >
                    Search for Movies. i got you
                </h1>
                <h4
                    id="homeBottomTitle"
                    className="capitalize font-mono font-bold text-l h-max w-4/5 pt-2 rounded-full pl-28"
                >
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
                    <button
                        id="logout"
                        className="homeMenuLinks"
                        onClick={() => {
                            setUserID(false);
                            localStorage.setItem("userId", false);
                        }}
                    >
                        Log Out
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
                        {/* <button
                            onClick={() => {
                                console.log(current);
                            }}
                            type="button"
                            class="homeFeatureButton w-fit h-full text-center"
                        >
                            ssss
                        </button> */}
                    </span>
                </div>
                <div id="features">
                    <RenderHomePosters features={features}></RenderHomePosters>
                    {/* <div id="homeCarousel">
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
                    </div> */}
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
                <div id="mustLoginCont">
                    <h4 className="py-2 text-xl font-extrabold">
                        You must login to use this feature!
                    </h4>
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
                            className="bg-red-600"
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
