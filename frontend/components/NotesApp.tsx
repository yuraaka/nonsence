'use client';

import { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import Note from '../types/note';

interface NotesAppProps {
  initialNotes: Note[];
}

export default function NotesApp({ initialNotes }: NotesAppProps) {
  const { notes, loading, error, addNote, deleteNote } = useNotes(initialNotes);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addNote(newNoteContent);
      setNewNoteContent('');
    } catch {
      // Error is handled by the hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
    } catch {
      // Error is handled by the hook
    }
  };

  return (
    <div className="notes-app">
      <div className="add-note-section">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Write your note here..."
              disabled={isSubmitting}
              className="note-input"
            />
            <button 
              type="submit" 
              disabled={isSubmitting || !newNoteContent.trim()}
              className="add-button"
            >
              {isSubmitting ? 'Adding...' : 'Add Note'}
            </button>
          </div>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="notes-list">
        {loading && notes.length === 0 && (
          <div className="loading">Loading notes...</div>
        )}
        
        {notes.length === 0 && !loading ? (
          <div className="empty-state">
            <p>No notes yet. Add your first note above!</p>
          </div>
        ) : (
          <ul>
            {notes.map((note) => (
              <li key={note.id} className="note-item">
                <div className="note-content">{note.content}</div>
                <button 
                  onClick={() => handleDelete(note.id)}
                  className="delete-button"
                  aria-label="Delete note"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}