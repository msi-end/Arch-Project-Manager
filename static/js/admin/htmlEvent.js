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


function closeAlert(){
    document.querySelector(`.status`).style.display = `none`;
}