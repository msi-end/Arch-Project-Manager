//EMPLOYEE LISTS AND SUBTASKS
const dataMethod = new DataCall()
async function empPopup(target) {
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
    <div class="drop-btn flex">
    <button data-category_id="${getId.taskid}" data-ndeal_id="${getId.ndealid}" data-npcid="${getId.npcid ? getId.npcid : 'false'}" class="uppercase" onclick="addNewEmp(this, event)">update</button>
    <button type="button" class="uppercase " onclick="hideMainDropdown()" >Cancel</button></div>
    </div>
    </form>
</div>`
    mainDrop.innerHTML = empHtml
    mainDrop.classList.toggle('active')
    const dropDownTarget = document.querySelector(`.emp-drop-menu`)
    const subtasks = await feature.GET_POST('apiv1/get-employee', 'GET')
    dropDownTarget.classList.toggle(`active`);
    const renderTarget = dropDownTarget.querySelector('#emp-list')
    renderTarget.innerHTML = ''
    subtasks.forEach((item)=>{
        const html = `<li class="stasks">
        <input type="checkbox" name="emid" value="${item.em_id}">
        <span>${item.name}</span>
    </li>`
    renderTarget.innerHTML += html
    })
}


subPopup = async (target)=> {
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
    subtasks.forEach((item)=>{
        const html = `<li class="stasks">
        <input type="checkbox" name="stask_id" id="sub-t" value="${item.sub_task_id}">
        <span>${item.sub_task_name}</span>
    </li>`
    renderTarget.innerHTML += html
    })
}

async function updateNPTdeadline(target) {
   const date = document.getElementById('np-deadline-date').value;
   await dataMethod.DEL_UPD('apiv1/update-task-deadline', 'PUT', {date: date, dealId : target.dataset.ndealid, catId : target.dataset.taskid,})
   hideMainDropdown();  
}


deadDrop = async(target)=>{
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






function hideMainDropdown(event) {
    let mainDrops = document.querySelector(".main-dropdown");
        mainDrops.classList.remove('active')
}
  
