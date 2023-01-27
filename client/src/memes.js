import axios from "axios";
import { React, useState, useEffect, Component } from "react";
import { useLocation, Link } from "react-router-dom";
import { SupabaseFetch } from "./savedMemes";
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
    const search = async () => {
        await axios
            .get(`http://localhost:8000/api/v1/memes`)
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

        console.log(memes);
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
    const savedMemes = () => {
        const g = document.getElementById("meme");
        setModalState(true);
        // g.innerHTML = <SavedMemes />
        // console.log(SavedMemes())
    };
    useEffect(() => {
        if (modalState) {
            var gigi = Supabase();
        }
    }, [modalState]);

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
                    <div>
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
                    <div>
                        <button
                            class="buttonClass"
                            onClick={() => setCounter(counter - 1)}
                        >
                            Last
                        </button>
                        <button
                            class="buttonClass"
                            onClick={() => setCounter(counter + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalState}
                onRequestClose={() => setModalState(false)}
                contentLabel="Example Modal"
                ariaHideApp={false}
                shouldCloseOnOverlayClick={true}
            >
                <h1>this is modal</h1>
            </Modal>
        </div>
    );
}

export default Memes;
