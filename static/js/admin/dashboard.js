const feature = new DataCall()
// EMPLOYEE ACCORDION
document.querySelectorAll(`.assign-to`).forEach((item, index) => {
    let header = item.querySelector(".eaccordion");
    header.addEventListener("click", async () => {
        console.log(item.dataset)
        const renderId = item.querySelector('#emp-in-np')
        renderId.innerHTML = ''
        const empNp = await feature.GET_POST(`apiv1/employee/${item.dataset.ndealid}/${item.dataset.taskid}`, 'GET');
        empNp.forEach((item) => {
            const html = `<li class="add-empl"><span>${item.name}</span> <span class="icon" data-ndealid=${item.ndeal_id} data-catid=${item.category_id} data-emid=${item.em_id} onclick="removeEmpNp(this)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="minus-circle" class="svg"><path fill="##000000" d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Zm4-9H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z"></path></svg></span></li>`
            renderId.innerHTML += html
        })
        item.classList.toggle("open");
        let description = item.querySelector(".emp-acc-data");
        let arr = item.querySelector(`.right-arr`);
        if (item.classList.contains("open")) {
            // description.style.height = `${description.scrollHeight}px`;
            description.classList.add(`open`);
            arr.classList.add(`open`);
        } else {
            // description.style.height = "0px";
            description.classList.remove(`open`);
            arr.classList.remove(`open`);
        }

    })
})

function closeSubBox() {
    const mainDrop = document.querySelector('.main-dropdown')
    mainDrop.classList.remove('active')
}

addNewSubtasks = async (param, e) => {
    e.preventDefault();
    const target = param.dataset
    const addSubtaskNp = new FormData(document.getElementById('all-subtask'));
    addSubtaskNp.append('ndeal_id', Number(target.ndeal_id));
    addSubtaskNp.append('category_id', Number(target.category_id));
    feature.GET_POST('apiv1/addsubtaskto-nproject', 'POST', addSubtaskNp, 'form')
    closeSubBox()
}


addNewEmp = async (param, e) => {
    const exdata = { taskName: "architechture", project: "Hospital Work", assignDate: "20/02/2023" }
    await feature.addNewItemToNp(param, e, 'all-emp', ['ndeal_id', 'category_id', 'npcid'], 'apiv1/add-employee-to-project', closeSubBox, exdata)
}

async function addTaskStatus(target) {
    const dataSet = target.parentNode.dataset
    const body = { status: target.value, dealId: Number(dataSet.ndealid), catId: Number(dataSet.taskid) }
    await feature.DEL_UPD('apiv1/update-task-status', "PUT", body)
}

async function removeEmpNp(data) {
    const dataSet = data.dataset;
    const date = new Date().toDateString();
    await feature.DEL_UPD(`apiv1/removeempnp?dealId=${Number(dataSet.ndealid)}&catId=${Number(dataSet.catid)}&emid=${Number(dataSet.emid)}&removeDate=${date}`, 'DELETE');
}

async function updateSubtaskStatus(data) {
    alert("Do you want to Update???")
    const { taskid, ndealid } = data.parentNode.dataset
    let status = null;
    if (data.checked) {
        status = "Completed"
    } else { status = "not started" }
    const body = { status: status, catId: taskid, dealId: ndealid, staskId: data.dataset.subtaskid }
    await feature.DEL_UPD('apiv1/update-subtask-status', 'PUT', body)
}

async function getProjectsStatus() {
    (location.pathname.match('/m') == null) ? EndPoint = 'ngetProjectStatus' : EndPoint = 'mgetProjectStatus'
    let [completed, pending] = [0, 0]
    let project_status_ctn = document.getElementsByClassName('total_user_data')
    try {
        let e = await feature.GET_POST(`apiv1/${EndPoint}`, 'GET');
        e.data.forEach(e => {e.project_status === 'completed' ? completed++ : pending++;});
        project_status_ctn[0].children[0].innerText = e.data.length;
        project_status_ctn[1].children[0].innerText = completed;
        project_status_ctn[2].children[0].innerText = pending;
    } catch (err) {console.error('Error project status:', err);}}
setTimeout(()=>{getProjectsStatus()},1500) 
