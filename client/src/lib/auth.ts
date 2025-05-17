import { fetchUserURL, loginURL } from "@/utils/end-point"
import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { auth, handlers, signIn, signOut } = NextAuth({ 
  providers: [
    GitHub, 
    Google, 
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new CredentialsSignin("Please provide both email and password");
        }
        
        try {
          const response = await fetch(loginURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
          });
          
          let data;
          try {
            data = await response.json();
          } catch (parseError) {
            console.error('Error parsing JSON response:', parseError);
            throw new Error('Invalid server response format');
          }
          
          if (!response.ok) {
            const errorMessage = data.message || `Authentication failed with status: ${response.status}`;
            console.error('Login error:', errorMessage);
            throw new Error(errorMessage);
          }
          
          if (!data.userResponse) {
            console.error('Invalid response structure:', data);
            throw new Error('Invalid server response structure');
          }
          
          return {
            id: data.userResponse.id,
            name: data.userResponse.name,
            email: data.userResponse.email,
          };
        } catch (error) {
          console.error("Authentication error:", error.message);
          throw error;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user?.email) {
        try {
          const response = await fetch(fetchUserURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: session.user.email })
          });
          
          if (!response.ok) {
            console.error(`Failed to fetch user data: ${response.status}`);
            return session;
          }
          
          const data = await response.json();
          
          if (data?.userResponse?.id) {
            session.user.id = data.userResponse.id;
          } else {
            console.error('Invalid user data response:', data);
          }
        } catch (error) {
          console.error('Error in session callback:', error);
        }
      }
      
      return session;
    }
  },
})