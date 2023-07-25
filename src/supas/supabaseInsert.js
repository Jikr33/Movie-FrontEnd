import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY = process.env.REACT_APP_Supabase_API
const supabaseUrl = process.env.REACT_APP_Supabase_URL
export async function SupabaseInsert(id, x) {
    const supabase = createClient(supabaseUrl, SUPABASE_KEY);
    if (!x || !id) {
        return "link and id must be valid...!!!";
    }
    const { data, error } = await supabase.from("memes").insert([{user_id: id, link: x }]);

    if (!error) {
        console.log(data, "Successfully saved this meme...");
        return true;
    } else {
        console.log(
            error.message,
            "Unable to save this meme. It might already exist."
        );
        return false;
    }
}
