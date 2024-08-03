import "./pages/index.css"; 
import { initialCards } from "./cards.js"; 
import { createCard, deleteCallback, likeCallback, } from "./components/card.js";
import {
  openModalWindow,
  closeModalWindow,
  closeOverlayWindow,
  closePopupOnEsc,
} from "./components/modal.js";

const placesList = document.querySelector(".places__list"); 

// Создание начальных карточек
initialCards.forEach((cardShowing) => {
  const cardElement = createCard(cardShowing, deleteCallback, likeCallback);
  placesList.appendChild(cardElement);
});

// Получение кнопок и попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const cardEditButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileForm = document.querySelector(".popup_type_edit");
const cardForm = document.querySelector(".popup_type_new-card");

const nameInput = profileForm.querySelector(".popup__input_type_name"); 
const jobInput = profileForm.querySelector(".popup__input_type_description"); 
const cardName = cardForm.querySelector(".popup__input_type_card-name");
const addressCard = cardForm.querySelector(".popup__input_type_url");

// Обработчик нажатия на кнопку редактирования профиля
profileEditButton.addEventListener("click", () => {
  const nameDisplay = document.querySelector(".profile__title").textContent;
  const jobDisplay = document.querySelector(
    ".profile__description"
  ).textContent; 

  nameInput.value = nameDisplay;
  jobInput.value = jobDisplay;
  openModalWindow(popupTypeEdit);
});

// Обработчик нажатия на кнопку добавления карточки
cardEditButton.addEventListener("click", () => openModalWindow(popupNewCard));

// Обработчик клика для закрытия попапа
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__close")) {
    const popup = evt.target.closest(".popup");
    closeModalWindow(popup);
  }
});

// Обработчики для закрытия попапов по клику
popupTypeEdit.addEventListener("click", closeOverlayWindow);
popupNewCard.addEventListener("click", closeOverlayWindow);
document.addEventListener("keydown", closePopupOnEsc);

// Обработчик отправки формы профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameDisplay = document.querySelector(".profile__title");
  const jobDisplay = document.querySelector(".profile__description");

  nameDisplay.textContent = nameInput.value;
  jobDisplay.textContent = jobInput.value;

  closeModalWindow(popupTypeEdit);
}



// Обработчик отправки формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardName.value, 
    link: addressCard.value, 
  };

  const cardElement = createCard(cardData, deleteCallback, likeCallback);
  placesList.prepend(cardElement);
  closeModalWindow(popupNewCard);
}

// Добавление обработчиков событий на формы
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
