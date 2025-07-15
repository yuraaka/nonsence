'use client';
import useHook, { Args } from './hook';

export default function NoteList(args: Args) {
  const ctx = useHook(args);
  return (
    <ul>
      {ctx.notes.map((note) => (
        <li key={note.id}>{note.content}</li>
      ))}
    </ul>
  )
}
