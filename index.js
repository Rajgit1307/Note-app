const addbtn = document.querySelector("#addbtn");
const main = document.querySelector("#main");

function saveNotes() {
  const notes = document.querySelectorAll(".note textarea");
  const data = [];
  notes.forEach((note) => {
    data.push(note.value);
  });
  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
  
}

addbtn.addEventListener("click", function () {
  addNote();
});

function addNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `<div class="tool">
    <i class=" save fa-solid fa-floppy-disk"></i>
    <i class=" trash fa-solid fa-trash"></i>
</div>
<textarea >${text}</textarea>`;

  note.querySelector(".trash").addEventListener("click", function () {
    note.remove(note);
    saveNotes()
  });

  note.querySelector(".save").addEventListener("click", function () {
    saveNotes();
  });

  note.querySelector("textarea").addEventListener("focusout",function(){
    saveNotes()
  })

  main.appendChild(note);
  saveNotes();
}

(function () {
  const lsNotes = JSON.parse(localStorage.getItem("notes"));
  if (lsNotes === null) {
    addNote()
  } else {
    lsNotes.forEach((lsNote) => {
      addNote(lsNote);
    });
  }

 
})();
