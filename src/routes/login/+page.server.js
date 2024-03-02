/**
 * 
 * Requiring google api modules for database
 * 
 */
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { client_email, private_key } from '../credentials.json';
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
    dataStores[row[4]] = {
        username: row[0],
        password: row[1],
        name: row[2],
        sheetId: row[3],
        cookie: row[4],
    };
});
/**
 * 
 * On load:
 * Attempt to find cookie, if so then redirect to home page
 *
 */
export function load({ cookies }) {
    for (const v of Object.values(dataStores)) {
        console.dir(v);
    }
    // Search for cookie
    const auth_cookie = cookies.get('auth-cookie');
    if (!auth_cookie) {
        cookies.set('auth-cookie', 'cookie', { path: '/' });
    }
    // Return associated data
    return dataStores[auth_cookie];
}