// SMOOTH SCROLL FOR SIDEBAR LINKS //

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

// COLLAPSIBLES //

document.querySelectorAll('.collapsible-link').forEach(link => {
  link.addEventListener('click', function() {
    const container = link.closest('.two-column-2rows, .two-column-3rows'); // parent row
    const content = container.querySelector('.collapsible-content');
    if (!content) return;

    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
      content.style.maxHeight = '0';
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});

// EXTERNAL LINK TO TAB//

document.querySelectorAll('a').forEach(link => {
  if (!link.classList.contains('collapsible-link') && !link.closest('.sidebar')) {
    link.setAttribute('target', '_blank');
  }
});
