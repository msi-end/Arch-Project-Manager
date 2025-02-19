// ReqHandler Data  
let ReqURI = { addMiscTask: BASE_URL + `/set-misc-task`, updMiscTask: BASE_URL + `/upt-misc-task/`, subTask: BASE_URL + `/set-subtask`, updSubTask: BASE_URL + `/upt-subtask/`, splitRatio: BASE_URL + '/set-amountsplit', updSplitRatio: BASE_URL + '/upt-amountsplit/' }


function hidePopup(event) {
    document.querySelector(".main-popup").classList.add('hide');
}

function AlertNotifier(status, msg, icon) {
    Swal.fire({ title: status ? 'Success' : 'Error', text: msg, icon: icon, confirmButtonText: 'Done' });
}

//ADD MISCELLANEOUS TASK
function addMiscTask() {
    let inputValue = document.getElementById('miscel-task');
    let mainCtn = document.getElementById('0');
    let taskCtn = mainCtn.querySelector(`ul li span.flex-1`);

    ReqHandler.POST(ReqURI.addMiscTask, { miscTask: inputValue.value })
        .then((res) => {
            if (res.status == true && inputValue.value != null) {
                AlertNotifier(res.status, res.msg, 'success');
                taskCtn.textContent = inputValue.value;
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
            else {
                AlertNotifier(res.status, res.msg, 'error');
            }
        });
}

//OPEN MISCELLANEOUS TASK POPUP
function editMiscTask(e) {
    const maindrop = document.querySelector('.main-popup');
    maindrop.classList.remove('hide');
    maindrop.innerHTML = ""
    maindrop.innerHTML = `
        <div class="misc-task blur hide">
    <form action="" class="form">
        <h2>Update Miscellaneous Task</h2>
        <div class="field">
            <p class="title">Task Name</p>
            <input type="text" id="upd-misc-task">
        </div>
        <div class="action-btn flex align-center">
            <button class="flex-1" onclick="updMiscTask()">Update</button>
            <button class="flex-1 delete" onclick="hidePopup(this)">Cancel</button>
        </div>
    </form>
</div>`
const dropDownTarget = document.querySelector('.misc-task');
dropDownTarget.classList.toggle('hide');  
let MId = document.getElementById(`0`);
if(e == `.misc-task`){
    dropDownTarget.querySelector(`#upd-misc-task`).value =
    MId.querySelector(`ul li span.flex-1`).textContent;
} 
}

//UPDATE MISCELLANEOUS TASK
function updMiscTask() {
    let inputValue = document.getElementById('upd-misc-task');
    let mainCtn = document.getElementById('0');
    let taskCtn = mainCtn.querySelector(`ul li span.flex-1`);
    let id = mainCtn.querySelector(`ul li`).dataset.id;

    ReqHandler.PUT(ReqURI.updMiscTask + id, { miscTask: inputValue.value })
        .then((res) => {
            if (res.status == true) {
                AlertNotifier(res.status, res.msg, 'success');
                taskCtn.textContent = inputValue.value;
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
            else {
                AlertNotifier(res.status, res.msg, 'error');
            }
        });
}

//ADD SUBTASK
function addSubTask() {
    let inputValue = document.getElementById('small-task');
    let mainCtn = document.getElementById('1');
    let taskCtn = mainCtn.querySelector(`ul li span.flex-1`);

    ReqHandler.POST(ReqURI.subTask, { subTask: inputValue.value })
        .then((res) => {
            if (res.status == true && inputValue.value != null) {
                AlertNotifier(res.status, res.msg, 'success');
                taskCtn.textContent = inputValue.value;
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
            else {
                AlertNotifier(res.status, res.msg, 'error');
            }
        });
}
//OPEN SUBTASK POPUP
function editSubTask(e) {
    const maindrop = document.querySelector('.main-popup');
    maindrop.classList.remove('hide');
    maindrop.innerHTML = ""
    maindrop.innerHTML = `
        <div class="small-task blur hide">
    <form action="" class="form">
        <h2>Update Sub Task</h2>
        <div class="field">
            <p class="title">Task Name</p>
            <input type="text" id="upd-sub-task">
        </div>
        <div class="action-btn flex align-center">
            <button class="flex-1" onclick="updSubTask()">Update</button>
            <button class="flex-1 delete" onclick="hidePopup(this)">Cancel</button>
        </div>
    </form>
</div>`
const dropDownTarget = document.querySelector('.small-task');
dropDownTarget.classList.toggle('hide');  
let SId = document.getElementById(`1`);
if(e == `.small-task`){
    dropDownTarget.querySelector(`#upd-sub-task`).value =
    SId.querySelector(`ul li span.flex-1`).textContent;
} 
}

//UPDATE SUBTASK
function updSubTask() {
    let inputValue = document.getElementById('upd-sub-task');
    console.log(inputValue);
    let mainCtn = document.getElementById('1');
    let taskCtn = mainCtn.querySelector(`ul li span.flex-1`);
    let id = mainCtn.querySelector(`ul li`).dataset.id;

    ReqHandler.PUT(ReqURI.updSubTask + id, { subTask: inputValue.value })
        .then((res) => {
            if (res.status == true) {
                AlertNotifier(res.status, res.msg, 'success');
                taskCtn.textContent = inputValue.value;
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
            else {
                AlertNotifier(res.status, res.msg, 'error');
            }
        });
}