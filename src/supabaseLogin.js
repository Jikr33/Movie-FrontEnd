import { createClient } from "@supabase/supabase-js";
import React from "react";

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDYzNjI0MiwiZXhwIjoxOTkwMjEyMjQyfQ.9YzPtaUZzqkGKve6PI5MtH_otfv1jh521NugK9dqyis";
const supabaseUrl = "https://kzylnwqboabfxifjsevi.supabase.co";

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
        var pass = users[0].password;
        console.log(hash == users[0].password);
        if (pass === hash) {
            return true;
        } else {
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
