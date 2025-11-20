// COLLAPSIBLES

document.querySelectorAll('.collapsible-link').forEach(link => {
  link.addEventListener('click', function(e) {

    let content = null;

    // --- CASE 1: Teaching collapsibles (.two-column-3rows or 2rows) ---
    let container = link.closest('.two-column-2rows') ||
                    link.closest('.two-column-3rows');
    if (container) {
      content = container.querySelector('.collapsible-content');
    }

    // --- CASE 2: Bibliography collapsibles ---
    // <div>... <span class="collapsible-link"></span> ...</div>
    // <div class="content">...</div>
    if (!content) {
      const lineDiv = link.parentElement.parentElement;
      const next = lineDiv.nextElementSibling;
      if (next && next.classList.contains('content')) {
        content = next;
      }
    }

    if (!content) return;

    // Initialize if needed
    if (!content.style.maxHeight) {
      content.style.maxHeight = '0px';
      content.style.overflow = 'hidden';
    }

    // Toggle
    if (content.style.maxHeight !== '0px') {
      content.style.maxHeight = '0px';
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});


// OPEN EXTERNAL LINKS IN NEW TAB

document.querySelectorAll('a').forEach(link => {
  if (
    !link.classList.contains('collapsible-link') &&
    !link.closest('.sidebar')
  ) {
    link.setAttribute('target', '_blank');
  }
});


// HASH JUMPS

function scrollToHashInstantly() {
  if (!window.location.hash) return;
  const el = document.querySelector(window.location.hash);
  if (!el) return;

  setTimeout(() => {
    el.scrollIntoView();
  }, 50);
}

window.addEventListener('load', scrollToHashInstantly);
window.addEventListener('hashchange', scrollToHashInstantly);
