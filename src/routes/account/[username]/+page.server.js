import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  // Get users stored authorized accounts
  const auth_cookie = cookies.auth;
  // If user never authorized, go to login page
  if (auth_cookie == undefined) {
    redirect(302, "/login");
  }
  // Else parse cookie and call on database
  const auths = auth_cookie.split(',');
  return {}
}