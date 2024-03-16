// Imports
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import makeAuth from '$lib/server/utils/makeAuth';
import getData from '$lib/server/firebase/getData';

// Handle user who's already logged in, if necessary
export const load = async({ cookies }) => {
  const auth = cookies.get('auth');
  if (auth == undefined) return {};
  const sheet = await getData("userdata", "auths");
  if (sheet.error == null) {
    if (sheet.result.data[auth] != undefined) {
      redirect(302, `/account/${sheet.result.data[auth]}`);
    }
  }
}

// Handle user login
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
    const sheet = await getData("userdata", "users");
    if (sheet.error) return fail(400, { "errors": ["Server Error","Failed to retrieve logins from database"] });
    if (!sheet.result.data[auth] || sheet.result.data[auth].username != username || sheet.result.data[auth].password != password) return fail(400, { "errors": ["Invalid username or password"] });
    // Successful login, set cookie and send to account page
    cookies.set('auth', auth, { path: '/' });
    redirect(302, `/account/${username}`);
  },
}