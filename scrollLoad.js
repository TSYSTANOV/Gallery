import { getData } from "./getData.js";
import { renderGallery } from "./renderGallery.js";

export const scrollLoad = (gallery, grid, endElem) => {
  const observer = new IntersectionObserver(
    async (entries) => {
      if (entries[0].isIntersecting) {
        let photos = await getData("data.json");
        endElem.remove();
        renderGallery(photos);
      }
    },
    { rootMargin: "300px" }
  );
  observer.observe(endElem);
};
