import { useState, useEffect } from 'react';
import Note from '../types/note';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:8080' 
  : 'http://localhost:8080';

export function useNotes(initialNotes: Note[] = []) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/notes`);
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const fetchedNotes = await response.json();
      setNotes(fetchedNotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (content: string) => {
    if (!content.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add note');
      }
      
      const newNote = await response.json();
      setNotes(prev => [...prev, newNote]);
      return newNote;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/notes?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
      
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialNotes.length === 0) {
      fetchNotes();
    }
  }, []);

  return {
    notes,
    loading,
    error,
    addNote,
    deleteNote,
    refreshNotes: fetchNotes,
  };
}