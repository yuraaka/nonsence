'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect } from 'react';
import { setNotes } from '../../store/notes-slice';

export interface Note {
  id: string;
  content: string;
}

export interface Args {
  initialNotes: Note[];
}

export default function useHook(args: Args) {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch();
  const effect = () => { dispatch(setNotes(args.initialNotes)) }
  useEffect(effect, [dispatch, args.initialNotes]);
  return { notes };
}
