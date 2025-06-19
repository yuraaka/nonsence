import { ReactNode } from 'react';
import ReduxProvider from './redux-provider';
import '../styles/notes-ios.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
