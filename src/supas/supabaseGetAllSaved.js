import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY = process.env.REACT_APP_Supabase_API
const supabaseUrl = process.env.REACT_APP_Supabase_URL
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
            // console.log(s.movie_id);
            let d = s.movie_id;
            if (d === id) {
                re = true;
            }
            return true
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
