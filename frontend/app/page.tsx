// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>My iOS Notes App</h1>
      <Link href="/notes" className="ios-link">View Notes</Link>
      <Link href="/notes/add" className="ios-link">Add Note</Link>
    </main>
  );
}
