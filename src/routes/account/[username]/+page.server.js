import { getUserData, getLists, getUserFromAuth, getLists } from '$lib/server/utils/get';
import { add } from '$lib/server/utils/add';
import { remove_item } from '$lib/server/firebase/cache';
import addData from '$lib/server/firebase/addData';

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
    create: async({ request, cookies }) => {
      // Get data from form submission
      const data = await request.formData();
      // Grab the name of the list and the description entered
      const listname = data.get("listname")?.toString();
      const listidname = listname?.replace(/[^a-z0-9]/gi, "");
      const description = data.get("description")?.toString();
      // Determine the new lists potential id
      const username = await getUserFromAuth(cookies.get('auth'));
      if (username.error !== null) return;
      const new_id = username.result + '-' + listidname;
      // Check if a list with this id already exists
      const list_exists = (await getLists([new_id]))[new_id] !== undefined;
      if (list_exists) return;
      // Grab the users previous list data
      const user_data = await getUserData(cookies.get('auth'));
      if (user_data.error !== null) {
        return;
      }
      // Add the list id to the users lists
      const merge_data = {};
      merge_data[cookies.get('auth')] = { lists: [...user_data.result.lists, new_id] };
      // Attempt to add the list to the database
      const res = await addData("userdata", "users", merge_data);
      if (res.error !== null) return;
      // Remove old user data from cache so it may update
      await remove_item("users", cookies.get('auth'));
      // Generate list to add to the database
      const list_database_entry = {};
      list_database_entry.allowed_users = [username];
      list_database_entry.description = description;
      list_database_entry.listname = listname;
      list_database_entry.entries = [];
      const db_data = {};
      db_data[new_id] = list_database_entry;
      // Add the list to the database
      const db_res = await addData("userdata", "lists", db_data);
      console.dir(db_res, {depth: null});
    }
  }