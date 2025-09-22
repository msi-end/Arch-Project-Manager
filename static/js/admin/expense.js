BASE_URL = location.href;
let ReqURI = {
  addExps: BASE_URL + `/add-Exps`,
  updExps: BASE_URL + `/expsUpdate/`,
  getExpsBymonths: BASE_URL + "/getExps",
  NisProjectPaid: location.origin + "/apiv1/nIsProjectPaid",
  MisProjectPaid: location.origin + "/apiv1/mIsProjectPaid",
  Expense_category: location.origin + location.pathname + "/category/readAll",
  Payment_methods: location.origin + "/admin/settings/get-payment-methods",
  last_project: location.origin + location.pathname + "/last_project/get",
  search_last_project:
    location.origin + location.pathname + "/last_project/search/",
  getProjectPhaseNormal: location.origin + "/apiv1/normal/getProjectPhase/",
  getProjectPhaseMisc: location.origin + "/apiv1/misc/getProjectPhase/",
  createProjectFinMisc: location.origin + "/admin/finance/update-advancepay-mp",
  createProjectFinNormal: location.origin + "/admin/finance/update-advancepay",
  delProjectFinNormal:
    location.origin + "/admin/finance/delete_normal_payment/",
  delProjectFinMisc: location.origin + "/admin/finance/delete_misc_payment/",
  delExpense: location.origin + location.pathname + "/delete/",
  updateProjectFinNormal:
    location.origin + "/admin/finance/update_normal_payment/",
  updateProjectFinMisc: location.origin + "/admin/finance/update_misc_payment/",
};
let STATES = {
  Expense_category: [],
  Payment_methods: [],
  Last_projects: [],
  Search_Last_projects: [],
  Selected_projectPhase_info: [],
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
        <input type="text" name="project_id" id="search_project" onchange="search_projects(this,'fromSearch')" placeholder="Search Project by Name,Ref ID. etc.">
        <div class="search-project-ctn">
        <span class="cancel-btn" onclick="close_project_listCtn()">x</span>
        <span class="content"></span>
        </div>
        <select name="last-project" id="income-last-project" onchange="Select_Project_getPhase(this,'fromList')" placeholder="Search Project by Name,Ref ID. etc.">
          <option value="">Select From last 10 Projects</option>
        </select>
      </div>
      <div class="field">
        <p class="title">Enter Phase <span>(in &#8377;)</span></p>
        <select name="last-project-phase" id="income-last-project-phase"  onchange="Select_Phase_showDate(this)">
          <option value="">Select Project Phase</option>
        </select>
      <span id="Project_phaseData_show" class="hide" >  </span>

      </div>
      <div class="field">
        <p class="title">Payment Method</p>
        
        <select name="mode" id="mode">
          <option value="">Select Payment Method</option>
          <option value="cash">Cash</option>
          <option value="online">Online</option>
        </select>
      </div>
      <div class="field">
        <p class="title">Date <span>(DD/MM/YYYY)</span></p>
        <input type="text" name="date" id="date" placeholder="DD/MM/YYYY">
      </div>
      <div class="field">
        <p class="title">Amount <span>(*optional)</span></p>
        <input type="text" name="amount" id="amount">
      </div>
    </div>
    <div class="action-btn flex align-center">
      <button type="button" onclick="addIncome()" class="flex-1">Add</button>
      <button type="reset" class="flex-1 delete" onclick="hidePopup(this)">Cancel</button>
    </div>
  </form>
</div>`;
  const dropDownTarget = document.querySelector(`.add-expense`);
  dropDownTarget.classList.toggle(`hide`);
  flatpickr("#date", { dateFormat: "d/m/Y", allowInput: true });
  let last_project_ctn = document.querySelector("#income-last-project");
  STATES.Last_projects.normal.forEach((e) => {
    last_project_ctn.innerHTML += `<option value="normal-${e.id}-${e.name}-${e.reference_no}">${e.reference_no} | ${e.name}</option>`;
  });
  STATES.Last_projects.misc.forEach((e) => {
    last_project_ctn.innerHTML += `<option value="misc-${e.id}-${e.name}-${e.reference_no}">${e.reference_no} | ${e.name}</option>`;
  });
   STATES.Payment_methods.data.forEach((e) => {
    maindrop.querySelector('#mode').innerHTML+=`<option value="${e.pm_title}">${e.pm_title}</option>`
  });
}
function addIncome() {
  let incomeAddCtn = document.getElementsByClassName("add-expense")[0];
  let projectInput = incomeAddCtn.querySelector("[name='project_id']").value;
  let selectedPhase = incomeAddCtn.querySelector("[name='last-project-phase']");
  let selectedProject = incomeAddCtn.querySelector(
    "[name='last-project']"
  ).value;
  let projectType, projectId;
  if (projectInput) {
    if (projectInput.includes("NORMAL-")) {
      projectType = "normal";
      projectId =
        selectedPhase.options[selectedPhase.selectedIndex].dataset.project_id;
    } else if (projectInput.includes("MISC-")) {
      projectType = "misc";
      projectId =
        selectedPhase.options[selectedPhase.selectedIndex].dataset.project_id;
    }
  }
  console.log(projectType, projectId);
  let dataObj;
  if (projectType === "normal") {
    dataObj = {
      ndeal_id: projectId,
      task: selectedPhase.value,
      amount_got: incomeAddCtn.querySelector("[name='amount']").value,
      modeofpay: incomeAddCtn.querySelector("[name='mode']").value,
      dateofpay: incomeAddCtn.querySelector("[name='date']").value,
    };
    ReqHandler.POST(ReqURI.createProjectFinNormal, dataObj)
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
        console.log("Error(fn-IncomeAdd):" + err);
        AlertNotifier(false, "An error occurred while adding income", "error");
      });
  } else if (projectType === "misc") {
    dataObj = {
      mdealid: projectId,
      taskid: selectedPhase.value,
      amount_got: incomeAddCtn.querySelector("[name='amount']").value,
      modeofpay: incomeAddCtn.querySelector("[name='mode']").value,
      dateofpay: incomeAddCtn.querySelector("[name='date']").value,
    };
    ReqHandler.PUT(ReqURI.createProjectFinMisc, dataObj)
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
        console.log("Error(fn-IncomeAdd):" + err);
        AlertNotifier(false, "An error occurred while adding income", "error");
      });
  } else {
    AlertNotifier(false, "Please select a valid project", "error");
    return;
  }
  if (!dataObj.task) {
    AlertNotifier(false, "Please select a project phase", "error");
    return;
  }
  if (!dataObj.modeofpay) {
    AlertNotifier(false, "Please select mode of payment", "error");
    return;
  }
  if (!dataObj.dateofpay) {
    AlertNotifier(false, "Please enter a valid date", "error");
    return;
  }
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
        <p class="title">Payment Method</p>
        <select name="modeOfPays" id="mode">
          <option value="">Select Payment Method</option>
          <option value="cash">Cash</option>
          <option value="online">Online</option>
        </select>
      </div>
      <div class="field">
        <p class="title">Date <span>(DD/MM/YYYY)</span></p>
        <input type="text" name="date" id="date" placeholder="DD/MM/YYYY">
      </div>
      <div class="field">
        <p class="title">Remarks <span>(*optional)</span></p>
        <input type="text" id="remark">
      </div>
      <div class="field">
        <p class="title">Category</p>
        <select name="category" id="expense_category">
          <option value="">Select from Categories</option>
          <option value="Fuel">Fuel</option>
          <option value="Trevel">Trevel</option>
        </select>
      </div>
    </div>
    <div class="action-btn flex align-center">
      <button type="button" onclick="addExpense()" class="flex-1">Add</button>
      <button type="reset" class="flex-1 delete" onclick="hidePopup(this)">Cancel</button>
    </div>
  </form>
</div>`;
  flatpickr("#date", { dateFormat: "d/m/Y", allowInput: true });
  const dropDownTarget = document.querySelector(`.add-expense`);
  let expense_category = document.querySelector("#expense_category");
  STATES.Expense_category.data.forEach((e) => {
    expense_category.innerHTML += `<option value="${e.cat_name}">${e.cat_name}</option>`;
  });
  STATES.Payment_methods.data.forEach((e) => {
    maindrop.querySelector('#mode').innerHTML+=`<option value="${e.pm_title}">${e.pm_title}</option>`
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
    date: expAddCtn.querySelector("#date").value,
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
function editIncome_expense(e) {
  let id = e.parentElement.parentElement.dataset.exps_id;
  let type = e.parentElement.parentElement.dataset.type;
  let target = e.parentElement.parentElement;
  const maindrop = document.querySelector(`.main-popup`);
  maindrop.classList.toggle(`hide`);
  maindrop.innerHTML = "";
  maindrop.innerHTML = `<div class="editexpense blur hide">
  <form class="form">
    <h2>Edit an Income / Expense</h2>
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
        <p class="title">Select Category</p>
        <select name="category" id="category">
          <option value="">Select Category</option>
        </select>
      </div>
    </div>
    <div class="action-btn flex align-center">
      <button type="button" onclick="updateIncome_expense(${id},'${type}')" class="flex-1">Update</button>
      <button type="reset" class="flex-1 delete" onclick="hidePopup(this)">Cancel</button>
    </div>
  </form>
</div>`;
  if (type !== 'expense') {
    maindrop.children[0].querySelectorAll("div")[5].style.display = "none";
    maindrop.children[0].querySelectorAll("div")[6].style.display = "none";
  }
  const dropDownTarget = document.querySelector(`.editexpense`);
  dropDownTarget.classList.toggle(`hide`);
  let expense_category = dropDownTarget.querySelector(`#category`);
  STATES.Expense_category.data.forEach((e) => {
    expense_category.innerHTML += `<option value="${e.cat_name}">${e.cat_name}</option>`;
  });
     STATES.Payment_methods.data.forEach((e) => {
    maindrop.querySelector('#mode').innerHTML+=`<option value="${e.pm_title}">${e.pm_title}</option>`
  });
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
    dropDownTarget.querySelector(`#remark`).value =
      target.querySelector(`.exp-remark`).innerText;
  }
}
function updateIncome_expense(exp_id, type) {
  let elemetCtn, requestURI;
  if (type == "Normal") {
    requestURI = ReqURI.updateProjectFinNormal;
  } else if (type == "Misc") {
    requestURI = ReqURI.updateProjectFinMisc;
  } else {
    requestURI = ReqURI.updExps;
  }
  let editCtn = document.querySelector(".editexpense");
  let dataObj = {
    title: editCtn.querySelector("#exp-name").value,
    amount: editCtn.querySelector("#amount").value.substring(2),
    mode: editCtn.querySelector("#mode").value,
    date: date_Split(editCtn.querySelector("#date").value, "-", true),
    remark: editCtn.querySelector("#remark").value,
    category: editCtn.querySelector("#category").value,
  };
  ReqHandler.PUT(requestURI + exp_id, dataObj)
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
function getExpense_Category_payment_methods() {
  let category = document.querySelector("#category");
  ReqHandler.GET(ReqURI.Expense_category)
    .then((res) => {
      STATES.Expense_category = res;
      res.data.forEach((e) => {
        category.innerHTML += `<option value="${e.cat_name}">${e.cat_name}</option>`;
      });
    })
    .catch((err) => {
      console.log("Error(fn-getExpense_Category):", err);
    });
  ReqHandler.GET(ReqURI.Payment_methods)
    .then((res) => {
      STATES.Payment_methods = res;
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
    project_listCtn = project_listCtn.getElementsByClassName("content")[0];
    project_listCtn.innerHTML = ""; // clear old results before appending
    if (
      STATES.Search_Last_projects.normal.length > 0 ||
      STATES.Search_Last_projects.misc.length > 0
    ) {
      STATES.Search_Last_projects.normal.forEach((p) => {
        project_listCtn.innerHTML += `
          <p class="searched-projects click-effect" onclick="Select_Project_getPhase('${p.id}-${p.name}-${p.reference_no}','Normal')">
            <strong>Normal:</strong>ID:${p.id} | <strong>Name:</strong> ${p.name} <br> <strong>Reference no:</strong>
            ${p.reference_no}
          </p>`;
      });
      STATES.Search_Last_projects.misc.forEach((p) => {
        project_listCtn.innerHTML += `
          <p class="searched-projects click-effect" onclick="Select_Project_getPhase('${p.id}-${p.name}-${p.reference_no}','Misc')">
            <strong>Misc:</strong>ID:${p.id} | <strong>Name:</strong> ${p.name} <br> <strong>Reference no:</strong>
            ${p.reference_no}
          </p>`;
      });
    } else {
      project_listCtn.innerHTML += `<h1 class="searched-projects click-effect" style="text-align:center;margin: 70px;opacity: 0.3;" ><strong>No data Found!</strong></h1>`;
    }
  }
}
function close_project_listCtn() {
  let project_listCtn = document.querySelector(".search-project-ctn");
  project_listCtn.classList.remove("show");
  project_listCtn.classList.add("hide");
}

function Select_Project_getPhase(e, type) {
  let project_id,
    pro_type,
    pro_ref,
    pro_name,
    project_PhaseInput,
    validPro_type;
  if (type == "fromList") {
    project_id = e.value.split("-")[1];
    pro_type = e.value.split("-")[0];
    pro_name = e.value.split("-")[2];
    pro_ref = e.value.split("-")[3];
  } else {
    project_id = e.split("-")[0];
    pro_type = type;
    pro_name = e.split("-")[1];
    pro_ref = e.split("-")[2];
  }
  console.log(project_id, pro_type, pro_ref, pro_name);
  let last_project_ctn = document.querySelector("#income-last-project");
  let search_projectInput = document.querySelector("#search_project");
  last_project_ctn.value = "";
  search_projectInput.value = `${pro_type.toUpperCase()}-${pro_ref} | ${pro_name}`;
  let project_listCtn = document.querySelector(".search-project-ctn");
  project_PhaseInput = document.querySelector("#income-last-project-phase");
  ReqHandler.GET(
    (pro_type.toUpperCase() == "NORMAL"
      ? ReqURI.getProjectPhaseNormal
      : ReqURI.getProjectPhaseMisc) + project_id
  )
    .then((res) => {
      console.log(res);

      STATES.Selected_projectPhase_info = res.data;
      project_PhaseInput.innerHTML = `<option value="">Select Project Phase</option>`;
      res.data.forEach((e) => {
        console.log(e);
        project_PhaseInput.innerHTML += `<option data-type="${pro_type}" data-project_id="${e.project_id}" value="${e.id}">${e.name}</option>`;
      });
    })
    .catch((err) => {
      console.log(
        "error getting IsProjectPaid() data expanse.js |ln:110 " + err
      );
    });
  project_listCtn.classList.remove("show");
  project_listCtn.classList.add("hide");
}

function Select_Phase_showDate(e) {
  let showDataCtn = document.querySelector("#Project_phaseData_show");
  showDataCtn.classList.remove("hide");
  showDataCtn.classList.add("show");
  let type = e.options[e.selectedIndex].dataset.type;

  console.log(e);
  console.log(STATES.Selected_projectPhase_info[0].type == "normal");

  if (STATES.Selected_projectPhase_info[0].type == "normal") {
    let lastNormal =
      (STATES.Last_projects && STATES.Last_projects.normal) || [];
    let searchNormal =
      (STATES.Search_Last_projects && STATES.Search_Last_projects.normal) || [];
    let combined = [...lastNormal, ...searchNormal];

    let found = combined.find(
      (item) => item.id === STATES.Selected_projectPhase_info[0].project_id
    );

    let spiltval = found ? found.split : null;

    if (!spiltval) return;
    let ratios = spiltval.split(":").map(Number);
    let totalParts = ratios.reduce((a, b) => a + b, 0);
    let onePart =
      STATES.Selected_projectPhase_info[0].total_amount / totalParts;
    let result = ratios.map((r) => r * onePart);
    let labels = ["Architecture", "Structural", "3D"];
    let showLabels = ratios
      .map((val, i) => (val > 0 ? `${labels[i]} ${result[i]}` : null))
      .filter(Boolean)
      .join(" | ");
    STATES.Selected_projectPhase_info.find((data) => {
      if (data.id == e.value) {
        showDataCtn.innerHTML = `
          <span>Name: ${data.name}</span>
          <span>Recieved in Phase: ${data.total_received}</span>
          <span>Total Project Amount: ${data.total_amount}</span><br>
          <span>Split: ${spiltval}</span><br>
          <span>${showLabels}</span>
        `;
      }
    });
  } else {
    STATES.Selected_projectPhase_info.find((data) => {
      if (data.id == e.value) {
        showDataCtn.innerHTML = `
          <span>Name: ${data.name}</span>
          <span>Total Recieved: ${data.total_received}</span>
          <span>Total Project Amount: ${data.total_amount}</span>
        `;
      }
    });
  }
}
function DeleteIncome_expense(e, type, entity_id) {
  let elemetCtn, requestURI;
  elemetCtn = e.parentElement.parentElement;
  if (type == "Normal") {
    requestURI = ReqURI.delProjectFinNormal;
  } else if (type == "Misc") {
    requestURI = ReqURI.delProjectFinMisc;
  } else {
    requestURI = ReqURI.delExpense;
  }
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then(async (pers) => {
    if (pers.isConfirmed) {
      ReqHandler.DEL(requestURI + entity_id)
        .then((res) => {
          console.log(res);
          AlertNotifier(res.status, res.msg, "success");
          setTimeout(() => {
            location.reload();
          }, 1000);
        })
        .catch((err) => {
          AlertNotifier(res.status, res.msg, "error");
          console.log(
            "error getting IsProjectPaid() data expanse.js |ln:110 " + err
          );
        });
    }
  });
}
function setCurrentMonth() {
  const select = document.getElementById("ExpsMonth");
  const currentMonth = new Date().getMonth() + 1;
  select.value = currentMonth;
}
setCurrentMonth();
(function IsProjectPaid() {
  let IsPainCtn = document.querySelector(".finance-notifications");
  ReqHandler.GET(ReqURI.NisProjectPaid)
    .then((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].total_price > res[i].amount_got) {
          Ctn = `<p class="notification-alert flex align-center">
      <span class="text">
      Project (${res[i].deal_name}) is completed while payment of 
      ${res[i].total_price - res[i].amount_got} is still pending.
    </span><span class="delete">Delete</span></p>`;
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
getExpense_Category_payment_methods();
getLast_Projects_and_Search();
