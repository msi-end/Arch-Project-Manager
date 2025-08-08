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
  let dataCtn = document.querySelector(".expense-table table tbody");
  let m = document.querySelector("#ExpsMonth").value;
  let y = document.querySelector("#ExpsYear").value;
  ReqHandler.GET(ReqURI.getExpsBymonths + `?m=${m}&y=${y}`)
    .then((res) => {
      dataCtn.innerHTML = "";
      if (res.status) {
        res.data.forEach((e) => {
          let html =
               `<tr data-e_id="${e.id}">
                      <td>
                        ${e.id}
                      </td>
                      <td class="exp-name-data">
                        ${e.title}
                      </td>
                      <td class="exp-amount-data">
                        &#8377; ${e.amount}
                      </td>
                      <td class="exp-date-data">
                        ${e.date}
                      </td>
                      <td class="exp-mode-data">
                        ${e.md_type}
                      </td>
                      <td>
                        ${e.remark}
                      </td>
                      <td class="flex align-center">
                        <button class="edit" data-exps_id="<%= exps.id %>" onclick="editExpense(this)">Edit</button>
                      </td>
                    </tr>`;
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
