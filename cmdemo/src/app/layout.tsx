import type { Metadata } from "next";
import { Montserrat, Oxanium } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/header";
import ThemeProvider from "@/app/context/themeProvider";
import { ModuleProvider } from '@/app/context/modulesContext';
import Footer from "@/app/components/footer";

// Fetch the modules on the server side to pass them to the context
import { getModules } from "@/app/api/db/route";
const modules = await getModules();

export const metadata: Metadata = {
  title: "The Coaching Masters",
  description: "The Coaching Masters learning portal",
};

// Initialise fonts
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head >
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/assets/favicons/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/assets/favicons/favicon.svg" />
        <link rel="shortcut icon" href="/assets/favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="TCM" />
        <link rel="manifest" href="/assets/favicons/site.webmanifest" />
      </head>

      <body className={`${montserrat.variable} ${oxanium.variable} antialiased flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ModuleProvider modules={modules || []}>
            <Header />
            {children}
          </ModuleProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html >
  );
}
