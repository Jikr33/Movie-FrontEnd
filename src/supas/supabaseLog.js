import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const SUPABASE_KEY = process.env.REACT_APP_Supabase_API
const supabaseUrl = process.env.REACT_APP_Supabase_URL
export async function SupabaseLog(userID, coordinates = "") {
    const supabase = createClient(supabaseUrl, SUPABASE_KEY);
    var ip;
    await axios
        .get("https://ipv4.icanhazip.com/")
        .then((res) => {
            // console.log(res.data);
            if (!res.data) {
                axios.get("https://api.ipify.org/").then((response) => {
                    ip = res.data;
                    // console.log("second ip", response);
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
            // console.log(users[0].username, userID);
            if (coordinates !== "") {
                coordinates = `https://gps-coordinates.org/my-location.php?lat=${coordinates[0]}&lng=${coordinates[1]}`;
            }

            const { data, error } = await supabase.from("userLogs").insert([
                {
                    user_id: parseInt(userID),
                    user_name: users[0].username,
                    ip_address: String(ip),
                    location: coordinates,
                },
            ]);
            if (!error) {
                // console.log(data, "its LOG of supabase");
            } else {
                console.log(error, "theres problem with loggin to LOG");
            }
        }
    } else {
        if (coordinates !== "") {
            coordinates = `https://gps-coordinates.org/my-location.php?lat=${coordinates[0]}&lng=${coordinates[1]}`;
        }
        const { data, error } = await supabase.from("userLogs").insert([
            {
                user_id: 0,
                user_name: "No Account",
                ip_address: toString(ip),
                location: coordinates,
            },
        ]);
        if (!error) {
            // console.log(data, "its LOG of supabas, user without an account");
        } else {
            console.log(error, "theres problem with loggin to LOG, no account");
        }
    }
}
