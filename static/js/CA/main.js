let itemNames = document.querySelectorAll(`.nav-lists ul a span`);
let Icons = document.querySelectorAll(`.nav-lists ul a`);
let namue = document.querySelectorAll(`.namue`);
let nav = document.querySelector(`nav`);
let aside = document.querySelector(`aside`);
let ham = document.querySelector(`#ham`);


activate();
function activate() {
    Icons.forEach(function (icon) {
        icon.addEventListener('click', () => {
            Icons.forEach(function (otherIcon) {
                if (otherIcon !== icon) {
                    otherIcon.classList.remove(`active`);
                }
            });
            icon.classList.toggle(`active`);
        });
    });
}

// HMABURGER
if (window.innerWidth < 930) {
    aside.onclick = function () {
        aside.style.display = `none`;
    }
    ham.addEventListener("click", () => {
        aside.style.display = `block`;
        document.querySelector(`#thead`).style.opacity = `1`;
    })
}
else {
    aside.style.display = `block`;
    ham.addEventListener("click", () => {
        document.querySelector(`#thead`).style.opacity = `1`;
        itemNames.forEach(item => {
            item.classList.toggle(`hide`);
        });
        activate();
        namue.forEach(nae => {
            nae.classList.toggle(`hide`);
        })
        nav.classList.toggle(`width`);
        document.querySelector(`.main`).classList.toggle(`width`);
    })
}

//Search Icon

if (window.innerWidth < 780) {
    function searchIcon() {
        document.querySelector(`.search`).style.display = 'block';
        document.querySelector(`.searchIcon`).style.display = `none`;
    }
    document.querySelector(`.close`).onclick = function () {
        document.querySelector(`.search`).style.display = 'none';
        document.querySelector(`.searchIcon`).style.display = `block`;
    }
}


//ACCORDION

document.querySelectorAll(`.accordion-content`).forEach((item, index) => {
    let header = item.querySelector(".ahead");
    header.addEventListener("click", () => {
        item.classList.toggle("open");
        let description = item.querySelector(".adata");
        if (item.classList.contains("open")) {
            // description.style.height = `${description.scrollHeight}px`;
            description.classList.add(`open`);
            document.querySelector(".arrow-down").classList.add(`open`);

        } else {
            // description.style.height = "0px";
            description.classList.remove(`open`);
            document.querySelector(".arrow-down").classList.remove(`open`);
        }
        removeOpen(index);
    })
})
function removeOpen(index1) {
    document.querySelectorAll(`.accordion-content`).forEach((item2, index2) => {
        if (index1 != index2) {
            item2.classList.remove("open");
            let des = item2.querySelector(".adata");
            des.classList.remove(`open`);
        }
    })
}
// CLOSE ALERT WINDOW 
function closeAlert() {
    document.querySelector(`.status`).style.display = `none`;
}

function openNotification() {
    document.querySelector(`.notification-list`).classList.toggle(`hide`);
    document.querySelector(`.notification`).classList.toggle(`active`);
}
function openProfile(){
    document.querySelector(`.account-settings`).classList.toggle(`hide`);
}

