import NextAuth, { AuthOptions } from "next-auth"
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const authOptions : AuthOptions = {
    providers:[
    GitHubProvider({
        clientId: process.env.CLIENT_ID_GITHUB as string,
        clientSecret: process.env.CLIENT_SECRET_GITHUB as string
    }),
    GoogleProvider({
        clientId: process.env.CLIENT_ID_GOOGLE as string,
        clientSecret: process.env.CLIENT_SECRET_GOOGLE as string,
    })
],
pages: {
    signIn:"/signin"
},
secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}