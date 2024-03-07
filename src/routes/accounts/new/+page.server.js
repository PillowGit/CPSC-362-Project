

// action handler
export const actions = {
    create: async({ request, cookies }) => {
        const data = await request.formData();
        console.dir(data);
    },
}