export async function getNotes() {
  // todo: Fetch notes from DB or any source
  return [
    { id: '100', content: 'Sample note' },
    { id: '200', content: 'Sample note 2' },
  ];
}

export async function addNote(content: string) {
  // todo: Save note to DB or any source
  const timestamp = Date.now();
  return { id: timestamp, content: content };
}
