const getFun = new DataCall()
async function updataAdvancePay(data, e){
    e.preventDefault();
    const target = data.dataset
    const advanceData = new FormData(document.getElementById('advanced-form'));
    advanceData.append('ndeal_id', Number(target.dealid));
    advanceData.append('task', Number(target.taskid));
    await getFun.GET_POST('admin/finance/update-advancepay', 'PUT', advanceData, 'form')
    document.querySelector(`.main-dropdown`).style.display = `none`;;
}

async function openDick(data){
    const {ndealid, taskid} = data.dataset
    const maindropDown = document.querySelector(`.main-dropdown`);
    maindropDown.style.display = `block`;
    maindropDown.innerHTML = ""
    maindropDown.innerHTML = `<div class="finance-dropdown common_dropdown">
    <form id="advanced-form">
        <div class="flex">
            <p class="uppercase phead">Advance</p>
            <input type="text" name="amount_got" id="">
        </div>
        <div class="flex">
            <p class="uppercase phead">payment mode</p>
            <select name="modeofpay" id="">
                <option value="cash">Cash</option>
                <option value="online">Online</option>
            </select>
        </div>
        <div class="flex">
            <p class="uppercase phead">Date of payment</p>
            <input type="text" name="dateofpay" id="" placeholder="dd/mm/yyyy">
        </div>
        <button type="button" class="uppercase" data-dealid=${ndealid} data-taskid=${taskid} onclick="updataAdvancePay(this, event)">update</button>
    </form>
</div>`
   
}