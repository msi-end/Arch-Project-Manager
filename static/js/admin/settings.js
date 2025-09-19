// ReqHandler Data
BASE_URL = location.origin+location.pathname;
let ReqURI = {
  // Miscellaneous Tasks
  addMiscTask: BASE_URL + `/set-misc-task`,
  updMiscTask: BASE_URL + `/upt-misc-task/`,
  delMiscTask: BASE_URL + `/del-misc-task/`,
  
  // Sub Tasks
  subTask: BASE_URL + `/set-subtask`,
  updSubTask: BASE_URL + `/upt-subtask/`,
  delSubTask: BASE_URL + `/del-subtask/`,
  
  // Split Ratio
  splitRatio: BASE_URL + "/set-amountsplit",
  updSplitRatio: BASE_URL + "/upt-amountsplit/",
  delSplitRatio: BASE_URL + "/del-amountsplit/",
  
  // Expense Category
  expenseCategory: BASE_URL + "/set-expense-category",
  updExpenseCategory: BASE_URL + "/upt-expense-category/",
  delExpenseCategory: BASE_URL + "/del-expense-category/",
  
  // Payment Methods
  paymentMethods: BASE_URL + "/set-payment-methods",
  updPaymentMethods: BASE_URL + "/upt-payment-methods/",
  delPaymentMethods: BASE_URL + "/del-payment-methods/",
  
  // Project Category
  projectCategory: BASE_URL + "/set-project-category",
  updProjectCategory: BASE_URL + "/upt-project-category/",
  delProjectCategory: BASE_URL + "/del-project-category/"
};
  
document.addEventListener("DOMContentLoaded", () => {
  const asideItems = document.querySelectorAll(".switch-aside-item");
  const contents = document.querySelectorAll(".switch-content");
  contents[0].classList.add("active");
  
  asideItems.forEach(item => {
    item.addEventListener("click", () => {
      const index = item.getAttribute("data-index");
      asideItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      contents.forEach(c => c.classList.remove("active"));
      if (contents[index]) contents[index].classList.add("active");
    });
  });
});

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

function showDeleteConfirmation(callback) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
}

// ==================== MISCELLANEOUS TASK OPERATIONS ====================

