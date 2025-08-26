BASE_URL = location.href;
let ReqURI = {
  addExps: BASE_URL + `/add-Exps`,
  updExps: BASE_URL + `/expsUpdate/`,
  getExpsBymonths: BASE_URL + "/getExps",
  NisProjectPaid: location.origin + "/apiv1/nIsProjectPaid",
  MisProjectPaid: location.origin + "/apiv1/mIsProjectPaid",
  Expense_category: location.origin + location.pathname + "/category/readAll",
  last_project: location.origin + location.pathname + "/last_project/get",
  search_last_project:
    location.origin + location.pathname + "/last_project/search/",
};
let STATES = {
  Expense_category: [],
  Last_projects: [],
  Search_Last_projects: [],
};

function AlertNotifier(status, msg, icon) {
  Swal.fire({
    title: status ? "Success" : "Error",
    text: msg,
    icon: icon,
    confirmButtonText: "Done",
  });
}
function hidePopup(event) {
  document.querySelector(".main-popup").classList.add("hide");
}

// OPEN INCOME EXPENSE SELECTOR
function addEx_IncPopupToggle(e) {
  document.getElementsByClassName(e)[0].classList.toggle("show");
}

//ADD INCOME
function addIncomeForm() {
  addEx_IncPopupToggle("add-button-child");
  const maindrop = document.querySelector(`.main-popup`);
  maindrop.classList.toggle(`hide`);
  maindrop.innerHTML = "";
  maindrop.innerHTML = `<div class="add-expense blur hide">
  <form class="form">
    <h2>Add an Income</h2>
    <div class="grid extra-grid">
      <div class="field">
        <p class="title">Enter Project</p>
        <input type="text" name="project" id="search_project" onchange="search_projects(this)" placeholder="Search Project by Name,Ref ID. etc.">
        <div class="search-project-ctn">
        <span class="cancel-btn" onclick="close_project_listCtn()">x</span>
        <span class="content"></span>
        </div>
        <select name="last-project" id="income-last-project" placeholder="Search Project by Name,Ref ID. etc.">
          <option value="cash">Select From last 10 Projects</option>
        </select>
      </div>
      <div class="field">
        <p class="title">Enter Phase Amount <span>(in &#8377;)</span></p>
        <select name="search-last-project" id="income-search-last-project">
          <option value="cash">Select Project Phase</option>
        </select>
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
        <p class="title">Amount <span>(*optional)</span></p>
        <input type="text" id="amount">
      </div>
    </div>
    <div class="action-btn flex align-center">
      <button type="button" onclick="addExpense()" class="flex-1">Add</button>
      <button type="reset" class="flex-1 delete" onclick="hidePopup(this)">Cancel</button>
    </div>
  </form>
</div>`;
  const dropDownTarget = document.querySelector(`.add-expense`);
  dropDownTarget.classList.toggle(`hide`);
}
function addincome() {
  let expAddCtn = document.getElementsByClassName("add-expense")[0];
  let dataObj = {
    title: expAddCtn.querySelector("#exp-name").value,
    amount: expAddCtn.querySelector("#amount").value,
    mode: expAddCtn.querySelector("#mode").value,
    remark: expAddCtn.querySelector("#remark").value,
    date: date_Split(expAddCtn.querySelector("#date").value, "-" || "/", true),
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

//ADD EXPENSE
function addExpenseForm() {
  addEx_IncPopupToggle("add-button-child");
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
          <option value="">Select Payment Method</option>
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
      <div class="field">
        <p class="title">Category</p>
        <select name="category" id="expense_category">
          <option value="">Select from Categories</option>
          <option value="cash">Fuel</option>
          <option value="online">Trevel</option>
        </select>
      </div>
    </div>
    <div class="action-btn flex align-center">
      <button type="button" onclick="addExpense()" class="flex-1">Add</button>
      <button type="reset" class="flex-1 delete" onclick="hidePopup(this)">Cancel</button>
    </div>
  </form>
</div>`;
  const dropDownTarget = document.querySelector(`.add-expense`);
  let expense_category = document.querySelector("#expense_category");
  STATES.Expense_category.data.forEach((e) => {
    expense_category.innerHTML += `<option value="${e.cat_name}">${e.cat_name}</option>`;
  });
  dropDownTarget.classList.toggle(`hide`);
}
function addExpense() {
  let expAddCtn = document.getElementsByClassName("add-expense")[0];
  let dataObj = {
    title: expAddCtn.querySelector("#exp-name").value,
    amount: expAddCtn.querySelector("#amount").value,
    mode: expAddCtn.querySelector("#mode").value,
    remark: expAddCtn.querySelector("#remark").value,
    date: date_Split(expAddCtn.querySelector("#date").value, "-" || "/", true),
    category: expAddCtn.querySelector("#expense_category").value,
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
function editExpense(e) {
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
</div>`;
  const dropDownTarget = document.querySelector(`.editexpense`);
  dropDownTarget.classList.toggle(`hide`);
  if (e) {
    dropDownTarget.querySelector(`#exp-name`).value =
      target.querySelector(`.exp-name-data`).innerText;
    dropDownTarget.querySelector(`#amount`).value =
      target.querySelector(`.exp-amount-data`).innerText;
    dropDownTarget.querySelector(`#date`).value = date_Split(
      target.querySelector(`.exp-date-data`).innerText,
      "/",
      false
    );
    dropDownTarget.querySelector(`#mode`).value =
      target.querySelector(`.exp-mode-data`).innerText;
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
          let html = `<tr data-e_id="${e.id}" class="expense-border">
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

//EXPENSE CATEGORY
function getExpense_Category() {
  let category = document.querySelector("#category");
  ReqHandler.GET(ReqURI.Expense_category)
    .then((res) => {
      STATES.Expense_category = res;
      res.data.forEach((e) => {
        category.innerHTML += `<option value="${e.cat_name}">${e.cat_name}</option>`;
      });
      console.log("fn-getExpense_Category working fine");
    })
    .catch((err) => {
      console.log("Error(fn-getExpense_Category):", err);
    });
}

//Filter BY Category
function SortTableByCategory(e) {
  const selectedCategory = document.querySelector(
    '[data-fn-type="categoryFilter"]'
  ).value;
  const rows = document.querySelectorAll("#dataTable tr");
  rows.forEach((row) => {
    let rowCategory = row.querySelector(".exp-category");
    row.classList.remove("hide");
    if (!selectedCategory || rowCategory.innerText === selectedCategory) {
      row.classList.remove("hide");
    } else {
      row.classList.add("hide");
    }
  });
}
//Filter BY Type
function filterByDataType(type) {
  const rows = document.querySelectorAll("#dataTable tr[data-type]");
  rows.forEach((row) => {
    const rowType = row.dataset.type;
    const showRow =
      type === "allType" ||
      (type === "expense" && rowType === "expense") ||
      (type !== "expense" && rowType !== "expense");
    row.classList.toggle("hide", !showRow);
  });
}

// GET LAST PROJECT AND SEARCH DATA
async function getLast_Projects_and_Search(search_term) {
  try {
    let res = await ReqHandler.GET(
      search_term
        ? ReqURI.search_last_project + search_term
        : ReqURI.last_project
    );
    console.log(res);
    console.log(search_term);

    if (search_term) {
      STATES.Search_Last_projects = res.data;
    } else {
      STATES.Last_projects = res.data;
    }
    console.log("fn-getLast_Projects_and_Search working fine");
    return true; // Now this will be returned to caller
  } catch (err) {
    console.log("Error(fn-getLast_Projects_and_Search):", err);
    return false;
  }
}

// SEARCH PROJECTS
async function search_projects(e) {
  let search_value = e.value;
  let data_Status = await getLast_Projects_and_Search(search_value);
  if (data_Status) {
    let project_listCtn = document.querySelector(".search-project-ctn");
  project_listCtn.classList.remove("hide");
    project_listCtn.classList.add("show");
    project_listCtn=  project_listCtn.getElementsByClassName('content')[0]
    project_listCtn.innerHTML = ""; // clear old results before appending
    if (STATES.Search_Last_projects.normal.length > 0 || STATES.Search_Last_projects.misc.length > 0 ) {
      STATES.Search_Last_projects.normal.forEach((p) => {
        project_listCtn.innerHTML += `
          <p class="searched-projects click-effect" onclick="Select_Project_getPhase(${p.id},'Normal')">
            <strong>Normal:</strong>ID:${p.id} | <strong>Name:</strong> ${p.name} <br> <strong>Reference no:</strong>
            ${p.reference_no}
          </p>`;
      });
      STATES.Search_Last_projects.misc.forEach((p) => {
        project_listCtn.innerHTML += `
          <p class="searched-projects click-effect" onclick="Select_Project_getPhase(${p.id},'Misc')">
            <strong>Misc:</strong>ID:${p.id} | <strong>Name:</strong> ${p.name} <br> <strong>Reference no:</strong>
            ${p.reference_no}
          </p>`;
      });
    }else{
      project_listCtn.innerHTML += `<h1 class="searched-projects click-effect" style="text-align:center;margin: 70px;opacity: 0.3;" ><strong>No data Found!</strong></h1>`;
    }
  }
}
function close_project_listCtn() {
  let project_listCtn = document.querySelector(".search-project-ctn");
  project_listCtn.classList.remove("show");
  project_listCtn.classList.add("hide");
}
function Select_Project_getPhase(val,e) {
  let search_projectInput = document.querySelector('#search_project')
  let project_listCtn = document.querySelector(".search-project-ctn");
  project_listCtn.classList.remove("show");
  project_listCtn.classList.add("hide");



}

(function IsProjectPaid() {
  let IsPainCtn = document.querySelector(".finance-notifications");
  ReqHandler.GET(ReqURI.NisProjectPaid)
    .then((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].total_price > res[i].amount_got) {
          Ctn = `<p class="notification-alert flex align-center">
    <span class="text">
      Project (${res[i].deal_name}) is completed while payment of ${
            res[i].total_price - res[i].amount_got
          } is still pending.
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
        Project (${res[i].sdeal_name}) is completed while payment of ${
            res[i].total_price - res[i].amount_got
          } is still pending.
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
getExpense_Category();
getLast_Projects_and_Search();
