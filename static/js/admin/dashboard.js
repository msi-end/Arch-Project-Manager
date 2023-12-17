const callApi = async (url, method, body) => {
    if (method == 'GET') {
        const fet = await fetch(url, {
            method: method
        })
        const res = await fet.json()
        return res;
    }else if (method == 'POST' && body != undefined) {
        const fet = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
        })
        const res = await fet.json()
        console.log(res) 
        return res;
    }else {
        throw new Error('Invalid request !')
    }
   
}


// ACCORDION
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
        const empNp = await callApi('http://localhost:3000/apiv1/employee/1/1', 'GET');
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
function empPopup(){
    document.querySelector(`.emp-drop-menu`).classList.toggle(`active`);  
}
function empRemove(){
    document.querySelector(`.emp-drop-menu`).classList.remove(`active`);   
}

function renderHTML(arr, targetId, htmlData) {
    const target = document.querySelector(`#${targetId}`)
    target.innerHTML = ''
    arr.forEach((item)=>{
        const html = htmlData
        target.innerHTML += html

    })
}

subPopup = async ()=> {
    const dropDownTarget = document.querySelector(`.task-drop-menu`)
    dropDownTarget.classList.toggle(`active`);
    const subtasks = await callApi('http://localhost:3000/admin/settings/get-subtask', 'GET')
    const renderTarget = dropDownTarget.querySelector('#subtasks-list')
    renderTarget.innerHTML = ''
    // subtasks.forEach((item)=>{
        const htmlD = `<li class="stasks" dataset-subtaskId = ${item.sub_task_id}>
        <input type="checkbox" name="electricity" id="">
        <span>${item.sub_task_name}</span>
    </li>`
    // renderTarget.innerHTML += html
    // })
    renderHTML(subtasks, 'subtasks-list', htmlD)
}


