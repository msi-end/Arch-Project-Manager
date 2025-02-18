//EMPLOYEE LISTS AND SUBTASKS
const dataMethod = new DataCall()

function hidePopup(event) {
    document.querySelector(".main-popup").classList.add('hide');
}

async function editProject(target, type){
    const data = await dataMethod.GET_POST(`apiv1/get-data-update?id=${target.dataset.dealid}&type=${type}`, 'GET');
    const getSplitVals = await dataMethod.GET_POST(`admin/settings/get-amountsplit`, 'GET');

    const mainDrop = document.querySelector(`.main-popup`);
    mainDrop.innerHTML = ``;
    const subPopupBox = `<div class="edit-project-popup blur hide">
                        <form class="form" id="update-detail-form">
                            <h2>Edit Project</h2>
                            <h3 class="uppercase">Contact Details</h3>
                            <div class="grid">
                                <div class="field">
                                    <p class="title">Client Name</p>
                                    <input type="text" name="name" id="ename" value="${type == 'normal' ? data.results[0].deal_name : data.results[0].sdeal_name}">
                                </div>
                                <div class="field">
                                    <p class="title">Phone Number <span>(e.g. 9874563210)</span></p>
                                    <input type="text" name="econtact" id="econtact" value="${data.results[0].contact}">
                                </div>
                                <div class="field">
                                    <p class="title">Email ID <span>(*optional)</span></p>
                                    <input type="text" name="egmail" id="egmail" value="${data.results[0].email}">
                                </div>
                                <div class="field">
                                    <p class="title">Address</p>
                                    <input type="text" name="ecity" id="eaddress" value="${data.results[0].city}">
                                </div>
                            </div>

                            <hr>

                            <h3 class="uppercase">Project Details</h3>
                            <div class="grid">
                                <div class="field">
                                    <p class="title">Reference Number</p>
                                    <input type="text" name="eref" id="eref" value="${data.results[0].reference_no}">
                                </div>
                                <div class="field">
                                    <p class="title">Project Name</p>
                                    <input type="text" name="ework" id="ework" value="${data.results[0].work_name}">
                                </div>
                                <div class="field">
                                    <p class="title">Project Amount <span>(in &#8377;)</span></p>
                                    <input type="text" name="etotal" id="eamount" value="${data.results[0].total_price}">
                                </div>
                                <div class="field">
                                    <p class="title">Advance Amount <span>(in &#8377;)</span></p>
                                    <input type="text" name="eagre" id="eaamount" value="${data.results[0].agreement_amount}" disabled>
                                </div>
                                <div class="field">
                                    <p class="title">Agreement Date <span>(DD/MM/YYYY)</span></p>
                                    <input type="text" name="edeadline" id="" value="${type == 'normal' ? data.results[0].np_deadline : data.results[0].mp_deadline}">
                                </div>
                                <div class="field">
                                    <p class="title">Amount Split Ratio</p>
                                    <select name="split" class="" id="splitRatio">
                                        <option value="${data.results[0].split}" selected >${data.results[0].split}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="action-btn flex align-center">
                                <button type="button" class="flex-1" data-dealid="${type == 'normal' ? data.results[0].id : data.results[0].sdid}" onclick="UpdateProjectDetails(this, '${type}')">Update</button>
                                <button type="button" class="flex-1 delete" onclick="hidePopup()">Cancel</button>
                            </div>
                        </form>
                    </div>`;
    mainDrop.innerHTML = subPopupBox;
    (getSplitVals.data).forEach(e => {
        let newSplit = `<option value="${e.splitvalue}">${e.splitvalue}</option>`
        document.getElementById('splitRatio').innerHTML += newSplit;
    });
    mainDrop.classList.toggle(`hide`);
    const dropDownTarget = document.querySelector(`.edit-project-popup`);
    dropDownTarget.classList.toggle(`hide`);
    if (location.href.includes('dashboard/misc')) {
        document.getElementsByClassName('field')[9].remove();
    }
}

async function UpdateProjectDetails(target, type) {
    const formUpdate = new FormData(document.getElementById('update-detail-form'))
    formUpdate.append('dealid', target.dataset.dealid)
    if (type == 'normal') {
        await dataMethod.GET_POST('apiv1/np-data-update', 'PUT', formUpdate, 'form');
    } else { await dataMethod.GET_POST('apiv1/misc-data-update', 'PUT', formUpdate, 'form'); }
    hidePopup()
}


