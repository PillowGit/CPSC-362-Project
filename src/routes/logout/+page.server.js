// Redirect back to login page
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  await cookies.delete('auth', {path: '/'});
  redirect(302, `/login`);
}