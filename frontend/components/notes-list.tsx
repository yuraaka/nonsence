import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function NotesList() {
  const notes = useSelector((state: RootState) => state.notes.notes);

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>{note.content}</li>
      ))}
    </ul>
  )
}
