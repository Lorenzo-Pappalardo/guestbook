import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { PropsWithChildren } from 'react';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Guestbook',
  description: 'Leave a message and connect with visitors from around the world'
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
        <div className="grid grid-rows-[auto_1fr] items-center justify-items-center min-h-screen gap-8 px-4 py-2 font-[family-name:var(--font-geist-sans)]">
          <header className="w-full">
            <h1 className="text-3xl font-extrabold tracking-tight text-balance">Always Friday</h1>
          </header>
          <main className="flex flex-col max-w-5xl m-auto w-full h-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
