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

  // SCROLL-SPY / HIGHLIGHT SIDEBAR LINKS BASED ON SCROLL
  const sections = document.querySelectorAll('.content [id]');
  const sidebarLinks = document.querySelectorAll('.sidebar a');

  function updateActiveLink() {
    const scrollPosition = window.scrollY || window.pageYOffset;

    let currentSectionId = null;

    // find the section currently in view
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80; // adjust for fixed header
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // update sidebar links
    sidebarLinks.forEach(link => {
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // initialize on page load
});
