import { getValidAccounts } from "$lib/server/database";

export function load({ cookies }) {
    // Get the users authorization cookie
    const auth_cookie = cookies.get("auth");
    // If no such cookie exists, return an empty array
    if (auth_cookie === undefined) {
        return { accounts: [] };
    }
    // For each existing cookie, return the user's data
    return { accounts: getValidAccounts(auth_cookie.split(',')) };
}