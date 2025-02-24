BASE_URL = location.href;
let ReqURI = {
  addExps: BASE_URL + `/add-Exps`,
  updExps: BASE_URL + `/expsUpdate/`,
  getExpsBymonths: BASE_URL + "/getExps",
  NisProjectPaid: location.origin + "/apiv1/nIsProjectPaid",
  MisProjectPaid: location.origin + "/apiv1/mIsProjectPaid",};

function hidePopup(event) {
  document.querySelector(".main-popup").classList.add("hide");
}
function AlertNotifier(status, msg, icon) {
  Swal.fire({
    title: status ? "Success" : "Error",
    text: msg,
    icon: icon,
    confirmButtonText: "Done",
  });
}
//ADD EXPENSE
function addExpenseForm() {
  const maindrop = document.querySelector(`.main-popup`);
  maindrop.classList.toggle(`hide`);
  maindrop.innerHTML = "";
  maindrop.innerHTML = `<div class="add-expense blur hide">
    <form class="form">
        <h2>Add an Expense</h2>
        <div class="grid extra-grid">
            <div class="field">
                <p class="title">Name of the Expense</p>
                <input type="text" name="expname" id="exp-name">
            </div>
            <div class="field">
                <p class="title">Expense Amount <span>(in &#8377;)</span></p>
                <input type="text" name="expamount" id="amount">
            </div>
            <div class="field">
                <p class="title">Mode of Payment</p>
                <select name="modeOfPays" id="mode">
                    <option value="cash">Cash</option>
                    <option value="online">Online</option>
                </select>
            </div>
            <div class="field">
                <p class="title">Date <span>(DD/MM/YYYY)</span></p>
                <input type="date" name="date" id="date">
            </div>
            <div class="field">
                <p class="title">Remarks <span>(*optional)</span></p>
                <input type="text" id="remark">
            </div>
        </div>
        <div class="action-btn flex align-center">
            <button type="button" onclick="addExpense()" class="flex-1">Add</button>
            <button type ="reset" class="flex-1 delete" onclick="hidePopup(this)">Cancel</button>
        </div>
    </form>
</div>`;
  const dropDownTarget = document.querySelector(`.add-expense`);
  dropDownTarget.classList.toggle(`hide`);
}
function addExpense() {
  let expAddCtn = document.getElementsByClassName("add-expense")[0];
  let dataObj = {
    title: expAddCtn.querySelector("#exp-name").value,
    amount: expAddCtn.querySelector("#amount").value,
    mode: expAddCtn.querySelector("#mode").value,
    remark: expAddCtn.querySelector("#remark").value,
    date: date_Split(expAddCtn.querySelector("#date").value, "-"||"/", true),
  };  
  ReqHandler.POST(ReqURI.addExps, dataObj)
    .then((res) => {
      if (res.status == true) {
        AlertNotifier(res.status, res.msg, "success");
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        AlertNotifier(res.status, res.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-ExpsAdd):" + err);
    });
}

//EDIT EXPENSE
function editExpense(e){
  console.log(e);
  let id = e.parentElement.parentElement.dataset.exps_id;  
  let target = e.parentElement.parentElement;
  const maindrop = document.querySelector(`.main-popup`);
    maindrop.classList.toggle(`hide`);
    maindrop.innerHTML = "";
    maindrop.innerHTML = `<div class="editexpense blur hide">
        <form class="form">
          <h2>Edit an Expense</h2>
          <div class="grid expense-grid">
            <div class="field">
              <p class="title">Name of the Expense</p>
              <input type="text" name="expname" id="exp-name">
            </div>
            <div class="field">
              <p class="title">Expense Amount <span>(in &#8377;)</span></p>
              <input type="text" name="expamount" id="amount">
            </div>
            <div class="field">
              <p class="title">Mode of Payment</p>
              <select name="modeOfPays" id="mode">
                <option value="cash">Cash</option>
                <option value="online">Online</option>
              </select>
            </div>
            <div class="field">
              <p class="title">Date <span>(DD/MM/YYYY)</span></p>
              <input type="date" name="date" id="date">
            </div>
            <div class="field">
              <p class="title">Remarks <span>(*optional)</span></p>
              <input type="text" id="remark">
            </div>
          </div>
          <div class="action-btn flex align-center">
            <button type="button" onclick="updExpense(${id})" class="flex-1">Update</button>
            <button type="reset" class="flex-1 delete" onclick="hidePopup(this)">Cancel</button>
          </div>
        </form>
      </div>`
      const dropDownTarget = document.querySelector(`.editexpense`);
      dropDownTarget.classList.toggle(`hide`);
      if(e){
        dropDownTarget.querySelector(`#exp-name`).value = target.querySelector(`.exp-name-data`).innerText;
        dropDownTarget.querySelector(`#amount`).value = target.querySelector(`.exp-amount-data`).innerText;
        dropDownTarget.querySelector(`#date`).value = date_Split(target.querySelector(`.exp-date-data`).innerText,"/",false);
        dropDownTarget.querySelector(`#mode`).value = target.querySelector(`.exp-mode-data`).innerText;
      }
}
function updExpense(exp_id) {
  let editCtn = document.querySelector(".editexpense");
  let dataObj = {
    title: editCtn.querySelector("#exp-name").value,
    amount: editCtn.querySelector("#amount").value.substring(2),
    mode: editCtn.querySelector("#mode").value,
    remark: editCtn.querySelector("#remark").value,
    date: date_Split(editCtn.querySelector("#date").value, "-", true),
  };
  ReqHandler.PUT(ReqURI.updExps + exp_id, dataObj)
    .then((res) => {
      console.log(res);
      if (res.status == true) {
        AlertNotifier(res.status, res.msg, "success");
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        AlertNotifier(res.status, res.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-ExpsUpdate):", err);
    });
}
function ChangeExpsByMonths(e) {
  let dataCtn = document.querySelector(".expense-page");
  let Elm = document.querySelector(".expense-list");
  let m = e.querySelector("#ExpsMonth").value;
  let y = e.querySelector("#ExpsYear").value;
  ReqHandler.GET(ReqURI.getExpsBymonths + `?m=${m}&y=${y}`)
    .then((res) => {
      dataCtn.innerHTML = "";
      if (res.status) {
        res.data.forEach((e) => {
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
               </path> </svg></a> <span class="edit">Edit</span></div> </div>`;
          dataCtn.innerHTML += html;
        });
      } else {
        AlertNotifier(res.status, res.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-ExpsUpdate):", err);
    });
}

(function IsProjectPaid() {
  let IsPainCtn = document.querySelector(".finance-notifications");
  ReqHandler.GET(ReqURI.NisProjectPaid)
    .then((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].total_price > res[i].amount_got) {
          Ctn = `<p class="notification-alert flex align-center">
                        <span class="text">
                            Project (${res[i].deal_name}) is completed while payment of ${res[i].total_price - res[i].amount_got} is still pending.
                        </span>
                        <span class="delete">Delete</span>
                    </p>`;
          IsPainCtn.innerHTML += Ctn;
        }
      }
    })
    .catch((err) => {
      console.log(
        "error getting IsProjectPaid() data expanse.js |ln:110 " + err
      );
    });
  ReqHandler.GET(ReqURI.MisProjectPaid)
    .then((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].total_price > res[i].amount_got) {
          Ctn = `<p class="notification-alert flex align-center">
                        <span class="text">
                             Project (${res[i].sdeal_name}) is completed while payment of ${res[i].total_price - res[i].amount_got} is still pending.
                        </span>
                        <span class="delete">Delete</span>
                    </p>`;
          IsPainCtn.innerHTML += Ctn;
        }
      }
    })
    .catch((err) => {
      console.log(
        "error getting IsProjectPaid() data expanse.js |ln:110 " + err
      );
    });
})();
