import { createClient } from "@supabase/supabase-js";
import React from "react";

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDYzNjI0MiwiZXhwIjoxOTkwMjEyMjQyfQ.9YzPtaUZzqkGKve6PI5MtH_otfv1jh521NugK9dqyis";
const supabaseUrl = "https://kzylnwqboabfxifjsevi.supabase.co";

export async function SupabaseGetAllSaved(userID, id) {
    const supabase = createClient(supabaseUrl, SUPABASE_KEY);
    if (!id || !userID) {
        return "user and movie id must be valid...!!!";
    }

    let { data: ids, error } = await supabase
        .from("Favorite movies")
        .select("movie_id")
        .eq("user_id", userID);
    if (!error) {
        let re = false;
        ids.map((s) => {
            console.log(s.movie_id);
            let d = s.movie_id;
            if (d == id) {
                re = true;
            }
        });
        return re;
    } else {
        console.log(
            error.message,
            "problem with retrieving user data from supabase...!!!"
        );
        return false;
    }
}
