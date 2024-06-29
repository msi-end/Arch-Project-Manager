const feature = new DataCall()
// EMPLOYEE ACCORDION
document.querySelectorAll(`.assign-to`).forEach((item, index) => {
    let header = item.querySelector(".eaccordion");
    header.addEventListener("click", async () => {
        const renderId = item.querySelector('#emp-in-np')
        renderId.innerHTML = ''
        if (item.classList.contains("open") != true) {
            if (item.dataset.taskid) {
                const empNp = await feature.GET_POST(`apiv1/employee/${item.dataset.ndealid}/${item.dataset.taskid}`, 'GET');
                empNp.forEach((item) => {
                    const html = `<li class="add-empl"><span>${item.name}</span> <span class="icon" data-ndealid=${item.ndeal_id} data-catid=${item.category_id} data-emid=${item.em_id} onclick="removeEmpNp(this, 'normal')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="minus-circle" class="svg"><path fill="##000000" d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Zm4-9H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z"></path></svg></span></li>`
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
    if (param.dataset.npcid != 'false') {
        const exdata = { title: `You have been assigned to a new project with ref no. ${document.querySelector('#refid').innerHTML} on ${new Date()}`, assignDate: "20/02/2023" }
        await feature.addNewItemToNp(param, e, 'all-emp', ['ndeal_id', 'category_id', 'npcid'], 'apiv1/add-employee-to-project', closeSubBox, exdata)
    } else {
        const exdataM = { title: `You have been assigned to a new Miscallaneous project with ref no. ${document.querySelector('#mrefid').innerHTML} on ${new Date()}`, dateofassign: "20/02/2023" }
        await feature.addNewItemToNp(param, e, 'all-emp', ['ndeal_id', 'category_id'], 'apiv1/add-employee-to-miscproject', closeSubBox, exdataM)
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
    if (target.value == 'completed') {
        target.classList.remove('blue', 'red')
        target.classList.add('green')
    } else if (target.value == 'On Progress') {
        target.classList.remove('green', 'red')
        target.classList.add('blue')
    }else if (target.value == 'Not Started') {
        target.classList.remove('blue', 'green')
        target.classList.add('red')
    } 

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
        project_status_ctn[0].children[0].innerText = e.data.length;
        project_status_ctn[1].children[0].innerText = completed;
        project_status_ctn[2].children[0].innerText = pending;
    } catch (err) { console.error('Error project status:', err); }
}
setTimeout(() => { getProjectsStatus() }, 1500)
async function CheckDeadline() {
    let ctn = document.getElementsByClassName('ahead')
    var crDate = new Date();
    var [y, m, d] = [crDate.getFullYear(), (crDate.getMonth() + 1).toString().padStart(2, '0'), crDate.getDate().toString().padStart(2, '0')]
    let today = new Date(`${y}/${m}/${d}`)
    let upcDate = new Date(today.valueOf() + 24 * 60 * 60 * 1000 * 10)
    // let upcDate = new Date('2024/03/05')
    for (const e of ctn) {
        let status = e.querySelector('.stat').innerText
        let date = date_Split(e.querySelector('.emp_date').innerText, '/', false).replaceAll('-', '/')
        NewDate = new Date(`20${date}`)
        if (status == 'pending' && NewDate.getTime() === upcDate.getTime()) {
            data = {
                id: 0, date: `${d}/${m}/${y}`,
                title: `Project With Refno.${e.querySelector('.ref').children[1].innerText} ,Name:${e.querySelector('.pro').children[1].innerText} is near to it's Deadline.`,
            }
            await ReqHandler.POST(location.origin + '/apiv1/set-notifi', data).then(res => {
                console.log(res);
            })
        } else { console.log('No work has close to Deadline'); }
    }
}
function search() {
    var inpValue = document.getElementById('searchQuery').value.toLowerCase();
    var elmCtn = document.querySelectorAll('.accordion-content');
    elmCtn.forEach(function (e) {
        var contentText = e.textContent.toLowerCase();
        if (contentText.includes(inpValue)) {
            e.style.display = 'block';
        } else { e.style.display = 'none'; }
    });
}
CheckDeadline()


async function DeleteProject(e,o) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (pers) => {
        if (pers.isConfirmed) {
            await ReqHandler.GET(location.origin + '/apiv1/delete-project/'+o).then(res => {
               if (res.status) {e.parentElement.parentElement.parentElement.remove();}
            })
        }
    });
}



