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

document.addEventListener('DOMContentLoaded', function() {
  const bodyCssProps = new CssPropControl(document.body);
  let toggle = document.querySelector('#dark-mode-toggle');

  toggle.addEventListener('click', () => {
    let mode = toggle.checked ? 'dark' : 'light';
    bodyCssProps.set('--background', bodyCssProps.get(`--${mode}-background`));
    bodyCssProps.set('--primary', bodyCssProps.get(`--${mode}-primary`));
    bodyCssProps.set('--link', bodyCssProps.get(`--${mode}-link`));
  });

  document.querySelectorAll('.dropdown-btn').forEach(button => {
  button.addEventListener('click', () => {
    const dropdownContent = button.nextElementSibling;
    const isActive = button.classList.contains('active');
    
    document.querySelectorAll('.dropdown-content').forEach(content => {
      if (content !== dropdownContent) {
        content.classList.remove('show');
        content.classList.add('hide');
        content.previousElementSibling.classList.remove('active');
      }
    });

    if (isActive) {
      dropdownContent.classList.remove('show');
      dropdownContent.classList.add('hide');
      button.classList.remove('active');
    } else {
      dropdownContent.classList.remove('hide');
      dropdownContent.classList.add('show');
      button.classList.add('active');
    }
    });
  });
});
