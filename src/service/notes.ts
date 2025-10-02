import { NoteType } from "../types/noteType";
import { Storage } from "./storage";

const NOTES_KEY = "notes";

export class Notes {
  notes: NoteType[] | null;

  constructor() {
    this.notes = null;
  }

  static async getNotes(): Promise<NoteType[]> {
    const notes = await Storage.getItem<NoteType[]>(NOTES_KEY);
    return notes || [];
  }

  static async saveNotes(notes: NoteType[]): Promise<void> {
    await Storage.setItem(NOTES_KEY, notes);
  }

  static async addNote(note: NoteType): Promise<void> {
    const notes = await Notes.getNotes();
    notes.push(note);
    await Notes.saveNotes(notes);
  }

  static async updateNote(updatedNote: NoteType): Promise<void> {
    let notes = await Notes.getNotes();
    notes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    await Notes.saveNotes(notes);
  }

  static async deleteNote(noteId: string): Promise<void> {
    let notes = await Notes.getNotes();
    notes = notes.filter((note) => note.id !== noteId);
    await Notes.saveNotes(notes);
  }

  static async deleteAllNotes(): Promise<void> {
    await Storage.removeItem(NOTES_KEY);
  }
}
