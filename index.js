import { getData } from "./getData.js";
import { renderGallery } from "./renderGallery.js";
import renderPhoto from "./renderPhoto.js";

const init = async () => {
  if (document.querySelector(".gallery__wrapper")) {
    let photos = await getData("data.json");
    renderGallery(photos);
  }
  if (document.querySelector(".photo__wrapper")) {
    let url = new URL(location.href);
    let id = url.searchParams.get("photo");
    let photos = await getData("photo.json");

    // let res = photos.find((el) => el.id === id);
    renderPhoto(photos);
  }
};
init();
