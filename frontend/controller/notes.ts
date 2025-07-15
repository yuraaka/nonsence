import Note from '../types/note';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://backend:8080' 
  : 'http://localhost:8080';

export async function getNotes(): Promise<Note[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      cache: 'no-store', // Ensure fresh data for SSR
    });
    
    if (!response.ok) {
      console.error('Failed to fetch notes from backend, using fallback data');
      // Fallback to sample data if backend is not available
      return [
        { id: '1', content: 'Welcome to your notes app!' },
        { id: '2', content: 'Backend connection will be established when available' },
      ];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching notes:', error);
    // Fallback to sample data
    return [
      { id: '1', content: 'Welcome to your notes app!' },
      { id: '2', content: 'Backend connection will be established when available' },
    ];
  }
}

export async function addNote(content: string): Promise<Note> {
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
  
  return await response.json();
}
