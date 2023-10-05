import { AuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import NextAuth from 'next-auth/next'

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_FIREBASE_AUTH_PROVIDER_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_FIREBASE_AUTH_PROVIDER_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken
      return session
    }
  },
  secret: 'default_secret_key'
}

const nextAuth = NextAuth(authOptions)

export { nextAuth as GET, nextAuth as POST }