
export const createCard = (photo) =>{
    const card = document.createElement('li')
    card.className = 'card'
    card.innerHTML = `
    <a id="${photo.id}" class="grid-item" href="page.html?photo=${photo.id}">
    <img width="200" src="${photo.urls.small}" alt="${photo.alt_description}">
    <a class="card__author" target='_blank' href="${photo.user.links.html}">
    <img class="author__photo" src="${photo.user.profile_image.small}" title="${photo.user.name}">
        </a>
        <button class="card__photo-like">${photo.likes}</button>
    <a class="card__download" href="${photo.links.download}" download="" target="_blank"></a>
    </a>
    `
    return card
}