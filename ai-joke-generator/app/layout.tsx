// app/layout.tsx
import './globals.css'; // Global styles
import { ReactNode } from 'react';

export const metadata = {
  title: 'AI Joke Generator',
  description: 'Generate and evaluate jokes using AI',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container">
            <h1>AI Joke Generator</h1>
            <nav>
              <a href="/">Home</a>
              <a href="/joke">Generate a Joke</a>
            </nav>
          </div>
        </header>
        <main className="main">{children}</main>
        <footer className="footer">
          <div className="container">
            <p>Powered by OpenAI</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
