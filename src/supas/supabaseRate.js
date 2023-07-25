import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY = process.env.REACT_APP_Supabase_API
const supabaseUrl = process.env.REACT_APP_Supabase_URL
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
        // console.log(data);
        return true
    } else {
        console.log(
            error.message,
            "Unable to rate this. who the fuck are you."
        );
        return false;
    }
}
