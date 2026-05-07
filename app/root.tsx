import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-slate-100 text-gray-900">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";

    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <div className="rounded-3xl border border-red-100 bg-white p-10 shadow-xl">
        <h1 className="mb-4 text-5xl font-black text-red-500">{message}</h1>

        <p className="mb-6 text-lg text-gray-600">{details}</p>

        {stack && (
          <pre className="overflow-x-auto rounded-xl bg-gray-100 p-4 text-sm">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}