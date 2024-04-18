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

export const actions = {
  default: async({ cookies }) => {
    const auth = cookies.get('auth');
    if (auth === undefined) {
        return "/login";
    } else {
        const user = await getUserFromAuth(auth);
        if (user.result !== null) {
            return "/account/" + user.result;
        } else {
            return "err";
        }
    }
  }
}