function addMiscTask() {
  let inputValue = document.getElementById("miscel-task");
  
  if (!inputValue.value.trim()) {
    AlertNotifier(false, "Please enter a task name", "warning");
    return;
  }

  ReqHandler.POST(ReqURI.addMiscTask, { miscTask: inputValue.value.trim() })
    .then((res) => {
      if (res.status == true) {
        AlertNotifier(res.status, res.msg, "success");
        inputValue.value = "";
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        AlertNotifier(res.status, res.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-addMiscTask):", err);
      AlertNotifier(false, "An error occurred while adding the task", "error");
    });
}

function editMiscTask(button) {
  let id = button.dataset.id;
  let type = button.parentElement.children[1].textContent;
  const maindrop = document.querySelector(".main-popup");
  maindrop.classList.remove("hide");
  maindrop.innerHTML = "";
  maindrop.innerHTML = `
    <div class="misc-task blur hide">
      <form action="" class="form">
        <h2>Update Miscellaneous Task</h2>
        <div class="field">
          <p class="title">Task Name</p>
          <input type="text" id="upd-misc-task" required>
        </div>
        <div class="action-btn flex align-center">
          <button type="button" class="flex-1" onclick="updMiscTask(event,${id})">Update</button>
          <button type="button" class="flex-1 delete" onclick="hidePopup(event)">Cancel</button>
        </div>
      </form>
    </div>`;
  
  const dropDownTarget = document.querySelector(".misc-task");
  dropDownTarget.classList.toggle("hide");
  dropDownTarget.querySelector(`#upd-misc-task`).value = type.trim();
}

function updMiscTask(event, id) {
  event.preventDefault();
  let inputValue = document.getElementById("upd-misc-task");
  
  if (!inputValue.value.trim()) {
    AlertNotifier(false, "Please enter a task name", "warning");
    return;
  }

  ReqHandler.PUT(ReqURI.updMiscTask + id, { miscTask: inputValue.value.trim() })
    .then((res) => {
      if (res.status == true) {
        AlertNotifier(res.status, res.msg, "success");
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        AlertNotifier(res.status, res.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-updMiscTask):", err);
      AlertNotifier(false, "An error occurred while updating the task", "error");
    });
}

function deleteMiscTask(button) {
  let id = button.dataset.id;
  
  showDeleteConfirmation(() => {
    ReqHandler.DEL(ReqURI.delMiscTask + id)
      .then((res) => {
        if (res.status == true) {
          AlertNotifier(res.status, res.msg, "success");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          AlertNotifier(res.status, res.msg, "error");
        }
      })
      .catch((err) => {
        console.log("Error(fn-deleteMiscTask):", err);
        AlertNotifier(false, "An error occurred while deleting the task", "error");
      });
  });
}

// ==================== SUB TASK OPERATIONS ====================

function addSubTask() {
  let inputValue = document.getElementById("small-task");
  
  if (!inputValue.value.trim()) {
    AlertNotifier(false, "Please enter a sub task name", "warning");
    return;
  }

  ReqHandler.POST(ReqURI.subTask, { subTask: inputValue.value.trim() })
    .then((res) => {
      if (res.status == true) {
        AlertNotifier(res.status, res.msg, "success");
        inputValue.value = "";
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        AlertNotifier(res.status, res.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-addSubTask):", err);
      AlertNotifier(false, "An error occurred while adding the sub task", "error");
    });
}

function editSubTask(button) {
  let id = button.dataset.id;
  let type = button.parentElement.children[1].textContent;
  const maindrop = document.querySelector(".main-popup");
  maindrop.classList.remove("hide");
  maindrop.innerHTML = "";
  maindrop.innerHTML = `
    <div class="small-task blur hide">
      <form action="" class="form">
        <h2>Update Sub Task</h2>
        <div class="field">
          <p class="title">Task Name</p>
          <input type="text" id="upd-sub-task" required>
        </div>
        <div class="action-btn flex align-center">
          <button type="button" class="flex-1" onclick="updSubTask(event, ${id})">Update</button>
          <button type="button" class="flex-1 delete" onclick="hidePopup(event)">Cancel</button>
        </div>
      </form>
    </div>`;
  
  const dropDownTarget = document.querySelector(".small-task");
  dropDownTarget.classList.toggle("hide");
  dropDownTarget.querySelector(`#upd-sub-task`).value = type.trim();
}

function updSubTask(event, id) {
  event.preventDefault();
  let inputValue = document.getElementById("upd-sub-task");
  
  if (!inputValue.value.trim()) {
    AlertNotifier(false, "Please enter a sub task name", "warning");
    return;
  }

  ReqHandler.PUT(ReqURI.updSubTask + id, { subTask: inputValue.value.trim() })
    .then((res) => {
      if (res.status == true) {
        AlertNotifier(res.status, res.msg, "success");
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        AlertNotifier(res.status, res.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-updSubTask):", err);
      AlertNotifier(false, "An error occurred while updating the sub task", "error");
    });
}

function deleteSubTask(button) {
  let id = button.dataset.id;
  
  showDeleteConfirmation(() => {
    ReqHandler.DEL(ReqURI.delSubTask + id)
      .then((res) => {
        if (res.status == true) {
          AlertNotifier(res.status, res.msg, "success");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          AlertNotifier(res.status, res.msg, "error");
        }
      })
      .catch((err) => {
        console.log("Error(fn-deleteSubTask):", err);
        AlertNotifier(false, "An error occurred while deleting the sub task", "error");
      });
  });
}

// ==================== SPLIT RATIO OPERATIONS ====================

function verifyRatio(value) {
  const vals = value.split(":");
  if (vals.length === 3) {
    const sum = vals.reduce((acc, el) => Number(acc) + Number(el), 0);
    const hasValidNumbers = vals.every(val => !isNaN(val) && Number(val) >= 0);
    return hasValidNumbers && sum === 10;
  }
  return false;
}

function addSplitRatio() {
  let inputValue = document.getElementById("split-ratio");
  
  if (!inputValue.value.trim()) {
    AlertNotifier(false, "Please enter a split ratio", "warning");
    return;
  }
  
  const verification = verifyRatio(inputValue.value.trim());
  
  if (verification) {
    ReqHandler.POST(ReqURI.splitRatio, { splitValue: inputValue.value.trim() })
      .then((res) => {
        if (res.status == true) {
          AlertNotifier(res.status, res.msg, "success");
          inputValue.value = "";
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          AlertNotifier(res.status, res.msg, "error");
        }
      })
      .catch((err) => {
        console.log("Error(fn-addSplitRatio):", err);
        AlertNotifier(false, "An error occurred while adding the split ratio", "error");
      });
  } else {
    AlertNotifier(false, "Ratio must contain 3 values separated by ':' and sum must be 10 (e.g., 4:3:3)", "warning");
  }
}

function editSplitRatio(button) {
  let id = button.dataset.id;
  let type = button.parentElement.children[1].textContent;
  const maindrop = document.querySelector(".main-popup");
  maindrop.classList.remove("hide");
  maindrop.innerHTML = "";
  maindrop.innerHTML = `
    <div class="split-ratio blur hide">
      <form action="" class="form">
        <h2>Update Split Ratio</h2>
        <div class="field">
          <p class="title">Split Ratio <span>(Arch:Strc:3D)</span></p>
          <input type="text" id="upd-split-ratio" placeholder="e.g., 4:3:3" required>
          <small>Note: Values must sum to 10</small>
        </div>
        <div class="action-btn flex align-center">
          <button type="button" class="flex-1" onclick="updSplitRatio(event, ${id})">Update</button>
          <button type="button" class="flex-1 delete" onclick="hidePopup(event)">Cancel</button>
        </div>
      </form>
    </div>`;
  
  const dropDownTarget = document.querySelector(".split-ratio");
  dropDownTarget.classList.toggle("hide");
  dropDownTarget.querySelector(`#upd-split-ratio`).value = type.trim();
}

function updSplitRatio(event, id) {
  event.preventDefault();
  let inputValue = document.getElementById("upd-split-ratio");
  
  if (!inputValue.value.trim()) {
    AlertNotifier(false, "Please enter a split ratio", "warning");
    return;
  }
  
  const verification = verifyRatio(inputValue.value.trim());

  if (verification) {
    ReqHandler.PUT(ReqURI.updSplitRatio + id, { splitValue: inputValue.value.trim() })
      .then((res) => {
        if (res.status == true) {
          AlertNotifier(res.status, res.msg, "success");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          AlertNotifier(res.status, res.msg, "error");
        }
      })
      .catch((err) => {
        console.log("Error(fn-updSplitRatio):", err);
        AlertNotifier(false, "An error occurred while updating the split ratio", "error");
      });
  } else {
    AlertNotifier(false, "Ratio must contain 3 values separated by ':' and sum must be 10 (e.g., 4:3:3)", "warning");
  }
}

function deleteSplitRatio(button) {
  let id = button.dataset.id;
  
  showDeleteConfirmation(() => {
    ReqHandler.DEL(ReqURI.delSplitRatio + id)
      .then((res) => {
        if (res.status == true) {
          AlertNotifier(res.status, res.msg, "success");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          AlertNotifier(res.status, res.msg, "error");
        }
      })
      .catch((err) => {
        console.log("Error(fn-deleteSplitRatio):", err);
        AlertNotifier(false, "An error occurred while deleting the split ratio", "error");
      });
  });
}

// ==================== EXPENSE CATEGORY OPERATIONS ====================

function addExpenseCategory() {
  let inputValue = document.getElementById("exp_cat-name");
  
  if (!inputValue.value.trim()) {
    AlertNotifier(false, "Please enter category details", "warning");
    return;
  }

  // Parse input - expecting format like "Category Name | Category Description"
  const parts = inputValue.value.split('|').map(part => part.trim());
  const cat_name = parts[0];
  const cat_desc = parts[1] || '';

  if (!cat_name) {
    AlertNotifier(false, "Please enter a category name", "warning");
    return;
  }

  ReqHandler.POST(ReqURI.expenseCategory, { 
    cat_name: cat_name,
    cat_desc: cat_desc
  })
    .then((res) => {
      if (res.status == true) {
        AlertNotifier(res.status, res.msg, "success");
        inputValue.value = "";
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        AlertNotifier(res.status, res.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-addExpenseCategory):", err);
      AlertNotifier(false, "An error occurred while adding the expense category", "error");
    });
}

function editExpenseCategory(button) {
  let id = button.dataset.id;
  let categoryElement = button.parentElement;
  let cat_name = categoryElement.querySelector('span.flex-1').textContent.trim();
  let cat_desc = categoryElement.querySelector('span[style*="font-size: 13px"]').textContent.trim();
  
  const maindrop = document.querySelector(".main-popup");
  maindrop.classList.remove("hide");
  maindrop.innerHTML = "";
  maindrop.innerHTML = `
    <div class="expense-category blur hide">
      <form action="" class="form">
        <h2>Update Expense Category</h2>
        <div class="field">
          <p class="title">Category Name</p>
          <input type="text" id="upd-exp-cat-name" placeholder="Enter category name" required>
        </div>
        <div class="field">
          <p class="title">Category Description</p>
          <textarea id="upd-exp-cat-desc" placeholder="Enter category description" rows="3" style="padding: 10px;border-radius: 6px;border: 1px solid #e7e6df;" ></textarea>
        </div>
        <div class="action-btn flex align-center">
          <button type="button" class="flex-1" onclick="updExpenseCategory(event, ${id})">Update</button>
          <button type="button" class="flex-1 delete" onclick="hidePopup(event)">Cancel</button>
        </div>
      </form>
    </div>`;
  
  const dropDownTarget = document.querySelector(".expense-category");
  dropDownTarget.classList.toggle("hide");
  dropDownTarget.querySelector(`#upd-exp-cat-name`).value = cat_name;
  dropDownTarget.querySelector(`#upd-exp-cat-desc`).value = cat_desc;
}

function updExpenseCategory(event, id) {
  event.preventDefault();
  let cat_nameInput = document.getElementById("upd-exp-cat-name");
  let cat_descInput = document.getElementById("upd-exp-cat-desc");
  
  if (!cat_nameInput.value.trim()) {
    AlertNotifier(false, "Please enter a category name", "warning");
    return;
  }

  ReqHandler.PUT(ReqURI.updExpenseCategory + id, { 
    cat_name: cat_nameInput.value.trim(),
    cat_desc: cat_descInput.value.trim()
  })
    .then((res) => {
      if (res.status == true) {
        AlertNotifier(res.status, res.msg, "success");
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        AlertNotifier(res.status, res.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-updExpenseCategory):", err);
      AlertNotifier(false, "An error occurred while updating the expense category", "error");
    });
}

function deleteExpenseCategory(button) {
  let id = button.dataset.id;
  
  showDeleteConfirmation(() => {
    ReqHandler.DEL(ReqURI.delExpenseCategory + id)
      .then((res) => {
        if (res.status == true) {
          AlertNotifier(res.status, res.msg, "success");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          AlertNotifier(res.status, res.msg, "error");
        }
      })
      .catch((err) => {
        console.log("Error(fn-deleteExpenseCategory):", err);
        AlertNotifier(false, "An error occurred while deleting the expense category", "error");
      });
  });
}

// ==================== PAYMENT METHODS OPERATIONS ====================

function addPaymentMethods() {
  let inputValue = document.getElementById("methods-name");
  
  if (!inputValue.value.trim()) {
    AlertNotifier(false, "Please enter payment method details", "warning");
    return;
  }

  // Parse input - expecting format like "Method Name | Method Description"
  const parts = inputValue.value.split('|').map(part => part.trim());
  const method_name = parts[0];
  const method_desc = parts[1] || '';

  if (!method_name) {
    AlertNotifier(false, "Please enter a payment method name", "warning");
    return;
  }

  ReqHandler.POST(ReqURI.paymentMethods, { 
    method_name: method_name,
    method_desc: method_desc
  })
    .then((res) => {
      if (res.status == true) {
        AlertNotifier(res.status, res.msg, "success");
        inputValue.value = "";
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        AlertNotifier(res.status, res.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-addPaymentMethods):", err);
      AlertNotifier(false, "An error occurred while adding the payment method", "error");
    });
}

function editPaymentMethods(button) {
  let id = button.dataset.id;
  let methodElement = button.parentElement;
  let method_name = methodElement.querySelector('span.flex-1').textContent.trim();
  let method_desc = methodElement.querySelector('span[style*="font-size: 13px"]').textContent.trim();
  
  const maindrop = document.querySelector(".main-popup");
  maindrop.classList.remove("hide");
  maindrop.innerHTML = "";
  maindrop.innerHTML = `
    <div class="payment-method blur hide">
      <form action="" class="form">
        <h2>Update Payment Method</h2>
        <div class="field">
          <p class="title">Method Name</p>
          <input type="text" id="upd-method-name" placeholder="Enter payment method name" required>
        </div>
        <div class="field">
          <p class="title">Method Description</p>
          <textarea id="upd-method-desc" placeholder="Enter method description" rows="3" style="padding: 10px;border-radius: 6px;border: 1px solid #e7e6df;" ></textarea>
        </div>
        <div class="action-btn flex align-center">
          <button type="button" class="flex-1" onclick="updPaymentMethods(event, ${id})">Update</button>
          <button type="button" class="flex-1 delete" onclick="hidePopup(event)">Cancel</button>
        </div>
      </form>
    </div>`;
  
  const dropDownTarget = document.querySelector(".payment-method");
  dropDownTarget.classList.toggle("hide");
  dropDownTarget.querySelector(`#upd-method-name`).value = method_name;
  dropDownTarget.querySelector(`#upd-method-desc`).value = method_desc;
}

function updPaymentMethods(event, id) {
  event.preventDefault();
  let method_nameInput = document.getElementById("upd-method-name");
  let method_descInput = document.getElementById("upd-method-desc");
  
  if (!method_nameInput.value.trim()) {
    AlertNotifier(false, "Please enter a payment method name", "warning");
    return;
  }

  ReqHandler.PUT(ReqURI.updPaymentMethods + id, { 
    method_name: method_nameInput.value.trim(),
    method_desc: method_descInput.value.trim()
  })
    .then((res) => {
      if (res.status == true) {
        AlertNotifier(res.status, res.msg, "success");
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        AlertNotifier(res.status, res.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-updPaymentMethods):", err);
      AlertNotifier(false, "An error occurred while updating the payment method", "error");
    });
}

function deletePaymentMethods(button) {
  let id = button.dataset.id;
  
  showDeleteConfirmation(() => {
    ReqHandler.DEL(ReqURI.delPaymentMethods + id)
      .then((res) => {
        if (res.status == true) {
          AlertNotifier(res.status, res.msg, "success");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          AlertNotifier(res.status, res.msg, "error");
        }
      })
      .catch((err) => {
        console.log("Error(fn-deletePaymentMethods):", err);
        AlertNotifier(false, "An error occurred while deleting the payment method", "error");
      });
  });
}

// ==================== PROJECT CATEGORY OPERATIONS ====================

function addProjectCategory() {
  let inputValue = document.getElementById("pro_cat-name");
  
  if (!inputValue.value.trim()) {
    AlertNotifier(false, "Please enter project category details", "warning");
    return;
  }

  // Parse input - expecting format like "Category Name | Category Description"
  const parts = inputValue.value.split('|').map(part => part.trim());
  const cat_name = parts[0];
  const cat_desc = parts[1] || '';

  if (!cat_name) {
    AlertNotifier(false, "Please enter a project category name", "warning");
    return;
  }

  ReqHandler.POST(ReqURI.projectCategory, { 
    cat_name: cat_name,
    cat_desc: cat_desc
  })
    .then((res) => {
      if (res.status == true) {
        AlertNotifier(res.status, res.msg, "success");
        inputValue.value = "";
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        AlertNotifier(res.status, res.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-addProjectCategory):", err);
      AlertNotifier(false, "An error occurred while adding the project category", "error");
    });
}

function editProjectCategory(button) {
  let id = button.dataset.id;
  let categoryElement = button.parentElement;
  let cat_name = categoryElement.querySelector('span.flex-1').textContent.trim();
  let cat_desc = categoryElement.querySelector('span[style*="font-size: 13px"]').textContent.trim();
  
  const maindrop = document.querySelector(".main-popup");
  maindrop.classList.remove("hide");
  maindrop.innerHTML = "";
  maindrop.innerHTML = `
    <div class="project-category blur hide">
      <form action="" class="form">
        <h2>Update Project Category</h2>
        <div class="field">
          <p class="title">Category Name</p>
          <input type="text" id="upd-pro-cat-name" placeholder="Enter project category name" required>
        </div>
        <div class="field">
          <p class="title">Category Description</p>
          <textarea id="upd-pro-cat-desc" placeholder="Enter category description" rows="3" style="padding: 10px;border-radius: 6px;border: 1px solid #e7e6df;" ></textarea>
        </div>
        <div class="action-btn flex align-center">
          <button type="button" class="flex-1" onclick="updProjectCategory(event, ${id})">Update</button>
          <button type="button" class="flex-1 delete" onclick="hidePopup(event)">Cancel</button>
        </div>
      </form>
    </div>`;
  
  const dropDownTarget = document.querySelector(".project-category");
  dropDownTarget.classList.toggle("hide");
  dropDownTarget.querySelector(`#upd-pro-cat-name`).value = cat_name;
  dropDownTarget.querySelector(`#upd-pro-cat-desc`).value = cat_desc;
}

function updProjectCategory(event, id) {
  event.preventDefault();
  let cat_nameInput = document.getElementById("upd-pro-cat-name");
  let cat_descInput = document.getElementById("upd-pro-cat-desc");
  
  if (!cat_nameInput.value.trim()) {
    AlertNotifier(false, "Please enter a project category name", "warning");
    return;
  }

  ReqHandler.PUT(ReqURI.updProjectCategory + id, { 
    cat_name: cat_nameInput.value.trim(),
    cat_desc: cat_descInput.value.trim()
  })
    .then((res) => {
      if (res.status == true) {
        AlertNotifier(res.status, res.msg, "success");
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        AlertNotifier(res.status, res.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-updProjectCategory):", err);
      AlertNotifier(false, "An error occurred while updating the project category", "error");
    });
}

function deleteProjectCategory(button) {
  let id = button.dataset.id;
  
  showDeleteConfirmation(() => {
    ReqHandler.DEL(ReqURI.delProjectCategory + id)
      .then((res) => {
        if (res.status == true) {
          AlertNotifier(res.status, res.msg, "success");
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          AlertNotifier(res.status, res.msg, "error");
        }
      })
      .catch((err) => {
        console.log("Error(fn-deleteProjectCategory):", err);
        AlertNotifier(false, "An error occurred while deleting the project category", "error");
      });
  });
}

// ==================== UTILITY FUNCTIONS ====================

// Clear all form inputs
function clearAllInputs() {
  const inputs = document.querySelectorAll('input[type="text"], textarea');
  inputs.forEach(input => input.value = '');
}

// Validate form inputs
function validateInput(input, minLength = 1) {
  return input && input.trim().length >= minLength;
}

// Show loading state
function showLoading(button) {
  const originalText = button.textContent;
  button.textContent = 'Loading...';
  button.disabled = true;
  return originalText;
}

// Hide loading state
function hideLoading(button, originalText) {
  button.textContent = originalText;
  button.disabled = false;
}

// Format text for display
function formatText(text, maxLength = 50) {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Export functions for potential external use
window.SettingsManager = {
  // Miscellaneous Tasks
  addMiscTask,
  editMiscTask,
  updMiscTask,
  deleteMiscTask,
  
  // Sub Tasks
  addSubTask,
  editSubTask,
  updSubTask,
  deleteSubTask,
  
  // Split Ratio
  addSplitRatio,
  editSplitRatio,
  updSplitRatio,
  deleteSplitRatio,
  
  // Expense Categories
  addExpenseCategory,
  editExpenseCategory,
  updExpenseCategory,
  deleteExpenseCategory,
  
  // Payment Methods
  addPaymentMethods,
  editPaymentMethods,
  updPaymentMethods,
  deletePaymentMethods,
  
  // Project Categories
  addProjectCategory,
  editProjectCategory,
  updProjectCategory,
  deleteProjectCategory,
  
  // Utilities
  clearAllInputs,
  validateInput,
  showLoading,
  hideLoading,
  formatText
};