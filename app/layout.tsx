import type { Metadata } from "next";

import theme from "@/utils/theme";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ApolloProviderWrapper } from "./providers";

export const metadata: Metadata = {
  title: "HRIS Dashboard",
  description:
    "A centralized platform for managing your organization's human resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <MUIThemeProvider theme={theme}>
            <CssBaseline />
            <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
          </MUIThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
