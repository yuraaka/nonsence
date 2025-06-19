// app/notes/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Note from '../types/note';
import NoteList from '../components/notes-list';

import { RootState } from '../store';
import { addNote } from '../store/notes-slice';
import { setNotes } from '../store/notes-slice';

interface NotesClientProps {
  initialNotes: Note[];
}

export function Notes({ initialNotes }: NotesClientProps) {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNotes(initialNotes));
  }, [dispatch, initialNotes]);

  return <NoteList />
}

export function AddNote() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!content.trim()) return;

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        throw new Error('Failed to add note');
      }

      const newNote = await res.json();
      dispatch(addNote(newNote));
      setContent('');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your note here..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !content.trim()}>
          {loading ? 'Adding...' : 'Add Note'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
}
