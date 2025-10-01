# Notes App with Folders & Search

This app allows users to create notes, organize them into folders, and search/filter notes. It also supports voice-to-text note creation using the Expo Speech API.

---

## App Flow

1. **Home Screen**
   - Displays a list of folders.
   - Option to create a new folder.
   - Tap a folder to view its notes.

2. **Folder Screen**
   - Shows notes within the selected folder.
   - Option to create a new note.
   - Search bar to filter notes by title/content.
   - Tap a note to view/edit.

3. **Note Screen**
   - View or edit note content.
   - Option to use voice-to-text to add content.
   - Save or delete note.

---

## Navigation Structure

- **Root Stack Navigator**
  - `HomeScreen` (Folders List)
    - **Folder Stack Navigator** (nested)
      - `FolderScreen` (Notes in Folder)
        - `NoteScreen` (View/Edit Note)

Example (React Navigation v6+):
# notes-app
