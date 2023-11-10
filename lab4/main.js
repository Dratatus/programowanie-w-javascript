const localStorageKey = 'savedNotes'
const defaultNoteColor = '#f0e34d'

var notes;

function loadNotes() {
    let localData = localStorage.getItem(localStorageKey);
    let notes = JSON.parse(localData);
    return notes == null ? [] : notes
}

function deleteNote(id) {
    console.log(id)
    notes.splice(id, 1);
    saveNotes();
    displayNotes();
}

function pinNote(id) {
    console.log(id)
    let note = notes.splice(id, 1)[0];
    notes.splice(0, 0, note);
    saveNotes();
    displayNotes();
}
function saveNotes() {
    let jsonString = JSON.stringify(notes);
    localStorage.setItem(localStorageKey, jsonString);
}

notes = loadNotes();
document.querySelector('input[name=note_color]').value = defaultNoteColor
document.querySelector('input[name=save_note]').addEventListener('click', createNote);

displayNotes();