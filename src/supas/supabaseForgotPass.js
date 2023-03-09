import { createClient } from "@supabase/supabase-js";
import React from "react";

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6eWxud3Fib2FiZnhpZmpzZXZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDYzNjI0MiwiZXhwIjoxOTkwMjEyMjQyfQ.9YzPtaUZzqkGKve6PI5MtH_otfv1jh521NugK9dqyis";
const supabaseUrl = "https://kzylnwqboabfxifjsevi.supabase.co";

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
      console.log(users)
        const { data: changed, err } = await supabase
            .from("users")
            .update({ password: hash })
            .eq("username", user)
            .select();

        if (!err) {
            
            console.log(changed.length);
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
