import "./pages/index.css";
import { initialCards } from "./cards.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
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

function openCard(link, name) {
  const popupImage = document.querySelector(".popup__image");
  const popupImageCaption = document.querySelector(".popup__caption");

  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openModalWindow(document.querySelector(".popup_type_image"));
}

function createCard(cardShowing, deleteCallback, likeCallback) {
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
    openCard(cardShowing.link, cardShowing.name)
  );
  return cardElement;
}

function deleteCallback(event) {
  const target = event.target.closest(".places__item");
  target.remove();
}

function likeCallback(event) {
  const likeButton = event.target;

  if (likeButton.classList.contains("card__like-button")) {
    likeButton.classList.toggle("card__like-button_is-active");
  }
}

initialCards.forEach((cardShowing) => {
  const cardElement = createCard(cardShowing, deleteCallback, likeCallback);
  placesList.appendChild(cardElement);
});

profileEditButton.addEventListener("click", () => {
  const nameDisplay = document.querySelector(".profile__title").textContent;
  const jobDisplay = document.querySelector(
    ".profile__description"
  ).textContent;

  nameInput.value = nameDisplay;
  jobInput.value = jobDisplay;

  openModalWindow(popupTypeEdit);
});
cardEditButton.addEventListener("click", () => openModalWindow(popupNewCard));

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__close")) {
    const popup = evt.target.closest(".popup");
    closeModalWindow(popup);
  }
});
popupTypeEdit.addEventListener("click", closeOverlayWindow);
popupNewCard.addEventListener("click", closeOverlayWindow);

function openModalWindow(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupOnEsc);
}

function closeModalWindow(popup) {
  if (popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closePopupOnEsc);

    const form = popup.querySelector("form");
    if (form) {
      form.reset;
    }
  }
}

function closeOverlayWindow(evt) {
  if (evt.target === evt.currentTarget) {
    closeModalWindow(evt.currentTarget);
  }
}

function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    closeModalWindow(activePopup);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const nameDisplay = document.querySelector(".profile__title");
  const jobDisplay = document.querySelector(".profile__description");

  nameDisplay.textContent = nameValue;
  jobDisplay.textContent = jobValue;

  closeModalWindow(popupTypeEdit);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const forenameCard = cardName.value;
  const urlCard = addressCard.value;

  const cardData = {
    name: forenameCard,
    link: urlCard,
  };

  const cardElement = createCard(cardData, deleteCallback, likeCallback);
  placesList.prepend(cardElement);

  closeModalWindow(popupNewCard);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
