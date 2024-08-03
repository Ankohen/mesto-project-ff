import { openCard } from './modal.js'; 

export function createCard(cardData, deleteCallback, likeCallback) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener("click", deleteCallback);
    likeButton.addEventListener("click", likeCallback);
    cardImage.addEventListener("click", () => openCard(cardData.link, cardData.name)); // Теперь используем импортированную функцию

    return cardElement;
}

export function deleteCallback(event) {
    const target = event.target.closest(".places__item");
    target.remove();
}

export function likeCallback(event) {
    const likeButton = event.target;
    if (likeButton.classList.contains("card__like-button")) {
        likeButton.classList.toggle("card__like-button_is-active");
    }
}
