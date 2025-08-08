function date_Split(val, p, t) {
  let [d, m, y] = val.split(p);
  return t ? `${y}/${m}/${d}` : `${y}-${m}-${d}`;
}
// ReqHandler Data
// User Requestes To API
let BASE_URL = location.href;
let ReqHandler = {
  GET: async function (url) {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });
    return response.json();
  },
  POST: async function (url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  PUT: async function (url, data) {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  DEL: async function (url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    });
    return response.json();
  },
};

function closeMainDropdown() {
  document.querySelector(`.main-dropdown`).classList.remove(`hide`);
}
// if (pageNo + 2 == lastPageNo) {
//     document.getElementById('way-2').style.display = `none`
// } else {
//     document.getElementById('way-2').style.display = `flex`}
async function CheckNotification() {
  let nCtn = document.querySelector(".notification-column");
  let nCount = document.querySelector("#notification-count");
  let nCounts = 0;
  await ReqHandler.GET(location.origin + "/apiv1/get-notifi").then((res) => {
    if (res.status) {
      // nCtn.innerHTML = "";
      for (const e of res.data) {
        nCtn.innerHTML += ` <p class="notification-name ${e.status}" data-nId="${e.notid}"><span>${e.title}</span>
                <span class="actionBtn"><span class="n-icon" onclick="UpdateNotify('read',${e.notid})"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg></span>|<span class="n-icon " onclick="UpdateNotify('removed',${e.notid})"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /> </svg></span></span></p><hr>`;
        if (e.status !== "read") {
          nCounts++;
        }
      }
      if (nCounts > 0) {
        nCount.style.display = "block";
        nCount.innerHTML = nCounts;
      } else {
        nCount.style.display = "none";
      }
    }
  });
}
async function UpdateNotify(act, e) {
  await ReqHandler.GET(
    location.origin + "/apiv1/upd-notifi/" + e + `?act=` + act
  ).then((res) => {
    if (res.status) {
      CheckNotification();
    }
  });
}
CheckNotification();
