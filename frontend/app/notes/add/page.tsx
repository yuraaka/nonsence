// app/notes/add/page.tsx
'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../../../store/notes-slice';

export default function AddNotePage() {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleAdd = async () => {
    if (content.trim()) {
      // Optionally, POST to your Go backend here
      // await fetch('/api/notes', { ... });
      dispatch(addNote({ id: Date.now().toString(), content }));
      setContent('');
    }
  };

  return (
    <main>
      <h1>Add Note</h1>
      <input
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="New note"
      />
      <button onClick={handleAdd}>Add Note</button>
    </main>
  );
}
