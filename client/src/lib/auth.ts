import { loginURL } from "@/utils/end-point"
import NextAuth from "next-auth"
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
                console.error('Error parsing JSON:', parseError);
                data = {}; 
              }
              
              if (!response.ok) {
                throw new Error(data.message || `Failed with status: ${response.status}`);
              }
              if (data.userResponse) {
                return {
                  id: data.userResponse.id,
                  name: data.userResponse.name,
                  email: data.userResponse.email,
                };
              }
              
              console.error('Invalid response structure:', data);
              return null;
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
    }
})