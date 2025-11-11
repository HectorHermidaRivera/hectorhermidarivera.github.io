// COLLAPSIBLES

  document.querySelectorAll('.collapsible-link').forEach(link => {
    link.addEventListener('click', function(e) {
      let container = link.closest('.two-column-2rows');
      if (!container) container = link.closest('.two-column-3rows');
      if (!container) return;
      const content = container.querySelector('.collapsible-content');
      if (!content) return;
      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0';
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

// OPEN EXTERNAL LINKS IN NEW TAB

  document.querySelectorAll('a').forEach(link => {
    if (!link.classList.contains('collapsible-link') && !link.closest('.sidebar')) {
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

// SEARCH BAR

const searchInput = document.getElementById('globalSearch');
const links = document.querySelectorAll('.sidebar a');

searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  links.forEach(link => {
    link.style.display = link.textContent.toLowerCase().includes(query) ? 'block' : 'none';
  });
});
