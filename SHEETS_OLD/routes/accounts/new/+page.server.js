// Form fail function
import { fail } from '@sveltejs/kit';

// action handler
export const actions = {
    create: async({ request, cookies }) => {
        // Get data from form submission
        const data = await request.formData();
        // Grab the author field
        const author = data.get('author').toString();
        // Check if author is filled
        if (author === "") {
            // Return fail message if it's not
            return fail(400, {status: "you must specify an author"});
        }
        // we are lazy
        return fail(400, { status: 'this shit is not implemented bro' });
    },
}

