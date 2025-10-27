// lib/wordpress-api.ts
import { apolloClient } from "@/lib/apollo-client"
import { gql } from "@apollo/client"

export async function getAllCountries() {
  if (!apolloClient) {
    console.warn("[WordPress API] Apollo client not configured")
    return []
  }

  const { data } = await apolloClient.query({
    query: gql`
      query GetCountries {
        countries(first: 200) {
          nodes {
            id
            title
            slug
          }
        }
      }
    `,
  })

  return data.countries.nodes
}

export async function getChannelsByCountry(countryId: string) {
  if (!apolloClient) {
    console.warn("[WordPress API] Apollo client not configured")
    return []
  }

  const { data } = await apolloClient.query({
    query: gql`
      query GetChannelsByCountry($countryId: [ID]) {
        channels(where: { connectedTo: { targetId: $countryId } }) {
          nodes {
            id
            title
            channelData {
              streamUrl
              channelLogo
              channelCategory
              channelDescription
            }
          }
        }
      }
    `,
    variables: { countryId },
  })

  return data.channels.nodes
}
