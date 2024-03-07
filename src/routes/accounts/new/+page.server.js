// Form fail function
import { fail } from '@sveltejs/kit';

// action handler
export const actions = {
    create: async({ request, cookies }) => {
        const data = await request.formData();
        console.dir(data);
        // Form error handling
        return fail(400, { status: 'this shit is not implemented bro' });
    },
}

