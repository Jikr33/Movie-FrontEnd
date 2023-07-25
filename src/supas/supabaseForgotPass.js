import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY = process.env.REACT_APP_Supabase_API
const supabaseUrl = process.env.REACT_APP_Supabase_URL
export async function SupabaseForgotPass(user, hash) {
    const supabase = createClient(supabaseUrl, SUPABASE_KEY);
    if (!hash || !user) {
        return "user and new hash must be valid...!!!";
    }

    const { data: users, error } = await supabase
        .from("users")
        .select("id")
        .eq("username", user);

    if (!error) {
    //   console.log(users)
        const { data: changed, err } = await supabase
            .from("users")
            .update({ password: hash })
            .eq("username", user)
            .select();

        if (!err) {
            
            // console.log(changed.length);
            if (changed.length === 1) {
               return true
            }
            return false
        }
    } else {
        console.log(error.message, "Unable to change password");
        return false;
    }
}
