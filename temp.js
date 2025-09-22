function getExpense_Category_payment_methods() {
  let category = document.querySelector("#category");
  ReqHandler.GET(ReqURI.Expense_category)
    .then((res) => {
      STATES.Expense_category = res;
      res.data.forEach((e) => {
        category.innerHTML += `<option value="${e.cat_name}">${e.cat_name}</option>`;
      });
    })
    .catch((err) => {
      console.log("Error(fn-getExpense_Category):", err);
    });
  ReqHandler.GET(ReqURI.Payment_methods)
    .then((res) => {
      STATES.Payment_methods = res;
    })
    .catch((err) => {
      console.log("Error(fn-getExpense_Category):", err);
    });
}



  Payment_methods: location.origin + "/settings/get-payment-methods"



       STATES.Payment_methods.data.forEach((e) => {
    maindrop.querySelector('#mode').innerHTML+=`<option value="${e.pm_title}">${e.pm_title}</option>`
  });