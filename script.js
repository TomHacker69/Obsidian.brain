:root {
  --bg-main: #050912;
  --bg-card: rgba(15, 23, 42, 0.78);
  --bg-card-strong: rgba(15, 23, 42, 0.96);

  --text-main: #f8fafc;
  --text-muted: #cbd5e1;
  --text-soft: #94a3b8;

  --primary: #8b5cf6;
  --secondary: #60a5fa;
  --success: #34d399;

  --border: rgba(148, 163, 184, 0.20);
  --shadow-soft: 0 28px 80px rgba(15, 23, 42, 0.40);
  --shadow-strong: 0 36px 100px rgba(15, 23, 42, 0.55);

  --radius-lg: 24px;
  --radius-md: 18px;
  --radius-sm: 14px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  font-family: "Inter", Arial, Helvetica, sans-serif;
  background:
    radial-gradient(circle at top left, rgba(139, 92, 246, 0.16), transparent 22%),
    radial-gradient(circle at top right, rgba(96, 165, 250, 0.12), transparent 24%),
    linear-gradient(180deg, #03060f 0%, #050912 45%, #0b1120 100%);
  color: var(--text-main);
  padding: 24px;
}

#vanta-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.94;
}

button,
input,
textarea {
  font-family: inherit;
}

.container {
  max-width: 1450px;
  margin: 0 auto;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  position: relative;
  overflow: hidden;
  color: white;
  padding: 38px;
  border-radius: 34px;
  margin-bottom: 22px;
  background:
    radial-gradient(circle at 85% 15%, rgba(96, 165, 250, 0.35), transparent 28%),
    radial-gradient(circle at 15% 90%, rgba(124, 58, 237, 0.28), transparent 30%),
    linear-gradient(135deg, #020617, #0f172a 52%, #1e293b);
  box-shadow: var(--shadow-strong);
}

.hero::after {
  content: "";
  position: absolute;
  width: 280px;
  height: 280px;
  right: -120px;
  top: -110px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.22);
  filter: blur(8px);
}

.hero-left,
.hero-actions {
  position: relative;
  z-index: 1;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 7px 12px;
  border-radius: 999px;
  margin-bottom: 14px;
  color: #bfdbfe;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.hero h1 {
  font-size: clamp(36px, 5vw, 60px);
  line-height: 1;
  letter-spacing: -2px;
  margin-bottom: 14px;
}

.hero-text {
  max-width: 760px;
  color: #dbeafe;
  font-size: 16px;
  line-height: 1.75;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 18px;
}

.stat-card,
.panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  backdrop-filter: blur(26px);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
}

.stat-card {
  position: relative;
  overflow: hidden;
  padding: 22px;
  transition: 0.24s ease;
}

.stat-card::after {
  content: "";
  position: absolute;
  inset: auto 18px 0 18px;
  height: 3px;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(90deg, var(--primary), var(--secondary), var(--success));
  opacity: 0.75;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.13);
}

.stat-label {
  display: block;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 8px;
}

.stat-card strong {
  font-size: 38px;
  letter-spacing: -1px;
}

.main-grid {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr) 360px;
  gap: 18px;
  align-items: start;
}

.panel {
  padding: 20px;
}

.panel h2 {
  margin-bottom: 14px;
  font-size: 22px;
  letter-spacing: -0.4px;
}

.panel h3 {
  margin-bottom: 12px;
  font-size: 16px;
}

.panel-subtitle {
  margin-top: -8px;
  color: var(--text-muted);
  font-size: 13px;
}

input,
textarea {
  width: 100%;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: var(--radius-sm);
  padding: 13px 14px;
  font-size: 14px;
  outline: none;
  margin-bottom: 14px;
  background: rgba(15, 23, 42, 0.82);
  color: var(--text-main);
  transition: 0.2s ease;
}

input::placeholder,
textarea::placeholder {
  color: #94a3b8;
}

input:focus,
textarea:focus {
  border-color: rgba(37, 99, 235, 0.85);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.13);
  background: white;
}

textarea {
  min-height: 150px;
  resize: vertical;
  line-height: 1.6;
}

.primary-btn,
.ghost-btn {
  border: none;
  border-radius: 999px;
  padding: 13px 22px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.22s ease;
}

