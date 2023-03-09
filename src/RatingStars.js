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
            setGradeIndex(props.rating);
        }
    }, [props.rating]);
    useEffect(() => {
        console.log(gradeIndex);
    }, [gradeIndex]);
    return (
        <div className="stars">
            {GRADES.map((grade, index) => (
                <Star
                    index={index}
                    key={grade}
                    style={gradeIndex >= index ? activeStar : {}}
                    changeGrade={changeGradeIndex}
                    userId={props.userId}
                    id={props.id}
                />
            ))}
        </div>
    );
}
export default RatingStars;
