import { addNote } from '@/controller/notes';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json(await addNote(data.content));
}
