import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY = process.env.REACT_APP_Supabase_API
const supabaseUrl = process.env.REACT_APP_Supabase_URL
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
        if (users.length === 0) {
            const { data: user, err } = await supabase
                .from("Favorite movies")
                .insert([{ user_id: userID, movie_id: id }]);
            if (!err) {
                console.log(
                    "successfully saved this movie to your favorites.",
                    user
                );
                return true;
            } else {
                console.log(err, "problem with saving this particular movie");
                return false;
            }
        } else {
            console.log(
                "Unable to save, becos, u already saved this movie. u fat bitch!",
                users
            );
            return false;
        }
    } else {
        console.log(
            error.message,
            "problem with retrieving user data from supabase...!!!"
        );
        return false;
    }
}
