// COLLAPSIBLES

document.querySelectorAll('.collapsible-link').forEach(link => {
  link.addEventListener('click', function (e) {

    let content = null;

    // --- CASE 1: existing two-column style (teaching etc.) ---
    const container = link.closest('.two-column-2rows') || link.closest('.two-column-3rows');
    if (container) {
      content = container.querySelector('.collapsible-content');
    }

    // --- CASE 2: bibliography-style collapsible (content is next sibling of the line div) ---
    if (!content) {
      // Walk up from the link to find a DIV whose nextSibling is .content
      let node = link;
      while (node && node !== document.body) {
        if (node.tagName === 'DIV') {
          const next = node.nextElementSibling;
          if (next && next.classList && next.classList.contains('content')) {
            content = next;
            break;
          }
        }
        node = node.parentElement;
      }
    }

    if (!content) return;

    // Ensure initial styles for max-height-based collapsing
    if (!content.style.maxHeight) {
      content.style.maxHeight = '0px';
      content.style.overflow = 'hidden';
      // Optional: ensure a transition is available even if CSS missing
      if (!content.style.transition) content.style.transition = 'max-height 0.28s ease';
    }

    // Toggle
    if (content.style.maxHeight !== '0px') {
      content.style.maxHeight = '0px';
    } else {
      // expand to actual inner height (forces reflow so transition runs reliably)
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
