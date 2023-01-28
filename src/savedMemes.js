import { React, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDYzNjI0MiwiZXhwIjoxOTkwMjEyMjQyfQ.9YzPtaUZzqkGKve6PI5MtH_otfv1jh521NugK9dqyis";
const supabaseUrl = "https://kzylnwqboabfxifjsevi.supabase.co";

export async function SupabaseFetch() {
    const supabase = createClient(supabaseUrl, SUPABASE_KEY);

    const [memes, setMemes] = useState([]);
    let { data: x, error } = await supabase.from("memes").select("*");
    if (!error) {
        console.log(x, "Successfully fetched saved memes..");
        return true;
    } else {
        console.log(error.message, "Unable to fetch saved memes");
        return false;
    }
    
    return (
        <div>hello</div>
    )
}
