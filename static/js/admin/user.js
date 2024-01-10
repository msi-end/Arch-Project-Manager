    let userform = document.querySelector(`.usform`);
    let uprofile = document.querySelector(`.uprofile-settings`);
    let userProfileSettings = document.querySelector(".user-profile-settings");
    let usUpdate = document.querySelector(".update");
    let usForm = document.querySelector(`.usform`);
    let userEdit = document.querySelector(`.user-edit`);
    
    //EDIT PROFILE
    userEdit.addEventListener("click", () => {
        uprofile.classList.remove(`hide`);
    })
    
    //UPDATE PROFILE
    usUpdate.addEventListener("click", () => {
        uprofile.classList.add(`hide`);
    })
    
    function addUser() {
        userform.classList.remove(`hide`);
    }
    function useraction() {
        userform.classList.add(`hide`);
    }
    
    function handleSettingsClick(event) {
        const clickedElement = event.target;
        if (clickedElement.classList === "uprofile-settings" || "usform") {
            clickedElement.classList.add(`hide`);
        }
    }
    userEdit.addEventListener("click", handleSettingsClick)
    uprofile.addEventListener("click", handleSettingsClick);
    usUpdate.addEventListener("click", handleSettingsClick);
    usForm.addEventListener("click", handleSettingsClick);


function AlertNotifier(status, msg, icon) {
    Swal.fire({ title: status ? 'Sucess' : 'Error', text: msg, icon: icon, confirmButtonText: 'Done' });
}

// ReqHandler Data  
let BASE_URL = location.href;
let ReqURI = { addMiscTask: BASE_URL + `/set-misc-task`, updMiscTask: BASE_URL + `/upt-misc-task/`, subTask: BASE_URL + `/set-subtask`, updSubTask: BASE_URL + `/upt-subtask/`, splitRatio: BASE_URL + '/set-amountsplit', updSplitRatio: BASE_URL + '/upt-amountsplit/' }

// User Requestes To API
let ReqHandler = {
    GET: async function (url) {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        });
        return response.json();
    }, POST: async function (url, data) {
        console.log(url, data);
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

