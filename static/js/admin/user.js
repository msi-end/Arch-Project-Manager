
let userform= document.querySelector(`.userform`);
    document.querySelector(`#userbtn`).addEventListener("click",()=>{
        userform.classList.toggle(`hide`);
    })
    function useraction(){
        userform.classList.add(`hide`);
    }