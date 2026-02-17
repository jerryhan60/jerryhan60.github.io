# Windows 95 Notebook Portfolio — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current academic website with a Windows 95 desktop simulation that renders a Jupyter notebook as the resume, auto-converted via GitHub Action.

**Architecture:** Static GitHub Pages site using 98.css (CDN) for Win95 UI, a custom JS file for window management and desktop interactivity, and a GitHub Action that converts `resume.ipynb` to HTML on push. The notebook HTML is embedded in an iframe inside a Win95-styled window to isolate Jupyter CSS from desktop CSS.

**Tech Stack:** 98.css (CDN), vanilla JS, GitHub Actions, jupyter nbconvert, GitHub Pages

---

### Task 1: Create the Jupyter notebook with resume content

**Files:**
- Create: `resume.ipynb`

**Step 1: Create resume.ipynb**

Create a Jupyter notebook that contains the user's resume content migrated from the current `index.html`. Use markdown cells for content sections and optionally a code cell or two for flair (e.g., a Python hello world or an import statement).

The notebook should have these cells:

**Cell 0 (Markdown):**
```markdown
# Jerry Han

Junior at [Princeton University](https://www.princeton.edu/) majoring in Mathematics and Computer Science.

Co-founder of [Gradient](https://gradient.build) | Quantitative Trader at [Jane Street](https://www.janestreet.com/) | Undergraduate Researcher at [Google DeepMind](https://deepmind.google/)

[Email](mailto:jh1161@princeton.edu) | [CV](data/resume.pdf) | [GitHub](https://github.com/jerryhan60/) | [LinkedIn](https://linkedin.com/in/jerry-han/)
```

**Cell 1 (Code):**
```python
# Jerry Han's Resume
import datetime
print(f"Last updated: {datetime.datetime.now().strftime('%B %Y')}")
```

**Cell 2 (Markdown):**
```markdown
## Experience

**Co-Founder, [Gradient](https://gradient.build) @ Princeton** — September 2025 - Present
Building at Princeton, 0 to 1.

**Quantitative Trader, [Jane Street](https://www.janestreet.com/)** — May 2025 - Present
Modelling, algorithmic trading and machine learning. Equities and options.

**Student Researcher, [Google DeepMind](https://deepmind.google/)** — January 2025 - Present
Undergraduate researcher at Google DeepMind Princeton under [Prof Elad Hazan](https://www.cs.princeton.edu/~ehazan/). Research area: Spectral transformers and preconditioning for time series forecasting.

**Co-President, Princeton Entrepreneurship Club** — August 2025 - Present
Largest campus organization at Princeton.

**Machine Learning Engineer, Hillspire** — May 2024 - August 2024
Worked on applications of video generation models with [Eric Schmidt](https://en.wikipedia.org/wiki/Eric_Schmidt) and [Sebastian Thrun](http://robots.stanford.edu/).

**Research Intern, [GIC](https://www.gic.com.sg/)** — February 2023 - July 2023
Research internship at Singapore's sovereign wealth fund (AUM ~$800B).

**Corporal (First Class), Singapore Army** — January 2021 - December 2022
Awarded Soldier of the Year.
```

**Cell 3 (Markdown):**
```markdown
## Projects

**SearchDestroy**
Algorithm to sweep an area with multiple drones in the most time efficient way; efficient parametrization of search area and ensuring robustness of algorithm under adversarial interference. Robust multi-drone search algorithm: DARP + heuristics to handle drone loss and online path re-computation. Physics simulation and visualization using AirSim; awarded rank 2nd at AGI House Hackathon (Summer 2024).

**Moco** — [Devpost](https://devpost.com/software/moco)
App for users to cast a "charm" to protect themselves without having to directly interact with their phone. 3D motion tracking app built in Python, React and SwiftUI for contactless gesture-based interaction with smartphones. Awarded Best Overall Hack at HackPrinceton (Fall 2023).

**ANTIDOTE** — [GitHub](https://github.com/jerryhan60/TDA_SNNS) | [Paper](data/TDA_for_trojan_NNs.pdf)
Artificial Neural Network Trojan Detection Using Topological Data Analysis Estimators. Developed a novel robust, scalable and explainable approach to detecting Trojaned neural networks using topological data analysis.

**Algorithmic Trading of Cryptocurrency Futures**
Traded 12 cryptocurrency derivatives with a monthly volume >$1 million and monthly return of 11%. Statistical analysis of market participants' trading patterns and market microstructure.

**[Brainhack](https://www.dsta.gov.sg/brainhack) Champions** — [GitHub](https://github.com/jerryhan60/CV-Robotics-Project)
Developed a computer vision model (Detectron2 and ModaNet) for clothing identification. Kernel methods for obstacle detection and path-finding algorithm in Python for autonomous navigation.
```

