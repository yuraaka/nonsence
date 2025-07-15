// app/page.tsx
import NotesApp from '../components/NotesApp';
import { getNotes } from '../controller/notes';

export default async function Home() {
  const notes = await getNotes();
  
  return (
    <main>
      <h1>My iOS Notes App</h1>
      <NotesApp initialNotes={notes} />
    </main>
  );
}
