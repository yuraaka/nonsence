// app/page.tsx
import { Notes, AddNote } from './client';
import { getNotes } from '../controller/notes';

export default async function Home() {
  const notes = await getNotes()
  return (
    <main>
      <h1>My iOS Notes App</h1>
      <AddNote />
      <Notes initialNotes={notes} />
    </main>
  );
}
