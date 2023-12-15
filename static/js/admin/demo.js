const ob1 = {
    id: 13,
    deal_name: 'barista cafe',
    reference_no: 1234,
    contact: 600019228,
    agreement_amount: 100000,
    work_name: 'restaurant work',
    email: 'lwra@gmail.com',
    city: 'nagaon',
    total_price: 2000000,
    split: '4:4:2',
    category_id: 3,
    task_name: 'Design',
    cat_status: 'pending',
    stask_id: null,
    sub_task_name: null,
    stask_status: null,
    project_status: 'pending',
    dateofdeadline: '25/09/2023'
}

const ob2 = {
    id: 13,
    deal_name: 'barista cafe',
    reference_no: 1234,
    contact: 600019228,
    agreement_amount: 100000,
    work_name: 'restaurant work',
    email: 'lwra@gmail.com',
    city: 'nagaon',
    total_price: 2000000,
    split: '4:4:2',
    category_id: 1,
    task_name: 'architechture',
    cat_status: 'pending',
    stask_id: 2,
    sub_task_name: 'carpentry',
    stask_status: 'not started',
    project_status: 'pending',
    dateofdeadline: '25/09/2023'
}

const ob3 = {
    id: 13,
    deal_name: 'barista cafe',
    reference_no: 1234,
    contact: 600019228,
    agreement_amount: 100000,
    work_name: 'restaurant work',
    email: 'lwra@gmail.com',
    city: 'nagaon',
    total_price: 2000000,
    split: '4:4:2',
    category_id: 2,
    task_name: 'structural',
    cat_status: 'pending',
    stask_id: 3,
    sub_task_name: 'aalball',
    stask_status: 'not started',
    project_status: 'pending',
    dateofdeadline: '25/09/2023'
}

const ob4 = {
    id: 13,
    deal_name: 'barista cafe',
    reference_no: 1234,
    contact: 600019228,
    agreement_amount: 100000,
    work_name: 'restaurant work',
    email: 'lwra@gmail.com',
    city: 'nagaon',
    total_price: 2000000,
    split: '4:4:2',
    category_id: 1,
    task_name: 'architechture',
    cat_status: 'pending',
    stask_id: 1,
    sub_task_name: 'plumbing',
    stask_status: 'not started',
    project_status: 'pending',
    dateofdeadline: '25/09/2023'
}

const finalOb = {
    id: 13,
    deal_name: 'barista cafe',
    reference_no: 1234,
    contact: 600019228,
    agreement_amount: 100000,
    work_name: 'restaurant work',
    email: 'lwra@gmail.com',
    city: 'nagaon',
    total_price: 2000000,
    split: '4:4:2',
    tasks: [{catid: 1, name: 'architechture', status: 'pending'}, {catid: 2, name: 'structural',  status: 'pending'}],
    sub_tasks: [{id: 1, task: 'architechture', name: 'plumbing', status: 'pending'}, {catid: 2, name: 'aalball', status: 'pending'}],
    project_status: 'pending',
    dateofdeadline: '25/09/2023'
}

const data = [ob1, ob2, ob3, ob4]

function dataUnity(arr) {
const finalTaskData = []
const finalSubTaskData = []
const filterTask = arr.filter((obj, index, array) =>
      index === array.findIndex((el) => el.task_name === obj.task_name)
  );

  filterTask.forEach((el)=>{ finalTaskData.push({cat_id : el.category_id, name: el.task_name}) })

  arr.forEach((el)=>{ finalSubTaskData.push({ t_name : el.task_name, st_id : el.stask_id, name: el.sub_task_name}) })

  finalSubTaskData.forEach((el)=>{
    finalTaskData.forEach((task)=>{
        if (task.name == el.t_name) {
            if (task['sub']) { task.sub.push(el.name) 
            }else{
                task['sub'] = []
                task['sub'].push(el.name)
            }
        }
    })
  })

  arr.forEach((el)=>{ el['category'] = finalTaskData })
}

dataUnity(data)
console.log(data)

