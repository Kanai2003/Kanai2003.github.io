import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kanailal Manna | SDE Portfolio",
  description:
    "Portfolio of Kanailal Manna, a Software Development Engineer specializing in Full Stack Development, AI & ML, and DevOps.",
  icons: {
    icon: "/mypic.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
