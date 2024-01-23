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
function openDick() {
  document.querySelector(`.main-dropdown`).style.display = `block`;
}

function GetIncExp() {
  let Ctn = document.getElementsByClassName('total_user_data')
  ReqHandler.GET(location.origin + '/admin/finance/get-income-expense').then((res) => {
    if (res.status) {
      Ctn[0].children[0].children[0].innerText = res.data[1][0].total_sum
      Ctn[1].children[0].children[0].innerText = res.data[0][0].cash_sum
      Ctn[2].children[0].children[0].innerText = res.data[0][0].online_sum
    }
  }).catch(err => { console.log('Error(fn-ExpsUpdate):', err); })
}
GetIncExp()