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

// Smooth scroll to hash with delay for Safari hard reloads
window.addEventListener('load', () => {
  if (window.location.hash) {
    setTimeout(() => {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300); // 300ms delay handles Safari hard reload
  }
});

// Also handle hash changes after the page has loaded
window.addEventListener('hashchange', () => {
  const el = document.querySelector(window.location.hash);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
});

// Run on page load
window.addEventListener('load', smoothScrollToHash);

// Also handle hash changes after the page has loaded
window.addEventListener('hashchange', smoothScrollToHash);
