import checkCode, { authInServer, getUserProfile } from "./getData.js"



const btnAuth = document.querySelector('.header__login-button')


btnAuth.addEventListener('click',()=>{
    if(event.target.dataset.login === 'true'){
        console.log(1)
        localStorage.removeItem('UserAccessKey')
        event.target.classList.remove('active-sesion')
        event.target.style.backgroundImage = 'url("../img/login.svg")'
        event.target.dataset.login = false
        location.reload()
    }else{
        authInServer()
    }
})



function userInformation(data){
    console.log(data)
    btnAuth.style.backgroundImage = `url(${data.profile_image.large})`
    btnAuth.classList.add('active-sesion')
    btnAuth.dataset.login = true
    btnAuth.textContent = data.name
}


export const autorisationFunc = async() =>{
    let result = await checkCode()
    if(result){
        getUserProfile()
    }
}
export default userInformation
