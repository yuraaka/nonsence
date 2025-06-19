import NotesClient from './client';
import { getNotes } from '../../controller/notes';

export default async function NotesPage() {
  const notes = await getNotes()
  return <NotesClient initialNotes={notes} />;
}
