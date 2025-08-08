const feature = new DataCall()

function hidePopup(event) {
    document.querySelector(".main-popup").classList.add('hide');
}
// RENDER EMPLOYEE 
document.querySelectorAll(`.category-assignees`).forEach((item) => {
    async function renderEmployee() {
        const renderId = item.querySelector(`#emp-in-np`);
        renderId.innerHTML = ``;
        if (item.dataset.taskid) {
            const empNp = await feature.GET_POST(`apiv1/employee/${item.dataset.ndealid}/${item.dataset.taskid}`, 'GET');
            empNp.forEach((item) => {
                const html = `<li class="flex align-center j-between">
                                <span class="name">${item.name}</span>
                                <span class="icon delete" data-ndealid=${item.ndeal_id} data-catid=${item.category_id} data-emid=${item.em_id} onclick="removeEmpNp(this, 'normal')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        id="trash-alt">
                                        <path fill=""
                                            d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z">
                                        </path>
                                    </svg></span>
                            </li>`
                renderId.innerHTML += html
            })
        } else {
            const empMp = await feature.GET_POST(`apiv1/get-misc-emp/${item.dataset.ndealid}/${item.dataset.staskid}`, 'GET');
            empMp.forEach((item) => {
                const html = `<li class="add-empl"><span>${item.name}</span> <span class="icon" data-ndealid=${item.mdeal_id} data-catid=${item.mstask_id} data-emid=${item.em_id} onclick="removeEmpNp(this)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="minus-circle" class="svg"><path fill="##000000" d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Zm4-9H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z"></path></svg></span></li>`
                renderId.innerHTML += html
            })
        }

    }
    renderEmployee()
})


// POST NEW SUB TASK 
addNewSubtasks = async (param, e) => {
    e.preventDefault();
    const target = param.dataset
    const addSubtaskNp = new FormData(document.getElementById('all-subtask'));
    addSubtaskNp.append('ndeal_id', Number(target.ndeal_id));
    addSubtaskNp.append('category_id', Number(target.category_id));
    feature.GET_POST('apiv1/addsubtaskto-nproject', 'POST', addSubtaskNp, 'form')
    hidePopup()
}

addNewEmp = async (param, e) => {
    if (param.dataset.npcid != 'false') {
        const exdata = { title: `You have been assigned to a new project with ref no. ${document.querySelector('#refid').innerHTML} on ${new Date()}`, assignDate: "20/02/2023" }
        await feature.addNewItemToNp(param, e, 'all-emp', ['ndeal_id', 'category_id', 'npcid'], 'apiv1/add-employee-to-project', hidePopup, exdata)
    } else {
        const exdataM = { title: `You have been assigned to a new Miscallaneous project with ref no. ${document.querySelector('#mrefid').innerHTML} on ${new Date()}`, dateofassign: "20/02/2023" }
        await feature.addNewItemToNp(param, e, 'all-emp', ['ndeal_id', 'category_id'], 'apiv1/add-employee-to-miscproject', hidePopup, exdataM)
    }

}

async function removeEmpNp(data, type) {
    const dataSet = data.dataset;
    const date = new Date().toLocaleDateString()
    if (type === 'normal') {
        const title = `You have been removed from a project with ref no. ${document.querySelector('#refid').innerHTML} on ${new Date()}`
        await feature.DEL_UPD(`apiv1/removeempnp?dealId=${Number(dataSet.ndealid)}&catId=${Number(dataSet.catid)}&emid=${Number(dataSet.emid)}&title=${title}&removeDate=${date}`, 'DELETE');
    } else {
        const title = `You have been removed from a Miscellaneous project with ref no. ${document.querySelector('#mrefid').innerHTML} on ${new Date()}`
        await feature.DEL_UPD(`apiv1/remove-emp-miscp?mdeal_id=${Number(dataSet.ndealid)}&mstask_id=${Number(dataSet.catid)}&mpemid=${Number(dataSet.emid)}&title=${title}&dateofremove=${date}`, 'DELETE');
    }
}

async function addTaskStatus(target, type, route) {
    let body = null;
    const dataSet = target.parentNode.dataset
    if (type === 'normal') {
        body = { status: target.value, dealId: Number(dataSet.ndealid), catId: Number(dataSet.taskid) }
    } else {
        body = { mstask_status: target.value, mdeal_id: Number(dataSet.ndealid), mstask_id: Number(dataSet.taskid), dateofstatus: "28/03/2033", }
    }
    await feature.DEL_UPD(route, "PUT", body)
}

async function updateSubtaskStatus(data) {
    alert("Do you want to Update???")
    const { taskid, ndealid } = data.parentNode.dataset
    let status = null;
    if (data.checked) {
        status = "completed"
    } else { status = "not  started" }
    const body = { status: status, catId: taskid, dealId: ndealid, staskId: data.dataset.subtaskid }
    await feature.DEL_UPD('apiv1/update-subtask-status', 'PUT', body)
}

async function getProjectsStatus() {
    let pageChecker = location.pathname.match('/m')
    pageChecker == null ? EndPoint = 'ngetProjectStatus' : EndPoint = 'mgetProjectStatus'
    let [completed, pending] = [0, 0]
    let project_status_ctn = document.getElementsByClassName('total_user_data')
    try {
        let e = await feature.GET_POST(`apiv1/${EndPoint}`, 'GET');
        e.data.forEach(e => { e.project_status == 'completed' ? completed++ : pending++; });
    } catch (err) { console.error('Error project status:', err); }
}
setTimeout(() => { getProjectsStatus() }, 1500)

async function CheckDeadline() {
    let ctn = document.getElementsByClassName('data-info')
    var crDate = new Date();
    var [y, m, d] = [crDate.getFullYear(), (crDate.getMonth() + 1).toString().padStart(2, '0'), crDate.getDate().toString().padStart(2, '0')]
    let today = new Date(`${y}/${m}/${d}`)
    let upcDate = new Date(today.valueOf() + 24 * 60 * 60 * 1000 * 10)
    // let upcDate = new Date('2024/03/05')
    for (const e of ctn) {
        let status = e.querySelector('.status').innerText
        let date = date_Split(document.querySelector('#dead').innerText, '/', false).replaceAll('-', '/')
        NewDate = new Date(`20${date}`)
        if (status == 'pending' && NewDate.getTime() === upcDate.getTime()) {
            data = {
                id: 0, date: `${d}/${m}/${y}`,
                title: `Project of ${e.querySelector('#clientId').innerText} with Ref No.${e.querySelector('#refid').innerText} is near to it's Deadline. Please collect payment from him`,
            }
            await ReqHandler.POST(location.origin + '/apiv1/set-notifi', data).then(res => {
                console.log(res);
            })
        } else { console.log('No work has close to Deadline'); }
    }
}
CheckDeadline()
async function DeleteProject(e, o) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
    }).then(async (pers) => {
        if (pers.isConfirmed) {
            await ReqHandler.GET(location.origin + '/apiv1/delete-project/' + o).then(res => {
                if (res.status) { e.parentElement.parentElement.remove(); }
            })
        }
    });
}
async function DeleteMiscProject(e, o) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
    }).then(async (pers) => {
        if (pers.isConfirmed) {
            await ReqHandler.GET(location.origin + '/apiv1/delete-project/misc/' + o).then(res => {
                if (res.status) { e.parentElement.parentElement.remove(); }
            })
        }
    });
}
function SearchFromInput() {
    let query = document.getElementById('searchData').value
    location.href = location.href + `&search=${query}`

}