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

// COLLAPSIBLE HEADINGS

// Make all <h2> headings collapsible
document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.content');
  const headings = content.querySelectorAll('h2');

  headings.forEach(h2 => {
    // Wrap content until next h2 in a collapsible container
    const wrapper = document.createElement('div');
    wrapper.classList.add('collapsible-content');

    let sibling = h2.nextElementSibling;
    while (sibling && sibling.tagName !== 'H2') {
      const next = sibling.nextElementSibling;
      wrapper.appendChild(sibling);
      sibling = next;
    }

    h2.insertAdjacentElement('afterend', wrapper);

    // Make h2 clickable
    h2.classList.add('collapsible-link');
    h2.addEventListener('click', () => {
      if (wrapper.style.maxHeight && wrapper.style.maxHeight !== '0px') {
        wrapper.style.maxHeight = '0px';
      } else {
        wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
      }
    });

    // Optional: start collapsed on small screens
    if (window.innerWidth <= 1023) {
      wrapper.style.maxHeight = '0px';
    } else {
      wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
    }
  });
});
