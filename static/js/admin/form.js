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

function checkFormValid(id) {
  const dataTobeInsert = new FormData(document.getElementById(id))
  let arrR = []
  for (const i of dataTobeInsert) {
    if (i[1]) { arrR.push(true) }else { arrR.push(false) }
  }
  return arrR;
}

async function SubmitNormalFormData(e) {
  e.preventDefault();
  const actionCreator = checkFormValid('np-form-data')
  if (actionCreator.includes(false)) {
    alert('please fillup all the input')
  }else {
    await method.addNewItemToNp(undefined, e, 'np-form-data', null, 'admin/projects-create')
  }
}

async function SubmitMiscFormData(e) {
  e.preventDefault();
  const actionCreator = checkFormValid('mp-form-data')
  if (actionCreator.includes(false)) {
    alert('please fillup all the input')
  }else {
    await method.addNewItemToNp(undefined, e, 'mp-form-data', null, 'admin/misc-project-create')
  }
}

(async function GetSplitData() {
  let ratioData = await method.GET_POST('admin/settings/get-amountsplit', 'GET')
  let elmCtn = document.getElementById('splitRatio')
  for (const e of ratioData.data) {
    elmCtn.innerHTML += `<option value="${e.splitvalue}">${e.splitvalue}</option>`
  }

})()