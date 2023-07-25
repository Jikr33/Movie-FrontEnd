import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY = process.env.REACT_APP_Supabase_API
const supabaseUrl = process.env.REACT_APP_Supabase_URL
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
        // console.log(data, "Successfully registered...");
        return true;
    } else {
        console.log(
            error.message,
            "Unable to register you. who the fuck are you."
        );
        return false;
    }
}
