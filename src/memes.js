import axios from "axios";
import { React, useState, useEffect, Component } from "react";
import { useLocation, Link } from "react-router-dom";
import { Supabase } from "./supabase";
import { SupabaseInsert } from "./supabaseInsert";
import Modal from "react-modal";

function Memes() {
    //  const location = useLocation();
    //  const { id } = location.state;
    //  console.log(id)
    const [modalState, setModalState] = useState(false);
    const [memes, setMemes] = useState([]);
    const [counter, setCounter] = useState(1);
    const [currentImage, setCurrentImage] = useState(memes[counter]);
    const [saved, setSaved] = useState([]);
    const search = async () => {
        await axios
            .get(`https://movie-backend-8isc.onrender.com/api/v1/memes`)
            .then((response) => {
                var cat = response.data.category;
                var res = [];
                cat.forEach((x) => {
                    res.push(x.image);
                });
                // setMemes(res)
                setMemes(memes.concat(res));
                console.log("RESPONSE IRSEN SHUUUUU!!!!", res);
            })
            .catch((error) => {
                console.log("Гарсан алдаа______", error);
            });
    };
    useEffect(() => {
        search();
    }, []);
    // const addCurrentMeme = async () => {
    //     var data = currentImage;
    //     await SupabaseInsert(data)
    // }
    useEffect(() => {
        if (counter !== 0 && counter === memes.length) {
            search();
            // setCounter(counter + 1)
        } else {
            setCurrentImage(memes[counter]);
        }

        // console.log(memes);
    }, [counter, memes]);

    const saveMeme = async (x) => {
        const alert = document.getElementById("memeSaved");
        const Meme = document.getElementById("meme");
        const saved = await SupabaseInsert(x);
        console.log(saved);
        if (saved) {
            alert.style.display = "flex";
            setTimeout(() => {
                alert.style.display = "none";
            }, 2000);
        } else {
            alert.style.display = "flex";
            alert.style.backgroundColor = "#dc143c90";
            alert.innerHTML = "This meme can not be saved...";
            setTimeout(() => {
                alert.style.display = "none";
                alert.style.backgroundColor = "#86fba590";
                alert.innerHTML = "Successfully saved this meme...";
            }, 2000);
        }
    };
    const savedMemes = async () => {
        setModalState(true);
        const saved = await Supabase();
        var tempSaved = [];
        saved.map((x) => {
            tempSaved.push([x["created_at"].slice(0, 19), x["link"]]);
        });
        setSaved(tempSaved);
        console.log(tempSaved);
    };

    useEffect(() => {
        Supabase();
    }, []);
    return (
        <div id="contMemes">
            <div id="memes">
                <div id="meme">
                    <img draggable={false} src={currentImage} alt="" />
                    <div id="memeSaved">Successfully saved this meme...</div>
                </div>
                <div id="memeButtons">
                    <div id="topButtons">
                        <Link to={"/"} id="memeLink" class="buttonClass">
                            Go Back to Home
                        </Link>
                        <button
                            class="buttonClass"
                            onClick={() => savedMemes()}
                        >
                            Saved memes
                        </button>

                        <button
                            class="buttonClass"
                            onClick={() => saveMeme(currentImage)}
                        >
                            Save...
                        </button>
                    </div>
                    <div id="changeMeme">
                        <button
                            class="buttonClass2"
                            onClick={() => {
                                setCounter(counter - 1);
                                var alert =
                                    document.getElementById("memeSaved");
                                alert.style.display = "none";
                                alert.style.backgroundColor = "#86fba590";
                                alert.innerHTML =
                                    "Successfully saved this meme...";
                            }}
                        >
                            Last
                        </button>
                        <button
                            class="buttonClass2"
                            onClick={() => {
                                setCounter(counter + 1);
                                var alert =
                                    document.getElementById("memeSaved");
                                alert.style.display = "none";
                                alert.style.backgroundColor = "#86fba590";
                                alert.innerHTML =
                                    "Successfully saved this meme...";
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                id="modal"
                style={customStyles}
                isOpen={modalState}
                onRequestClose={() => setModalState(false)}
                contentLabel="Example Modal"
                ariaHideApp={false}
                shouldCloseOnOverlayClick={true}
            >
                <div style={customStyles.container}>
                    <div
                        id="exitIcon"
                        onClick={() => setModalState(false)}
                    ></div>

                    <h1 id="exitModal">
                        these are memes that was found on the side of the road.
                    </h1>
                    <div id="grid">
                        {saved.map((x) => {
                            return (
                                <div style={customStyles.imageDiv}>
                                    <img
                                        style={customStyles.image}
                                        src={x[1]}
                                        key={x[0]}
                                        alt={x[0]}
                                    ></img>
                                    <h1 style={customStyles.date}>
                                        Saved at: {x[0]}
                                    </h1>
                                </div>
                            );
                        })}
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
    },
    container: {
        width: "100%",
        height: "fit-content",
        position: "relative",
    },
    imageDiv: {
        width: "100%",
        height: "fit-content",
        position: "relative",
    },
    image: {
        width: "100%",
        // height: "100%",
        height: "28rem",
    },
    date: {
        width: "100%",
        height: "2rem",
        // position: "absolute",
        // bottom: "0px",
        backgroundColor: "white",
    },
};

export default Memes;
