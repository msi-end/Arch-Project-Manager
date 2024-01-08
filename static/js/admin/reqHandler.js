// ReqHandler Data  
let ReqURI = { AddPs: BASE_URL + `/apiV3/crt?user=${username}`, GetA_ps: BASE_URL + '/apiV3/fnO/', upd: { MaxApply: BASE_URL + `/apiV3/upd?user=${username}`, AutoApv: BASE_URL + `/apiV3/upd?user=${username}`, ClsOpn: BASE_URL + `/apiV3/upd?user=${username}` }, dtBD_: BASE_URL + `/apiV3/getAlldt?user=${username}&dt=`, del: BASE_URL + `/apiV3/del?user=${username}&pid=`, updApvl: BASE_URL + '/apiV3/updApvl', docSetReq: BASE_URL + `/apiV3/setDoc?user=${username}`, docGetReq: BASE_URL + `/apiV3/getDoc?user=${username}` }

// User Requestes To API
let ReqHandler = {
    GET: async function (url) {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        });
        return response.json();
    }, POST: async function (url, data) {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data)
        });
        return response.json();
    }, PUT: async function (url, data) {
        console.log(JSON.stringify(data));
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data)
        });
        return response.json();
    }, DEL: async function (url) {
        const response = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json; charset=UTF-8" }
        });
        return response.json();
    }
}