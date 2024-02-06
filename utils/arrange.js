function dataUnity(arr) {
    const finalTaskData = []
    const finalSubTaskData = []
    const filterTask = arr.filter((obj, index, array) =>
          index === array.findIndex((el) => el.task_name === obj.task_name) 
      );
    
      filterTask.forEach((el)=>{ finalTaskData.push({npcid:el.npcid, cat_id : el.category_id, name: el.task_name, cat_status: el.cat_status,cat_mp_status: el.project_status, cat_deadline: el.dateofdeadline}) })
    
      arr.forEach((el)=>{ finalSubTaskData.push({ t_name : el.task_name, st_id: el.stask_id, name: el.sub_task_name, st_status: el.stask_status})})
    
      finalSubTaskData.forEach((el)=>{
        finalTaskData.forEach((task)=>{
            if (task.name == el.t_name) {
                if (task['sub']) { task.sub.push({s_name: el.name, s_id: el.st_id, s_status: el.st_status}) 
                }else{
                    task['sub'] = []
                    task['sub'].push({s_name: el.name, s_id: el.st_id, s_status: el.st_status})
                }
            }
        })
      })
    
      arr.forEach((el)=>{ el['category'] = finalTaskData })
    }

    module.exports = dataUnity