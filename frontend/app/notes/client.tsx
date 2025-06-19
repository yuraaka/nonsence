// app/notes/page.tsx
'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setNotes } from '../../store/notes-slice';
import Note from '../../types/note';

interface NotesClientProps {
  initialNotes: Note[];
}

export default function NotesClient({ initialNotes }: NotesClientProps) {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNotes(initialNotes));
  }, [dispatch, initialNotes]);

  return (
    <main>
      <h1>Notes</h1>
      <ul>
        <li>Example note 1</li>
        <li>Example note 2</li>
        {notes.map((note: any) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </main>
  );
}
