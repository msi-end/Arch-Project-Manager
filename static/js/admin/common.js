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


    function useraction(){
        userform.classList.add(`hide`);
    }

    function empAdd() {
        const userform= document.querySelector(`.userform`); 
        userform.classList.toggle(`hide`);
    }


function hideMainDropdown(event) {
  const mainDropdown = event.target.closest(".main-dropdown");
  if (mainDropdown) {
    if (!mainDropdown.contains(event.target)) {
      mainDropdown.style.display = "none";
    }
  }
}

function paginationFun(target) {
   if(target.id) {
    document.getElementById('2num').style.display = "none"
    document.querySelectorAll('.pagin').forEach((el)=>{
      el.style.display =  `flex`
    })
    const pageNo = Number(target.innerHTML);
    const lastPageNo = Number(document.getElementById('last-box').innerHTML)
    if (pageNo + 1 < lastPageNo && pageNo - 1 > 2) {
      document.getElementById('f-box').innerHTML = pageNo - 1  
      document.getElementById('m-box').innerHTML = pageNo
      document.getElementById('l-box').innerHTML = pageNo + 1 
    }
   

   } 
}

const mainDropdowns = document.querySelectorAll(".main-dropdown");
mainDropdowns.forEach(dropdown => {
  dropdown.addEventListener("click", hideMainDropdown);
});
function date_Split(val, p, t) { let [d, m, y] = val.split(p); return t ? `${y}/${m}/${d}` : `${y}-${m}-${d}` }
