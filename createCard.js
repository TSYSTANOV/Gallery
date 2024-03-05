function loadImg(src, className, title) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = src;
    img.title = title;
    img.className = className;
    img.addEventListener("load", () => {
      resolve(img);
    });
  });
}

export const createCard = async (photo) => {
  const card = document.createElement("li");
  card.className = "card";
  card.innerHTML = `
    <a id="${photo.id}" class="grid-item" href="page.html?photo=${photo.id}">
    <img width="200" src="${photo.urls.small}" alt="${photo.alt_description}">
    <a class="card__author" target='_blank' href="${photo.user.links.html}">
        </a>
        <button class="card__photo-like">${photo.likes}</button>
    <a class="card__download" href="${photo.links.download}" download="" target="_blank"></a>
    </a>
    `;

  let image = await loadImg(
    photo.user.profile_image.small,
    "author__photo",
    photo.user.name
  );

  card.querySelector(".card__author").append(image);
  return card;
};
