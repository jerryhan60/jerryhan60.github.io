// ===== Make notebook links open in new tab =====
document.getElementById('notebook-iframe').addEventListener('load', function() {
  var iframeDoc = this.contentDocument || this.contentWindow.document;
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

// ===== Easter Eggs — Hallmark ML Papers =====
var papers = [
  { title: "Attention Is All You Need", authors: "Vaswani et al., 2017", url: "https://arxiv.org/abs/1706.03762" },
  { title: "ImageNet Classification with Deep CNNs (AlexNet)", authors: "Krizhevsky et al., 2012", url: "https://arxiv.org/abs/1512.00567" },
  { title: "Generative Adversarial Networks", authors: "Goodfellow et al., 2014", url: "https://arxiv.org/abs/1406.2661" },
  { title: "Deep Residual Learning (ResNet)", authors: "He et al., 2015", url: "https://arxiv.org/abs/1512.03385" },
  { title: "BERT: Pre-training of Deep Bidirectional Transformers", authors: "Devlin et al., 2018", url: "https://arxiv.org/abs/1810.04805" },
  { title: "Playing Atari with Deep Reinforcement Learning", authors: "Mnih et al., 2013", url: "https://arxiv.org/abs/1312.5602" },
  { title: "Dropout: A Simple Way to Prevent Overfitting", authors: "Srivastava et al., 2014", url: "https://arxiv.org/abs/1207.0580" },
  { title: "Adam: A Method for Stochastic Optimization", authors: "Kingma & Ba, 2014", url: "https://arxiv.org/abs/1412.6980" },
  { title: "Batch Normalization", authors: "Ioffe & Szegedy, 2015", url: "https://arxiv.org/abs/1502.03167" },
  { title: "GPT: Language Models are Unsupervised Multitask Learners", authors: "Radford et al., 2019", url: "https://arxiv.org/abs/2005.14165" },
  { title: "Denoising Diffusion Probabilistic Models", authors: "Ho et al., 2020", url: "https://arxiv.org/abs/2006.11239" },
  { title: "Neural Machine Translation by Jointly Learning to Align and Translate", authors: "Bahdanau et al., 2014", url: "https://arxiv.org/abs/1409.0473" },
  { title: "Variational Autoencoders (VAE)", authors: "Kingma & Welling, 2013", url: "https://arxiv.org/abs/1312.6114" },
  { title: "U-Net: Convolutional Networks for Biomedical Image Segmentation", authors: "Ronneberger et al., 2015", url: "https://arxiv.org/abs/1505.04597" },
  { title: "Very Deep Convolutional Networks (VGGNet)", authors: "Simonyan & Zisserman, 2014", url: "https://arxiv.org/abs/1409.1556" },
  { title: "Mastering the Game of Go (AlphaGo)", authors: "Silver et al., 2016", url: "https://arxiv.org/abs/1607.01491" },
  { title: "Word2Vec: Efficient Estimation of Word Representations", authors: "Mikolov et al., 2013", url: "https://arxiv.org/abs/1301.3781" },
  { title: "NeRF: Representing Scenes as Neural Radiance Fields", authors: "Mildenhall et al., 2020", url: "https://arxiv.org/abs/2003.08934" },
  { title: "CLIP: Learning Transferable Visual Models", authors: "Radford et al., 2021", url: "https://arxiv.org/abs/2103.00020" },
  { title: "Scaling Laws for Neural Language Models", authors: "Kaplan et al., 2020", url: "https://arxiv.org/abs/2001.08361" },
  { title: "An Image is Worth 16x16 Words (ViT)", authors: "Dosovitskiy et al., 2020", url: "https://arxiv.org/abs/2010.11929" },
  { title: "GoogLeNet / Inception", authors: "Szegedy et al., 2014", url: "https://arxiv.org/abs/1409.4842" },
  { title: "Sequence to Sequence Learning with Neural Networks", authors: "Sutskever et al., 2014", url: "https://arxiv.org/abs/1409.3215" },
  { title: "StyleGAN: A Style-Based Generator Architecture", authors: "Karras et al., 2018", url: "https://arxiv.org/abs/1812.04948" },
  { title: "PPO: Proximal Policy Optimization Algorithms", authors: "Schulman et al., 2017", url: "https://arxiv.org/abs/1707.06347" },
  { title: "The Lottery Ticket Hypothesis", authors: "Frankle & Carlin, 2018", url: "https://arxiv.org/abs/1803.03635" },
  { title: "Llama 2: Open Foundation and Fine-Tuned Chat Models", authors: "Touvron et al., 2023", url: "https://arxiv.org/abs/2307.09288" },
  { title: "FlashAttention: Fast and Memory-Efficient Attention", authors: "Dao et al., 2022", url: "https://arxiv.org/abs/2205.14135" }
];

function getRandomPaper() {
  return papers[Math.floor(Math.random() * papers.length)];
}

function showJoke(category) {
  var paper = getRandomPaper();
  showPaperDialog(category, paper);
}

function toggleStartMenu() {
  var paper = getRandomPaper();
  showPaperDialog('Start', paper);
}

function showPaperDialog(category, paper) {
  var existing = document.getElementById('joke-dialog');
  if (existing) existing.remove();

  var dialog = document.createElement('div');
  dialog.id = 'joke-dialog';
  dialog.className = 'window';
  dialog.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99999;min-width:280px;max-width:480px;width:calc(100vw - 40px);';

  dialog.innerHTML =
    '<div class="title-bar">' +
      '<div class="title-bar-text">arxiv.exe — ' + category + '</div>' +
      '<div class="title-bar-controls">' +
        '<button aria-label="Close" onclick="document.getElementById(\'joke-dialog\').remove()"></button>' +
      '</div>' +
    '</div>' +
    '<div class="window-body" style="padding:16px;">' +
      '<p style="font-size:11px;margin-bottom:8px;color:#808080;">Recommended reading:</p>' +
      '<p style="font-weight:bold;font-size:13px;margin-bottom:4px;">' + paper.title + '</p>' +
      '<p style="font-size:11px;color:#666;margin-bottom:12px;">' + paper.authors + '</p>' +
    '</div>' +
    '<div style="padding:0 16px 12px;display:flex;gap:8px;justify-content:center;">' +
      '<button style="min-width:80px;" onclick="window.open(\'' + paper.url + '\',\'_blank\');document.getElementById(\'joke-dialog\').remove()">Read Paper</button>' +
      '<button style="min-width:80px;" onclick="document.getElementById(\'joke-dialog\').remove()">Later</button>' +
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

// ===== Mobile Detection =====
var isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

// ===== Desktop Icon Actions =====
function activateIcon(icon) {
  var action = icon.getAttribute('data-action');
  var href = icon.getAttribute('data-href');
  if (action === 'openNotebook') {
    openNotebook();
  } else if (action === 'mailto') {
    window.location.href = href;
  } else if (action === 'link') {
    window.open(href, '_blank');
  }
}

// ===== Desktop Icon Selection & Activation =====
document.querySelectorAll('.desktop-icon').forEach(function(icon) {
  if (isMobile) {
    // Mobile: single tap to activate
    icon.addEventListener('click', function() {
      activateIcon(icon);
    });
  } else {
    // Desktop: click to select, double-click to activate
    icon.addEventListener('click', function() {
      document.querySelectorAll('.desktop-icon').forEach(function(i) {
        i.classList.remove('selected');
      });
      icon.classList.add('selected');
    });
    icon.addEventListener('dblclick', function() {
      activateIcon(icon);
    });
  }
});

document.getElementById('desktop').addEventListener('click', function(e) {
  if (e.target === this) {
    document.querySelectorAll('.desktop-icon').forEach(function(i) {
      i.classList.remove('selected');
    });
  }
});

// ===== Mobile: auto-maximize window on load =====
if (isMobile) {
  (function() {
    var win = document.getElementById('notebook-window');
    var btn = document.getElementById('maximize-btn');
    win.classList.add('maximized');
    btn.setAttribute('aria-label', 'Restore');
    isMaximized = true;
  })();
}
