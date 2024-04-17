import { getUserData, getLists } from '$lib/server/utils/get';

export async function load({ params, cookies }) {
  // Get users stored authorized accounts
  const auth_cookie = cookies.get('auth');
  // Get user data corresponding to the auth cookie
  let user_data = null;
  if (params.username == "NULL") {
    user_data = { error: null, result: null };
  } else { 
    user_data = await getUserData(auth_cookie);
  }
  // If there is an error, it's a db error
  if (user_data.error !== null) { return { error: "Failed to fetch data from database" } }
  // If there is no data associated with users auth, let's just say they don't have access to this page
  if (user_data.result == null) { return { error: "Error: You do not have access to this page" } }
  // If there is authorized user data, but their login datas username doesn't match the url, they don't have access
  if (user_data.result.username != params.username) { return { error: "Error: You do not have access to this page" } }
  // If all checks pass, they can see data
  let ret = user_data.result;
  delete ret.password;
  delete ret.auth;

  // Fetch data for lists to display for users
  const res = await getLists(ret.lists);

  return { error: null, username: ret.username, lists: res };
}
// Handle list creation
export const actions = {
    create: async({ request }) => {
      // Get data from form submission
      const data = await request.formData();
      // Grab the name of the list and the description entered
      const listname = data.get("listname")?.toString();
      const description = data.get("description")?.toString();
  
      // debug info
      console.log(`----------Form submission----------\n\nName of List:\n${listname}\n\nDescription given:\n${description}\n\n-----------------------------------`);
    }
  }