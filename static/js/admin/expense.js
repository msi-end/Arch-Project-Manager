let expensePopup = document.querySelector(".addexpense"),
    expenseAddBox = document.querySelector(".expense-addition-box"),
    editExpPopup = document.querySelector(".editexpense"),
    editExpenseBox = document.querySelector(".expense-grid"),
    body = document.querySelector(`body`);

//ADD AN EXPENSE
function addExpense() {
    expensePopup.classList.toggle(`hide`);
    body.classList.toggle(`flow`);
}

//HIDE ADD EXPENSE POPUP
function updateAddExpense(){
    expensePopup.classList.add(`hide`);
}

//EDIT EXPENSE
function editExpense(){
    editExpPopup.classList.remove(`hide`);
}

//HIDE EDIT POPUP
function updateEditExpense(){
    editExpPopup.classList.add(`hide`);
}
//HIDE POPUPS ON CLICK OUTSIDE CONTENT
function handleExpenseClick(event) {
    const clickedElement = event.target;

    if (clickedElement.classList == "addexpense") {
        clickedElement.classList.add(`hide`);
    }
    else if (clickedElement.classList == "editexpense") {
        clickedElement.classList.add(`hide`);
    }
}

expensePopup.addEventListener("click", handleExpenseClick);
expenseAddBox.addEventListener("click", handleExpenseClick);
editExpPopup.addEventListener("click", handleExpenseClick);
editExpenseBox.addEventListener("click", handleExpenseClick);

