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


// ACCORDION
document.querySelectorAll(`.accordion-content`).forEach((item, index) => {
    let header = item.querySelector(".ahead");
    header.addEventListener("click", () => {
        item.classList.toggle("open");
        let description = item.querySelector(".adata");
        let darr = item.querySelector(`.arrow-down`);
        if (item.classList.contains("open")) {
            // description.style.height = `${description.scrollHeight}px`;
            description.classList.add(`open`);
            darr.classList.add(`open`);

        } else {
            // description.style.height = "0px";
            description.classList.remove(`open`);
            darr.classList.remove(`open`);
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
            let arr = item2.querySelector(`.arrow-down`);
            arr.classList.remove(`open`);
        }
    })
}

// EMPLOYEE ACCORDION
document.querySelectorAll(`.assign-to`).forEach((item, index) => {
    let header = item.querySelector(".eaccordion");
    header.addEventListener("click", () => {
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
        removeEmp(index);
    })
})
function removeEmp(index) {
    document.querySelectorAll(`.assign-to`).forEach((item2, index2) => {
        if (index != index2) {
            item2.classList.remove("open");
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
    listItems.forEach(listItem => {
        listItem.addEventListener('click', (e) => {
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
function empPopup() {
    document.querySelector(`.emp-drop-menu`).classList.toggle(`active`);
}
function empRemove() {
    document.querySelector(`.emp-drop-menu`).classList.remove(`active`);
}
function subPopup() {
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


function closeAlert() {
    document.querySelector(`.status`).style.display = `none`;
}
function openProfile() {
    document.querySelector(`.profile-log-out`).classList.toggle(`hide`);
}


