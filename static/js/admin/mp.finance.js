
function hidePopup(event) {
  document.querySelector(".main-popup").classList.add('hide');
}


async function advOpen(data) {
  const maindrop = document.querySelector(`.main-popup`);
  maindrop.classList.toggle(`hide`)
  maindrop.innerHTML = ""
  maindrop.innerHTML = `<div class="advance-dropdown blur hide">
        <form class="form" id="advanced-form">
    <h2>Update Amount</h2>
    <div class="grid">
        <div class="field">
            <p class="title">Date <span>(DD/MM/YYYY)</p>
            <input type="text" name="dateofpay" id="finc-date">
        </div>
        <div class="field">
            <p class="title">Advance Amount <span>(in &#8377;)</span></p>
            <input type="text" name="amount_got" id="finc-amount">
        </div>
        <div class="field">
            <p class="title">Mode of Payment</p>
            <select name="modeofpay" id="misc-mode">
                <option value="cash">Cash</option>
                <option value="online">Online</option>
            </select>
        </div>
    </div>
    <div class="action-btn flex align-center">
        <button type="button" class="flex-1" data-mdealid="${data.dataset.mdealid}" data-taskid="${data.dataset.taskid}" onclick="sendRecievedStatus(this)">Update</button>
        <button type ="reset" class="flex-1 delete" onclick="hidePopup(this)" >Cancel</button>
    </div>
</form>
    </div>`
    const dropDownTarget = document.querySelector(`.advance-dropdown`);
    dropDownTarget.classList.toggle(`hide`);
}

async function sendRecievedStatus(target) {
  const project = document.getElementById('advanced-form')
  const body = { amount_got: document.querySelector('#finc-amount').value, dateofpay: document.querySelector('#finc-date').value, modeofpay: document.querySelector('#misc-mode').value, mdealid: target.dataset.mdealid, taskid: target.dataset.taskid }
  const feature = new DataCall();
  await feature.DEL_UPD('admin/finance/update-advancepay-mp', 'PUT', body)
  document.querySelector(`.main-popup`).classList.toggle(`hide`);
}

function showAllAmount(){
  document.querySelector(`.amountInfo`).classList.toggle(`hide`);
}