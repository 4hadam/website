import { gql } from "@apollo/client"

export const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries(first: 250) {
      nodes {
        id
        title
        slug
        countryMeta {
          countryCode
          latitude
          longitude
        }
      }
    }
  }
`

export const GET_CHANNELS_BY_COUNTRY = gql`
  query GetChannelsByCountry($countryId: ID!) {
    country(id: $countryId) {
      id
      title
      channels {
        nodes {
          id
          title
          slug
          channelMeta {
            youtubeChannelId
            category
            logo
          }
        }
      }
    }
  }
`

export const GET_COUNTRY_DETAIL = gql`
  query GetCountryDetail($slug: String!) {
    countryBySlug(slug: $slug) {
      id
      title
      content
      countryMeta {
        countryCode
        latitude
        longitude
        description
      }
      channels {
        nodes {
          id
          title
          channelMeta {
            youtubeChannelId
            category
            logo
          }
        }
      }
    }
  }
`
