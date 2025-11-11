// COLLAPSIBLES
  document.querySelectorAll('.collapsible-link').forEach(link => {
    link.addEventListener('click', function(e) {
      // Find the closest container
      let container = link.closest('.two-column-2rows');
      if (!container) container = link.closest('.two-column-3rows');
      if (!container) return; // safety

      const content = container.querySelector('.collapsible-content');
      if (!content) return;

      // Toggle max-height
      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0';
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

// OPEN EXTERNAL LINKS IN NEW TAB
  document.querySelectorAll('a').forEach(link => {
    // Skip sidebar links and collapsible links
    if (!link.classList.contains('collapsible-link') && !link.closest('.sidebar')) {
      link.setAttribute('target', '_blank');
    }
  });

// HAS LINKS

window.addEventListener('load', () => {
  if (window.location.hash) {
    setTimeout(() => {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  }
});
