import { getUserFromAuth } from '$lib/server/utils/get';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    if ( cookies.get('auth') !== undefined ) {
        const user_result = await getUserFromAuth(cookies.get('auth'));
        if (user_result.error === null)
            redirect(302, "/account/" + user_result.result);
    }
    redirect(302, "/account/NULL");
}