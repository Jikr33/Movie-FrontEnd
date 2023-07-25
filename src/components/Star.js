import React from "react";
import { supabaseRate } from "../supas/supabaseRate";
import fetchGlobalRatings from "../supas/fetchGlobalRatings";
const Star = (props) => {
    const changeGrade = async (e) => {
        if (!props.userId) {
            // console.log(props.userId, "user wasnt logged in!@@@");
            props.setMustLoginModal(true);
        } else {
            props.changeGrade(e.target.value);
            const s = await supabaseRate(
                props.userId,
                props.id,
                parseInt(e.target.value)
            );
            // console.log(fetchGlobalRatings, s);
            const r = await fetchGlobalRatings(props.userId);

            // console.log(e.target.value, s, "STAR");
        }
    };

    return (
        <label className="star">
            <input
                onClick={changeGrade}
                type="radio"
                name="rating"
                id={props.grade}
                value={props.index}
                className="stars_radio-input"
            />
            <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fce500"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={props.style}
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        </label>
    );
};

export default Star;
