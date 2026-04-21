const STORAGE_KEY = "second-brain-advanced-v1";

const starterNotes = [
  {
    id: "1",
    title: "Machine Learning",
    content: "A field of AI focused on building systems that learn from data and improve through experience.",
    tags: ["AI", "Core"],
    links: ["2", "3"],
    createdAt: Date.now() - 100000,
    updatedAt: Date.now() - 100000
  },
  {
    id: "2",
    title: "Neural Networks",
    content: "A deep learning model inspired by the human brain and used in computer vision and NLP.",
    tags: ["AI", "Deep Learning"],
    links: ["1", "3"],
    createdAt: Date.now() - 90000,
    updatedAt: Date.now() - 90000
  },
  {
    id: "3",
    title: "Data Preprocessing",
    content: "Cleaning, encoding, scaling, and transforming raw data before training ML models.",
    tags: ["Data", "Workflow"],
    links: ["1"],
    createdAt: Date.now() - 80000,
    updatedAt: Date.now() - 80000
  },
  {
    id: "4",
    title: "Productivity Systems",
    content: "Methods and frameworks that improve consistency, focus, and execution of work.",
    tags: ["Self", "Habits"],
    links: ["5"],
    createdAt: Date.now() - 70000,
    updatedAt: Date.now() - 70000
  },
  {
    id: "5",
    title: "Atomic Habits",
    content: "Small repeated improvements can compound into meaningful long-term change.",
    tags: ["Books", "Habits"],
    links: ["4"],
    createdAt: Date.now() - 60000,
    updatedAt: Date.now() - 60000
  }
];

let notes = [];
let selectedId = null;
let editingId = null;
let searchText = "";
let selectedLinks = [];

const notesCount = document.getElementById("notesCount");
const connectionsCount = document.getElementById("connectionsCount");
const visibleCount = document.getElementById("visibleCount");
const tagsCount = document.getElementById("tagsCount");
const notesList = document.getElementById("notesList");
const selectedNoteContent = document.getElementById("selectedNoteContent");
const linkedNotes = document.getElementById("linkedNotes");
const backlinks = document.getElementById("backlinks");
const aiSuggestions = document.getElementById("aiSuggestions");
const graphSvg = document.getElementById("graphSvg");
const editorPanel = document.getElementById("editorPanel");
const editorTitle = document.getElementById("editorTitle");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const tagsInput = document.getElementById("tagsInput");
const linkSelector = document.getElementById("linkSelector");
const searchInput = document.getElementById("searchInput");
const newNoteBtn = document.getElementById("newNoteBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const resetGraphBtn = document.getElementById("resetGraphBtn");

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    notes = Array.isArray(saved) && saved.length ? saved : starterNotes;
  } catch (error) {
    notes = starterNotes;
  }
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString();
}

