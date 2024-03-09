import { addLike, deleteLike } from "./getData.js";
import { loadMore } from "./loadMoreScroll.js";

const ROOT_forAllCards = document.querySelector(".grid");
const ROOT_forOnePhoto = document.querySelector(".photo__wrapper");
const btnAuth = document.querySelector(".header__login-button");

function renderImg(src, alt) {
  return new Promise((resolve, reject) => {
    let img = document.createElement("img");
    img.style.width = "200";
    img.src = src;
    img.alt = alt;
    img.width = "200";
    img.addEventListener("load", () => {
      resolve(img);
    });
  });
}

async function renderAllPhotos(data) {
  let elems = await Promise.allSettled(
    data.map(async (el) => {
      let li = document.createElement("li");
      li.className = "card";
      li.innerHTML = `
        <a id="${el.id}" class="grid-item" href="page.html?photo=${el.id}">
            <a class="card__author" href="${el.user.links.html}" target='_blank'>
              <img class="author__photo" src="${el.user.profile_image.small}" role="presentation" alt="${el.user.bio}" title="${el.user.name}">
            </a>
            <button class="card__photo-like">${el.likes}</button>
            <a class="card__download" href="${el.links.download}" download="" target="_blank"></a>
        </a>
        `;
      let img = await renderImg(el.urls.small, el.alt_description);
      li.querySelector(".grid-item").prepend(img);
      return li;
    })
  );
  elems.forEach((el) => {
    if (el.status === "fulfilled") {
      ROOT_forAllCards.append(el.value);
    } else {
      console.warn(
        `Some error with loading element: Status:${el.status}, Value:${el.value}`
      );
    }
  });
  let endElement = document.querySelector("[data-page]");
  if (endElement) {
    let page = endElement.dataset.page;
    endElement.remove();
    let endElem = document.createElement("div");
    endElem.dataset.page = page;
    ROOT_forAllCards.after(endElem);
    loadMore(endElem);
  } else {
    let endElem = document.createElement("div");
    endElem.dataset.page = 1;
    ROOT_forAllCards.after(endElem);
    loadMore(endElem);
  }

  const grid = new Masonry(ROOT_forAllCards, {
    gutter: 10,
    itemSelector: ".card",
    columnWidth: 200,
    isFitWidth: true,
  });
}

function renderOnePhoto(data) {
  ROOT_forOnePhoto.innerHTML = `
    <img
            class="photo__picture"
            src="${data.urls.regular}"
            alt="null"
            style="max-height: 80vh"
          /><a class="photo__author" href="${data.user.links.html}" target='_blank'
            ><img
              src="${data.user.profile_image.medium}"
              alt="${data.user.bio}"
              title="${data.user.username}"
            /><span>${data.user.name}</span></a
          >
          <div class="photo__control">
            <a
              class="photo__download"
              download="true"
              href="${data.links.download}"
              target="_blank"
            ></a>
    </div>
    `;
  let btnLikes = document.createElement("button");
  btnLikes.id = data.id;
  btnLikes.className = "photo__like";
  btnLikes.innerHTML = data.likes;
  if (data.liked_by_user === true) {
    btnLikes.style.backgroundImage = 'url("../img/like.svg")';
  } else {
    btnLikes.style.backgroundImage = 'url("../img/o-like.svg")';
  }
  btnLikes.addEventListener("click", async () => {
    if (btnAuth.dataset.login === "true") {
      if (data.liked_by_user === true) {
        btnLikes.style.backgroundImage = 'url("../img/o-like.svg")';
        let { photo } = await deleteLike(data.id);
        data.likes = photo.likes;
        btnLikes.innerHTML = data.likes;
        data.liked_by_user = photo.liked_by_user;
      } else {
        btnLikes.style.backgroundImage = 'url("../img/like.svg")';
        let { photo } = await addLike(data.id);
        data.likes = photo.likes;
        btnLikes.innerHTML = data.likes;
        data.liked_by_user = photo.liked_by_user;
      }
    } else {
      console.log("Need authorisation");
    }
  });
  ROOT_forOnePhoto.querySelector(".photo__control").prepend(btnLikes);
}

export const renderPhotos = (array, onePhoto) => {
  if (array) {
    renderAllPhotos(array);
  } else {
    renderOnePhoto(onePhoto);
  }
};
