import userInformation from "./autorisation.js"
import { renderPhotos } from "./renderPhotos.js"

const BASE_URL = 'https://api.unsplash.com/photos'
const ACCESS_KEY = 'GqqBFzYQGOPScWyBy2Nd2pRcSQr-rvM5ZtB2OEshgTg'
const SECRET_KEY = 'XCC4EgqV5ot8QOf0TJ4uhsKlQ9KZJo430w3M6I-fP64'

const head = {
    Authorization: `Client-ID ${ACCESS_KEY}`,
}


async function getAllPhotosAndRender(page = 1){
    let data = await fetch(`${BASE_URL}?per_page=30&page=${page}`,{
        method:'GET',
        headers:head,
    }).then(response=>response.json())
    console.log(data)
    renderPhotos(data)
}

export const getPhoto = async(id)=>{
    let photoId = new URL(location).searchParams.get('photo')
    let data = await fetch(`${BASE_URL}/${photoId}`,{
        method:'GET',
        headers:head,
    }).then(response=>response.json())
    console.log(data)
    renderPhotos(null, data)
}

export const authInServer = () => {
    let urla = new URL('https://unsplash.com/oauth/authorize')
    urla.searchParams.append('client_id', ACCESS_KEY)
    urla.searchParams.append('redirect_uri', 'http://127.0.0.1:5500/')
    urla.searchParams.append('response_type', 'code')
    urla.searchParams.append('scope', 'public read_user read_photos write_likes')

    location.href = urla
}
async function checkCode(){
    let urla = new URL('https://unsplash.com/oauth/token')
    urla.searchParams.append('client_id', ACCESS_KEY)
    urla.searchParams.append('client_secret', SECRET_KEY)
    urla.searchParams.append('redirect_uri', 'http://127.0.0.1:5500/')
    urla.searchParams.append('grant_type', 'authorization_code')

    let code = new URL(location).searchParams.get('code')
    
    if(code){
        urla.searchParams.append('code', `${code}`)
        let data = await fetch(urla,{
                method:'POST'
            }).then(respose=>respose.json())
        console.log(data)
        localStorage.setItem('UserAccessKey', `Bearer ${data.access_token}`)
        history.pushState({}, document.title, 'http://127.0.0.1:5500/index.html' )
        return true
    }
    if(localStorage.getItem('UserAccessKey')){
        return true
    }
   
    return false
}

export const getUserProfile = async() => {
    
    let UserAccessKey = localStorage.getItem('UserAccessKey')
    let data = await fetch(`https://api.unsplash.com/me`,{
        method:'GET',
        headers:{Authorization: UserAccessKey}
    }).then(response => response.json())
    userInformation(data)

}


export default checkCode
export const getData = (page)=>{
    getAllPhotosAndRender(page)
}