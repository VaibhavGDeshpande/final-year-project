import "leaflet/dist/leaflet.css";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

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
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
