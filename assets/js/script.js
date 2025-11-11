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

function highlightText(node, query) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;

    if (!query) {
      // Remove only <mark> tags, leave other HTML intact
      const parent = node.parentNode;
      if (parent && parent.tagName === 'MARK') {
        parent.replaceWith(document.createTextNode(parent.textContent));
      }
      return;
    }

    const regex = new RegExp(`(${query})`, 'gi');
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    text.replace(regex, (match, p1, offset) => {
      // Add text before the match
      if (offset > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)));
      }
      // Add highlighted match
      const mark = document.createElement('mark');
      mark.textContent = match;
      fragment.appendChild(mark);
      lastIndex = offset + match.length;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    if (fragment.childNodes.length) {
      node.replaceWith(fragment);
    }
  } else if (
    node.nodeType === Node.ELEMENT_NODE &&
    node.tagName !== 'SCRIPT' &&
    node.tagName !== 'STYLE' &&
    node.tagName !== 'MARK'
  ) {
    Array.from(node.childNodes).forEach(child => highlightText(child, query));
  }
}

const searchInput = document.getElementById('globalSearch');
const content = document.querySelector('.content');

searchInput.addEventListener('input', function () {
  const query = this.value.trim();

  // Remove all previous highlights before applying new ones
  content.querySelectorAll('mark').forEach(mark => {
    mark.replaceWith(document.createTextNode(mark.textContent));
  });

  if (query.length > 0) {
    highlightText(content, query);
  }
});
