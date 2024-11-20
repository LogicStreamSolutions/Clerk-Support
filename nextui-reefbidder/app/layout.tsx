import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Providers } from "./providers";  // Combined providers
import packageJson from "@/package.json";  // Adjust path as necessary
import { ClerkProvider } from "@clerk/nextjs";
import { DevBanner } from "@/components/devBanner";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <DevBanner />
            <ClerkProvider>
        {/* Apply all providers here in nested structure if needed */}
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="http://logicstreamsolutions.com"
                title="logicstreamsolutions.com homepage"
              >
                <p>Version: {packageJson.version} | </p>
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">LogicStream Solutions</p>
              </Link>
            </footer>
          </div>
        </Providers>
        </ClerkProvider>
      </body>
    </html>

  );
}
