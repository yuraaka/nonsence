import { useState } from 'react';
import { useAppDispatch } from '../store';
import { addNote } from '../store/notesSlice';

export default function AddNote() {
  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    if (content.trim()) {
      dispatch(addNote({ id: Date.now().toString(), content }));
      setContent('');
    }
  };

  return (
    <div>
      <input value={content} onChange={e => setContent(e.target.value)} placeholder="New note" />
      <button onClick={handleAdd}>Add Note</button>
    </div>
  );
}
