// form 
function toggleForm(formId, target) {
    document.querySelector('#p-name').innerHTML = target.id;
    const forms = document.querySelectorAll('.formContainer > div');
    forms.forEach(form => {
      if (form.id === formId) {
        form.classList.remove('hide');
      } else {
        form.classList.add('hide');
      }
    });
  }

  function getMiscTask(params) {
    console.log("Here is your tasks...")
  }