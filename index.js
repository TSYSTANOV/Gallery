import { autorisationFunc } from "./autorisation.js"
import { getData, getPhoto } from "./getData.js"




function init(){
    autorisationFunc()
    if(document.querySelector('.gallery__wrapper')){
        getData()
    }
    if(document.querySelector('.photo__wrapper')){
        getPhoto()
    }
}
init()