import './globals.css';

export const metadata = {
  title: 'Scuro — Field Notes from the Edge of Code & Country',
  description:
    "A developer walking Kenya's open land. Building AI that speaks human. Watching markets so you don't have to.",
  openGraph: {
    title: 'Scuro — Field Notes from the Edge of Code & Country',
    description: 'Adventure, AI, and the quiet art of making sense of things.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
