import { createClient } from "@supabase/supabase-js";
import React from "react";

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDYzNjI0MiwiZXhwIjoxOTkwMjEyMjQyfQ.9YzPtaUZzqkGKve6PI5MtH_otfv1jh521NugK9dqyis";
const supabaseUrl = "https://kzylnwqboabfxifjsevi.supabase.co";

export async function SupabaseSaveMovie(userID, id) {
    const supabase = createClient(supabaseUrl, SUPABASE_KEY);
    if (!id || !userID) {
        return "user and movie id must be valid...!!!";
    }

    let { data: users, error } = await supabase
        .from("Favorite movies")
        .select("*")
        .eq("user_id", userID)
        .eq("movie_id", id);

    

    if (!error) {
      if (users.length === 0){
         const { data: user, err } = await supabase
         .from('Favorite movies')
         .insert([
            { user_id: userID, movie_id: id },
         ])
         if(!err) {
            console.log('successfully saved this movie to your favorites.', user)
            return true
         }else {
            console.log(err, 'problem with saving this particular movie')
            return false
         }
      }else {
         console.log("Unable to save, becos, u already saved this movie. u fat bitch!")
         return false
      }
    } else {
        console.log(error.message, "problem with retrieving user data from supabase...!!!");
        return false;
    }
}
