// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Welcome to Personal Notes App</h1>
      <a href="/notes">View Notes</a>
      <a href="/notes/add" style={{ marginLeft: 16 }}>Add Note</a>
    </main>
  );
}
