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
        console.log(item.dataset)
        const renderId = item.querySelector('#emp-in-np')
        renderId.innerHTML = ''
        const empNp = await feature.GET_POST(`apiv1/employee/${item.dataset.ndealid}/${item.dataset.taskid}`, 'GET');
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

addNewSubtasks = async (param, e)=>{
  e.preventDefault();
  const target = param.dataset
  const addSubtaskNp = new FormData(document.getElementById('all-subtask'));
  console.log(target)
  addSubtaskNp.append('ndeal_id',  Number(target.ndeal_id));
  addSubtaskNp.append('category_id', Number(target.category_id));
  feature.GET_POST('apiv1/addsubtaskto-nproject', 'POST', addSubtaskNp, 'form')
  closeSubBox()
}


addNewEmp = async (param, e) => {
  const exdata = {taskName: "architechture", project: "Hospital Work", assignDate: "20/02/2023" }
  await feature.addNewItemToNp(param, e, 'all-emp', ['ndeal_id', 'category_id'], 'apiv1/add-employee-to-project', closeSubBox, exdata)
}



