import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Priscila Zygoski",
  description: "Teclados Musicais",
  charset: 'UTF-8',
  author: 'Priscila Zygoski',
  keywords: 'Teclados Musicais'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}