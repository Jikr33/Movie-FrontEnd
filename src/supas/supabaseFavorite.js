import { createClient } from "@supabase/supabase-js";
import React from "react";
import axios from "axios";
// const SUPABASE_KEY =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2MzYyNDIsImV4cCI6MTk5MDIxMjI0Mn0.wq8gqnIkU8ghAZcqxxHclJouLZDAGUPpVkei95W_1Hc";
//admin key
const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDYzNjI0MiwiZXhwIjoxOTkwMjEyMjQyfQ.9YzPtaUZzqkGKve6PI5MtH_otfv1jh521NugK9dqyis";
const supabaseUrl = "https://kzylnwqboabfxifjsevi.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;

export async function SupabaseFavorite(id) {
    const supabase = createClient(supabaseUrl, SUPABASE_KEY);
    if (!id) {
        return false;
    }
    let { data: favorites, error } = await supabase
        .from("Favorite movies")
        .select("movie_id,rating")
        .eq("user_id", id);
    if (!error) {
        // console.log(favorites);
        if (favorites.length === 0) {
            return false;
        } else {
            var res = {};
            var ratings = [];
            favorites.map((x) => {
                // res.push(x["movie_id"]);
                // ratings.push(x["rating"]);
                let s = x["movie_id"];
                let d = x["rating"];
                let p = {};
                // p[s] = d;
                // res.push(p);
                res[s] = d;
                console.log(x);
                return true;
            });
            console.log(res);
            // return [res, ratings];
            return res;
        }
    } else {
        console.log(error, "cant get user favorites");
        return false;
    }
}
