import { createClient } from "@supabase/supabase-js";

// const SUPABASE_KEY =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2MzYyNDIsImV4cCI6MTk5MDIxMjI0Mn0.wq8gqnIkU8ghAZcqxxHclJouLZDAGUPpVkei95W_1Hc";
//admin key
const SUPABASE_KEY = process.env.REACT_APP_Supabase_API
const supabaseUrl = process.env.REACT_APP_Supabase_URL
// const supabaseKey = process.env.SUPABASE_KEY;

export async function SupabaseUser(username) {
    const supabase = createClient(supabaseUrl, SUPABASE_KEY);
    let { data: user, error } = await supabase
        .from("users")
        .select("id")
        .eq("username", username);
    if (!error) {
        console.log(user[0].id);
        var res = user[0].id;
        return res;
    } else {
        console.log(error, "cant get user id.");
        return false;
    }
}
