import { add_item, get_item } from "$lib/server/firebase/cache";
import getDocument from "$lib/server/firebase/getData";

export async function authExists(auth) {
  let result = { result: null, error: null };
  // Attempt to get the auth from the cache
  try {
    result.result = get_item("auths", auth);
  } catch (error) {
    result.error = null;
  }
  // Auth was in cache
  if (result.error === null && result.result !== null) {
    result.result = true;
    return result;
  }
  // Auth was not in cache, fetch database
  const sheet = await getDocument("userdata", "auths");
  // Couldn't get database sheet
  if (sheet.error !== null) {
    result.error = sheet.error;
    return result;
  }
  // Auth was not in database
  if (sheet.result.data[auth] === undefined) {
    result.result = false;
    return result;
  }
  // Auth was in database, add to cache
  try {
    add_item("auths", auth, { [auth]: sheet.result.data[auth] });
  } catch (e) {
    const msg = e.toString();
  }
  result.result = true;
  result.error = null;

  return result;
}

export async function usernameExists(username) {
  let result = { result: null, error: null };
  // Attempt to get the auth from the cache
  try {
    result.result = get_item("auths", username);
  } catch (error) {
    result.error = null;
  }
  // Auth was in cache
  if (result.error === null && result.result !== null) {
    result.result = true;
    return result;
  }
  // Auth was not in cache, fetch database
  const sheet = await getDocument("userdata", "auths");
  // Couldn't get database sheet
  if (sheet.error !== null) {
    result.error = sheet.error;
    return result;
  }
  // Auth was not in database
  if (sheet.result.data[username] === undefined) {
    result.result = false;
    return result;
  }
  // Auth was in database, add to cache
  try {
    add_item("auths", username, { [username]: sheet.result.data[username] });
  } catch (e) {
    const msg = e.toString();
  }
  result.result = true;
  result.error = null;

  return result;
}

export async function properAuth(username, auth) {
  let result = { result: null, error: null };
  // Attempt to get the username from the cache
  try {
    result.result = get_item("auths", username);
  } catch (error) {
    result.error = null;
  }
  // Username was in cache
  if (result.error === null && result.result !== null) {
    result.result = auth == result.result[username];
    return result;
  }
  // Username was not in cache, fetch database
  const sheet = await getDocument("userdata", "auths");
  // Couldn't get database sheet
  if (sheet.error !== null) {
    result.error = sheet.error;
    return result;
  }
  // Username was not in database
  if (sheet.result.data[username] === undefined) {
    result.result = false;
    return result;
  }
  // Username was in database, add to cache
  try {
    add_item("auths", username, { [username]: sheet.result.data[username] });
  } catch (e) {
    const msg = e.toString();
  }
  result.result = auth == sheet.result.data[username];
  result.error = null;
  return result;
}
