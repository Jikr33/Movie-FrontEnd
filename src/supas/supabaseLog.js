import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDYzNjI0MiwiZXhwIjoxOTkwMjEyMjQyfQ.9YzPtaUZzqkGKve6PI5MtH_otfv1jh521NugK9dqyis";
const supabaseUrl = "https://kzylnwqboabfxifjsevi.supabase.co";

export async function SupabaseLog(userID) {
    const supabase = createClient(supabaseUrl, SUPABASE_KEY);
    var ip;
    await axios
        .get("https://ipv4.icanhazip.com/")
        .then((res) => {
            console.log(res.data);
            if (!res.data) {
                axios.get("https://api.ipify.org/").then((response) => {
                    ip = res.data;
                    console.log("second ip", response);
                });
            } else {
                ip = res.data;
            }
        })
        .catch((err) => {
            console.log(err, "error at fetching 1st ip");
        });

    if (userID !== 0) {
        let { data: users, err } = await supabase
            .from("users")
            .select("username")
            .eq("id", userID);
        if (!err) {
            console.log(users[0].username, userID);
            const { data, error } = await supabase
                .from("userLogs")
                .insert([
                    {
                        user_id: parseInt(userID),
                        user_name: users[0].username,
                        ip_address: String(ip),
                    },
                ]);
            if (!error) {
                console.log(data, "its LOG of supabase");
            } else {
                console.log(error, "theres problem with loggin to LOG");
            }
        }
    } else {
        const { data, error } = await supabase.from("userLogs").insert([
            {
                user_id: 0,
                user_name: "No Account",
                ip_address: toString(ip),
            },
        ]);
        if (!error) {
            console.log(data, "its LOG of supabas, user without an account");
        } else {
            console.log(error, "theres problem with loggin to LOG, no account");
        }
    }
}
