import addData from '$lib/server/firebase/addData';
import { add_item } from '$lib/server/firebase/cache';

export async function add(field, key, values) {
  let result = { result: null, error: null };
  // Attempt to add to firebase
  const sheetReq = await addData("userdata", field, { [key]: values });
  // Log and return error if one occurs when adding to firebase
  if (sheetReq.error !== null) {
    result.error = sheetReq.error;
    return result;
  }
  // Add item to cache
  try {
    if (field != "auths") {
      add_item(field, key, values);
    } else {
      add_item(field, key, { [key]: values });
    }
  } catch (e) {
    result.error = e;
    return result;
  }
  // Add success, return result
  return result;
}