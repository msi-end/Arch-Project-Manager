// form 
const method = new DataCall();
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

async function SubmitNormalFormData(e) {
  await method.addNewItemToNp(undefined, e, 'np-form-data', null, 'admin/projects-create')
}

async function SubmitMiscFormData(e) {
  await method.addNewItemToNp(undefined, e, 'mp-form-data', null, 'admin/misc-project-create')
}

(async function GetSplitData() {
  let ratioData = await method.GET_POST('admin/settings/get-amountsplit', 'GET')
  let elmCtn = document.getElementById('splitRatio')
  for (const e of ratioData.data) {
    elmCtn.innerHTML += `<option value="${e.splitvalue}">${e.splitvalue}</option>`
  }

})()