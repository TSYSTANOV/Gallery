import { getData } from "./getData.js";
import { renderGallery } from "./renderGallery.js";


export const scrollLoad = (gallery, grid, endElem, pages = 1) => {
  let i = pages

  const observer = new IntersectionObserver(
    async (entries) => {
      if (entries[0].isIntersecting) {
        let photos = await getData({page:++i,count:30});
        endElem.remove();
        renderGallery(photos, i);
      }
    },
    { rootMargin: "300px" }
  );
  observer.observe(endElem);


};
