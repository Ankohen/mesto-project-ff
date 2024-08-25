//modal.js

// Функция открытия попапа
export function openModalWindow(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupOnEsc);
}

// Функция закрытия попапа
export function closeModalWindow(popup) {
  if (popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closePopupOnEsc);
  }
}

// Функция закрытия попапа при клике за его пределы
export function closeOverlayWindow(evt) {
  if (evt.target === evt.currentTarget) {
    closeModalWindow(evt.currentTarget);
  }
}

// Функция закрытия попапа при нажатии ESC
export function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    closeModalWindow(activePopup);
  }
}
