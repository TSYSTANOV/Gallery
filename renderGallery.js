import { createCard } from "./createCard.js"

export const renderGallery = (photos) => {
    const gallery = document.querySelector('.grid')
    const cards = photos.map(createCard)
    gallery.append(...cards)
}