// app/notes/page.tsx
'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setNotes } from '../../store/notes-slice';

export default function NotesPage() {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:8080/api/notes')
      .then(res => res.json())
      .then(data => dispatch(setNotes(data)));
  }, [dispatch]);

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
