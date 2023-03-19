import { SupabaseFavorite } from "./supabaseFavorite";

export default async function fetchGlobalRatings(id) {
    const ratings = await SupabaseFavorite(id);
    if (ratings) {
        localStorage.setItem("ratings", JSON.stringify(ratings));
    }
}
