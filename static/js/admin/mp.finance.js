// form 
function toggleForm(formId) {
    const forms = document.querySelectorAll('.formContainer > div');
    forms.forEach(form => {
      if (form.id === formId) {
        form.classList.remove('hide');
      } else {
        form.classList.add('hide');
      }
    });
  }
  
 function openDick(){
  document.querySelector(`.main-dropdown`).style.display = `block`;
 }