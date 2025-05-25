// ACTIVE NAVIGATION 
(() => {
    let pageCtn = document.querySelector('nav')
    let pageDataList = pageCtn.getElementsByTagName('a')
    let activeElm = document.querySelector('main')
    for (const e of pageDataList) {
        if (activeElm.dataset.appPage == e.dataset.appPage) {
            e.classList.add('active')
        }
    }
})()
// HAMBURGER
function hamburger() {
    let svg = document.querySelectorAll(`#ham svg`);
    svg.forEach((icon) => {
        if (icon.classList.contains('hide')) {
            icon.classList.remove('hide');
        } else {
            icon.classList.add('hide');
        }
    })
    document.querySelectorAll('ul li a span.nav-item').forEach(navItem => {
        navItem.classList.toggle('hide');
    })
    document.querySelectorAll('.nav-title').forEach((navTitle) => {
        navTitle.classList.toggle('hide');
    })
    document.querySelectorAll('nav ul li > a').forEach((tag) => {
        tag.classList.toggle(`circle`);
    })
    document.querySelector('#logo-title').classList.toggle(`hide`);
    document.querySelector('.log-out a span').classList.toggle(`hide`);
    document.querySelector('aside').classList.toggle(`width`);
    document.querySelector('main').classList.toggle(`width`);
}
//MOBILE ONLY DEVICES
function burger() {
    document.querySelector('#ham').classList.toggle('mobile');
    document.querySelector('#logo-title').classList.toggle('mobile');
    document.querySelector('aside').classList.toggle('mobile');
    document.querySelector('nav').classList.toggle('mobile');
    document.querySelector('.log-out a span').classList.toggle('mobile');

    document.querySelectorAll('ul li a span.nav-item').forEach(navItem => {
        navItem.classList.toggle('mobile');
    })
    document.querySelectorAll('.nav-title').forEach((navTitle) => {
        navTitle.classList.toggle('mobile');
    })
    document.querySelectorAll('nav ul li > a').forEach((tag) => {
        tag.classList.toggle(`mobile`);
    })
}
// FUNCTION USED 
if (window.innerWidth > 768) {
    document.querySelector(`#ham`).addEventListener("click", () => {
        hamburger()
    })
} else {
    document.querySelector(`#ham-mobile`).addEventListener("click", () => {
        burger()
    })
    document.querySelector(`#close-menu`).addEventListener("click", () => {
        burger()
    })
}


// OPEN DETAILS 
document.querySelectorAll('table tbody tr td span.icon').forEach((icon) => {
    let id = icon.parentElement.parentElement.children[0].dataset.dealid;
    icon.addEventListener("click", () => {
        document.querySelector('main .main-data').classList.add('hide')
        document.querySelector('main .more-data').classList.remove('hide')
        document.querySelector(`.more-data #more-data-${id}`).classList.remove('hide');
    })
})
// CLOSE DETAILS 
document.querySelectorAll('.close-more-data span.icon').forEach((icon) => {
    icon.addEventListener("click", () => {
        document.querySelector('main .main-data').classList.remove('hide')
        document.querySelector('main .more-data').classList.add('hide')
        document.querySelector(`.more-data #more-data-${icon.dataset.id}`).classList.add('hide');
    })
})
// SEARCH INPUT 
function search() {
    var inpValue = document.getElementById('searchQuery').value.toLowerCase();
    var elmCtn = document.querySelectorAll('tbody');
    elmCtn.forEach(function (e) {
        var contentText = e.textContent.toLowerCase();
        if (contentText.includes(inpValue)) {
            e.style.display = 'table-row-group';
        } else { e.style.display = 'none'; }
    });
}
function clearInput() {
    document.querySelector(`#searchQuery`).value = "";
    search()
}

// DARK MODE 
let darkMode = localStorage.getItem("mode");
const toggle = document.querySelector(`.theme-toggler`);

const enableDarkMode = () => {
    document.body.classList.add(`dark`);
    document.querySelector(`.sun`).classList.remove(`active`)
    document.querySelector(`.moon`).classList.add(`active`);
    localStorage.setItem("mode", "dark")
}
const disableDarkMode = () => {
    document.body.classList.remove(`dark`);
    document.querySelector(`.sun`).classList.add(`active`);
    document.querySelector(`.moon`).classList.remove(`active`);
    localStorage.setItem("mode", null)
}
if (darkMode === "dark") {
    enableDarkMode();
}
toggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("mode");
    if (darkMode !== "dark") {
        enableDarkMode()
    } else {
        disableDarkMode()
    }
})

// OPEN NOTIFICATION WINODW 
function openNotification() {
    document.querySelector(`.section-popup`).classList.toggle(`hide`);
}

function hideNotificationPopup() {
    document.querySelector(`.section-popup`).classList.toggle(`hide`);
}
//NOTIFICATION TOGGLE
function changeTab(Id) {
    const tabList = document.querySelectorAll(`.notification-type p`);
    const tabContent = document.querySelectorAll(`.notification-column > div`);
    tabContent.forEach(tab => {
        if (tab.id === Id) {
            tab.classList.remove('hide');
        } else {
            tab.classList.add('hide');
        }
    })
    tabList.forEach(tab => {
        if (tab.getAttribute('onclick').includes(Id)) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    })
}

//ANALYTICS TAB

function changeType(target) {
    let n = document.querySelectorAll(`.n`);
    let m = document.querySelectorAll(`.m`);
    if (target.value == "normal") {
        n.forEach(n => {
            n.classList.remove('hide');
        })
        m.forEach(m => {
            m.classList.add('hide');
        })
    }
    else if (target.value == "misc") {
        m.forEach(m => {
            m.classList.remove('hide');
        })
        n.forEach(n => {
            n.classList.add('hide');
        })
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const leftBtn = document.querySelector('#arrow-left').closest('.pagination-btn');
    const rightBtn = document.querySelector('#arrow-right').closest('.pagination-btn');

    const dataCp = document.getElementById(`dataCp`);
    let currentPage = Number(dataCp.dataset.currentPage) || 1;
    const totalPages = Number(dataCp.dataset.totalPages) || 10;

    function goToPage(page) {
        const from = page - 1;
        const to = page;
        window.location.search = `?from=${from}&to=${to}`;
    }

    if (leftBtn) {
        leftBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                goToPage(currentPage - 1);
            }
        });
    }

    if (rightBtn) {
        rightBtn.addEventListener("click", () => {
            if (currentPage < totalPages) {
                goToPage(currentPage + 1);
            }
        });
    }

    // Optional visual indication
    if (currentPage <= 1) leftBtn.classList.add(`disabled`);
    if (currentPage >= totalPages) rightBtn.classList.add(`disabled`);
});
