class DataCall {
  callApi = async (url, method, body) => {
        if (method == 'GET') {
            const fet = await fetch(url, {
                method: method
            })
            const res = await fet.json()
            return res;
        }else if (method == 'POST' && body != undefined) {
            const fet = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(body)
            })
            const res = await fet.json()
            console.log(res) 
            return res;
        }else {
            throw new Error('Invalid request !')
        }
       
    }

    subPopup = async ()=> {
        console.log('adding task')
        document.querySelector(`.task-drop-menu`).classList.toggle(`active`);
        const subtasks = await this.callApi('http://localhost:3000/admin/settings/get-subtask', 'GET')
        console.log(subtasks)
    }
}

export {DataCall};

