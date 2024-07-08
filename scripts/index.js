const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardShowing, deleteCallback) { 
    const cardElement = cardTemplate
  .querySelector(".places__item")
  .cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");

    cardImage.src = cardShowing.link;
    cardImage.alt = cardShowing.name;
    cardTitle.textContent = cardShowing.name;

    deleteButton.addEventListener('click', deleteCallback)
    return cardElement;
}
function deleteCallback(event) {
        const target = event.target.closest('.card');
        target.remove();
        };

const placesList = document.querySelector('.places__list');
initialCards.forEach(cardShowing => {
    const cardElement = createCard(cardShowing, deleteCallback);
    placesList.appendChild(cardElement);
  });