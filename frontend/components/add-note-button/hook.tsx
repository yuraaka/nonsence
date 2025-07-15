'use client';

import { FormEvent, useCallback, useState } from 'react';
import { useAppDispatch, useInput } from '@/hooks/common';
import { addNote } from '@/store/notes-slice';

async function postNote(content: string) {
  const res = await fetch('http://localhost:3000/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    throw new Error('Failed to add note');
  }

  return await res.json();
}

export default function useHook() {
  const dispatch = useAppDispatch();
  const { content, onChange, clearInput } = useInput('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      if (!content.trim()) {
        return;
      }

      setLoading(true);
      try {
        const newNote = await postNote(content);
        dispatch(addNote(newNote));
        clearInput();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [content, dispatch, clearInput],
  );

  return { content, onChange, loading, error, handleSubmit }
}
