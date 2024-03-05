import { getData } from "./getData.js"
import { renderGallery } from "./renderGallery.js"


const init = async() =>{
   let photos = await getData()
   renderGallery(photos)
}
init()