import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDYzNjI0MiwiZXhwIjoxOTkwMjEyMjQyfQ.9YzPtaUZzqkGKve6PI5MtH_otfv1jh521NugK9dqyis";
const supabaseUrl = "https://kzylnwqboabfxifjsevi.supabase.co";

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
