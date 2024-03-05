// import

function renderPhoto(photos) {
  console.log(photos);
  let root = document.querySelector(".photo__wrapper");
  root.innerHTML = `
    <img
              class="photo__picture"
              src="${photos.urls.regular}"
              alt="null"
              style="max-height: 80vh"
            /><a class="photo__author" href="${photos.user.social.portfolio_url}"
              ><img
                src="${photos.user.profile_image.medium}"
                alt="${photos.user.bio}"
                title="${photos.user.username}"
              /><span>${photos.user.name}</span></a
            >
            <div class="photo__control">
              <button id="JIqH1ps4eK8" class="photo__like">${photos.likes}</button>
              <a
                class="photo__download"
                download="true"
                href="https://unsplash.com/photos/JIqH1ps4eK8/download?ixid=MnwzMDE0MzF8MHwxfGFsbHx8fHx8fHx8fDE2NTQ1MjMzNjE"
                target="_blank"
              ></a>
             </div>
             `;
}
export default renderPhoto;
