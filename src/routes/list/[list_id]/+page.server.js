import { getUserFromAuth, getLists } from '$lib/server/utils/get';
import { remove_item } from '$lib/server/firebase/cache';
import addData from '$lib/server/firebase/addData';
import { fail, json } from '@sveltejs/kit';


export async function load({ params, cookies }) {
    // Grab the users auth cookie
    const auth_cookie = cookies.get('auth');
    if (auth_cookie === undefined) {
        return { error: "You must be logged in to access this page" };
    }
    // Attempt to get their username from the database
    const username = await getUserFromAuth(auth_cookie);
    if (username.error !== null) {
        return { error: "Failed to fetch data from database" };
    }
    // Attempt to get the list from the database
    const list_id = params.list_id;
    const list_info = (await getLists([list_id]))[list_id];
    if (list_info === undefined) {
        return { error: "Failed to fetch data from database" };
    }
    // Ensure the user has access to the list
    if (!list_info.allowed_users.includes(username.result)) {
        return { error: "You do not have access to this page" };
    }
    return { error: null, ...list_info };
}

export const actions = {
    create: async({ request, params }) => {
        // Get data from form submission
        const data = await request.formData();
        const date = data.get("date")?.toString();
        const taskname = data.get("taskname")?.toString();
        const description = data.get("description")?.toString();
        // Get input errors, if any
        let input_errors = [];
        if (date == "") { input_errors.push("Date is required"); }
        if (taskname == "") { input_errors.push("Task name is required"); }
        if (description == "") { input_errors.push("Description is required"); }
        if (input_errors.length > 0) {
            return fail(400, { errors: input_errors });
        }
        // Fetch the list from the database
        let entries = (await getLists([params.list_id]))[params.list_id];
        if (entries === undefined) {
            return fail(400, {"errors": ["Failed to fetch data from database"]});
        }
        entries = entries.entries;
        console.log(date);
        // Ensure our task is not already in the list
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].title === taskname) {
                console.log("error foun");
                return fail(400, {"errors": ["Task with this title already exists"]});
            }
        }
        // Update our entries array
        entries.push({
            title: taskname,
            description: description,
            date: date,
            status: "todo",
        });
        // Remove list data from our cache for update
        try {
            await remove_item("lists", params.list_id);
        } catch (error) {
            return fail(400, {"errors": ["Failed to remove list data from cache"]});
        }
        // Update the list in the database
        const db_res = await addData("userdata", "lists", {
            [params.list_id]: {
                entries: entries
            }
        });
        if (db_res.error !== null) {
            return fail(400, {"errors": ["Failed to update list data in database"]});
        }
    },
    delete: async({ request, params }) => {
        // Get data from form submission
        const req_data = await request.json();
        const title = req_data.title;
        const section = req_data.section;
        // Get the list associated with this page
        const list_id = params.list_id;
        let entries = (await getLists([list_id]))[list_id];
        if (entries === undefined) {
            return fail(400, {"errors": ["Failed to fetch data from database"]});
        }
        entries = entries.entries;
        // Now remove the task from the list
        entries = entries.filter((entry) => entry.title !== title);
        // Remove list data from our cache for update
        try {
            await remove_item("lists", list_id);
        } catch (error) {
            return fail(400, {"errors": ["Failed to remove list data from cache"]});
        }
        // Update the list in the database
        const db_res = await addData("userdata", "lists", {
            [params.list_id]: {
                entries: entries
            }
        });
        if (db_res.error !== null) {
            throw new Error("Failed to update list data in database");
        }
    },
}