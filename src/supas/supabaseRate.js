import { createClient } from "@supabase/supabase-js";
import React from "react";

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDYzNjI0MiwiZXhwIjoxOTkwMjEyMjQyfQ.9YzPtaUZzqkGKve6PI5MtH_otfv1jh521NugK9dqyis";
const supabaseUrl = "https://kzylnwqboabfxifjsevi.supabase.co";

export async function supabaseRate(user, id, index) {
    const supabase = createClient(supabaseUrl, SUPABASE_KEY);
    if (!index || !user || !id) {
        return "user and index must be valid for RATING...!!!";
    }
    const { data, error } = await supabase
        .from("Favorite movies")
        .update({ rating: index })
        .eq("user_id", user)
        .eq("movie_id", id);

    if (!error) {
        console.log(data);
    } else {
        console.log(
            error.message,
            "Unable to rate this. who the fuck are you."
        );
        return false;
    }
}
