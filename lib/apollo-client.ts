// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

export const apolloClient = WORDPRESS_URL
  ? new ApolloClient({
      link: new HttpLink({
        uri: `${WORDPRESS_URL}/graphql`,
      }),
      cache: new InMemoryCache(),
    })
  : null

export default apolloClient
