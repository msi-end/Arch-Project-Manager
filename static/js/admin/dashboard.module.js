class DataCall {
  GET_POST = async (url, method, body, type) => {
    const urlHead = 'http://localhost:3000/'
        if (method == 'GET') {
           try {
            const fet = await fetch(urlHead + url, { method: method })
            const res = await fet.json()
            return res;
           } catch (error) {
            throw new Error('request not proceed !' + error.message)
           }
        }else if (method == 'POST' && body != undefined && type === undefined) {
          try {
            const fet = await fetch(urlHead + url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(body)
            })
            const res = await fet.json()
            this.GET_Notify('Successfully Done', res.msg, 'success') 
            return res;
          } catch (err) {
            throw new Error('request not proceed !' + err.message)
          }
        }else if(type && type == 'form' && body != undefined) {
           try {
            const payload = new URLSearchParams(body);
            const fet = await fetch(urlHead + url, {
             method: 'POST',
             body: payload
            })
            const res = await fet.json()
            this.GET_Notify('Successfully Done', res.msg, 'success') 
            return res;
           } catch (err) {
            throw new Error('request not proceed !' + err.message)
           }
        }else {
            this.GET_Notify('Something Error', 'Invalid Request!', 'error')
            throw new Error('Invalid request !')
        }
       
    }


    GET_HTML_content(targetInfo, method, val){
        const target = document.querySelector(`${targetInfo}`)
        switch (method) {
            case 'dataset':
             if(val) {
                return target.dataset[val]
             }
              break;

            case 'content':
                return target.innerHTML;

            case 'nodes':
                const targets = document.querySelectorAll(`${targetInfo}`)
                return targets;
          
            default:
              throw new Error('Unknown method')
          }
    }

    GET_Notify(title, text, icon){
      Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'Okay'
    });
    }

    async addNewItemToNp(param, e, formTag, Exkeys, url, fun, Exdata) {
      e.preventDefault()
      const target = param.dataset
      const newItem = new FormData(document.getElementById(`${formTag}`));
      Exkeys.forEach((key)=>{
          if (target[key] != undefined) {
            newItem.append(key, Number(target[key]))
          }
      })
      if (Exdata) {
        for (const x in Exdata) {
          newItem.append(x, Exdata[x])
        }
      }
      await this.GET_POST(url, 'POST', newItem, 'form')
      fun()
  }
}


