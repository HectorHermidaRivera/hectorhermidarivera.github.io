document.addEventListener('DOMContentLoaded', () => {

// SMOOTH SCROLL FOR SIDEBAR LINKS
  document.querySelectorAll('.sidebar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

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

// TOGGLE MOBILE MENU
const menuButton = document.querySelector('.menu-toggle');
const sidebarLinks = document.querySelector('.sidebar-links');

if (menuButton && sidebarLinks) {
  menuButton.addEventListener('click', () => {
    sidebarLinks.classList.toggle('active');
  });
}
});
