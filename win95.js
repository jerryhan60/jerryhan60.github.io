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

function toggleStartMenu() {
  // Decorative — no-op
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
