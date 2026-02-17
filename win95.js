// ===== Inject Vaporwave Theme into Notebook Iframe =====
document.getElementById('notebook-iframe').addEventListener('load', function() {
  var iframeDoc = this.contentDocument || this.contentWindow.document;
  // Inject theme CSS
  var link = iframeDoc.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'notebook-theme.css';
  iframeDoc.head.appendChild(link);
  // Make all links open in a new tab (outside the iframe)
  iframeDoc.querySelectorAll('a').forEach(function(a) {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  });
});

// ===== Window State =====
let isMaximized = false;
let isMinimized = false;
let windowPos = { x: 0, y: 0, w: 0, h: 0 };

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
    win.style.top = windowPos.y + 'px';
    win.style.left = windowPos.x + 'px';
    win.style.width = windowPos.w + 'px';
    win.style.height = windowPos.h + 'px';
    btn.setAttribute('aria-label', 'Maximize');
    isMaximized = false;
  } else {
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
    minimizeWindow();
  }
}

// ===== Easter Egg Jokes =====
var jokes = {
  Start: [
    "int main() {\n  // TODO: figure out life\n  return 0;\n}",
    "Have you tried turning your career off and on again?",
    "$ sudo rm -rf /doubts/*\nrm: cannot remove '/doubts/imposter_syndrome': Permission denied",
    "while(alive) {\n  eat();\n  sleep();\n  code();\n}",
    "Error: 'motivation' was not declared in this scope"
  ],
  File: [
    "#include <life.h>\nError: 'happiness' not found.\nDid you mean 'deadlines'?",
    "fopen(\"my_code.cpp\", \"r\");\n// File is 3000 lines.\n// No comments.\n// Written by me. Last Tuesday.\n// I don't recognize any of it.",
    "Save as... untitled_final_FINAL_v3_ACTUALLY_FINAL.cpp"
  ],
  Edit: [
    "// This line took 4 hours to write\nconst auto& x = std::move(y);\n// I still don't know what it does",
    "git commit -m \"fixed it\"\ngit commit -m \"actually fixed it\"\ngit commit -m \"ok actually fixed it for real this time\"\ngit commit -m \"I lied\"",
    "ctrl+z ctrl+z ctrl+z ctrl+z ctrl+z\n\n... I should have used version control"
  ],
  View: [
    "std::cout << *ptr;\n// Segfault.\n// ptr was pointing at my will to live.\n// Also null.",
    "Debugger says the variable is 'optimized out'.\nJust like my hopes and dreams.",
    "cout << \"The view from here\" << endl;\n// [Undefined Behavior]\n// But somehow it works on my machine"
  ],
  Cell: [
    "malloc(sizeof(braincell));\n// Returns NULL.\n// Not enough memory.\n// Story of my life.",
    "free(last_braincell);\n// double free detected\n// I didn't even have one to begin with",
    "new int[INT_MAX];\n// std::bad_alloc\n// Just like my memory during exams"
  ],
  Kernel: [
    "Kernel panic - not syncing: VFS: Unable to mount root fs\n\n...just like me at 3am before a deadline",
    "kill -9 $(pidof motivation)\nNo matching processes found.",
    "sudo reboot\n\nI wish I could do this to my semester."
  ],
  Help: [
    "Searching Stack Overflow...\n\n\"This question was closed as a duplicate.\"\n\nThe duplicate was also closed as a duplicate.",
    "man happiness\nNo manual entry for happiness\n\nSee also: man coffee",
    "// Dear future me:\n// If you're reading this, I'm sorry.\n// I was mass free()ing at 4am\n// Good luck.\n//    - Past you"
  ]
};

function showJoke(category) {
  var pool = jokes[category];
  var joke = pool[Math.floor(Math.random() * pool.length)];
  showDialog(category + '.cpp', joke);
}

function toggleStartMenu() {
  var pool = jokes.Start;
  var joke = pool[Math.floor(Math.random() * pool.length)];
  showDialog('system32.exe', joke);
}

function showDialog(title, message) {
  // Remove existing dialog if any
  var existing = document.getElementById('joke-dialog');
  if (existing) existing.remove();

  var dialog = document.createElement('div');
  dialog.id = 'joke-dialog';
  dialog.className = 'window';
  dialog.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99999;min-width:340px;max-width:480px;';

  dialog.innerHTML =
    '<div class="title-bar">' +
      '<div class="title-bar-text">' + title + '</div>' +
      '<div class="title-bar-controls">' +
        '<button aria-label="Close" onclick="document.getElementById(\'joke-dialog\').remove()"></button>' +
      '</div>' +
    '</div>' +
    '<div class="window-body" style="padding:16px;display:flex;gap:12px;align-items:flex-start;">' +
      '<span style="font-size:32px;flex-shrink:0;">&#9888;</span>' +
      '<pre style="font-family:\'Courier New\',monospace;font-size:11px;white-space:pre-wrap;word-wrap:break-word;margin:0;flex:1;">' + message + '</pre>' +
    '</div>' +
    '<div style="padding:0 16px 12px;text-align:center;">' +
      '<button style="min-width:80px;" onclick="document.getElementById(\'joke-dialog\').remove()">OK</button>' +
    '</div>';

  document.body.appendChild(dialog);
}

// ===== Window Dragging =====
(function() {
  const titleBar = document.getElementById('notebook-title-bar');
  const win = document.getElementById('notebook-window');
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  titleBar.addEventListener('mousedown', function(e) {
    if (isMaximized) return;
    if (e.target.tagName === 'BUTTON') return;

    isDragging = true;
    dragOffsetX = e.clientX - win.offsetLeft;
    dragOffsetY = e.clientY - win.offsetTop;
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
setInterval(updateClock, 10000);

// ===== Desktop Icon Selection =====
document.querySelectorAll('.desktop-icon').forEach(function(icon) {
  icon.addEventListener('click', function() {
    document.querySelectorAll('.desktop-icon').forEach(function(i) {
      i.classList.remove('selected');
    });
    icon.classList.add('selected');
  });
});

document.getElementById('desktop').addEventListener('click', function(e) {
  if (e.target === this) {
    document.querySelectorAll('.desktop-icon').forEach(function(i) {
      i.classList.remove('selected');
    });
  }
});
