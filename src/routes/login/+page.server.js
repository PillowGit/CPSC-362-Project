// Imports
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import makeAuth from '$lib/server/utils/makeAuth';
import { properAuth } from '$lib/server/utils/exists';
import { getUserFromAuth } from '$lib/server/utils/get';

// Handle user who's already logged in, if necessary
export const load = async({ cookies }) => {
  const auth = cookies.get('auth');
  if (auth == undefined) return {};
  const user = await getUserFromAuth(auth);
  if (user.error !== null) return {};
  else if (user.result === null) {
    await cookies.delete('auth', {path: '/'});
    return {};
  } else {
    redirect(302, `/account/${user.result}`);
    return {};
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
    // Validate form entries
    let errors = [];
    if (!username) errors.push("Username is required");
    if (!password) errors.push("Password is required");
    if (errors.length > 0) return fail(400, { "errors": errors });
    // Check users login
    const auth = await makeAuth(username, password);
    const authResult = await properAuth(username, auth);
    if (authResult.error !== null) return fail(400, { "errors": ["Server Error","Failed to retrieve logins from database"] });
    if (!authResult.result) return fail(400, { "errors": ["Invalid username or password"] });
    // Successful login, set cookie and send to account page
    cookies.set('auth', auth, { path: '/' });
    redirect(302, `/account/${username}`);
  },
}