
// Imports
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import makeAuth from '$lib/server/utils/makeAuth';
import getData from '$lib/server/firebase/getData';
import addData from '$lib/server/firebase/addData';

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
    const sheet = await getData("userdata", "users");
    if (sheet.error) return fail(400, { "errors": ["Server Error","Failed to retrieve database"] });
    if (sheet.result.data[username] !== undefined || sheet.result.data[auth] !== undefined) return fail(400, { "errors": ["Username already in use"] });
    // Free to attempt making their account
    const entry = {
        [auth]: {
            username: username,
            password: password,
            auth: auth,
            lists: [],
            invites: [],
        }
    };
    let result = await addData("userdata", "users", entry);
    if (result.error) return fail(400, { "errors": ["Server Error","Failed to sync database"] });
    result = await addData("userdata", "auths", { [auth]: username, [username]: auth });
    if (result.error) return fail(400, { "errors": ["Server Error","Failed to sync database"] });
    // Both data entires successful, continue to account page
    cookies.set('auth', auth, { path: '/' });
    redirect(302, `/account/${username}`);
  },
}