async function empPopup(target) {
    const getId = target.parentNode.dataset
    const mainDrop = document.querySelector('.main-popup')
    mainDrop.innerHTML = ''
    const empHtml = `<div class="emp-drop-menu blur hide">
                        <form id="all-emp" class="form">
                            <h2>Employee List</h2>
                            <ul id="emp-list"></ul>
                            <div class="action-btn flex align-center">
                                <button type="button" class="flex-1" data-category_id="${getId.taskid}" data-ndeal_id="${getId.ndealid}" data-npcid="${getId.npcid ? getId.npcid : 'false'}" onclick="addNewEmp(this, event)">Update</button>
                                <button type="button" class="flex-1 delete" onclick="hidePopup()">Cancel</button>
                            </div>
                        </form>
                    </div>`
    mainDrop.innerHTML = empHtml
    mainDrop.classList.toggle('hide')
    const dropDownTarget = document.querySelector(`.emp-drop-menu`)
    const subtasks = await feature.GET_POST('apiv1/get-employee', 'GET')
    dropDownTarget.classList.toggle(`hide`);
    const renderTarget = dropDownTarget.querySelector('#emp-list')
    renderTarget.innerHTML = ''
    subtasks.forEach((item) => {
        const html = `<li class="flex align-center">
                                    <input type="checkbox" name="emid" value="${item.em_id}">
                                    <span class="name">${item.name}</span>
                                </li>`
        renderTarget.innerHTML += html
    })
}


async function subPopup(target) {
    const getId = target.parentNode.dataset
    const mainDrop = document.querySelector('.main-popup')
    mainDrop.innerHTML = ''
    const subPopupBox = `<div class="task-drop-menu blur hide">
                        <form id="all-subtask" class="form">
                            <h2>Sub Tasks</h2>
                            <ul id="subtasks-list"></ul>
                            <div class="action-btn flex align-center">
                                <button type="button" class="flex-1" data-category_id="${getId.taskid}" data-ndeal_id="${getId.ndealid}" onclick="addNewSubtasks(this, event)">Update</button>
                                <button type="button" class="flex-1 delete" onclick="hidePopup()">Cancel</button>
                            </div>
                        </form>
                    </div>`
    mainDrop.innerHTML = subPopupBox
    mainDrop.classList.toggle('hide')
    const dropDownTarget = document.querySelector(`.task-drop-menu`)
    const subtasks = await feature.GET_POST('admin/settings/get-subtask', 'GET')
    dropDownTarget.classList.toggle(`hide`);
    const renderTarget = dropDownTarget.querySelector('#subtasks-list')
    renderTarget.innerHTML = ''
    subtasks.forEach((item) => {
        const html = `<li class="flex align-center">
                            <input type="checkbox" name="stask_id" id="sub-t" value="${item.sub_task_id}">
                            <span class="name">${item.sub_task_name}</span>
                        </li>`
        renderTarget.innerHTML += html
    })
}

async function deadDrop(target){
    const mainDrop = document.querySelector(`.main-popup`);
    mainDrop.innerHTML = ''
    const subPopupBox = `<div class="deadline-drop-menu blur hide">
        <div class="form">
            <h3 class="uppercase">Deadline</h3>
            <div class="field">
                <p class="title">Deadline <span>(DD/MM/YYYY)</span></p>
                <input type="text" id="np-deadline-date">
            </div>
            <div class="action-btn flex align-center">
                <button type="button" class="flex-1" data-taskid="${target.dataset.taskid}" data-ndealid="${target.dataset.ndealid}" onclick="updateNPTdeadline(this)">Update</button>
                <button type="button" class="flex-1 delete" onclick="hidePopup()" >Cancel</button>
            </div>
        </div>
    </div>`
    mainDrop.innerHTML = subPopupBox
    mainDrop.classList.toggle(`hide`)
    const dropDownTarget = document.querySelector(`.deadline-drop-menu`)
    dropDownTarget.classList.toggle(`hide`)
}

async function updateNPTdeadline(target) {
    const date = document.getElementById('np-deadline-date').value;
    await dataMethod.DEL_UPD('apiv1/update-task-deadline', 'PUT', { date: date, dealId: target.dataset.ndealid, catId: target.dataset.taskid, })
    hidePopup();
}





