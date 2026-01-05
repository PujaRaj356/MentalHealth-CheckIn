import Link from "next/link";
import "./globals.css"; // optional, if you have global CSS

export const metadata = {
  title: "Mental Health App",
  description: "AI-based mental health check-in",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-purple-100 to-pink-100">
        {/* Header / Navbar */}
        <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">🌸 Mental Health App</h1>
            <nav className="space-x-4">
              <Link href="/">Home</Link>
              <Link href="/history">History</Link>
              <Link href="/tips">Tips</Link>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-purple-50 text-center py-4 text-purple-800 mt-auto">
          © 2026 Mental Health App 🌸
        </footer>
      </body>
    </html>
  );
}
