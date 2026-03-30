import "leaflet/dist/leaflet.css";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata = {
  title: "MapMyStore - AI Retail Optimization",
  description: "Machine Learning–Based Retail Site Optimization System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <SmoothScrollProvider>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </SmoothScrollProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
