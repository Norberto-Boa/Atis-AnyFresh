import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/authContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <AuthProvider>
          <Navbar />
          <Sidebar />
          <Component {...pageProps} />
        </AuthProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
