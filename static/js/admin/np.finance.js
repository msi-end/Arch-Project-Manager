const getFun = new DataCall();

function hidePopup(event) {
  document.querySelector(".main-popup").classList.add("hide");
}
let ReqURI={
  Payment_methods: location.origin + "/admin/settings/get-payment-methods"
}
let STATES = {
  Payment_methods: [],
};

async function addSplitAdvance(data) {
  const { ndealid, taskid } = data.dataset;
  const maindrop = document.querySelector(`.main-popup`);
  maindrop.classList.toggle(`hide`);
  maindrop.innerHTML = "";
  maindrop.innerHTML = `<div class="advance-dropdown blur hide">
    <form class="form" id="advance-form">
    <h2>Update Amount</h2>
    <div class="grid">
        <div class="field">
            <p class="title">Date <span>(DD/MM/YYYY)</p>
            <input type="text" name="dateofpay" id="finc-date">
        </div>
        <div class="field">
            <p class="title">Amount Paid <span>(in &#8377;)</span></p>
            <input type="text" name="amount_got">
        </div>
        <div class="field">
            <p class="title">Mode of Payment</p>
            <select name="modeofpay" id="mode">
                <option value="cash">Cash</option>
                <option value="online">Online</option>
            </select>
        </div>
    </div>
    <div class="action-btn flex align-center">
        <button type="button" class="flex-1" data-dealid=${ndealid} data-taskid=${taskid} onclick="updataAdvancePay(this, event)">Update</button>
        <button type ="reset" class="flex-1 delete" onclick="hidePopup(this)" >Cancel</button>
    </div>
</form>
</div>`;
  const dropDownTarget = document.querySelector(`.advance-dropdown`);
  dropDownTarget.classList.toggle(`hide`);
  flatpickr("#finc-date", { dateFormat: "d/m/Y", allowInput: true });
       STATES.Payment_methods.data.forEach((e) => {
    maindrop.querySelector('#mode').innerHTML+=`<option value="${e.pm_title}">${e.pm_title}</option>`
  });
}

async function updataAdvancePay(data, e) {
  e.preventDefault();
  const target = data.dataset;
  const advanceData = new FormData(document.getElementById("advance-form"));
  advanceData.append("ndeal_id", Number(target.dealid));
  advanceData.append("task", Number(target.taskid));
  await getFun.GET_POST(
    "admin/finance/update-advancepay",
    "POST",
    advanceData,
    "form"
  );
  document.querySelector(`.main-popup`).classList.toggle(`hide`);
}

function showAllAmount(e) {
  e.parentElement.parentElement
    .querySelector(`.amountInfo-popup`)
    .classList.toggle(`hide`);
}
function updateAllProgressBars() {
  let datactn = document.querySelectorAll('[class="contents grid"]');
  datactn.forEach((card) => {
    const projectAmount =
      parseFloat(card.querySelector("#projectAmount").textContent) || 0;
    const receivedAmount =
      parseFloat(card.querySelector("#receivedAmount").textContent) || 0;
    const percent =
      projectAmount > 0 ? (receivedAmount / projectAmount) * 100 : 0;
    card.querySelector(".progress-bar").style.width = percent + "%";
    card.querySelector(".progress-bar").innerHTML = Math.round(percent) + "%";
  });
}
function getPayment_methods() {
  ReqHandler.GET(ReqURI.Payment_methods)
    .then((res) => {STATES.Payment_methods = res;})
    .catch((err) => {console.log("Error(fn-getPayment_methods):", err);});
}
getPayment_methods();
updateAllProgressBars();
function getNormalprojectFinancePayment(e) {}