function truncate(text, len = 90) {
  return text.length > len ? text.slice(0, len) + "..." : text;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getFilteredNotes() {
  const query = searchText.trim().toLowerCase();
  if (!query) return notes;

  return notes.filter((note) => {
    const combined = [note.title, note.content, ...(note.tags || [])]
      .join(" ")
      .toLowerCase();
    return combined.includes(query);
  });
}

function getSelectedNote() {
  return notes.find((note) => note.id === selectedId) || null;
}

function getUniqueTagsCount() {
  return new Set(notes.flatMap((note) => note.tags)).size;
}

function getConnectionsCount() {
  return notes.reduce((sum, note) => sum + note.links.length, 0);
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

function getAISuggestions(note) {
  if (!note) return [];

  const currentWords = new Set([
    ...tokenize(note.title),
    ...tokenize(note.content),
    ...note.tags.map((tag) => tag.toLowerCase())
  ]);

  const linkedSet = new Set(note.links);

  const scored = notes
    .filter((n) => n.id !== note.id && !linkedSet.has(n.id))
    .map((candidate) => {
      const candidateWords = new Set([
        ...tokenize(candidate.title),
        ...tokenize(candidate.content),
        ...candidate.tags.map((tag) => tag.toLowerCase())
      ]);

      let score = 0;
      currentWords.forEach((word) => {
        if (candidateWords.has(word)) score += 1;
      });

      const sharedTags = note.tags.filter((tag) =>
        candidate.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
      ).length;

      score += sharedTags * 2;

      return { ...candidate, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return scored;
}

function renderStats() {
  notesCount.textContent = notes.length;
  connectionsCount.textContent = getConnectionsCount();
  visibleCount.textContent = getFilteredNotes().length;
  tagsCount.textContent = getUniqueTagsCount();
}

function renderNotesList() {
  const filteredNotes = getFilteredNotes();
  notesList.innerHTML = "";

  if (!filteredNotes.length) {
    notesList.innerHTML = '<div class="empty">No notes match your search.</div>';
    return;
  }

  filteredNotes.forEach((note) => {
    const div = document.createElement("div");
    div.className = "note-card" + (note.id === selectedId ? " active" : "");
    div.innerHTML = `
      <div class="note-card-title">${escapeHtml(note.title)}</div>
      <div class="note-card-text">${escapeHtml(truncate(note.content))}</div>
      <div class="tags">
        ${note.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
      </div>
    `;
    div.onclick = () => {
      selectedId = note.id;
      renderApp();
    };
    notesList.appendChild(div);
  });
}

function renderSelectedNote() {
  const note = getSelectedNote();

  if (!note) {
    selectedNoteContent.innerHTML = '<div class="empty">Select a note to inspect it.</div>';
    linkedNotes.innerHTML = '<div class="empty">No outgoing links.</div>';
    backlinks.innerHTML = '<div class="empty">No backlinks.</div>';
    aiSuggestions.innerHTML = '<div class="empty">No suggestions.</div>';
    return;
  }

  selectedNoteContent.innerHTML = `
    <div class="selected-title">${escapeHtml(note.title)}</div>
    <div class="tags">
      ${note.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
    </div>
    <div class="selected-text">${escapeHtml(note.content)}</div>
    <div class="meta">
      Created: ${formatDate(note.createdAt)}<br>
      Updated: ${formatDate(note.updatedAt)}
    </div>
    <div class="action-row">
      <button class="primary-btn" onclick="startEdit()">Edit</button>
      <button class="ghost-btn" onclick="deleteNote()">Delete</button>
    </div>
  `;

  const outgoing = notes.filter((n) => note.links.includes(n.id));
  const incoming = notes.filter((n) => n.links.includes(note.id));
  const suggestions = getAISuggestions(note);

  linkedNotes.innerHTML = outgoing.length
    ? outgoing.map((n) => `
      <div class="mini-card" onclick="selectNote('${n.id}')">
        <div class="note-card-title">${escapeHtml(n.title)}</div>
        <div class="mini-muted">${escapeHtml(truncate(n.content, 60))}</div>
      </div>
    `).join("")
    : '<div class="empty">No outgoing links.</div>';

  backlinks.innerHTML = incoming.length
    ? incoming.map((n) => `
      <div class="mini-card" onclick="selectNote('${n.id}')">
        <div class="note-card-title">${escapeHtml(n.title)}</div>
        <div class="mini-muted">References this note</div>
      </div>
    `).join("")
    : '<div class="empty">No backlinks.</div>';

  aiSuggestions.innerHTML = suggestions.length
    ? suggestions.map((n) => `
      <div class="mini-card" onclick="linkSuggestedNote('${n.id}')">
        <div class="note-card-title">${escapeHtml(n.title)}</div>
        <div class="mini-muted">${escapeHtml(truncate(n.content, 55))}</div>
        <div class="suggestion-score">Match score: ${n.score} · click to link</div>
      </div>
    `).join("")
    : '<div class="empty">No AI suggestions found.</div>';
}

function renderLinkSelector() {
  linkSelector.innerHTML = "";
  const availableNotes = notes.filter((note) => note.id !== editingId);

  if (!availableNotes.length) {
    linkSelector.innerHTML = '<div class="empty">No notes available.</div>';
    return;
  }

  availableNotes.forEach((note) => {
    const div = document.createElement("div");
    div.className = "link-option" + (selectedLinks.includes(note.id) ? " selected" : "");
    div.innerHTML = `
      <div class="note-card-title">${escapeHtml(note.title)}</div>
      <div class="mini-muted">${escapeHtml(note.tags.join(", "))}</div>
    `;

    div.onclick = () => {
      if (selectedLinks.includes(note.id)) {
        selectedLinks = selectedLinks.filter((id) => id !== note.id);
      } else {
        selectedLinks.push(note.id);
      }
      renderLinkSelector();
    };

    linkSelector.appendChild(div);
  });
}

function getGraphPositions(filteredNotes, width, height) {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 90;
  const positions = {};

  filteredNotes.forEach((note, index) => {
    const angle = (Math.PI * 2 * index) / Math.max(filteredNotes.length, 1) - Math.PI / 2;
    const wobble = 28 * Math.sin(index * 1.6);
    positions[note.id] = {
      x: centerX + (radius + wobble) * Math.cos(angle),
      y: centerY + (radius - wobble / 2) * Math.sin(angle)
    };
  });

  return positions;
}

function renderGraph() {
  const filteredNotes = getFilteredNotes();
  const filteredIds = new Set(filteredNotes.map((n) => n.id));
  const width = 900;
  const height = 520;
  const positions = getGraphPositions(filteredNotes, width, height);

  let svgContent = `
    <defs>
      <radialGradient id="bgGlow" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.12)"></stop>
        <stop offset="100%" stop-color="rgba(255,255,255,0)"></stop>
      </radialGradient>
      <filter id="softGlow">
        <feGaussianBlur stdDeviation="3" result="blur"></feGaussianBlur>
        <feMerge>
          <feMergeNode in="blur"></feMergeNode>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>
    </defs>
    <circle cx="${width / 2}" cy="${height / 2}" r="150" fill="url(#bgGlow)"></circle>
  `;

  filteredNotes.forEach((note) => {
    note.links.forEach((targetId) => {
      if (filteredIds.has(targetId) && positions[note.id] && positions[targetId]) {
        const active = selectedId === note.id || selectedId === targetId;
        svgContent += `
          <line
            x1="${positions[note.id].x}"
            y1="${positions[note.id].y}"
            x2="${positions[targetId].x}"
            y2="${positions[targetId].y}"
            stroke="${active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.20)"}"
            stroke-width="${active ? "2.4" : "1.2"}"
          ></line>
        `;
      }
    });
  });

  filteredNotes.forEach((note, index) => {
    const pos = positions[note.id];
    const degree = note.links.filter((id) => filteredIds.has(id)).length;
    const nodeRadius = degree >= 5 ? 30 : degree >= 3 ? 26 : degree >= 1 ? 22 : 18;
    const isActive = selectedId === note.id;
    const label = note.title.length > 14 ? note.title.slice(0, 14) + "…" : note.title;
    const pulseDelay = (index * 0.25).toFixed(2);

    svgContent += `
      <g onclick="selectNote('${note.id}')" style="cursor:pointer;">
        <circle
          cx="${pos.x}"
          cy="${pos.y}"
          r="${isActive ? nodeRadius + 8 : nodeRadius}"
          fill="${isActive ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"}"
          stroke="${isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.38)"}"
          stroke-width="${isActive ? "2.6" : "1.2"}"
          filter="url(#softGlow)"
        >
          <animate
            attributeName="r"
            values="${isActive ? nodeRadius + 6 : nodeRadius};${isActive ? nodeRadius + 10 : nodeRadius + 2};${isActive ? nodeRadius + 6 : nodeRadius}"
            dur="2.4s"
            begin="${pulseDelay}s"
            repeatCount="indefinite"
          />
        </circle>
        <text
          x="${pos.x}"
          y="${pos.y + 4}"
          fill="white"
          font-size="${isActive ? 13 : 11}"
          font-weight="${isActive ? 700 : 500}"
          text-anchor="middle"
        >${escapeHtml(label)}</text>
      </g>
    `;
  });

  graphSvg.innerHTML = svgContent;
}

function showEditor(createMode = true) {
  editorPanel.classList.remove("hidden");
  editorTitle.textContent = createMode ? "Create Note" : "Edit Note";
  renderLinkSelector();
}

function hideEditor() {
  editorPanel.classList.add("hidden");
  editingId = null;
  selectedLinks = [];
  titleInput.value = "";
  contentInput.value = "";
  tagsInput.value = "";
}

function startCreate() {
  editingId = null;
  selectedLinks = selectedId ? [selectedId] : [];
  titleInput.value = "";
  contentInput.value = "";
  tagsInput.value = "";
  showEditor(true);
}

function startEdit() {
  const note = getSelectedNote();
  if (!note) return;

  editingId = note.id;
  selectedLinks = [...note.links];
  titleInput.value = note.title;
  contentInput.value = note.content;
  tagsInput.value = note.tags.join(", ");
  showEditor(false);
}

function saveCurrentNote() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const tags = tagsInput.value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (!title || !content) {
    alert("Please enter both title and content.");
    return;
  }

  if (editingId) {
    notes = notes.map((note) => {
      if (note.id === editingId) {
        return {
          ...note,
          title,
          content,
          tags,
          links: selectedLinks.filter((id) => id !== editingId),
          updatedAt: Date.now()
        };
      }
      return note;
    });
    selectedId = editingId;
  } else {
    const id = uid();
    notes.unshift({
      id,
      title,
      content,
      tags,
      links: [...selectedLinks],
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    selectedId = id;
  }

  saveNotes();
  hideEditor();
  renderApp();
}

function deleteNote() {
  const note = getSelectedNote();
  if (!note) return;

  notes = notes
    .filter((n) => n.id !== note.id)
    .map((n) => ({
      ...n,
      links: n.links.filter((id) => id !== note.id)
    }));

  selectedId = notes[0] ? notes[0].id : null;
  saveNotes();
  renderApp();
}

function selectNote(id) {
  selectedId = id;
  renderApp();
}

function linkSuggestedNote(id) {
  const note = getSelectedNote();
  if (!note) return;

  notes = notes.map((n) => {
    if (n.id === note.id && !n.links.includes(id)) {
      return {
        ...n,
        links: [...n.links, id],
        updatedAt: Date.now()
      };
    }
    return n;
  });

  saveNotes();
  renderApp();
}

function resetGraphView() {
  renderGraph();
}

function renderApp() {
  const filteredNotes = getFilteredNotes();

  if (!filteredNotes.find((note) => note.id === selectedId)) {
    selectedId = filteredNotes[0] ? filteredNotes[0].id : (notes[0] ? notes[0].id : null);
  }

  renderStats();
  renderNotesList();
  renderSelectedNote();
  renderGraph();

  if (!editorPanel.classList.contains("hidden")) {
    renderLinkSelector();
  }
}

newNoteBtn.addEventListener("click", startCreate);
saveBtn.addEventListener("click", saveCurrentNote);
cancelBtn.addEventListener("click", hideEditor);
resetGraphBtn.addEventListener("click", resetGraphView);

searchInput.addEventListener("input", (e) => {
  searchText = e.target.value;
  renderApp();
});

loadNotes();
selectedId = notes[0] ? notes[0].id : null;
renderApp();

window.startEdit = startEdit;
window.deleteNote = deleteNote;
window.selectNote = selectNote;
window.linkSuggestedNote = linkSuggestedNote;
