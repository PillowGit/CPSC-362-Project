import { add_item, get_item } from "$lib/server/firebase/cache";
import getDocument from "$lib/server/firebase/getData";

export async function getUserFromAuth(auth) {
  let result = { result: null, error: null };
  // Attempt to get the username from the cache
  try {
    result.result = get_item("auths", auth);
  } catch (error) {
    result.error = error;
  }
  // Auth was in cache
  if (result.error === null && result.result !== null) {
    result.result = result.result[auth];
    return result;
  }
  result.error = null;
  // Username was not in cache, fetch database
  const sheet = await getDocument("userdata", "auths");
  // Couldn't get database sheet
  if (sheet.error !== null) {
    result.error = sheet.error;
    return result;
  }
  // Auth was not in database
  if (sheet.result.data[auth] === undefined) {
    result.result = null;
    return result;
  }
  // Username was in database, add to cache
  try {
    add_item("auths", username, { [username]: sheet.result.data[username] });
  } catch (e) {
    const msg = e.toString();
  }
  // Return username
  result.result = sheet.result.data[auth];
  result.error = null;
  return result;
}

export async function getUserData(auth) {
  let result = { result: null, error: null };
  // Attempt to get the username from the cache
  try {
    result.result = get_item("users", auth);
  } catch (error) {
    result.error = error;
  }
  // Auth was in cache
  if (result.error === null && result.result !== null) {
    return result;
  }
  result.error = null;
  // Username was not in cache, fetch database
  const sheet = await getDocument("userdata", "users");
  // Couldn't get database sheet
  if (sheet.error !== null) {
    result.error = sheet.error;
    return result;
  }
  // Auth was not in database
  if (sheet.result.data[auth] === undefined) {
    result.result = null;
    return result;
  }
  // User was in database, add to cache
  try {
    add_item("users", auth, sheet.result.data[auth]);
  } catch (e) {
    const msg = e.toString();
  }
  // Return username
  result.result = sheet.result.data[auth];
  result.error = null;
  return result;

}