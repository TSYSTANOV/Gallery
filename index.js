import { getData } from "./getData.js";
import { renderGallery } from "./renderGallery.js";
import renderPhoto from "./renderPhoto.js";

const init = async () => {
  if (document.querySelector(".gallery__wrapper")) {
    let photos = await getData({count:30});
    renderGallery(photos);
  }
  if (document.querySelector(".photo__wrapper")) {
    let url = new URL(location.href);
    let id = url.searchParams.get("photo");
    if(id){
      let photos = await getData({id:id});
      renderPhoto(photos);
    }
    
  }
};
init();
