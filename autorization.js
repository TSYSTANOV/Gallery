import { ACCESS_KEY, API_AUTH, API_URL_TOKEN, SECRET_KEY, redirect_uri, response_type, scope } from "./const.js"

function getToken(code){
    const url = new URL(API_URL_TOKEN)

    url.searchParams.append('client_id', ACCESS_KEY)
    url.searchParams.append('client_secret', SECRET_KEY)
    url.searchParams.append('redirect_uri', redirect_uri)
    url.searchParams.append('code', code)
    url.searchParams.append('grand_type', 'authorization_code')
    console.log(url)
    return fetch(url,{method:'POST'}).then(response=>response.json())
    .then(data=> data)

}

async function checkLogin (){
    const url = new URL(location.href)
    let code = url.searchParams.get('code')

    if(code){
        const token = await getToken(code)
        console.log(token)
        const url = new URL(location)
        url.searchParams.delete('code')
        history.pushState(null, document.title, url)
        return true
    }

}

function auth (){
    const url = new URL(API_AUTH)

    url.searchParams.append('client_id', ACCESS_KEY)
    url.searchParams.append('redirect_uri', redirect_uri)
    url.searchParams.append('response_type', response_type)
    url.searchParams.append('scope', scope)

    location.href = url
    checkLogin()
}


export const autorization = async (btn) =>{
    if(await checkLogin()){

    }else{
   
    btn.addEventListener('click', auth)
    }
}