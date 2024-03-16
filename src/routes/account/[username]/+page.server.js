import getData from '$lib/server/firebase/getData';

export async function load({ params, cookies }) {
  // Get users stored authorized accounts
  const auth_cookie = cookies.get('auth');
  // If user never authorized, go to login page
  if (auth_cookie == undefined || params.username == "NULL") {
    return {error: "Error: You do not have permission to view this page"};
  }
  // Call database to cross check their auth cookie
  const page = await getData("userdata", "auths");
  if (page.error) {
    return {error: "Server Error: Failed to retrieve login data from database"};
  }
  // Make sure this page even exists
  if (page.result.data[params.username] === undefined) {
    return {error: "Error: You do not have permission to view this page"};
  }
  // Make sure the auth cookie matches the username
  if (page.result.data[params.username] != auth_cookie) {
    return {error: "Error: You do not have permission to view this page"};
  }
  // If all checks passed, user is ok to view
  return {};
}