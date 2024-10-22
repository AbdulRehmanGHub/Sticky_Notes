const main = document.querySelector("main");

function addBtn(text = "") {
  const newNote = document.createElement("div");
  newNote.className = "note";

  newNote.innerHTML = `
    <div class="note-top">
      <button class="saveNote" title="Save Note">Save</button>
      <button class="deleteNote" title="Delete Note">X</button>
    </div>
    <div class="note-body">
      <textarea id="text" placeholder='Type your tasks here...'>${text}</textarea>
    </div>
  `;

  main.append(newNote);

  newNote.querySelector(".deleteNote").addEventListener("click", () => {
    if (window.confirm("Warning! Do you want to remove this Note?")) {
      newNote.remove();
      saveNotes();
      checkForEmptyNotes(); // Ensure at least one empty note is present
    }
  });

  newNote.querySelector(".saveNote").addEventListener("click", () => {
    saveNotes();
  });
}

function saveNotes() {
  const notes = document.querySelectorAll(".note textarea");
  const data = [];

  notes.forEach((note) => {
    if (note.value.trim() !== "") {
      data.push(note.value); // Save only non-empty notes
    }
  });

  if (data.length > 0) {
    localStorage.setItem("notes", JSON.stringify(data));
  } else {
    localStorage.removeItem("notes");
  }
}

function loadNotes() {
  const lsNotes = JSON.parse(localStorage.getItem("notes"));

  if (lsNotes && lsNotes.length > 0) {
    lsNotes.forEach((lsNote) => addBtn(lsNote));
  } else {
    addBtn(); // Create a single empty note if no saved notes exist
  }
}

function checkForEmptyNotes() {
  const existingNotes = document.querySelectorAll(".note");
  if (existingNotes.length === 0) {
    addBtn(); // Add one empty note if no notes exist
  }
}

// Initial load
(function () {
  loadNotes();
})();
