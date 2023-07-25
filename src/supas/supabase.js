import { createClient } from "@supabase/supabase-js";
// const SUPABASE_KEY =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2MzYyNDIsImV4cCI6MTk5MDIxMjI0Mn0.wq8gqnIkU8ghAZcqxxHclJouLZDAGUPpVkei95W_1Hc";
//admin key

// const SUPABASE_KEY = process.env.REACT_APP_Supabase_key;
const SUPABASE_KEY = process.env.REACT_APP_Supabase_API
 const supabaseUrl = process.env.REACT_APP_Supabase_URL
// const supabaseKey = process.env.SUPABASE_KEY;

export async function Supabase(userID) {
    const supabase = createClient(supabaseUrl, SUPABASE_KEY);
    if (!userID) {
        return false;
    }

    let { data: memes, error } = await supabase
        .from("memes")
        .select("*")
        .eq("user_id", userID);
    if (!error) {
        // console.log(memes);
        return memes;
    }
}
