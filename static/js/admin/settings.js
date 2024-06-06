
function AlertNotifier(status, msg, icon) {
    Swal.fire({ title: status ? 'Sucess' : 'Error', text: msg, icon: icon, confirmButtonText: 'Done' });
}
// ReqHandler Data  
let ReqURI = { addMiscTask: BASE_URL + `/set-misc-task`, updMiscTask: BASE_URL + `/upt-misc-task/`, subTask: BASE_URL + `/set-subtask`, updSubTask: BASE_URL + `/upt-subtask/`, splitRatio: BASE_URL + '/set-amountsplit', updSplitRatio: BASE_URL + '/upt-amountsplit/' }

function addMiscTask() {
    let inputValue = document.getElementById('miscel-task');
    let mainCtn = document.getElementById('0')
    let taskCtn = mainCtn.getElementsByClassName('btasks')[0]
    ReqHandler.POST(ReqURI.addMiscTask, { miscTask: inputValue.value })
        .then((res) => {
            if (res.status == true) {
                AlertNotifier(res.status, res.msg, 'success');
                let elm = mainCtn.getElementsByClassName('listContainer')[0]
                let html = elm.outerHTML
                let changedHtml = html.replace(elm.getElementsByClassName('ttext')[0].innerHTML, inputValue.value);
                taskCtn.innerHTML += changedHtml;
                inputValue.value = '';
            } else {
                AlertNotifier(res.status, res.msg, 'error');
            }
        }).catch(err => {
            console.log('Error(fn-addTask):', err);
        })
}
function addSubTask() {
    let inputValue = document.getElementById('sub-task');
    let mainCtn = document.getElementById('1')
    let taskCtn = mainCtn.getElementsByClassName('btasks')[0]
    ReqHandler.POST(ReqURI.subTask, { subTask: inputValue.value })
        .then((res) => {
            if (res.status == true) {
                AlertNotifier(res.status, res.msg, 'success');
                let elm = mainCtn.getElementsByClassName('listContainer')[0]
                let html = elm.outerHTML
                let changedHtml = html.replace(elm.getElementsByClassName('ttext')[0].innerHTML, inputValue.value);
                taskCtn.innerHTML += changedHtml;
                inputValue.value = '';
            } else {
                AlertNotifier(res.status, res.msg, 'error');
            }
        }).catch(err => {
            console.log('Error(fn-addTask):', err);
        })
}

function verifyRatio(value) {
    const vals = value.value.split(':')
    if (vals.length === 3) {
        const sum = vals.reduce((acc, el) => Number(acc) + Number(el))
        if (sum === 10) { return true
        } else { return false }    
    } else {
        return false;
    }
    
}
function addSplitRatio() {
    let inputValue = document.getElementById('split-ratio');
    let mainCtn = document.getElementById('2')
    let taskCtn = mainCtn.getElementsByClassName('btasks')[0]
    const verification = verifyRatio(inputValue)
    if (verification) {
        ReqHandler.POST(ReqURI.splitRatio, { splitValue: inputValue.value })
        .then((res) => {
            if (res.status == true) {
                AlertNotifier(res.status, res.msg, 'success');
                let elm = mainCtn.getElementsByClassName('listContainer')[0]
                let html = elm.outerHTML
                let changedHtml = html.replace(elm.getElementsByClassName('ttext')[0].innerHTML, inputValue.value);
                taskCtn.innerHTML += changedHtml;
                inputValue.value = '';
            } else {
                AlertNotifier(res.status, res.msg, 'error');
            }
        }).catch(err => {
            console.log('Error(fn-addTask):', err);
        })
    } else {
        alert("Ratio Must have 3 value & Sum Must be 10")
    }
  
}
function updateMisctask(elmId, val) {
    let inputValue = document.getElementById('updated_val');
    let mainCtn = document.getElementById('0')
    let taskCtn = mainCtn.getElementsByClassName('btasks')[0]
    ReqHandler.PUT(ReqURI.updMiscTask + elmId, { miscTask: inputValue.value })
        .then((res) => {
            if (res.status == true) {
                AlertNotifier(res.status, res.msg, 'success');
                let elm = mainCtn.querySelector(`[data-elmId="${elmId}"]`)
                console.log(elm);
                elm.getElementsByClassName('ttext')[0].innerHTML = inputValue.value;

            } else {
                AlertNotifier(res.status, res.msg, 'error');
            }
        }).catch(err => {
            console.log('Error(fn-addTask):', err);
        })
}

function updateSubTask(elmId, val) {
    let inputValue = document.getElementById('updated_val');
    let mainCtn = document.getElementById('1')
    let taskCtn = mainCtn.getElementsByClassName('btasks')[0]
    ReqHandler.PUT(ReqURI.updSubTask + elmId, { subTask: inputValue.value })
        .then((res) => {
            if (res.status == true) {
                AlertNotifier(res.status, res.msg, 'success');
                let elm = mainCtn.querySelector(`[data-elmId="${elmId}"]`)
                console.log(elm);
                elm.getElementsByClassName('ttext')[0].innerHTML = inputValue.value;

            } else {
                AlertNotifier(res.status, res.msg, 'error');
            }
        }).catch(err => {
            console.log('Error(fn-addTask):', err);
        })
}
function updateSplitRatio(elmId, val) {
    let inputValue = document.getElementById('updated_val');
    let mainCtn = document.getElementById('2')
    let taskCtn = mainCtn.getElementsByClassName('btasks')[0]
    ReqHandler.PUT(ReqURI.updSplitRatio + elmId, { splitValue: inputValue.value })
        .then((res) => {
            if (res.status == true) {
                AlertNotifier(res.status, res.msg, 'success');
                let elm = mainCtn.querySelector(`[data-elmId="${elmId}"]`)
                console.log(elm);
                elm.getElementsByClassName('ttext')[0].innerHTML = inputValue.value;

            } else {
                AlertNotifier(res.status, res.msg, 'error');
            }
        }).catch(err => {
            console.log('Error(fn-addTask):', err);
        })
}
function ModelOpen(e, fn) {
    let ElmId = e.parentElement.dataset.elmid
    let value = (e.parentElement).getElementsByClassName('ttext')[0].innerText;
    let MdlCtn = document.getElementsByClassName('modal')[0]
    let title = MdlCtn.getElementsByTagName('h3')[0]
    MdlCtn.children[0].children[1].children[0].value = value
    MdlCtn.classList.remove('hide')
    if (fn == 0) {
        title.innerHTML = 'Miscellaneous Task Update';
        MdlCtn.children[0].children[2].children[0].setAttribute('onclick', `updateMisctask(${ElmId},'${value}',)`)
    } else if (fn == 1) {
        title.innerHTML = 'Subtask Task Update';
        MdlCtn.children[0].children[2].children[0].setAttribute('onclick', `updateSubTask(${ElmId},'${value}')`)
    } else {
        title.innerHTML = 'Split Ratio Update';
        MdlCtn.children[0].children[2].children[0].setAttribute('onclick', `updateSplitRatio(${ElmId},'${value}')`)
    }
}
function ModelClose() {
    let MdlCtn = document.getElementsByClassName('modal')[0]
    MdlCtn.classList.add('hide')
}