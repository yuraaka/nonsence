import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: string;
  content: string;
}

interface NoteState {
  notes: Note[];
  yuraaka: string;
}

const initialState: NoteState = { notes: [], yuraaka: 'yuraaka' };

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes(state, action: PayloadAction<Note[]>) {
      state.notes = action.payload;
    },
    addNote(state, action: PayloadAction<Note>) {
      state.notes.push(action.payload);
    },
  },
});

export const { setNotes, addNote } = notesSlice.actions;
export default notesSlice.reducer;
