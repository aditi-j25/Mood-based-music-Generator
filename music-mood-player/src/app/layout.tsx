//fix thisss

export const metadata = {
  title: "Music Mood Player",
  description: "Mood based music generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
