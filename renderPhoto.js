

function renderPhoto(photos, like) {
  console.log(photos);
  let root = document.querySelector(".photo__wrapper");
  root.innerHTML = `
    <img
              class="photo__picture"
              src="${photos.urls.regular}"
              alt="${photos.alt_description || photos.description}"
              style="max-height: 80vh"
            /><a class="photo__author" href="${photos.user.social.portfolio_url}"
              ><img
                src="${photos.user.profile_image.medium}"
                alt="${photos.user.bio}"
                title="${photos.user.username}"
              /><span>${photos.user.name}</span></a
            >
            <div class="photo__control">
              <a
                class="photo__download"
                download="true"
                href="${photos.links.download}"
                target="_blank"
              ></a>
             </div>
             `;
    let btn = document.createElement('button')
    btn.className = 'photo__like'
    btn.setAttribute('id', photos.id)
    btn.textContent = photos.likes
    if(!like){
      btn.classList.add('photo__like_o')
    }
    root.querySelector('.photo__control').prepend(btn)
}
export default renderPhoto;
