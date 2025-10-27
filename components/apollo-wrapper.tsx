"use client"

import type React from "react"

import { ApolloProvider } from "@apollo/client/react"
import { apolloClient } from "@/lib/apollo-client"

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  if (!apolloClient) {
    return <>{children}</>
  }

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
