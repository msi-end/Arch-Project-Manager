
function AlertNotifier(status, msg, icon) {
    Swal.fire({ title: status ? 'Sucess' : 'Error', text: msg, icon: icon, confirmButtonText: 'Done' });
}

// ReqHandler Data  
let BASE_URL = location.href;
let ReqURI = { addMiscTask: BASE_URL + `/set-misc-task`, subTask: BASE_URL + `/set-subtask`,splitRatio:BASE_URL+ '/set-amountsplit' }

// User Requestes To API
let ReqHandler = {
    GET: async function (url) {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        });
        return response.json();
    }, POST: async function (url, data) {
        console.log(url,data);
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data)
        });
        return response.json();
    }, PUT: async function (url, data) {
        console.log(JSON.stringify(data));
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data)
        });
        return response.json();
    }, DEL: async function (url) {
        const response = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        });
        return response.json();
    }
}

function addMiscTask() {
    let inputValue = document.getElementById('miscel-task');
    let mainCtn = document.getElementById('0')
    let taskCtn = mainCtn.getElementsByClassName('btasks')[0]
    ReqHandler.POST(ReqURI.addMiscTask, { miscTask: inputValue.value })
        .then((res) => {
            console.log(res);
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
    ReqHandler.POST(ReqURI.subTask, { subTask : inputValue.value })
        .then((res) => {
            console.log(res);
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
function addSplitRatio() {
    let inputValue = document.getElementById('split-ratio');
    let mainCtn = document.getElementById('2')
    let taskCtn = mainCtn.getElementsByClassName('btasks')[0]
    ReqHandler.POST(ReqURI.splitRatio, { splitValue : inputValue.value })
        .then((res) => {
            console.log(res);
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
function updateMisctask() {
    let inputValue = document.getElementById('miscel-task');
    let mainCtn = document.getElementById('0')
    let taskCtn = mainCtn.getElementsByClassName('btasks')[0]
    ReqHandler.POST(ReqURI.addMiscTask, { miscTask: inputValue.value })
        .then((res) => {
            console.log(res);
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

function updateSubTask() {
    let inputValue = document.getElementById('sub-task');
    let mainCtn = document.getElementById('1')
    let taskCtn = mainCtn.getElementsByClassName('btasks')[0]
    ReqHandler.POST(ReqURI.subTask, { subTask : inputValue.value })
        .then((res) => {
            console.log(res);
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
function updateSplitRatio() {
    let inputValue = document.getElementById('split-ratio');
    let mainCtn = document.getElementById('2')
    let taskCtn = mainCtn.getElementsByClassName('btasks')[0]
    ReqHandler.POST(ReqURI.splitRatio, { splitValue : inputValue.value })
        .then((res) => {
            console.log(res);
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

