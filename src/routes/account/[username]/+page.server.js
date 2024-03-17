import { properAuth } from '$lib/server/utils/exists';
import makeAuth from '$lib/server/utils/makeAuth';

export async function load({ params, cookies }) {
  // Get users stored authorized accounts
  const auth_cookie = cookies.get('auth');
  // If user never authorized, go to login page
  if (auth_cookie == undefined || params.username == "NULL") {
    return {error: "Error: You do not have permission to view this page"};
  }
  // Ensure user is authorized to view page
  const isAuthorized = await properAuth(params.username, auth_cookie);
  if (isAuthorized.error !== null || !isAuthorized.result) {
    return {error: "Error: You do not have permission to view this page"};
  }
  // If all checks passed, user is ok to view
  return {};
}