.primary-btn {
  color: white;
  background: linear-gradient(135deg, #8b5cf6, #60a5fa);
  box-shadow: 0 18px 40px rgba(99, 102, 241, 0.28);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 24px 54px rgba(99, 102, 241, 0.35);
}

.ghost-btn {
  color: white;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.ghost-btn:hover {
  background: rgba(255, 255, 255, 0.14);
  transform: translateY(-2px);
}

.section-head,
.graph-head,
.editor-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 14px;
  gap: 12px;
}

.notes-list,
.link-selector,
.mini-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notes-list {
  max-height: 620px;
  overflow-y: auto;
  padding-right: 4px;
}

.notes-list::-webkit-scrollbar {
  width: 6px;
}

.notes-list::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.45);
  border-radius: 999px;
}

.note-card,
.mini-card,
.link-option {
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 20px;
  padding: 14px;
  background: rgba(15, 23, 42, 0.78);
  transition: 0.22s ease;
  cursor: pointer;
}

.note-card:hover,
.mini-card:hover,
.link-option:hover {
  transform: translateY(-3px);
  border-color: rgba(139, 92, 246, 0.65);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.18);
}

.note-card.active,
.link-option.selected {
  color: white;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.96));
  border-color: transparent;
  box-shadow: 0 20px 50px rgba(99, 102, 241, 0.28);
}

.note-card-title {
  font-weight: 800;
  color: white;
  margin-bottom: 6px;
}

.note-card-text,
.mini-muted {
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.55;
}

.note-card.active .note-card-text,
.note-card.active .mini-muted,
.link-option.selected .mini-muted {
  color: #e2e8f0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.tag {
  background: rgba(99, 102, 241, 0.14);
  color: #c7d2fe;
  padding: 6px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
}

.note-card.active .tag {
  background: rgba(255, 255, 255, 0.12);
  color: #f8fafc;
}

.center-panel {
  overflow: hidden;
}

.graph-wrapper {
  position: relative;
  overflow: hidden;
  margin-bottom: 18px;
  padding: 14px;
  border-radius: 28px;
  background:
    radial-gradient(circle at center, rgba(96, 165, 250, 0.2), transparent 58%),
    radial-gradient(circle at 75% 20%, rgba(124, 58, 237, 0.18), transparent 36%),
    linear-gradient(135deg, #020617, #0f172a, #111827);
  box-shadow:
    inset 0 0 70px rgba(59, 130, 246, 0.12),
    0 18px 40px rgba(15, 23, 42, 0.14);
}

#graphSvg {
  width: 100%;
  height: 520px;
  display: block;
}

.editor {
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 22px;
  padding: 18px;
  background: rgba(15, 23, 42, 0.86);
}

.hidden {
  display: none;
}

.editor label {
  display: block;
  font-weight: 800;
  margin-bottom: 8px;
  font-size: 13px;
  color: #e2e8f8;
}

.editor-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.selected-note-content {
  min-height: 180px;
}

.selected-title {
  font-size: 30px;
  font-weight: 850;
  letter-spacing: -0.8px;
  margin-bottom: 10px;
}

.selected-text {
  line-height: 1.75;
  margin-top: 16px;
  white-space: normal;
  color: #cbd5e1;
}

.selected-text h1,
.selected-text h2,
.selected-text h3 {
  margin: 16px 0 8px;
  letter-spacing: -0.5px;
}

.selected-text h1 {
  font-size: 26px;
}

.selected-text h2 {
  font-size: 22px;
}

.selected-text h3 {
  font-size: 18px;
}

.selected-text code {
  background: #eef2ff;
  color: #3730a3;
  padding: 3px 7px;
  border-radius: 7px;
  font-weight: 700;
}

.selected-text li {
  margin-left: 22px;
  margin-bottom: 6px;
}

.wiki-link {
  color: var(--primary);
  cursor: pointer;
  font-weight: 800;
  padding: 1px 4px;
  border-radius: 6px;
  background: rgba(37, 99, 235, 0.08);
}

.wiki-link:hover {
  text-decoration: underline;
  background: rgba(37, 99, 235, 0.14);
}

.meta {
  color: var(--text-muted);
  font-size: 12px;
  margin-top: 14px;
  line-height: 1.7;
}

.action-row {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.sub-panel {
  margin-top: 22px;
}

.empty {
  border: 1px dashed rgba(148, 163, 184, 0.28);
  border-radius: 18px;
  padding: 18px;
  color: var(--text-muted);
  text-align: center;
  background: rgba(15, 23, 42, 0.34);
}

.suggestion-score {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 7px;
  font-weight: 600;
}

@media (max-width: 1180px) {
  .main-grid {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  body {
    padding: 14px;
  }

  .hero {
    padding: 26px;
    border-radius: 26px;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .primary-btn,
  .ghost-btn {
    width: 100%;
  }
}
