// app/notes/add/page.tsx (Server Component)
import AddNoteClient from './client';

export default function AddNotePage() {
  // If you need to fetch data server-side, do it here and pass as props
  return <AddNoteClient />;
}
