// ACCORDION
const feature = new DataCall()
document.querySelectorAll(`.accordion-content`).forEach((item, index) =>{
    let header = item.querySelector(".ahead");
    header.addEventListener("click", () => {
        item.classList.toggle("open");
        let description = item.querySelector(".adata");
        let darr= item.querySelector(`.arrow-down`);
        if(item.classList.contains("open")){
            // description.style.height = `${description.scrollHeight}px`;
            description.classList.add(`open`);
            darr.classList.add(`open`);    
        }else{
            // description.style.height = "0px";
            description.classList.remove(`open`);
            darr.classList.remove(`open`);
        }
        removeOpen(index);
    })
})
function removeOpen(index1){
    document.querySelectorAll(`.accordion-content`).forEach((item2, index2) => {
        if (index1 != index2) {
            item2.classList.remove ("open");
            let des = item2.querySelector(".adata");
            des.classList.remove(`open`);
            let arr=item2.querySelector(`.arrow-down`);
            arr.classList.remove(`open`);
        }
    })
}

// EMPLOYEE ACCORDION
document.querySelectorAll(`.assign-to`).forEach((item, index) =>{
    let header = item.querySelector(".eaccordion");
    header.addEventListener("click", async () => {
        const renderId = item.querySelector('#emp-in-np')
        renderId.innerHTML = ''
        const empNp = await feature.GET_POST('http://localhost:3000/apiv1/employee/1/1', 'GET');
        empNp.forEach((item) =>{
            const html = `<li class="add-empl">${item.name}</li>`
            renderId.innerHTML += html
        })
        item.classList.toggle("open");
        let description = item.querySelector(".emp-acc-data");
        let arr = item.querySelector(`.right-arr`);
        if(item.classList.contains("open")){
            // description.style.height = `${description.scrollHeight}px`;
            description.classList.add(`open`);
            arr.classList.add(`open`);    
        }else{
            // description.style.height = "0px";
            description.classList.remove(`open`);
            arr.classList.remove(`open`);
        }
     
    })
})


//EMPLOYEE LISTS AND SUBTASKS


subPopup = async (target)=> {
    const getId = target.parentNode.dataset
    const mainDrop = document.querySelector('.main-dropdown')
    mainDrop.innerHTML = ''
    const subPopupBox = `<div class="task-drop-menu common_dropdown">
    <ul id="subtasks-list">
        <li class="stasks">
            <!-- <input type="checkbox" name="plumbing" id="sub-t">
            <span>Plumbing</span> -->
        </li>
    </ul>
    <button data-taskid="${getId.taskid}" data-ndealid="${getId.ndealid}" class="uppercase" onclick="addNewSubtasks(this)">update</button>
</div>`
    mainDrop.innerHTML = subPopupBox
    mainDrop.classList.toggle('active')
    const dropDownTarget = document.querySelector(`.task-drop-menu`)
    const subtasks = await feature.GET_POST('http://localhost:3000/admin/settings/get-subtask', 'GET')
    dropDownTarget.classList.toggle(`active`);
    const renderTarget = dropDownTarget.querySelector('#subtasks-list')
    renderTarget.innerHTML = ''
    subtasks.forEach((item)=>{
        const html = `<li class="stasks">
        <input type="checkbox" name="subtasks" id="sub-t" value="${item.sub_task_id}">
        <span>${item.sub_task_name}</span>
    </li>`
    renderTarget.innerHTML += html
    })
}

function closeSubBox() {
    const mainDrop = document.querySelector('.main-dropdown')
    mainDrop.classList.remove('active')  
}


function ChangeTaskStatus(ev) {
    const dropDown = ev.parentNode.childNodes[3];
    console.log(dropDown.childNodes);
    dropDown.classList.toggle(`active`);
    const listItems = dropDown.childNodes;
    listItems.forEach(listItem =>{
        listItem.addEventListener('click', (e)=>{
            const addClass = e.target.parentNode;
            console.log(addClass);
            const mClass = addClass.parentNode;
            console.log(mClass);
            mClass.parentNode.childNodes[1].classList.add(e.target.parentNode.classList[0]);
            ev.parentNode.childNodes[1].childNodes[1].textContent = listItem.textContent;
            dropDown.classList.remove(`active`);
        });
    });
}

addNewSubtasks = async (param)=>{
  const target = param.dataset
  console.log(param.parentNode.querySelectorAll('#sub-t'))
}



