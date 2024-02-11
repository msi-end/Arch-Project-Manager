let ReqURI = { addExps: BASE_URL + `/add-Exps`, updExps: BASE_URL + `/expsUpdate/`, getExpsBymonths: BASE_URL + '/getExps', NisProjectPaid: location.origin + '/apiv1/nIsProjectPaid', MisProjectPaid: location.origin + '/apiv1/mIsProjectPaid' }

function Opn_ExpenseCtn(e, elm) {
    (document.getElementsByClassName('main')[0]).classList.add('flow');
    (document.querySelector(`${e}`)).classList.remove(`hide`);
    e == '.editexpense' ? setExpenseToModel(elm) : null
}
function Cls_ExpenseCtn(e) {
    document.getElementsByClassName('main')[0].classList.remove('flow');
    (document.querySelector(`${e}`)).classList.add(`hide`);
    // e == '.uprofile-settings' ? Disable_BtnHandler('.profile-grid', false) : null
}
function AlertNotifier(status, msg, icon) {
    Swal.fire({ title: status ? 'Sucess' : 'Error', text: msg, icon: icon, confirmButtonText: 'Done' });
}
function setExpenseToModel(e) {
    document.getElementsByClassName('main')[0].classList.remove('flow');
    let ExpsCtn = e.parentElement.parentElement
    let editCtn = document.querySelector('.editexpense')
    editCtn.children[0].dataset.exps_id = ExpsCtn.dataset.exps_id
    console.log(e.dataset.exps_id);
    editCtn.querySelector('#exp-name').value = ExpsCtn.querySelector('.exp-name-data').innerText
    editCtn.querySelector('#amount').value = ExpsCtn.querySelector('.exp-amount-data').innerText
    editCtn.querySelector('#date').value = date_Split(`${ExpsCtn.querySelector('.exp-date-data').innerText}`, '/', false)
    editCtn.querySelector('#mode').value = ExpsCtn.querySelector('.exp-mode-data').innerText
    editCtn.querySelector('#remark').value = ExpsCtn.querySelector('.exp-rem-content').innerText
}
function addExpense() {
    let expAddCtn = document.getElementsByClassName('addexpense')[0]
    let dataObj = {
        title: expAddCtn.querySelector('#exp-name').value,
        amount: expAddCtn.querySelector('#amount').value,
        mode: expAddCtn.querySelector('#mode').value,
        remark: expAddCtn.querySelector('#remark').value,
        date: date_Split(expAddCtn.querySelector('#date').value, '-', true),
    }
    ReqHandler.POST(ReqURI.addExps, dataObj).then((res) => {
        if (res.status == true) {
            AlertNotifier(res.status, res.msg, 'success');
            Cls_UserCtn('.uprofile-settings')
            // Cls_ExpenseCtn('.addexpense')
            Disable_BtnHandler('.profile-grid', false)
            Cls_UserCtn('.usform')
            setTimeout(() => {
                location.reload()
            }, 2000);
        } else {
            AlertNotifier(res.status, res.msg, 'error');
        }
    }).catch(err => {
        console.log('Error(fn-ExpsAdd):' + err);
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
        date: date_Split(editCtn.querySelector('#date').value, '-', true)
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
function ChangeExpsByMonths(e) {
    let dataCtn = document.querySelector('.expense-page')
    let Elm = document.querySelector('.expense-list')
    let m = e.querySelector('#ExpsMonth').value
    let y = e.querySelector('#ExpsYear').value
    ReqHandler.GET(ReqURI.getExpsBymonths + `?m=${m}&y=${y}`)
        .then((res) => {
            dataCtn.innerHTML = '';
            if (res.status) {
                (res.data).forEach(e => {
                    let html = `<div class="expense-list flex" data-e_id="${e.id}"> <div class="expense-ref"><p class="uppercase exp-ref">Ref. no.</p>
                   <p class="exp-refn"> ${e.id} </p></div>
               <!-- -------------------  -->
               <div class="expense-name"> <p class="uppercase exp-name">expense name</p><p class="exp-name-data">${e.title}</p> </div>
               <!-- ----------------------------------  -->
               <div class="expense-amount"><p class="uppercase exp-amo">Amount</p><p class="exp-amo-data">&#8377; <span class="exp-amount-data">${e.amount} </span></p> </div>
               <!-- ----------------------------------  -->
               <div class="expense-date"><p class="uppercase exp-date">date</p><p class="exp-date-data">${e.date}</p> </div>
               <!-- ----------------------------------  -->
               <div class="expense-mode"> <p class="uppercase exp-mode">mode of payment</p> <p class="exp-mode-data"> ${e.md_type} </p> </div>
               <!-- ---------------------------------  -->
               <div class="expense-remarks"> <p class="uppercase exp-rem">remarks</p> <p class="exp-rem-content"> ${e.remark}</p></div>
               <!-- ---------------------------------  -->
               <div class="expense-edit"><a class="eicon" onclick="Opn_ExpenseCtn('.editexpense',this)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="pen"><path fill="##000000"   d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z">
               </path> </svg></a> <span class="edit">Edit</span></div> </div>`
                    dataCtn.innerHTML += html
                });
            } else { AlertNotifier(res.status, res.msg, 'error'); }
        }).catch(err => { console.log('Error(fn-ExpsUpdate):', err); })
}
function search() {
    var inpValue = document.getElementById('searchQuery').value.toLowerCase();
    var elmCtn = document.querySelectorAll('.expense-list');
    elmCtn.forEach(function (e) {
        var contentText = e.textContent.toLowerCase();
        if (contentText.includes(inpValue)) {
            e.style.display = 'grid';
        } else { e.style.display = 'none'; }
    });
}

(function IsProjectPaid() {
    let IsPainCtn =document.querySelector('.finance-scroll')
    ReqHandler.GET(ReqURI.NisProjectPaid)
        .then((res) => {
            for (let i = 0; i < res.length; i++) {
                if(res[i].total_price>res[i].amount_got){
                    Ctn=`<p class="red"><span>
                        The project <strong>${res[i].deal_name}</strong> with Ref.no:<strong>${res[i].reference_no}</strong> has been completed while the payment of Rs ${res[i].total_price-res[i].amount_got}/- is pending </span><span><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="exclamation"><path fill="##000000" d="M12,14a1,1,0,0,0,1-1V7a1,1,0,0,0-2,0v6A1,1,0,0,0,12,14Zm0,4a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,12,18Z"></path></svg></span></p><hr>`
                    IsPainCtn.innerHTML+=Ctn
                }
            }
        }).catch(err => { console.log('error getting IsProjectPaid() data expanse.js |ln:110 '+err) })
    ReqHandler.GET(ReqURI.MisProjectPaid)
    .then((res) => {
        for (let i = 0; i <res.length; i++) {
            if(res[i].total_price>res[i].amount_got){
            Ctn=`<p class="red"><span>
                The project <strong>${res[i].sdeal_name}</strong> with Ref.no:<strong>${res[i].reference_no}</strong> has been completed while the payment of Rs ${res[i].total_price-res[i].amount_got}/- is pending </span><span><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="exclamation"><path fill="##000000" d="M12,14a1,1,0,0,0,1-1V7a1,1,0,0,0-2,0v6A1,1,0,0,0,12,14Zm0,4a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,12,18Z"></path></svg></span></p><hr>`
            IsPainCtn.innerHTML+=Ctn}
        }
    }).catch(err => { console.log('error getting IsProjectPaid() data expanse.js |ln:110 '+err) })
})()