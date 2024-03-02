// database function to validate if cookie is stored
import { cookieExists } from '$lib/server/database.js';

export function load({ cookies }) {
    const auth = cookies.get('auth');
    return {
        isAuthed: auth && cookieExists(auth),
    };
}