import { createClient } from "@supabase/supabase-js";

// const SUPABASE_KEY =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2MzYyNDIsImV4cCI6MTk5MDIxMjI0Mn0.wq8gqnIkU8ghAZcqxxHclJouLZDAGUPpVkei95W_1Hc";
//admin key
const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDYzNjI0MiwiZXhwIjoxOTkwMjEyMjQyfQ.9YzPtaUZzqkGKve6PI5MtH_otfv1jh521NugK9dqyis";
const supabaseUrl = "https://kzylnwqboabfxifjsevi.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;

export async function SupabaseUsername(id, setUsername) {
    const supabase = createClient(supabaseUrl, SUPABASE_KEY);
    let { data: user, error } = await supabase
        .from("users")
        .select("username")
        .eq("id", id);
    if (!error) {
        console.log(user[0].username);
        var res = user[0].username;
        setUsername(res.toUpperCase())
    } else {
        console.log(error, "cant get user name.");
        return false;
    }
}
