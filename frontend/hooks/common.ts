import { AppDispatch } from '@/store';
import { useState, ChangeEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useInput(initial = '') {
  const [content, setValue] = useState(initial);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    [],
  );

  const clearInput = useCallback(() => setValue(initial), [initial]);
  return { content, onChange, clearInput };
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
