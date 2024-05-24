class CssPropControl {
  constructor(element) {
    this.element = element;
  }

  get(varName) {
    return getComputedStyle(this.element).getPropertyValue(varName);
  }

  set(varName, val) {
    return this.element.style.setProperty(varName, val);
  }
}

const bodyCssProps = new CssPropControl(document.body);

document.addEventListener('DOMContentLoaded', function() {
  const dropdownButtons = document.querySelectorAll('.dropdown-btn');

  dropdownButtons.forEach(button => {
    button.addEventListener('click', function() {
      const dropdownContent = this.nextElementSibling;
      const arrow = this.querySelector('.arrow');

      // Close all dropdowns except the one clicked
      closeAllDropdowns(dropdownContent);

      // Toggle the current dropdown
      toggleDropdown(dropdownContent, arrow);
    });
  });

  // Close dropdown when clicking outside of it
  document.addEventListener('click', function(event) {
    if (!event.target.matches('.dropdown-btn') && !event.target.closest('.dropdown-content')) {
      closeAllDropdowns();
    }
  });

  function toggleDropdown(content, arrow) {
    if (content.classList.contains('show')) {
      content.classList.remove('show');
      content.style.maxHeight = null;
      arrow.classList.remove('up');
    } else {
      content.classList.add('show');
      content.style.maxHeight = content.scrollHeight + 'px';
      arrow.classList.add('up');
    }
  }

  function closeAllDropdowns(except = null) {
    document.querySelectorAll('.dropdown-content.show').forEach(openContent => {
      if (openContent !== except) {
        const openArrow = openContent.previousElementSibling.querySelector('.arrow');
        toggleDropdown(openContent, openArrow);
      }
    });
  }

  // Dark mode toggling
  let toggle = document.querySelector('#dark-mode-toggle');
  toggle.addEventListener('click', () => {
    let mode = toggle.checked ? 'dark' : 'light';
    bodyCssProps.set('--background', bodyCssProps.get(`--${mode}-background`));
    bodyCssProps.set('--primary', bodyCssProps.get(`--${mode}-primary`));
    bodyCssProps.set('--link', bodyCssProps.get(`--${mode}-link`));

    // Update border colors based on dark mode
    if (toggle.checked) {
      bodyCssProps.set('--border-color', bodyCssProps.get('--dark-background'));
    } else {
      bodyCssProps.set('--border-color', ''); // Revert to default border color
    }
  });
});
