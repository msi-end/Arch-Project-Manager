//EMPLOYEE LISTS AND SUBTASKS
const dataMethod = new DataCall()
async function empPopup(target) {
    document.getElementsByClassName('main')[0].classList.add('flow');
    const getId = target.parentNode.dataset
    const mainDrop = document.querySelector('.main-dropdown')
    mainDrop.innerHTML = ''
    const empHtml = `<div class="emp-drop-menu common_dropdown">
    <form id="all-emp">
    <ul id="emp-list">
        <li class="stasks">
            <!-- <input type="checkbox" name="plumbing" id="sub-t">
            <span>Plumbing</span> -->
        </li>
    </ul>
    </form>
    <div class="drop-btn flex">
    <button data-category_id="${getId.taskid}" data-ndeal_id="${getId.ndealid}" data-npcid="${getId.npcid ? getId.npcid : 'false'}" class="uppercase" onclick="addNewEmp(this, event)">update</button>
    <button type="button" class="uppercase " onclick="hideMainDropdown();" >Cancel</button></div>
    </div>
</div>`
    mainDrop.innerHTML = empHtml
    mainDrop.classList.toggle('active')
    const dropDownTarget = document.querySelector(`.emp-drop-menu`)
    const subtasks = await feature.GET_POST('apiv1/get-employee', 'GET')
    dropDownTarget.classList.toggle(`active`);
    const renderTarget = dropDownTarget.querySelector('#emp-list')
    renderTarget.innerHTML = ''
    subtasks.forEach((item) => {
        const html = `<li class="stasks">
        <input type="checkbox" name="emid" value="${item.em_id}">
        <span>${item.name}</span>
    </li>`
        renderTarget.innerHTML += html
    })
}


subPopup = async (target) => {
    document.getElementsByClassName('main')[0].classList.add('flow');
    const getId = target.parentNode.dataset
    const mainDrop = document.querySelector('.main-dropdown')
    mainDrop.innerHTML = ''
    const subPopupBox = `<div class="task-drop-menu common_dropdown">
    <form id="all-subtask">
    <ul id="subtasks-list">
        <li class="stasks">
            <!-- <input type="checkbox" name="plumbing" id="sub-t">
            <span>Plumbing</span> -->
        </li>
    </ul>
    </form>
    <div class="drop-btn flex">
    <button data-category_id="${getId.taskid}" data-ndeal_id="${getId.ndealid}" class="uppercase" onclick="addNewSubtasks(this, event)">update</button>
    <button  type="button"  class="uppercase " onclick="hideMainDropdown()">Cancel</button>
    </div>
</div>`
    mainDrop.innerHTML = subPopupBox
    mainDrop.classList.toggle('active')
    const dropDownTarget = document.querySelector(`.task-drop-menu`)
    const subtasks = await feature.GET_POST('admin/settings/get-subtask', 'GET')
    dropDownTarget.classList.toggle(`active`);
    const renderTarget = dropDownTarget.querySelector('#subtasks-list')
    renderTarget.innerHTML = ''
    subtasks.forEach((item) => {
        const html = `<li class="stasks">
        <input type="checkbox" name="stask_id" id="sub-t" value="${item.sub_task_id}">
        <span>${item.sub_task_name}</span>
    </li>`
        renderTarget.innerHTML += html
    })
}

async function updateNPTdeadline(target) {
    const date = document.getElementById('np-deadline-date').value;
    await dataMethod.DEL_UPD('apiv1/update-task-deadline', 'PUT', { date: date, dealId: target.dataset.ndealid, catId: target.dataset.taskid, })
    hideMainDropdown();
}


deadDrop = async (target) => {
    const mainDrop = document.querySelector(`.main-dropdown`);
    mainDrop.innerHTML = ''
    const subPopupBox = `<div class="deadline-drop-menu common_dropdown">
    <p class="uppercase"><span>Architecture</span> Deadline</p>
    <input type="text" placeholder="dd/mm/yyyy" id="np-deadline-date">
    <div class="drop-btn flex">
        <button class="uppercase" data-taskid="${target.dataset.taskid}" data-ndealid="${target.dataset.ndealid}" onclick="updateNPTdeadline(this)">update</button>
        <button type="button" class="uppercase " onclick="hideMainDropdown()" >Cancel</button>
    </div>`
    mainDrop.innerHTML = subPopupBox
    mainDrop.classList.toggle(`active`)
    const dropDownTarget = document.querySelector(`.deadline-drop-menu`)
    dropDownTarget.classList.toggle(`active`)
}

