//index.js
import "./pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCallback, likeCallback } from "./components/card.js";
import {
  openModalWindow,
  closeModalWindow,
  closeOverlayWindow,
  closePopupOnEsc,
} from "./components/modal.js";
import {clearValidation, enableValidation } from "./components/validation.js";
import { getUserInfo, getStartingcard, updateUserInfo, addCard, avatarUpdate } from "./components/api.js";
import { validationConfig } from './components/validationConfig.js';

// DOM элементы
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const closeButtons = document.querySelectorAll(".popup__close");
const cardEditButton = document.querySelector(".profile__add-button");
const nameDisplay = document.querySelector(".profile__title");
const jobDisplay = document.querySelector(".profile__description");
const avatarimage = document.querySelector(".profile__image");
const avatarLinkInput = document.getElementById("avatar-link");
const saveButton = document.querySelector(".popup__button");


// Попапы и формы
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const avatarForm = document.querySelector(".popup_type_edit-avatar");
const imagePopup = document.querySelector(".popup_type_image");
const profileForm = document.querySelector(".popup_type_edit .popup__form");
const cardForm = document.querySelector(".popup_type_new-card .popup__form");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const avatarFormElement = avatarForm.querySelector("form");

// Входные поля
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");
const cardName = cardForm.querySelector(".popup__input_type_card-name");
const addressCard = cardForm.querySelector(".popup__input_type_url");

let userId = "";

function setUserInfo(user) {
  nameDisplay.textContent = user.name;
  jobDisplay.textContent = user.about;
  avatarimage.style.backgroundImage = `url('${user.avatar}')`;
  userId = user._id;
}

// Создание начальных карточек
Promise.all([getUserInfo(), getStartingcard()])
  .then(([userInfo, cards]) => {
    setUserInfo(userInfo);

    cards.forEach((cardData) => {
      const cardElement = createCard(cardData, userId, deleteCallback, likeCallback, openCard);
      placesList.appendChild(cardElement);
    });
  })
  .catch(err => console.log(err));

enableValidation(validationConfig);

avatarFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const originalButtonText = saveButton.textContent;
  saveButton.textContent = "Сохранение...";
  const linkImg = avatarLinkInput.value;
  avatarUpdate(linkImg)
    .then(() => {
      avatarimage.style.backgroundImage = `url(${linkImg})`;
      closeModalWindow(avatarForm);
      avatarFormElement.reset();
    })
    .catch(err => console.log("Ошибка обновления аватара:", err))
    .finally(() => {
      saveButton.textContent = originalButtonText;
    });
});

avatarimage.addEventListener("click", () => {
  openModalWindow(avatarForm);
});

// Обработчик нажатия на кнопку редактирования профиля
profileEditButton.addEventListener("click", () => {
  const nameWindow = nameDisplay.textContent;
  const jobWindow = jobDisplay.textContent;

  nameInput.value = nameWindow;
  jobInput.value = jobWindow;
  openModalWindow(popupTypeEdit);
});

// Обработчик нажатия на кнопку добавления карточки
cardEditButton.addEventListener("click", () => {
  clearValidation(cardForm, validationConfig);
  openModalWindow(popupNewCard);
});

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
avatarForm.addEventListener("click", closeOverlayWindow);

// Обработчик отправки формы профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const originalButtonText = saveButton.textContent;
  saveButton.textContent = "Сохранение...";
  updateUserInfo(nameInput.value, jobInput.value)
    .then(updatedUser  => {
      nameDisplay.textContent = updatedUser.name;
      jobDisplay.textContent = updatedUser.about;

      closeModalWindow(popupTypeEdit);
      clearValidation(profileForm, validationConfig);
    })
    .catch(err => console.log(err))
    .finally(() => {
      saveButton.textContent = originalButtonText;
    });
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
  const originalButtonText = saveButton.textContent;
  saveButton.textContent = "Сохранение...";
  const cardData = {
    name: cardName.value,
    link: addressCard.value,
  };

  addCard(cardData.name, cardData.link)
    .then((newCard) => {
      const cardElement = createCard(
        newCard,
        userId,
        deleteCallback,
        likeCallback,
        openCard
      );
      placesList.prepend(cardElement);
      closeModalWindow(popupNewCard);
      clearValidation(cardForm, validationConfig);
      cardForm.reset();
    })
    .catch(err => console.log(err))
    .finally(() => {
      saveButton.textContent = originalButtonText;
    });
}

// Добавление обработчиков событий на формы
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);