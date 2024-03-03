class DataCall {
  urlHead = location.origin + '/'
  GET_POST = async (url, method, body, type) => {
    if (method == 'GET') {
      try {
        document.getElementById('loading-container').classList.remove('hide')
        const fet = await fetch(this.urlHead + url, { method: method })
        const res = await fet.json()
        document.getElementById('loading-container').classList.add('hide')
        return res;
      } catch (error) {
        document.getElementById('loading-container').classList.add('hide')
        throw new Error('request not proceed !' + error.message)
      }
    } else if (method == 'POST' && body != undefined && type === undefined) {
      try {
        document.getElementById('loading-container').classList.remove('hide')
        const fet = await fetch(this.urlHead + url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
        const res = await fet.json()
        if (fet.ok) {
          document.getElementById('loading-container').classList.add('hide')
          this.GET_Notify('Successfully Done', 'Successfull', 'success')
        } else {
          document.getElementById('loading-container').classList.add('hide')
          this.GET_Notify('Error Recognized', 'Something Error', 'error')
        }
        return res;
      } catch (err) {
        document.getElementById('loading-container').classList.add('hide')
        throw new Error('request not proceed !' + err.message)
      }
    } else if (type && type == 'form' && body != undefined) {
      try {
        document.getElementById('loading-container').classList.remove('hide')
        const payload = new URLSearchParams(body);
        const fet = await fetch(this.urlHead + url, {
          method: method,
          body: payload
        })
        const res = await fet.json()
        if (fet.ok) { 
          document.getElementById('loading-container').classList.add('hide')
          this.GET_Notify('Successfully Done', 'Successfull', 'success') } else {
          document.getElementById('loading-container').classList.add('hide')
          this.GET_Notify('Error Recognized', 'Something Error', 'error')
        }
        return res;
      } catch (err) {
        document.getElementById('loading-container').classList.add('hide')
        this.GET_Notify('Something Error', 'Invalid Request!', 'error')
        throw new Error('request not proceed !' + err.message)
      }
    } else {
      document.getElementById('loading-container').classList.add('hide')
      this.GET_Notify('Something Error', 'Invalid Request!', 'error')
      throw new Error('Invalid request !')
    }

  }

  async DEL_UPD(url, method, body, type) {
    if (method == 'DELETE') {
      if (!body) {
        try {
          document.getElementById('loading-container').classList.remove('hide')
          const fet = await fetch(this.urlHead + url, { method: method })
          const res = await fet.json()
          console.log(fet)
          if (fet.ok) { 
            document.getElementById('loading-container').classList.add('hide')
            this.GET_Notify('Removed Successfully', 'Successfull', 'success') } else {
            document.getElementById('loading-container').classList.add('hide')
            this.GET_Notify('Error Recognized', 'Something Error', 'error')
          }
          return res;
        } catch (error) {
          document.getElementById('loading-container').classList.add('hide')
          this.GET_Notify('Something Error', 'Invalid Request!', 'error')
          throw new Error('request not proceed !' + error.message)
        }
      }

    } else if (method == 'PUT' && body != undefined && type === undefined) {
      try {
        document.getElementById('loading-container').classList.remove('hide')
        const fet = await fetch(this.urlHead + url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
        const res = await fet.json()
        console.log(fet)
        if (fet.ok) { 
          document.getElementById('loading-container').classList.add('hide')
          this.GET_Notify('Updated Successfully', 'Successfull', 'success') } else {
            document.getElementById('loading-container').classList.add('hide')
          this.GET_Notify('Error Recognized', 'Something Error', 'error')
        }
        return res;
      } catch (err) {
        document.getElementById('loading-container').classList.add('hide')
        this.GET_Notify('Something Error', 'Invalid Request!', 'error')
        throw new Error('request not proceed !' + err.message)
      }
    } else if (type && type == 'form' && body != undefined) {
      try {
        document.getElementById('loading-container').classList.remove('hide')
        const payload = new URLSearchParams(body);
        const fet = await fetch(this.urlHead + url, {
          method: method,
          body: payload
        })
        const res = await fet.json()
        if (fet.ok) { 
          document.getElementById('loading-container').classList.add('hide')
          this.GET_Notify('Successfully Done', 'Successfull', 'success') } else {
          document.getElementById('loading-container').classList.add('hide')
          this.GET_Notify('Error Recognized', 'Something Error', 'error')
        }
        return res;
      } catch (err) {
        document.getElementById('loading-container').classList.add('hide')
        this.GET_Notify('Something Error', 'Invalid Request!', 'error')
        throw new Error('request not proceed !' + err.message)
      }
    }
  }


  GET_HTML_content(targetInfo, method, val) {
    const target = document.querySelector(`${targetInfo}`)
    switch (method) {
      case 'dataset':
        if (val) {
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

  GET_Notify(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'Okay'
    });
  }

  async addNewItemToNp(targett, e, formTag, Exkeys, url, fun, Exdata) {
    e.preventDefault()
    const target = targett ? targett.dataset : null;
    const newItem = new FormData(document.getElementById(`${formTag}`));
    Exkeys?.forEach((key) => {
      if (target[key] != undefined) {
        newItem.append(key, Number(target[key]))
      }
    })
    if (Exdata) { for (const x in Exdata) { newItem.append(x, Exdata[x])}}
    await this.GET_POST(url, 'POST', newItem, 'form')
    if (fun) { fun(); }
  }
}


