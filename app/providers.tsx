"use client";

import { ApolloProvider } from "@apollo/client";
import { getClient } from "@/graphql/client";
import { ReactNode, useEffect, useState } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function ApolloProviderWrapper({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR, don't render the provider to avoid hydration issues
  if (!mounted) {
    return <>{children}</>;
  }

  const client = getClient();

  if (!client) {
    return <>{children}</>;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
