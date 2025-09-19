BASE_URL = location.origin + location.pathname;
let ReqURI = {
  addUser: BASE_URL + `/add-User`,
  updUser: BASE_URL + `/Update-User/`,
  delUser: BASE_URL + `/Delete-User/`,
  updUserPwd: BASE_URL + `/upd-password/`,
  getUserAtten: BASE_URL + `/getAttendence/`,
  getUserAttenyMth: BASE_URL + `/getAttenMonth/`,
  getWorkInfo: BASE_URL + "/getWorkInfo/",
};

function hidePopup(event) {
  document.querySelector(".main-popup").classList.add("hide");
}

function AlertNotifier(status, msg, icon) {
  Swal.fire({
    title: status ? "Success" : "Error",
    text: msg,
    icon: icon,
    confirmButtonText: "Done",
  });
}

// ADD USER POPUP
function addUser() {
  const maindrop = document.querySelector(`.main-popup`);
  maindrop.classList.toggle(`hide`);
  maindrop.innerHTML = "";
  maindrop.innerHTML = `<div class="add-user blur hide">
                        <form action="" class="form">
                            <h2>Add User</h2>
                            <div class="grid extra-grid">
                                <div class="field">
                                    <p class="title">Name</p>
                                    <input type="text" name="" id="username">
                                </div>
                                <div class="field">
                                    <p class="title">Phone Number</p>
                                    <input type="text" name="" id="usernumber">
                                </div>
                                <div class="field">
                                    <p class="title">Email</p>
                                    <input type="email" name="" id="useremail">
                                </div>
                                <div class="field">
                                    <p class="title">Designation</p>
                                    <input type="text" name="" id="userdesignation">
                                </div>
                                <div class="field">
                                    <p class="title">Password</p>
                                    <input type="text" name="" id="userpassword">
                                </div>
                            </div>
                            <div class="action-btn flex align-center">
                                <button type="button" class="flex-1" onclick="addNewUser()">Add</button>
                                <button type="button" class="flex-1 delete" onclick="hidePopup(this)">Cancel</button>
                            </div>
                        </form>
                    </div>`;
  const dropDownTarget = document.querySelector(`.add-user`);
  dropDownTarget.classList.toggle(`hide`);
}
//SENDING NEW USER DATA TO SERVER
function addNewUser() {
  let dataObj = {
    Name: document.querySelector("#username").value,
    jobRole: document.querySelector("#userdesignation").value,
    Number: document.querySelector("#usernumber").value,
    Email: document.querySelector("#useremail").value,
    Password: document.querySelector("#userpassword").value,
  };
  ReqHandler.POST(ReqURI.addUser, dataObj)
    .then((result) => {
      if (result.status == true) {
        AlertNotifier(result.status, result.msg, "success");
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        AlertNotifier(result.status, result.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-UserAdd):", err);
    });
}

// UPDATE USER POPUP
function editUser(e) {
  let id = e.dataset.id;
  let target = e.parentElement.parentElement.parentElement.children[1];
  const maindrop = document.querySelector(`.main-popup`);
  maindrop.classList.toggle(`hide`);
  maindrop.innerHTML = "";
  maindrop.innerHTML = `<div class="edit-user blur hide" data-id="">
                        <form action="" class="form">
                            <h2>Edit User</h2>
                            <div class="grid extra-grid">
                                <div class="field">
                                    <p class="title">Name</p>
                                    <input type="text" name="" id="editname">
                                </div>
                                <div class="field">
                                    <p class="title">Phone Number</p>
                                    <input type="text" name="" id="editnumber">
                                </div>
                                <div class="field">
                                    <p class="title">Email</p>
                                    <input type="email" name="" id="editemail">
                                </div>
                                <div class="field">
                                    <p class="title">Designation</p>
                                    <input type="text" name="" id="editdesignation">
                                </div>
                            </div>
                            <div class="action-btn flex align-center">
                                <button type="button" class="flex-1" onclick="updateUser(${id})">Update</button>
                                <button type="button" class="flex-1 delete" onclick="hidePopup(this)">Cancel</button>
                            </div>
                        </form>
                    </div>`;
  const dropDownTarget = document.querySelector(`.edit-user`);
  dropDownTarget.classList.toggle(`hide`);
  if (e) {
    dropDownTarget.querySelector(`#editname`).value =
      target.querySelector(`.name`).innerText;
    dropDownTarget.querySelector(`#editnumber`).value =
      target.querySelector(`.number`).innerText;
    dropDownTarget.querySelector(`#editemail`).value =
      target.querySelector(`.email`).innerText;
    dropDownTarget.querySelector(`#editdesignation`).value =
      target.querySelector(`.designation`).innerText;
  } else {
    null;
  }
}
//UPDATING USER DATA
function updateUser(id) {
  let dataObj = {
    name: document.querySelector("#editname").value,
    job_role: document.querySelector("#editdesignation").value,
    number: document.querySelector("#editnumber").value,
    email: document.querySelector("#editemail").value,
  };
  ReqHandler.PUT(ReqURI.updUser + id, dataObj)
    .then((result) => {
      if (result.status == true) {
        AlertNotifier(result.status, result.msg, "success");
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        AlertNotifier(result.status, result.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-UserUpdate):", err);
    });
}

// UPDATE PASSWORD POPUP
function editPwd(e, user_id) {
  const maindrop = document.querySelector(`.main-popup`);
  maindrop.classList.toggle(`hide`);
  maindrop.innerHTML = "";
  maindrop.innerHTML = `<div class="edit-pwd blur hide">
                        <form action="" class="form" onsubmit="return updatePwd(this,event,${user_id})">
    <h2>Update Password</h2>
    <div class="grid extra-grid">
        <div class="field">
            <p class="title">New Password</p>
            <input type="text" name="" id="newpwd">
        </div>
        <div class="field">
            <p class="title">Confirm Password</p>
            <input type="text" name="" id="confirmpwd">
         </div> 
         </div>
         <div class="action-btn flex align-center">
            <button type="submit" class="flex-1" >Update</button>
            <button type="button" class="flex-1 delete" onclick="hidePopup(this)">Cancel</button>
         </div>  
</form>
</div>`;
  const dropDownTarget = document.querySelector(`.edit-pwd`);
  dropDownTarget.classList.toggle(`hide`);
}
// UPDATE PASSWORD
function updatePwd(e, event, user_id) {
  event.preventDefault();
  let dataObj = {
    Password: document.querySelector("#confirmpwd").value,
  };
  ReqHandler.PUT(ReqURI.updUserPwd + user_id, dataObj)
    .then((result) => {
      if (result.status == true) {
        AlertNotifier(result.status, result.msg, "success");
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        AlertNotifier(result.status, result.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-UserUpdate):", err);
    });
}

function GetUserAttenDetail() {
  let id = document.querySelector(`.user-profile`).dataset.dealid;
  let AttenCtn = document.querySelector(`.attendance table tbody tr`);

  let year = new Date().getFullYear();
  let month = new Date().getUTCMonth();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  ReqHandler.GET(ReqURI.getUserAtten + id)
    .then((res) => {
      if (res.status == true) {
        document.querySelector(
          `#attValue`
        ).textContent = `${res.data[0].totalAtten}`;
      }
    })
    .catch((err) => {
      console.log(`Error(fn-getAtten):`, err);
    });
  ReqHandler.GET(ReqURI.getUserAttenyMth + id)
    .then((res) => {
      if (res.status == true) {
        AttenCtn.innerHTML = ``;
        for (let i = 0; i < res.data.length; i++) {
          AttenCtn.innerHTML += `<td>${res.data[i].date}-${months[month]}-${year}</td>
                        <td></td>
                        <td></td>`;
        }
      }
    })
    .catch((err) => {
      console.log(`Error(fn-GetAttenByM):`, err);
    });
  ReqHandler.GET(ReqURI.getWorkInfo + id)
    .then((res) => {
      if (res.status) {
        document.querySelector(`.project-involved p.value`).textContent =
          res.data[1].length + res.data[3].length;
        document.querySelector(`#nip`).textContent = res.data[0][0].total_cats;
        document.querySelector(`#nc`).textContent =
          res.data[0][0].total_cats - res.data[0][0].num_cats_completed;
        document.querySelector(`#mip`).textContent = res.data[2][0].total_mtask;
        document.querySelector(`#mc`).textContent =
          res.data[2][0].total_mtask - res.data[2][0].num_task_completed;
      }
    })
    .catch((err) => {
      console.log(`Error(fn-GetWorkInfo):`, err);
    });
}

function delete_User(e, user_id, status) {
  console.log(e);
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert User Data!",
    icon: "warning",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Inactive User",
    denyButtonText: "Delete Permanently",
    customClass: {
      actions: "my-actions",
      cancelButton: "order-1 right-gap",
      confirmButton: "order-2",
      denyButton: "order-3",
    },
  }).then(async (pers) => {
    if (pers.isDismissed) return;
    let QueryParams;
    if (pers.isConfirmed) {
      QueryParams = "?inactiveUser=true";
    } else if (pers.isDenied) {
      QueryParams = "?deletePermanently=true";
    }
    await ReqHandler.DEL(ReqURI.delUser + user_id + QueryParams)
      .then((res) => {
        if (res.status) {
          Swal.fire({
            title: "Success",
            text: res.msg,
            icon: "success",
            confirmButtonText: "Done",
          });
          document.querySelector("main .main-data").classList.remove("hide");
          document.querySelector("main .more-data").classList.add("hide");
          setTimeout(() => {
            location.reload();
          }, 1000);
          // document.querySelector(`.more-data #more-data-${icon.dataset.id}`).classList.add("hide");
        }
      })
      .catch((err) => {
        console.log(`Error(fn-delete_User):`, err);
      });
  });
}

GetUserAttenDetail();

document.querySelectorAll(`.date`).forEach((date) => {
  date.textContent = new Date(date.textContent).toDateString();
});
