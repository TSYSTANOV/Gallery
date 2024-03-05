import { createCard } from "./createCard.js";
import { scrollLoad } from "./scrollLoad.js";

export const renderGallery = (photos) => {
  let gallery = document.createElement("ul");
  gallery.className = "grid";

  const endElem = document.createElement("div");

  document.querySelector(".gallery__wrapper").append(gallery);
  Promise.all(photos.map(createCard)).then((cards) => {
    gallery.append(...cards);
    grid.appended(cards);
    document.querySelector(".gallery__wrapper").append(endElem);
    scrollLoad(gallery, grid, endElem);
  });

  const grid = new Masonry(gallery, {
    gutter: 10,
    itemSelector: ".card",
    columnWidth: 200,
    isFitWidth: true,
  });
};
