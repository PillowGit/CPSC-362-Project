// Form fail function
import { fail } from '@sveltejs/kit';

// on load handler


// Handle user login
import makeAuth from '$lib/server/utils/makeAuth';
import getData from '$lib/server/firebase/getData';
// takes (username, password)
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
    // Check users login
    const auth = await makeAuth(username, password);
    const sheet = await getData("users", auth);
    if (sheet.error) return fail(400, { "errors": ["Server Error","Failed to retrieve logins from database"] });
    if (!sheet.result.data[auth] || sheet.result.data[auth].username != username || sheet.result.data[auth].password != password) return fail(400, { "errors": ["Invalid username or password"] });
    // not done yet :)
    return fail(400, { errors: ["login success but not implemented yet"] });
  },
}