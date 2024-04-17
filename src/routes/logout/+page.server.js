export const actions = {
  default: async({ cookies }) => {
    await cookies.delete('auth', {path: '/'});
  }
}