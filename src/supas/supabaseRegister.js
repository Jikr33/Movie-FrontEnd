import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDYzNjI0MiwiZXhwIjoxOTkwMjEyMjQyfQ.9YzPtaUZzqkGKve6PI5MtH_otfv1jh521NugK9dqyis";
const supabaseUrl = "https://kzylnwqboabfxifjsevi.supabase.co";

export async function SupabaseRegister(user, hash) {
    const supabase = createClient(supabaseUrl, SUPABASE_KEY);
    if (!hash || !user) {
        return "user and hash must be valid...!!!";
    }
    const { data, error } = await supabase
  .from('users')
  .insert([
    { username: user, password: hash },
  ])


    if (!error) {
        console.log(data, "Successfully registered...");
        return true;
    } else {
        console.log(
            error.message,
            "Unable to register you. who the fuck are you."
        );
        return false;
    }
}
