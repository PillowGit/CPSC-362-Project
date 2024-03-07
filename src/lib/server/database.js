/**
 * 
 * Requiring google api modules for database
 * 
 */
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { client_email, private_key } from './credentials.json';
/**
 * 
 * Authorize our google client and initialize sheets api
 * 
 */
const client = new JWT({
    email: client_email,
    key: private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
client.authorize();
const sheets = google.sheets({ version: 'v4', auth: client });
/**
 * 
 * Simple sheets reading function
 * 
 */
async function readSheet(range_ = "A:Z", sheetId = "") {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: range_,
        });
        return response.data;
    } catch (e) {
        return e;
    }
}
/**
 * 
 * Gather the spreadsheets data to verify users with
 * 
 */
const userData = (await readSheet("UserData", "1kFx9KdDyI7gvLkQYrt8YUIo3-cBkMkNiMCXcgjJ9ctU")).values;
const dataStores = {};
userData.forEach((row) => {
    dataStores[row[5]] = {
        username: row[0],
        password: row[1],
        title: row[2],
        author: row[3],
        sheetId: row[4],
        cookie: row[5],
    };
});

/**
 * 
 * DATABASE EXPORTS
 * 
 */

// check if cookie is in database
export function cookieExists(cookie) {
    console.log(`Cookie exists was called with cookie: ${cookie} and returned ${dataStores[cookie] !== undefined}`);
    return dataStores[cookie] !== undefined;
}

// hash
export async function sha256(message) {
    // Encode message as UTF-8
    const msgBuffer = new TextEncoder('utf-8').encode(message);
  
    // Use SubtleCrypto API for hashing
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  
    // Convert ArrayBuffer to a hex string (optional)
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  
    return hashHex; // Or return hashBuffer for raw binary data
}

// make cookie function
export async function makeCookie(username, password) {
    const hash = await sha256(`,${username}:${password}i`);
    if (cookieExists(hash)) {
        return null;
    } else {
        return hash;
    }
}

// get all of a users valid accounts from the database using their cookies
export function getValidAccounts(cookie_list) {
    console.dir(`Checking the following cookie_list: ${cookie_list}`);
    console.dir(`Cross checking the following database entries:`);
    console.dir(dataStores);
    let ret = [];
    for (let i = 0; i < cookie_list.length; i++) {
        if (dataStores[cookie_list[i]] !== undefined) {
            ret.push({
                title: dataStores[cookie_list[i]].title,
                author: dataStores[cookie_list[i]].author,
                username: dataStores[cookie_list[i]].username,
            });
        }
    }
    console.dir(`Returning the account list: ${ret}`);
    return ret;
}
