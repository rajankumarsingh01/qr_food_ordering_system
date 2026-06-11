import "./globals.css";
import type { Metadata } from "next";

import ReduxProvider from "@/providers/redux-provider";

import { Toaster } from "react-hot-toast";

// export const metadata: Metadata = {
//   title: "QR Food Ordering",
//   description:
//     "Restaurant QR Food Ordering System",
// };



export const metadata: Metadata = {
  title: "QR Food Ordering",
  description: "Contactless restaurant ordering system",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          <Toaster
        
            position="top-right"
          />
        </ReduxProvider>
      </body>
    </html>
  );
}