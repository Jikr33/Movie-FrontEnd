import React from "react";
import { useState, useEffect } from "react";
import Result from "./result";
import { Link, redirect } from "react-router-dom";
import Modal from "react-modal";
import CryptoJS from "crypto-js";
import { SupabaseRegister } from "./supabaseRegister";
import { SupabaseLogin } from "./supabaseLogin";
import { SupabaseUser } from "./supabaseUser";
import { SupabaseForgotPass } from "./supabaseForgotPass";

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
            <h1 className="capitalize text-amber-900 font-mono font-bold text-3xl h-max w-2/5 text-center pt-2 rounded-full ">
                Search for Movies. i got you
            </h1>
            <div id="search" className="rounded-md">
                <input
                    autoFocus
                    type="text"
                    id="searchInput"
                    className="outline-0 border border-b-2 rounded-lg max-h-15 w-full h-2/3 pl-3"
                    onChange={(e) => setValue(e)}
                    placeholder="Movie title..."
                />
                {valid ? (
                    <Link
                        className="text-center p-2 m-2 bg-yellow-500 text-white w-80 text-xl shadow-5"
                        to="result"
                    >
                        Search
                    </Link>
                ) : (
                    <Link
                        className="text-center p-2 m-2 bg-yellow-500 text-white w-80 text-xl shadow-5"
                        to=""
                        onClick={() => invalidInput()}
                    >
                        Search
                    </Link>
                )}
                <Link
                    className="p-2 m-2 bg-yellow-500 text-white text-center w-80 text-xl shadow-5"
                    to={"memes"}
                >
                    Entertain me with memes
                </Link>
                <Link
                    className="p-2 m-2 bg-yellow-500 text-white text-center w-80 text-xl shadow-5"
                    to={"favorites"}
                >
                    Favorite Movies 
                </Link>
                <button
                    id="login"
                    className="p-2 m-2 bg-green-500 text-white text-center w-80 text-xl shadow-5"
                    onClick={() => setModalState(true)}
                >
                    Log In or Register
                </button>
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
