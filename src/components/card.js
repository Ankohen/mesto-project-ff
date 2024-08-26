//card.js
import {toggleLikebutton,deleteCard} from "./api.js"

const cardTemplate = document.querySelector("#card-template").content;


// Функция создания карточки
export function createCard(
  cardShowing,
  userId,
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
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = cardShowing.link;
  cardImage.alt = cardShowing.name;
  cardTitle.textContent = cardShowing.name;
  likeCounter.textContent = cardShowing.likes.length;

  const userLiked = cardShowing.likes.some(like => like._id === userId);
  if (userLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }


  likeButton.addEventListener("click", () => 
    likeCallback(cardShowing._id, likeButton, likeCounter)
  );
  cardImage.addEventListener("click", () =>
    openCardCallback(cardShowing.link, cardShowing.name)
  );
  if (cardShowing.owner._id === userId) {
    deleteButton.addEventListener('click', () => {
      deleteCallback(cardShowing._id, cardElement);
    });
  } else {
    deleteButton.style.display = 'none';
  }

  return cardElement;
}


// Обработчик удаления карточки
export function deleteCallback(cardID, cardElement) {
  deleteCard(cardID)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => console.log(err));
}

// Обработчик лайка карточки
export function likeCallback(cardID, likeButton, likesCount) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  toggleLikebutton(cardID, isLiked)
    .then((cardShowing) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likesCount.textContent = cardShowing.likes.length;
    })
    .catch(err => console.log(err));  
}
