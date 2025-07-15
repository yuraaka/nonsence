// app/page.tsx
import AddNoteButton from '@/components/add-note-button/template';
import NoteList from '@/components/note-list/template'
import { getNotes } from '../services/notes';

export default async function Home() {
  const notes = await getNotes()
  return (
    <main>
      <h1>Notes App</h1>
      <AddNoteButton />
      <NoteList initialNotes={notes} />
    </main>
  );
}
