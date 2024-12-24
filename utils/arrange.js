function dataUnity(arr) {
  const finalTaskData = [];
  const finalSubTaskData = [];
  const filterTask = arr.filter(
    (obj, index, array) =>
      index === array.findIndex((el) => el.task_name === obj.task_name)
  );

  filterTask.forEach((el) => {
    finalTaskData.push({
      npcid: el.npcid,
      cat_id: el.category_id,
      name: el.task_name,
      cat_status: el.cat_status,
      cat_mp_status: el.project_status,
      cat_deadline: el.dateofdeadline,
    });
  });

  arr.forEach((el) => {
    finalSubTaskData.push({
      t_name: el.task_name,
      st_id: el.stask_id,
      name: el.sub_task_name,
      st_status: el.stask_status,
    });
  });

  finalSubTaskData.forEach((el) => {
    finalTaskData.forEach((task) => {
      if (task.name == el.t_name) {
        if (task["sub"]) {
          task.sub.push({
            s_name: el.name,
            s_id: el.st_id,
            s_status: el.st_status,
          });
        } else {
          task["sub"] = [];
          task["sub"].push({
            s_name: el.name,
            s_id: el.st_id,
            s_status: el.st_status,
          });
        }
      }
    });
  });

  arr.forEach((el) => {
    el["category"] = finalTaskData;
  });
}

function addAmountAndModeToTask(eachArrofTask, eachTask) {
  eachArrofTask.forEach((element) => {
    if (element.task_name === eachTask.task_name && element.amount_got != 0) {
      eachTask.amount_rcv.push({
        amount: element.amount_got,
        mode: element.modeofpay,
        date: element.dateofpay,
      });
    }
  });
}

const filterArrFin = (eachArr) => {
  const filterTask = eachArr.filter((item, index, array) => {
    if (index === array.findIndex((el) => el.task_name === item.task_name)) {
      if (item.amount_rcv) {
        //adding the all the amount and modeofpayments of a particular task to each task;
        addAmountAndModeToTask(eachArr, item);
      } else {
        item.amount_rcv = [];
        //adding the all the amount and modeofpayments of a particular task to each task;
        addAmountAndModeToTask(eachArr, item);
      }
    }
    //filtering array of repeated tasks containing new amount_rcv key;
    return index === array.findIndex((el) => el.task_name === item.task_name);
  });
  return filterTask;
};

function arrangeFinance(arr) {
  const output = arr.map(filterArrFin);
  return output;
}

module.exports = { dataUnity, arrangeFinance };