**Cell 4 (Markdown):**
```markdown
## Awards

- International Physics Olympiad Gold medal
- European Physics Olympiad Gold medal, rank 10
- Singapore Physics Olympiad rank 1
- 2023 ICPC Greater NY: Rank 6 of 92, Best Freshman & Sophomore Team
- Ranked 12th out of over 9300 participants in the 2022 [Shopee Code League](https://careers.shopee.sg/codeleague/), also ranked 7th in the 2021 Shopee Code League
- Multiple gold medals in the [National Olympiad in Informatics](https://noisg.comp.nus.edu.sg/noi/)
- 2024 Putnam Competition rank top 500
- UChicago Trading Competition rank 2
- Berkeley Trading Competition rank 4
```

**Cell 5 (Markdown):**
```markdown
## Courses

- MAT 216: Multivariable Analysis and Linear Algebra — Alexandru Ionescu
- COS 485: Neural Networks: Theory and Application — Sebastian Seung
- COS 226: Algorithms and Data Structures — Kevin Wayne (precepted by Robert Tarjan)
- ORF 309: Probability and Stochastic Systems — Mark Cerenzia
- ECO 310: Microeconomic Theory: A Math Approach — Andrea Wilson
- CHV 310: Practical Ethics — Peter Singer
- FRS 159: Rembrandt — Ronni Baer
- FRS 114: The Glass Class — Vivian Feng
- WRI 138: Writing Seminar — Diana Newby
```

**Step 2: Verify notebook is valid JSON**

Run: `python3 -c "import json; json.load(open('resume.ipynb')); print('Valid notebook')"`
Expected: `Valid notebook`

**Step 3: Commit**

```bash
git add resume.ipynb
git commit -m "feat: add resume notebook as content source"
```

---

### Task 2: Set up the GitHub Action for auto-conversion

**Files:**
- Create: `.github/workflows/convert-notebook.yml`

**Step 1: Create the workflow file**

```yaml
name: Convert Notebook to HTML

on:
  push:
    paths:
      - 'resume.ipynb'

permissions:
  contents: write

jobs:
  convert:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Install Jupyter and nbconvert
        run: pip install jupyter nbconvert

      - name: Convert resume.ipynb to HTML
        run: jupyter nbconvert --to html --template classic resume.ipynb --output notebook.html

      - name: Commit and push generated HTML
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add notebook.html
          git diff --cached --quiet || (git commit -m "Auto-convert resume.ipynb to notebook.html" && git push)
```

**Step 2: Verify YAML is valid**

Run: `python3 -c "import yaml; yaml.safe_load(open('.github/workflows/convert-notebook.yml')); print('Valid YAML')"`
Expected: `Valid YAML` (install PyYAML first if needed: `pip3 install pyyaml`)

**Step 3: Commit**

```bash
git add .github/workflows/convert-notebook.yml
git commit -m "ci: add GitHub Action to auto-convert notebook to HTML"
```

---

### Task 3: Generate initial notebook.html locally

**Files:**
- Create: `notebook.html` (generated)

Since the GitHub Action only runs on push, we need an initial `notebook.html` for local development.

**Step 1: Install nbconvert locally if needed**

Run: `pip3 install jupyter nbconvert`

**Step 2: Convert the notebook**

Run: `jupyter nbconvert --to html --template classic resume.ipynb --output notebook.html`
Expected: Creates `notebook.html` in the repo root

