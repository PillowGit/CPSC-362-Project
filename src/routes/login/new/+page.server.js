// Form fail function
import { fail } from '@sveltejs/kit';

// action handler
export const actions = {
    create: async({ request, cookies }) => {
        if ("" === "") {
            // Return fail message if it's not
            return fail(400, {status: "you must specify an author"});
        }
    },
}

