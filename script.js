
let notes = [
  { id: 1, title: "AI", content: "Artificial Intelligence", links: [] }
];
let selectedId = 1;
const notesList = document.getElementById("notesList");
const selectedNote = document.getElementById("selectedNoteContent");
const graph = document.getElementById("graphSvg");
function renderNotes() {
  notesList.innerHTML = "";

  notes.forEach(n => {
    let div = document.createElement("div");
    div.innerText = n.title;
    div.onclick = () => {
      selectedId = n.id;
      render();
    };
    notesList.appendChild(div);
  });
}

function renderSelected() {
  let n = notes.find(x => x.id === selectedId);
  selectedNote.innerHTML = `<h2>${n.title}</h2><p>${n.content}</p>`;
}

function renderGraph() {
  graph.innerHTML = "";

  notes.forEach((n, i) => {
    let x = 100 + i * 100;
    let y = 100;

    graph.innerHTML += `
      <circle cx="${x}" cy="${y}" r="20" fill="blue"></circle>
      <text x="${x}" y="${y}" fill="white">${n.title}</text>
    `;
  });
}

function render() {
  renderNotes();
  renderSelected();
  renderGraph();
}

document.getElementById("newNoteBtn").onclick = () => {
  document.getElementById("editorPanel").style.display = "block";
};

document.getElementById("saveBtn").onclick = () => {
  let title = document.getElementById("titleInput").value;
  let content = document.getElementById("contentInput").value;

  notes.push({
    id: Date.now(),
    title,
    content,
    links: []
  });

  render();
};

render();
