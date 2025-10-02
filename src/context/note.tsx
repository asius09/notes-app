import { NoteType } from "../types/noteType";
import React, { useState, useEffect, createContext, useContext } from "react";
import { Notes } from "../service/notes";

interface NoteContextProps {
  notes: NoteType[];
  createNote: (note: NoteType) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  deleteAllNotes: () => Promise<void>;
  updateNote: (note: NoteType) => Promise<void>;
  loading: "success" | "loading" | "error";
  error: string | null;
}
export const NoteContext = createContext<NoteContextProps | null>(null);

type NoteProviderProps = {
  children: React.ReactNode;
};

export const NoteProvider: React.FC<NoteProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [loading, setLoading] = useState<"success" | "loading" | "error">(
    "loading"
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading("loading");
      setError(null);
      try {
        const loadedNotes = await Notes.getNotes();
        setNotes(loadedNotes);
        setLoading("success");
      } catch (err: any) {
        setError(err?.message || "Failed to load notes");
        setLoading("error");
      }
    };
    fetchNotes();
  }, []);

  const createNote = async (note: NoteType) => {
    setLoading("loading");
    setError(null);
    try {
      await Notes.addNote(note);
      const updatedNotes = await Notes.getNotes();
      setNotes(updatedNotes);
      setLoading("success");
    } catch (err: any) {
      setError(err?.message || "Failed to create note");
      setLoading("error");
    }
  };

  const deleteNote = async (id: string) => {
    setLoading("loading");
    setError(null);
    try {
      await Notes.deleteNote(id);
      const updatedNotes = await Notes.getNotes();
      setNotes(updatedNotes);
      setLoading("success");
    } catch (err: any) {
      setError(err?.message || "Failed to delete note");
      setLoading("error");
    }
  };

  const deleteAllNotes = async () => {
    setLoading("loading");
    setError(null);
    try {
      await Notes.deleteAllNotes();
      setNotes([]);
      setLoading("success");
    } catch (err: any) {
      setError(err?.message || "Failed to delete all notes");
      setLoading("error");
    }
  };

  const updateNote = async (note: NoteType) => {
    setLoading("loading");
    setError(null);
    try {
      await Notes.updateNote(note);
      const updatedNotes = await Notes.getNotes();
      setNotes(updatedNotes);
      setLoading("success");
    } catch (err: any) {
      setError(err?.message || "Failed to update note");
      setLoading("error");
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        createNote,
        deleteNote,
        deleteAllNotes,
        updateNote,
        loading,
        error,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNote must be used within a NoteProvider");
  }
  return context;
};
