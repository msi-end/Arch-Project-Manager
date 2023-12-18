class DataCall {
  GET_POST = async (url, method, body) => {
        if (method == 'GET') {
           try {
            const fet = await fetch(url, { method: method })
            const res = await fet.json()
            return res;
           } catch (error) {
            throw new Error('request not proceed !' + error.message)
           }
        }else if (method == 'POST' && body != undefined) {
          try {
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
          } catch (err) {
            throw new Error('request not proceed !' + err.message)
          }
        }else {
            Swal.fire({
                title: 'Something Error!',
                text: 'Invalid request !',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
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
}


