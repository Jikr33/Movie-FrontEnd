import React from "react";
import Star from "./Star";
import { useState, useEffect } from "react";

function RatingStars(props) {
    const GRADES = ["Poor", "Fair", "Good", "Very good", "Excellent"];
    const [gradeIndex, setGradeIndex] = useState();
    const changeGradeIndex = (index) => {
        setGradeIndex(index);
    };
    const activeStar = {
        fill: "#fce500",
    };

    useEffect(() => {
        if (props.rating) {
            // console.log("set gradeindex now");
            setGradeIndex(props.rating);
        }
    }, [props.rating]);
    useEffect(() => {
        // console.log(gradeIndex);
    }, [gradeIndex]);
    return (
        <div className="stars">
            {GRADES.map((grade, index) => (
                <Star
                    // fetchGlobalRatings={props.fetchGlobalRatings}
                    index={index}
                    key={grade}
                    style={gradeIndex >= index ? activeStar : {}}
                    changeGrade={changeGradeIndex}
                    userId={props.userId}
                    id={props.id}
                    saved={props.saved}
                    setMustLoginModal={props.setMustLoginModal}
                />
            ))}
        </div>
    );
}
export default RatingStars;
