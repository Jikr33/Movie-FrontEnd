import { React, useState, useEffect, useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
// import { SupabaseRegister } from "../supas/supabaseRegister";
// import { SupabaseLogin } from "../supas/supabaseLogin";
// import { SupabaseUser } from "../supas/supabaseUser";
// import { SupabaseForgotPass } from "../supas/supabaseForgotPass";
// import { SupabaseFavorite } from "../supas/supabaseFavorite";

import { tmdb } from "../supas/tmdbFetch";
import Modal from "react-modal";
import RenderHomePosters from "../components/renderHomePosters";
import axios from "axios";
import search from "../supas/homeSearch";
const RenderResults = lazy(() => import("../components/RenderResults"));

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
    const [current, setCurrent] = useState("popular");

    const [tmdbPage, setTmdbPage] = useState(1);
    const [mustLoginModal, setMustLoginModal] = useState(false);

    const [movies, setMovies] = useState([]);

    const scrollRef = useRef();

    useEffect(() => {
        if (current === "") {
            setCurrent("popular");
            let t = document.getElementById("popular");
            t.backgroundColor = "rgb(2, 78, 255)";
            t.color = "white";
            setList("popular");
        } else if (current === "popular") {
            let t = document.getElementById(current);
            t.backgroundColor = "rgb(2, 78, 255)";
            t.color = "white";
            setList(current);
        }
    }, []);

    useEffect(() => {
        if (userID) {
            const loginButtonDiv = document.getElementById("login");
            const logoutButtonDiv = document.getElementById("logout");
            loginButtonDiv.style.display = "none";
            console.log("User has already logged in - ", userID);
            logoutButtonDiv.style.display = "block";
            fetchGlobalRatings(userID);
        } else {
            const loginButtonDiv = document.getElementById("login");
            loginButtonDiv.style.display = "block";
            const logoutButtonDiv = document.getElementById("logout");
            console.log("User has already logged out - ", userID);
            logoutButtonDiv.style.display = "none";
        }
    }, [userID]);
    // const search = async (name, setMovies, page = 1) => {
    //     // var uname = encodeURIComponent(name);
    //     const options = {
    //         method: "GET",
    //         url: `https://api.themoviedb.org/3/search/movie?api_key=c4aa72a3b011582e85cbcc03fe277717&language=en-US&query=${name}&page=${page}&include_adult=true`,
    //     };
    //     await axios
    //         .request(options)
    //         .then((response) => {
    //             var res = response.data.results;
    //             // sorting the result
    //             res.sort((a, b) => {
    //                 return b.release_date - a.release_date;
    //             });
    //             console.log("RESPONSE IRSEN SHUUUUU!!!!", res);
    //             setMovies(res);
    //             // setMovies(movies.concat(res));
    //             if (res.length < 1) {
    //                 console.warn("no movies");
    //                 const warning = document.getElementById("warning");
    //                 warning.style.display = "flex";
    //             }
    //         })
    //         .catch((error) => {
    //             console.log("Гарсан алдаа______", error);
    //             console.warn("no movies");
    //             const warning = document.getElementById("warning");
    //             warning.style.display = "flex";
    //         });
    // };

    useEffect(() => {
        localStorage.setItem("name", name);
        console.log("set local - ", localStorage.getItem("name"));
        search(name, setMovies);
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
    useEffect(() => {
        setTmdbPage(1);
    }, [current]);

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
            // console.log(t);
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
    const fetchGlobalRatings = async (id) => {
        // const ratings = await SupabaseFavorite(id);
        import("../supas/supabaseFavorite").then(async (module) => {
            const ratings = await module.SupabaseFavorite(id);
            if (ratings) {
                localStorage.setItem("ratings", JSON.stringify(ratings));
            }
        });
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
                    // dynamically importing a function, only when it is needed.
                    var success = await import(
                        "../supas/supabaseRegister"
                    ).then((module) => {
                        module.SupabaseRegister(username, hashedPass);
                    });
                    // var success = await SupabaseRegister(username, hashedPass);
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
            // var successLogin = await SupabaseLogin(username, hashedPassLogin);
            // when dynamically importing functions, await did not work, but worked fine without using it.
            var successLogin = import("../supas/supabaseLogin").then(
                (module) => {
                    module.SupabaseLogin(username, hashedPassLogin);
                }
            );
            if (successLogin) {
                const loginButtonDiv = document.getElementById("login");
                loginButtonDiv.style.display = "none";
                const logoutButtonDiv = document.getElementById("logout");
                logoutButtonDiv.style.display = "block";
                console.log("Successfully logged in");
                // const uid = await SupabaseUser(username);
                import("../supas/supabaseUser").then(async (module) => {
                    const uid = await module.SupabaseUser(username);
                    localStorage.setItem("userId", uid);
                    setUserID(uid);
                    fetchGlobalRatings(uid);
                });
                setModalState(false);
            } else {
                console.log("Password incorrect", successLogin);
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

                    // var passChanged = await SupabaseForgotPass(
                    //     username,
                    //     changeTo
                    // );
                    import("../supas/supabaseForgotPass").then(
                        async (module) => {
                            var passChanged = await module.SupabaseForgotPass(
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
                        }
                    );
                } else {
                    confirm.style.border = "3px red solid";
                    pass.style.border = "3px red solid";
                }
            } else {
                user.style.border = "2px red solid";
            }
        }
    };
    const handleScroll = async (e) => {
        const scrollEnd =
            e.target.scrollWidth - e.target.scrollLeft === e.target.clientWidth;
        if (scrollEnd) {
            console.log(scrollEnd, "scrolled to the end");
            const g = await tmdb(current, setFeatures, features, tmdbPage + 1);
            setTmdbPage(tmdbPage + 1);
        }
    };
    const handleHorizontalScroll = (event) => {
        // Prevent default scroll behavior
        event.preventDefault();

        // Calculate the amount to scroll horizontally
        const scrollAmount = event.deltaY;

        // Adjust the scrollLeft property of the div
        scrollRef.current.scrollLeft += scrollAmount;
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
                <span>
                    <div className="input-group">
                        {name.length > 0 ? (
                            <button
                                id="homeSearchButtonClear"
                                onClick={() => setName("")}
                            ></button>
                        ) : (
                            <button id="homeSearchButtonIcon"></button>
                        )}
                        <div className="homeSearchInput">
                            <input
                                autoFocus
                                type="search"
                                id="searchInput"
                                //  className="form-control"
                                onChange={(e) => setValue(e)}
                                value={name}
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
                    {movies.length != 0 ? (
                        <RenderResults movies={movies}></RenderResults>
                    ) : null}
                </span>
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
                            localStorage.setItem("ratings", null);
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
                            className="homeFeatureButton w-fit h-full text-center"
                        >
                            Popular
                        </button>
                        <button
                            onClick={() => setList("top rated")}
                            id="toprated"
                            type="button"
                            className="homeFeatureButton w-fit h-full text-center"
                        >
                            Top Rated
                        </button>
                        <button
                            onClick={() => setList("theatres")}
                            id="theatres"
                            type="button"
                            className="homeFeatureButton w-fit h-full text-center"
                        >
                            In Theatres
                        </button>
                        <button
                            onClick={() => setList("upcoming")}
                            id="upcoming"
                            type="button"
                            className="homeFeatureButton w-fit h-full text-center"
                        >
                            Upcoming
                        </button>
                    </span>
                </div>
                <div id="features">
                    <RenderHomePosters
                        features={features}
                        handleScroll={handleScroll}
                        handleHorizontalScroll={handleHorizontalScroll}
                        ref={scrollRef}
                    ></RenderHomePosters>
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
