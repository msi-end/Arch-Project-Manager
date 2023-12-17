




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