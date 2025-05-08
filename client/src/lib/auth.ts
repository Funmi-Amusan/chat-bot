
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
export const { auth, handlers, signIn } = NextAuth({ providers: [GitHub, Google, Credentials({
    credentials: {
        email: {},
        password: {}
    },
    authorize: async (credentials) => {
        const email = 'funmi@test.com'
        const password = '123456'
        if (credentials?.email === email && credentials?.password === password) {
            return {
                id: '1',
                email: email,
                name: 'Funmi',
                image: 'https://avatars.githubusercontent.com/u/1?v=4'  
            }
        } else {
            throw new Error('Invalid credentials')
        }
    }
})] })