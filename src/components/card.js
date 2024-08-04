const cardTemplate = document.querySelector("#card-template").content;


// Функция создания карточки
export function createCard(
  cardShowing,
  deleteCallback,
  likeCallback,
  openCardCallback
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardShowing.link;
  cardImage.alt = cardShowing.name;
  cardTitle.textContent = cardShowing.name;

  deleteButton.addEventListener("click", deleteCallback);
  likeButton.addEventListener("click", likeCallback);
  cardImage.addEventListener("click", () =>
    openCardCallback(cardShowing.link, cardShowing.name)
  );
  return cardElement;
}

// Обработчик удаления карточки
export function deleteCallback(event) {
  const target = event.target.closest(".places__item");
  target.remove();
}

// Обработчик лайка карточки
export function likeCallback(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("card__like-button_is-active");
}
