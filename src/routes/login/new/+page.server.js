
// Imports
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import makeAuth from '$lib/server/utils/makeAuth';
import { authExists, usernameExists } from '$lib/server/utils/exists';
import { add } from '$lib/server/utils/add';

// Handle user creation
export const actions = {
  create: async({ request, cookies }) => {
    // Get data from form submission
    const data = await request.formData();
    // Grab the actual data submitted
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();
    // Check if author is filled
    let errors = [];
    // Validate form entries
    if (!username) errors.push("Username is required");
    if (!password) errors.push("Password is required");
    if (errors.length > 0) return fail(400, { "errors": errors });
    const auth = await makeAuth(username, password);
    // Check if username or auth token already exists
    const userStatus = await usernameExists(username);
    if (userStatus.error !== null) { return fail(400, { "errors": ["Server Error","Failed to retrieve database"] }); }
    const authStatus = await authExists(auth);
    if (authStatus.error !== null) { return fail(400, { "errors": ["Server Error","Failed to retrieve database"] }); }
    if (userStatus.result || authStatus.result) return fail(400, { "errors": ["Username already in use"] });
    // Free to attempt making their account
    const userdata = {
            username: username,
            password: password,
            auth: auth,
            lists: [],
            invites: [],
    };
    let result = await add("users", auth, userdata);
    if (result.error !== null) { return fail(400, { "errors": ["Server Error","Failed to sync database"] }); }
    result = await add("auths", username, auth);
    if (result.error !== null) { return fail(400, { "errors": ["Server Error","Failed to sync database"] }); }
    result = await add("auths", auth, username);
    if (result.error !== null) { return fail(400, { "errors": ["Server Error","Failed to sync database"] }); }
    // If all data entires successful, continue to account page
    cookies.set('auth', auth, { path: '/' });
    redirect(302, `/account/${username}`);
  },
}