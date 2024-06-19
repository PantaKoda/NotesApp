import { DateTime } from "luxon";
//CREATING CLOCK/ iT UPDATES EVERY MINUTE
function displayDate() {
  const currentGreekTime = DateTime.now().setZone("Europe/Athens");
  const formatedDateTime = currentGreekTime.setLocale("el").toLocaleString({
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const dateHolderSelector = document.querySelector(".date-holder");

  dateHolderSelector.textContent = "";

  const p = document.createElement("p");

  p.textContent = formatedDateTime;

  dateHolderSelector.appendChild(p);
}

displayDate();
setInterval(displayDate, 1000);

//CREATING NOTE ITEMS
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;

  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

let notesCount = 0;

function createNewNote(note) {
  notesCount++;

  const noteDiv = document.createElement("div");
  noteDiv.className = "note-item";

  const div = document.createElement("div");
  noteDiv.appendChild(div);

  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("name", `note${notesCount}`);
  checkBox.id = `notes${notesCount}`;
  div.appendChild(checkBox);

  const label = document.createElement("label");
  label.setAttribute("for", `notes${notesCount}`);
  label.appendChild(document.createTextNode(note));
  div.appendChild(label);

  const button = createButton("eraseNotesBtn");
  noteDiv.appendChild(button);

  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);

  document.querySelector("#notes-list").appendChild(noteDiv);
}

//INSERTING NOTE ITEMS SECTION

const noteInput = document.getElementById("noteItemInput");
const notesList = document.getElementById("notes-list");
const notesForm = document.getElementById("notesForm");

function addNote(e) {
  e.preventDefault();

  const newNote = noteInput.value;
  //simple validation
  if (newNote === "") {
    alert("You must write something :)");
    return;
  }

  createNewNote(newNote);
  noteInput.value = "";
}

notesForm.addEventListener("submit", addNote);

//EVENT DELEGATION- REMOVE ITEMS

function removeNote(e) {
  if (e.target.parentElement.classList.contains("eraseNotesBtn")) {
    e.target.parentElement.parentElement.remove();
  }
}

notesList.addEventListener("click", removeNote);
