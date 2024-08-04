import "./pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCallback, likeCallback } from "./components/card.js";
import {
  openModalWindow,
  closeModalWindow,
  closeOverlayWindow,
  closePopupOnEsc,
} from "./components/modal.js";

const placesList = document.querySelector(".places__list");

// Создание начальных карточек
initialCards.forEach((cardShowing) => {
  const cardElement = createCard(cardShowing, deleteCallback, likeCallback,openCard);
  placesList.appendChild(cardElement);
});

// Получение кнопок и попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const closeButtons = document.querySelectorAll(".popup__close");
const cardEditButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const profileForm = document.querySelector(".popup_type_edit .popup__form");
const cardForm = document.querySelector(".popup_type_new-card .popup__form");
const imagePopup = document.querySelector(".popup_type_image");
const nameDisplay = document.querySelector(".profile__title");
const jobDisplay = document.querySelector(".profile__description");
const popupCard = document.querySelector(".popup__form__card");


const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");
const cardName = cardForm.querySelector(".popup__input_type_card-name");
const addressCard = cardForm.querySelector(".popup__input_type_url");

// Обработчик нажатия на кнопку редактирования профиля
profileEditButton.addEventListener("click", () => {
  const nameWindow = nameDisplay.textContent;
  const jobWindow = jobDisplay.textContent;

  nameInput.value = nameWindow;
  jobInput.value = jobWindow;
  openModalWindow(popupTypeEdit);
});

// Обработчик нажатия на кнопку добавления карточки
cardEditButton.addEventListener("click", () => openModalWindow(popupNewCard));

// Обработчик клика для закрытия попапа
closeButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closeModalWindow(popup);
  });
});

// Обработчики для закрытия попапов по клику
popupTypeEdit.addEventListener("click", closeOverlayWindow);
popupNewCard.addEventListener("click", closeOverlayWindow);
imagePopup.addEventListener("click", closeOverlayWindow);

// Обработчик отправки формы профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nameDisplay.textContent = nameInput.value;
  jobDisplay.textContent = jobInput.value;

  closeModalWindow(popupTypeEdit);
}

function openCard(link, name) {
  console.log("handleCardClick вызван с link:", link, "name:", name);
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openModalWindow(imagePopup);
}


// Обработчик отправки формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardName.value,
    link: addressCard.value,
  };

  const cardElement = createCard(
    cardData,
    deleteCallback,
    likeCallback,
    openCard
  );
  placesList.prepend(cardElement);
  closeModalWindow(popupNewCard);
  if(popupCard) {
    popupCard.reset();
  }
}

// Добавление обработчиков событий на формы
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
