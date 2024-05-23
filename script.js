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
      button.classList.toggle('active');
      
      if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
        dropdownContent.classList.add('hide');
        dropdownContent.style.maxHeight = null;
      } else {
        dropdownContent.classList.remove('hide');
        dropdownContent.classList.add('show');
        dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 'px';
      }
    });
  });
});
