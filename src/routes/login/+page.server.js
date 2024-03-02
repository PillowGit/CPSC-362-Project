// database function imports
import { cookieExists, sha256 } from '$lib/server/database.js';
// action handler
export const actions = {
    login: async ({ request, cookies }) => {
        // Get request info
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');
        // Generate hash
        const hash = await sha256(`${username}:${password},${username}`);
        // If cookie exists, set cookie and approve
        if (cookieExists(hash)) {
            cookies.set('auth', hash, { path: '/' });
            return { status: 200, body: { isAuthed: true } };
        }
        // Otherwise idk
        else {
            return { status: 401, body: { isAuthed: false }};
        }
    },
}