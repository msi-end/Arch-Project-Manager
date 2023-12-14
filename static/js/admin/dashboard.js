// ACCORDION
document.querySelectorAll(`.accordion-content`).forEach((item, index) =>{
    let header = item.querySelector(".ahead");
    console.log(header);
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
    header.addEventListener("click", () => {
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
        removeEmp(index);
    })
})
function removeEmp(index){
    document.querySelectorAll(`.assign-to`).forEach((item2, index2) => {
        if (index != index2) {
            item2.classList.remove ("open");
            let des = item2.querySelector(".eaccordion");
            des.classList.remove(`open`);
        }
    })
}
// STATUS DROPDOWN


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


//EMPLOYEE LISTS AND SUBTASKS
function empPopup(){
    document.querySelector(`.emp-drop-menu`).classList.toggle(`active`);   
}
function empRemove(){
    document.querySelector(`.emp-drop-menu`).classList.remove(`active`);   
}
function subPopup(){
    document.querySelector(`.task-drop-menu`).classList.toggle(`active`);
}


function toggleDiv(divId) {
    const divs = document.querySelectorAll('.dropdown-box');
    divs.forEach(div => {
      if (div.id === divId) {
        div.classList.remove('hide');
      } else {
        div.classList.add('hide');
      }
    });
  }


function closeAlert(){
    document.querySelector(`.status`).style.display = `none`;
}