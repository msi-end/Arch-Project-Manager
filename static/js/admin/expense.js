let BASE_URL = location.href;
let ReqURI = { addExps: BASE_URL + `/add-Exps`, updExps: BASE_URL + `/expsUpdate/` }

function Opn_ExpenseCtn(e, elm) {
    (document.querySelector(`${e}`)).classList.remove(`hide`);
    e == '.editexpense' ? setExpenseToModel(elm) : null
}
function Cls_ExpenseCtn(e) {
    (document.querySelector(`${e}`)).classList.add(`hide`);
    // e == '.uprofile-settings' ? Disable_BtnHandler('.profile-grid', false) : null
}
function AlertNotifier(status, msg, icon) {
    Swal.fire({ title: status ? 'Sucess' : 'Error', text: msg, icon: icon, confirmButtonText: 'Done' });
}
function setExpenseToModel(e) {
    let ExpsCtn = e.parentElement.parentElement
    let editCtn = document.querySelector('.editexpense')
      editCtn.children[0].dataset.exps_id =ExpsCtn.dataset.exps_id
    console.log(e.dataset.exps_id);
    editCtn.querySelector('#exp-name').value = ExpsCtn.querySelector('.exp-name-data').innerText
    editCtn.querySelector('#amount').value = ExpsCtn.querySelector('.exp-amount-data').innerText
    editCtn.querySelector('#date').value = date_Split(`${ExpsCtn.querySelector('.exp-date-data').innerText}`, '/', false)
    editCtn.querySelector('#mode').value = ExpsCtn.querySelector('.exp-mode-data').innerText
    editCtn.querySelector('#remark').value = ExpsCtn.querySelector('.exp-rem-content').innerText
}
// ReqHandler Data  
// User Requestes To API
let ReqHandler = {
    GET: async function (url) {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        });
        return response.json();
    }, POST: async function (url, data) {
        console.log(url, data);
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data)
        });
        return response.json();
    }, PUT: async function (url, data) {
        console.log(JSON.stringify(data));
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data)
        });
        return response.json();
    }, DEL: async function (url) {
        const response = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        });
        return response.json();
    }
}

function addExpense() {
    let expAddCtn = document.getElementsByClassName('addexpense')[0]
    let dataObj = {
        title: expAddCtn.querySelector('#exp-name').value,
        amount: expAddCtn.querySelector('#amount').value,
        mode: expAddCtn.querySelector('#mode').value,
        remark: expAddCtn.querySelector('#remark').value,
        date: expAddCtn.querySelector('#date').value,
    }
    ReqHandler.POST(ReqURI.addExps, dataObj)
        .then((res) => {
            console.log(res);
            if (res.status == true) {
                AlertNotifier(res.status, res.msg, 'success');
                Cls_UserCtn('.uprofile-settings')
                Disable_BtnHandler('.profile-grid', false)
                Cls_UserCtn('.usform')
                setTimeout(() => {
                    location.reload()
                }, 2000);
            } else {
                AlertNotifier(res.status, res.msg, 'error');
            }
        }).catch(err => {
            console.log('Error(fn-ExpsAdd):'+ err);
        })
}
function updExpense() {
    let editCtn = document.querySelector('.editexpense')
    let exp_id = editCtn.children[0].dataset.exps_id
    let dataObj = {
        title: editCtn.querySelector('#exp-name').value,
        amount: editCtn.querySelector('#amount').value,
        mode: editCtn.querySelector('#mode').value,
        remark: editCtn.querySelector('#remark').value,
        date: date_Split(editCtn.querySelector('#date').value,'-',true)
    }
    ReqHandler.PUT(ReqURI.updExps + exp_id, dataObj)
        .then((res) => {
            console.log(res);
            if (res.status == true) {
                AlertNotifier(res.status, res.msg, 'success');
                setTimeout(() => {
                    location.reload()
                }, 2000);
            } else {
                AlertNotifier(res.status, res.msg, 'error');
            }
        }).catch(err => {
            console.log('Error(fn-ExpsUpdate):', err);
        })
}