editProject = async (target, type) => {
    const data = await dataMethod.GET_POST(`apiv1/get-data-update?id=${target.dataset.dealid}&type=${type}`, 'GET');
    const getSplitVals = await dataMethod.GET_POST(`admin/settings/get-amountsplit`, 'GET');
    document.getElementsByClassName('main')[0].classList.add('flow');
    const mainDrop = document.querySelector(`.main-dropdown`);
    mainDrop.innerHTML = ''
    const subPopupBox = `<div class="edit-menu common_dropdown">
    <form id="update-detail-form">
        <h4 class="uppercase">contact details</h4>
        <div class="edit-grid">
            <div class="field">
                <label for="name">Name</label>
                <input type="text" name="name" id="ename" placeholder="e.g.: Pragyan Tamuli" value="${type == 'normal' ? data.results[0].deal_name : data.results[0].sdeal_name}">
            </div>
            <div class="field">
                <label for="cnumber">Phone Number</label>
                <input type="text" name="econtact" id="enumber" placeholder="e.g.: 9874561230" value="${data.results[0].contact}">
            </div>
            <div class="field">
                <label for="email">Email</label>
                <input type="text" name="egmail" id="egmail" placeholder="e.g.: ebah@gmail.com" value="${data.results[0].email}">
            </div>
            <div class="field">
                <label for="address">Address</label>
                <input type="text" name="ecity" id="eaddress" value="${data.results[0].city}">
            </div>
        </div>
        <h4 class="uppercase">project details</h4>
        <div class="edit-grid">
            <div class="field">
                <label for="ref">Reference No</label>
                <input type="text" name="eref" id="eref" value="${data.results[0].reference_no}">
            </div>
            <div class="field">
                <label for="workName">Name of The Project</label>
                <input type="text" name="ework" id="ework" value="${data.results[0].work_name}">
            </div>
            <div class="field">
                <label for="amount">Total Amount</label>
                <input type="text" name="etotal" id="eamount" placeholder="&#8377;" value="${data.results[0].total_price}">
            </div>
            <div class="field">
                <label for="amount">Advance Amount</label>
                <input type="text" name="eagre" id="eaamount" disabled placeholder="&#8377;" value="${data.results[0].agreement_amount}">
            </div>
            <div class="field">
                <label for="amount">Project deadline</label>
                <input type="text" name="edeadline" id="" placeholder="dd/mm/yyyy, Eg:01/06/2024"  value="${type == 'normal' ? data.results[0].np_deadline : data.results[0].mp_deadline}">
            </div>
            <div class="field">
                <label for="splitRatio">Amount Split Ratio</label>
                <select name="split" id="splitRatio">
                <option value="${data.results[0].split}" selected >${data.results[0].split}</option>
                </select>
            </div>
        </div>
    </form>
    <div class="drop-btn flex">
    <button type="button" data-dealid="${type == 'normal' ? data.results[0].id : data.results[0].sdid}" class="uppercase" onclick="UpdateProjectDetails(this, '${type}')">Update</button>
    <button type="button" class="uppercase" onclick="hideMainDropdown()">Cancel</button>
</div>
</div>`;
    mainDrop.innerHTML = subPopupBox;
    (getSplitVals.data).forEach(e => {
        let newSplit = `<option value="${e.splitvalue}">${e.splitvalue}</option>`
        document.getElementById('splitRatio').innerHTML += newSplit;
    });
    mainDrop.classList.toggle(`active`);
    const dropDownTarget = document.querySelector(`.edit-menu`);
    dropDownTarget.classList.toggle(`active`);
    if(location.href.includes('dashboard/misc')){
        document.getElementsByClassName('field')[9].remove();}
}

async function UpdateProjectDetails(target, type) {
    const formUpdate = new FormData(document.getElementById('update-detail-form'))
    formUpdate.append('dealid', target.dataset.dealid)
    if (type == 'normal') {
        await dataMethod.GET_POST('apiv1/np-data-update', 'PUT', formUpdate, 'form');
    } else { await dataMethod.GET_POST('apiv1/misc-data-update', 'PUT', formUpdate, 'form'); }
    hideMainDropdown()

}

function hideMainDropdown(event) {
    document.getElementsByClassName('main')[0].classList.remove('flow');
    let mainDrops = document.querySelector(".main-dropdown");
    mainDrops.classList.remove('active')
}

