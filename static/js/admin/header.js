let itemNames = document.querySelectorAll(`.nav-lists ul a span`);
let Icons = document.querySelectorAll(`.nav-lists ul a`);
let namue = document.querySelectorAll(`.namue`);
let nav = document.querySelector(`nav`);
let aside = document.querySelector(`aside`);
let ham = document.querySelector(`#ham`);
(()=>{
    let pageCtn=document.querySelector('.nav-lists')
   let pageDataList= pageCtn.getElementsByTagName('a')
   let activeElm=document.querySelector('.main')
   for (const e of pageDataList) {
    if(activeElm.dataset.appPage==e.dataset.appPage)   {
    e.classList.add('active')}
   }
})()

activate();
function activate(){
    Icons.forEach(function(icon){
        icon.addEventListener('click', ()=>{
            Icons.forEach(function(otherIcon){
                if(otherIcon !== icon){
                    otherIcon.classList.remove(`active`);
                }
            });
            icon.classList.toggle(`active`);
        });
    });
}

// HMABURGER
if(window.innerWidth < 980){
    aside.onclick = function(){
        aside.style.display = `none`;
    }
    ham.addEventListener("click", ()=>{
        aside.style.display = `block`;
        document.querySelector(`#thead`).style.opacity = `1`;
    })   
}
else{
    aside.style.display= `block`;
    ham.addEventListener("click", ()=>{
        document.querySelector(`#thead`).style.opacity = `1`;
        itemNames.forEach(item => {
            item.classList.toggle(`hide`);
        });
        activate();
        namue.forEach(nae=>{
            nae.classList.toggle(`hide`);
        })
        nav.classList.toggle(`width`);
        document.querySelector(`.main`).classList.toggle(`width`);
    })
}

//Search Icon

if(window.innerWidth < 780){
    function searchIcon(){
        document.querySelector(`.search`).style.display = 'block';
        document.querySelector(`.searchIcon`).style.display = `none`;  
    }
    document.querySelector(`.close`).onclick = function(){
        document.querySelector(`.search`).style.display = 'none';    
        document.querySelector(`.searchIcon`).style.display = `block`;   
    }
}


function openProfile(){
    document.querySelector(`.account-settings`).classList.toggle(`hide`);
}
function openNotification(){
    document.querySelector(`.notification-list`).classList.toggle(`hide`);
    document.querySelector(`.notification`).classList.toggle(`active`);
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

function clearInput() {
    document.querySelector(`#searchQuery`).value= "";
    search()
}