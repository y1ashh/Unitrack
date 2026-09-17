import type { Metadata } from 'next';
import './globals.css';
import './theme-overrides.css';

export const metadata: Metadata = {
  title: 'University Tracker — Find your next academic chapter',
  description: 'Research universities, compare programs, understand requirements, and plan your application.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
