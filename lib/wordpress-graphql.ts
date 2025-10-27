import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

const GRAPHQL_ENDPOINT = "/api/graphql"
const WORDPRESS_GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || ""

let apolloClient: ApolloClient<any> | null = null

try {
  if (WORDPRESS_GRAPHQL_URL && WORDPRESS_GRAPHQL_URL.startsWith("http")) {
    apolloClient = new ApolloClient({
      link: new HttpLink({
        uri: GRAPHQL_ENDPOINT,
        credentials: "include",
      }),
      cache: new InMemoryCache(),
    })
  }
} catch (error) {
  console.warn("[WordPress] Failed to initialize Apollo client:", error)
  apolloClient = null
}

export { apolloClient }

export interface Country {
  id: string
  name: string
  slug: string
}

export interface Channel {
  id: string
  title: string
  streamUrl: string
  logoUrl?: string
  category?: string
  country?: string
}

// Your WordPress installation doesn't have "countries" or "channels" custom post types
// The app will use local data as the primary source

export async function getCountriesFromGraphQL(): Promise<Country[]> {
  return []
}

export async function getChannelsByCountryFromGraphQL(countrySlug: string): Promise<Channel[]> {
  return []
}

export async function searchChannelsInWordPress(query: string): Promise<Channel[]> {
  return []
}

export function isWordPressConfigured(): boolean {
  return !!WORDPRESS_GRAPHQL_URL && WORDPRESS_GRAPHQL_URL.startsWith("http") && apolloClient !== null
}