**Step 3: Verify the output**

Run: `python3 -c "html=open('notebook.html').read(); print(f'Size: {len(html)} bytes'); print('Has cells:', 'cell' in html)"`
Expected: Size > 1000 bytes, Has cells: True

**Step 4: Commit**

```bash
git add notebook.html
git commit -m "feat: add initial converted notebook HTML"
```

---

### Task 4: Create Win95 desktop icon images

**Files:**
- Create: `images/icons/notebook.png` (32x32)
- Create: `images/icons/email.png` (32x32)
- Create: `images/icons/github.png` (32x32)
- Create: `images/icons/linkedin.png` (32x32)
- Create: `images/icons/pdf.png` (32x32)

**Step 1: Create icon images**

Use inline SVG data URIs instead of image files for simplicity. We will embed the icons directly in the CSS as base64 or use simple CSS-drawn icons. This avoids needing to create/source bitmap files.

Alternative: Use [Win95 icon sprites](https://win98icons.alexmeub.com/) or draw simple pixel-art icons as inline SVGs in the HTML.

For the plan, we'll use simple emoji/text labels as icon images and style them to look retro. This keeps things dependency-free.

Each icon in the HTML will be:
```html
<div class="desktop-icon" ondblclick="handleIcon('resume')">
  <div class="desktop-icon-img">📓</div>
  <div class="desktop-icon-label">My Resume.ipynb</div>
</div>
```

No image files needed — we use emoji as the icon graphic, styled with CSS to look like Win95 desktop icons (white text label on selected-blue background, etc.).

**Step 2: Commit**

No files to commit for this step — icons are inline in the HTML (Task 5).

---

### Task 5: Build the Win95 desktop shell (index.html)

**Files:**
- Modify: `index.html` (complete replacement)

**Step 1: Replace index.html with the Win95 desktop**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Jerry Han</title>
  <link rel="shortcut icon" href="images/favicon/favicon.ico" type="image/x-icon">
  <link rel="stylesheet" href="https://unpkg.com/98.css">
  <link rel="stylesheet" href="win95.css">
</head>
<body>
  <!-- Desktop -->
  <div id="desktop">
    <!-- Desktop Icons -->
    <div id="desktop-icons">
      <div class="desktop-icon" ondblclick="openNotebook()">
        <div class="desktop-icon-img">📓</div>
        <div class="desktop-icon-label">My Resume.ipynb</div>
      </div>
      <div class="desktop-icon" ondblclick="window.location.href='mailto:jh1161@princeton.edu'">
        <div class="desktop-icon-img">📧</div>
        <div class="desktop-icon-label">Email.exe</div>
      </div>
      <div class="desktop-icon" ondblclick="window.open('https://github.com/jerryhan60/','_blank')">
        <div class="desktop-icon-img">💾</div>
        <div class="desktop-icon-label">GitHub.lnk</div>
      </div>
      <div class="desktop-icon" ondblclick="window.open('https://linkedin.com/in/jerry-han/','_blank')">
        <div class="desktop-icon-img">🔗</div>
        <div class="desktop-icon-label">LinkedIn.lnk</div>
      </div>
      <div class="desktop-icon" ondblclick="window.open('data/resume.pdf','_blank')">
        <div class="desktop-icon-img">📄</div>
        <div class="desktop-icon-label">CV.pdf</div>
      </div>
    </div>

    <!-- Notebook Window -->
    <div id="notebook-window" class="window">
      <div class="title-bar" id="notebook-title-bar">
        <div class="title-bar-text">Jerry Han - Resume.ipynb - Jupyter Notebook</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize" onclick="minimizeWindow()"></button>
          <button aria-label="Maximize" id="maximize-btn" onclick="toggleMaximize()"></button>
          <button aria-label="Close" onclick="closeWindow()"></button>
        </div>
      </div>
      <div class="menu-bar">
        <ul>
          <li>File</li>
          <li>Edit</li>
          <li>View</li>
          <li>Cell</li>
          <li>Kernel</li>
          <li>Help</li>
        </ul>
      </div>
      <div class="window-body" id="notebook-body">
        <iframe id="notebook-iframe" src="notebook.html" title="Resume Notebook"></iframe>
      </div>
      <div class="status-bar">
        <p class="status-bar-field">Python 3 | Idle</p>
        <p class="status-bar-field">Trusted</p>
      </div>
    </div>
  </div>

  <!-- Taskbar -->
  <div id="taskbar">
    <button id="start-button" onclick="toggleStartMenu()">
      <span id="start-logo">🪟</span> Start
    </button>
    <div class="taskbar-divider"></div>
    <button id="taskbar-notebook-btn" class="taskbar-window-btn active" onclick="focusNotebook()">
      📓 Resume.ipynb
    </button>
    <div class="taskbar-spacer"></div>
    <div id="system-tray">
      <span id="clock"></span>
    </div>
  </div>

  <script src="win95.js"></script>
</body>
</html>
```

**Step 2: Verify HTML is valid**

Open `index.html` in a browser. You should see a teal desktop background with icons on the left, a Win95-styled window in the center, and a taskbar at the bottom. The notebook iframe may not load yet if notebook.html hasn't been generated.

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: replace site with Win95 desktop shell"
```

---

### Task 6: Write win95.css

**Files:**
- Create: `win95.css`

**Step 1: Create the stylesheet**

```css
/* ===== RESET & BASE ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  overflow: hidden;
  font-family: "Pixelated MS Sans Serif", "MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif;
  user-select: none;
}

/* ===== DESKTOP ===== */
#desktop {
  width: 100vw;
  height: calc(100vh - 36px); /* viewport minus taskbar */
  background-color: #008080; /* classic Win95 teal */
  position: relative;
  overflow: hidden;
}

/* ===== DESKTOP ICONS ===== */
#desktop-icons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  position: absolute;
  top: 0;
  left: 0;
}

.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  padding: 4px;
  cursor: default;
  text-align: center;
}

.desktop-icon:hover {
  background: none;
}

.desktop-icon:active .desktop-icon-label,
.desktop-icon:focus .desktop-icon-label {
  background: #000080;
  color: #fff;
}

.desktop-icon-img {
  font-size: 32px;
  line-height: 1;
  margin-bottom: 4px;
  pointer-events: none;
}

.desktop-icon-label {
  font-size: 11px;
  color: #fff;
  text-shadow: 1px 1px 1px #000;
  padding: 1px 3px;
  word-wrap: break-word;
  max-width: 72px;
  pointer-events: none;
}

/* ===== NOTEBOOK WINDOW ===== */
#notebook-window {
  position: absolute;
  top: 40px;
  left: 120px;
  width: calc(100vw - 160px);
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  z-index: 10;
  min-width: 400px;
  min-height: 300px;
}

#notebook-window.maximized {
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: calc(100vh - 36px) !important;
}

#notebook-window.minimized {
  display: none;
}

/* ===== MENU BAR ===== */
.menu-bar {
  background: #c0c0c0;
  border-bottom: 1px solid #808080;
  padding: 2px 0;
}

.menu-bar ul {
  list-style: none;
  display: flex;
  gap: 0;
  margin: 0;
  padding: 0;
}

.menu-bar li {
  padding: 2px 8px;
  font-size: 11px;
  cursor: default;
}

.menu-bar li:hover {
  background: #000080;
  color: #fff;
}

/* ===== WINDOW BODY / IFRAME ===== */
#notebook-body {
  flex: 1;
  padding: 0;
  overflow: hidden;
}

#notebook-iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: #fff;
}

/* ===== STATUS BAR ===== */
#notebook-window .status-bar {
  flex-shrink: 0;
}

/* ===== TASKBAR ===== */
#taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 36px;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  gap: 4px;
  z-index: 9999;
}

#start-button {
  font-weight: bold;
  min-width: 60px;
  height: 28px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
  font-size: 11px;
}

#start-logo {
  font-size: 16px;
}

.taskbar-divider {
  width: 2px;
  height: 24px;
  border-left: 1px solid #808080;
  border-right: 1px solid #fff;
  margin: 0 2px;
}

.taskbar-window-btn {
  height: 28px;
  min-width: 140px;
  text-align: left;
  padding: 0 8px;
  font-size: 11px;
  font-weight: normal;
}

.taskbar-window-btn.active {
  font-weight: bold;
  box-shadow: inset 1px 1px 1px #808080;
  background: #dfdfdf;
}

.taskbar-spacer {
  flex: 1;
}

#system-tray {
  height: 24px;
  border: 1px solid #808080;
  border-right-color: #fff;
  border-bottom-color: #fff;
  padding: 0 8px;
  display: flex;
  align-items: center;
  font-size: 11px;
}

#clock {
  font-size: 11px;
}

/* ===== WINDOW DRAGGING ===== */
#notebook-title-bar {
  cursor: default;
}

#notebook-window:not(.maximized) #notebook-title-bar {
  cursor: move;
}
```

**Step 2: Verify styles load**

Open `index.html` in browser. The desktop should be teal, icons visible on the left, window has Win95 chrome, taskbar at bottom.

**Step 3: Commit**

```bash
git add win95.css
git commit -m "feat: add Win95 desktop styles"
```

---

### Task 7: Write win95.js

**Files:**
- Create: `win95.js`

**Step 1: Create the JavaScript file**

```javascript
// ===== Window State =====
let isMaximized = false;
let isMinimized = false;
let windowPos = { x: 0, y: 0, w: 0, h: 0 }; // saved position before maximize

// ===== Window Management =====
function minimizeWindow() {
  const win = document.getElementById('notebook-window');
  win.classList.add('minimized');
  isMinimized = true;
  document.getElementById('taskbar-notebook-btn').classList.remove('active');
}

function toggleMaximize() {
  const win = document.getElementById('notebook-window');
  const btn = document.getElementById('maximize-btn');

  if (isMaximized) {
    win.classList.remove('maximized');
    // Restore saved position
    win.style.top = windowPos.y + 'px';
    win.style.left = windowPos.x + 'px';
    win.style.width = windowPos.w + 'px';
    win.style.height = windowPos.h + 'px';
    btn.setAttribute('aria-label', 'Maximize');
    isMaximized = false;
  } else {
    // Save current position
    windowPos.x = win.offsetLeft;
    windowPos.y = win.offsetTop;
    windowPos.w = win.offsetWidth;
    windowPos.h = win.offsetHeight;
    win.classList.add('maximized');
    btn.setAttribute('aria-label', 'Restore');
    isMaximized = true;
  }
}

function closeWindow() {
  const win = document.getElementById('notebook-window');
  win.classList.add('minimized');
  isMinimized = true;
  document.getElementById('taskbar-notebook-btn').classList.remove('active');
}

function openNotebook() {
  const win = document.getElementById('notebook-window');
  win.classList.remove('minimized');
  isMinimized = false;
  win.style.zIndex = 10;
  document.getElementById('taskbar-notebook-btn').classList.add('active');
}

function focusNotebook() {
  if (isMinimized) {
    openNotebook();
  } else {
    // If already visible, minimize (toggle behavior like Win95)
    minimizeWindow();
  }
}

// ===== Start Menu (decorative) =====
function toggleStartMenu() {
  // No-op for now — decorative start button
}

// ===== Window Dragging =====
(function() {
  const titleBar = document.getElementById('notebook-title-bar');
  const win = document.getElementById('notebook-window');
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  titleBar.addEventListener('mousedown', function(e) {
    // Don't drag if maximized or if clicking buttons
    if (isMaximized) return;
    if (e.target.tagName === 'BUTTON') return;

    isDragging = true;
    dragOffsetX = e.clientX - win.offsetLeft;
    dragOffsetY = e.clientY - win.offsetTop;

    // Prevent text selection while dragging
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    win.style.left = (e.clientX - dragOffsetX) + 'px';
    win.style.top = (e.clientY - dragOffsetY) + 'px';
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
  });
})();

// ===== Taskbar Clock =====
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  clock.textContent = hours + ':' + minutes + ' ' + ampm;
}

updateClock();
setInterval(updateClock, 10000); // update every 10 seconds

// ===== Desktop Icon Selection =====
document.querySelectorAll('.desktop-icon').forEach(function(icon) {
  icon.addEventListener('click', function() {
    // Deselect all, select this one
    document.querySelectorAll('.desktop-icon').forEach(function(i) {
      i.classList.remove('selected');
    });
    icon.classList.add('selected');
  });
});

// Click on desktop to deselect icons
document.getElementById('desktop').addEventListener('click', function(e) {
  if (e.target === this) {
    document.querySelectorAll('.desktop-icon').forEach(function(i) {
      i.classList.remove('selected');
    });
  }
});
```

**Step 2: Verify interactivity**

Open `index.html` in browser. Test:
- Drag the window by its title bar
- Click Minimize — window hides, taskbar button un-bolds
- Click taskbar button — window reappears
- Click Maximize — window fills viewport
- Click Restore — window returns to previous size/position
- Clock shows current time in taskbar
- Double-click desktop icons — links open

**Step 3: Commit**

```bash
git add win95.js
git commit -m "feat: add Win95 window management and interactivity"
```

---

### Task 8: Add selected state CSS for desktop icons

**Files:**
- Modify: `win95.css` — add `.desktop-icon.selected` styles

**Step 1: Add selected icon styles to win95.css**

Append to win95.css:

```css
/* ===== SELECTED DESKTOP ICON ===== */
.desktop-icon.selected .desktop-icon-label {
  background: #000080;
  color: #fff;
}

.desktop-icon.selected .desktop-icon-img {
  filter: brightness(0.8) saturate(1.5);
}
```

**Step 2: Commit**

```bash
git add win95.css
git commit -m "feat: add desktop icon selection styles"
```

---

### Task 9: Remove old stylesheet.css dependency

**Files:**
- Keep: `stylesheet.css` (don't delete — may be used by zipnerf subpage)

Since `index.html` no longer references `stylesheet.css` (it was replaced in Task 5), no changes needed. The file stays for the zipnerf subpage.

**Step 1: Verify zipnerf still works**

Run: `python3 -m http.server 8000` and visit `http://localhost:8000/zipnerf/` to confirm the zipnerf page is unaffected.

**Step 2: No commit needed**

---

### Task 10: Test full flow end-to-end

**Step 1: Start local server**

Run: `python3 -m http.server 8000`

**Step 2: Open in browser**

Visit: `http://localhost:8000`

**Step 3: Verify checklist**

- [ ] Teal desktop background visible
- [ ] 5 desktop icons visible on the left (notebook, email, github, linkedin, CV)
- [ ] Win95 window shows notebook content (via iframe)
- [ ] Notebook has Jupyter-style cells with In[n] prompts
- [ ] Title bar says "Jerry Han - Resume.ipynb - Jupyter Notebook"
- [ ] Menu bar shows File, Edit, View, Cell, Kernel, Help
- [ ] Window is draggable via title bar
- [ ] Minimize hides window, taskbar button toggles it back
- [ ] Maximize fills screen, Restore returns to previous size
- [ ] Close hides window, double-click desktop icon reopens
- [ ] Taskbar at bottom with Start button and clock
- [ ] Clock shows correct time
- [ ] Double-click Email icon opens mailto
- [ ] Double-click GitHub icon opens GitHub profile
- [ ] Double-click LinkedIn icon opens LinkedIn
- [ ] Double-click CV icon opens resume PDF
- [ ] Status bar shows "Python 3 | Idle" and "Trusted"

**Step 4: Commit all remaining changes**

```bash
git add -A
git commit -m "feat: complete Win95 notebook portfolio site"
```

---

### Task 11: Push and verify GitHub Action

**Step 1: Push to master**

Run: `git push origin master`

**Step 2: Check GitHub Actions**

Visit the repo's Actions tab. The "Convert Notebook to HTML" workflow should trigger and:
1. Install Python and Jupyter
2. Convert resume.ipynb to notebook.html
3. Commit the generated HTML

**Step 3: Verify live site**

Visit `https://jerryhan60.github.io/` after deployment completes. The Win95 desktop should appear with the notebook rendering correctly.
