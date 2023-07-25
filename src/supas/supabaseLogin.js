import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY = process.env.REACT_APP_Supabase_API
const supabaseUrl = process.env.REACT_APP_Supabase_URL
export async function SupabaseLogin(user, hash) {
    const supabase = createClient(supabaseUrl, SUPABASE_KEY);
    if (!hash || !user) {
        return "user and hash must be valid...!!!";
    }
    let { data: users, error } = await supabase
        .from("users")
        .select("password")
        .eq("username", user);

    if (!error) {
        var pass;
        if (users[0]) {
            pass = users[0].password;
        }
        if (pass) {
            console.log(hash === users[0].password);
            if (pass === hash) {
                return true;
            } else {
                return false;
            }
        } else {
            console.log(
                "User did not found. Whoooo theeee HEeeeeeell AAAARe Yooooouuuuuu",
                pass,
                users
            );
            alert("User did not found.");
            return false;
        }
    } else {
        console.log(
            error.message,
            "Unable to login you. who the fuck are you."
        );
        return false;
    }
}