// Requester Handler 
class DataCall {
    urlHead = location.origin;
    GET_POST = async (url, method, body, type) => {
        if (method == 'GET') {
            try {
                const fet = await fetch(this.urlHead + url, { method: method })
                const res = await fet.json()
                return res;
            } catch (error) {
                throw new Error('request not proceed !' + error.message)
            }
        } else if (method == 'POST' && body != undefined && type === undefined) {
            try {
                const fet = await fetch(this.urlHead + url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                })
                const res = await fet.json()
                if (fet.ok) { this.GET_Notify('Successfully Done', 'Successfull', 'success') }
                return res;
            } catch (err) {
                throw new Error('request not proceed !' + err.message)
            }
        } else if (type && type == 'form' && body != undefined) {
            try {
                const payload = new URLSearchParams(body);
                const fet = await fetch(this.urlHead + url, {
                    method: method,
                    body: payload
                })
                const res = await fet.json()
                if (fet.ok) { this.GET_Notify('Successfully Done', 'Successfull', 'success') }
                return res;
            } catch (err) {
                throw new Error('request not proceed !' + err.message)
            }
        } else {
            this.GET_Notify('Something Error', 'Invalid Request!', 'error')
            throw new Error('Invalid request !')
        }

    }
}
const feature = new DataCall()
document.querySelectorAll(`.assign-to`).forEach((item, index) => {
    let header = item.querySelector(".eaccordion");
    header.addEventListener("click", async () => {
        console.log(item.dataset)
        const renderId = item.querySelector('#emp-in-np')
        renderId.innerHTML = ''
        const empNp = await feature.GET_POST(`/apiv1/employee/${item.dataset.ndealid}/${item.dataset.taskid}`, 'GET');
        empNp.forEach((item) => {
            const html = `<li class="add-empl"><span>${item.name}</span> <span class="icon" data-ndealid=${item.ndeal_id} data-catid=${item.category_id} data-emid=${item.em_id} ></span></li>`
            renderId.innerHTML += html
        })
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
async function ChangeExpsByMonths(e) {
    let dataCtn =document.querySelector('.expense-page')
    let Elm =document.querySelector('.expense-list')
    let m = e.querySelector('#ExpsMonth').value
    let y = e.querySelector('#ExpsYear').value
  let  res =await feature.GET_POST('/ca/getExps' + `?m=${m}&y=${y}`,'GET')
        .then((res) => { dataCtn.innerHTML='';
            if (res.status) { (res.data).forEach(e => {
               let html =`<div class="expense-list flex" data-e_id="${e.id}"> <div class="expense-ref"><p class="uppercase exp-ref">Ref. no.</p>
                   <p class="exp-refn"> ${e.id} </p></div>
               <!-- -------------------  -->
               <div class="expense-name"> <p class="uppercase exp-name">expense name</p><p class="exp-name-data">${e.title }</p> </div>
               <!-- ----------------------------------  -->
               <div class="expense-amount"><p class="uppercase exp-amo">Amount</p><p class="exp-amo-data">&#8377; <span class="exp-amount-data">${e.amount } </span></p> </div>
               <!-- ----------------------------------  -->
               <div class="expense-date"><p class="uppercase exp-date">date</p><p class="exp-date-data">${e.date }</p> </div>
               <!-- ----------------------------------  -->
               <div class="expense-mode"> <p class="uppercase exp-mode">mode of payment</p> <p class="exp-mode-data"> ${e.md_type } </p> </div>
               <!-- ---------------------------------  -->
               <div class="expense-remarks"> <p class="uppercase exp-rem">remarks</p> <p class="exp-rem-content"> ${e.remark }</p></div>
               <!-- ---------------------------------  -->
               <div class="expense-edit"><a class="eicon" onclick="Opn_ExpenseCtn('.editexpense',this)"></a> <span class="edit">Edit</span></div> </div>`
                dataCtn.innerHTML+=html});
            } else {AlertNotifier(res.status, res.msg, 'error');}
        }).catch(err => {console.log('Error(fn-ExpsUpdate):', err);})
}

let darkMode = localStorage.getItem("mode");
const toggle = document.querySelector(`.theme-toggler`);

const enableDarkMode = () =>{
    document.body.classList.add(`dark`);
    document.querySelector(`#sun`).classList.remove(`hide`)
    document.querySelector(`#moon`).classList.add(`hide`);
    localStorage.setItem("mode", "dark")
}
const disableDarkMode = () =>{
    document.body.classList.remove(`dark`);
    document.querySelector(`#sun`).classList.add(`hide`);
    document.querySelector(`#moon`).classList.remove(`hide`);
    localStorage.setItem("mode", null)
}
if(darkMode ==="dark"){
    enableDarkMode();
}
toggle.addEventListener("click", () =>{
    darkMode = localStorage.getItem("mode");
    if(darkMode !== "dark"){
        enableDarkMode()
        console.log(darkMode);
    }else{
        disableDarkMode()
        console.log(darkMode);

    }
})