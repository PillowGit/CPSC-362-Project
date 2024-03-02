export function load({ cookies }) {
    const auth_cookie = cookies.get('auth-cookie');
    return {
        cookie: auth_cookie,
    };
}