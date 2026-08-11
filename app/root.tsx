import * as React from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  Link,
} from "react-router";
import type { LinksFunction } from "react-router";
import { Toaster } from "react-hot-toast";
import styles from "./app.css?url";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300..900;1,300..900&display=swap",
  },
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Prime Access 360 - Voucher Management</title>
        <Meta />
        <Links />
      </head>
      <body className="min-h-full bg-slate-50 text-slate-900 font-sans antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#0f172a",
              color: "#fff",
              borderRadius: "0.375rem",
              fontSize: "0.8125rem",
            },
          }}
        />

        <div className="flex min-h-screen">
          {/* Enterprise Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Main Application Area */}
          <div className="flex-1 flex flex-col min-w-0">
            <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              <Outlet />
            </main>
            <footer className="border-t border-slate-200 bg-white py-3 px-6 text-center sm:text-left text-xs text-slate-400">
              Prime Access 360 Nigeria Ltd
            </footer>
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let status = 500;
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.statusText || error.data?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Error - Prime Access 360</title>
        <Meta />
        <Links />
      </head>
      <body className="h-full flex items-center justify-center bg-slate-50 p-6 font-sans">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm border border-slate-200 text-center">
          <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
            !
          </div>
          <h1 className="text-lg font-bold text-slate-900 mb-1">Error {status}</h1>
          <p className="text-xs text-slate-600 mb-5">{message}</p>
          <Link
            to="/accounting/vouchers"
            className="inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold transition-colors"
          >
            Return
          </Link>
        </div>
      </body>
    </html>
  );
}
