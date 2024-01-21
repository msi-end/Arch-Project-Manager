//EMPLOYEE LISTS AND SUBTASKS
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
    <button data-category_id="${getId.taskid}" data-ndeal_id="${getId.ndealid}" data-npcid="${getId.npcid}" class="uppercase" onclick="addNewEmp(this, event)">update</button>
    <button class="uppercase">Cancel</button>
    </form>
    </div>
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
    <div class="drop-btn flex">
    <button data-category_id="${getId.taskid}" data-ndeal_id="${getId.ndealid}" class="uppercase" onclick="addNewSubtasks(this, event)">update</button>
    <button class="uppercase">Cancel</button>
    </div>
    </form>
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


deadDrop = async(target)=>{
    const getId = target.parentNode.dataset
    const mainDrop = document.querySelector(`.main-dropdown`);
    mainDrop.innerHTML = ''
    const subPopupBox = `<div class="deadline-drop-menu common_dropdown">
    <p class="uppercase"><span>Architecture</span> Deadline</p>
    <input type="text" placeholder="dd/mm/yyyy">
    <div class="drop-btn flex">
        <button class="uppercase">update</button>
        <button class="uppercase">Cancel</button>
    </div>`
    mainDrop.innerHTML = subPopupBox
    mainDrop.classList.toggle(`active`)
    const dropDownTarget = document.querySelector(`.deadline-drop-menu`)
    dropDownTarget.classList.toggle(`active`)
}






function hideMainDropdown(event) {
    let mainDrops = event.target.closest(".main-dropdown");
    if (mainDrops) {
      if (!mainDrops.contains(event.target)) {
        mainDrops.style.display = "none";
      }
    }
  }
  
  const mainDrop = document.querySelectorAll(".main-dropdown");
  mainDrop.forEach(dropdown => {
    dropdown.addEventListener("click", hideMainDropdown);
  });